// ===== DATOS =====
// Elementos que aparecerán en el desplegable
const elementosLista = ["Primer elemento", "Segundo elemento", "Tercer elemento", "Cuarto elemento", "Quinto elemento"];
const textoMarcador = "Selecciona un elemento";

// ===== ESTADO =====
let seleccionado = null; // Guarda la posición del elemento elegido (null = ninguno)

// ===== REFERENCIAS AL DOM =====
const desplegable = document.getElementById("desplegable");
const boton = document.getElementById("desplegableBoton");
const texto = document.getElementById("desplegableTexto");
const lista = document.getElementById("desplegableLista");

// ===== CREAR LAS OPCIONES =====
// Por cada elemento del arreglo se crea un <li> y se agrega a la lista
elementosLista.forEach(function (nombre, posicion) {
  const opcion = document.createElement("li");
  opcion.className = "desplegable-opcion";
  opcion.textContent = nombre;
  opcion.setAttribute("role", "option");
  opcion.tabIndex = 0; // Permite llegar a la opción con el teclado

  // Al hacer clic se selecciona la opción
  opcion.addEventListener("click", function () {
    seleccionar(posicion);
  });

  // Con Enter o Espacio también se selecciona
  opcion.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      seleccionar(posicion);
    }
  });

  lista.appendChild(opcion);
});

// ===== FUNCIONES =====
// Abre o cierra la lista
function alternar() {
  const abierto = desplegable.classList.toggle("abierto");
  boton.setAttribute("aria-expanded", abierto); // Accesibilidad
}

// Cierra la lista
function cerrar() {
  desplegable.classList.remove("abierto");
  boton.setAttribute("aria-expanded", false);
}

// Guarda la selección, actualiza la pantalla y cierra el desplegable
function seleccionar(posicion) {
  seleccionado = posicion;
  texto.textContent = elementosLista[posicion];
  desplegable.classList.add("con-seleccion");

  // Marca solo la opción elegida con la clase "seleccionada"
  const opciones = lista.children;
  for (let i = 0; i < opciones.length; i++) {
    opciones[i].classList.toggle("seleccionada", i === posicion);
    opciones[i].setAttribute("aria-selected", i === posicion);
  }

  cerrar();
  boton.focus(); // Devuelve el foco al botón
}

// ===== EVENTOS =====
// Clic en el botón: abrir o cerrar
boton.addEventListener("click", alternar);

// Clic fuera del desplegable: cerrar
document.addEventListener("click", function (e) {
  if (!desplegable.contains(e.target)) cerrar();
});

// Tecla Escape: cerrar
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") cerrar();
});
