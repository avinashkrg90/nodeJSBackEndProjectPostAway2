
import { customErrorHandler } from "../../middlewares/errorHandler.js";
import CommentRepository from "./comment.repository.js";

export default class CommentController {
    constructor() {
        this.commentRepository = new CommentRepository();
    }

    getComments = async (req, res, next) => {
        const {postId} = req.params;
        const resp = await this.commentRepository.getComments(postId);
        if (resp.success) {
            res.status(201).json({
                success: true,
                msg: "All comments fetched successfully",
                res: resp.res,
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }

    addComment = async (req, res, next) => {
        const {postId} = req.params;
        const userId = req._id;
        const resp = await this.commentRepository.addComment(postId, userId, req.body);
        if (resp.success) {
            res.status(201).json({
                success: true,
                msg: "comment added successfully",
                res: resp.res,
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }

    deleteComment = async (req, res, next) => {
        const {commentId} = req.params;
        const userId = req._id;
        const resp = await this.commentRepository.deleteComment(commentId, userId);
        if (resp.success) {
            res.status(201).json({
                success: true,
                msg: "comment deleted successfully",
                res: resp.res,
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }

    updateComment = async (req, res, next) => {
        const {commentId} = req.params;
        const userId = req._id;
        const resp = await this.commentRepository.updateComment(commentId, userId, req.body);
        if (resp.success) {
            res.status(201).json({
                success: true,
                msg: "comment updated successful",
                res: resp.res,
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }


}