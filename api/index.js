import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/authRoute.js";
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/anjaan-property")
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .then(() => {
    app.listen(4000, () => {
      console.log("server running 4000");
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("hi anjaan-property");
});

app.use(express.json());

app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
