async function cargarDatos() {
  const categoria = document.getElementById('categoria').value;
  const resultados = document.getElementById('resultados');
  resultados.innerHTML = "<p>Cargando datos...</p>";

  try {
    const responseXML = await fetch("productos.xml");
    const textXML = await responseXML.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(textXML, "application/xml");
    const productosXML = Array.from(xml.getElementsByTagName("producto"))
      .filter(p => p.getAttribute("categoria") === categoria);

    const productosJSON = (await fetch("productos.json")).json();
    const productosJ = (await productosJSON).filter(p => p.categoria === categoria);

    const productosHTML = [...productosXML.map(p => {
      return `<li>${p.getElementsByTagName("nombre")[0].textContent} - ${p.getElementsByTagName("precio")[0].textContent} €</li>`;
    }), ...productosJ.map(p => {
      return `<li>${p.nombre} - ${p.precio.toFixed(2)} €</li>`;
    })].join("");

    resultados.innerHTML = `<ul>${productosHTML}</ul>`;
  } catch (error) {
    resultados.innerHTML = "<p>Error al cargar los datos.</p>";
    console.error(error);
  }
}