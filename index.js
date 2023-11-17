/*  Paquetes instalados: -g nodemon, express, express-handlebars, body-parser, mysql2
    Agregado al archivo "package.json" la línea --> "start": "nodemon index"
    
    Proyecto "Node_base"
    Desarrollo de Aplicaciones Informáticas - 5to Informática
    
    Docentes: Nicolás Facón, Martín Rivas
    
    Revisión 1 - Año 2021
*/
//Cargo librerías instaladas y necesarias
const express = require('express'); //Para el manejo del servidor Web
const exphbs  = require('express-handlebars'); //Para el manejo de los HTML
const bodyParser = require('body-parser'); //Para el manejo de los strings JSON
const MySQL = require('./modulos/mysql'); //Añado el archivo mysql.js presente en la carpeta módulos
const session = require('express-session'); // Para usar variables de sesion
const app = express(); //Inicializo express para el manejo de las peticiones

app.use(express.static('public')); //Expongo al lado cliente la carpeta "public"

app.use(bodyParser.urlencoded({ extended: false })); //Inicializo el parser JSON
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'})); //Inicializo Handlebars. Utilizo como base el layout "Main".
app.set('view engine', 'handlebars'); //Inicializo Handlebars

const Listen_Port = 3000; //Puerto por el que estoy ejecutando la página Web

app.listen(Listen_Port, function() {
    console.log('Servidor NodeJS corriendo en http://localhost:' + Listen_Port + '/');
});

app.use(session({secret: '123456', resave: true, saveUninitialized: true}));

/*
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
    A PARTIR DE ESTE PUNTO GENERAREMOS NUESTRO CÓDIGO (PARA RECIBIR PETICIONES, MANEJO DB, ETC.)
*/


app.get('/', function(req, res)
{
    console.log(req.query);
    res.render('inicio', null);
});

app.get('/tetris', async function(req, res)
{   console.log(req.query);
    //await MySQL.realizarQuery(`INSERT INTO PuntosExpo(usuario) VALUES("${req.body.violeta}"`)
    res.render('tetris', null);
});

app.get('/gameOver', function(req, res)
{
    console.log("Soy un pedido GET /gameOver", req.query);
    res.render('gameOver', null);
});

app.post('/sumarPuntaje', async function(req, res)
{
    console.log("Soy un pedido POST /sumarPuntaje", req.body);
    let respuesta = await MySQL.realizarQuery(`Update Puntaje_tetris(puntaje) SET("${req.body.puntaje}" WHERE usuario == ${req.session.user})`)
    console.log(await (MySQL.realizarQuery('SELECT * FROM Puntaje')))
    res.send({puntaje: respuesta})
});

// app.post('/leerPreguntas', async function(req, res)
// {
//     console.log("Soy un pedido POST", req.body);
//     let respuesta = await MySQL.realizarQuery(`SELECT * FROM Preguntas WHERE id_pregunta = ${req.body.id}`)

//     res.send({pregunta: respuesta[0]})

// })

app.get('/logout', function(req, res)
{
    console.log("Soy un pedido GET", req.query);
    res.render('inicio', null);
});


// app.get('/jugar', function(req, res)
// {
//     console.log("Soy un pedido GET", req.query);
//     res.render('jugar', null);
// });

// app.get('/inicio', function(req, res)
// {
//     console.log("Soy un pedido GET", req.query);
//     res.render('inicio', null);
// });

// app.post('/home', function(req, res)
// {
//     console.log("Soy un pedido POST", req.body);
//     res.render('home', null);
// });

app.post('/ranking', async function(req, res){
    console.log("Pedido post /tablaRanking :)")
    // let usuario_puntaje = await MySQL.realizarQuery('SELECT * FROM Puntaje ORDER BY puntaje DESC')
    // console.log(usuario_puntaje)
    res.render('ranking', null/*{puntaje: usuario_puntaje}*/);
})

app.post('/tablaRanking', async function(req, res){
    console.log("Pedido get /tablaRanking :)")
    //let usuario_puntaje = await MySQL.realizarQuery('SELECT * FROM PuntosExpo ORDER BY puntaje DESC')
    //console.log(usuario_puntaje)
    res.render('tablaRanking', /*{puntaje: usuario_puntaje}*/);
})

// app.post('/mostrarPregunta', async(req, res) => {
//     try {
//         const indice = req.body.indicePreguntaActual
//         console.log(indice)
//             // Realizar la consulta SQL para obtener las preguntas y respuestas desde la base de datos
//         let result = await MySQL.realizarQuery(`SELECT id_pregunta, pregunta, opcion_1, 
//         opcion_2, opcion_3, opcion_correcta FROM Preguntas WHERE id_pregunta = "${indice}"`);

//         console.log(result)
//         // Formatear los datos según sea necesario. row representa cada fila de la base de datos en cada iteración.
//         // map  se utiliza para iterar sobre cada elemento (fila) del arreglo result y aplicar una función a cada elemento. 
//         // En este caso, se está transformando cada fila en un nuevo objeto que contiene la información deseada.

//         /* const preguntasRespuestas = result.map(row => ({
//             id_pregunta: row.id_pregunta,
//             pregunta: row.pregunta,
//             opciones: [row.opcion_1, row.opcion_2, row.opcion_3, row.opcion_correcta]
//         })); */

//         if (result.length == 0) {
//             //res.redirect('/tablaRanking');
//             res.send([{validar: false}])
//         } else {
//             const preguntasRespuestas = result.map(row => ({
//                 id_pregunta: row.id_pregunta,
//                 pregunta: row.pregunta,
//                 opciones: [row.opcion_1, row.opcion_2, row.opcion_3, row.opcion_correcta],
//                 validar: true
//             }));
    
//             // Enviar los datos como respuesta al cliente
//             res.send(preguntasRespuestas);
//         }

        
//     } catch (error) {
//         console.error("Error:", error);
//     }
// });


// app.put('/login', function(req, res) {
//     //Petición PUT con URL = "/login"
//     console.log("Soy un pedido PUT", req.body); //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método PUT
//     res.send(null);
// });

// app.delete('/login', function(req, res) {
//     //Petición DELETE con URL = "/login"
//     console.log("Soy un pedido DELETE", req.body); //En req.body vamos a obtener el objeto con los parámetros enviados desde el frontend por método DELETE
//     res.send(null);
// });