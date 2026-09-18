const ANCHO_MAPA = 13600;
const ALTO_MAPA = 8128;


linea1.forEach(([nombre, [x, y]]) => {
    botonCoordenadas(nombre, x, y);
});
 
linea2.forEach(([nombre, [x, y]]) => {
    botonCoordenadas(nombre, x, y);
});
 
linea3.forEach(([nombre, [x, y]]) => {
    botonCoordenadas(nombre, x, y);
});
 
linea4.forEach(([nombre, [x, y]]) => {
    botonCoordenadas(nombre, x, y);
});
 
linea6.forEach(([nombre, [x, y]]) => {
    botonCoordenadas(nombre, x, y);
});

function botonCoordenadas(nombre, coordX, coordY, radio = 8) {
    const estacion = document.createElement("div");
    estacion.title = nombre;
    estacion.style.position = "absolute";
    estacion.style.left = `${coordX / ANCHO_MAPA * 100}%`;
    estacion.style.top = `${coordY / ALTO_MAPA * 100}%`;
    estacion.style.width = radio + "px";
    estacion.style.height = radio + "px";
    //TODO HACER INVISIBLE MAS TARDE
    estacion.style.background = "yellow";
    estacion.style.border = "2px solid red";
    estacion.style.borderRadius = "50%";
    estacion.style.transform = "translate(-50%, -50%)";
    estacion.style.boxShadow = "0 0 0 2px white";
    estacion.style.zIndex = "10";
    mapa.appendChild(estacion);
}

//Lector de coordenadas para poner los puntitos de las estaciones

mapa.addEventListener("click", (event) => {

    const imagen = mapa.querySelector("img");
    const rect = imagen.getBoundingClientRect();
    const x = (event.clientX - rect.left) * ANCHO_MAPA / rect.width;
    const y = (event.clientY - rect.top) * ALTO_MAPA / rect.height;

    console.log("X:", Math.round(x), "Y:", Math.round(y));
});
