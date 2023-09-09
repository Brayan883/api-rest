import express from 'express';
import "dotenv/config";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";

const  app = express();

app.disable('x-powered-by');
app.disable('etag');


app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);

export default app