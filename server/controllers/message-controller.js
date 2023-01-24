const Message = require("../models/Message-model");

// add message
const addMessage = async (req, res) => {
    const newMessage = new Message(req.body);
    try {
        const savedMessage = await newMessage.save();
        return res.status(200).json(savedMessage);
    } catch (err) {
        return res.status(500).json(err);
    }
}

// get message
const getMessage = async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {addMessage,getMessage};