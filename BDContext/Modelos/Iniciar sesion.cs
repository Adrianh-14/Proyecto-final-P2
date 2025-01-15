using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BDContext.Modelos
{
    public class Iniciar_sesion
    {
        public int Id { get; set; }
        public string usuario { get; set; }
        public string pass { get; set; }
        public string TipoUsuario { get; set; }
    }
}
