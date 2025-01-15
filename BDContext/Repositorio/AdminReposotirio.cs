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
    public class AdminReposotirio : RepositorioAdministradores
    {
        private readonly ParqueoContext contexto;
        private readonly DbSet<Categoria> Categoria;
        private readonly DbSet<estacionamientos> estacionamientos;
        private readonly DbSet<Vehiculos> vehiculos;
        private readonly DbSet<Iniciar_sesion> usuarios;


        public AdminReposotirio(ParqueoContext contexto)
        {
            this.contexto = contexto;
            this.vehiculos = contexto.Set<Vehiculos>();
            this.estacionamientos = contexto.Set<estacionamientos>();
            this.Categoria = contexto.Set<Categoria>();
            this.usuarios = contexto.Set<Iniciar_sesion>();

        }
        public string  AdminCantidadEstacionamietos(estacionamientos cantidad)
        {
         
            var editar = estacionamientos.Entry(cantidad).State = EntityState.Modified;
            contexto.SaveChanges();

            return "Editado correctamente" ;
           
        }
        public string AggNuevacategoria(Categoria categoria)
        {
   Categoria.Add(categoria);
            contexto.SaveChanges();
            return "Agg correctamente";

        }
        public string AggEstacionamiento(estacionamientos Estacionamientos)
        {
            estacionamientos.Add(Estacionamientos);
            contexto.SaveChanges();
            return "Agg correctamente";

        }
        public string eliminarcategoriaEstacionamiento(int categoria)
        {
            var resultadoCategoria = Categoria.Find(categoria);
           var resultadoEstacionamiento = estacionamientos.FirstOrDefault(cod => cod.fk_categoria == categoria);
            Categoria.Remove(resultadoCategoria);
            estacionamientos.Remove(resultadoEstacionamiento);
            contexto.SaveChanges();

            return "Categoria eliminada exitosamente";

        }



        public List<estacionamientos>  adminEstacionamientosDisponibles()
        {

            return estacionamientos.ToList();
        }

        public string adminTarifas(Categoria ca)
        {
            var categoriaActualizar = Categoria.Entry(ca).State = EntityState.Modified;
            contexto.SaveChanges();

            return "Actualizado correctamente";
        }

        public List<Vehiculos> VerdetallesDelvehiculo()
        {
            return vehiculos.ToList();      
        }

        public string crearUsuarios(Iniciar_sesion usu)
        {
            usuarios.Add(usu);
            contexto.SaveChanges();

            return "el usuario " + usu.usuario + " fue creado exitosamente";

        }

        public string actualzarUsuarios(Iniciar_sesion usu)
        {
            var actualizarUsu = usuarios.Entry(usu).State = EntityState.Modified;
            contexto.SaveChanges();
            return "se ha modificado el usario " + usu.usuario;
        }

        public string EliminarUsuarios(int id)
        {
            var buscar = usuarios.Find(id);
            usuarios.Remove(buscar);
            contexto.SaveChanges();

            return "El usuario se ha eliminado correctamente";
                }

        public List<Iniciar_sesion> MostrarUsuarios()
        {
           return usuarios.ToList();
        }

        public List<Categoria> Vercategorias()
        {
            return Categoria.ToList();
        }
    }
}
