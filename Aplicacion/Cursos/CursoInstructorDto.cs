using System;
using Dominio;

namespace Aplicacion.Cursos
{
    public class CursoInstructorDto
    {
        public Guid InstructorId { get; set; }
        public Curso CursoId { get; set; }
    }
}