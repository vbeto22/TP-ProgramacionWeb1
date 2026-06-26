document.addEventListener("DOMContentLoaded", () => {
    const nombreUsuarioTxt = document.getElementById("nombreUsuario");
    const emailTxt = document.getElementById("email");
    const asteriscosPasswordTxt = document.querySelector("p.contraseña"); 

    const formulario = document.getElementById("formularioUsuario");
    const nuevaContraseñaInput = document.getElementById("nuevaContraseña");
    const repiteContraseñaInput = document.getElementById("repiteContraseña");

    const usuarioLogueado = localStorage.getItem("usuarioLogueado");
    let usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosUNLaMLand")) || [];

    const usuarioActual = usuariosRegistrados.find(user => user.usuario === usuarioLogueado);

    if (!usuarioActual) {
        alert("No se detectó ninguna sesión activa. Por favor, inicia sesión.");
        window.location.href = "index.html";
        return;
    }

    nombreUsuarioTxt.innerText = usuarioActual.usuario;
    emailTxt.innerText = usuarioActual.email;
    
    asteriscosPasswordTxt.innerText = "*".repeat(usuarioActual.password.length);




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



    nuevaContraseñaInput.addEventListener("blur", () => {
        const nuevaClave = nuevaContraseñaInput.value;
        if (nuevaClave === "") return; 

        if (nuevaClave.length < 6) {
            mostrarError(nuevaContraseñaInput, "La nueva contraseña debe tener al menos 6 caracteres.");
        }
    });

    repiteContraseñaInput.addEventListener("blur", () => {
        const nuevaClave = nuevaContraseñaInput.value;
        const repiteClave = repiteContraseñaInput.value;

        if (repiteClave === "") return;

        if (nuevaClave !== repiteClave) {
            mostrarError(repiteContraseñaInput, "Las contraseñas ingresadas no coinciden.");
        }
    });



    [nuevaContraseñaInput, repiteContraseñaInput].forEach(input => {
        input.addEventListener("focus", () => {
            ocultarError(input);
        });
    });



    formulario.addEventListener("submit", function(evento) {
        nuevaContraseñaInput.dispatchEvent(new Event("blur"));
        repiteContraseñaInput.dispatchEvent(new Event("blur"));

        const erroresActivos = formulario.querySelectorAll(".mensaje-error");
        
        if (erroresActivos.length > 0) {
            evento.preventDefault();
            erroresActivos[0].previousElementSibling.focus();
            return;
        }

        const nuevaClave = nuevaContraseñaInput.value;

        if (nuevaClave === "") {
            evento.preventDefault();
            alert("No se realizaron modificaciones en la contraseña.");
            return;
        }

        evento.preventDefault(); 

        const usuarioIndex = usuariosRegistrados.findIndex(user => user.usuario === usuarioActual.usuario);

        if (usuarioIndex !== -1) {
            usuariosRegistrados[usuarioIndex].password = nuevaClave;
            localStorage.setItem("usuariosUNLaMLand", JSON.stringify(usuariosRegistrados));

            alert("¡Contraseña actualizada con éxito! Por seguridad, inicia sesión nuevamente.");
            
            localStorage.removeItem("usuarioLogueado");

            window.location.href = "index.html";
        }
    });
});