const express = require("express");
const groupRouter = express.Router();

const {createGroup,getOneGroup,getAllGroups,updateOneGroups,deleteOneGroups,likeAndDislikeGroup,joinGroup} = require("../controllers/group-controller");

groupRouter.post('/',createGroup);

groupRouter.get('/get-all-groups',getAllGroups);

groupRouter.get('/:groupId',getOneGroup);

groupRouter.put('/like/:groupId',likeAndDislikeGroup);

groupRouter.put('/join/:groupId',joinGroup);

groupRouter.put('/:groupId',updateOneGroups);

groupRouter.delete('/:groupId',deleteOneGroups);

module.exports = groupRouter;