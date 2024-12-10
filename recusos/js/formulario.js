document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores de los campos
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;
    
    // Validar el nombre
    if (name === "") {
        alert("Por favor, ingresa tu nombre completo.");
        return;  
    }

    // Validar el correo electrónico
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zAZ]{2,6}$/;
    if (!emailPattern.test(email)) {
        alert("Por favor, ingresa un correo electrónico válido.");
        return;  
    }

    // Validar el mensaje
    if (message === "") {
        alert("Por favor, escribe un mensaje.");
        return;  
    }

    // Obtener el botón de envío
    const submitButton = document.querySelector('input[type="submit"]');

    // Cambiar el valor del botón a "Enviando..."
    submitButton.value = "Enviando...";

    // Desactivar el botón mientras se simula el envío
    submitButton.disabled = true;

    // Simular un tiempo de espera de 2 segundos antes de mostrar el mensaje de éxito
    setTimeout(function() {
        alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
        
        // Restaurar el texto del botón y habilitarlo nuevamente
        submitButton.value = "Enviar";
        submitButton.disabled = false;

        // Limpiar el formulario
        document.getElementById('contactForm').reset(); // Limpiar todos los campos del formulario
    }, 2000); // 2000 milisegundos = 2 segundos
});
