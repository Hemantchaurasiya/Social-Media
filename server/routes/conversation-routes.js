const express = require("express");
const conversationRouter = express.Router();

const {newConversation,getConversation,getConversaiotnTwoUser} = require("../controllers/conversation-controller");

// create new conversation
conversationRouter.post("/",newConversation);

// get conversation
conversationRouter.get("/:userId",getConversation);

// get two user conversation
conversationRouter.get("/find/:firstUserId/:secondUserId",getConversaiotnTwoUser);

module.exports = conversationRouter;