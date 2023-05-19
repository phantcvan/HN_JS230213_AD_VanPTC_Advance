const express = require("express");
const server = express();
const router = express.Router()
const fs = require("fs");
const bodyParser = require("body-parser");
const roundRoutes = require("./routes/rounds.routes");
const playersRoutes = require("./routes/players.routes");
server.use(express.static('public'));
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())


server.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });
  
  server.get("/round/:id", (req, res) => {
    res.sendFile(__dirname + "/public/round.html");
  });
  
  server.use("/api/v1/player", playersRoutes);
  server.use("/api/v1/rounds", roundRoutes);




// Khai báo middleware xử lý trang 404
server.use((req, res, next) => {
    res.status(404).send('<h1>PAGE NOT FOUND</h1>');
});

// Cài đặt để server luôn chờ đợi và lắng nghe các request gửi lên từ client
server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});