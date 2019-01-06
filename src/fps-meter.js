import Stats from "stats.js";

const stats = new Stats();
document.body.appendChild(stats.dom);
stats.dom.style.left = "";
stats.dom.style.right = "0";

function loop() {
  stats.update();
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
