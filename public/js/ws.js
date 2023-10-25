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
   //botonId = document.getElementById("multijugador").value
    //console.log("ID del boton: ", botonId);
    console.log("Enviendo info al socket")
    socket.emit("nombreSala", {salaNombre: "multijugador"})
}

socket.on("nuevo-mensaje", data => {
    console.log("Me llego del servidoe: ", data)

    // var html=""
    // if(data.idContacto == 1){
    //     html+= `<div class = "message received">
    //                 <strong>${data.nombreP[0].usuario}</strong>
    //                 <p>${data.mensaje}</p>
    //             </div>`
    // }
    // else{    
    //     html+= `<div class="message sent">
    //                 <strong>${data.nombreP[0].usuario}</strong>
    //                 <p>${data.mensaje}</p>
    //             </div>`
    // }
    // document.getElementById("chat-messages").innerHTML+=html
    
    // document.getElementById("message-input").value = "";
})

// function uniseSala(){
//     cuadricula = document.getElementById("tetris")
//     console.log("Enviendo cuadricula al back")
//     console.log(cuadricula)
//     socket.emit("mostrarCuadricula", {cuadricula: cuadricula})
// }