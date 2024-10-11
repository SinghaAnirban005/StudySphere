import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Group } from "../models/studyGroup.model.js";
import { User } from "../models/user.model.js";
// create group
// get Members of the group
// add Resources 
// remove member (only leader can do)
// check if user is a memeber of a group

const createGroup = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if(!name) {
      throw new ApiError(400, "Please enter name of group")
    }

    if(!description) {
      throw new ApiError(400, "Please enter description for group")
    }
    const leaderId = req.user._id

    // if (!members.includes(leaderId)) {
    //     members.push(leaderId);
    //   }
    
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


  export {
    createGroup,
    getMembers,
    removeMemberFromGroup
  }