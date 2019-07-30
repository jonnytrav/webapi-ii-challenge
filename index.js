const express = require("express");
const server = express();

server.use(express.json());
const postRoutes = require("./postRoutes");
server.use("/api/posts", postRoutes); //THIS LINE

server.get("/", (req, res) => {
  res.status(200).send("Base URL retrieved!");
});

const port = 8000;

server.listen(port, (req, res) => {
  console.log(`Server running on 'http://localhost:${port}'.`);
});
