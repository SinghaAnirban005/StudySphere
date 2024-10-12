import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

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

import userRouter from "./routes/user.routes.js"
import groupRouter from "./routes/group.routes.js"

app.use("/api/v1/users", userRouter)
app.use('/api/v1/group', groupRouter)

export {app}