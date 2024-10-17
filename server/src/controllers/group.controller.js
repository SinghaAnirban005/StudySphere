import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Group } from "../models/studyGroup.model.js";
import { User } from "../models/user.model.js";



const createGroup = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if(!name) {
      throw new ApiError(400, "Please enter name of group")
    }

    if(!description) {
      throw new ApiError(400, "Please enter description for group")
    }
    const leaderId = req.user._id
    
    try {
      const newGroup = new Group({
        name,
        leader: leaderId, 
        description
      });

      newGroup.members.push(leaderId)
  
      await newGroup.save();

      const leaderData = await User.findById(leaderId).select('-password -refreshToken')

      if(!leaderData) {
        throw new ApiError(400, "Leader not found !!")
      }

      leaderData.groups.push(newGroup._id)

      await leaderData.save()
  
      return res
      .status(200)
      .json(
        new ApiResponse(
            200, 
            newGroup,
            "Succesfully created group !!"
        )
      )
    } catch (error) {
        throw new ApiError(500, error?.message)
    }
  }
  )

  const getMembers = asyncHandler(async(req, res) => {
    const { groupId } = req.params;

  try {
    const group = await Group.findById(groupId).populate('members', 'fullName email');
    if (!group) {
      throw new ApiError(400, "Group not found !!")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            group.members,
            "Fetched members of group"
        )
    );
  } catch (error) {
        throw new ApiError(500, error?.message)
  }
  })

  const removeMemberFromGroup = asyncHandler(async (req, res) => {
    const { groupId, memberId } = req.params;
    const leaderId  = req.user._id;
  
    try {
      const group = await Group.findById(groupId);
      if (!group) {
        throw new ApiError(400, "Group not found");
      }
  
      if (group.leader._id !== leaderId) {
        throw new ApiError(400, "Onnly leader can remove members")
      }
  
      group.members = group.members.filter((member) => member._id !== memberId);
  
      await group.save();
  
      return res
      .status(200)
      .json(
        new ApiResponse(
            200, 
            group,
            "Successfully removed member"
        )
      )
    } catch (error) {
      throw new ApiError(500, error?.message)
    }
  })

  const getGroups = asyncHandler(async(req, res) => {
    try {
      const groups = await Group.find({}).populate('leader', 'fullName')

      if(!groups) {
        throw new ApiError(400, "No groups available")
      } 

      return res
      .status(200)
      .json(
        new ApiResponse(
          200, 
          groups,
          "Fetched groups"
        )
      )
    } catch (error) {
      throw new ApiError(500, error?.message)
    }
  })

  const getGroupInfo = asyncHandler(async(req, res) => {
    try {
      
      const { groupId } = req.params
   
      if(!groupId) {
        throw new ApiError(400, "Group Id does not exist")
      }

      const group = await Group.findById(groupId).populate('leader', 'fullName _id')

      if(!group) {
        throw new ApiError(400, "Failed to fetch group")
      }

      const memberDetails = await User.find({ _id: { $in: group.members } });

      return res
      .status(200)
      .json(
        new ApiResponse(
          200,
        {
          group,
          member: memberDetails
        },
          "Fecthed group info"
        )
      )
    } catch (error) {
        throw new ApiError(500, error?.message)
    }
  })

  const addMember = asyncHandler(async(req, res) => {
    try {
      const {username, email} = req.body
      const {groupId} = req.params
      
      if(!username || !email) {
        throw new ApiError(400, "Enter all fields")
      }

      const existingUser = await User.findOne({
        $or: [
          { username: username },
          { email: email }
        ]
      });

      if(!existingUser) {
        throw new ApiError(400, "User already exists !!")
      }

      const updatedGroup = await Group.findByIdAndUpdate(
          groupId,
          {
            $addToSet: {
              members: existingUser._id
            }
          },

          {
            new: true
          }
      )

      if(!updatedGroup) {
        throw new ApiError(400, "Failed to update group")
      }

      const updateUser = await User.findByIdAndUpdate(
        existingUser._id,
        {
          $addToSet:{
            groups: updatedGroup._id
          }
        },
        {
          new: true
        }
      )

      if(!updateUser) {
        throw new ApiError(401, "Failed to update user")
      }

      return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedGroup,
          "Succesfully updated group"
        )
      )
    } catch (error) {
      throw new ApiError(500, error?.message)
    }
  })

  const deleteGroup = asyncHandler(async(req, res) => {
    try {
      const { groupId } = req.params

      const group = await Group.findByIdAndDelete(groupId)

      if(!group) {
        throw new ApiError(400, "Group not found !!")
      }

      const user = await User.updateMany(
        { groups: groupId }, 
        { 
          $pull: 
          { 
            groups: groupId 
          } 
        } 
      );

      return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          group,
          "Deleted group "
        )
      )
    } catch (error) {
      throw new ApiError(500, error?.message)
    }
  })

  const leaveGroup = asyncHandler(async(req, res) => {
    try {
      const {groupId} = req.params
      const userId = req.user._id

      if(!groupId) {
        throw new ApiError(400, "Invalid user ID")
      } 

      const group = await Group.findById(groupId);

      if (!group) {
        throw new ApiError(404, "Group not found");
      }

      group.members = group.members.filter((member) => member.toString() !== userId.toString())

      await group.save()

      const user = await User.findByIdAndUpdate(
        userId,
        {
          $pull: {
            groups: groupId
          }
        },
        {
          new: true
        }
      )

      if(!user){
        throw new ApiError(400, "Failed to update user")
      }

      return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          group,
          "You have left the group"
        )
      )

    } catch (error) {
      throw new ApiError(500, "Server error ::" + error?.message)
    }
  })

  const filterGroups = asyncHandler(async(req, res) => {
    try {
        const {name} = req.query

        let condition = {}

        if(name.trim() !== '') {
          condition.name = {
            $regex: name,
            $options: "i"
          }
        }

        const filteredGroup = await Group.find(condition).populate('leader', 'fullName')

        if(!filteredGroup) {
          throw new ApiError(400, "Groups not found")
        }

        return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            filteredGroup,
            "Filtered Groups"
          )
        )
    } catch (error) {
      throw new ApiError(500, "Server error" + error?.message)
    }
  })


  export {
    createGroup,
    getMembers,
    removeMemberFromGroup,
    getGroups,
    getGroupInfo,
    addMember,
    deleteGroup,
    filterGroups,
    leaveGroup
  }