import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
    title:  {
        type: String,
        required: true,
        index: true,
        minLength: 1
    },

    url: {
        type: String,
        required: true,
        index: true
    },

    description: {
        type: String,
        required: true,
        index: true
    },

    sharedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

export const Resource = mongoose.model('Resource', resourceSchema);

