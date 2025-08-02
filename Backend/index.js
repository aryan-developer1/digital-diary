const express = require("express");
const connectDb = require("./db/db_connection");
const diaryRoutes = require("./routes/diary.routes");
const cors = require("cors");
const app = express();
const port = 3000;
const allowedOrigins = [
  "http://localhost:5173",
  "https://digital-diary-ixpxbkv32-aryan-sonis-projects-8bf9baae.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // ✅ Allow
      } else {
        callback(new Error("Not allowed by CORS")); // ❌ Block
      }
    },
  })
);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/diary", diaryRoutes);

connectDb();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
