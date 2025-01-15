using BDContext.Modelos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BDContext.ContextBD
{
    public class ParqueoContext : DbContext
    {
        public ParqueoContext(DbContextOptions<ParqueoContext>db): base(db)
        {
            
        }
        public DbSet<Vehiculos> Vehiculos { get; set; }

        public  DbSet<Categoria> Categorias { get; set; }

        public DbSet<estacionamientos> estacionamientos { get; set; }

        public DbSet<posicion> posicions { get; set; }

        public DbSet<Iniciar_sesion> iniciarSesion { get; set; }

    }
}
