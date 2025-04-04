using Sevicios.Interfaces_Services;
using Sevicios.Services;
using BDContext.Repositorio;
using BDContext.Repositorio.InterfacesRepositorios;
using BDContext.ContextBD;
using BDContext;

namespace SegundoIntentoProyectoF
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Configurar CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("MiPoliticaCORS", builder =>
                {
                    builder.WithOrigins("http://127.0.0.1:3000") // Asegúrate de no incluir la barra final
                           .AllowAnyMethod() // Permitir cualquier método HTTP
                           .AllowAnyHeader(); // Permitir cualquier encabezado HTTP
                });
            });

            // Agregar servicios al contenedor
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddScoped<IservicesAgg, VehiculosServices>();
            builder.Services.AddScoped(typeof(IRepositorioCreativo<>), typeof(RepositorioCreativo<>));
            builder.Services.AddScoped<RepositoryCalcularM, RepositorioCalcular>();
            builder.Services.AddScoped<RepositorioAdministradores, AdminReposotirio>();
            builder.Services.AddScoped<InterfazAdmin, Administrador>();
            builder.Services.AddScoped<calcularI, CalcularCarro>();
            builder.Services.AddSqlServer<ParqueoContext>(builder.Configuration.GetConnectionString("Conneccio"));
            

            var app = builder.Build();

            // Aplicar la política de CORS
            app.UseCors("MiPoliticaCORS");

            // Configurar el pipeline de la aplicación
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
