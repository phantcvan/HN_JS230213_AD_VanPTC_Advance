let listPlayers;
fetch("http://127.0.0.1:8000/api/v1/player")
  .then((res) => res.json())
  .then((data) => {
    listPlayers = data;
  })
  .catch((err) => console.log(err));
let vld = document.getElementById("vld");
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
      vld.style.display = "block";
    } else {
      vld.style.display = "none";
    }
  });
});
function handleAddPlayer() {
  try {
    fetch("http://127.0.0.1:8000/api/v1/player", {
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
        return fetch("http://127.0.0.1:8000/api/v1/player");
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