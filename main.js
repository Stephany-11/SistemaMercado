document.addEventListener("DOMContentLoaded", () => {
  const btnLogin = document.getElementById("btn-login");

  if (btnLogin) {
    btnLogin.addEventListener("click", () => {
      const usuario = document.getElementById("username").value;
      const contraseña = document.getElementById("password").value;

      const usuarioValido = "admin";
      const contraseñaValida = "1234";

      if (usuario === usuarioValido && contraseña === contraseñaValida) {
        document.getElementById("login").style.display = "none";
        document.getElementById("app").style.display = "block";
      } else {
        document.getElementById("login-error").style.display = "block";
      }
    });
  }
});



// Selección de elementos del DOM
const entradaTexto = document.querySelector("input[type='text']");
const entradaNumero = document.querySelector("#numer-input");
const botonAgregar = document.querySelector(".btn-add");
const listaTareas = document.querySelector("ul");
const mensajeVacio = document.querySelector(".empty");
const totalCostoElemento = document.getElementById("total-cost");

let tareaEnEdicion = null;

// Evento para agregar o editar tareas
botonAgregar.addEventListener("click", (e) => {
  e.preventDefault();

  const texto = entradaTexto.value.trim();
  const costo = entradaNumero.value.trim();

  if (texto !== "" && costo !== "") {
    if (tareaEnEdicion) {
      tareaEnEdicion.querySelector(".texto-tarea").textContent = texto;
      tareaEnEdicion.querySelector(".costo-tarea").textContent = `$${parseFloat(costo).toFixed(2)}`;
      tareaEnEdicion = null;
    } else {
      const tarea = document.createElement("li");

      const parrafoTexto = document.createElement("p");
      parrafoTexto.textContent = texto;
      parrafoTexto.className = "texto-tarea";

      const parrafoCosto = document.createElement("p");
      parrafoCosto.textContent = `$${parseFloat(costo).toFixed(2)}`;
      parrafoCosto.className = "costo-tarea";

      tarea.appendChild(parrafoTexto);
      tarea.appendChild(parrafoCosto);
      tarea.appendChild(agregarBotonEliminar());
      tarea.appendChild(agregarBotonEditar());
      tarea.appendChild(agregarBotonCompletar());

      listaTareas.appendChild(tarea);
      mensajeVacio.style.display = "none";
    }

    entradaTexto.value = "";
    entradaNumero.value = "";
    actualizarTotal();
  }
});

// Crear botón eliminar
function agregarBotonEliminar() {
  const botonEliminar = document.createElement("button");
  botonEliminar.textContent = "X";
  botonEliminar.className = "btn-eliminar";

  botonEliminar.addEventListener("click", (e) => {
    const tarea = e.target.parentElement;
    listaTareas.removeChild(tarea);

    if (listaTareas.querySelectorAll("li").length === 0) {
      mensajeVacio.style.display = "block";
    }

    actualizarTotal();
  });

  return botonEliminar;
}

// Crear botón editar
function agregarBotonEditar() {
  const botonEditar = document.createElement("button");
  botonEditar.textContent = "Editar";
  botonEditar.className = "btn-editar";

  botonEditar.addEventListener("click", (e) => {
    const tarea = e.target.parentElement;

    entradaTexto.value = tarea.querySelector(".texto-tarea").textContent;
    const textoCosto = tarea.querySelector(".costo-tarea").textContent.replace("$", "");
    entradaNumero.value = textoCosto;

    tareaEnEdicion = tarea;
  });

  return botonEditar;
}

// Crear botón completar
function agregarBotonCompletar() {
  const botonCompletar = document.createElement("button");
  botonCompletar.textContent = "Comprado";
  botonCompletar.className = "btn-completar";

  botonCompletar.addEventListener("click", (e) => {
    const tarea = e.target.parentElement;
    tarea.classList.toggle("completada");
  });

  return botonCompletar;
}

// Calcular total acumulado
function actualizarTotal() {
  const costos = document.querySelectorAll(".costo-tarea");
  let total = 0;

  costos.forEach(costo => {
    const valor = parseFloat(costo.textContent.replace("$", ""));
    if (!isNaN(valor)) {
      total += valor;
    }
  });

  totalCostoElemento.textContent = `$${total.toFixed(2)}`;
}
