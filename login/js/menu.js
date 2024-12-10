document.addEventListener("DOMContentLoaded", () => {
    // Simulated data for the dashboard
    const summaryData = {
        productsAvailable: 1234,
        servicesRequested: 45,
        totalSpent: 12345.67,
    };

    // Update summary cards
    document.getElementById("products-count").textContent = summaryData.productsAvailable;
    document.getElementById("services-count").textContent = summaryData.servicesRequested;
    document.getElementById("total-spent").textContent = `$${summaryData.totalSpent.toLocaleString()}`;

    // Add event listeners for product buttons
    document.querySelectorAll(".product-item button").forEach((button) => {
        button.addEventListener("click", () => {
            const productName = button.parentElement.querySelector("h3").textContent;
            alert(`Has seleccionado: ${productName}`);
        });
    });

    // Add event listeners for calibration services buttons
    const calibrationTable = document.querySelector(".calibration-services table");
    if (calibrationTable) {
        calibrationTable.addEventListener("click", (event) => {
            if (event.target.tagName === "BUTTON") {
                const serviceName = event.target.closest("tr").children[0].textContent;
                alert(`Has solicitado el servicio: ${serviceName}`);
            }
        });
    }

    // Simular funcionalidad del menú de usuario
    const logoutButton = document.getElementById("logout");
    const usernameElement = document.getElementById("username");
    const username1Element = document.getElementById("username1");

    // Obtener los datos del usuario desde localStorage
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));

    // Verificar si hay un usuario activo
    if (usuarioActivo) {
        // Si existe, mostrar el nombre de usuario en el menú
        username1Element.textContent = usuarioActivo.nombre;
        usernameElement.textContent = usuarioActivo.nombre;
    } else {
        // Si no hay usuario, redirigir al login
        window.location.href = "index.html"; // O la página que corresponda
    }

    // Funcionalidad de cerrar sesión
    logoutButton.addEventListener("click", () => {
        alert("Sesión cerrada.");
        // Limpiar el usuario activo y redirigir al login
        localStorage.removeItem('usuarioActivo');
        window.location.href = "index.html"; // Redirige al login
    });

    // Funcionalidad para el botón de colapsar/expandir la barra lateral
    const toggleSidebarButton = document.createElement("button");
    toggleSidebarButton.className = "toggle-sidebar";
    toggleSidebarButton.textContent = "☰";
    document.body.appendChild(toggleSidebarButton);

    const sidebar = document.querySelector(".sidebar");
    const mainContainer = document.querySelector(".main-container");

    toggleSidebarButton.addEventListener("click", () => {
        const isCollapsed = sidebar.style.transform === "translateX(-100%)";
        sidebar.style.transform = isCollapsed ? "translateX(0)" : "translateX(-100%)";
        mainContainer.style.marginLeft = isCollapsed ? "270px" : "0";
    });

    // Asegurarse de que la barra lateral esté visible al cargar
    sidebar.style.transform = "translateX(0)";
});
