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
    const response = await fetch("/admin", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    });
      
    //En result obtengo la respuesta
    const result = await response.json();
    console.log("Success:", result);

    document.getElementById("usuario").value = result.usuario.usuario;
    

  } catch (error) {
    console.error("Error:", error);
  }
} 

//Esta funcion la llama el boton Ingresar que tiene que ser type button para ejecutar el onclick

// LEER PREGUNTAS
function leerUsuarios() {
  //Leo los datos del select
  let nombreUsuario = document.getElementById("selectUsuarios").value

  //Creo un objeto de forma instantanea
  let usuario = {
    usuario: nombreUsuario
  }
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
    let nuevoSiEsAdmin = document.getElementById("esAdmin").value
    let usuarioNuevo = {
      usuario: nuevoUsuario,
      esAdmin: nuevoSiEsAdmin
    }
  
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