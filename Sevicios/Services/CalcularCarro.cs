using BDContext.Modelos;
using BDContext.Repositorio.InterfacesRepositorios;

using Sevicios.Interfaces_Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sevicios.Services
{
    public class CalcularCarro : calcularI
    {
        private readonly RepositoryCalcularM calcular;
        public CalcularCarro(RepositoryCalcularM calcular)
        {
            this.calcular = calcular;
        }
        public decimal Calcular(string Codigo, int categoria)
        {


            return calcular.calcularM(categoria, Codigo);
        }

      
    }
}
