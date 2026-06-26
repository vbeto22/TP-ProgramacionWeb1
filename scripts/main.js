const productos = [
    {
        id: 1,
        nombre: "Entrada de lunes a viernes",
        precio: 1000,
        descripcion: "Entrada de lunes a viernes: $1000",
        imagen: "imagenes/ticket1.svg",
        valor: "entrada_semana"
    },
    {
        id: 2,
        nombre: "Entrada fin de semana",
        precio: 1500,
        descripcion: "Entrada de sábados, domingos y feriados: $1500",
        imagen: "imagenes/ticket2.svg",
        valor: "entrada_fin_semana"
    },
    {
        id: 3,
        nombre: "Entrada jubilados",
        precio: 500,
        descripcion: "Entrada para jubilados: $500",
        imagen: "imagenes/ticket3.svg",
        valor: "entrada_jubilados"
    },
    {
        id: 4,
        nombre: "Pase rápido",
        precio: 2500,
        descripcion: "Pase rápido: $2500",
        imagen: "imagenes/paseRapido.svg",
        valor: "pase_rapido"
    },
    {
        id: 5,
        nombre: "Estacionamiento",
        precio: 300,
        descripcion: "Ticket para estacionamiento: $300",
        imagen: "imagenes/estacionamiento.svg",
        valor: "estacionamiento"
    }
];

const usuarioLogueado = localStorage.getItem("usuarioLogueado");

let carrito = JSON.parse(localStorage.getItem("carritoUNLaMLand")) || [];

const carritoCompraElement = document.querySelector(".carritoCompra");
const contenedorCarritoItems = document.getElementById("contenedorCarritoItems");
const carritoTotal = document.getElementById("carritoTotal");
const botonPago = document.getElementById("botonPago");

if (!usuarioLogueado && carritoCompraElement) {
    carritoCompraElement.style.display = "none";
}

function renderizarEntradas(lista) {
    const contenedor = document.getElementById("contenedorEntradas");
    contenedor.innerHTML = "";

    if (lista.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.innerHTML = "No se encontraron elementos";
        contenedor.appendChild(mensaje);
        return;
    }

    lista.forEach(producto => {
        const divEntrada = document.createElement("div");
        divEntrada.classList.add("entrada");

        const img = document.createElement("img");
        img.src = producto.imagen;

        const p = document.createElement("p");
        p.classList.add("descripcion");
        p.innerText = producto.descripcion;

        const boton = document.createElement("button");
        boton.classList.add("botonSeleccionar");
        boton.type = "button";
        boton.innerText = "Seleccionar entrada";

        boton.addEventListener("click", () => {
            if (!usuarioLogueado) {
                alert("Debes iniciar sesión para poder comprar entradas.");
                window.location.href = "login.html"; 
                return;
            }
            agregarAlCarrito(producto.id);
        });

        divEntrada.appendChild(img);
        divEntrada.appendChild(p);
        divEntrada.appendChild(boton);

        contenedor.appendChild(divEntrada);
    });
}

function agregarAlCarrito(id) {
    const itemExistente = carrito.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        const productoBase = productos.find(p => p.id === id);
        carrito.push({
            ...productoBase,
            cantidad: 1
        });
    }
    actualizarLocalStorageYInterfaz();
}

function eliminarDelCarrito(id) {
    const itemExistente = carrito.find(item => item.id === id);

    if (itemExistente) {
        if (itemExistente.cantidad > 1) {
            itemExistente.cantidad -= 1;
        } else {
            carrito = carrito.filter(item => item.id !== id);
        }
    }
    actualizarLocalStorageYInterfaz();
}

function actualizarLocalStorageYInterfaz() {
    localStorage.setItem("carritoUNLaMLand", JSON.stringify(carrito));
    renderizarCarrito();
}

function renderizarCarrito() {
    if (!contenedorCarritoItems) return;

    contenedorCarritoItems.innerHTML = "";

    if (carrito.length === 0) {
        contenedorCarritoItems.innerHTML = "<p style='padding:10px; color:gray;'>Su carrito se encuentra vacio</p>";
        carritoTotal.innerText = "Total: $0";
        if (botonPago) botonPago.style.display = "none"; 
        return;
    }

    if (botonPago) botonPago.style.display = "block";
    let totalAcumulado = 0;

    carrito.forEach(item => {
        const subtotalItem = item.precio * item.cantidad;
        totalAcumulado += subtotalItem;

        const article = document.createElement("article");
        article.classList.add("items");
        article.style.display = "flex";
        article.style.justifyContent = "space-between";
        article.style.alignItems = "center";
        article.style.marginBottom = "10px";

        article.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}" style="width: 40px; height: 40px;">
            <div style="flex-grow: 1; margin-left: 10px;">
                <p style="margin: 0; font-weight: bold; font-size: 14px;">${item.nombre}</p>
                <p style="margin: 0; font-size: 12px; color: #555;">Cant: ${item.cantidad} - $${subtotalItem}</p>
            </div>
        `;

        const botonEliminar = document.createElement("button");
        botonEliminar.innerText = "❌";
        botonEliminar.style.background = "none";
        botonEliminar.style.border = "none";
        botonEliminar.style.cursor = "pointer";
        botonEliminar.title = "Eliminar unidad";
        botonEliminar.addEventListener("click", (e) => {
            e.stopPropagation(); 
            eliminarDelCarrito(item.id);
        });

        article.appendChild(botonEliminar);
        contenedorCarritoItems.appendChild(article);
    });

    carritoTotal.innerText = `Total: $${totalAcumulado}`;
}

if (botonPago) {
    botonPago.addEventListener("click", () => {
        if (carrito.length > 0) {
            window.location.href = "pago.html";
        }
    });
}

const buscador = document.getElementById("buscador");
if (buscador) {
    buscador.addEventListener("keyup", () => {
        const texto = buscador.value.toLowerCase();
        const filtrador = productos.filter(producto =>
            producto.nombre.toLowerCase().includes(texto)
        );
        renderizarEntradas(filtrador);
    });
}

renderizarEntradas(productos);
renderizarCarrito();