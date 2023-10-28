const iconoHamburguesa = document.querySelector('#icono-hamburguesa');
const cerrar = document.querySelector('#cierre'); // icono cerrar de munú mobile
const contenedorLupa = document.querySelectorAll('.lupa'); // array de div con clase lupa (2)
const buscar = document.querySelectorAll('.buscar'); // array de input con clase buscar (2)
const menuPrincipal = document.querySelector('.contenedor-menu-principal'); 

//Submenú productos del menú mobile

const subMenuProductos = document.querySelector('#item-productos a');

const contenedorMenuCategorias = document.querySelector('.nav-contenedor-categorias');


//Submenú cliente del menú desktop

const subMenuCliente = document.querySelector('#cliente');

const contenedorMenuCliente = document.querySelector('.nav-contenedor-cliente');

//Ancho de la pantalla del dispositivo

const anchoDePantalla = window.innerWidth; //! No utilizado todavía

//Traigo item caracteristicas desplegables de la página detalles de productos

const caractDesplegables = document.querySelectorAll('.caract-desplegable');
console.log(caractDesplegables);
const contListaCaracteristicas = document.querySelectorAll('.cont-list-caracteristicas');
console.log(contListaCaracteristicas)
const listaCarateristicas = document.querySelectorAll('.lista-caracteristicas');
console.log(listaCarateristicas)
const flechaDesplegar = document.querySelectorAll('.caract-desplegable img');
console.log(flechaDesplegar)
//Escuchador de eventos ---------------------->

/* La siguiente funcion aparece el menu mobile y desaparece el icono de hamburguesa */

iconoHamburguesa.addEventListener('click', () => {
    menuPrincipal.classList.add("visible");
    iconoHamburguesa.style.opacity= '0';
}); 

/* La siguiente funcion desaparece el menu mobile y aparece el icono de hamburguesa */
cerrar.addEventListener('click', () => {
    menuPrincipal.classList.remove("visible");
    iconoHamburguesa.style.opacity= '1';
});

/* Efectos sobre buscador de productos */

//Buscador de productos menu mobile:
contenedorLupa[0].addEventListener('click', () => {
    buscar[0].classList.toggle('input-extendido');
} )

//Buscador de productos menu desktop:
contenedorLupa[1].addEventListener('click', () => {
    buscar[1].classList.toggle('aparece');
    menuPrincipal.classList.toggle('menu-oculto');


    setTimeout(() => { // Desaparezco el menú principal de la version desktop con delay para que funcione la animación del buscador de productos
        buscar[1].classList.toggle('input-extendido-dos');
    }, 1);
})

//Aparece el submenú desplegable de productos en menú mobile

subMenuProductos.addEventListener('click', () => {
    contenedorMenuCategorias.classList.toggle('mostrar-categorias');
})

//Aparece el submenú desplegable de cliente en menú desktop

subMenuCliente.addEventListener('mouseover', () => {
    contenedorMenuCliente.classList.add('mostrar-submenu-cliente');
})

subMenuCliente.addEventListener('mouseout', () => {
    contenedorMenuCliente.classList.remove('mostrar-submenu-cliente');
})


subMenuProductos.addEventListener('click', () => {
    contenedorMenuCategorias.classList.toggle('mostrar-categorias');
})

//Aparecen y desaparecen la lista de caracteristicas de la pagína detalles de producto

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


/*Script para botón crear cuenta de pagina login agrego link para redireccionar // ! no me funciona con <a> si agrego img al boton*/

const btnCrearCuenta = document.querySelector('#crearCuenta');

btnCrearCuenta.addEventListener('click', function() {
    window.location.href = 'registro.html';
});

/*Scrip para cambiar de imagen en product details */

