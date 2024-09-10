
import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    caption:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

const PostModel = new mongoose.model('Post', postSchema);

export default PostModel