import World from "./world.mjs";
import Styles from "./cell-styles.mjs";

const canvas = document.getElementById("scoundrel");
const ctx = canvas.getContext("2d");

const BlockSize = 30;
canvas.width = World.getWorldWidth(BlockSize);
canvas.height = World.getWorldHeight(BlockSize);

// represent game state as a multidimensional array
const gameworld = [];

let width = canvas.width / BlockSize;
let height = canvas.height / BlockSize;

// initialize game world
for (let i = 0; i < height; i++) {
  let row = [];
  for (let j = 0; j < width; j++) {
    if (i == 0 && j == 0) {
      row.push("player");
      continue;
    }
    if (i % 3 !== 0) {
      row.push("empty");
    } else {
      row.push("wall");
    }
  }
  gameworld.push(row);
}

const drawInnerSquare = (style, x, y) => {
  ctx.fillStyle = style;
  ctx.fillRect(
    x * BlockSize + 1,
    y * BlockSize + 1,
    BlockSize - 2,
    BlockSize - 2
  );
};

const drawSprite = (image, x, y) => {
  const img = new Image(28, 28);
  img.onload = () => {
    ctx.drawImage(img, x * BlockSize + 1, y * BlockSize + 1);
  };
  img.src = `./assets/${image}.png`;
};

// test draw mechanism - move into world class as drawWorld method
const renderGameWorld = () => {
  gameworld.forEach((row, i) => {
    row.forEach((cell, j) => {
      // create black square to start
      ctx.fillStyle = Styles.border;
      ctx.fillRect(j * BlockSize, i * BlockSize, BlockSize, BlockSize);

      // render contents of cell
      switch (cell) {
        case "player":
          drawSprite("hero", j, i);
          break;
        case "empty":
          drawInnerSquare(Styles.empty, j, i);
          break;
        case "wall":
          drawInnerSquare(Styles.wall, j, i);
          break;
        default:
          console.log(`Now what do I do with this: ${cell}??`);
      }
    });
  });
};

renderGameWorld();

document.getElementById("status").innerText +=
  "Welcome to SCOUNDREL! Press any key...\n";

const findPlayer = () => {
  let ret = {};
  gameworld.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell == "player") {
        ret = { x: j, y: i };
      }
    });
  });
  return ret;
};

const swap = (posOne, posTwo) => {
  const tmp = gameworld[posTwo.y][posTwo.x];
  gameworld[posTwo.y][posTwo.x] = gameworld[posOne.y][posOne.x];
  gameworld[posOne.y][posOne.x] = tmp;
};

const moveDir = direction => {
  const position = findPlayer();

  switch (direction) {
    case "left":
      if (undefined !== gameworld[position.y][position.x - 1]) {
        swap(position, { x: position.x - 1, y: position.y });
      }
      break;
    case "right":
      if (undefined !== gameworld[position.y][position.x + 1]) {
        swap(position, { x: position.x + 1, y: position.y });
      }
      break;
    case "up":
      if (undefined !== gameworld[position.y - 1][position.x]) {
        swap(position, { x: position.x, y: position.y - 1 });
      }
      break;
    case "down":
      if (undefined !== gameworld[position.y + 1][position.x]) {
        swap(position, { x: position.x, y: position.y + 1 });
      }
      break;
  }
};

document.addEventListener("keydown", evt => {
  switch (evt.key) {
    case "a":
      moveDir("left");
      renderGameWorld();
      break;
    case "d":
      moveDir("right");
      renderGameWorld();
      break;
    case "w":
      moveDir("up");
      renderGameWorld();
      break;
    case "s":
      moveDir("down");
      renderGameWorld();
      break;
    default:
      console.log(`dunno what to do with ${evt.key}`);
  }
});

// generate random set of rooms and passages
/*
    Room walls are represented by an integer 1.
    Room floors are represented by 2.
    Passages are represented by 3.
    Exit is represented as 'E'.
    Player is represented as 'P'.
    Giant Rat is represented as 'R'.
    Gold is represented as 'G'.
    A weapon is represented as 'W'.
    A health potion is represented as 'H'.
    
    All these will have corresponding colors / sprites to draw, but it knows what to draw based on the value in the gameworld array
*/

// populate world with goodies
// create player object
// make initial draw call
// wait for player input and then draw
// TODO: make status bar bigger + user interactive, ask "what's in my inventory" (move it to the right side for space?)
