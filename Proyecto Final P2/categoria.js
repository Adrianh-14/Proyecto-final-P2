
const table = document.getElementById("tble");
var numee = 0;
var prueba = 0;
const urlVer = "https://localhost:7137/api/AdminControllers/Ver%20categorias";
fetch(urlVer)
    .then(response => response.json())
    .then(data => {
        return data.map(categoria => ({
            id: categoria.id,
            categorias: categoria.categorias,
            tarifas: categoria.tarifas
        })
        )
    })
    .then(datoss => {
        datoss.forEach(element => {
            prueba = element.id;
            numee++;
            const filas = document.createElement("tr");
            const num = document.createElement("td")
            num.textContent = numee;
            filas.appendChild(num);



            const nombre = document.createElement("td");
            nombre.textContent = element.categorias;
            filas.appendChild(nombre);


            const tarifa = document.createElement("td");
            tarifa.textContent = element.tarifas;
            filas.appendChild(tarifa);

            const acciones = document.createElement("td");
            const botoneditar = document.createElement("button");
            botoneditar.textContent = "Editar";
            const modal = document.getElementById("MymodalCategoria");

            botoneditar.addEventListener("click", () => {  // falta eso solamente 
                modal.style.display = "block"
                const ActualizarCategoria = document.getElementById("Acategoria");

                const ActualizarTarifa = document.getElementById("Atarifa");

                const actualizar = document.getElementById("BtonActualizar").addEventListener("click", () => {



                    const datos = {
                        id: element.id,
                        categorias: ActualizarCategoria.value,
                        tarifas: ActualizarTarifa.value
                    }
                    fetch("https://localhost:7137/api/AdminControllers/Actualizar%20Tarifas", {
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
                            alert("Actualizacion exitosa "+data);
                            location.reload(); // Recargar la página para reflejar los cambios
                        })
                        .catch(err => {
                            console.error("Error al actualizar:", err);
                            alert("Hubo un error al actualizar la categoria.");
                        });

                })



            })


            const botonBorrar = document.createElement("button");
            botonBorrar.textContent = "Borrar";
            botonBorrar.addEventListener("click", () => {
                const urldelete = "https://localhost:7137/api/AdminControllers/Eliminar%20categorias?IdCategoria=" + element.id;
                if (confirm("Quieres eliminar la categoria " + element.categorias + "?")) {
                    fetch(urldelete, {
                        method: "DELETE"
                    })
                        .then(response => {
                            return response.text();
                        })
                        .then(data => {
                            // Acción completada exitosamente
                            alert("Vehículo eliminado correctamente: " + data);
                            location.reload();
                        })

                } else {

                    alert("No se elimino el usuario " + element.categorias);
                }



            })


            acciones.appendChild(botoneditar);
            acciones.appendChild(botonBorrar);
            filas.appendChild(acciones);
            table.appendChild(filas);
        });
    })

