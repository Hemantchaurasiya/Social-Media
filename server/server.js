const express = require('express');
const cors = require('cors');
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const DbConnect = require('./database');
require('dotenv').config();
const app = express();

// routes
const authRouter = require("./routes/auth-routes");
const userRouter = require("./routes/user-routes");
const postRouter = require("./routes/post-routes");
const groupRouter = require("./routes/group-routes");
const conversationRouter = require("./routes/conversation-routes");
const messageRouter = require("./routes/message-routes");

const isAuthenticated = require("./middlewares/auth-middleware");

const PORT = process.env.PORT || 5500;

// database connection
DbConnect();

// middlewares
const corsOption = {
    credentials: true,
    origin: [process.env.ORIGIN],
};
app.use(cors(corsOption));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// routes
app.use("/api/auth", authRouter);
app.use("/api/user", isAuthenticated, userRouter);
app.use("/api/post", isAuthenticated, postRouter);
app.use("/api/group", isAuthenticated, groupRouter);
app.use("/api/conversation", isAuthenticated, conversationRouter);
app.use("/api/message", isAuthenticated, messageRouter);

// server
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));