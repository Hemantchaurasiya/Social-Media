const User = require("../models/User-model");
const Post = require("../models/Post-model");
const Comment = require("../models/Comment-model");

// create post
const createPost = async(req,res)=>{
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        return res.status(200).json(savedPost);
    }catch(err) {
        return res.status(500).json(err);
    }
}

// get post
const getPost = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        return res.status(200).json(post);
    } catch (err) {
        return res.status(500).json(err);
    }
}

// update post
const updatePost = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            return res.status(200).json("the post has been updated");
        }else{
            return res.status(403).json("you can update only your post");
        }
    }catch(err) {
        return res.status(500).json(err);
    }
}

// delete post
const deletePost = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            return res.status(200).json("the post has been deleted");
        }else{
            return res.status(403).json("you can delete only your post");
        }
    }catch(err) {
        return res.status(500).json(err);
    }
}

// like and dislike post
const likeAndDislikePost = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            return res.status(200).json("The post has been liked");
        }else{
            await post.updateOne({ $pull: { likes: req.body.userId } });
            return res.status(200).json("The post has been disliked");
        }
    }catch(err) {
        return res.status(500).json(err);
    }
}

// comment post
const commentPost = async(req,res)=>{
    try {
        const newComment = new Comment({
            postId:req.body.postId,
            username:req.body.username,
            desc:req.body.desc,
        });
        await newComment.save();
        const post = await Post.findById(req.body.postId);
        await post.updateOne({$push: { comments: req.body.username}});
        return res.status(200).json("successfull");
    } catch (error) {
        return res.status(500).json(error);
    }
}

// get user's post
const getUsersPost = async(req,res)=>{
    try {
        const user = await User.findOne({username:req.params.username});
        const posts = await Post.find({userId:user._id});
        return res.status(200).json(posts);
    }catch(err) {
        return res.status(500).json(err);
    }
}

// get timeline post
const getTimelinePost = async(req,res)=>{
    try {
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Post.find({ userId: currentUser._id });
        const friendPosts = await Promise.all(
          currentUser.followings.map((friendId) => {
            return Post.find({ userId: friendId });
          })
        );
        return res.status(200).json(userPosts.concat(...friendPosts))
    }catch(err){
        return res.status(500).json(err);
    }
}

module.exports = {createPost,getPost,updatePost,deletePost,likeAndDislikePost,getUsersPost,getTimelinePost,commentPost}