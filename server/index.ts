import { Request, Response } from "express";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { errorHandler } from "./middleware/errorMiddleware";
import { connectDB } from "./config/db";

const PORT = process.env.PORT || 8000;

// Connect to DB
connectDB();

const app = express();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json()); // allows us to send json
app.use(express.urlencoded({ extended: true })); // allows us to send url encoded

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
