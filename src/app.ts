import express from "express";
import path from "path";
import userRouter from "./routes/user.route";

const app = express();

app.use(express.json());

// ─── API Routes ────────────────────────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API is running",
  });
});

app.use("/api/v1/users", userRouter);

// ─── Serve Frontend (always) ──────────────────────────────────────────────────
const clientDistPath = path.join(process.cwd(), "client/dist");

// Serve static assets (JS, CSS, images, ...)
app.use(express.static(clientDistPath));

// SPA fallback: all non-API routes return index.html (Express 5 syntax)
app.get("/{*path}", (_req, res) => {
  res.sendFile(path.join(clientDistPath, "index.html"));
});

export default app;