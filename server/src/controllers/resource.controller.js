import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Group } from "../models/studyGroup.model.js";
import { Resource } from "../models/Resources.model.js";
import { User } from "../models/user.model.js";


const addResource = asyncHandler(async(req, res) => {
    try {
        const {groupId} = req.params
        
        const userId = req.user._id

        const { title, url } = req.body

        const group = await Group.findById(groupId)
        if(!group) {
            throw new ApiError(400, "Failed to create group ")
        }

        const isMember = group.members.includes(userId)

        if(!isMember) {
            throw new ApiError(400, "Adding resource is prohibited !!")
        }

        // const user = await User.findById(userId).select('-password -refreshToken')

        // if(!user) {
        //     throw new ApiError(400, "User doesn't exist !!")
        // }

        const newResource = await Resource.create(
            {
                title: title,
                url: url,
                sharedBy: userId
            }
        )

        if(!newResource) {
            throw new ApiError(400, "Reource does not exist")
        }
        group.resources.push(newResource._id)

        await group.save()

        return res
        .status(200)
        .json(
            new ApiResponse(
                200, 
                group,
                "Updated group with resources"
            )
        )

    } catch (error) {
        throw new ApiError(500, error?.message)
    }
})

export {
    addResource
}