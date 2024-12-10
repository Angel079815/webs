const carrito = document.getElementById('carrito');
const elementos1 = document.getElementById('lista-1');
const lista = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const modal = document.getElementById("ofertasModal");
const btn = document.getElementById("informacion");
const span = document.getElementsByClassName("close")[0];
const buttons = document.querySelectorAll('.info-button');
const menuIcon = document.querySelector('.menu-icono');
const navbar = document.querySelector('.navbar');

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
});
// Abrir modal al hacer clic en el botón
btn.onclick = function () {
    modal.style.display = "block";

    // Añadir animación de entrada
    modal.querySelector('.modal-content').style.animation = "fadeIn 0.3s";

    // Opacar otros botones
    buttons.forEach(button => {
        button.style.opacity = "0";
    });
}

// Cerrar modal al hacer clic en la X
span.onclick = function () {
    modal.style.display = "none";

    // Restaurar la opacidad de los botones
    buttons.forEach(button => {
        button.style.opacity = "1";
    });
}

// Cerrar modal al hacer clic fuera de él
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";

        // Restaurar la opacidad de los botones
        buttons.forEach(button => {
            button.style.opacity = "1";
        });
    }
}

// Añadir efecto hover al botón
btn.addEventListener('mouseover', function () {
    this.style.transform = 'scale(1.05)';
});

btn.addEventListener('mouseout', function () {
    this.style.transform = 'scale(1)';
});

// Código de popups individuales
document.addEventListener('DOMContentLoaded', function () {
    let activePopup = null;

    function closeActivePopup() {
        if (activePopup) {
            const popup = activePopup.querySelector('.info-popup');
            popup.classList.remove('show');
            activePopup = null;
        }
    }

    buttons.forEach(button => {
        const popup = button.querySelector('.info-popup');
        const closeBtn = popup.querySelector('.close-button');
        const specItems = popup.querySelectorAll('.spec-list li');

        // Función para abrir popup
        function openPopup() {
            if (activePopup !== button) {
                closeActivePopup();
                popup.classList.add('show');
                activePopup = button;

                // Animar items de la lista
                specItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('highlight');
                        setTimeout(() => item.classList.remove('highlight'), 500);
                    }, index * 100);
                });
            }
        }

        // Click en el botón
        button.addEventListener('click', function (e) {
            if (!e.target.closest('.close-button')) {
                if (activePopup === button) {
                    closeActivePopup();
                } else {
                    openPopup();
                }
                e.stopPropagation();
            }
        });

        // Click en botón cerrar
        closeBtn.addEventListener('click', function (e) {
            closeActivePopup();
            e.stopPropagation();
        });

        // Soporte táctil
        button.addEventListener('touchstart', function (e) {
            e.preventDefault();
            if (activePopup === button) {
                closeActivePopup();
            } else {
                openPopup();
            }
        }, { passive: false });
    });

    // Cerrar al hacer click fuera
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.tool-button')) {
            closeActivePopup();
        }
    });

    // Cerrar con ESC
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && activePopup) {
            closeActivePopup();
        }
    });
});



cargarEventListeners();



function cargarEventListeners(){

    elementos1.addEventListener('click',comprarElemento);
    carrito.addEventListener('click',eliminarElemento);
    vaciarCarritoBtn.addEventListener('click',vaciarCarrito);

}


function comprarElemento(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        const elemento = e.target.parentElement.parentElement;
        leerDatosElemento(elemento);
    }
}

function leerDatosElemento(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent,
        precio: elemento.querySelector('.precio').textContent,
        cantidad: 1,
        id: elemento.querySelector('a') .getAttribute('data-id')
        
    }

        // Verifica si el producto ya existe
      const existe = document.querySelector(`#lista-carrito tr[data-id="${infoElemento.id}"]`);
    if (existe) {
        // Si existe, incrementa la cantidad
        const cantidadElemento = existe.querySelector('.carrito-item-cantidad');
        cantidadElemento.value = parseInt(cantidadElemento.value) + 1;
    } else {
        // Si no existe, añadirlo al carrito
        insertarCarrito(infoElemento);
    }
    
        actualizarTotalCarrito();
}



