
import CommentModel from "./comment.schema.js";
import PostModel from "../post/post.schema.js";

export default class CommentRepository {

    getComments = async (postId) => {
        try {
            const comments = await CommentModel.find({ post: postId });
            if (!comments) {
                return {
                    success: false,
                    error: { statusCode: 404, msg: "no comment found" },
                };
            }
            return { success: true, res: comments };
        } catch (error) {
            // throw new Error("email duplicate");
            return { success: false, error: { statusCode: 400, msg: error } };
        }
    }

    addComment = async (postId, userId, commentData) => {
        try {
            const newComment = new CommentModel({ text: commentData.text, post: postId, user: userId });
            const savedComment = await newComment.save();
            if (!savedComment) {
                return {
                    success: false,
                    error: { statusCode: 404, msg: "comment could not be saved" },
                };
            }
            return { success: true, res: savedComment };
        } catch (error) {
            // throw new Error("email duplicate");
            return { success: false, error: { statusCode: 400, msg: error } };
        }
    }

    deleteComment = async (commentId, userId) => {
        try {
            const comment = await CommentModel.findById(commentId);
            if (!comment) {
                return {
                    success: false,
                    error: { statusCode: 404, msg: "comment could not be found" },
                };
            }

            const commentPostId = comment.post;
            const commentPost = await PostModel.findById(commentPostId);
            const commentPostUserId = commentPost.user;
            if (userId == comment.user || userId == commentPostUserId) {
                const deletedComment = await CommentModel.deleteOne({ _id: commentId });
                if (!deletedComment) {
                    return {
                        success: false,
                        error: { statusCode: 404, msg: "comment could not be deleted" },
                    };
                } else {
                    return { success: true, res: deletedComment };
                }
            }
            return { success: false, error: { statusCode: 400, msg: "you are not authorized to delete this comment" } };
        } catch (error) {
            // throw new Error("email duplicate");
            return { success: false, error: { statusCode: 400, msg: error } };
        }
    }

    updateComment = async (commentId, userId, commentNewData) => {
        try {
            const comment = await CommentModel.findById(commentId);
            if (!comment) {
                return {
                    success: false,
                    error: { statusCode: 404, msg: "comment could not be found" },
                };
            }
            const commentPostId = comment.post;
            const commentPost = await PostModel.findById(commentPostId);
            const commentPostUserId = commentPost.user;
            if (userId == comment.user || userId == commentPostUserId) {
                comment.text = commentNewData.text;
                const savedComment = await comment.save();
                if (!savedComment) {
                    return {
                        success: false,
                        error: { statusCode: 404, msg: "comment could not be updated" },
                    };
                } else {
                    return { success: true, res: savedComment };
                }
            }
            return { success: false, error: { statusCode: 400, msg: "you are not authorized to update this comment" } };
        } catch (error) {
            // throw new Error("email duplicate");
            return { success: false, error: { statusCode: 400, msg: error } };
        }
    }

}