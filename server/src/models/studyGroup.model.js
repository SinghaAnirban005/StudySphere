import mongoose, { mongo } from "mongoose";

const GroupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    leader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
    }],
    resources: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resource"
        }
    ],
    description: {
        type:  String,
        required: true,
        index: true,
        trim: true
    },
    chatHistory: {
        type: String,
        ref: mongoose.Schema.Types.ObjectId
    },
    whiteboard: {
        type: mongoose.Types.ObjectId,
        ref: 'whiteBoard'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Group = mongoose.model('Group', GroupSchema);

