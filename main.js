document.addEventListener("DOMContentLoaded", () => {
  const login = document.getElementById("login");
  const app = document.getElementById("app");
  const btnLogin = document.getElementById("btn-login");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginError = document.getElementById("login-error");

  const formTarea = document.getElementById("form-tarea");
  const inputNombre = formTarea.querySelector("input[type='text']");
  const inputPrecio = formTarea.querySelector("input[type='number']");
  const ul = document.querySelector("ul");
  const emptyMessage = document.querySelector(".empty");
  const totalCostSpan = document.getElementById("total-cost");

  let total = 0;
  let productoEditando = null; // Guarda el <li> que estamos editando

  // Manejar inicio de sesión
  btnLogin.addEventListener("click", () => {
    const usuario = usernameInput.value;
    const contraseña = passwordInput.value;

    if (usuario === "admin" && contraseña === "1234") {
      login.style.display = "none";
      app.style.display = "flex";
    } else {
      loginError.style.display = "block";
    }
  });

  // Manejar el envío del formulario (agregar o editar)
  formTarea.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = inputNombre.value.trim();
    const precioTexto = inputPrecio.value.replace(",", ".");
    const precio = parseFloat(precioTexto);

    if (!nombre || isNaN(precio)) {
      alert("Por favor, ingresa un producto y un precio válido.");
      return;
    }

    if (productoEditando) {
      // Estamos editando un producto existente
      const precioAnteriorTexto = productoEditando.querySelector(".price").textContent;
      const precioAnterior = parseFloat(precioAnteriorTexto.replace(/[^0-9.-]/g, ""));

      // Actualizar nombre y precio
      productoEditando.querySelector(".content").textContent = nombre;
      productoEditando.querySelector(".price").textContent = `$${precio.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

      // Actualizar el total
      const diferencia = precio - precioAnterior;
      total += diferencia;
      totalCostSpan.textContent = `$${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

      // Limpiar variable de edición
      productoEditando = null;

      // Cambiar texto del botón a su estado original
      formTarea.querySelector("button[type='submit']").textContent = "Agregar";

    } else {
      // Agregar nuevo producto
      agregarProducto(nombre, precio);
    }

    // Limpiar campos
    inputNombre.value = "";
    inputPrecio.value = "0,0";
  });

  function agregarProducto(nombre, precio) {
    const li = document.createElement("li");
    li.classList.add("item"); // Clase opcional

    li.innerHTML = `
      <div class="content">${nombre}</div>
      <div class="price">$${precio.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
      <div class="actions">
        <button class="btn-editar" title="Editar"><img src="IMG/editar.png" alt="Editar"></button>
        <button class="btn-completar" title="Completado"><img src="IMG/completar.png" alt="Completar"></button>
        <button class="btn-eliminar-img" title="Eliminar"><img src="IMG/eliminar.png" alt="Eliminar"></button>
      </div>
    `;

    ul.appendChild(li);
    actualizarVistaVacia();
    actualizarTotal(precio);
  }

  function actualizarVistaVacia() {
    emptyMessage.style.display = ul.children.length === 0 ? "block" : "none";
  }

  function actualizarTotal(precio) {
    total += precio;
    totalCostSpan.textContent = `$${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }

  // Editar producto (rellenar formulario)
  ul.addEventListener("click", (e) => {
    if (
      e.target.closest(".btn-editar") ||
      e.target.closest(".btn-editar img")
    ) {
      const li = e.target.closest("li");
      const nombre = li.querySelector(".content").textContent;
      const precioTexto = li.querySelector(".price").textContent;
      const precio = parseFloat(precioTexto.replace(/[^0-9.-]/g, ""));

      // Rellenamos los campos del formulario
      inputNombre.value = nombre;
      inputPrecio.value = precio.toFixed(2);

      // Guardamos la <li> que estamos editando
      productoEditando = li;

      // Cambiar texto del botón para saber que es edición
      formTarea.querySelector("button[type='submit']").textContent = "Actualizar";

      // Scroll suave hacia arriba
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });

  // Eliminar producto
  ul.addEventListener("click", (e) => {
    if (
      e.target.closest(".btn-eliminar-img") ||
      e.target.closest(".btn-eliminar-img img")
    ) {
      const li = e.target.closest("li");
      const precioTexto = li.querySelector(".price").textContent;
      const precio = parseFloat(precioTexto.replace(/[^0-9.-]/g, ""));

      total -= precio;
      totalCostSpan.textContent = `$${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

      li.remove();
      actualizarVistaVacia();
    }
  });

  // Completar producto
  ul.addEventListener("click", (e) => {
    if (
      e.target.closest(".btn-completar") ||
      e.target.closest(".btn-completar img")
    ) {
      const li = e.target.closest("li");
      li.classList.toggle("completada");
    }
  });
});