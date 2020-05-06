const clicked = {
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false,
  9: false
};

let turn = "X";

for (let i = 1; i < 10; i++) {
  let cell = document.getElementById(`cell-${i}`);
  cell.addEventListener("click", () => {
    if (!clicked[i]) {
      clicked[i] = true;
      if (turn == "X") {
        cell.innerHTML = "<h1>X</h1>";
        turn = "O";
      } else {
        cell.innerHTML = "<h1>O</h1>";
        turn = "X";
      }
    }
    // checkIfWinner();
  });
}
