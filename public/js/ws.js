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
    cuadriculaOpononete()
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

function cuadriculaOpononete(){

    const FILAS = 20;
    const COLUMNAS = 10;
    let canvas2 = document.getElementById("tetris2"); // agarra el primer elemento con id tetris
    let ctx2 = canvas2.getContext("2d") // para poder dibujar en el canvas
    ctx2.scale(15,15) // 30 * 20(filas) = 600(handlebaras) -- 30 * 10(filas) = 300(handlebaras)
    // scale() --> agrega una transformación de escala a las unidades del lienzo horizontal y/o verticalmente.

    let piezaObj = null;
    let cuadricula = generarCuadricula()
    console.log(cuadricula);
    // console.log(piezaObj)
    //enviarCuadricula(cuadricula)

    function generarPiezaRandom(){
        let ran = Math.floor(Math.random() * 7) // devuelve un numero random del 0 al 7 --> Math.floor() devuelve un numero sin coma
        // console.log(FORMAS[ran])
        let pieza = FORMAS[ran]
        let colorIndex = ran + 1 
        /* Aca creamos las cordenadas por donde va a aparecer la pieza.
        y = 0, porque empieza arriba de todo (las filas)
        x = 4, (puede ser 5), porque queremos que la pieza empiece en el medio, y como tenemos 10 columnas, ponemos 4 ó 5, par que quede bien centradas todas las piezas
        */

        let x = 4
        let y = 0
        return{pieza,x,y,colorIndex} 
        /*
            Retorna un objeto con los atributos:
            pieza --> devuelve el array random correspondiente
            x, --> devuelve coordenadas
            colorIndex --> devuelve el color random
        */ 
    }

    setInterval(nuevoEstadoDeJuego,500) // genera un intervalo donde cada 500 milisegundos, se ejecuta la funcion nuevoEstadoDeJuego

    function nuevoEstadoDeJuego(){
        checkCuadricula();
        if(piezaObj == null){ // si piezaObj es igual a null, generar pieza random y renderizarla
            piezaObj = generarPiezaRandom();
            renderizarPieza()
        }
        moverAbajo()
    }

    function checkCuadricula(){
        let contador = 0
        for(let i = 0; i<cuadricula.length;i++){
            let todoLleno = true;
            for(let j = 0; j<cuadricula[i].length;j++){
                if(cuadricula[i][j] == 0){
                    todoLleno = false;
                }
            }
            if(todoLleno){
                // si las filas de las cuadriculas estan llenas, es decir, la cuadricula tiene todos 1s
                cuadricula.splice(i,1) // borrar la fila
                cuadricula.unshift([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) // y agregar una fila arriba de todo nueva y blanca
                contador++; // cuenta cuantas filas se borraron a la vez
            }
        } // si borraste 1, sumas 10p, si borraste 2, sumas 30p y asi.
        if(contador == 1){
            puntaje+=10;
        } else if(contador == 2){
            puntaje+=30;
        }else if(contador == 3){
            puntaje+=50;
        }else if(contador > 3){
            puntaje+=100;
        }

        // enviarCuadricula(cuadricula)

        tablaPuntaje.innerHTML = puntaje;

    }


    function renderizarPieza(){
        let pieza = piezaObj.pieza; // llama al atributo pieza del objeto
        for(let i = 0; i<pieza.length;i++){ 
            for(let j = 0;j<pieza[i].length;j++){
                if(pieza[i][j] == 1){ 
                    ctx2.fillStyle = COLORES[piezaObj.colorIndex] // fillStyle() devuelve el color para rellenar el dibujo.
                    ctx2.fillRect(piezaObj.x+j,piezaObj.y+i,1,1) //  fillRect() dibuja la pieza "rellena" -- centra la pieza en el medio del tablero
                }
            }
        }
    }

    function moverAbajo(){
        if(!colision(piezaObj.x, piezaObj.y+1)){
            piezaObj.y+=1; // cambia coordenadas de y para que baje una fila
        }else{ 
            for(let i = 0; i<piezaObj.pieza.length;i++){
                for(let j = 0;j<piezaObj.pieza[i].length;j++){
                    if(piezaObj.pieza[i][j] == 1){
                        let p = piezaObj.x + j;
                        let q = piezaObj.y + i;
                        cuadricula[q][p] = piezaObj.colorIndex;
                    }
                }
            }
            if(piezaObj.y == 0){
                console.log("perdiste hermano")
                enviarPuntaje(puntaje)
                alert("Game Over")
                cuadricula = generarCuadricula()
                puntaje = 0
                // ACA TE TIENE QUE LLEVAR A LA PAGINA DE GAME OVER
            }
            piezaObj = null;
        }
        renderizarCuadricula()
    }

    function moverIzquierda(){
        if(!colision(piezaObj.x-1, piezaObj.y)){ //  si no hay colision, la pieza se mueve
            piezaObj.x -=1
        }
        renderizarCuadricula()
    }

    function moverDerecha(){
        if(!colision(piezaObj.x+1, piezaObj.y)){
            piezaObj.x +=1
        }
        renderizarCuadricula()
    }

    function rotar(){
        let piezaRotada = [];
        let pieza = piezaObj.pieza;
        
        // crea una pieza del mismo tamaño que la que queremos rotar, pero sin forma
        for(let i = 0; i<pieza.length;i++){
            piezaRotada.push([])
            for(let j = 0;j<pieza[i].length; j++){
                piezaRotada[i].push(0);
            }
        }

        for(let i = 0; i<pieza.length;i++){
            for(let j = 0; j<pieza[i].length;j++){
                piezaRotada[i][j] = pieza[j][i]; // da vuelta las filas y las columnas para que rote la pieza
            }
        }

        for(let i = 0;i<piezaRotada.length;i++){
            piezaRotada[i] = piezaRotada[i].reverse(); // reverse() --> da vuelta el los elementos del array, el que esta primero, va ultimo y asi
        }
        if(!colision(piezaObj.x, piezaObj.y, piezaRotada)){
            piezaObj.pieza = piezaRotada        
        }
        renderizarCuadricula()
    }

    function colision(x,y, piezaRotada){ // esta funcio sirve para que la pieza no se vaya del tablero
        let pieza = piezaRotada || piezaObj.pieza; // recive o la pieza rotada o la piezaObj
        for(let i = 0;i<pieza.length; i++){
            for(let j = 0; j<pieza[i].length;j++){
                if(pieza[i][j] == 1){
                    let p = x + j;
                    let q = y + i;
                    if(p>=0 && p<COLUMNAS && q>= 0 && q<FILAS){
                        if(cuadricula[q][p]>0){
                            return true
                        }
                    } else{
                        return true
                    }
                }
            }
        }
        return false
    }

    function generarCuadricula(){
        let cuadricula = [];
        for(let i=0; i<FILAS;i++){
            cuadricula.push([])
            for(let j = 0; j<COLUMNAS;j++){
                cuadricula[i].push(0)
            }
        }
        return cuadricula
    }

    function renderizarCuadricula(){
        for(let i = 0; i<cuadricula.length;i++){
            for(let j = 0; j<cuadricula[i].length;j++){
                ctx2.fillStyle = COLORES[cuadricula[i][j]];
                ctx2.fillRect(j,i,1,1);
            }
        }
        renderizarPieza()
    }

    document.addEventListener("keydown", function(e){
        let key = e.code;
        console.log(key)
        if(key == "ArrowDown"){
            moverAbajo()
        } else if(key == "ArrowLeft"){
            moverIzquierda()
        }else if(key == "ArrowRight"){
            moverDerecha()
        }else if(key == "ArrowUp"){
        rotar()
        }
    })


    
}
