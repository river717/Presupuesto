function mostrarContenido(tipo) {
  if (tipo === "ingresos") {
    document.getElementById("contenedor-ingresos").classList.add("visible");
    document.getElementById("contenedor-ingresos").classList.remove("oculto");
    document.getElementById("contenedor-egresos").classList.add("oculto");
    document.getElementById("contenedor-egresos").classList.remove("visible");

    document.getElementById("btn-ingresos").classList.add("active");
    document.getElementById("btn-egresos").classList.remove("active");
  } else if (tipo === "egresos") {
    document.getElementById("contenedor-egresos").classList.add("visible");
    document.getElementById("contenedor-egresos").classList.remove("oculto");
    document.getElementById("contenedor-ingresos").classList.add("oculto");
    document.getElementById("contenedor-ingresos").classList.remove("visible");

    document.getElementById("btn-egresos").classList.add("active");
    document.getElementById("btn-ingresos").classList.remove("active");
  }
}

function obtenerMesActual() {
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const fecha = new Date();
  const digitoMes = fecha.getMonth();
  const nombreMes = meses[digitoMes];
  return nombreMes;
}

//Mostrar mes en el DOM
const mesActual = obtenerMesActual();
console.log(mesActual);
document.getElementById("mesActual").innerHTML = mesActual;


//Variables que almacenan el total de ingresos y egresos
var totalIngresos = 0;
var totalEgresos = 0;

function agregarTransaccion() {
  var tipo = document.getElementById("tipoTransaccion").value;
  var descripcion = document.getElementById("descripcion").value;
  var cantidad = document.getElementById("cantidad").value;

  if (tipo === "" || descripcion === "" || cantidad === "") {
    alert("Por favor, completa todos los campos");
    console.log(typeof(cantidad));
    return;
  }
  //Crear la card
  var tarjeta = document.createElement("div");
  tarjeta.classList.add("card-transacciones");

  //Convertir número proveniente del input a 2 decimales
  let numero = parseFloat(cantidad).toFixed(2);
  let proof = typeof(numero);
  console.log(proof);

  //Agregar la card al contenedor correspondiente
  if (tipo === "ingreso") {
    tarjeta.innerHTML = `<p>${descripcion}</p>
                        <p>+ $${numero}</p>`;
    document.getElementById("contenedor-ingresos").appendChild(tarjeta);
    totalIngresos += numero;
  } else if (tipo === "egreso") {
    tarjeta.innerHTML = `<p>${descripcion}</p>
                        <p>- $${numero}</p>`;
    document.getElementById("contenedor-egresos").appendChild(tarjeta);
    totalEgresos += numero;
  }

  //Reiniciar los input
  document.getElementById("descripcion").value = "";
  document.getElementById("cantidad").value = "";

  console.log("Total de ingresos: ", totalIngresos);
  console.log("Total de egresos: ", totalEgresos);

}
