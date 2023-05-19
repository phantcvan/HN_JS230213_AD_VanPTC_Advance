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


//lấy về dữ liệu 1 game
router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    let rounds = JSON.parse(fs.readFileSync("./database/rounds.json"));
    const findGame = rounds.find((game,i) => game.gameId === +id);
    console.log(findGame);
    res.json(findGame);
  } catch (error) {
    res.json({
      error,
    });
  }
});

//Thêm 1 round mới
router.post("/", (req, res) => {
  let { score1, score2, score3, score4, gameId } =    req.body;
  console.log(req.body);
  if (!score1 || !score2 || !score3 || !score4) {
    res.json({
      messages: "Input blank",
    });
  } else {

    try {
      let rounds = JSON.parse(fs.readFileSync("./database/rounds.json"));
      let id=1;
      let roundId=1;
      if (rounds.length>1) id=rounds[rounds.length-1].id+1;
      if (rounds.length>1) roundId=rounds[rounds.length-1].roundId+1;
      let newRound = {
        id: id,
        roundId: roundId,
        gameId,
        score1,
        score2,
        score3,
        score4,
      };
      console.log(newRound);
      rounds.push(newRound);
      fs.writeFileSync("./database/rounds.json", JSON.stringify(rounds));
      res.json({
        messages: "Create Round Successfully",
      });
    } catch (error) {
      res.json({
        error,
      });
    }
  }
});

module.exports = router;