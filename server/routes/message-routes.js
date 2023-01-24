const express = require("express");
const messageRouter = express.Router();

const {addMessage,getMessage} = require("../controllers/message-controller");

// send message
messageRouter.post("/",addMessage);

// get message
messageRouter.get("/:conversationId",getMessage);

module.exports = messageRouter;