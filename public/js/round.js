let gameId = Number(window.location.href.split("/")[4]);
const addButton = document.querySelector(".btn");
const scoreTable = document.getElementById("score");
const inputFields = [];
let roundCount = 0;
const rowLimit = 3;

addButton.addEventListener("click", function () {
  roundCount++;
  if (rowLimit && scoreTable.rows.length >= rowLimit + 2) {
    // Số lượng hàng đã đạt giới hạn tối đa, không thêm hàng mới
    let btn=`<button class="btn" id="btn">Save Result</button>`
    document.getElementById("btn").innerHTML=btn;
    return;
  }

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
  console.log("SCORE",scores);
  const playerScores = {
    sumScore1: 0,
    sumScore2: 0,
    sumScore3: 0,
    sumScore4: 0
  }

  for (let i = 0; i < scores.length; i++) {
    const playerIndex = 3 - (i % 4); // Chia lấy dư để lặp lại từng người chơi
    const score = parseInt(scores[i]); // Chuyển đổi giá trị thành số nguyên
  
    // Cộng thêm điểm vào tổng điểm của người chơi tương ứng
    if (!isNaN(score)) {
      const playerKey = `sumScore${playerIndex + 1}`;
      playerScores[playerKey] += score;
    }
  }

  
  const sum = `<tr class="sum" id="sumScore">
    <td>Sum of scores</td>
    <td>${playerScores.sumScore1}</td>
    <td>${playerScores.sumScore2}</td>
    <td>${playerScores.sumScore3}</td>
    <td>${playerScores.sumScore4}</td>
  </tr>`;
  document.getElementById("sumScore").innerHTML = sum;



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

// Render điểm
fetch(`/api/v1/rounds/${gameId}`)
  .then((res) => res.json())
  .then((data) => {
    console.log("DATA",data);
    let sumScore1 = 0;
    let sumScore2 = 0;
    let sumScore3 = 0;
    let sumScore4 = 0;
    
    for (let i = 0; i < data.length; i++) {
      sumScore1 += Number(data[i].score1);
      sumScore2 += Number(data[i].score2);
      sumScore3 += Number(data[i].score3);
      sumScore4 += Number(data[i].score4);
    }
    
    const sum = `<tr class="sum" id="sumScore">
      <td>Sum of scores</td>
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

  })
  .catch((err) => {
    console.log(err);
  });

