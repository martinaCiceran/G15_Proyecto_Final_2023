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
    renderizarCuadricula(data.cuadricula)
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