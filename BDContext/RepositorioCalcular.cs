using BDContext.ContextBD;
using BDContext.Modelos;
using BDContext.Repositorio.InterfacesRepositorios;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BDContext
{
    public class RepositorioCalcular : TarifasI, RepositoryCalcularM
    {


        private ParqueoContext access;
        private DbSet<Categoria> Modelo;
        private DbSet<Vehiculos> Vehiculos;

        public RepositorioCalcular(ParqueoContext access)
        {
            this.access = access;
            this.Modelo = access.Set<Categoria>();
            this.Vehiculos = access.Set<Vehiculos>();
        }

        public decimal calcularM(int categoria, string codigo)
        {
            var VehiculosF = Vehiculos.FirstOrDefault(n => n.Codigo == codigo);

            if (VehiculosF == null)
            {
                return 0; // Vehículo no encontrado
            }

            DateTime fechaI = VehiculosF.FechaEntrada;
            DateTime fechaActual = DateTime.Now; // Obtener la fecha actual
            TimeSpan totalTiempo = fechaActual - fechaI; // Calcular la diferencia

            // Si la fecha de entrada es futura, no se puede calcular
            if (totalTiempo.TotalMinutes < 0)
            {
                return 0; // La fecha de entrada no puede ser futura
            }

            var categoriaF = Modelo.Find(categoria);

            if (categoriaF == null)
            {
                return 0; // Categoría no encontrada
            }

            decimal Pago = categoriaF.Tarifas;
            decimal TotalAPagar = 0;

            // Calcular las horas a pagar según la lógica especificada
            if (totalTiempo.TotalMinutes > 15)
            {
                // Calcular horas a pagar
                int horasAPagar = (int)Math.Ceiling((totalTiempo.TotalMinutes - 15) / 60.0);
                TotalAPagar = Pago * horasAPagar;
            }

            return TotalAPagar;
        }




    }
}
