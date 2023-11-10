const IP = "ws://localhost:3000";//aca esta el servidor
const socket = io(IP);

//ESTO ES UN LISTENER
socket.on("connect", () => {
    console.log("Me conecté a WS");
});//listener:función que esta esperando a escuchar algo

socket.on("server-message", data => {
    console.log("Me llego del servidor", data);
});

function uniseSala(){
    botonId = document.getElementById("multijugador").value
    //console.log("ID del boton: ", botonId);
    console.log("Enviendo info al socket")
    socket.emit("nombreSala", {salaNombre: botonId})
}

function unirseSala() {
    socket.emit("unirseSala")
}

// este socket no se ejecuta
socket.on("cuadricula", data => {
    console.log("el usuario es: ", data.user)
    console.log("Me llego del servidor la cuadricula", data.cuadricula);
    renderizarCuadriculaOponente(data.cuadricula)
    //renderizarCuadricula(data.cuadricula)
    // no funciona
    // como llamo a una funcion que esta adentro de otra funcion, en otro archivo .js
});

function salasDisponibles(){
    socket.emit("salasDisponibles", {mensaje: "hola"})
    console.log("onclick salas disponibles")
}

socket.on("salas", data => {
    console.log(data)
    render(data)
});

function render(salas){
    var html=""
    for(let i = 0; i<salas.length; i++){
        html+= `<button type="submit" value="${salas[i].nombreSala}">${salas[i].nombreSala}</button>`
    }
    document.getElementById("option").innerHTML+=html
}
function mensajeSala() {
    socket.emit("mensajeSala", {mensaje: "hola"})
}

socket.on("mensajeDelServidor", data => {
    console.log("Me llego del servidor ", data);

    // no funciona
    // como llamo a una funcion que esta adentro de otra funcion, en otro archivo .js
});


// Suponiendo que cuadriculaOponente contiene la cuadrícula recibida del oponente

function renderizarCuadriculaOponente(cuadriculaOponente) {
    const FILAS = 20;
    const COLUMNAS = 10;
    let canvas2 = document.getElementById("tetris2");
    let ctx2 = canvas2.getContext("2d");
    //ctx2.clearRect(0, 0, canvas2.width, canvas2.height); // Limpiar el canvas
    //ctx.scale(15,15) // 30 * 20(filas) = 600(handlebaras) -- 30 * 10(filas) = 300(handlebaras)

    const anchoCelda = canvas2.width / COLUMNAS; // Calcula el ancho de cada celda
    const altoCelda = canvas2.height / FILAS; // Calcula el alto de cada celda

    for (let i = 0; i < cuadriculaOponente.length; i++) {
        for (let j = 0; j < cuadriculaOponente[i].length; j++) {
            if (cuadriculaOponente[i][j] !== 0) { // Si la celda está ocupada (contiene un valor distinto de 0)
                ctx2.fillStyle = COLORES[cuadriculaOponente[i][j]]; // Elige el color correspondiente
                ctx2.fillRect(j * anchoCelda, i * altoCelda, anchoCelda, altoCelda); // Dibuja la celda
            }
        }
    }
}

