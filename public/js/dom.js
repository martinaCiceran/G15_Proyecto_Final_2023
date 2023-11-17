// async function fetchPuntaje(data){
//   //putJSON() es solo el nombre de esta funcion que lo pueden cambiar    

//   try {
//     const response = await fetch("/sumarPuntaje", {
//       method: "POST", 
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
      
//     //En result obtengo la respuesta
//     const result = await response.json();
//     console.log("Success:", result);
//     console.log("genial martu :)")

//   } catch (error) {
//     console.error("Error:", error);
//   }
// } 

// function puntaje(puntaje) {
//   //Leo los datos del input
//   let puntaje = puntaje
//   //Creo un objeto de forma instantanea
//   let data = {
//     puntaje: puntaje
//   }

//   //data es el objeto que le paso al back
//   fetchPuntaje(data)
// }


async function fetchLeerUsuario(usuario) {
  //putJSON() es solo el nombre de esta funcion que lo pueden cambiar    

  try {
    const response = await fetch("/leerUsuarios", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
      
    //En result obtengo la respuesta
    const result = await response.json();
    console.log("Success:", result);

    document.getElementById("usuario").value = result.usuario.nombreUsuario;
    document.getElementById("email").value = result.usuario.email
    if(result.usuario.es_admin == 0){
      document.getElementById("esAdmin").value = "No"
    } else{
      document.getElementById("esAdmin").value = "Si"

    }
    

  } catch (error) {
    console.error("Error:", error);
  }
} 

//Esta funcion la llama el boton Ingresar que tiene que ser type button para ejecutar el onclick

// LEER PREGUNTAS
function leerUsuarios() {
  //Leo los datos del select
  let selectUsuarios = document.getElementById("selectUsuarios").value

  //Creo un objeto de forma instantanea
  let usuario = {
    usuario: selectUsuarios
  }
  console.log("ESTO ES EL leerUsuarios()")
  console.log(usuario)
  //pregunta es el objeto que le paso al back
  fetchLeerUsuario(usuario)
}

async function fetchAgregarUsuario(data){
  //putJSON() es solo el nombre de esta funcion que lo pueden cambiar    
  
    try {
      const response = await fetch("/agregarUsuario", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
        
      //En result obtengo la respuesta
      const result = await response.json();
      console.log("Success:", result);
      console.log("buenísimo :)")
      location.href = "/admin"
  
    } catch (error) {
      console.error("Error:", error);
    }
  } 
  
  // MODIFICAR PREGUNTAS 
  function agregarUsuarios(){
    let nuevoUsuario = document.getElementById("usuario").value
    let nuevoEmail = document.getElementById("email").value
    let nuevoSiEsAdmin = document.getElementById("esAdmin").value

    let usuarioNuevo = {
      usuario: nuevoUsuario,
      email: nuevoEmail,
      esAdmin: nuevoSiEsAdmin
    }  
    console.log("ESTO ES agregarUsuarios()")
    console.log(usuarioNuevo)
  
    fetchAgregarUsuario(usuarioNuevo)
  }

  async function fetchEliminarUsuario(data){
    //putJSON() es solo el nombre de esta funcion que lo pueden cambiar    
  
    try {
      const response = await fetch("/eliminarUsuario", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
        
      //En result obtengo la respuesta
      const result = await response.json();
      console.log("Success:", result);
      console.log("buenísimo :)")
      location.href = "/irAAdmin"
  
    } catch (error) {
      console.error("Error:", error);
    }
  } 
  
  function  eliminarUsuarios(){
    let id_usuarioEliminado = document.getElementById("selectUsuarios").value
  
  
    let usuarioEliminado = {
      id: id_usuarioEliminado
    }
  
    console.log(usuarioEliminado)
  
    fetchEliminarUsuario(usuarioEliminado)
  }

  async function fetchEditarUsuario(data){
    //putJSON() es solo el nombre de esta funcion que lo pueden cambiar    
  
    try {
      const response = await fetch("/modificarUsuario", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
        
      //En result obtengo la respuesta
      const result = await response.json();
      console.log("Success:", result);
      console.log("genial martu :)")
  
    } catch (error) {
      console.error("Error:", error);
    }
  } 
  

  function modificarUsuarios(){
    let id_usuarioMod = document.getElementById("selectUsuarios").value
    let usuarioMod = document.getElementById("usuario").value
    let esAdminMod = document.getElementById("esAdmin").value

    let usuarioModificado = {
      id: id_usuarioMod,
      usuario: usuarioMod,
      esAdmin: esAdminMod
    }
  
    console.log(usuarioModificado)
  
    fetchEditarUsuario(usuarioModificado)
    //let pregunta = fetchEditarPregunta(ID_pregunta) 
  }

  // async function fetchColoresPiezas(data){
  //   //putJSON() es solo el nombre de esta funcion que lo pueden cambiar    
  
  //   try {
  //     const response = await fetch("/tetris", {
  //       method: "POST", 
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
        
  //     //En result obtengo la respuesta
  //     const result = await response.json();
  //     console.log("Success:", result);
  //     console.log("genial martu :)")
      
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // } 
  

  // function coloresPiezas(){

  
    
  //   let usuarioModificado = {
  //     id: id_usuarioMod,
  //     usuario: usuarioMod,
  //     esAdmin: esAdminMod
  //   }
  
  //   console.log(usuarioModificado)
  
  //   fetchEditarUsuario(usuarioModificado)
  //   //let pregunta = fetchEditarPregunta(ID_pregunta)
  // }

  function mostrarRanking() {
    // Realiza la solicitud de redireccionamiento al servidor
    fetch('/redireccion', { method: 'GET' })
      .then(() => {
        // Redirige a la página principal cuando se complete la solicitud
        window.location.href = '/ranking';
      })
      .catch(err => {
        console.error('Error al redirigir:', err);
      });
  }