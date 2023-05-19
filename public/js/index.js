let listPlayers;
fetch("api/v1/player")
  .then((res) => res.json())
  .then((data) => {
    listPlayers = data;
  })
  .catch((err) => console.log(err));
let message = document.getElementById("message");
let player1 = document.getElementById("player1");
let player2 = document.getElementById("player2");
let player3 = document.getElementById("player3");
let player4 = document.getElementById("player4");

[player1, player2, player3, player4].forEach((item) => {
  item.addEventListener("input", (event) => {
    if (
      !player1.value || !player2.value || !player3.value || !player4.value
    ) {
      message.style.display = "block";
    } else {
      message.style.display = "none";
    }
  });
});
function handleAddPlayer() {
  try {
    fetch("api/v1/player", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        player1: player1.value,
        player2: player2.value,
        player3: player3.value,
        player4: player4.value,
      }),
    })
      .then(() => {

        return fetch("api/v1/player");
      })
      .then((res) => res.json())
      .then((data) => {
        alert("Add Player Successfully");
        window.location.href = `/round/${data[data.length - 1].gameId}`;
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.error(error);
  }
}