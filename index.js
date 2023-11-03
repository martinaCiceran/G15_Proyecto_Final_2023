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
const { initializeApp } = require("firebase/app");
const {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    GoogleAuthProvider,
} = require("firebase/auth");

const app = express(); //Inicializo express para el manejo de las peticiones

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); //Expongo al lado cliente la carpeta "public"

app.use(bodyParser.urlencoded({ extended: false })); //Inicializo el parser JSON
app.use(bodyParser.json());

app.engine('handlebars', exphbs({defaultLayout: 'main'})); //Inicializo Handlebars. Utilizo como base el layout "Main".
app.set("view engine", "handlebars");

const Listen_Port = 3000; //Puerto por el que estoy ejecutando la página Web

const server=app.listen(Listen_Port, function() {
  console.log('Servidor NodeJS corriendo en http://localhost:' + Listen_Port + '/');
});

const io = require('socket.io')(server)


app.set('view engine', 'handlebars'); //Inicializo Handlebars


const sessionMiddleware=session({
    secret: 'sararasthastka',
    resave: true,
    saveUninitialized: false,
});

app.use(sessionMiddleware)

io.use(function(socket, next) {
  sessionMiddleware(socket.request, socket.request.res, next)
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

app.use(session({secret:'123456', resave: true, saveUninitialized: true}));

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



// async function getColor(){
//   const response = await fetch("https://x-colors.yurace.pro/api/random/228");
//   const data = await response.json()
//   return data.hex
// }



app.get('/', function(req, res)
{
    console.log(req.query);
    res.render('inicio', null);
});


async function getColor(){
  try {
    const response = await fetch("https://x-colors.yurace.pro/api/random/228",);
    const data = await response.json()
    return data.hex
  } catch (error) {
    console.error("Error:", error);
  }
} 

app.get('/color', async function(req, res)
{
  console.log("GET /color");
  let colorBlanco =  "#fff"
  let color1 = await getColor()
  let color2 = await getColor()
  let color3 = await getColor()
  let color4 = await getColor()
  let color5 = await getColor()
  let color6 = await getColor()
  let color7 = await getColor()
  console.log(color1)
  console.log(color2)
  console.log(color3)
  console.log(color4)
  console.log(color5)
  console.log(color6)
  console.log(color7)
  res.send({colorBlanco: colorBlanco, color1: color1, color2: color2, color3: color3, color4: color4, color5: color5, color6: color6, color7: color7});
});


app.get('/tetris', async function(req, res)
{
  console.log(req.body);
  console.log("Soy un pedido POST /TETRIS", req.body);
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
  let usuariosPuntaje =  await MySQL.realizarQuery(`SELECT idUsuario FROM Puntaje_tetris`)
  for(let i= 0; i<usuariosPuntaje.length; i++) {
    if(usuariosPuntaje[i] == req.session.userLoggeado){
      let respuesta = await MySQL.realizarQuery(`UPDATE Puntaje_tetris SET puntaje = puntaje + ${req.body.puntaje} WHERE idUsuario = ${req.session.userLoggeado})`)
      console.log("Usuario modificado")
      res.send({validar: true, puntaje: respuesta})
    }
    else{
      let respuesta = await MySQL.realizarQuery(`INSERT INTO Puntaje_tetris(idUsuario, puntaje) VALUES(${req.session.userLoggeado}, "${req.body.puntaje}")`)
      console.log("Usuario ingresado")
      res.send({validar: true, puntaje: respuesta})
    }
    res.send({validar: true, puntaje: respuesta})
  }
  console.log(await (MySQL.realizarQuery('SELECT * FROM Puntaje_tetris')))
  
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
  console.log(req.session.userLoggeado)
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
  
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    await authService.registerUser(auth, { email, password });

    await MySQL.realizarQuery(`INSERT INTO Usuarios_tetris(idUsuario, email, es_admin) VALUES("0", "${req.body.email}", 0)`)

    // let userLoggeado = await MySQL.realizarQuery(`SELECT * FROM Usuarios_tetris WHERE idUsuario = "${userCredential.user.uid}" AND email = "${req.body.email}"`)

    // req.session.userLoggeado = userLoggeado[0]

    // console.log(req.session.userLoggeado)

    res.render("register", {
      message: "Registro exitoso. Puedes iniciar sesión ahora. VERIFICA TU CASILLA DE MAIL ",
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
    //console.log(userCredential)
    console.log(userCredential.user.uid)
    await MySQL.realizarQuery(`UPDATE Usuarios_tetris SET idUsuario = "${userCredential.user.uid}" WHERE email = "${req.body.email}"`)
    let userLoggeado = await MySQL.realizarQuery(`SELECT * FROM Usuarios_tetris WHERE idUsuario = "${userCredential.user.uid}" AND email = "${req.body.email}"`)
    req.session.userLoggeado = userLoggeado[0]
    req.session.save();
    console.log(req.session.userLoggeado)
    // Aquí puedes redirigir al usuario a la página que desees después del inicio de sesión exitoso
    res.redirect("/option");
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.render("login", {
      message: "Error en el inicio de sesión: " + error.message,
    });
  }
});
  

// app.get('/tablaRanking', async function(req, res){
//     console.log("Pedido get /tablaRanking :)")
//     let usuario_puntaje = await MySQL.realizarQuery('SELECT * FROM Puntaje ORDER BY puntaje DESC')
//     console.log(usuario_puntaje)
//     res.render('tablaRanking', {puntaje: usuario_puntaje});
// })
        
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



io.on("connection", (socket) => {
  //Esta línea es para compatibilizar con lo que venimos escribiendo
  const req = socket.request;

  //Esto serìa el equivalente a un app.post, app.get...
  // SE CONECTA A LA SALA
  // socket.on('incoming-message', data => {
  //     console.log("INCOMING MESSAGE:", data);
  //     req.session.salaNombre = data.salaNombre
  //     console.log("SALA: ", req.session.salaNombre)
  //     io.to(req.session.salaNombre).emit("server-message", {mensaje:"MENSAJE DE SERVIDOR"}) 
  // });
  socket.on('nombreSala', async (data) => {
    console.log("Se conecto a la sala:", data.salaNombre);
    req.session.salaNombre = data.salaNombre
    req.session.save();
    
    

  });

  socket.on('unirseSala', async () => {
    console.log("Se conecto a la sala:", req.session.salaNombre);
    if(req.session.salaNombre != ""){
      socket.leave(req.session.salaNombre)
    }
    socket.join( req.session.salaNombre)
    io.to(req.session.salaNombre).emit("server-message", {mensaje:"te conectaste a la sala"}) 
    req.session.save();
  });

  socket.on('mostrarCuadricula', async (data) => {
    console.log(req.session.userLoggeado)
    console.log(req.session.salaNombre)
    req.session.cuadricula = data.cuadricula
    console.log(req.session.cuadricula)
    io.to(data.salaNombre).emit("cuadricula", {mensaje:"ENVIANDO CUADRICULA", cuadricula: req.session.cuadricula, user: req.session.userLoggeado})
    req.session.save();

  });

  socket.on('puntaje', data => {
    console.log("SOCKET PUNTAJE")
    console.log("puntaje: ", data.puntaje)
  });
  
});

//setInterval(() => io.emit("server-message", {mensaje:"MENSAJE DEL SERVIDOR"}), 2000);