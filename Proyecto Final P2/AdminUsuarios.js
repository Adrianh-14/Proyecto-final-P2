
const tableeB = document.getElementById("table");
const urlVer = "https://localhost:7137/api/AdminControllers/ver%20usuarios";
var numm = 0;
fetch(urlVer)
    .then(response => response.json())
    .then(data => {
        return data.map(usuarios => ({
            id: usuarios.id,
            usuario: usuarios.usuario,
            pass: usuarios.pass,
            tipoUsuario: usuarios.tipoUsuario
        }))
    })
    .then(datosusuarios => {
        datosusuarios.forEach(element => {
            numm++;
            const filas = document.createElement("tr");
            const cantidad = document.createElement("td");
            cantidad.textContent = numm;
            filas.appendChild(cantidad);

            const usuarios = document.createElement("td");
            usuarios.textContent = element.usuario;
            filas.appendChild(usuarios);

            const clave = document.createElement("td");
            clave.textContent = element.pass;
            filas.appendChild(clave);

            const tipo = document.createElement("td");
            tipo.textContent = element.tipoUsuario;
            filas.appendChild(tipo);

            const acciones = document.createElement("td");
            const botonEditar = document.createElement("button");
            botonEditar.textContent = "Editar";
            const modal = document.getElementById("MymodalEditar");

            var cate = "";
            const Abasico = document.getElementById("Abasico").addEventListener("click", () => {
                cate = "Basico"
            })
            const Aadmin = document.getElementById("Aadmin").addEventListener("click", () => {
                cate = "Admin"
            })
            botonEditar.addEventListener("click", () => {
                modal.style.display = "block";

                const usuarioA = document.getElementById("Ausuario");
                const Apass = document.getElementById("Aclave");

                const botonG = document.getElementById("AGuardar").addEventListener("click", () => {

                    const datoss = {
                        id: element.id,
                        usuario: usuarioA.value,
                        pass: Apass.value,
                        tipoUsuario: cate
                    }

                    fetch("https://localhost:7137/api/AdminControllers/Actualizar%20usuarios", {
                        method: "PUT",
                        headers: {
                            'accept': '*/*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(datoss)
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Error ${response.status}: ${response.statusText}`);
                            }
                            return response.text();
                        })
                        .then(data => {
                            alert("Actualizado exitosamente");
                            location.reload(); // Recargar la página para reflejar los cambios
                        })
                        .catch(err => {
                            console.error("Error al actualizar:", err);
                            alert("Hubo un error al actualizar el vehículo.");
                        });

                });

            });

            const botonEliminar = document.createElement("button");
            botonEliminar.textContent = "Eliminar";


            botonEliminar.addEventListener("click", () => {
                const urldelete = "https://localhost:7137/api/AdminControllers/Eliminar%20Usuarios?IdUsuarios=" + element.id;
                if (confirm("Quieres eliminar a " + element.usuario + "?")) {
                    fetch(urldelete, {
                        method: "DELETE"
                    })
                        .then(response => {
                            return response.text();
                        })
                        .then(data => {
                            alert(data)
                            location.reload();
                        })
                }

            })

            acciones.appendChild(botonEliminar);

            acciones.appendChild(botonEditar);
            filas.appendChild(acciones);

            tableeB.appendChild(filas);


        });
    });

const urlAgg = "https://localhost:7137/api/AdminControllers/Crear%20usuarios";
const guardar = document.getElementById("Guardar");
var tipoU = "";
const basico = document.getElementById("basico").addEventListener("click", () => {
    tipoU = "Basico"

})
const admin = document.getElementById("admin").addEventListener("click", () => {
    tipoU = "Admin"
})
guardar.addEventListener("click", () => {

    const usuario = document.getElementById("email1");
    const pass = document.getElementById("email2");

    const tipoUsuario = document.getElementById("email3");


    const datos = {
        id: 0,
        usuario: usuario.value,
        pass: pass.value,
        tipoUsuario: tipoU
    }


    fetch(urlAgg, {
        method: "POST",
        headers: {
            accept: "*/*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`Error: ${response.status} - ${text}`);
                });
            }
            return response.text();

        })
        .then(data => {
            alert("Registro exitoso: " + data); // Muestra la respuesta del servidor

            location.reload();
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error al registrar el usuario" + error);
        });

})
var cerrarmodal = document.getElementById("cerrar");
cerrarmodal.onclick = function () {
    var modal = document.getElementById("MymodalEditar"); // Asegúrate de seleccionar el modal
    modal.style.display = "none";
};
