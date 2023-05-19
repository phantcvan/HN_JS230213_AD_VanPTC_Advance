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

[player1, player2, player3, player4].forEach((el) => {
  el.addEventListener("input", (event) => {
    if (
      !player1.value ||
      !player2.value ||
      !player3.value ||
      !player4.value
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
        playername1: player1.value,
        playername2: player2.value,
        playername3: player3.value,
        playername4: player4.value,
      }),
    })
      .then(() => {
        // Gọi lại API để lấy danh sách players mới nhất
        return fetch("api/v1/player");
      })
      .then((res) => res.json())
      .then((data) => {
        alert("Thêm Player thành công");
        window.location.href = `/gameplay/${
          data[data.length - 1].gameId
        }`;
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.error(error);
  }
}