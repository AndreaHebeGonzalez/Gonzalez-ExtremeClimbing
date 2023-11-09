/*Script para que el contenedor .contenedor-general-carrusel se adapate al alto del contenedor de productos, permite que las flechas se centren en el eje vertical*/

document.addEventListener("DOMContentLoaded", function() {
    // Obtengo la altura del contenedor de los articulos, que incluye un padding por sobre la altura de las cards
    var alturaContenedorHijo = document.querySelector('.contenedor-producto').offsetHeight;
    
    // Establezco la altura del contenedor general del carrusel
    document.querySelector('.contenedor-general-carrusel').style.height = alturaContenedorHijo + "px";
    });


/*Traigo los elementos del DOM que necesito*/

const contGeneralCarrusel = document.querySelector('.contenedor-general-carrusel');
const contProductosDestacados = document.querySelector('#contenedor-productos-destacados');
const diapositivas = document.querySelectorAll('.contenedor-producto');
const flechaIzquierda = document.querySelector('.flecha-izquierda');
const flechaDerecha = document.querySelector('.flecha-derecha');

/*Variables a utilizar*/

let desplazamiento = 0; //Esta variable permite hacer un seguimiento de la cantidad de desplazamiento del carrusel id= contenedor-productos-destacados
//Las siguientes variables se declaran para realizar seguimiento de diapos o conjunto de diapos activadas en cada vuelta de desplazamiento
let incrementoDeDiapo = 0;
let decrementoDeDiapo = diapositivas.length - 1;


/* Las siguientes variables (tentativas) se usarán en la funcionalidad de arrastre del carrusel, se usarán para hacer un seguimiento de las coordendas dentro de un evento de movimiento del mouse o de desplazamiento en pantallas tactiles */

//Indica la posicion final de arrastre
let posicionDeArrastre = 0;

//Valor anterior de la posicion 
let prev = 0;

//Calculo de la posicion de arrastre
let calc = 0;

//Coordenada del eje x del cliente
let x;

//Cuantas diapos mover
let diaposAMover;

/*Agrego los eventos a los iconos de flecha*/

/*Boton desplazamiento derecha -------------------->*/

flechaDerecha.addEventListener('click', siguientesDiapositivas);

function siguientesDiapositivas() {
    //Calcular el numero de diapositivas a mover según el ancho del contenedor del carrusel y el ancho de una sola diapositiva

    // diaposAMover representa cuantas diapos pueden mostrarse simultáneamente en el contenedor que presenta un width:100vw; sin que quede espacio sin utilizar. Este valor será el numero de deslizamientos completos que caben en el contenedor

    diaposAMover = Math.round(contGeneralCarrusel.offsetWidth / diapositivas[0].offsetWidth);
    console.log(diaposAMover);
    
    
    /*Una vez que se hizo clic en el botón de flecha derecha lo desactivo para evitar que se rompa el carrusel si se hace clic mas de una vez*/ 
    flechaDerecha.disabled = true;
    
    /* Ahora se calcula la distancia para mover el contenedor del carrusel según el ancho de una sola diapositiva y el número de diapositivas a mover. La idea es que con esta instruccion se determine cuanto espacio horizontal en px debe desplazarse el contenedor contProductosDestacados al avanzar o retroceder entre diapositivas para mostrar el siguiente grupo de diapositivas en el carrusel .contGeneralCarrusel  */
    desplazamiento = diapositivas[0].offsetWidth * (diaposAMover);

    /*Cuando un usuario hace clic en el botón de avanzar o retroceder, el carrusel necesita saber cuanto debe desplazarse horizontalmente para mostrar la proxima serie de diapositivas. Con esta distancia el carrusel ajustará la posicion del contenido para que el usuario vea un grupo de nuevo de diapositivas */

    /*Ahora se agrega una transicion al contenedor que se desplazará*/

    contProductosDestacados.style.transition = 'left ease-in-out 500ms';

    /*Creo el movimiento o desplazamiento del carrusel*/
    contProductosDestacados.style.left = -desplazamiento + 'px';

    /*Creo un delay de 500ms para neutralizar la transicion y reorganizar las diapositivas*/

    setTimeout (() => {
        //Neutralizo la transición, esto es para que los siguientes movimientos se realicen sin animacion para que no sean perseptibles
        contProductosDestacados.style.transition ='none';

        /*Ahora creo un bucle que se ejecuta a lo largo del valor de diaposAMover que contiene la cantidad de diapositivas visibles en pantalla*/

        for(let i=0; i < diaposAMover; i++) {
            //Primero compruebo si el indice de diapositivas actual excede el numero total de diapositivas

            if (incrementoDeDiapo > diapositivas.length - 1) {
                //Si ingresa a este condicional se debe crear un salto para que el valor incrementoDeDiapo se mantenga dentro del valor diapositivas.length - 1, esto se necesita porque este valor va recorriendo el array de diapositivas, es como un index que identifica la diapositiva activa para el desplazamiento con un sentido incremental (cuando se presiona el botón derecho). La diapositiva que identifique se ubicará en el extremo izquierdo del contenedor contProductosDestacados

                /* incrementoDeDiapo = 0; */

                incrementoDeDiapo = incrementoDeDiapo - diapositivas.length; 

                //Reestablezco el orden de las diapositivas a su orden inicial:

                diapositivas.forEach (diapo => {
                    diapo.style.order = "initial";
                });
            }

            //Si no entra en el condicional anterior se establece el orden de la diapo actual en la ultima posicion, con esto se modifica el orden de visualización, de tal forma que las diapositivas que quedaron fuera del contenedor general pasan al lado derecho de las diapositivas visibles actualmente.

            diapositivas[incrementoDeDiapo].style.order = diapositivas.length - 1; 

            //Incremeto el indice de diapositivas para la siguiente iteracion 

            incrementoDeDiapo++;

        }

        //Ahora vuelvo a desplazar el contenedor contProductosDestacados hacia la derecha:
        contProductosDestacados.style.left = 0;

        //Actualizo el indice para identificar la diapo en sentido decreciente, indicará la diapo que se ubicará en el extremo derecho del contenedor que se desplaza, es decir contProductosDestacados.
        decrementoDeDiapo = incrementoDeDiapo - 1;

        //activo boton de la derecha
        flechaDerecha.disabled = false;
    }, 500);
};

