function handleUpload() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput.files.length > 0) {
        // Aquí iría la lógica para procesar el archivo Excel
        alert('Archivo seleccionado: ' + fileInput.files[0].name);
    } else {
        alert('Por favor seleccione un archivo primero');
    }
}

function downloadExample() {
    // Aquí iría la lógica para descargar el archivo de ejemplo
    alert('Descargando archivo de ejemplo...');
}