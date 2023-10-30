/*Script para botón crear cuenta de pagina login agrego link para redireccionar // ! no me funciona con <a> si agrego img al boton*/

const btnCrearCuenta = document.querySelector('#crearCuenta');
console.log(btnCrearCuenta);

btnCrearCuenta.addEventListener('click', function() {
    window.location.href = 'registro.html';
});

/*Scrip para cambiar de imagen en product details */