/*Boton desplazamiento izquierda -------------------->*/

flechaIzquierda.addEventListener('click', anterioresDiapositivas);

function anterioresDiapositivas() {
    diaposAMover = Math.round(contGeneralCarrusel.offsetWidth / diapositivas[0].offsetWidth);

    flechaIzquierda.disabled = true;
    
    desplazamiento = diapositivas[0].offsetWidth * (diaposAMover);

    contProductosDestacados.style.transition = 'none';

    for (let i=0; i < diaposAMover; i++) {
        //Verifico que el identificador de la diapo activa en el sentido decreciente no sea menor que 0, debe permanecer en el rango diapositivas.lenght - 1
        if(decrementoDeDiapo < 0) {
            diapositivas.forEach(diapo => {
                diapo.style.order = 'initial';
            });
            decrementoDeDiapo = decrementoDeDiapo + diapositivas.length;
        };
        diapositivas[decrementoDeDiapo].style.order = -1;
        decrementoDeDiapo--;
    };
    incrementoDeDiapo = decrementoDeDiapo +1;
    flechaIzquierda.disabled = false;
    contProductosDestacados.style.left = -desplazamiento + 'px';

    setTimeout(()=>{
        contProductosDestacados.style.transition = 'left ease-in-out 500ms';
        contProductosDestacados.style.left = 0;
    }, 10);
};

/*Se crean las funciones y eventos para que el carrusel se pueda arrastrar */

//Funcion de arrastre, le paso como argumento el evento y en funcion del tipo de evento se determina la manera en la que se calcula el valor de calc. 

//La variable "calc" va a representar la disntancia de arrastre, la variable prev indica el valor anterior de arrastre, con estos dos calculo la posicion de arrastre o nueva posicion, este valor se requiere para que al final se pueda calcular comparando con el valor de prev la direccion de arrastre y luego de eso ejecutar la funcion de desplazamiento de carrusel correspondiente (siguientesDiapositivas() o anterioresDiapositivas())
function arrastre(evento) {
    if (evento.type ==='touchmove') {
        calc = (evento.touch[0].clientX - x) / 1;
    } else {
        calc = (evento.clientX - x) / 1;
    };
    posicionDeArrastre = calc + prev;
};

//En la funcion anterior si el evento es de tipo "touchmove" -se trata de un evento tactil- se resta la posicion inicial "x" de la posicion actual del touch y se divide por 1; y si el evento es otro distinto al tactil se resta la pisición inicial "x" de la posición actual del cursor del mouse y se divide por 1 (puede no dividirse por 1)

/*Ahora se configura el evento "mousedown", este evento se dispara cuando se presiona el botón del mouse mientras el cursor está sobre el elemento, dentro de este escuchador de evento se crea el evento "mousemove", este se dispara cuando el usuario mueve el cursor del mouse sobre un elemento, combinados ambos generan un evento de arrastre*/

contProductosDestacados.addEventListener('mousedown', (evento) => {
    //Almaceno la coordenada x inicial del puntero del mouse:
    x = evento.clientX;

    //Agrego el el escuchador de evento para "mousemove", y le paso como parametro la referencia a la función arrastre:
    contProductosDestacados.addEventListener('mousemove', arrastre);

    //Actualiza la posición anterior "prev" sumándole la distancia calculada, para el siguiente movimiento
    prev += calc;
});

/*Agrego escuchador de evento de arrastre para pantallas tactiles*/

contProductosDestacados.addEventListener('touchstart',(evento) => {
    //"touchstart" registra la posición inicial del touch
    x = evento.touches[0].clientX;

    //Agrego el evento de arrastre mientars se realiza el touch
    contProductosDestacados.addEventListener('touchmove', arrastre);

    //Actualizo la posición anterior para el siguiente deslizamiento
    prev =+ calc;
});

/*Los siguientes eventos y funciones controlan el evento cuando el usuario  se libera del arrastre*/

contProductosDestacados.addEventListener('mouseup', finalizaArrastre);
contProductosDestacados.addEventListener('touchend', finalozaArrastre);

function finalizaArrastre() {
//Se comparan las coordenadas del eje x del puntero del mouse cuando comenzó el arrastre con las coordenadas del eje x del puntero del mouse cuando finalizó el arrastre y en función de si la nueva coordenada es mayor o menor que la coordenada inicial se define la direccion de desplazamiento del carrusel
    if (posicionDeArrastre < prev) {
        siguientesDiapositivas();
    }else if (posicionDeArrastre > prev) {
        anterioresDiapositivas();
    };
    
    //Se deben eliminar los escuchadores de evento de arrastre para que la funcion no se siga ejecutando una vez finalizado el mismo

    contProductosDestacados.removeEventListener('mousemove');
    contProductosDestacados.removeEventListener('touchmove');
};

