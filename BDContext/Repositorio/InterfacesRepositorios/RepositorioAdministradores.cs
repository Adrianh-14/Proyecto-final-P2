using BDContext.Modelos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BDContext.Repositorio.InterfacesRepositorios
{
    public interface RepositorioAdministradores
    {
        public string adminTarifas(Categoria ca);

        public List<Vehiculos> VerdetallesDelvehiculo();
        public string AggNuevacategoria(Categoria categoria);
        public string AggEstacionamiento(estacionamientos Estacionamientos);
            public string eliminarcategoriaEstacionamiento(int categoria);
        public List<estacionamientos> adminEstacionamientosDisponibles();
        public string AdminCantidadEstacionamietos(estacionamientos cantidad);


        public string crearUsuarios(Iniciar_sesion usu);
        public string actualzarUsuarios(Iniciar_sesion usu);

        public string EliminarUsuarios(int id);

        public List<Iniciar_sesion> MostrarUsuarios();


        public List<Categoria> Vercategorias();



    }
}
