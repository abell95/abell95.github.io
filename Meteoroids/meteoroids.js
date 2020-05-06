window.onload = () => {
  const canvas = document.getElementById("meteoroids");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  class Meteoroids {
    constructor() {
      this.gameOver = false;
      this.playerYPos = canvas.height / 2;
      this.playerXPos = canvas.width / 2;
      this.listen(); // sets up movement handling
    }

    start() {
      // Load a bootstrap modal w/ gameplay instructions, then run animate on close (TBD)

      this.animate();
    }

    // listen for user input (i.e. movement keys)
    listen() {
      document.addEventListener("keydown", e => {
        switch (e.key) {
          case "a":
            this.setPlayerPosition(this.playerXPos - 5, this.playerYPos);
            break;
          case "w":
            this.setPlayerPosition(this.playerXPos, this.playerYPos - 5);
            break;
          case "s":
            this.setPlayerPosition(this.playerXPos, this.playerYPos + 5);
            break;
          case "d":
            this.setPlayerPosition(this.playerXPos + 5, this.playerYPos);
        }
      });
    }

    setPlayerPosition(newXPos, newYPos) {
      console.log(newXPos, newYPos);
      this.playerXPos = newXPos;
      this.playerYPos = newYPos;
    }

    drawPlayer() {
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.moveTo(this.playerXPos, this.playerYPos);
      ctx.lineTo(this.playerXPos - 20, this.playerYPos + 50);
      ctx.lineTo(this.playerXPos + 20, this.playerYPos + 50);
      ctx.lineTo(this.playerXPos, this.playerYPos);
      ctx.stroke();
      ctx.closePath();
    }

    animate() {
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      this.drawPlayer();
      if (!this.gameOver) {
        // must call this.animate inside callback - otherwise defaults to global object or something?
        requestAnimationFrame(() => {
          this.animate();
        });
      }
    }

    onGameOver() {
      // show modal to display score and offer game restart
    }
  }

  const meteoroids = new Meteoroids();
  meteoroids.start();
};
