
import UserModel from "../user/user.schema.js";

export default class FriendRepository {

    getFriends = async (userId) => {
        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                return {
                    success: false,
                    error: { statusCode: 404, msg: "no user found" },
                };
            } else {
                if (user.friends.length)
                    return { success: true, res: user.friends };
                else
                    return { success: true, res: { msg: "no friend found" } }
            }
        } catch (error) {
            return {
                success: false,
                error: { statusCode: 400, msg: error },
            };
        }
    }

    getPendingFriendRequest = async (userId) => {
        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                return {
                    success: false,
                    error: { statusCode: 404, msg: "no user found" },
                };
            } else {
                return { success: true, res: user.pendingFriendRequest };   
            }
        } catch (error) {
            return {
                success: false,
                error: { statusCode: 400, msg: error },
            };
        }
    }

    toggleFriendship = async (friendId, userId) => {
        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                return {
                    success: false,
                    error: { statusCode: 404, msg: "user not found" },
                };
            } else {
                if (user.friends.includes(friendId)){
                    user.friends.pull(friendId);
                    const savedUser = await user.save();
                    const friendUser = await UserModel.findById(friendId);
                    if (friendUser.friends.includes(userId)){
                        friendUser.friends.pull(userId);
                        await friendUser.save();
                    }
                    return { success: true, res: savedUser };
                }
                return { success: true, res: likes };
            }
        } catch (error) {
            return {
                success: false,
                error: { statusCode: 400, msg: error },
            };
        }
    }

    responseTorequest = async (friendId, response, userId) => {
        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                return {
                    success: false,
                    error: { statusCode: 404, msg: "user not found" },
                };
            } else {
                if (user.pendingFriendRequests.includes(friendId)){
                   if (response == "accept"){
                        user.friends.push(friendId);
                        user.pendingFriendRequests.pull(friendId);
                        const savedUser = await user.save();
                        const friendUser = await UserModel.findById(friendId);
                        friendUser.friends.push(userId);
                        await friendUser.save();
                        return { success: true, res: savedUser };
                   }else{
                        user.pendingFriendRequests.pull(friendId);
                        const savedUser = await user.save();
                        return { success: true, res: savedUser };
                   }
                }else{
                    return {
                        success: false,
                        error: { statusCode: 404, msg: "no such friend request found" },
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

    sendFriendRequest = async (friendId, userId) => {
        try{
            const friendUser = await UserModel.findById(friendId);
            friendUser.pendingFriendRequests.push(userId);
            const savedFriendUser = await friendUser.save();
            return {success : true, res : friendUser};
        }catch(error){
            return {
                success : false,
                error : {statusCode: 400, msg: error}
            }
        }
    }
}