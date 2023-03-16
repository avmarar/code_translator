import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || "4000";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.json({
    message: "Hello World!!!",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http:localhost:${PORT}`);
});
