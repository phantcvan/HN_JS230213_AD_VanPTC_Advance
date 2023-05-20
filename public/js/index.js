let arr = [1, 2, 3, 4];
document.getElementById("keepers").innerHTML = arr.map((num) => {
  return `
  <input type="text" id="player${num}" class="input-player" placeholder="Enter player name"/>
    `;
}).join("");

let message = document.getElementById("message");
let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");
let player3 = document.getElementById("player3");
let player4 = document.getElementById("player4");

function handleAddPlayer() {
  let player1Value = player1.value;
  let player2Value = player2.value;
  let player3Value = player3.value;
  let player4Value = player4.value;
  console.log(player1Value, player2Value, player3Value, player4Value);

  if (!player1Value || !player2Value || !player3Value || !player4Value) {
    message.style.display = "block";
    return;
  } else {
    message.style.display = "none";
    try {
      fetch("/api/v1/player", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          player1: player1Value,
          player2: player2Value,
          player3: player3Value,
          player4: player4Value,
        }),
      })
        .then(() => {
          return fetch("/api/v1/player");
        })
        .then((res) => res.json())
        .then((data) => {
          alert("Add player successfully!");
          window.location.href = `/round/${data[data.length - 1].gameId}`;
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error(error);
    }

  }


}

