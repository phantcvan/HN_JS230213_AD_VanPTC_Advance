const express = require("express");
const router = express.Router();
const fs = require("fs");



// lấy về dữ liệu players
router.get("/", (req, res) => {
  try {
    let players = JSON.parse(fs.readFileSync("./database/players.json"));
    res.json(players);
  } catch (error) {
    res.json({
      error,
    });
  }
});


//Thêm game
router.post("/", (req, res) => {
  let { player1, player2, player3, player4 } = req.body;

  let newPlayer = {
    id: Math.floor(Math.random() * 10000000000000),
    gameId: Math.floor(Math.random() * 10000000000000),
    player1: player1,
    player2: player2,
    player3: player3,
    player4: player4,
  };
  try {
    let players = JSON.parse(fs.readFileSync("./database/players.json"));
    let id=1;

    players.push(newPlayer);
    fs.writeFileSync("./database/players.json", JSON.stringify(players));
    res.json({
      messages: "Create Player Successfully!",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});

module.exports = router;