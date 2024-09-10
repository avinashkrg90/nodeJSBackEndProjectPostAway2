
import mongoose from "mongoose";

var userAvatarSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    img:{
        data: Buffer,
        contentType: String
    }
});

const userAvatarModel = mongoose.model('Avatar', userAvatarSchema);

export default userAvatarModel;