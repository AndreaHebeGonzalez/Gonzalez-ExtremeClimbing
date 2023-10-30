//* --------------- Variables a utilizar ---------------

const caractDesplegables = document.querySelectorAll('.caract-desplegable');

console.log(caractDesplegables);
const contListaCaracteristicas = document.querySelectorAll('.cont-list-caracteristicas');
console.log(contListaCaracteristicas)
const listaCarateristicas = document.querySelectorAll('.lista-caracteristicas');
console.log(listaCarateristicas)
const flechaDesplegar = document.querySelectorAll('.caract-desplegable img');
console.log(flechaDesplegar)

// * --------------- Escuchadores de eventos ---------------

//Aparecen y desaparecen la lista de caracteristicas de la pagína detalles de producto
console.log(caractDesplegables);
caractDesplegables[0].addEventListener('click', () => {
    
    contListaCaracteristicas[0].classList.toggle('mostar-caracteristicas');
    listaCarateristicas[0].classList.toggle('padding-lista-caract');
    flechaDesplegar[0].classList.toggle('rotar-icono-desplegar');
})

caractDesplegables[1].addEventListener('click', () => {
    contListaCaracteristicas[1].classList.toggle('mostar-caracteristicas');
    listaCarateristicas[1].classList.toggle('padding-lista-caract');
    flechaDesplegar[1].classList.toggle('rotar-icono-desplegar');
})