
import PostModel from "./post.schema.js";

export default class PostRepository {

    createPost = async (postData) => {
        try {
            const newPost = new PostModel(postData);
            await newPost.save();
            return { success: true, res: newPost };
        } catch (error) {
            // throw new Error("email duplicate");
            return { success: false, error: { statusCode: 400, msg: error } };
        }
    }

    getPostById = async (id) => {
        try {
            const post = await PostModel.findById(id);
            if (!post) {
                return {
                    success: false,
                    error: { statusCode: 404, msg: "post not found" },
                };
            } else {
                return { success: true, res: post };
            }
        } catch (error) {
            return {
                success: false,
                error: { statusCode: 400, msg: error },
            };
        }
    }

    deletePost = async (postId, userId) => {
        try {
            const post = await PostModel.findById(postId);
            if (post.user == userId) {
                const deletedPost = await PostModel.deleteOne({ _id: postId });
                if (!deletedPost) {
                    return {
                        success: false,
                        error: { statusCode: 404, msg: "post not found" },
                    };
                } else {
                    return { success: true, res: deletedPost };
                }
            } else {
                return { success: false, error: { statusCode: 400, msg: "you are not authorized to delete this post" } };
            }

        } catch (error) {
            // throw new Error("email duplicate");
            return { success: false, error: { statusCode: 400, msg: error } };
        }
    }

    updatePost = async (postId, userId, postNewData) => {
        try {
            const post = await PostModel.findById(postId);
            if (!post) {
                return {
                    success: false,
                    error: { statusCode: 404, msg: "post not found" },
                };
            }
            if (post.user == userId) {
                post.caption = postNewData.caption;
                await post.save();
                return { success: true, res: post };
            } else {
                return { success: false, error: { statusCode: 400, msg: "you are not authorized to update this post" } };
            }
        } catch (error) {
            // throw new Error("email duplicate");
            return { success: false, error: { statusCode: 400, msg: error } };
        }
    }

    getAllPosts = async (userId) => {
        try {
            const posts = await PostModel.find({ user: userId });
            if (!posts) {
                return {
                    success: false,
                    error: { statusCode: 404, msg: "posts not found" },
                };
            }
            return { success: true, res: posts };
        } catch (error) {
            // throw new Error("email duplicate");
            return { success: false, error: { statusCode: 400, msg: error } };
        }
    }

    getAllPostByUserId = async (userId) => {
        try {
            const posts = await PostModel.find({ user: userId });
            if (!posts) {
                return {
                    success: false,
                    error: { statusCode: 404, msg: "posts not found" },
                };
            }
            return { success: true, res: posts };
        } catch (error) {
            // throw new Error("email duplicate");
            return { success: false, error: { statusCode: 400, msg: error } };
        }
    }

}