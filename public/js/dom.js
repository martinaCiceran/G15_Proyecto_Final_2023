// creamos las formas de las piezas del tetris
const FORMAS = [ 
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0]
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1]
    ],
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]
    ],
    [
        [1, 1],
        [1, 1]
    ]
]

// guardamos los colores de las piezas
const COLORES = [
    "#fff",
    "#9b5fe0",
    "#16a4d8",
    "#60dbe8",
    "#8bd346",
    "#efdf48",
    "#f9a52c",
    "#d64e12"
]

const FILAS = 20;
const COLUMNAS = 10;

let canvas = document.querySelector("#tetris"); // agarra el primer elemento con id tetris
let ctx = canvas.getContext("2d") // para poder dibujar en el canvas
ctx.scale(30,30) // 30 * 20(filas) = 600(handlebaras) -- 30 * 10(filas) = 300(handlebaras)
// scale() --> agrega una transformación de escala a las unidades del lienzo horizontal y/o verticalmente.

let piezaObj = null;
let cuadricula = generarCuadricula()
console.log(cuadricula);
// console.log(piezaObj)
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
    if(piezaObj == null){ // si piezaObj es igual a null, generar pieza random y renderizarla
        piezaObj = generarPiezaRandom();
        renderizarPieza()
    }
    moverAbajo()
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
            alert("Game Over")
            cuadricula = generarCuadricula()
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
    let pieza = piezaObjCayendo.pieza;
    for(let i = 0; i<pieza.length;i++){
        piezaRotada.push([])
        for(let j = 0;j<pieza[i].length; j++){
            piezaRotada[i].push(0);
        }
    }
    for(let i = 0; pieza.length;i++){
        for(let j = 0; j<pieza[i].length;j++){
            piezaRotada[i][j] = pieza[j][i];
        }
    }

    for(let i = 0;i<piezaRotada.length;i++){
        piezaRotada[i] = piezaRotada[i].reverse();
    }
    if(!colision(piezaObjCayendo.x, piezaObjCayendo.y, pieza)){
        
    }
}

function colision(x,y){ // esta funcio sirve para que la pieza no se vaya del tablero
    let pieza = piezaObj.pieza;
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
            ctx.fillStyle = COLORES[cuadricula[i][j]];
            ctx.fillRect(j,i,1,1);
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