const mapa = document.getElementById("mapa-contenido");

const panzoom = Panzoom(mapa, {
    contain: "outside"
});

const zoomInButton = document.getElementById("zoomInButton");
const zoomOutButton = document.getElementById("zoomOutButton");
const resetButton = document.getElementById("resetButton");

zoomInButton.addEventListener("click", panzoom.zoomIn);
zoomOutButton.addEventListener("click", panzoom.zoomOut);
resetButton.addEventListener("click", panzoom.reset);
