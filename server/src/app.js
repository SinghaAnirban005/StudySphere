import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import http from "http"
import { Server } from "socket.io"
import Message from "./models/Message.model.js"


const app = express()
const corsOptions = {
    origin: 'http://localhost:5173',  
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],  
    credentials: true  
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentialsc: true
    }
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Listen for "send_message" event
    socket.on('send_message', async ({ groupId, senderId, content }) => {
        try {
            // Create a new message in the database
            const newMessage = await Message.create({
                sender: senderId,
                groupId,
                content
            });

            // Emit the message to everyone in the group
            io.to(groupId).emit('receive_message', newMessage);
        } catch (error) {
            console.error("Error storing message:", error);
        }
    });

    // Join the user to a group room
    socket.on('join_group', (groupId) => {
        socket.join(groupId);
        console.log(`User ${socket.id} joined group ${groupId}`);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

import userRouter from "./routes/user.routes.js"
import groupRouter from "./routes/group.routes.js"
import resourceRouter from "./routes/resource.routes.js"
import chatRouter from "./routes/chat.routes.js"

app.use("/api/v1/users", userRouter)
app.use('/api/v1/group', groupRouter)
app.use('/api/v1/resource', resourceRouter)
app.use('/api/v1/chat', chatRouter)


export {app, server, io}
