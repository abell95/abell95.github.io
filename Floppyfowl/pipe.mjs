import { canvas, ctx } from "./context.mjs";

class Pipe {
  constructor(xPos) {
    this.xPos = xPos;
    this.width = 120;
    this.minGap = 225;
    this.velocity = 6.5;
    this.gap = this.getGap();
    this.passed = false;
  }

  draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(this.xPos, 0, this.width, this.gap.top);
    ctx.fillRect(
      this.xPos,
      this.gap.bottom,
      this.width,
      canvas.height - this.gap.bottom
    );
  }

  getGap() {
    let gap = Math.random() * canvas.height;
    if (gap + this.minGap > canvas.height) {
      gap -= this.minGap * 1.5;
    }
    return {
      top: gap,
      bottom: gap + this.minGap
    };
  }

  getPosition() {
    return this.xPos;
  }

  hasPassed() {
    return this.passed;
  }

  setPassed() {
    this.passed = true;
  }

  updatePosition() {
    this.xPos -= this.velocity;
  }

  hasCollided(playerPos) {
    let curPos = this.getPosition();
    // approximate size of player object
    if (curPos > 80 && curPos < 200) {
      if (playerPos < this.gap.top || playerPos > this.gap.bottom) {
        console.log(curPos);
        return true;
      }
    }
  }
}

export default Pipe;
