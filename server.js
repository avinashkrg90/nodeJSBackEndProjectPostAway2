import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
const app = express();
import { connectUsingMongoose } from './src/config/mongoose.js';
import bodyParser from 'body-parser';
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import cookieParser from "cookie-parser";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(loggerMiddleware);

import userRouter from './src/features/user/user.routes.js';
import postRouter from './src/features/post/post.routes.js';
import commentRouter from './src/features/comment/comment.routes.js';
import likeRouter from './src/features/like/like.routes.js';
import friendRouter from './src/features/friendship/friend.routes.js';
import otpRouter from './src/features/otp/otp.routes.js';

app.get('/', (req, res)=>{
    res.send("Hello and welcome to our server");
})

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);
app.use('/api/likes', likeRouter);
app.use('/api/friends', friendRouter);
app.use('/api/otp', otpRouter);

// Middleware to handle 404 requests
app.use((req, res)=>{
    res.status(404).send("API not found");
})

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log("server is listening on port " + PORT);
    connectUsingMongoose();
})



