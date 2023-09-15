const bloques = [
    [
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
    ],
    [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],
    [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],
    [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0],
    ],
    [
        [1, 1],
        [1, 1],
    ]
]

const colores = [
    "#fff",
    "#9b5fe8",
    "#16a4d8",
    "#60dbe8",
    "#8bd346",
    "#efdf48",
    "#f9a52c",
    "#d64e12"
]

let filas = 20;
let columnas = 10;

let canvas = document.querySelector('#tetris')
let ctx = canvas.getContext("2d"); // para poder dibujar en el canvas
ctx.scale(30,30) // no se :(

let piezaObj = generarPiezasRandom();
console.log(piezaObj)
function generarPiezasRandom(){
    let ran = Math.random() * 7;
    //console.log(bloques[ran]); // trae un bloque con el indice de ran (numero random)
    let pieza = bloques[ran]
    let colorPieza = ran + 1
    let x = 4;
    let y = 0;
    return(pieza,x,y,colorPieza);
}