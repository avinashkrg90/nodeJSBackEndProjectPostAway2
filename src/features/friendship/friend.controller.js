
import { customErrorHandler } from "../../middlewares/errorHandler.js";

import FriendRepository from "./friend.repository.js";

export default class FriendController {
    constructor() {
        this.friendRepository = new FriendRepository();
    }

    getFriends = async (req, res, next) => {
        const {userId} = req.params;
        const resp = await this.friendRepository.getFriends(userId);
        if (resp.success) {
            res.status(201).json({
                success: true,
                msg: "all friend for the user fetched",
                res: resp.res,
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }

    getPendingFriendRequest = async (req, res, next) => {
        const userId = req._id;
        const resp = await this.friendRepository.getPendingFriendRequest(userId);
        if (resp.success) {
            res.status(201).json({
                success: true,
                msg: "pending friend requests fetched",
                res: resp.res,
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }

    toggleFriendship = async (req, res, next) => {
        const {friendId} = req.params;
        const userId = req._id;
        const resp = await this.friendRepository.toggleFriendship(friendId, userId);
        if (resp.success) {
            res.status(201).json({
                success: true,
                msg: "friendship toggled",
                res: resp.res,
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }

    responseTorequest = async (req, res, next) => {
        const {friendId} = req.params;
        const userId = req._id;
        const {response} = req.query;
        if (response != "accept" && response != "reject")
            res.status(400).json({ success: false, msg: "response is not valid"});
        const resp = await this.friendRepository.responseTorequest(friendId, response, userId);
        if (resp.success) {
            res.status(201).json({
                success: true,
                msg: "response saved successfully",
                res: resp.res,
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }

    sendFriendRequest = async (req, res, next) => {
        const {friendId} = req.params;
        const userId = req._id;
        const resp = await this.friendRepository.sendFriendRequest(friendId, userId);
        if (resp.success) {
            res.status(201).json({
                success: true,
                msg: "friend request sent successfully",
                res: resp.res,
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }
}