function insertarCarrito(elemento){

    const row = document.createElement('tr') ;
    row.setAttribute('data-id', elemento.id); // Agregar data-id para identificar el producto
    row.innerHTML =  `
        <td>
            <img src="${elemento.imagen}" width=80 style="display: block; margin: auto;"  />
        </td>
        <td>
            ${ elemento.titulo }
        </td>
        <td class="carrito-item-precio">
            ${ elemento.precio }
        </td>
        <td class="carrito-item-precio">
           <input type="number" class="carrito-item-cantidad" value="${elemento.cantidad}" min="1" />
        </td>

        <td>
            <a href="#" class="borrar" data-id="${elemento.id}">X </a>
        </td>
    `;
    lista.appendChild(row);
    actualizarTotalCarrito();
}

function eliminarElemento(e){
    e.preventDefault();
    if (e.target.classList.contains('borrar')) {
        e.target.parentElement.parentElement.remove();
        actualizarTotalCarrito();
    }
}

function vaciarCarrito(){
    lista.innerHTML = '';
    actualizarTotalCarrito();
}

//-----------------------------------------------------///
//-------------------------------Slider-------------------------------//
const images = document.querySelectorAll('.slider-image');
let currentIndex = 0;
const totalImages = images.length;

function changeImage() {
    // Ocultamos la imagen actual
    images[currentIndex].classList.remove('active');

    // Aumentamos el índice de la imagen actual (circular)
    currentIndex = (currentIndex + 1) % totalImages;

    // Mostramos la siguiente imagen
    images[currentIndex].classList.add('active');
}

// Inicia el slider automático
function iniciarSlider() {
    setInterval(changeImage, 3000); // Cambia cada 3 segundos
}

// Inicializa la primera imagen como activa
images[currentIndex].classList.add('active');

// Inicia el slider
iniciarSlider();
//-----------------------------------------------------///
//-----------------------------------------------------///


//Actualizamos el total de Carrito
function actualizarTotalCarrito() {
    // Selecciona todas las filas del carrito
    const carritoItems = document.querySelectorAll('#lista-carrito tbody tr');
    let total = 0;

    carritoItems.forEach(item => {
        // Obtiene el precio del producto
        const precioElemento = item.querySelector('.carrito-item-precio');
        const cantidadElemento = item.querySelector('.carrito-item-cantidad');

        // Limpia el texto del precio para convertirlo en número
        const precio = parseFloat(precioElemento.textContent.replace(/[^0-9.-]+/g, '').trim());
        const cantidad = parseInt(cantidadElemento.value, 10);

        // Verifica si el precio y la cantidad son válidos
        if (!isNaN(precio) && !isNaN(cantidad)) {
            total += precio * cantidad;
        }
    });
    // Actualiza el texto del total en el carrito
    document.querySelector('.carrito-precio-total').innerText = 'S/' + total.toFixed(2);
    const mensajeVacio = document.getElementById('mensaje-vacio');
    const listaCarrito = document.getElementById('lista-carrito');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const carritoTotal = document.querySelector('.carrito-total');
    // Mostrar mensaje al pasar el mouse si el carrito está vacío
  // Verifica si el carrito está vacío
  if (carritoItems.length === 0) {
    // Muestra el mensaje de vacío y oculta el contenido del carrito
    mensajeVacio.style.display = 'block';
    listaCarrito.classList.add('hidden');
    vaciarCarritoBtn.classList.add('hidden');
    carritoTotal.classList.add('hidden');
} else {
    // Oculta el mensaje de vacío y muestra el contenido del carrito
    mensajeVacio.style.display = 'none';
    listaCarrito.classList.remove('hidden');
    vaciarCarritoBtn.classList.remove('hidden');
    carritoTotal.classList.remove('hidden');
}
}
// Llama a la función para que el estado inicial sea correcto
actualizarTotalCarrito();

document.addEventListener('change', function(e) {
    if (e.target.classList.contains('carrito-item-cantidad')) {
        actualizarTotalCarrito();
    }
});

window.onload = function() {
    iniciarSlider();
    // Other initializations
}

// Detecta cuando el tamaño de la pantalla cambia
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        // Cuando la pantalla es pequeña, aseguramos que el menú esté cerrado por defecto
        navbar.classList.remove('active');
    } else {
        // Cuando la pantalla es grande, mostrar el menú
        navbar.classList.add('active');
    }
});

// Mostrar u ocultar el carrito de compras basado en el tamaño de pantalla
const carritoBtn = document.querySelector('.submenu #img-carrito');
carritoBtn.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
        // En pantallas pequeñas, puedes mostrar el carrito como un modal o dropdown
        document.querySelector('#carrito').classList.toggle('active');
    } else {
        // En pantallas grandes, muestra el carrito normalmente
        document.querySelector('#carrito').classList.toggle('active');
    }
});