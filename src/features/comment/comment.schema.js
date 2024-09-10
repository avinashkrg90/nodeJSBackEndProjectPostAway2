
import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        res:'Post'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        res:'User'
    }
})

const CommentModel = mongoose.model('Comment', commentSchema);

export default CommentModel;