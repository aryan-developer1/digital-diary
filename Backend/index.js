const express = require('express')
const connectDb = require("./db/db_connection")
const diaryRoutes = require("./routes/diary.routes")
const cors = require("cors")
const app = express()
const port = 3000

app.use(cors({
    origin:"http://localhost:5173"
}));
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/v1/diary",diaryRoutes)

connectDb()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
