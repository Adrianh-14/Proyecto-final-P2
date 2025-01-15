using BDContext.ContextBD;
using BDContext.Modelos;
using BDContext.Repositorio.InterfacesRepositorios;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BDContext.Repositorio
{
    public class RepositorioCreativo<T> : IRepositorioCreativo<T> where T : class , Interface1
    {
        private readonly ParqueoContext contex;
        private readonly DbSet<T> dbSet;
        private readonly DbSet<estacionamientos> estacionamientos;

        public RepositorioCreativo(ParqueoContext contex)
        {
            this.contex = contex;
            this.dbSet=contex.Set<T>();
            this.estacionamientos = contex.Set<estacionamientos>();


        }

        public string Darsalida(string codigo , int categoria)
        {
            
                var busqueda = dbSet.FirstOrDefault(cod => cod.Codigo == codigo);
            var CantidadEstacionamiento = estacionamientos.FirstOrDefault(cod => cod.fk_categoria == categoria);
            int cantidadP = CantidadEstacionamiento.cantidad_estacionamiento++;
                dbSet.Remove(busqueda);
                contex.SaveChanges();

                return $"El vehiculo con el codigo {codigo} fue retirado";
          
           
        }

        public string Ingresar(T obj)
        {

            var CantidadEstacionamiento = estacionamientos.FirstOrDefault(cod => cod.fk_categoria == obj.Fk_categoria);
           int cantidadP = CantidadEstacionamiento.cantidad_estacionamiento--;

            if (cantidadP > 0)
            {
                dbSet.Add(obj);
                contex.SaveChanges();
                string cd = obj.Codigo;
               
                return $"Su codigo de retiro es: {obj.Codigo}";
            }
            else
            {

                return "No hay parqueos disponibles";
            }
           
            
        }

        public string ModificarV(T obj)
        {
           dbSet.Entry(obj).State = EntityState.Modified;
            contex.SaveChanges();
            return "Modificacion exitosa";
        }

        public List<T> VerOcupados()
        {
           return dbSet.ToList();
        }
    }
}
