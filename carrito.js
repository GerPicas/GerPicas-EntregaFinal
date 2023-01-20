class Comida {
    constructor(id, nombre, precio, img) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.img = img;
        this.cantidad = 1; 
    }
}

const Margarita = new Comida(1, "Margarita", 1000, "img/Margarita.jpeg");
const Napolitana = new Comida(2, "Napolitana", 1200, "img/Napolitana.jpg");
const Primavera = new Comida(3, "Primavera", 1200, "img/primavera.jpg");
const Calabresa = new Comida(4, "Calabresa", 1200, "img/calabresa.jpg");
const Cheesburguer = new Comida(5, "Cheesburguer", 1000, "img/Cheesburguer.jpg");
const HamburguesaBacon = new Comida(6, "Hamburguesa con Bacon", 1200, "img/HamburguesaBacon.jpg");
const Argenta = new Comida (7, "Argenta", 1200, "img/argenta.jpg");
const Vegana = new Comida(8, "Vegana", 1000, "img/vegana.jpg");

//Array con las comidas
const comidas = [Margarita, Napolitana, Primavera, Calabresa, Cheesburguer, HamburguesaBacon, Argenta, Vegana];

//Array del carrito
let carrito = [];

//se carga algo desde el storage, se carga al carrito 
if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

//Se modifica el DOM de los productos
const contenedorComidas = document.getElementById("contenedorComidas");

//Creamos una funcion para mostrar las comidas 
const mostrarComidas = () => {
    comidas.forEach( comidas => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img src="${comidas.img}" class="card-img-top imgProductos" alt="${comidas.nombre}">
                <div class= "card-body">
                    <h5>${comidas.nombre}</h5>
                    <p> ${comidas.precio} </p>
                    <button class="btn btn-danger" id="boton${comidas.id}" > Agregar al Carrito </button>
                </div>
            </div>
                `
        contenedorComidas.appendChild(card);

        //Agregar productos al carrito:
        const boton = document.getElementById(`boton${comidas.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(comidas.id);
        })
    })
}

mostrarComidas();

//funcion de agregar al carrito 

const agregarAlCarrito = (id) => {
    const comidaEnCarrito = carrito.find(comidas => comidas.id === id);
    if(comidaEnCarrito) {
        comidaEnCarrito.cantidad++;
    } else {
        const Comida = comidas.find(comidas => comidas.id === id);
        carrito.push(Comida);
    }
    //Trabajamos con el localStorage: 
    localStorage.setItem("carrito", JSON.stringify(carrito));
    calcularTotal();
}

//Mostrar carrito de compras 
const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

//funcion para mostrar el carrito 
const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";

    carrito.forEach(comidas => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = `
            <div class="card">
                <img src="${comidas.img}" class="card-img-top imgProductos" alt="${comidas.nombre}">
                <div class= "card-body">
                    <h5>${comidas.nombre}</h5>
                    <p> ${comidas.precio} </p>
                    <p> ${comidas.cantidad} </p>
                    <button class="btn btn-danger" id="eliminar${comidas.id}" > Eliminar Producto </button>
                </div>
            </div>
                    `
        contenedorCarrito.appendChild(card);

        //eliminar productos del carrito:
        const boton = document.getElementById(`eliminar${comidas.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(comidas.id);
        })
    })
    calcularTotal();
}

//Función que elimina el producto del carrito: 

const eliminarDelCarrito = (id) => {
    const Comida = carrito.find(comidas => comidas.id === id);
    const indice = carrito.indexOf(Comida);
    carrito.splice(indice, 1);
    mostrarCarrito();

    //Trabajamos con el localStorage: 
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Funcion que vacia el producto del carrito:

const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    eliminarTodoElCarrito();
})

//Funcion que elimina todo del carrito:

const eliminarTodoElCarrito = () => {
    carrito = [];
    mostrarCarrito();

    //localStorage
    localStorage.clear();
}

//Mostramos mensaje con total de compra 

const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0;
    carrito.forEach(comidas => {
        totalCompra += comidas.precio * comidas.cantidad;
    })
    total.innerHTML = `Total: $${totalCompra}`;
}