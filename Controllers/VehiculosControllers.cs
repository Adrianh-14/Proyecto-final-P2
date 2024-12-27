using BDContext.Modelos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Sevicios.Interfaces_Services;
using System.Text.RegularExpressions;

namespace SegundoIntentoProyectoF.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VehiculosControllers : ControllerBase
    {
        private readonly IservicesAgg Services;
        public VehiculosControllers(IservicesAgg Services)
        {
            this.Services = Services;
        }
        [HttpPost("Ingresar")]
        public IActionResult ingresar(Vehiculos obj)
        {
            var resultado = Services.IngresarVehiculos(obj);
       
           
                return Ok(resultado);
        }
        [HttpGet("Vehiculos ingresados")]
        public IActionResult ver() {
        
        
        return Ok(Services.VerVehiculos());
        }

        [HttpDelete("Dar salida")]

        public IActionResult Salida(string Codigo, int categoria)
        {
            char ll;
            var resultado = Services.darsalida(Codigo, categoria);
          var primerdigito = Convert.ToString(ObtenerPrimerDigito(resultado));
            if (primerdigito =="T")
            {
                return Ok(resultado);
            }
            else
            {
                return BadRequest(resultado);
            }

        }
        static char? ObtenerPrimerDigito(string texto)
        {
            Match match = Regex.Match(texto, @"\d");
            return match.Success ? (char?)match.Value[0] : null;
        }
        [HttpPut]

        public IActionResult modif(Vehiculos vehiculo) { 
        
        return Ok(Services.ModificarV(vehiculo));
        }


    }
}
