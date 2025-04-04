using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BDContext.Modelos
{
    public class Vehiculos : Interface1
    {
        public int Id { get; set; }
        public string Matricula { get; set; }

        public string Codigo { get; set; }
        public int Fk_categoria { get; set; }
        public DateTime FechaEntrada { get; set; }
        public DateTime FechaSalida { get; set; }

        public decimal Saldo { get; set; } = 0;

    }
}
