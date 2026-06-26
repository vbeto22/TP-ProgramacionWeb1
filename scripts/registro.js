document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector(".formulario");

    const emailInput = document.getElementById("email");
    const usuarioInput = document.getElementById("usuario");
    const dniInput = document.getElementById("DNI");
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


    emailInput.addEventListener("blur", () => {
        const email = emailInput.value.trim();
        if (email === "") return; 

        let usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosUNLaMLand")) || []; 
        const existeEmail = usuariosRegistrados.some(user => user.email === email); 

        if (existeEmail) {
            mostrarError(emailInput, "El correo electrónico ya se encuentra registrado.");
        }
    });

    usuarioInput.addEventListener("blur", () => {
        const usuario = usuarioInput.value.trim();
        if (usuario === "") return;

        let usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosUNLaMLand")) || []; 
        const existeUsuario = usuariosRegistrados.some(user => user.usuario === usuario); 

        if (existeUsuario) {
            mostrarError(usuarioInput, "Ese nombre de usuario ya está en uso. Elige otro.");
        }
    });

    dniInput.addEventListener("blur", () => {
        const dni = dniInput.value.trim();
        if (dni === "") return;

        if (dni.length < 7 || dni.length > 8) {
            mostrarError(dniInput, "Por favor, ingrese un DNI válido (7 u 8 dígitos).");
        }
    });

    passwordInput.addEventListener("blur", () => {
        const password = passwordInput.value.trim();
        if (password === "") return;

        if (password.length < 6) {
            mostrarError(passwordInput, "La contraseña debe tener al menos 6 caracteres.");
        }
    });


    
    const inputsAValidar = [emailInput, usuarioInput, dniInput, passwordInput];
    
    inputsAValidar.forEach(input => {
        input.addEventListener("focus", () => {
            ocultarError(input); 
        });
    });



    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault(); 


        emailInput.dispatchEvent(new Event("blur"));
        usuarioInput.dispatchEvent(new Event("blur"));
        dniInput.dispatchEvent(new Event("blur"));
        passwordInput.dispatchEvent(new Event("blur"));

        const erroresActivos = formulario.querySelectorAll(".mensaje-error");

        if (erroresActivos.length > 0) {
            erroresActivos[0].previousElementSibling.focus();
            return;
        }

        const nombre = document.getElementById("nombre").value.trim();
        const apellido = document.getElementById("apellido").value.trim();
        const nacimiento = document.getElementById("nacimiento").value;
        const telefono = document.getElementById("telefono").value.trim();

        let usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosUNLaMLand")) || [];

        const nuevoUsuario = {
            nombre: nombre,
            apellido: apellido,
            email: emailInput.value.trim(),
            usuario: usuarioInput.value.trim(),
            nacimiento: nacimiento,
            dni: dniInput.value.trim(),
            telefono: telefono,
            password: passwordInput.value.trim()
        };

        usuariosRegistrados.push(nuevoUsuario);
        localStorage.setItem("usuariosUNLaMLand", JSON.stringify(usuariosRegistrados)); 

        alert("¡Registro exitoso! Ya puedes iniciar sesión."); 
        window.location.href = "index.html"; 
    });
});