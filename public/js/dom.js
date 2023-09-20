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
console.log(piezaObj)
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
    if(piezaObj == null){
        piezaObj = generarPiezaRandom();
        renderizarPieza()
    }
    moverAbajo()
}

renderizarPieza()
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
    piezaObj.y+=1; // cambia coordenadas de y para que baje una fila
    renderizarPieza()
}