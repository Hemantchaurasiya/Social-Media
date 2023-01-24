const Conversation = require("../models/Conversation-model");

// new conversation
const newConversation = async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });

    try {
        const savedConversation = await newConversation.save();
        return res.status(200).json(savedConversation);
    } catch (err) {
        return res.status(500).json(err);
    }
}

// get conversation of user
const getConversation = async (req, res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        return res.status(200).json(conversation);
    } catch (err) {
        return res.status(500).json(err);
    }
}

// get conversation include two users
const getConversaiotnTwoUser = async (req, res) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.firstUserId, req.params.secondUserId] },
        });
        return res.status(200).json(conversation);
    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports = {newConversation,getConversation,getConversaiotnTwoUser};