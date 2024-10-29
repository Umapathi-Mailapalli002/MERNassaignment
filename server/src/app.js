import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";


const app = express();

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes
import userRouter from "./routes/user.routes.js";
import ticketRoutes from "./routes/ticket.routes.js";
import noteRoutes from "./routes/note.routes.js";
app.use("/api/v1/users", userRouter);
app.use("/api/tickets", ticketRoutes);
app.use("/api/notes", noteRoutes);

//https://localhost:8000/api/v1/users/register
export {app}