const partida = document.getElementById("estacionDestino");

let partidaAlternar = false;
const salida = document.getElementById("estacionSalida");
let salidaAlternar = false;
//apaño para evitar que se quede en rojo, abajo esta la explicacion
let partidaAnterior = "";
let salidaAnterior = "";
setInterval(() => {
    const estacsalida = salida.value;
        //mira si ha puesto algo
    if (!estacsalida) return;
    //un error que me encontre, si cambias justo en rojo se queda en rojo, añado esto para evitar eso
    if (salidaAnterior && salidaAnterior !== estacsalida) {
    document.getElementById(salidaAnterior).style.backgroundColor = "transparent";
}
salidaAnterior = estacsalida;
    // Busca el div cuyo id coincide con el nombre de la estación
    const divEstacion = document.getElementById(estacsalida);
    // Si no existe ese div, no hacemos nada
    if (!divEstacion) return;
    // Cambia entre rojo y transparente
    salidaAlternar = !salidaAlternar;
        //TODO CAMBIAR LOS COLORES SI ES FEO
    divEstacion.style.backgroundColor = salidaAlternar
        ? "red"
        : "transparent";

}, 500);

setInterval(() => {
    const estacpartida = partida.value;
    //mira si ha puesto algo
    if (!estacpartida) return;
    if (partidaAnterior && partidaAnterior !== estacpartida) {
        document.getElementById(partidaAnterior).style.backgroundColor = "transparent";
    }

    partidaAnterior = estacpartida;
    // Busca el div con ese nombre
    const divEstacion = document.getElementById(estacpartida);
    //Si los nombres estan bien esto no seria necesario, pero por sia caso
    if (!divEstacion) return;
    //cambia color
    partidaAlternar = !partidaAlternar;
    //TODO CAMBIAR LOS COLORES SI ES FEO
    divEstacion.style.backgroundColor = partidaAlternar
        ? "red"
        : "transparent";

}, 500);

