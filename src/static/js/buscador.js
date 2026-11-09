//Buscador de estaciones con autocompletado: al escribir se muestran las estaciones que coinciden

//ignoro mayusculas y acentos
function normalizar(texto) {
    return texto
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .trim();
}

function crearBuscador(input) {
    const lista = document.getElementById(input.dataset.lista);
    let seleccionada = -1;
    let coincidencias = [];

    function cerrar() {
        lista.innerHTML = "";
        lista.classList.remove("abierta");
        seleccionada = -1;
    }

    function elegir(estacion) {
        input.value = estacion;
        input.setCustomValidity("");
        cerrar();
        //avisa a quien escuche (pulsaciones.js) de que ha cambiado la estacion
        input.dispatchEvent(new Event("change"));
    }

    function marcar(indice) {
        const opciones = lista.querySelectorAll("li");
        opciones.forEach((li, i) => li.classList.toggle("activa", i === indice));
        if (opciones[indice]) opciones[indice].scrollIntoView({ block: "nearest" });
        seleccionada = indice;
    }

    function mostrar() {
        const texto = normalizar(input.value);
        //primero las que empiezan por lo escrito, luego las que lo contienen
        const empiezan = [];
        const contienen = [];
        ESTACIONES_LISTA.forEach((estacion) => {
            const nombre = normalizar(estacion);
            if (nombre.startsWith(texto)) empiezan.push(estacion);
            else if (nombre.includes(texto)) contienen.push(estacion);
        });
        coincidencias = empiezan.concat(contienen);

        lista.innerHTML = "";
        seleccionada = -1;
        if (coincidencias.length === 0) {
            const vacio = document.createElement("li");
            vacio.className = "sin-resultados";
            vacio.textContent = "No hay estaciones con ese nombre";
            lista.appendChild(vacio);
        }
        coincidencias.forEach((estacion) => {
            const li = document.createElement("li");
            li.textContent = estacion;
            //mousedown en vez de click para que se ejecute antes de que el input pierda el foco
            li.addEventListener("mousedown", (e) => {
                e.preventDefault();
                elegir(estacion);
            });
            lista.appendChild(li);
        });
        lista.classList.add("abierta");
    }

    input.addEventListener("input", () => {
        input.setCustomValidity("");
        mostrar();
    });
    input.addEventListener("focus", mostrar);
    input.addEventListener("blur", () => {
        //si lo escrito coincide con una estacion (sin importar acentos/mayusculas) se corrige al nombre exacto
        const exacta = ESTACIONES_LISTA.find((e) => normalizar(e) === normalizar(input.value));
        if (exacta) input.value = exacta;
        cerrar();
        input.dispatchEvent(new Event("change"));
    });

    input.addEventListener("keydown", (e) => {
        if (!lista.classList.contains("abierta")) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            marcar(Math.min(seleccionada + 1, coincidencias.length - 1));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            marcar(Math.max(seleccionada - 1, 0));
        } else if (e.key === "Enter") {
            //Enter elige la marcada, o la primera si solo se ha escrito
            const indice = seleccionada >= 0 ? seleccionada : 0;
            if (coincidencias[indice] && input.value !== coincidencias[indice]) {
                e.preventDefault();
                elegir(coincidencias[indice]);
            }
        } else if (e.key === "Escape") {
            cerrar();
        }
    });
}

document.querySelectorAll(".buscador-estacion").forEach(crearBuscador);

//antes de enviar, comprueba que lo escrito es una estacion real
document.querySelector("form").addEventListener("submit", (e) => {
    document.querySelectorAll(".buscador-estacion").forEach((input) => {
        if (!ESTACIONES_LISTA.includes(input.value)) {
            input.setCustomValidity("Elige una estación de la lista");
        }
    });
    if (!e.target.checkValidity()) {
        e.preventDefault();
        e.target.reportValidity();
    }
});
