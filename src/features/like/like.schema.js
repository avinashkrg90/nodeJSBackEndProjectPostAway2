
import mongoose from "mongoose";

export const likeSchema = new mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:'User'
  },
  likeable:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    refPath:'on_model'
  },
  on_model:{
    type:String,
    required:true,
    enum:['Post', 'Comment']
  }
});
