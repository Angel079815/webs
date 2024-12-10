const hamburguesa = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const enlaces = document.querySelectorAll('.navegacion a');
const fecha = document.querySelector('.fecha');
document.addEventListener('DOMContentLoaded', () => {
    mostrarMenu();
    cerrarMenu();
    fechaActual();
});

function mostrarMenu() {
    hamburguesa.addEventListener('click', () => {
        navegacion.classList.toggle('ocultar');

    });
}

function cerrarMenu() {
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', (e) => {
            e.preventDefault();
            const seccion = document.querySelector(e.target.attributes.href.value);
            cambioSeccion(seccion);
            if (e.target.tagName === 'A') {
                navegacion.classList.add('ocultar');
            }
        });
    });
}

function cambioSeccion(seccion) {
    seccion.scrollIntoView({
        behavior: 'smooth'
    })
}

function fechaActual() {
    let fechaHoy = new Date().getFullYear();
    fecha.textContent = fechaHoy;
}

/*FORMULARIO*/
document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector(".formulario"); // El formulario completo
    const inputs = document.querySelectorAll(".formulario_input"); // Todos los campos de entrada
    const btnEnviar = formulario.querySelector("input[value='Enviar']"); // Botón "Enviar"
    const btnCancelar = formulario.querySelector("input[value='Cancelar']"); // Botón "Cancelar"
    const emailInput = formulario.querySelector("input[type='email']"); // Campo de correo
    const telefonoInput = formulario.querySelector("input[placeholder='Teléfono']"); // Campo de teléfono

    // Función para validar campos
    const validarCampos = () => {
        let esValido = true;

        inputs.forEach((input) => {
            if (input.value.trim() === "") {
                esValido = false; // Algún campo está vacío
                input.style.border = "2px solid red"; // Resalta el campo vacío
            } else {
                input.style.border = "1px solid var(--azulClaro)"; // Restaura el borde normal
            }
        });

        return esValido;
    };

    // Validar correo
    const validarCorreo = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para correos válidos
        if (!emailRegex.test(emailInput.value.trim())) {
            emailInput.style.border = "2px solid red"; // Resalta si el correo no es válido
            alert("Por favor, introduce un correo electrónico válido.");
            return false;
        }
        emailInput.style.border = "1px solid var(--azulClaro)"; // Restaura el borde normal
        return true;
    };

    // Validar teléfono
    const validarTelefono = () => {
        const telefonoRegex = /^9\d{8}$/; // Expresión regular: comienza con 9 y tiene 9 dígitos en total
        if (!telefonoRegex.test(telefonoInput.value.trim())) {
            telefonoInput.style.border = "2px solid red"; // Resalta si el teléfono no es válido
            alert("Por favor, introduce un número de teléfono válido.");
            return false;
        }
        telefonoInput.style.border = "1px solid var(--azulClaro)"; // Restaura el borde normal
        return true;
    };

    // Evento para el botón "Enviar"
    btnEnviar.addEventListener("click", (event) => {
        event.preventDefault(); // Prevenir el envío por defecto del formulario

        const camposValidos = validarCampos();
        const correoValido = validarCorreo();
        const telefonoValido = validarTelefono();

        if (camposValidos && correoValido && telefonoValido) {
            alert("Formulario enviado con éxito.");
            formulario.reset(); // Limpia los campos después del envío
        }
    });

    // Evento para el botón "Cancelar"
    btnCancelar.addEventListener("click", (event) => {
        event.preventDefault(); // Prevenir el comportamiento por defecto
        formulario.reset(); // Limpia los campos del formulario
        inputs.forEach((input) => {
            input.style.border = "1px solid var(--azulClaro)"; // Restaura los bordes normales
        });
    });
});