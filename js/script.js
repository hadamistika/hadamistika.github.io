import {crearArticle} from "../js/cards.js";

let items = document.querySelectorAll(".carousel .carousel-item");

items.forEach((el) => {
  const minPerSlide = 4;
  let next = el.nextElementSibling;
  for (var i = 1; i < minPerSlide; i++) {
    if (!next) {
      // wrap carousel by using first child
      next = items[0];
    }
    let cloneChild = next.cloneNode(true);
    el.appendChild(cloneChild.children[0]);
    next = next.nextElementSibling;
  }
});

// Ruta al archivo JSON
const jsonFile = './data/data.json';
let productos;
// Función para cargar el archivo JSON
async function cargarProductos() {
  try {
    const response = await fetch(jsonFile);
    if (response.ok) {
      console.log(response);
      const productosjson = await response.json();
      productos = Array.from(productosjson);
      crearArticle(productos);
      console.log(productos);
    } else {
      console.error('Error al cargar el archivo JSON');
    }
  } catch (error) {
    console.error('Error al cargar el archivo JSON:', error);
  }
}
cargarProductos();
