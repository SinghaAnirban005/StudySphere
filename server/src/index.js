import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from "./app.js"
import { server } from "./app.js"

dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    server.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on http://localhost:${process.env.PORT}`);
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})