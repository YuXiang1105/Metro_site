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

function botonCoordenadas(nombre, coordX, coordY, radio = 9) {
    const estacion = document.createElement("div");
    estacion.id = nombre;
    estacion.title = nombre;
    estacion.style.position = "absolute";
    //coordenadas adaptadas al tamaño del mapa, las coords cambiaban segun el zoom, esto se hizo con IA (no encontre la solucion manualmente), chatgpt especificamente
    estacion.style.left = `${coordX / ANCHO_MAPA * 100}%`;
    estacion.style.top = `${coordY / ALTO_MAPA * 100}%`;
    estacion.style.width = radio + "px";
    estacion.style.height = radio + "px";
    //TODO HACER INVISIBLE MAS TARDE (o si ya esta hecho, nota de que esta aqui, lo he perdido varias veces))
    estacion.style.background = "trasparent";

    estacion.style.borderRadius = "50%";//que sea circular
    estacion.style.transform = "translate(-50%, -50%)";
    estacion.style.zIndex = "10";
    mapa.appendChild(estacion);
}

//imprime coordenadas cuando se pulsa en el mapa
//LPara poner los puntitos de coordenadas manualmente de las estaciones, se ha usado y se puede borrar, pero lo dejo aqui para que se vea como se ha usado
/*
mapa.addEventListener("click", (event) => {

    const imagen = mapa.querySelector("img");
    const rect = imagen.getBoundingClientRect();
    const x = (event.clientX - rect.left) * ANCHO_MAPA / rect.width;
    const y = (event.clientY - rect.top) * ALTO_MAPA / rect.height;

    console.log("X:", Math.round(x), "Y:", Math.round(y));
});
*/