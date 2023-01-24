const Group = require("../models/Group-model");

// create group
const createGroup = async(req,res)=>{
    try {
        const newGroup = new Group({
            ownerId:req.body.userId,
            name:req.body.name,
            desc:req.body.desc,
            photo:req.body.photo,
            members:req.body.userId,
        });
        await newGroup.save();
        return res.status(200).json("group created successfully!");
    } catch (error) {
        return res.status(500).json(error);
    }
}

// get all groups
const getAllGroups = async(req,res)=>{
    try {
        var groupList = [];
        const groups = await Group.find();
        groups.map((group)=>{
            const {_id,ownerId,name,desc,photo,members} = group._doc;
            groupList.push({_id,ownerId,name,desc,photo,members});
        })
        return res.status(200).json(groupList);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// get one group
const getOneGroup = async(req,res)=>{
    try {
        const group = await Group.findById(req.params.groupId);
        return res.status(200).json(group);
    } catch (error) {
        return res.status(500).json(error);
    }
}

// update one group
const updateOneGroups = async(req,res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json(error);
    }
}

// delete one group
const deleteOneGroups = async(req,res)=>{
    try {
        await Group.findByIdAndDelete(req.body.groupId);
        return res.status(200).json("group deleted successfully");
    } catch (error) {
        return res.status(500).json(error);
    }
}

// like and dislike group
const likeAndDislikeGroup = async(req,res)=>{
    try {
        const group = await Group.findById(req.params.groupId);
        if (!group.likes.includes(req.body.userId)) {
            await group.updateOne({ $push: { likes: req.body.userId } });
            return res.status(200).json("The group has been liked");
        }else{
            await group.updateOne({ $pull: { likes: req.body.userId } });
            return res.status(200).json("The group has been disliked");
        }
    }catch(err) {
        return res.status(500).json(err);
    }
}

// join group
const joinGroup = async(req,res)=>{
    try {
        const group = await Group.findById(req.params.groupId);
        if (!group.members.includes(req.body.userId)) {
            await group.updateOne({ $push: { members: req.body.userId } });
            return res.status(200).json("you are join");
        }else{
            await group.updateOne({ $pull: { members: req.body.userId } });
            return res.status(200).json("you are remove");
        }
    }catch(err) {
        return res.status(500).json(err);
    }
}


module.exports = {createGroup,getOneGroup,getAllGroups,updateOneGroups,deleteOneGroups,likeAndDislikeGroup,joinGroup};