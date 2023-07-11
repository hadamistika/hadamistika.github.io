import { crearArticle,crearBotonFiltro } from "../js/cards.js";
import { getProductosFetch } from "../js/peticiones.js";
import { Producto } from "../js/producto.js";
import { AgregarProductoACarrito } from "../js/carrito.js";

const items = document.querySelectorAll(".carousel .carousel-item");
const itemsProductos = document.querySelectorAll("#collapseProductos .list-group-item");
const itemsUsos = document.querySelectorAll("#collapseUsos .list-group-item");
const itemsProductosDropdown = document.querySelectorAll(".dropdown-item");
const carritoBoton = document.querySelector("#carritoBoton");
let productos = [];
let productosFiltrados = [];


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

const obtenerProductos = async () => {
  try {
    const data = await getProductosFetch();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

obtenerProductos()
  .then((data) => {
     productos = data.map(producto => new Producto(
      producto.id_producto,
      producto.marca_producto,
      producto.tipo_producto,
      producto.fragancia_producto,
      producto.uso_producto,
      producto.precio_producto
    ));
    const productosFiltrados = FiltrarProductosDestacados();
    crearArticle(productosFiltrados);
  })
  .catch((error) => {
    console.error(error);
  });

  itemsProductos.forEach(item => {
    item.addEventListener("click", function(event) {
      event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
      const tipo = this.textContent; // Obtener el texto del enlace
      productosFiltrados = FiltrarProductosPorTipo(tipo);
      crearBotonFiltro(tipo);
      crearArticle(productosFiltrados);
  
      // Cerrar el acordeón al hacer clic en un ítem
      const collapseProductos = document.getElementById("collapseProductos");
      const accordionButton = document.querySelector("#accordionProductos button");
  
      if (collapseProductos.classList.contains("show")) {
        collapseProductos.classList.remove("show");
        accordionButton.setAttribute("aria-expanded", "false");
      }
    });
  });
  itemsUsos.forEach(item => {
    item.addEventListener("click", function(event) {
      
      event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
      const uso = this.textContent; // Obtener el texto del enlace
      productosFiltrados = FiltrarProductosPorUso(uso);
      crearBotonFiltro(uso);
      crearArticle(productosFiltrados);

      // Cerrar el acordeón al hacer clic en un ítem
      const collapseProductos = document.getElementById("collapseUsos");
      const accordionButton = document.querySelector("#accordionUsos button");
  
      if (collapseProductos.classList.contains("show")) {
        collapseProductos.classList.remove("show");
        accordionButton.setAttribute("aria-expanded", "false");
      }
    });
  });



  itemsProductosDropdown.forEach(item => {
    item.addEventListener("click", function(event) {
      event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
      const tipo = this.textContent; // Obtener el texto del enlace
      productosFiltrados = FiltrarProductosPorTipo(tipo);
      // crearBotonFiltro(tipo);
      crearArticle(productosFiltrados);
    });
  });


  window.addEventListener("click", function (e) {
    if (e.target.matches("#boton-limpiar-filtros")) {
      productosFiltrados = FiltrarProductosDestacados();
    crearArticle(productosFiltrados);
    }
  });


  export function AgregarAlCarrito(e){
    const id= parseInt(e.target.getAttribute("data-id"));
    console.log(id);
    AgregarProductoACarrito(id,productos);
  }
  export function MostrarMensajeAgregadoAlCarrito(e){
    mensajeCarrito.classList.add("mostrar");
    mensajeCarrito.textContent = "¡Agregado al carrito!";
    setTimeout(function() {
      mensajeCarrito.classList.remove("mostrar");
    }, 2000);
  }



function FiltrarProductosPorTipo(tipo){
  let tipoProducto;
  switch (tipo) {
    case "Aromatizadores Mini":
      tipoProducto="aromatizador mini";
      break;
    case "Caritas":
      tipoProducto="caritas";
      break;
    case "Home Spray":
      tipoProducto="home spray"
      break;
    case "Latas Aromatizantes":
      tipoProducto="lata aromatizante"
      break;
    case "Route 66":
      tipoProducto="route 66"
      break;
    case "Tarjetas Aromaticas":
      tipoProducto="tarjetas aromaticas"
      break;
    case "Aromatizadores Textiles":
      tipoProducto="textil"
      break;
    case "Varillas Difusoras":
      tipoProducto="varilla difusora"
      break;
    case "Aerosol Ambiente/Automatico":
      tipoProducto="aerosol"
      break;
    default:
      console.log("Tipo de producto desconocido");
  }
  productosFiltrados = productos.filter(producto => producto.tipo_producto === tipoProducto);
  return productosFiltrados;
}
function FiltrarProductosPorUso(uso){
  let uso_producto;
  switch (uso) {
    case "Ambiente":
      uso_producto="ambiente";
      break;
    case "Ropa":
      uso_producto="ropa";
      break;
    case "Auto":
      uso_producto="auto"
      break;
    case "Personal":
      uso_producto="personal"
      break;
    default:
      console.log("Uso de producto desconocido");
  }
  productosFiltrados = productos.filter(producto => producto.uso_producto.includes(uso_producto));
  return productosFiltrados;
}

function FiltrarProductosDestacados(){
  const productosDestacados = [5, 46, 107, 141, 603, 604, 607];
  productosFiltrados = productos.filter(producto => productosDestacados.includes(producto.id_producto));
  return productosFiltrados;
}



  
