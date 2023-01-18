const resultado = document.getElementById("resultado");

const formulario = document.getElementById("formulario");

const filtrar = () => {
    
    resultado.innerHTML = '';

    const texto = formulario.value.toLowerCase();
    for (let comida of comidas){
        let nombre = comida.nombre.toLowerCase();

        if (nombre.indexOf(texto) !== -1) {
            resultado.innerHTML += `
            <div class="card row" style="width: 18rem;" id="resultado">
                <img src=${comida.imagen} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Nombre: ${comida.nombre}</h5>
                    <h5 class="card-title">Estilo: ${comida.estilo}</h5>
                    <p class="card-text">Valor: ${comida.precio}</p>
                    <a class="btn btn-danger" href="carrito.html" >Agregar al carrito</a> 
                </div>
            </div>
            `
        }
    }
    if (resultado.innerHTML === ''){
        resultado.innerHTML = `<li>Producto no encontrado</li>`
    }
}

formulario.addEventListener('keyup', filtrar)
filtrar();