import express from "express";
import "dotenv/config";
import helmet from "helmet";
import helmetCsp from "helmet-csp";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/Post.route.js";

const app = express();

// Middlewares de seguridad
app.disable("etag");
app.use(helmet());
app.use(
  helmetCsp({
    directives: {
      defaultSrc: ["'self'"],
    },
  })
);

// Middleware de manejo de CORS
const listWhitelist = [process.env.permission];
app.use(
  cors((origin, callback) => {
    if (!origin || listWhitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} no es permitido`));
    }
  })
);

// Middleware de manejo de cookies y JSON
app.use(cookieParser());
app.use(express.json());

// Rutas de la aplicación
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts", postRoutes);

export default app;
