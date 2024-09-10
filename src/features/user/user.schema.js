import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        minLength: [3, "The name should be at least 3 characters long"],
    },
    email: {
        type: String,
        unique: [true, "email already exist"],
        required: [true, "email is required"],
        match: [/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/],
    },
    mobile: {
        type: String,
        required: true,
        unique: [true, "user with same mobile number already registered"],
    },
    age: {
        type: Number,
        required: [true, "age is required"],
        validate: {
            validator: function (userAge) {
                return userAge > 0 && userAge <= 100;
            },
            message: "age must be b/w 0 and 100",
        },
    },
    gender:{
        type:String,
        required:true,
        enum:["male", "female", "others"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    }

})

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
