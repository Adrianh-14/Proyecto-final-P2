using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BDContext.Modelos
{
    public class Categoria : TarifasI
    {
        public int Id { get; set; }
        public string Categorias { get; set; }
        public decimal Tarifas { get; set; }

    }
}
