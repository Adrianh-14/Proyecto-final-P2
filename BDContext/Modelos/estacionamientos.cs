using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BDContext.Modelos
{
    public class estacionamientos
    {
        public int Id { get; set; }
        public int fk_categoria { get; set; }
        public int cantidad_estacionamiento { get; set; }
        public int Cantidad_Total { get; set; }
    }
}
