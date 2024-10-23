import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { whiteBoard } from "../models/WhiteBoard.model.js";

const getWhiteboardState = asyncHandler(async (req, res) => {
  const { groupId } = req.params;

  if (!groupId) {
    throw new ApiError(404, "Group ID is required.");
  }

  try {
    const whiteboard = await whiteBoard.findOne({ groupId });

    if (!whiteboard) {
      throw new ApiError(400, "Whiteboard state not found for the given group ID.");
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        whiteboard.whiteboardState,
        "Whiteboard state fetched successfully!"
      )
    );
  } catch (error) {
    throw new ApiError(500, "Server Error :: " + error?.message);
  }
});

const saveWhiteboardState = asyncHandler(async (req, res) => {
  const { groupId } = req.params;
  const { whiteboardState } = req.body;

  if (!groupId || !whiteboardState) {
    throw new ApiError(400, "Group ID and whiteboard state are required.");
  }

  try {
    let whiteboard = await whiteBoard.findOne({ groupId });

    if (whiteboard) {
    
      whiteboard.whiteboardState = whiteboardState;
      whiteboard.lastModified = Date.now();
    } else {
      
      whiteboard = new whiteBoard({
        groupId,
        whiteboardState,
      });
    }

    await whiteboard.save();

    return res.status(200).json(
      new ApiResponse(
        200,
        whiteboard,
        "Whiteboard state saved successfully!"
      )
    );
  } catch (error) {
    throw new ApiError(500, "Server Error :: " + error?.message);
  }
});

export {
  getWhiteboardState,
  saveWhiteboardState,
};
