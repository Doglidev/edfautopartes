function buscarProductos() {
  const termino = document.getElementById('busqueda').value;
  const url = `https://api.mercadolibre.com/sites/MLA/search?q=${encodeURIComponent(termino)}`;

  fetch(url)
  .then(res => res.json())
  .then(data => mostrarResultados(data.results))
  .catch(err => console.error('Error al buscar:', err));
}

function mostrarResultados(productos) {
  const contenedor = document.getElementById('resultados');
  contenedor.innerHTML = '';

  productos.forEach(producto => {
    const div = document.createElement('div');
    div.classList.add('producto');
    div.innerHTML = `
      <img src="${producto.thumbnail}" alt="${producto.title}">
      <h3>${producto.title}</h3>
      <p>Precio: $${producto.price}</p>
      <a href="${producto.permalink}" target="_blank">Ver en Mercado Libre</a>
    `;
    contenedor.appendChild(div);

  });
}

