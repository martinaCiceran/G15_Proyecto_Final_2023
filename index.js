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

const { initializeApp } = require("firebase/app");
const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  GoogleAuthProvider,
} = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyB6k56AztBMThTo-2Z3apX8VU8hh8dj9Mg",
  authDomain: "tetris-proyecto-final.firebaseapp.com",
  projectId: "tetris-proyecto-final",
  storageBucket: "tetris-proyecto-final.appspot.com",
  messagingSenderId: "425385016005",
  appId: "1:425385016005:web:b3b6a7be809f7429300eac"
};
  
const appFirebase = initializeApp(firebaseConfig);
const auth = getAuth(appFirebase);
const authService = require("./authService");


/* -------------------------------------------------- */

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

app.get("/registro", (req, res) => {
  res.render("registro");
});
  
app.post("/enviarRegistro", async (req, res) => {
  const { email, password } = req.body;

  try {
    await authService.registerUser(auth, { email, password });
    res.render("login", {
      message: "Registro exitoso. Puedes iniciar sesión ahora.",
    });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.render("registro", {
      message: "Error en el registro: " + error.message,
    });
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await authService.loginUser(auth, {
      email,
      password,
    });
    // Aquí puedes redirigir al usuario a la página que desees después del inicio de sesión exitoso
    res.redirect("/inicio");
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.render("login", {
      message: "Error en el inicio de sesión: " + error.message,
    });
  }
});

app.get('/admin', async function(req, res)
{
  console.log("Soy un pedido GET /iraadmin", req.query);
  // let preguntas = await MySQL.realizarQuery("SELECT id_pregunta FROM Preguntas;");
  //console.log(preguntas)
  // console.log(preguntas[1].id_pregunta)
  res.render('administrador', null/*{preguntas: preguntas}*/);
});


app.get('/logout', function(req, res)
{
  console.log("Soy un pedido GET", req.query);
  res.render('inicio', null);
});


app.get('/home-admin', function(req, res)
{
  console.log("Soy un pedido GET", req.query);
  res.render('home-admin', null);
});


app.get('/ranking', async function(req, res){
  console.log("Pedido post /tablaRanking :)")
  // let usuario_puntaje = await MySQL.realizarQuery('SELECT * FROM Puntaje ORDER BY puntaje DESC')
  // console.log(usuario_puntaje)
  res.render('ranking', null/*{puntaje: usuario_puntaje}*/);
})