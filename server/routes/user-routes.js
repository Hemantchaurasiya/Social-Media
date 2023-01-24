const express = require("express");
const userRouter = express.Router();

const {updateUser,deleteUser,getUser,getAllUser,getFriends,getFollowers,followUser,unfollowUser} = require("../controllers/user-controller");

// update user
userRouter.put("/:id",updateUser);

// get user
userRouter.get("/",getUser);

// get all users
userRouter.get("/get-all-users",getAllUser);

// delete user
userRouter.delete(":id",deleteUser);

// get friends(followings)
userRouter.get("/friends/:userId",getFriends);

// get followers
userRouter.get("/followers/:userId",getFollowers);

// follow user
userRouter.put("/:id/follow",followUser);

//unfollow user
userRouter.put("/:id/unfollow",unfollowUser);


module.exports = userRouter;