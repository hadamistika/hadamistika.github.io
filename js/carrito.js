let carrito = [];
let productos = [];
const divisa = "$";
const DOMitems = document.querySelector("#items");
const DOMcarrito = document.querySelector("#carrito");
const DOMtotal = document.querySelector("#total");
const DOMbotonVaciar = document.querySelector("#boton-vaciar");

export function AgregarProductoACarrito(id_producto,productosScript) {
  carrito.push(id_producto);
  productos=productosScript;
  renderizarCarrito();
}


function renderizarCarrito() {
  // Vaciamos todo el html
  DOMcarrito.textContent = "";
  // Quitamos los duplicados
  const carritoSinDuplicados = [...new Set(carrito)];
  // Generamos los Nodos a partir de carrito
  carritoSinDuplicados.forEach((id_producto) => {
    // Obtenemos el item que necesitamos de la variable base de datos
    const miItem = productos.filter((itemBaseDatos) => {
      // ¿Coincide las id? Solo puede existir un caso
        if(itemBaseDatos.id_producto == parseInt(id_producto)){
            return itemBaseDatos;
        }
    });
    // Cuenta el número de veces que se repite el producto
    const numeroUnidadesItem = carrito.reduce((total, itemId) => {
      // ¿Coincide las id? Incremento el contador, en caso contrario no mantengo
      return itemId === id_producto ? (total += 1) : total;
    }, 0);
    // Creamos el nodo del item del carrito
    const miNodo = document.createElement("li");
    miNodo.classList.add("list-group-item", "text-right", "mx-2");
    miNodo.textContent = `${numeroUnidadesItem} x ${miItem[0].tipo_producto} - ${miItem[0].fragancia_producto} -${miItem[0].precio_producto}${divisa}`;
    // Boton de borrar
    const miBoton = document.createElement("button");
    miBoton.classList.add("btn", "btn-danger", "mx-5");
    miBoton.textContent = "X";
    miBoton.style.marginLeft = "1rem";
    miBoton.dataset.item = id_producto;
    miBoton.addEventListener("click", borrarItemCarrito);
    // Mezclamos nodos
    miNodo.appendChild(miBoton);
    DOMcarrito.appendChild(miNodo);
  });
  // Renderizamos el precio total en el HTML
  DOMtotal.textContent = calcularTotal();
}

/**
 * Evento para borrar un elemento del carrito
 */
function borrarItemCarrito(evento) {
  // Obtenemos el producto ID que hay en el boton pulsado
  const id = evento.target.dataset.item;
  carrito = carrito.filter((carritoId) => {
    return carritoId !== parseInt(id);
  });
  renderizarCarrito();
}

/**
 * Calcula el precio total teniendo en cuenta los productos repetidos
 */
function calcularTotal() {
  // Recorremos el array del carrito
  return carrito
    .reduce((total, item) => {
      // De cada elemento obtenemos su precio
      const miItem = productos.filter((itemBaseDatos) => {
        return itemBaseDatos.id_producto === parseInt(item);
      });
      // Los sumamos al total
      return total + miItem[0].precio_producto;
    }, 0)
    .toFixed(2);
}

function vaciarCarrito() {
  carrito = [];
  renderizarCarrito();
}

// Obtén el número de teléfono al que deseas enviar los mensajes
const phoneNumber = "+5491132283002";

// Función para generar el mensaje de pedido
const generarMensajePedido = () => {
  let mensaje = "Hola Hada Mistika!\n Queria hacer un pedido de los siguientes productos:\n";
    carrito.forEach((idProducto) => {
      const productoEncontrado = productos.find((producto) => producto.id_producto === idProducto);
      if (productoEncontrado) {
        mensaje += `- ${productoEncontrado.tipo_producto} (${productoEncontrado.fragancia_producto})\n`;
      }
  });
  
  return mensaje;
};


// Agrega el evento click al botón "comprar"
btnComprar.addEventListener("click", () => {

  const mensajePedido = generarMensajePedido();
  const mensajeCodificado = encodeURIComponent(mensajePedido);
  const enlaceWhatsapp = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${mensajeCodificado}`;
  window.open(enlaceWhatsapp);
});

// Eventos
DOMbotonVaciar.addEventListener("click", vaciarCarrito);