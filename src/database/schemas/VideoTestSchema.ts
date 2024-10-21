import { Schema, model, models } from "mongoose";

const VideoTestSchema = new Schema({
    thumbnailUrlA: {
        type: String
    },
    titleA: {
        type: String
    },
    descriptionA: {
        type: String
    },
    tagsA: {
        type: String
    },
    thumbnailUrlB: {
        type: String
    },
    titleB: {
        type: String
    },
    descriptionB: {
        type: String
    },
    tagsB: {
        type: String
    },
    userId: {
        type: String,
        required: true
    },
    testingInProgress: {
        type: Boolean,
        default: false
    },
    videoId: String
}, {timestamps: true})

const VideoTestModel = models.VideoTestSchema || model("VideoTestSchema", VideoTestSchema);

export default VideoTestModel;