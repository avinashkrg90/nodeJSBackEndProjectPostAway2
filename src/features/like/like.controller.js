import { customErrorHandler } from "../../middlewares/errorHandler.js";
import LikeRepository from "./like.repository.js";

export default class LikeController {
    constructor() {
        this.likeRepository = new LikeRepository();
    }

    getLikes = async (req, res, next) => {
        const { id } = req.params; //postId
        try {
            const resp = await this.likeRepository.getLikes(id);
            if (resp) {
                res.status(200).json({ success: true, resp });
            }
        } catch (error) {
            next(new customErrorHandler(400, error));
        }
    }

    toggleLike = async (req, res, next) => {
        const { id } = req.params; //postId
        const userId = req._id;
        try {
            const resp = await this.likeRepository.toggleLike(id, userId);
            if (resp.success) {
                if (resp.res.status == true)
                    res.status(201).json({ success: true, msg: "post liked successfully", res: resp.res, });
                else
                    res.status(201).json({ success: true, msg: "post unliked successfully", res: resp.res, });
            } else {
                next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
            }
        } catch (error) {
            next(new customErrorHandler(400, error));
        }
    }
}
