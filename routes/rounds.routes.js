const express = require("express");
const router = express.Router();
const fs = require("fs");



//lấy dữ liệu game
router.get("/", (req, res) => {
  try {
    let rounds = JSON.parse(fs.readFileSync("./database/rounds.json"));
    res.json(rounds);
  } catch (error) {
    res.json({
      error,
    });
  }
});
//Lay ve 1 game
router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    let rounds = JSON.parse(fs.readFileSync("./database/rounds.json"));
    const findGame = rounds.find((e) => e.gameId === +id);
    console.log(findGame);
    res.json(findGame);
  } catch (error) {
    res.json({
      error,
    });
  }
});
//Them moi round
router.post("/", (req, res) => {
  let { scoreplayer1, scoreplayer2, scoreplayer3, scoreplayer4, gameId } =
    req.body;
  console.log(req.body);
  if (!scoreplayer1 || !scoreplayer2 || !scoreplayer3 || !scoreplayer4) {
    res.json({
      messages: "ko hop le",
    });
  } else {
    let a = 0;
    let newRound = {
      id: Math.floor(Math.random() * 10000000000000),
      round: Math.floor(Math.random() * 1000000000000000),
      gameId,
      scoreplayer4,
      scoreplayer3,
      scoreplayer2,
      scoreplayer1,
    };
    console.log(newRound);
    try {
      let rounds = JSON.parse(fs.readFileSync("./database/rounds.json"));
      rounds.push(newRound);
      fs.writeFileSync("./database/rounds.json", JSON.stringify(rounds));
      res.json({
        messages: "Create Round Successfully!",
      });
    } catch (error) {
      res.json({
        error,
      });
    }
  }
});

module.exports = router;