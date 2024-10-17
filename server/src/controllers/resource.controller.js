import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { Group } from "../models/studyGroup.model.js";
import { Resource } from "../models/Resources.model.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js"


const addResource = asyncHandler(async(req, res) => {
    try {
        const {groupId} = req.params
        
        const userId = req.user._id

        const { title,  description } = req.body


        if(!title || !description) {
            throw new ApiError(400, "Enter all fields")
        }
        
        const resourcePath = req.file?.path
        console.log(req.file)
        
        if(!resourcePath) {
            throw new ApiError(400, "Failed to get resource !!")
        }

        const uploadedResource = await uploadOnCloudinary(resourcePath)
        
        if(!uploadedResource) {
            throw new ApiError(400, "Failed to upload resource ")
        }

        const group = await Group.findById(groupId)
        if(!group) {
            throw new ApiError(400, "Failed to create group ")
        }

        const isMember = group.members.includes(userId)

        if(!isMember) {
            throw new ApiError(400, "Adding resource is prohibited !!")
        }

        const newResource = await Resource.create(
            {
                title: title,
                url: uploadedResource.url,
                description: description,
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
                newResource,
                "Updated group with resources"
            )
        )

    } catch (error) {
        throw new ApiError(500, error?.message)
    }
})

const getResources = asyncHandler(async(req, res) => {
    try {
        const { groupId } = req.params

        const group = await Group.findById(groupId).populate('resources', 'title url description _id')

        if(!group) {
            throw new ApiError(400, "Failed to find group")
        }
        
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                group.resources,
                "Fetched group's resources"    
            )
        )
    } catch (error) {
        throw new ApiError(500, error?.message)
    }
})

const deleteResources = asyncHandler(async(req, res) => {
    try {
        const {resourceId} = req.body

        const resource = await Resource.findByIdAndDelete(resourceId)

        if(!resource){
            throw new ApiError(400, "Resource does not exist")
        }

        const group = await Group.updateMany(
           { 
            resources: resourceId
           },
           {
            $pull:{
                resources: resourceId
            }
           }

        )

 
        const arr = resource.url.split('/')
        console.log("Printing arr" + arr)
        await deleteFromCloudinary(arr[arr.length - 1])

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                resource,
                "Fetched resources"
            )
        )
    } catch (error) {
        throw new ApiError(500, error?.message)
    }
})

export {
    addResource,
    getResources,
    deleteResources
}