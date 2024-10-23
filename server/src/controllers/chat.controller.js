import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import Message from "../models/Message.model.js";

const getMessages = asyncHandler(async(req, res) => {
    try {
        const { groupId } = req.params;
        const messages = await Message.find({ groupId }).populate('sender', 'username');

        return res
        .status(200)
        .json({
            success: true,
            data: messages
        });
    } catch (error) {
        throw new ApiError(500, error?.message)
    }
})

export {
    getMessages
}