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

function renderizarEntradas(lista) {
    const contenedor = document.getElementById("contenedorEntradas");

    contenedor.innerHTML = "";

    if(lista.length === 0) {
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

        const form = document.createElement("form");
        form.action = "pago.html";
        form.method = "GET";

        const input = document.createElement("input");
        input.type = "hidden";
        input.name = "producto";
        input.value = producto.valor;

        const boton = document.createElement("button");
        boton.classList.add("botonSeleccionar");
        boton.type = "submit";
        boton.innerText = "Seleccionar entrada";

        form.appendChild(input);
        form.appendChild(boton);

        divEntrada.appendChild(img);
        divEntrada.appendChild(p);
        divEntrada.appendChild(form);

        contenedor.appendChild(divEntrada);
    })
}

const buscador = document.getElementById("buscador");
buscador.addEventListener("keyup" , () => {
    const texto = buscador.value.toLowerCase();

    const filtrador = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(texto)
    );

    renderizarEntradas(filtrador);
});

renderizarEntradas(productos);
