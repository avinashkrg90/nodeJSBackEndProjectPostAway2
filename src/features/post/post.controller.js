
import { customErrorHandler } from "../../middlewares/errorHandler.js";

import PostRepository from "./post.repository.js";

export default class PostController {
    constructor() {
        this.postRepository = new PostRepository();
    }

    createPost = async (req, res, next) => {
        const {caption} = req.body;
        const user = req._id;
        const resp = await this.postRepository.createPost({caption, user});
        if (resp.success) {
            res.status(201).json({
                success: true,
                msg: "post creation successful",
                res: resp.res,
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }

    getPostById = async (req, res, next) => {
        const {postId} = req.params;
        const resp = await this.postRepository.getPostById(postId);
        if (resp.success) {
            res.status(201).json({
                success: true,
                msg: "post found successfully",
                res: resp.res,
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }

    deletePost = async (req, res, next) => {
        const userId = req._id;
        const {postId} = req.params;
        const resp = await this.postRepository.deletePost(postId, userId);
        if (resp.success) {
            res.status(201).json({
                success: true,
                msg: "post deleted successfully",
                res: resp.res,
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }

    updatePost = async (req, res, next) => {
        const userId = req._id;
        const {postId} = req.params;
        const resp = await this.postRepository.updatePost(postId, userId, req.body);
        if (resp.success) {
            res.status(201).json({
                success: true,
                msg: "post updated successfully",
                res: resp.res,
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }

    getAllPosts = async (req, res, next) => {
        const userId = req._id;
        const resp = await this.postRepository.getAllPosts(userId);
        if (resp.success) {
            res.status(201).json({
                success: true,
                msg: "All your posts fetched successfully",
                res: resp.res,
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }

    getAllPostByUserId = async (req, res, next) => {
        const {userId} = req.params;
        const resp = await this.postRepository.getAllPostByUserId(userId);
        if (resp.success) {
            res.status(201).json({
                success: true,
                msg: "user sign up successful",
                res: resp.res,
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }
}