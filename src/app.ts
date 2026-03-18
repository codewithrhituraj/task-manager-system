import { authMiddleware } from "./middleware/authMiddleware";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";


const app = express();

app.use(cors());
app.use(express.json()); 
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "You are authorized!" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});