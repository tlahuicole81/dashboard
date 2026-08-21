/* =========================================
   JSON SIMULADO DEL SERVIDOR
   ========================================= */

const respuestaServidor = {
    // Arreglo JSON 
    sensores: [

        {
            numero: 1,
            nombre: "Bomba de agua",
            tipo: "ON_OFF",
            estado: true
        },

        {
            numero: 2,
            nombre: "Puerta principal",
            tipo: "ON_OFF",
            estado: false
        },

        {
            numero: 3,
            nombre: "Nivel alto",
            tipo: "ON_OFF",
            estado: true
        },

        {
            numero: 4,
            nombre: "Ventilador",
            tipo: "ON_OFF",
            estado: false
        },

        {
            numero: 5,
            nombre: "Alarma",
            tipo: "ON_OFF",
            estado: true
        }

    ]

};


/* =========================================
   VARIABLES DE LA INTERFAZ
   ========================================= */

const cantidadSensores =
    document.getElementById("cantidad-sensores");

const estadoGeneral =
    document.getElementById("estado-general");

const estadoTexto =
    document.getElementById("estado-texto");

const selectorVista =
    document.getElementById("selector-vista");

const vistaTexto =
    document.getElementById("vista-texto");

const areaVisualizacion =
    document.getElementById("area-visualizacion");


/*
 * -1 significa "Visualizar todo".
 *
 * 0 corresponde al primer sensor.
 * 1 corresponde al segundo sensor.
 * etc.
 */
let vistaActual = -1;


/* =========================================
   INICIALIZACIÓN
   ========================================= */

inicializar();


function inicializar() {

    //const sensores = respuestaServidor.sensores;
    const sensores = JSON.parse(sessionStorage.getItem('sensores'));
    actualizarCantidadSensores(sensores);

    actualizarEstadoGeneral(sensores);

    mostrarVistaActual(sensores);

}


/* =========================================
   CANTIDAD DE SENSORES
   ========================================= */

function actualizarCantidadSensores(sensores) {

    cantidadSensores.textContent =
        sensores.length;

}


/* =========================================
   ESTADO GENERAL
   ========================================= */

function actualizarEstadoGeneral(sensores) {

    const sensoresConProblema =
        sensores.filter(sensor => !sensor.estado);


    if (sensoresConProblema.length === 0) {

        estadoTexto.textContent = "OK";

        estadoGeneral.classList.add("ok");
        estadoGeneral.classList.remove("error");

    }
    else {

        const numeros =
            sensoresConProblema
                .map(sensor => `S${sensor.numero}`)
                .join(" • ");

        estadoTexto.textContent = numeros;

        estadoGeneral.classList.add("error");
        estadoGeneral.classList.remove("ok");

    }

}


/* =========================================
   CAMBIAR VISTA
   ========================================= */

selectorVista.addEventListener("click", function () {

    const sensores = respuestaServidor.sensores;

    vistaActual++;

    /*
     * Si ya llegamos al último sensor,
     * regresamos a "Visualizar todo".
     */
    if (vistaActual >= sensores.length) {

        vistaActual = -1;

    }

    mostrarVistaActual(sensores);

});


/* =========================================
   MOSTRAR VISTA ACTUAL
   ========================================= */

function mostrarVistaActual(sensores) {

    if (vistaActual === -1) {

        vistaTexto.textContent = "TODO";

        mostrarTodosLosSensores(sensores);

    }
    else {

        const sensor =
            sensores[vistaActual];

        vistaTexto.textContent =
            `SENSOR ${sensor.numero}`;

        mostrarDetalleSensor(sensor);

    }

}


/* =========================================
   MOSTRAR TODOS LOS SENSORES
   ========================================= */

function mostrarTodosLosSensores(sensores) {

    areaVisualizacion.innerHTML = "";


    const contenedor =
        document.createElement("div");

    contenedor.className =
        "contenedor-sensores";


    sensores.forEach(sensor => {

        const tarjeta =
            crearTarjetaSensor(sensor);

        contenedor.appendChild(tarjeta);

    });


    areaVisualizacion.appendChild(contenedor);

}


/* =========================================
   CREAR TARJETA DE SENSOR
   ========================================= */

function crearTarjetaSensor(sensor) {

    const tarjeta =
        document.createElement("article");


    tarjeta.className =
        "sensor-card";


    /*
     * Agregamos una clase dependiendo
     * del estado actual.
     */
    if (sensor.estado) {

        tarjeta.classList.add("on");

    }
    else {

        tarjeta.classList.add("off");

    }


    tarjeta.innerHTML = `

        <div>

            <div class="sensor-numero">
                SENSOR ${sensor.numero}
            </div>

            <div class="sensor-nombre">
                ${sensor.nombre}
            </div>

        </div>

        <div class="sensor-estado">

            <span class="indicador-estado"></span>

            <span>
                ${sensor.estado ? "ON" : "OFF"}
            </span>

        </div>

    `;


    return tarjeta;

}


/* =========================================
   MOSTRAR DETALLE DE UN SENSOR
   ========================================= */

function mostrarDetalleSensor(sensor) {

    areaVisualizacion.innerHTML = "";


    const detalle =
        document.createElement("section");


    detalle.className =
        "sensor-detalle";


    if (sensor.estado) {

        detalle.classList.add("on");

    }
    else {

        detalle.classList.add("off");

    }


    detalle.innerHTML = `

        <div class="detalle-numero">
            SENSOR ${sensor.numero}
        </div>

        <div class="detalle-nombre">
            ${sensor.nombre}
        </div>

        <div class="detalle-estado">

            <span class="detalle-indicador"></span>

            <span>
                ${sensor.estado ? "ON" : "OFF"}
            </span>

        </div>

    `;


    areaVisualizacion.appendChild(detalle);

}