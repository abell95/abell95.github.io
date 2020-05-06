import { canvas, ctx } from "./context.mjs";
import Pipe from "./pipe.mjs";

window.onload = () => {
  // player starting position and speed
  let yAxis = 400;
  let yVelocity = 0;

  // variables for tracking game state
  let pts = 0;
  let ticks = 0;
  let gameOver = false;

  // where pipes are stored
  const pipes = [];

  const animate = () => {
    // wipe screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw player
    ctx.fillStyle = "orange";
    ctx.beginPath();
    ctx.arc(200, yAxis, 30, 0, Math.PI * 2);
    ctx.fill();

    // draw score tracker
    ctx.font = "bold 24pt Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`SCORE: ${pts}`, canvas.width - 200, 75);

    // calculate gravity
    yVelocity += 0.4;
    yAxis += yVelocity;

    pipes.forEach(pipe => {
      pipe.draw();
      pipe.updatePosition();

      // has the player gotten past this pipe yet
      if (!pipe.hasPassed()) {
        if (pipe.getPosition() < 170) {
          pts++;
          pipe.setPassed();
        }
      }
      if (pipe.hasCollided(yAxis)) {
        endGame();
      }
    });

    // hit detection on screen edges
    if (yAxis >= canvas.height || yAxis <= 0) {
      endGame();
    }

    ticks++;
    if (ticks % 100 == 0) {
      let pipe = new Pipe(canvas.width);
      pipes.push(pipe);
    }
    if (!gameOver) {
      requestAnimationFrame(animate);
    }
  };

  document.addEventListener("click", () => {
    yVelocity -= 12;
  });

  const endGame = () => {
    $("#game-over-modal").modal({ backdrop: "static" });

    document.querySelector(
      "#game-stats"
    ).innerHTML = `<h4>You got ${pts} points. Better luck next time!</h4>`;

    document.querySelector("#restart-button").addEventListener("click", () => {
      location.reload();
    });

    gameOver = true;
  };

  animate();
};
