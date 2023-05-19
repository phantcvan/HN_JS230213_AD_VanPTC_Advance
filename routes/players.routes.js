const express = require("express");
const router = express.Router();
const fs = require("fs");

module.exports = router;

//Lay ve tat ca player
router.get("/", (req, res) => {
  try {
    let players = JSON.parse(fs.readFileSync("./player-data/players.json"));
    res.json(players);
  } catch (error) {
    res.json({
      error,
    });
  }
});
//Them 1 game
router.post("/", (req, res) => {
  let { playername1, playername2, playername3, playername4 } = req.body;
  console.log(req.body);
  let newPlayer = {
    id: Math.floor(Math.random() * 10000000000000),
    gameId: Math.floor(Math.random() * 10000000000000),
    player1: playername1,
    player2: playername2,
    player3: playername3,
    player4: playername4,
  };
  try {
    let players = JSON.parse(fs.readFileSync("./player-data/players.json"));
    players.push(newPlayer);
    fs.writeFileSync("./player-data/players.json", JSON.stringify(players));
    res.json({
      messages: "Create Player Successfully!",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
});