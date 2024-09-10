
import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'User'
  },
  post:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'Post'
  },
  status:{
    type:Boolean,
    default:false
  }
})

const LikeModel = mongoose.model('Like', likeSchema);

export default LikeModel
