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
    chatHistory: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        message: String,
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Group = mongoose.model('Group', GroupSchema);

