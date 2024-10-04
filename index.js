import express from "express";
import { APP_PORT, DATABASE_URL } from "./config/index.js";
import { connectDB } from "./config/mongoDB.js";
import cookieParser from "cookie-parser";
import router from "./routes/api.js";
// App Object
const app = express();

// Application Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


// app routes
app.use("/api", router);

// Start Server
app.listen(APP_PORT, async () => {
  console.log("Server started on port : " + APP_PORT);
  await connectDB(DATABASE_URL);
});
