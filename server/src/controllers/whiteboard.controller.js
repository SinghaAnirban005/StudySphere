import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { whiteBoard } from "../models/WhiteBoard.model.js";

const getWhiteboardState = asyncHandler(async(req, res) => {
    try {
        const { groupId } = req.params

        if(!groupId) {
            throw new ApiError(404, "Group Id not found")
        }

        const whiteboard = await whiteBoard.findOne({
            groupId
        })
        
        if(!whiteBoard) {
            throw new ApiError(400, "Failed to fetch whiteboard")
        }
        
        const state = whiteboard.whiteboardState

        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                state,
                "Fetched whiteboard state !!"
            )
        )
    } catch (error) {
        throw new ApiError(500, "Server Error :: " + error?.message)
    }
})


const saveWhiteboardState = asyncHandler(async(req, res) => {
    try {
        const { groupId } = req.params;
        const { whiteboardState } = req.body;
        
        let whiteboard = await whiteBoard.findOne({
            groupId
        })

        if(whiteboard){
            whiteboard.whiteboardState = whiteboardState;
            whiteboard.lastModified = Date.now();
            await whiteboard.save();
        }
        else{
            whiteboard = new whiteBoard({
                groupId,
                whiteboardState
              });
              await whiteboard.save();
        }


        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                whiteboard,
                "Whiteboard saved succesfully !!"
            )
        )
    } catch (error) {
        throw new ApiError(500, "Server error :: " + error?.message)
    }
})


export {
    getWhiteboardState,
    saveWhiteboardState
}