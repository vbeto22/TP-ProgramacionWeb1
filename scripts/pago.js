document.addEventListener("DOMContentLoaded", () => {
    let carrito = JSON.parse(localStorage.getItem("carritoUNLaMLand")) || [];

    const contenedorProductos = document.getElementById("productosCheckout");
    const contenedorMiniCarrito = document.getElementById("miniCarritoHeader");
    const totalPagoElement = document.getElementById("totalPago");
    const formularioPago = document.querySelector(".metodosPago");

    function renderizarPaginaPago() {
        let totalAcumulado = 0;

        if (contenedorProductos) {
            contenedorProductos.innerHTML = '<h3 class="subtitulo">Productos</h3>';
            
            if (carrito.length === 0) {
                contenedorProductos.innerHTML += '<p style="padding: 15px; color: gray;">Su carrito está vacío.</p>';
            } else {
                carrito.forEach(item => {
                    totalAcumulado += item.precio * item.cantidad;
                    const article = document.createElement("article");
                    article.classList.add("item-lista");
                    article.innerHTML = `
                        <img src="${item.imagen}" alt="${item.nombre}">
                        <p class="valor">${item.nombre}: $${item.precio}</p>
                        <p class="cantidad">Cantidad: ${item.cantidad}</p>
                    `;
                    contenedorProductos.appendChild(article);
                });
            }
        }

        if (totalPagoElement) {
            totalPagoElement.innerText = `Total a pagar: $${totalAcumulado}`;
        }

        if (contenedorMiniCarrito) {
            contenedorMiniCarrito.innerHTML = `
                <article class="tituloCompra">
                    <h2>Resumen de compra</h2>
                </article>
            `;

            if (carrito.length === 0) {
                contenedorMiniCarrito.innerHTML += '<p style="padding: 10px; color: gray;">Su carrito está vacío</p>';
            } else {
                carrito.forEach(item => {
                    const article = document.createElement("article");
                    article.classList.add("items");
                    article.innerHTML = `
                        <img src="${item.imagen}" alt="${item.nombre}">
                        <p>Cantidad: ${item.cantidad}</p>
                    `;
                    contenedorMiniCarrito.appendChild(article);
                });

                const pTotal = document.createElement("p");
                pTotal.innerText = `Total: $${totalAcumulado}`;
                pTotal.style.fontWeight = "bold";
                contenedorMiniCarrito.appendChild(pTotal);

                const formMini = document.createElement("form");
                formMini.action = "pago.html";
                formMini.innerHTML = '<button class="botonPago" type="submit">Pagar</button>';
                contenedorMiniCarrito.appendChild(formMini);
            }
        }
    }

    if (formularioPago) {
        formularioPago.addEventListener("submit", (evento) => {
            evento.preventDefault();

            if (carrito.length === 0) {
                alert("No tienes elementos en el carrito para abonar.");
                return;
            }

            alert("¡Pago realizado con éxito! Muchas gracias por tu compra en UNLaM-Land.");
            localStorage.removeItem("carritoUNLaMLand"); 
            window.location.href = "main.html"; 
        });
    }

    renderizarPaginaPago();
});