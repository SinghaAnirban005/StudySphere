import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";  
import { Server } from "socket.io"; 

import Message from "./models/Message.model.js";

const app = express();

const corsOptions = {
    origin: 'https://study-sphere-theta.vercel.app',  
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],  
    credentials: true  
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.routes.js";
import groupRouter from "./routes/group.routes.js";
import resourceRouter from "./routes/resource.routes.js";
import chatRouter from "./routes/chat.routes.js";
import whiteboardRouter from "./routes/whiteboard.routes..js"

app.use("/api/v1/users", userRouter);
app.use('/api/v1/group', groupRouter);
app.use('/api/v1/resource', resourceRouter);
app.use('/api/v1/chat', chatRouter);
app.use('/api/v1/whiteboard', whiteboardRouter)

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://study-sphere-theta.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  }
});


io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_group", async (groupId) => {
    socket.join(groupId);
    console.log(`User ${socket.id} joined group: ${groupId}`);

    try {
      const messages = await Message.find({ groupId }).sort({ timestamp: 1 });
      socket.emit('chat_history', messages);
    } catch (err) {
      console.error('Failed to load chat history:', err);
    }
  });
    
  socket.on("send_message", async (data) => {
    const { groupId, message, userId, username } = data;

    const newMessage = new Message({
      groupId,
      userId,
      username,
      message,
      timestamp: new Date()
    });

    try {
      await newMessage.save();  
        
      io.to(groupId).emit("receive_message", {
        message,
        userId,
        username,
        timestamp: newMessage.timestamp 
      });

      console.log(`Message sent to group ${groupId} by user ${username}: ${message}`);
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  socket.on("leave_group", (groupId) => {
    socket.leave(groupId);
    console.log(`User ${socket.id} left group: ${groupId}`);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});


export { app, server };
