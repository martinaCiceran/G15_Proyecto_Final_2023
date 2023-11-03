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

app.get('/tetris', function(req, res)
{
  console.log(req.query);
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

app.get('/login', function(req, res)
{
  console.log("Soy un pedido GET", req.query);
  res.render('login', null);
});

app.get("/registro", (req, res) => {
  res.render("register");
});

app.get('/home-admin', function(req, res)
{
  console.log("Soy un pedido GET", req.query);
  res.render('home-admin', null);
});

app.get('/option', function(req, res)
{
  console.log("Soy un pedido GET", req.query);
  res.render('option', null);
});


app.get('/logout', function(req, res)
{
  console.log("Soy un pedido GET", req.query);
  res.render('inicio', null);
});

app.get('/ranking', async function(req, res){
  console.log("Pedido post /tablaRanking :)")
  // let usuario_puntaje = await MySQL.realizarQuery('SELECT * FROM Puntaje ORDER BY puntaje DESC')
  // console.log(usuario_puntaje)
  res.render('ranking', null/*{puntaje: usuario_puntaje}*/);
})
app.get('/admin', async function(req, res)
{
    console.log("Soy un pedido GET /iraadmin", req.query);
    let usuarios = await MySQL.realizarQuery("SELECT usuario FROM Usuarios_tetris;");
    console.log(usuarios)
    // console.log(preguntas[1].id_pregunta)
    res.render('administrador', {usuarios: usuarios});
});

app.post('/login', async function(req, res)
{
    //Petición POST con URL = "/login"
    console.log("Soy un pedido POST /login", req.body);
    let respuesta = await MySQL.realizarQuery(`SELECT * FROM Usuarios WHERE usuario = "${req.body.usuario}" AND password = "${req.body.contraseña}"`)
    req.session.user = req.body.usuario
});

// app.post('/leerPreguntas', async function(req, res)
// {
//     console.log("Soy un pedido POST", req.body);
//     let respuesta = await MySQL.realizarQuery(`SELECT * FROM Preguntas WHERE id_pregunta = ${req.body.id}`)

//     res.send({pregunta: respuesta[0]})

// })


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

// app.post('/modificarPregunta', async function(req, res)
// {
//     console.log("Modificar pregunta :)")
    
//     console.log("Soy un pedido POST /modificarPregunta");
//     let respuesta = await MySQL.realizarQuery(`UPDATE Preguntas SET pregunta = "${req.body.pregunta}", opcion_1 = "${req.body.op_1}", opcion_2 = "${req.body.op_2}", opcion_3 = "${req.body.op_3}", opcion_correcta = "${req.body.op_correcta}" WHERE id_pregunta = ${req.body.id}`)
//     res.send({preguntaMod: respuesta})
// });

app.post('/agregarUsuario', async function(req, res)
{
    console.log("Agregar Usuario")
    let nombreUsuario = req.body.usuarioNombre;
    let esAdmin = req.body.selectUsuarios;
    
    if(nombreUsuario == "" || esAdmin == ""){0
        console.log("Uno de los campos está vacío")   
    }
    else{
        let respuesta = await MySQL.realizarQuery(`INSERT INTO Usuarios(usuario, adminstrador) VALUES("${nombreUsuario}", "${esAdmin}")`)
        console.log(await (MySQL.realizarQuery('SELECT * FROM Usuarios')))
        res.send({usuario: respuesta})
    }
});

app.post('/eliminarUsuario', async function(req, res)
{
    console.log("Modificar usuario")
    
    console.log("Soy un pedido POST /modificarUsuario");
    let respuesta = await MySQL.realizarQuery(`DELETE FROM Usuarios_tetris WHERE id_usuario = ${req.body.id}`)
    res.send({usuarioMod: respuesta})
});

app.post('/modificarUsuario', async function(req, res)
{
    console.log("Modificar usuario")
    
    console.log("Soy un pedido POST /modificarUsuario");
    let respuesta = await MySQL.realizarQuery(`UPDATE Usuarios SET usuario_nombre = "${req.body.usuario_nombre}", usuario_apellido = "${req.body.usuario_apellido}",  usuario_DNI = "${req.body.usuario_DNI}", usuario_nombreDeUsuario = "${req.body.usuario_nombreDeUsuario}", usuario_contraseña = "${req.body.usuario_contraseña}" WHERE id_usuario = ${req.body.id_usuario}`)
    res.send({usuarioMod: respuesta})
});

// LOGIN Y REGISTRO CON FIREBASE
const { initializeApp } = require("firebase/app");
const {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    GoogleAuthProvider,
  } = require("firebase/auth");
  
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.listen(Listen_Port, function () {
  console.log(
    "Servidor NodeJS corriendo en http://localhost:" + Listen_Port + "/"
  );
});
  
// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAS3wNtKMqea0Qqo8SLf2snnsX2DduDLf4",
  authDomain: "proyecto-final-54cc3.firebaseapp.com",
  projectId: "proyecto-final-54cc3",
  storageBucket: "proyecto-final-54cc3.appspot.com",
  messagingSenderId: "318273645668",
  appId: "1:318273645668:web:306619f4fdb5277da60371",
  measurementId: "G-KMLSCJQDLK"
};

const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);

// Importar AuthService
const authService = require("./authService");

  
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    await authService.registerUser(auth, { email, password });
    res.render("register", {
      message: "Registro exitoso. Puedes iniciar sesión ahora.",
    });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.render("register", {
      message: "Error en el registro: " + error.message,
    });
  }
});
  
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await authService.loginUser(auth, {
      email,
      password,
    });
    // Aquí puedes redirigir al usuario a la página que desees después del inicio de sesión exitoso
    res.redirect("/option");
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.render("login", {
      message: "Error en el inicio de sesión: " + error.message,
    });
  }
});

  
app.get("/dashboard", (req, res) => {
  // Agrega aquí la lógica para mostrar la página del dashboard
  res.render("dashboard");
});
  

// app.get('/tablaRanking', async function(req, res){
//     console.log("Pedido get /tablaRanking :)")
//     let usuario_puntaje = await MySQL.realizarQuery('SELECT * FROM Puntaje ORDER BY puntaje DESC')
//     console.log(usuario_puntaje)
//     res.render('tablaRanking', {puntaje: usuario_puntaje});
// })

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

const admin = require("firebase-admin");
const serviceAccount = require("path/to/your/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "proyecto-final-54cc3.firebaseapp.com"
});

const db = admin.database();

app.post('/login', async function(req, res) {
    // Petición POST con URL = "/login"
    console.log("Soy un pedido POST", req.body);
    
    try {
        // Autenticación del usuario en Firebase
        const user = await admin.auth().getUserByEmail(req.body.usuario);
        
        // Verificación de si el usuario es administrador
        const esAdministrador = (await db.ref(`/usuarios/${user.uid}`).child('esAdministrador').once('value')).val();
        
        if (esAdministrador) {
            // Redirigir a la página de administrador
            res.redirect('/irAAdmin');
        } else {
            // Redirigir a la página de usuario normal
            res.redirect('/home');
        }
    } catch (error) {
        res.send({ validar: false });
    }
});