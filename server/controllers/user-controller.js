const User = require("../models/User-model");

// get user
const getUser = async (req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try {
        const user = userId ? await User.findById(userId)
            : await User.findOne({ username: username });
        const { password, updatedAt,createdAt,__v, ...other } = user._doc;
        return res.status(200).json(other);
    } catch (err) {
        return res.status(500).json(err);
    }
}
// get all users
const getAllUser = async (req, res) => {
    var userlist = [];
    try {
        const usersData = await User.find();
        usersData.map((user)=>{
            let { _id, username, profilePicture } = user._doc;
            userlist.push({ _id, username, profilePicture });
        });
        return res.status(200).json(userlist);
    } catch (err) {
        return res.status(500).json(err);
    }
}

// update user
const updateUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndUpdate(req.params.id, { $set: req.body.user });
            return res.status(200).json("Account has been updated");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can delete only your account!");
    }
}

// delete user
const deleteUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("Account has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can delete only your account!");
    }
}

// get friends(followings)
const getFriends = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map(friendId => {
                return User.findById(friendId);
            })
        )
        let friendList = [];
        friends.map((user)=>{
            let { _id, username, profilePicture } = user._doc;
            friendList.push({ _id, username, profilePicture });
        });
        return res.status(200).json(friendList);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// get followers
const getFollowers = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const Followers = await Promise.all(
            user.followers.map(followerId => {
                return User.findById(followerId);
            })
        )
        let followersList = [];
        Followers.map((user)=>{
            let { _id, username, profilePicture } = user._doc;
            followersList.push({ _id, username, profilePicture });
        });
        return res.status(200).json(followersList);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// follow user
const followUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                return res.status(200).json("user has been followed");
            } else {
                return res.status(403).json("you allready follow this user");
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("you can't follow yourself");
    }
}

//unfollow a user
const unfollowUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                return res.status(200).json("user has been unfollowed");
            } else {
                return res.status(403).json("you don't follow this user");
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("you can't unfollow yourself");
    }
}

module.exports = { updateUser, deleteUser, getUser,getAllUser, getFriends,getFollowers, followUser, unfollowUser }