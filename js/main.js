// -------------------------
// Expresiones Regulares
// -------------------------
const regexNombre = /^[A-Za-zÁÉÍÓÚÑáéíóúñ ]+$/;
const regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regexCelular = /^[0-9]{7,12}$/;
const regexPwd = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

// -------------------------
// REGISTRO
// -------------------------
function registrar() {
    let nombre = document.getElementById("nombre").value.trim();
    let correo = document.getElementById("correo").value.trim();
    let celular = document.getElementById("celular").value.trim();
    let password = document.getElementById("password").value.trim();

    if (!regexNombre.test(nombre)) return alert("Nombre inválido");
    if (!regexCorreo.test(correo)) return alert("Correo inválido");
    if (!regexCelular.test(celular)) return alert("Número móvil inválido");
    if (!regexPwd.test(password)) return alert("Contraseña insegura");

    let usuario = {
        nombre,
        correo,
        celular,
        password,
        intentos: 0,
        bloqueado: false
    };

    localStorage.setItem(correo, JSON.stringify(usuario));

    alert("Cuenta registrada correctamente");
    location.href = "pages/inicio.html";
}

// -------------------------
// LOGIN
// -------------------------
function iniciarSesion() {
    let correo = document.getElementById("loginCorreo").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    let data = localStorage.getItem(correo);
    if (!data) return alert("Usuario no registrado");

    let user = JSON.parse(data);

    if (user.bloqueado) return alert("Cuenta bloqueada por intentos fallidos.");

    if (password === user.password) {
        user.intentos = 0;
        localStorage.setItem(correo, JSON.stringify(user));
        alert("Bienvenido al sistema, " + user.nombre);
        return;
    }

    user.intentos++;
    if (user.intentos >= 3) {
        user.bloqueado = true;
        alert("Cuenta bloqueada por intentos fallidos.");
    } else {
        alert("Usuario o contraseña incorrectos.");
    }

    localStorage.setItem(correo, JSON.stringify(user));
}

// -------------------------
// RECUPERACIÓN DE CONTRASEÑA
// -------------------------
function recuperar() {
    let correo = document.getElementById("recCorreo").value.trim();
    let nueva = document.getElementById("recNueva").value.trim();

    if (!regexPwd.test(nueva)) return alert("La contraseña no cumple los requisitos.");

    let data = localStorage.getItem(correo);
    if (!data) return alert("Este correo no está registrado.");

    let user = JSON.parse(data);
    user.password = nueva;
    user.intentos = 0;
    user.bloqueado = false;

    localStorage.setItem(correo, JSON.stringify(user));

    alert("Contraseña actualizada. Ahora puede iniciar sesión.");
    location.href = "pages/inicio.html";
}

// -------------------------
// MOSTRAR / OCULTAR CONTRASEÑA
// -------------------------
function togglePassword(id) {
    let campo = document.getElementById(id);
    campo.type = campo.type === "password" ? "text" : "password";
}
