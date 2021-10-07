using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Aplicacion.ManejadorError;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Aplicacion.Seguridad
{
    public class RolEliminar
    {
        public class Ejecuta : IRequest
        {
            public string Nombre { get; set; }
        }

        public class EjecutaValida : AbstractValidator<Ejecuta>
        {
            public EjecutaValida()
            {
                RuleFor(x => x.Nombre).NotEmpty();
            }
        }

        public class Manejador : IRequestHandler<Ejecuta>
        {
            private readonly RoleManager<IdentityRole> _rolManager;
            public Manejador(RoleManager<IdentityRole> roleManager)
            {
                this._rolManager = roleManager;
            }
            public async Task<Unit> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var role = await _rolManager.FindByNameAsync(request.Nombre);
                if(role == null)
                {
                    throw new ManejadorExcepcion(HttpStatusCode.BadRequest, new {mensaje = "No existe el rol."});
                }
                var resultado = await _rolManager.DeleteAsync(role);
                if(resultado.Succeeded)
                {
                    return Unit.Value;
                }
                throw new System.Exception("No se pudo eliminar el rol");
            }
        }
    }
}