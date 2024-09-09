import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { customErrorHandler } from "../../middlewares/errorHandler.js";

import UserRepository from "./user.repository.js";

export default class UserController {
    constructor() {
        this.userRepository = new UserRepository();
    }

    userRegistration = async (req, res, next) => {
        let { password } = req.body;
        password = await bcrypt.hash(password, 12);
        const resp = await this.userRepository.userRegistration({ ...req.body, password });
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

    userLogin = async (req, res, next) => {
        const resp = await this.userRepository.userLogin(req.body);
        if (resp.success) {
            const token = jwt.sign(
                { _id: resp.res._id, userName: resp.res.name },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1h",
                }
            );
            res
                .cookie("jwtToken", token, { maxAge: 1 * 60 * 60 * 1000, httpOnly: true })
                .json({ success: true, msg: "user login successful", token });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }

    userLogout = (req, res, next) => {
        res.clearCookie("jwtToken").json({ success: true, msg: "logout successful" });
    }

    userLogoutFromAllDevices = (req, res, next) => {
        res.send('user log out from all devices page')
    }

    getUserDetailById = (req, res, next) => {
        res.send('get user detail by id page')
    }

    getAllUserDetail = (req, res, next) => {
        res.send('get detail of all users')
    }

    updateUserDetails = async (req, res, next) => {
        res.send("update user detail");
    }

    // updateUserPassword = async (req, res, next) => {
    //     const { newPassword } = req.body;
    //     const resp = await updateUserPasswordRepo(req._id, newPassword, next);
    //     if (resp.success) {
    //         res.status(201).json({
    //             success: true,
    //             msg: "password updated successfully",
    //             res: resp.res,
    //         });
    //     } else {
    //         next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
    //     }
    // }

}