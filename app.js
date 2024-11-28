require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const ListRouter = require("./routes/list");

const app = express();
const PORT = 3000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/items', ListRouter);

app.listen(PORT, () => {
  console.log('서버 실행');
})