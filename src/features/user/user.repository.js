// import { customErrorHandler } from "../../middlewares/errorHandler.js";
import mongoose from "mongoose";
import { compareHashedPassword, hashPassword } from "../../utils/hashPassword.js";

import UserModel from "./user.schema.js";

export default class UserRepository {

    userRegistration = async (userData) => {
        try {
            const newUser = new UserModel(userData);
            await newUser.save();
            return { success: true, res: newUser };
        } catch (error) {
            // throw new Error("email duplicate");
            return { success: false, error: { statusCode: 400, msg: error } };
        }
    }

    userLogin = async (userData) => {
        try {
            const { email, password } = userData;
            const user = await UserModel.findOne({ email });
            if (!user) {
                return {
                    success: false,
                    error: { statusCode: 404, msg: "user not found" },
                };
            } else {
                let passwordValidation = await compareHashedPassword(password, user.password);
                if (passwordValidation) {
                    return { success: true, res: user };
                } else {
                    return {
                        success: false,
                        error: { statusCode: 400, msg: "invalid credentials" },
                    };
                }
            }
        } catch (error) {
            return {
                success: false,
                error: { statusCode: 400, msg: error },
            };
        }
    }

    getUserDetailById = async (id) => {
        try {
            const user = await UserModel.findById(id);
            if (!user) {
                return {
                    success: false,
                    error: { statusCode: 404, msg: "user not found" },
                };
            } else {
                return { success: true, res: user };
            }
        } catch (error) {
            return {
                success: false,
                error: { statusCode: 400, msg: error },
            };
        }
    }

    getAllUserDetail = async () => {
        try {
            const users = await UserModel.find();
            if (!users) {
                return {
                    success: false,
                    error: { statusCode: 404, msg: "no user found" },
                };
            } else {
                return { success: true, res: users };
            }
        } catch (error) {
            return {
                success: false,
                error: { statusCode: 400, msg: error },
            };
        }
    }

    updateUserDetails = async (id, name, age, gender, email) => {
        try {
            const user = await UserModel.findById(id);
            if (!user) {
                return {
                    success: false,
                    error: { statusCode: 404, msg: "no such user found" },
                };
            } else {
                user.name = name;
                user.age = age;
                user.gender = gender;
                user.email = email;
                await user.save();
                return { success: true, res: user };
            }
        } catch (error) {
            return {
                success: false,
                error: { statusCode: 400, msg: error },
            };
        }
    }

    // updateUserPasswordRepo = async (_id, newpassword, next) => {
    //     try {
    //         const user = await UserModel.findOne({ _id });
    //         if (!user) {
    //             return {
    //                 success: false,
    //                 error: { statusCode: 404, msg: "user not found" },
    //             };
    //         } else {
    //             const newHashedPassword = await hashPassword(newpassword, next);
    //             user.password = newHashedPassword;
    //             let updatedUser = await user.save();
    //             return { success: true, res: updatedUser };
    //         }
    //     } catch (error) {
    //         return {
    //             success: false,
    //             error: { statusCode: 400, msg: error },
    //         };
    //     }
    // }
}
