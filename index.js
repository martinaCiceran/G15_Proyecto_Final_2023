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

app.post('/tetris', async function(req, res)
{   console.log(req.query);
    await MySQL.realizarQuery(`INSERT INTO PuntosExpo(usuario) VALUES("${req.body.nombreDeUsuario}")`)
    let usuario = await MySQL.realizarQuery(`SELECT id FROM PuntosExpo WHERE usuario = "${req.body.nombreDeUsuario}"`)
    req.session.user = usuario
    console.log(req.session.user[0].id)
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
    let respuesta = await MySQL.realizarQuery(`Update PuntosExpo SET puntaje = ${req.body.puntaje} WHERE id = ${req.session.user[0].id}`)
    console.log(await (MySQL.realizarQuery('SELECT * FROM PuntosExpo')))
    res.send({puntaje: respuesta})
});


// app.post('/sumarPuntaje', async function(req, res) {
//     console.log("Soy un pedido POST /sumarPuntaje", req.body);

//     // Asumiendo que estás usando un sistema de base de datos, por ejemplo, MySQL
//     // Aquí se realiza la actualización del puntaje en la base de datos
//     try {
//         await MySQL.realizarQuery(`UPDATE PuntosExpo SET puntaje = ${req.body.puntaje} WHERE id = ${req.session.user[0].id}`);
//         console.log(await (MySQL.realizarQuery('SELECT * FROM Puntaje_tetris'))); // Corregí el nombre de la tabla
//         res.send({ puntaje: req.body.puntaje });
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).send("Error interno del servidor");
//     }
// });


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
    let usuario_puntaje = await MySQL.realizarQuery('SELECT * FROM PuntosExpo ORDER BY puntaje DESC')
    console.log(usuario_puntaje)
    res.render('tablaRanking', {puntaje: usuario_puntaje});
})

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