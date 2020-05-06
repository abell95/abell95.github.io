// init canvas API
const canvas = document.getElementById("floppy-fowl");
const ctx = canvas.getContext("2d");

// fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export { canvas, ctx };
