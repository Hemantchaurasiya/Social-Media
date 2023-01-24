const express = require("express");
const postRouter = express.Router();

const {createPost,getPost,updatePost,deletePost,likeAndDislikePost,getUsersPost,getTimelinePost,commentPost} = require("../controllers/post-controller");

// create post
postRouter.post("/",createPost);

// get post
postRouter.get("/:id",getPost);

// update post
postRouter.put("/:id",updatePost);

// delete post
postRouter.delete("/:id",deletePost);

// like post
postRouter.put("/:id/like",likeAndDislikePost);

// get user's post
postRouter.get("/profile/:username",getUsersPost);

// get timeline post
postRouter.get("/timeline/:userId",getTimelinePost);

postRouter.post("/comment",commentPost);

module.exports = postRouter;