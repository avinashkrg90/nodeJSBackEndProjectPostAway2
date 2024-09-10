import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { customErrorHandler } from "../../middlewares/errorHandler.js";
import path from 'path';
import fs from 'fs';
import UserRepository from "./user.repository.js";
import { __dirname } from "../../../server.js";

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

    getUserDetailById = async (req, res, next) => {
        const { userId } = req.params;
        const resp = await this.userRepository.getUserDetailById(userId);
        if (resp.success) {
            res.status(201).json({
                success: true,
                msg: "user found",
                res: resp.res,
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }

    getAllUserDetail = async (req, res, next) => {
        const resp = await this.userRepository.getAllUserDetail();
        if (resp.success) {
            res.status(201).json({
                success: true,
                msg: "users found",
                res: resp.res,
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }

    updateUserDetails = async (req, res, next) => {
        const { userId } = req.params;
        const { name, age, gender, email } = req.body;
        const resp = await this.userRepository.updateUserDetails(userId, name, age, gender, email);
        if (resp.success) {
            res.status(201).json({
                success: true,
                msg: "user details updated",
                res: resp.res,
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }

    uploadAvatar = async (req, res, next) => {
        const obj = {
            name: req.body.name,
            user: req._id,
            img: {
                data: fs.readFileSync(path.join(__dirname + '/uploads/avatars/' + req.file.filename)),
                contentType: 'image/jpg'
            }
        }
        console.log(obj);
        const resp = await this.userRepository.uploadAvatar(obj);
        if (resp.success) {
            res.status(201).json({
                success: true,
                msg: "avatar uploaded",
                res: resp.res,
            });
        } else {
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
    }

    fetchAvatar = async (req, res, next) => {
        const {id} = req.params;
        const resp = await this.userRepository.getAvatar(id);
        if (resp.success){
            res.status(201).json({
                success: true,
                msg: "found avatar",
                res: resp.res,
            })
        } else{
            next(new customErrorHandler(resp.error.statusCode, resp.error.msg));
        }
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