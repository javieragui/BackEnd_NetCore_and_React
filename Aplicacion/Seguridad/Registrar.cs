using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Aplicacion.Contratos;
using Dominio;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Persistencia;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Aplicacion.ManejadorError;
using System;
using FluentValidation;

namespace Aplicacion.Seguridad
{
    public class Registrar
    {
        public class Ejecuta : IRequest<UsuarioData>
        {
            public string Nombre { get; set; }
            public string Apellidos { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string Username { get; set; }
        }

        public class EjecutaValidador : AbstractValidator<Ejecuta>
        {
            public EjecutaValidador()
            {
                RuleFor(x => x.Nombre).NotEmpty();
                RuleFor(x => x.Apellidos).NotEmpty();
                RuleFor(x => x.Email).NotEmpty();
                RuleFor(x => x.Password).NotEmpty();
                RuleFor(x => x.Username).NotEmpty();
            }
        }

        public class Manejador : IRequestHandler<Ejecuta, UsuarioData>
        {
            private readonly CursosOnlineContext _context;
            private readonly UserManager<Usuario> _userManager;
            private readonly IJwtGenerador _jwtGenerador;
            public Manejador(CursosOnlineContext context, UserManager<Usuario> userManager, IJwtGenerador jwtGenerador)
            {
                this._context = context;
                this._userManager = userManager;
                this._jwtGenerador = jwtGenerador;
            }

            public async Task<UsuarioData> Handle(Ejecuta request, CancellationToken cancellationToken)
            {
                var existe = await _context.Users.Where(x => x.Email == request.Email).AnyAsync();
                if(existe)
                {
                    throw new ManejadorExcepcion(HttpStatusCode.BadRequest, new 
                    {
                        mensaje = "Existe un usuario registrado con este email"
                    });
                }
                var existeUsername = await _context.Users.Where(x => x.UserName == request.Username).AnyAsync();
                if(existeUsername)
                {
                    throw new ManejadorExcepcion(HttpStatusCode.BadRequest, new { mensaje = "Ya existe un usuario con ese username"});
                }
                var usuario = new Usuario
                {
                    NombreCompleto = $"{request.Nombre} {request.Apellidos}",
                    Email = request.Email,
                    UserName = request.Username
                };
                var resultado = await _userManager.CreateAsync(usuario, request.Password);
                return resultado.Succeeded ? new UsuarioData
                { 
                    NombreCompleto = usuario.NombreCompleto,
                    Email = usuario.Email,
                    Username = usuario.UserName,
                    Token = _jwtGenerador.CrearToken(usuario, null)
                } : throw new Exception("No se pudo agregar al nuevo usuario");
            }
        }
    }
}