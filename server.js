import express from "express";
import cors from "cors";

const PORT = 8080;
const app = express();

//middlewares
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log("server running");
});

app.get("", (req, res) => {
  res.json({
    message: "server is working",
  });
});