const Icategoria = document.getElementById("Categoria");
const Itarifa = document.getElementById("Tarifa");
const urlAgg = "https://localhost:7137/api/AdminControllers/crear%20nueva%20categoria";
const botonGuardar = document.getElementById("Enviar").addEventListener("click", () => {
    event.preventDefault();

    datoss = {

        id: 0,
        categorias: Icategoria.value,
        tarifas: Itarifa.value // posible error
    }
    fetch(urlAgg, {
        method: "POST",
        headers: {
            accept: "*/*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datoss)

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
            alert("Debes definir una cantidad de parqueos para la categoria " + Icategoria.value)
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Error: " + error);
        });


})




//Estacionamientos

const urlMostrar = "https://localhost:7137/api/AdminControllers/Parqueos%20disponibles";





//crear


const CrearE = "https://localhost:7137/api/AdminControllers/crear%20nueva%20estacionamiento";
const botonE = document.getElementById("Enviar2");
const cantidad = document.getElementById("Tarifa2");
botonE.addEventListener("click", () => {
    const dataa = {
        id: 0,
        fk_categoria: prueba,
        cantidad_estacionamiento: cantidad.value,
        cantidad_Total: cantidad.value
    }
    fetch(CrearE, {
        method: "POST",
        headers: {
            accept: "*/*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataa)
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
        })
        .catch(error => {
            console.error("Error:", error);
            alert("exito al registrar el vehículo.");
        });

})

var tos = "";
var no = 0;
const tableee = document.getElementById("tble2");
fetch("https://localhost:7137/api/AdminControllers/Parqueos%20disponibles")
    .then(response => response.json())
    .then(datoss => {

        return datoss.map(parqueo => ({
            id: parqueo.id,
            fk_categoria: parqueo.fk_categoria,
            cantidad_estacionamiento: parqueo.cantidad_estacionamiento,
            Cantidad_Total: parqueo.cantidad_Total
        }))
    })
    .then(da => {

        da.forEach(element => {
            no++;
            const filas = document.createElement("tr");



            switch (element.fk_categoria) {
                case 30:
                    tos = "Camion"
                    break;
                case 31:
                    tos = "Carro";
                    break;
                case 37:
                    tos = "Jeepeta"
                    break;
                case 36:
                    tos = "Motocicleta"
                    break;

                default:
                    tos = "Indefinida"
                    break;
            }
            const numeroee = document.createElement("td")
            numeroee.textContent = no;
            filas.appendChild(numeroee);
            const categoria = document.createElement("td");
            categoria.textContent = tos;
            filas.appendChild(categoria);


            const cantidad = document.createElement("td");
            cantidad.textContent = element.cantidad_estacionamiento + "/" + element.Cantidad_Total;
            filas.appendChild(cantidad);

            const AAAcciones = document.createElement("td");
            const editar = document.createElement("button");
            const moda = document.getElementById("Mymodalestacionamiento");
            editar.textContent = "Editar";
            AAAcciones.appendChild(editar);
            var Variablecategoria = 5;
            const editarcantidad = document.getElementById("Editarcantidad");
            /* const carro = document.getElementById("carrosActualizar").addEventListener("click", () => {
                 Variablecategoria =
             })
             const camion = document.getElementById("CamiónActualizar").addEventListener("click", () => {
                 Variablecategoria =
             })
             const Jeepeta = document.getElementById("JeepetaActualizar").addEventListener("click", () => {
                 Variablecategoria =
             })
             const Motocicleta = document.getElementById("MotocicletaActualizar").addEventListener("click", () => {
                 Variablecategoria =
             })*/


            const btoneditar = document.getElementById("EditarEstacionamiento"); // hay que hacer lo de editar lo mas rapido posible
            editar.addEventListener("click", () => {
                if (confirm("Confirme si ya no hay vehiculos estacionados")) {
                    moda.style.display = "block";

                    btoneditar.addEventListener("click", () => {
                        event.preventDefault();
                        const data = {
                            id: element.id,
                            fk_categoria: element.fk_categoria,
                            cantidad_estacionamiento: editarcantidad.value,
                            cantidad_Total: editarcantidad.value

                        }
                        fetch("https://localhost:7137/api/AdminControllers/Actulizar%20estacionamientos", {
                            method: "PUT",
                            headers: {
                                accept: "*/*",
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(data)
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
                                alert("Actualizacion exitosa: " + data); // Muestra la respuesta del servidor
                                location.reload();
                            })
                            .catch(error => {
                                console.error("Error:", error);
                                alert("Error: " + error);
                            });

                    })
                }
                else{
                    alert("Espere a que salgan todos los vehiculos")
                }

            })




            filas.appendChild(AAAcciones);
            tableee.appendChild(filas);



        });
    })
    var cerrarmodal = document.getElementById("cerraro");
    cerrarmodal.onclick = function () {
        var modal = document.getElementById("Mymodalestacionamiento"); // Asegúrate de seleccionar el modal
        modal.style.display = "none";
    };
    
    var cerrarmodal = document.getElementById("cerrar");
    cerrarmodal.onclick = function () {
        var modal = document.getElementById("MymodalCategoria"); // Asegúrate de seleccionar el modal
        modal.style.display = "none";
    };
    