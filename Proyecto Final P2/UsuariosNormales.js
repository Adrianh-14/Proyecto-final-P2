
const tbody = document.getElementById("tbody");
var numm = 0;

const linkbehiculos = "https://localhost:7137/api/VehiculosControllers/Vehiculos%20ingresados";
fetch(linkbehiculos)
    .then(response => response.json())
    .then(data => {

        return data.map(Vehiculos => ({

            id: Vehiculos.id,
            matricula: Vehiculos.matricula,
            codigo: Vehiculos.codigo,
            fk_categoria: Vehiculos.fk_categoria,
            fechaEntrada: Vehiculos.fechaEntrada,
            fechaSalida: Vehiculos.fechaSalida,
            saldo: 0
        }))
    })
    .then(datosVehiculos => {

        datosVehiculos.forEach(element => {
            numm++;
            const Filas = document.createElement("tr");

            const cantidad = document.createElement("td");
            cantidad.textContent = numm;
            Filas.appendChild(cantidad);

            const matricula = document.createElement("td");
            matricula.textContent = element.matricula;
            Filas.appendChild(matricula);
            const tipo = document.createElement("td");



            switch (element.fk_categoria) {
                case 30:
                    tipo.textContent = "Camion";
                    Filas.appendChild(tipo);
                    break;
                case 31:
                    tipo.textContent = "Carro";
                    Filas.appendChild(tipo);
                    break;
                case 37:
                    tipo.textContent = "Jeepeta";
                    Filas.appendChild(tipo);
                    break;
                case 36:
                    tipo.textContent = "Motocicleta";
                    Filas.appendChild(tipo);
                    break;

                default:
                    break;
            }
            const codigos = document.createElement("td");
            codigos.textContent = element.codigo;
            Filas.appendChild(codigos);

            const fechaIngreso = document.createElement("td");
            fechaIngreso.textContent = element.fechaEntrada;        //esto puede dar un error ojo
            Filas.appendChild(fechaIngreso);

            const acciones = document.createElement("td");
            const botonEditar = document.createElement("button");
            botonEditar.classList.add("btn", "btn-primary", "btn-sm");

            botonEditar.textContent = "Editar";
            const modal = document.getElementById("myModal")
            botonEditar.addEventListener("click", () => {
                modal.style.display = "block"; // Mostrar el modal
                const input = document.getElementById("ActualizarMAtricula"); // Input para matrícula

                let cate = 5; // Inicializar variable
                document.getElementById("ACarro").addEventListener("click", () => {
                    cate = 31;
                });
                document.getElementById("ACamión").addEventListener("click", () => {
                    cate = 30;
                });
                document.getElementById("AJeepeta").addEventListener("click", () => {
                    cate = 37;
                });
                document.getElementById("Motocicleta").addEventListener("click", () => {
                    cate = 36;
                });

                const actualizar = document.getElementById("Actualizarbton");
                actualizar.addEventListener("click", (event) => {
                    event.preventDefault();





                    // Validar entrada


                    // Datos para enviar
                    const datos = {
                        id: element.id,              // ID del vehículo
                        matricula: input.value,      // Matrícula desde el input
                        codigo: element.codigo,      // Código existente
                        fk_categoria: cate,  // Categoría seleccionada
                        fechaEntrada: element.fechaEntrada, // Fecha de entrada existente
                        fechaSalida: "2024-11-30T03:52:08.531Z",           // Fecha de salida
                        saldo: 0                     // Saldo nulo
                    };

                    // Enviar solicitud PUT
                    fetch("https://localhost:7137/api/VehiculosControllers", {
                        method: "PUT",
                        headers: {
                            'accept': '*/*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(datos)
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`Error ${response.status}: ${response.statusText}`);
                            }
                            return response.text();
                        })
                        .then(data => {
                            alert("Vehículo actualizado exitosamente");
                            location.reload(); // Recargar la página para reflejar los cambios
                        })
                        .catch(err => {
                            console.error("Error al actualizar:", err);
                            alert("Hubo un error al actualizar el vehículo.");
                        });
                });
            });

            // ojo aqui 
            const botonSalir = document.createElement("button");
            botonSalir.classList.add("btn", "btn-secondary", "btn-sm");
            botonSalir.textContent = "dar salida"
            const modalsalir = document.getElementById("MymodalSalida");
            botonSalir.addEventListener("click", () => {
                modalsalir.style.display = "block"; // Mostrar el modal
                const salidaCodigo = document.getElementById("salidaID");
                const botonsalir = document.getElementById("Salirbton");
                botonsalir.addEventListener("click", () => {
                    const darsalidaurl = "https://localhost:7137/api/VehiculosControllers/Dar%20salida?Codigo=" + salidaCodigo.value + "&categoria=" + element.fk_categoria;
                    console.log(darsalidaurl);

                    event.preventDefault();
                    fetch(darsalidaurl, {
                        method: "DELETE",
                    })
                        .then(response => {
                            return response.text();
                        })
                        .then(data => {
                            // Acción completada exitosamente
                            alert("Vehículo retirado: " + data);
                            location.reload()
                        })
                    /*.catch(error => {
                        // Manejo de errores en el cliente o servidor
                        console.error("Hubo un problema con la solicitud:", error);
                        alert("No se pudo eliminar el vehículo. Detalles: " + error.message);
                    });*/



                })

            })

            acciones.appendChild(botonEditar);
            acciones.appendChild(botonSalir);
            Filas.appendChild(acciones);

            tbody.appendChild(Filas);



        });


    })

