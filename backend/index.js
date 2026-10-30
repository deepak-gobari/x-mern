import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import todoRoutes from "./routes/todo.routes.js";

dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());

app.use("/api/todos", todoRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port: ${port}`);
});
