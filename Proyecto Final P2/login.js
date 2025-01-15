const url = "https://localhost:7137/api/AdminControllers/ver%20usuarios";

// Escuchar evento click en el botón
document.getElementById("Boton").addEventListener("click", (event) => {
    event.preventDefault(); // Prevenir comportamiento por defecto del formulario
    
    // Realizar la solicitud al servidor
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Error en la solicitud: " + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log(data)
            // Transformar los datos recibidos
            const usuarios = data.map(usuario => ({
                id: usuario.id,
                usuario: usuario.usuario,
                pass: usuario.pass,
                tipoUsuario: usuario.tipoUsuario
            }));

            // Obtener los valores del formulario
            const usuarioInput = document.getElementById("email").value;
            const contrasenaInput = document.getElementById("password").value;

            // Verificar si las credenciales coinciden
            const usuarioEncontrado = usuarios.find(u => 
                u.usuario === usuarioInput && u.pass === contrasenaInput
            );

            // Redirigir según el tipo de usuario
            if (usuarioEncontrado) {
                if (usuarioEncontrado.tipoUsuario === "Admin") {
                    window.location.href = "HomeAdmin.html";
                } else if (usuarioEncontrado.tipoUsuario === "Basico") {
                    window.location.href = "UsuarioNormal.html";
                }
            } else {
                alert("Usuario no existente");
            }
        })
        .catch(error => {
            console.error("Error en la solicitud:", error);
            alert("Ocurrió un error al verificar los usuarios.");
        });
});