var input = document.getElementById("matriculaInput");
const boton = document.getElementById("Resgistro"); // Corrección del ID aquí
const linkAgg = "https://localhost:7137/api/VehiculosControllers/Ingresar";

let fk_categoria = 5; // Valor predeterminado

// Asociar eventos a los botones para actualizar `fk_categoria`
document.getElementById("Carro").addEventListener("click", () => {
    fk_categoria = 31;
});
document.getElementById("Camión").addEventListener("click", () => {
    fk_categoria = 30;
});
document.getElementById("Jeepeta").addEventListener("click", () => {
    fk_categoria = 37;
});
document.getElementById("Motocicleta").addEventListener("click", () => {
    fk_categoria = 36;
});
var i = 0;
// Enviar datos con el botón "Registro"
boton.addEventListener("click", () => {
    event.preventDefault();
    i++;
    // Validación de la matrícula
    if (!input.value) {
        alert("La matrícula es requerida.");
        return;
    }
    const fechaA = new Date();
    const datos = {
        matricula: input.value,          // Matrícula desde el input
        codigo: "string",                // Ajustar según corresponda
        fk_categoria: fk_categoria,       // Cambia según lo seleccionado o predeterminado
        fechaEntrada: fechaA.toISOString().replace('Z', ''),        // Fecha actual
        fechaSalida: "2024-11-28T04:29:36.037",               // Fecha de salida nula
        saldo: 0                          // Saldo inicial
    };

    fetch(linkAgg, {
        method: "POST",
        headers: {
            accept: "*/*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    })
        .then(response => {
            // Manejo de errores basado en el código de estado
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`Error: ${response.status} - ${text}`);
                });
            }
            return response.text(); // Asegúrate de que la respuesta sea texto
        })
        .then(data => {
            alert("Registro exitoso: " + data); // Muestra la respuesta del servidor
            location.reload();
        })
        .catch(error => {
            console.error("Error:", error);
            alert("exito al registrar el vehículo.");
        });
});


var cerrarmodal = document.getElementById("cerraro");
cerrarmodal.onclick = function () {
    var modal = document.getElementById("myModal"); // Asegúrate de seleccionar el modal
    modal.style.display = "none";
};
var cerrarmodal = document.getElementById("cerrar");
cerrarmodal.onclick = function () {
    var modal = document.getElementById("MymodalSalida"); // Asegúrate de seleccionar el modal
    modal.style.display = "none";
};



