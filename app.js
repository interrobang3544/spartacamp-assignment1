const express = require("express");
const connect = require("./schemas");
const app = express();
const port = 3000;

connect();

const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");

app.use(express.json());
app.use("/", [postsRouter, commentsRouter]);

app.listen(port, () => {
  console.log(port, "포트로 서버가 켜졌어요!");
})