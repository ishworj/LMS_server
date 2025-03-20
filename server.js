import express from "express";
import cors from "cors";
import { connectDb } from "./src/config/mongoDbConnection.js";
import morgan from "morgan";
import authRouter from "./src/routers/authRouter.js";
import bookRouter from "./src/routers/bookRouter.js";
import borrowRouter from "./src/routers/borrowHistoryRouter.js";
import reviewRouter from "./src/routers/reviewRouter.js";

import { errorHandler } from "./src/middlewares/errorHandler.js";
import { SendMail } from "./src/config/nodemailerConfig.js";

const PORT = 8080;
const app = express();

//middlewares
app.use(express.json());
app.use(cors());

// user router
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/borrows", borrowRouter);
app.use("/api/v1/reviews", reviewRouter);
// serve static files ie image
app.use("/image", express.static("assets/images"));

app.use(express.static);
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("", (req, res) => {
  res.json({
    message: "server is working",
  });
});

app.use(errorHandler);
connectDb()
  .then(() => {
    console.log("connected to database");
    app.listen(PORT, (error) =>
      error ? console.error(error) : console.log("Server running at", PORT)
    );
  })
  .catch((error) => {
    console.log(error);
    console.log("Error connecting to DB");
  });
