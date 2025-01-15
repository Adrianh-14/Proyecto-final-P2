using BDContext.Modelos;
using Sevicios.Interfaces_Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BDContext.Repositorio;
using BDContext.Repositorio.InterfacesRepositorios;

namespace Sevicios.Services
{
    public class VehiculosServices : IservicesAgg
    {
        private readonly IRepositorioCreativo<Vehiculos> Rp;
        private readonly calcularI calcular;
        public VehiculosServices(IRepositorioCreativo<Vehiculos> Rp, calcularI calcular)
        {
            this.Rp = Rp;
            this.calcular = calcular;
        }

        public string CodigoDeIngreso()
        {

            Guid miGuid = Guid.NewGuid(); //esta linea se encarga de generar un identificador unico en el
                                          //mundo (token) 
            string token = miGuid.ToString().Replace("a", "z").Substring(0, 16);
            return token;
        }

        public string darsalida(string codigo , int Categoria)
        {
            //var total = ;
            //ojo aqui falta calcular las horas
            if (codigo != null && Categoria != 0)
            {
                return "Total a pagar: " + calcular.Calcular(codigo, Categoria) + " " + Rp.Darsalida(codigo, Categoria);
            }
            else
            {
                return "Codigo o categoria invalido";
            }

        }

        public string IngresarVehiculos(Vehiculos vehiculos)
        {
            if (vehiculos != null)
            {
                vehiculos.Codigo = CodigoDeIngreso();
                return Rp.Ingresar(vehiculos);
            }
            return "objeto invalido";
        }

        public string ModificarV(Vehiculos vehiculos)
        {
            if (vehiculos != null)
                return Rp.ModificarV(vehiculos);
            else 
                return "objeto invalido";
        }

        public List<Vehiculos> VerVehiculos()
        {
           return Rp.VerOcupados();
        }
    }
}
