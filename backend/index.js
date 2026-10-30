import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

import express from "express";
import { connectDB } from "./config/db.js";
import todoRoutes from "./routes/todo.routes.js";

import { serveFrontend } from "./config/frontend.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables from .env file outside of folder
dotenv.config({
  path: path.join(path.resolve(__dirname, ".."), ".env"),
});

const app = express();

const port = process.env.PORT;
if (!port) throw new Error("PORT is missing in root .env");

app.use(express.json());
app.use("/api/todos", todoRoutes);

serveFrontend(app);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  connectDB();
});
