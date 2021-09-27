using System.Security.Claims;
using System.Linq;
using Aplicacion.Contratos;
using Microsoft.AspNetCore.Http;

namespace Seguridad
{
    public class UsuarioSesion : IUsuarioSesion
    {
        private readonly IHttpContextAccessor _httpContextAccesor;
        public UsuarioSesion(IHttpContextAccessor httpContextAccesor)
        {
            this._httpContextAccesor = httpContextAccesor;
        }
        public string ObtenerUsuarioSesion()
        {
            var userName = _httpContextAccesor.HttpContext.User?.Claims?.FirstOrDefault(x => x.Type==ClaimTypes.NameIdentifier)?.Value;
            return userName;
        }
    }
}