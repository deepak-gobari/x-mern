import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import todoRoutes from "./routes/todo.routes.js";

import { serveFrontend } from "./config/frontend.js";


const app = express();

const port = process.env.PORT;
if (!port) throw new Error("PORT is missing in root .env");

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? process.env.WEBSITE_URL
        : process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.use("/api/todos", todoRoutes);

serveFrontend(app);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  connectDB();
});
