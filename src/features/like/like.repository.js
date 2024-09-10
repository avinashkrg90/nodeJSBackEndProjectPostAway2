
import LikeModel from "./like.schema.js";

export default class LikeRepository {

    getLikes = async (postId) => {
        try {
            const likes = await LikeModel.find({ post: postId, status:true });
            if (!likes) {
                return {
                    success: false,
                    error: { statusCode: 404, msg: "likes not found" },
                };
            } else {
                return { success: true, res: likes };
            }
        } catch (error) {
            return {
                success: false,
                error: { statusCode: 400, msg: error },
            };
        }
    }

    toggleLike = async (postId, userId) => {
        try {
            const like = await LikeModel.findOne({ post: postId, user: userId });
            // console.log(like)
            
            if (!like) {
                const newLike = new LikeModel({post: postId, user: userId, status:true});
                await newLike.save();
                return { success: true, res: newLike };
            } else {
                
                // console.log("like status : " + like.status)
                if (like.status == true) {
                    like.status = false;
                } else {
                    like.status = true;
                }
                await like.save();
                return { success: true, res: like };
            }
        } catch (error) {
            return {
                success: false,
                error: { statusCode: 400, msg: error },
            };
        }

    }
}