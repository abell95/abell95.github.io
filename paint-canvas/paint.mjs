const canvas = document.getElementById("paint-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.addEventListener("click", e => {
  // console.log(`event ${e.pageX}, ${e.pageY}`);
  ctx.fillRect(e.pageX, e.pageY, 20, 20);
});
