using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BDContext.Modelos;

namespace Sevicios.Interfaces_Services
{
    public interface IservicesAgg
    {
        public string IngresarVehiculos(Vehiculos vehiculos);
        public string CodigoDeIngreso();

        public List<Vehiculos>VerVehiculos();

        public string ModificarV(Vehiculos vehiculos);

        public string darsalida(string codigo, int categoria);
    }
}
