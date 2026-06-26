document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector(".formulario");
    const emailInput = document.getElementById("email");
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
        
        const correoExiste = usuariosRegistrados.some(user => user.email === email);

        if (!correoExiste) {
            mostrarError(emailInput, "El correo electrónico ingresado no coincide con ninguna cuenta activa.");
        }
    });

    passwordInput.addEventListener("blur", () => {
        const password = passwordInput.value.trim();
        if (password === "") return;


        if (password.length < 6) {
            mostrarError(passwordInput, "La nueva contraseña debe tener al menos 6 caracteres.");
        }
    });


    [emailInput, passwordInput].forEach(input => {
        input.addEventListener("focus", () => {
            ocultarError(input); 
        });
    });


    formulario.addEventListener("submit", function(evento) {
        evento.preventDefault(); 

        emailInput.dispatchEvent(new Event("blur"));
        passwordInput.dispatchEvent(new Event("blur"));

        const erroresActivos = formulario.querySelectorAll(".mensaje-error");
        if (erroresActivos.length > 0) {
            erroresActivos[0].previousElementSibling.focus();
            return;
        }

        const email = emailInput.value.trim();
        const nuevaPassword = passwordInput.value.trim();

        let usuariosRegistrados = JSON.parse(localStorage.getItem("usuariosUNLaMLand")) || [];

        const usuarioIndex = usuariosRegistrados.findIndex(user => user.email === email);

        if (usuarioIndex !== -1) {
            usuariosRegistrados[usuarioIndex].password = nuevaPassword;

            localStorage.setItem("usuariosUNLaMLand", JSON.stringify(usuariosRegistrados));

            alert("¡Contraseña restablecida con éxito! Ya puedes ingresar con tus nuevas credenciales.");
            
            window.location.href = "index.html";
        } else {
            mostrarError(emailInput, "No pudimos procesar la solicitud. Verifica el correo electrónico.");
            emailInput.focus();
        }
    });
});