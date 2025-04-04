using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BDContext.Modelos
{
    public class posicion
    {
        public int Id { get; set; }
        public int fk_parqueo { get; set; }
        public int fk_vehiculos { get; set; }

        public string parqueo { get; set; }

    }
}
