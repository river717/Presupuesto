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
  const anio = fecha.getFullYear();
  const nombreMes = meses[digitoMes];
  return `${nombreMes} ${anio}`;
}

//Mostrar mes en el DOM
const mesActual = obtenerMesActual();
document.getElementById("mes-actual").innerHTML = `${mesActual}`;

//Variables que almacenan el total de ingresos y egresos
var totalIngresos = 0;
var totalEgresos = 0;

function agregarTransaccion() {
  //Obtenemos los valores de los elementos
  var tipo = document.getElementById("tipoTransaccion").value;
  var descripcion = document.getElementById("descripcion").value;
  var cantidad = document.getElementById("cantidad").value;

  //Validamos que los campos no esten vacíos
  if (tipo === "" || descripcion === "" || cantidad === "") {
    //Mostrar alerta de error
    Swal.fire({
      title: "Error",
      text: "Debe llenar todos los campos.",
      icon: "error",
    });
    return;
  }
  //Crear la card de transacción que se agregará al DOM 
  var tarjeta = document.createElement("div");
  tarjeta.classList.add("card-transacciones");

  //Convertir número proveniente del input a 2 decimales
  let auxiliar = parseFloat(cantidad).toFixed(2);
  let numero = parseFloat(auxiliar);

  //Agregar la card al contenedor correspondiente
  if (tipo === "ingreso") {
    tarjeta.innerHTML = `<p>${descripcion}</p>
                        <p>+ $${auxiliar}</p>`;
    document.getElementById("contenedor-ingresos").appendChild(tarjeta);
    //Sumar cantidad al total de ingresos
    totalIngresos += numero;
    document.getElementById("label-ingreso").classList.add("hidden");
  } else if (tipo === "egreso") {
    //Calcular el porcentaje individual que representa la transacción sobre el total de ingresos
    let porcentajeEgreso = (numero*100) / totalIngresos;
    tarjeta.innerHTML = `<p>${descripcion}</p>
                        <p>- $${auxiliar} <span class="porcentaje">${Math.round(porcentajeEgreso)}%</span></p>`;
    document.getElementById("contenedor-egresos").appendChild(tarjeta);
    //Sumar cantidad al total de egresos
    totalEgresos += numero;
    document.getElementById("label-egreso").classList.add("hidden");
  }
  
  //Calcular el total y porcentaje total de gastos
  let totalPresupuesto = totalIngresos - totalEgresos;
  let porcentaje = (totalEgresos / totalIngresos) * 100;

  //Actualizar los campos en el DOM
  document.getElementById("ingresos").innerHTML = `$${totalIngresos.toFixed(2)}`;
  document.getElementById("egresos").innerHTML = `$${totalEgresos.toFixed(2)}`;
  document.getElementById("total-presupuesto").innerHTML = `$${totalPresupuesto.toFixed(2)}`;
  document.getElementById("porcentaje").innerHTML = `${Math.round(porcentaje)}%` ;

  //Reiniciar los input
  document.getElementById("descripcion").value = "";
  document.getElementById("cantidad").value = "";

  //Mostrar alerta de transacción exitosa
  Swal.fire({
    title: "Transacción exitosa",
    text: `Su ${tipo} ha sido agregado correctamente.`,
    icon: "success",
  });
}

//Actualiza el contenido en el DOM según el tipo de transacción
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

//Validar datos de Monto (no negativos ni cero y enviar respectivas validaciones)
//Problemas de scroll cuando hayan 5 o 6 tarjetas habilitar el scroll
