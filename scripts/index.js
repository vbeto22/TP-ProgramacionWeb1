document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector(".formulario");
    const usuarioInput = document.getElementById("usuario");
    const passwordInput = document.getElementById("contraseña");


    function mostrarError(input, mensaje) {
        ocultarError(input); 

        input.classList.add("input-error"); 

        const errorElement = document.createElement("span");
        errorElement.className = "mensaje-error"; 
        errorElement.innerText = mensaje;

        input.insertAdjacentElement("afterend", errorElement);
    }


    function ocultarError(input) {
        input.classList.remove("input-error");
        const errorPrevio = input.nextElementSibling;
        if (errorPrevio && errorPrevio.classList.contains("mensaje-error")) {
            errorPrevio.remove();
        }
    }



    usuarioInput.addEventListener("blur", () => {
        const usuario = usuarioInput.value.trim();
        if (usuario === "") return; 

        let usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosUNLaMLand")) || [];
        const usuarioExiste = usuariosRegistrados.some(user => user.usuario === usuario);

        if (!usuarioExiste) {
            mostrarError(usuarioInput, "El nombre de usuario ingresado no existe.");
        }
    });

    passwordInput.addEventListener("blur", () => {
        const password = passwordInput.value.trim();
        if (password === "") return;

        if (password.length < 6) {
            mostrarError(passwordInput, "La contraseña debe tener al menos 6 caracteres.");
        }
    });



    [usuarioInput, passwordInput].forEach(input => {
        input.addEventListener("focus", () => {
            ocultarError(input); 
        });
    });



    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault(); 

        usuarioInput.dispatchEvent(new Event("blur"));
        passwordInput.dispatchEvent(new Event("blur"));

        const erroresActivos = formulario.querySelectorAll(".mensaje-error");
        if (erroresActivos.length > 0) {
            erroresActivos[0].previousElementSibling.focus();
            return;
        }

        const usuario = usuarioInput.value.trim();
        const password = passwordInput.value.trim();

        let usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosUNLaMLand")) || [];

        const usuarioEncontrado = usuariosRegistrados.find(user => user.usuario === usuario);

        if (!usuarioEncontrado) {
            mostrarError(usuarioInput, "El nombre de usuario ingresado no existe.");
            usuarioInput.focus();
            return;
        }

        if (usuarioEncontrado.password !== password) {
            mostrarError(passwordInput, "La contraseña ingresada es incorrecta.");
            passwordInput.focus();
            return;
        }
        localStorage.setItem("usuarioLogueado", usuarioEncontrado.usuario);

        alert("¡Inicio de sesión exitoso! Bienvenido/a " + usuarioEncontrado.nombre);
        
        window.location.href = "main.html";
    });
});