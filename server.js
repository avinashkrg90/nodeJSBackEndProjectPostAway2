import express from 'express'
import dotenv from 'dotenv'
dotenv.config();
const app = express();

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

const PORT = process.env.PORT;
app.listen(PORT, ()=>{
    console.log("server is listening on port " + PORT);
})



