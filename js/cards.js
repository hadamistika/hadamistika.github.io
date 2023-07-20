import {AgregarAlCarrito,MostrarMensajeAgregadoAlCarrito} from "../js/script.js";
const $loader = document.getElementById("spinner");
const accordionButtons = document.querySelectorAll(".accordion-button"); 
const mensajeCarrito = document.getElementById("mensajeCarrito");




export const crearArticle = (data) => {
  $loader.classList.remove("oculto");
  accordionButtons.forEach(button => {
    button.disabled = true; 
  });

  const $seccion = document.getElementById("seccion-cards");
  while ($seccion.firstChild) {
    $seccion.firstChild.remove();
  }

  setTimeout(() => {
    $loader.classList.add("oculto");
    data.forEach((elementoFila) => {
      const article = document.createElement("article");
      article.classList.add("card", "card_article");
      article.style.width = "10em";

      const cardImg = document.createElement("img");
      cardImg.src = "./images/textiles_prod.jpg";
      cardImg.src = AsignarFoto(elementoFila.tipo_producto);
      cardImg.classList.add("card-img-top");
      cardImg.alt = "prod";

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const cardTitle = document.createElement("p");
      cardTitle.classList.add("card-title", "text-capitalize");
      cardTitle.textContent = elementoFila.tipo_producto;

      const cardPrice = document.createElement("h5");
      cardPrice.classList.add(
        "card-title",
        "fw-bold",
        "text-danger",
        "text-capitalize"
      );
      cardPrice.textContent = `$${elementoFila.precio_producto}`;

      const cardText = document.createElement("h5");
      cardText.classList.add("card-text", "text-capitalize");
      cardText.textContent = elementoFila.fragancia_producto;

      const cardButton = document.createElement("a");
      cardButton.href = "#";
      cardButton.classList.add("btn", "btn-secondary", "btn-sm");
      cardButton.textContent = "Agregar Al Carrito";
      cardButton.addEventListener("click",function(e){
        e.preventDefault();
        AgregarAlCarrito(e);
        MostrarMensajeAgregadoAlCarrito();

      });
      cardButton.dataset.id = elementoFila.id_producto;


      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardPrice);
      cardBody.appendChild(cardText);
      cardBody.appendChild(cardButton);

      article.appendChild(cardImg);
      article.appendChild(cardBody);
      $seccion.appendChild(article);
    });
    accordionButtons.forEach(button => {
    button.disabled = false; 
  });

  }, 2000);
};
export const crearBotonFiltro = (filtro) => {
  const $titulo = document.getElementById("titulo_productos");
  $titulo.textContent = filtro;
};
 

function AsignarFoto(tipo){
  let src;
  switch (tipo) {
    case "aromatizador mini":
      src="./images/textiles_prod.jpg";
      break;
    case "caritas":
      src="./images/caritas_prod.jpg";
      break;
    case "home spray":
      src="./images/home-spray_prod.jpg"
      break;
    case "lata aromatizante":
      src="lata aromatizante"
      break;
    case "route 66":
      src="./images/route66_prod.jpg"
      break;
    case "tarjetas aromaticas":
      src="tarjetas aromaticas"
      break;
    case "textil":
      src="./images/textiles_prod.jpg"
      break;
    case "varilla difusora":
      src="./images/varillas_prod.jpg"
      break;
    case "aerosol":
      src="./images/aerosol_prod.jpg"
      break;
  }
  return src;
}