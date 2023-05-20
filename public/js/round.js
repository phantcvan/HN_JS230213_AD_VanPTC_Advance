let gameId = Number(window.location.href.split("/")[4]);
const addButton = document.querySelector(".btn");
const scoreTable = document.getElementById("score");
const rowLimit = 3;
let roundData = [];
let count = 0;

// Render player
let listPlayers;
fetch("/api/v1/player")
  .then((res) => res.json())
  .then((data) => {
    listPlayers = data;
    let findData = listPlayers.find((e) => e.gameId === gameId);
    document.getElementById("player1").innerHTML = findData.player1;
    document.getElementById("player2").innerHTML = findData.player2;
    document.getElementById("player3").innerHTML = findData.player3;
    document.getElementById("player4").innerHTML = findData.player4;
  })
  .catch((err) => console.log(err));


addButton.addEventListener("click", function () {
  count++;
  if (count > rowLimit) {
    addButton.style.display = "none";
    return;
  }

  const newRow = scoreTable.insertRow(-1);
  newRow.id = `round-${count}`;
  const roundCell = newRow.insertCell(0);
  roundCell.textContent = `Round ${count}`;

  const round = [];
  for (let i = 0; i < 4; i++) {
    const scoreCell = newRow.insertCell(i + 1);
    const input = document.createElement("input");
    input.type = "number";
    scoreCell.appendChild(input);
    round.push(input);
    input.addEventListener("input", function () {
      round[i] = input;
      console.log("INPUT",input);
    });
  }
  roundData.unshift(round);

  const playerScores = { sumScore1: 0, sumScore2: 0, sumScore3: 0, sumScore4: 0 };

  roundData.forEach(round => {
    round.forEach((input, i) => {
      const playerIndex = (i % 4);
      const score = parseInt(input.value);

      if (!isNaN(score)) {
        const playerKey = `sumScore${playerIndex + 1}`;
        playerScores[playerKey] += score;
      }
    });
  });

  const sum = `<tr class="sum" id="sumScore">
  <td>Sum of scores (${playerScores.sumScore1 + playerScores.sumScore2 + playerScores.sumScore3 + playerScores.sumScore4})</td>
  <td>${playerScores.sumScore1}</td>
  <td>${playerScores.sumScore2}</td>
  <td>${playerScores.sumScore3}</td>
  <td>${playerScores.sumScore4}</td>
</tr>`;
  document.getElementById("sumScore").innerHTML = sum;

  const scores = roundData.flat().slice(4, 8).map(input => Number(input.value));

  fetch("/api/v1/rounds", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      score1: scores[0],
      score2: scores[1],
      score3: scores[2],
      score4: scores[3],
      gameId,
    }),
  });


  if (count === 3) {
    addButton.removeEventListener("click", saveResult);
    addButton.textContent = "Save Result";
    addButton.addEventListener("click", saveResult);
  }

  function saveResult() {
    const inputs = document.querySelectorAll("input[type='number']");

    inputs.forEach((input) => {
      // Chuyển nút input thành span-> người dùng không sửa kết quả được nữa
      const span = document.createElement("span");
      span.textContent = input.value;
      input.parentNode.replaceChild(span, input);
    });


    const scoresFinal = roundData.flat().slice(0, 4).map(input => Number(input.value));
    let total = playerScores.sumScore1 + playerScores.sumScore2 + playerScores.sumScore3 + playerScores.sumScore4 + scoresFinal.reduce((acc, cur) => acc + cur, 0);
    const result = `<tr class="sum" id="sumScore">
    <td>Sum of scores (${total})</td>
    <td>${playerScores.sumScore1 + scoresFinal[0]}</td>
    <td>${playerScores.sumScore2 + scoresFinal[1]}</td>
    <td>${playerScores.sumScore3 + scoresFinal[2]}</td>
    <td>${playerScores.sumScore4 + scoresFinal[3]}</td>
  </tr>`;
    document.getElementById("sumScore").innerHTML = result;

    fetch("/api/v1/rounds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        score1: scoresFinal[0],
        score2: scoresFinal[1],
        score3: scoresFinal[2],
        score4: scoresFinal[3],
        gameId,

      }),
    }).then(response => {
      addButton.style.display = "none"; // Ẩn nút sau khi lưu thành công
    });

  }


});



// Render điểm
fetch(`/api/v1/rounds/${gameId}`)
  .then((res) => res.json())
  .then((data) => {
    let sumScore1 = 0;
    let sumScore2 = 0;
    let sumScore3 = 0;
    let sumScore4 = 0;
    let total = 0
    for (let i = 0; i < data.length; i++) {
      sumScore1 += Number(data[i].score1);
      sumScore2 += Number(data[i].score2);
      sumScore3 += Number(data[i].score3);
      sumScore4 += Number(data[i].score4);
      total += Number(data[i].score1) + Number(data[i].score2) + Number(data[i].score3) + Number(data[i].score4)
    }

    const sum = `<tr class="sum" id="sumScore">
      <td>Sum of scores (${total})</td>
      <td>${sumScore1}</td>
      <td>${sumScore2}</td>
      <td>${sumScore3}</td>
      <td>${sumScore4}</td>
    </tr>`;

    document.getElementById("sumScore").innerHTML = sum;

    const points = data.map((round, index) => `
    <tr id="round-${index + 1}">
        <td>Round ${index + 1}</td>
        <td>${round.score1}</td>
        <td>${round.score2}</td>
        <td>${round.score3}</td>
        <td>${round.score4}</td>
    </tr>
`).join('');
    const tbody = document.getElementById("round-1");
    tbody.insertAdjacentHTML('beforeend', points);
    if (data.length == 3) {
      let btn = document.getElementById("btn");
      btn.style.display = "none";
    }

  })
  .catch((err) => {
    console.log(err);
  });

