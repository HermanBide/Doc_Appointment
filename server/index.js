import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./db/connectDB.js";
// Import your routes and controllers
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import doctorRoute from "./routes/doctor.js";
import reviewRoute from "./routes/review.js";
dotenv.config({ path: "./.env" });

const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 204,
};

//mongodatabase connect

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/doctors", doctorRoute);
app.use("/api/v1/reviews", reviewRoute);

//
app.get("/", (req, res) => {
  res.status(200).send({
    message: "server is running",
  });
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on ${process.env.PORT}`);
});
