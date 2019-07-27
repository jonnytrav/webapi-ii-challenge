const express = require("express");
const server = express();
server.use(express.json());

const port = 8000;

server.listen(port, (req, res) => {
  console.log(`Server running on 'http://localhost:${port}'.`);
});
