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
    console.log("Me llego del servidor la cuadricula", data.cuaricula);
    renderizarCuadricula(data.cuadricula)
    // no funciona
    // como llamo a una funcion que esta adentro de otra funcion, en otro archivo .js
});

function renderizarCuadricula(){
    for(let i = 0; i<cuadricula.length;i++){
        for(let j = 0; j<cuadricula[i].length;j++){
            ctx.fillStyle = COLORES[cuadricula[i][j]];
            ctx.fillRect(j,i,1,1);
        }
    }
    renderizarPieza()
}

function renderizarPieza(){
    let pieza = piezaObj.pieza; // llama al atributo pieza del objeto
    for(let i = 0; i<pieza.length;i++){ 
        for(let j = 0;j<pieza[i].length;j++){
            if(pieza[i][j] == 1){ 
                ctx.fillStyle = COLORES[piezaObj.colorIndex] // fillStyle() devuelve el color para rellenar el dibujo.
                ctx.fillRect(piezaObj.x+j,piezaObj.y+i,1,1) //  fillRect() dibuja la pieza "rellena" -- centra la pieza en el medio del tablero
            }
        }
    }
}

