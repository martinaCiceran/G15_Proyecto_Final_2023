async function fetchPuntaje(data){
    //putJSON() es solo el nombre de esta funcion que lo pueden cambiar    
  
    try {
      const response = await fetch("/sumarPuntaje", {
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

function puntaje() {
    //Leo los datos del input
    let puntaje = document.getElementById("puntaje").value
  
    //Creo un objeto de forma instantanea
    let data = {
      puntaje: puntaje
    }
  
    //data es el objeto que le paso al back
    fetchPuntaje(data)
}