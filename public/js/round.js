let gameId = Number(window.location.href.split("/")[4]);
const addButton = document.querySelector(".btn");
const scoreTable = document.getElementById("score");
const inputFields = [];
let roundCount = 0;

addButton.addEventListener("click", function () {
  roundCount++;
  // Thêm 1 dòng mới vào cuối bảng
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
  
  fetch("/api/v1/rounds", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      score1: Number(scores[7]),
      score2: Number(scores[6]),
      score3: Number(scores[5]),
      score4: Number(scores[4]),
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
    document.getElementById("player1").innerHTML = findData.player1;
    document.getElementById("player2").innerHTML = findData.player2;
    document.getElementById("player3").innerHTML = findData.player3;
    document.getElementById("player4").innerHTML = findData.player4;
  })
  .catch((err) => console.log(err));
fetch("/api/v1/round")
  .then((res) => res.json())
  .then((data) => {
    const points = data.map((round, index) => `
    <tr id="round-${index + 1}">
        <td>Round ${index + 2}</td>
        <td>${round.score1}</td>
        <td>${round.score2}</td>
        <td>${round.score3}</td>
        <td>${round.score4}</td>
    </tr>
`).join('');

    const tbody = document.getElementById("round-1");
    tbody.insertAdjacentHTML('beforeend', points);


  })
  .catch((err) => {
    console.log(err);
  });