import mongoose from "mongoose"
import { Schema } from "mongoose"

const whiteboardSchema = new Schema({
    groupId : {
        type: mongoose.Types.ObjectId,
        ref: 'Group'
    },
    whiteboardState: {
        type: Object,
        required: true
    },
    lastModified: {
        type: Date,
        default: Date.now()
    }
})

export const whiteBoard = mongoose.model('whiteBoard', whiteboardSchema)