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
    public class Administrador : InterfazAdmin
    {

        private readonly RepositorioAdministradores admin;
        public Administrador(RepositorioAdministradores admin)
        {
            this.admin = admin;
        }
        public string actualzarUsuarios(Iniciar_sesion usu)
        {
            if (usu != null)
            {

                return admin.actualzarUsuarios(usu);

            }
            return " ingrese un usuario valido";

        }

        public string AdminCantidadEstacionamietos(estacionamientos cantidad)
        {
            if (cantidad != null)
            {
               ;
                return admin.AdminCantidadEstacionamietos(cantidad);
            }
            return "Ingrese Un objeto que sea valido";
           
        }

        public List<estacionamientos> adminEstacionamientosDisponibles()
        {
            
            return admin.adminEstacionamientosDisponibles();
        }

        public string adminTarifas(Categoria ca)
        {
            if (ca != null)
            {
                return admin.adminTarifas(ca);
            }
            return "Ingrese un valor";
        }

        public string AggEstacionamiento(estacionamientos Estacionamientos)
        {
            if (Estacionamientos != null)
            {
                return admin.AggEstacionamiento(Estacionamientos);
            }
            return "Ingrese un valor";
        }

        public string AggNuevacategoria(Categoria categoria)
        {
            if (categoria != null)
            {
                return admin.AggNuevacategoria(categoria);
            }
            return "Ingrese un valor";
        }

        public string crearUsuarios(Iniciar_sesion usu)
        {
            if (usu!= null)
            {
                return admin.crearUsuarios(usu);
                
            }
            return "Ingrese un valor";
        }

        public string eliminarcategoriaEstacionamiento(int categoria)
        {
            if (categoria != 0)
            {
                return admin.eliminarcategoriaEstacionamiento(categoria);
            }
            return "Ingrese un valor";
        }

        public string EliminarUsuarios(int id)
        {
            if (id != 0)
            {
                return admin.EliminarUsuarios(id);
            }
            return "Ingrese un valor";
        }

        public List<Iniciar_sesion> MostrarUsuarios()
        {
            return admin.MostrarUsuarios();
        }

        public List<Categoria> Vercategorias()
        {
            return admin.Vercategorias();
        }

        public List<Vehiculos> VerdetallesDelvehiculo()
        {
           return admin.VerdetallesDelvehiculo();
        }
    }
}
