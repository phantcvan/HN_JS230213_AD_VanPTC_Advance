let gameId = window.location.href.split("/")[4];
const addButton = document.querySelector(".btn");
const scoreTable = document.getElementById("score-body");
const inputFields = [];
let roundCount = 0;

addButton.addEventListener("click", function () {
  roundCount++;
  const newRow = scoreTable.insertRow(-1);
  newRow.id = `round-${roundCount}`;
  const roundCell = newRow.insertCell(0);
  roundCell.textContent = `Round ${roundCount}`;

  for (let i = 0; i < 4; i++) {
    const scoreCell = newRow.insertCell(i + 1);
    const input = document.createElement("input");
    input.type = "number";
    scoreCell.appendChild(input);
    inputFields.unshift(input);
  }

  const scores = inputFields.map((field) => field.value);
  console.log(scores);
  fetch("/api/v1/round", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      scoreplayer1: scores[7],
      scoreplayer2: scores[6],
      scoreplayer3: scores[5],
      scoreplayer4: scores[4],
      gameId,
    }),
  });
});
let listPlayers;
fetch("/api/v1/player")
  .then((res) => res.json())
  .then((data) => {
    listPlayers = data;
    let findData = listPlayers.find((e) => e.gameId === +gameId);
    document.getElementById("pl1").innerHTML = findData.player1;
    document.getElementById("pl2").innerHTML = findData.player2;
    document.getElementById("pl3").innerHTML = findData.player3;
    document.getElementById("pl4").innerHTML = findData.player4;
  })
  .catch((err) => console.log(err));
  fetch("/api/v1/round")
  .then((res) => res.json())
  .then((data) => {
      const points = data.map((roundData, index) => `
      <tr id="round-${index + 1}">
          <td>Round ${index + 1}</td>
          <td>${roundData.scoreplayer1}</td>
          <td>${roundData.scoreplayer2}</td>
          <td>${roundData.scoreplayer3}</td>
          <td>${roundData.scoreplayer4}</td>
      </tr>
      `)
  .join('');
      document.getElementById('round-1').innerHTML = points;
   }) 
  .catch((err) => {
      console.log(err);
   });