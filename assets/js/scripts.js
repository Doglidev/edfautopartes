const container = document.getElementById("productos-container");
const accessToken = "TU_ACCESS_TOKEN"; // Reemplaza con tu token válido

fetch("https://api.mercadolibre.com/sites/MLA/search?seller_id=2040641778", {
  headers: {
    "Authorization": `Bearer ${accessToken}`
  }
})
  .then((response) => {
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    if (data && data.results && Array.isArray(data.results)) {
      const productos = data.results.slice(0, 8); // Muestra los primeros 8 productos
      productos.forEach((producto) => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <img src="${producto.thumbnail}" alt="${producto.title}">
          <h3>${producto.title}</h3>
          <p>$${producto.price}</p>
          <a href="${producto.permalink}" target="_blank">Ver en Mercado Libre</a>
        `;
        container.appendChild(card);
      });
    } else {
      console.error("Error: No se encontraron productos o la estructura de la respuesta es incorrecta", data);
    }
  })
  .catch((error) => console.error("Error en la solicitud:", error));
