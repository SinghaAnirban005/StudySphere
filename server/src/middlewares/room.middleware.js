import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

import { Group } from "../models/studyGroup.model.js";

export const verifyUser = asyncHandler(async(req, res, next) => {
   try {
        const userId = req.user._id

        const { groupId } = req.params

        const group = await Group.findById(groupId)

        if(!group){
            throw new ApiError(400, "Group does not exist")
        }

        const isMember = group.members.includes(userId)

        if(!isMember) {
            throw new ApiError(400, "Adding resource is prohibited !!")
        }

        next()
   } catch (error) {
        throw new ApiError(400, error?.message)
   }
})