using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BDContext.Modelos
{
    public interface Interface1
    {
        public string Codigo { get; set; }
        public DateTime FechaEntrada {  get; set; }
        public int Fk_categoria { get; set; }

    }
}
