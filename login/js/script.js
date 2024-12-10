// Función para redirigir al usuario a la página de Inicio
document.getElementById('btn__volver').addEventListener('click', () => {
    window.location.href = "../Inicio.html"; // Redirige a Inicio.html
});

//Ejecutando funciones
document.getElementById("btn__iniciar-sesion").addEventListener("click", iniciarSesion);
document.getElementById("btn__registrarse").addEventListener("click", register);
window.addEventListener("resize", anchoPage);

//Declarando variables
var formulario_login = document.querySelector(".formulario__login");
var formulario_register = document.querySelector(".formulario__register");
var contenedor_login_register = document.querySelector(".contenedor__login-register");
var caja_trasera_login = document.querySelector(".caja__trasera-login");
var caja_trasera_register = document.querySelector(".caja__trasera-register");

    //FUNCIONES

function anchoPage(){

    if (window.innerWidth > 850){
        caja_trasera_register.style.display = "block";
        caja_trasera_login.style.display = "block";
    }else{
        caja_trasera_register.style.display = "block";
        caja_trasera_register.style.opacity = "1";
        caja_trasera_login.style.display = "none";
        formulario_login.style.display = "block";
        contenedor_login_register.style.left = "0px";
        formulario_register.style.display = "none";   
    }
}

anchoPage();


    function iniciarSesion(){
        if (window.innerWidth > 850){
            formulario_login.style.display = "block";
            contenedor_login_register.style.left = "10px";
            formulario_register.style.display = "none";
            caja_trasera_register.style.opacity = "1";
            caja_trasera_login.style.opacity = "0";
        }else{
            formulario_login.style.display = "block";
            contenedor_login_register.style.left = "0px";
            formulario_register.style.display = "none";
            caja_trasera_register.style.display = "block";
            caja_trasera_login.style.display = "none";
        }
    }

    function register(){
        if (window.innerWidth > 850){
            formulario_register.style.display = "block";
            contenedor_login_register.style.left = "410px";
            formulario_login.style.display = "none";
            caja_trasera_register.style.opacity = "0";
            caja_trasera_login.style.opacity = "1";
        }else{
            formulario_register.style.display = "block";
            contenedor_login_register.style.left = "0px";
            formulario_login.style.display = "none";
            caja_trasera_register.style.display = "none";
            caja_trasera_login.style.display = "block";
            caja_trasera_login.style.opacity = "1";
        }

// Elementos de los formularios
const btnIniciarSesion = document.getElementById('btn__iniciar-sesion');
const btnRegistrarse = document.getElementById('btn__registrarse');
const formularioLogin = document.getElementById('formulario__login');
const formularioRegister = document.getElementById('formulario__register');
// Función para redirigir al usuario a la página de Inicio
document.getElementById('btn__volver').addEventListener('click', () => {
    window.location.href = "../Inicio.html"; // Redirige a Inicio.html
});

// Manejadores de eventos para el cambio de formulario
btnIniciarSesion.addEventListener('click', () => {
    document.querySelector('.contenedor__login-register').classList.remove('registro-activo');
});
btnRegistrarse.addEventListener('click', () => {
    document.querySelector('.contenedor__login-register').classList.add('registro-activo');
});




// Función para registrar un usuario
formularioRegister.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('register__nombre').value;
    const correo = document.getElementById('register__correo').value;
    const usuario = document.getElementById('register__usuario').value;
    const telefono = document.getElementById('register__telefono').value;
    const contraseña = document.getElementById('register__contraseña').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const existe = usuarios.find((user) => user.correo === correo);

    if (existe) {
        alert('El correo ya está registrado.');
        return;
    }

    usuarios.push({ nombre, correo, usuario, telefono, contraseña });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    formularioRegister.reset();
});

// Función para iniciar sesión
formularioLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const correo = document.getElementById('login__correo').value;
    const contraseña = document.getElementById('login__contraseña').value;
    // Obtiene los usuarios registrados
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find((user) => user.correo === correo && user.contraseña === contraseña);

    if (usuario) {
        alert(`Bienvenido, ${usuario.nombre}`);
        // Guarda los datos del usuario en localStorage para mostrarlos en menu.html
        localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
        // Redirige a menu.html
        window.location.href = "/login/menu.html";
    } else {
        alert('Correo o contraseña incorrectos.');
    }


document.addEventListener("DOMContentLoaded", () => {
    const usuarioActivo = JSON.parse(localStorage.getItem('usuarioActivo'));
    
    // Si hay un usuario activo, redirige automáticamente a la página del menú
    if (usuarioActivo) {
        window.location.href = "menu.html";
    }
});
});

// Función para redirigir al usuario a la página de Inicio
document.getElementById('btn__volver').addEventListener('click', () => {
    window.location.href = "../Inicio.html"; // Redirige a Inicio.html
});











}