
// export const crearArticle = (data) => {
//     const $seccion = document.getElementById("seccion-cards");
//     data.forEach((elementoFila) => {
//         const article = document.createElement("article");
//         article.classList.add("card", "bg-primary", "text-dark");
//         article.style.width = "18rem";

//         const cardBody = document.createElement("div");
//         cardBody.classList.add("card-body");

//         for (const key in elementoFila) {
//             if (key == "id") continue;

//             const p = document.createElement("p");
//             p.textContent = key + ": " + elementoFila[key];
//             cardBody.appendChild(p);
//         }

//         article.appendChild(cardBody);
//         $seccion.appendChild(article);
//     });
// };

export const crearArticle = (data) => {
  const $seccion = document.getElementById("seccion-cards");

  data.forEach((elementoFila) => {
    const article = document.createElement("article");
    article.classList.add("card","card_article");
    article.style.width = "10em";

    const cardImg = document.createElement("img");
    cardImg.src = "//via.placeholder.com/500x400/?text=textil";
    cardImg.classList.add("card-img-top");
    cardImg.alt = "...";

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title","text-capitalize");
    cardTitle.textContent = elementoFila.tipo_producto;

    const cardPrice = document.createElement("h5");
    cardPrice.classList.add("card-title", "fw-bold", "text-danger","text-capitalize");
    cardPrice.textContent = `$${elementoFila.precio_producto}`;

    const cardText = document.createElement("p");
    cardText.classList.add("card-text","text-capitalize");
    cardText.textContent = elementoFila.fragancia_producto;

    const cardButton = document.createElement("a");
    cardButton.href = "#";
    cardButton.classList.add("btn", "btn-primary");
    cardButton.textContent = "Agregar Al Carrito";

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardButton);

    article.appendChild(cardImg);
    article.appendChild(cardBody);

    $seccion.appendChild(article);
  });
};

