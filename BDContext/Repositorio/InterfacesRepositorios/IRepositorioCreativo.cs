using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BDContext.Repositorio.InterfacesRepositorios
{
    public interface IRepositorioCreativo<T> where T : class
    {
        public string Ingresar(T obj);
        public List<T> VerOcupados();

        public string ModificarV(T obj);

        public string Darsalida(string codigo, int categoria);

    }
}
