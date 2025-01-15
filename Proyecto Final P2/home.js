
const table = document.getElementById("tablaV");
const url = "https://localhost:7137/api/AdminControllers/Mostrar%20Detalles%20de%20vehiculos";
var nu = 0;
fetch(url)
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
    .then(datta => {
        datta.forEach(element => {
            nu++;
            const filas = document.createElement("tr");

            const numero = document.createElement("td");
            numero.textContent = nu;
            filas.appendChild(numero);

            const placa = document.createElement("td");
            placa.textContent = element.matricula;
            filas.appendChild(placa);

            const fechaI = document.createElement("td");
            fechaI.textContent = element.fechaEntrada;
            filas.appendChild(fechaI);

            const cod = document.createElement("td");
            cod.textContent = element.codigo;
            filas.appendChild(cod);


            const tipo = document.createElement("td");
            switch (element.fk_categoria) {
                case 30:
                    tipo.textContent = "Camion";
                    filas.appendChild(tipo);
                    break;
                case 31:
                    tipo.textContent = "Carro";
                    filas.appendChild(tipo);
                    break;
                case 32:
                    tipo.textContent = "Jeepeta";
                    filas.appendChild(tipo);
                    break;
                case 33:
                    tipo.textContent = "Motocicleta";
                    filas.appendChild(tipo);
                    break;

                default:
                    tipo.textContent ="Indefinido";
                    filas.appendChild(tipo);
                    break;
            }          

            var transcurrido = calcularTiempoTranscurrido(element.fechaEntrada);
            const resultado = `Días: ${transcurrido.dias}, 
            Horas: ${transcurrido.horas}, 
            Minutos: ${transcurrido.minutos}, 
            Segundos: ${transcurrido.segundos}`;
            const tiempo = document.createElement("td");
            tiempo.textContent = resultado;
            filas.appendChild(tiempo)

            const estacionamiento = document.createElement("td");
            estacionamiento.textContent = "C"+nu
                filas.appendChild(estacionamiento);
            table.appendChild(filas);

        });
    }
    );
function calcularTiempoTranscurrido(fechaInicial) {
    const fechaInicio = new Date(fechaInicial); // Convierte la fecha a un objeto Date
    const fechaActual = new Date(); // Fecha y hora actuales

    // Diferencia en milisegundos
    const diferencia = fechaActual - fechaInicio;

    // Convertir milisegundos a unidades legibles
    const segundos = Math.floor(diferencia / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    return {
        dias: dias,
        horas: horas % 24,
        minutos: minutos % 60,
        segundos: segundos % 60
    };
}

function parqueos() {
    
}

