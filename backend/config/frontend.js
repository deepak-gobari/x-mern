import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendDist = path.resolve(__dirname, "../../frontend/dist");

export const serveFrontend = (app) => {
  app.use(express.static(frontendDist));

  app.get("/{*splat}", (req, res, next) => {
    if (req.path.startsWith("/api/")) return next();

    res.sendFile(path.join(frontendDist, "index.html"));
  });
};