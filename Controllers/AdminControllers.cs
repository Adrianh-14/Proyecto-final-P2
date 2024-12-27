using BDContext.Modelos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Sevicios.Interfaces_Services;

namespace SegundoIntentoProyectoF.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminControllers : ControllerBase
    {
        private readonly InterfazAdmin admin;
        public AdminControllers(InterfazAdmin admin)
        {
            this.admin = admin;
        }

        [HttpGet("Mostrar Detalles de vehiculos")]
        public IActionResult detallesVehiculos()
        {
            return Ok(admin.VerdetallesDelvehiculo());
        }

        [HttpGet("ver usuarios")]
        public IActionResult verUsuario()
        {
            return Ok(admin.MostrarUsuarios());
        }


        [HttpPost("Crear usuarios")]
        public IActionResult crarUsarios(Iniciar_sesion usu)
        {
            var crearusu = admin.crearUsuarios(usu);
            if (crearusu == "el usuario " + usu.usuario + " fue creado exitosamente")
            {
                return Ok(crearusu);
            }
            return BadRequest(crearusu);

        }

        [HttpGet("Parqueos disponibles")]
        public IActionResult MostrarEstacionamientosDisponibles() { 
        
        return Ok(admin.adminEstacionamientosDisponibles());
        }

        [HttpPut("Actualizar Tarifas")]
        public IActionResult actualizar(Categoria ca)
        {
            var resultado = admin.adminTarifas(ca);
            if (resultado == "Actualizado correctamente")
            {
                return Ok(resultado);

            }
            return BadRequest(resultado);


        }
        [HttpDelete("Eliminar categorias")]
        public IActionResult eliminar(int IdCategoria)
        {
            var eliminar = admin.eliminarcategoriaEstacionamiento(IdCategoria);
            if (eliminar == "Categoria eliminada exitosamente")
            {
                return Ok(eliminar);
            }
            return BadRequest(eliminar);
        }

        [HttpPut("Actualizar usuarios")]
        public IActionResult actualizarUsuarios(Iniciar_sesion usu)
        {
            var actualizar = admin.actualzarUsuarios(usu);
            if (actualizar == "se ha modificado el usario " + usu.usuario)
            {
                return Ok(actualizar);
            }
            return BadRequest(actualizar);
        }

        [HttpDelete("Eliminar Usuarios")]
        public IActionResult eliminarUsuarios(int IdUsuarios)
        {
            var eliminar = admin.EliminarUsuarios(IdUsuarios);
            if (eliminar == "El usuario se ha eliminado correctamente")
            {
                return Ok(eliminar);
            }
            return BadRequest(eliminar);
        }
        [HttpPut("Actulizar estacionamientos")]
        public IActionResult actualizarEstacionamientos(estacionamientos Estacionamiento)
        {
            var actualizar = admin.AdminCantidadEstacionamietos(Estacionamiento);
            if (actualizar == "Editado correctamente")
            {
                return Ok(actualizar);
            }
            return BadRequest(actualizar);

        }
        [HttpPost("crear nueva categoria")]
        public IActionResult crearCategoria(Categoria categoria)
        {

            var resultado = admin.AggNuevacategoria(categoria);
            if (resultado == "Agg correctamente")
            {
                return Ok(resultado);
            }
            return BadRequest(resultado);
        }
        [HttpPost("crear nueva estacionamiento")]
        public IActionResult crearEstacionamiento(estacionamientos Estacionamiento)
        {

            var resultado = admin.AggEstacionamiento(Estacionamiento);
            if (resultado == "Agg correctamente")
            {
                return Ok(resultado);
            }
            return BadRequest(resultado);
        }

        [HttpGet("Ver categorias")]
        public IActionResult verCategorias()
        {
            return Ok(admin.Vercategorias());
        }
    }
}
