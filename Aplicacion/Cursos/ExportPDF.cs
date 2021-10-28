using System.IO;
using System.Threading;
using System.Threading.Tasks;
using iTextSharp.text;
using iTextSharp.text.pdf;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistencia;

namespace Aplicacion.Cursos
{
    public class ExportPDF
    {
        public class Consulta : IRequest<Stream>
        {

        }

        public class Manejador : IRequestHandler<Consulta, Stream>
        {
            private readonly CursosOnlineContext _context;
            public Manejador(CursosOnlineContext context)
            {
                this._context = context;
            }
            public async Task<Stream> Handle(Consulta request, CancellationToken cancellationToken)
            {
                //Crear nuestro PDF
                var fuenteTitulo = new Font(Font.HELVETICA, 8f, Font.BOLD, BaseColor.Blue);
                var fuenteHeader = new Font(Font.HELVETICA, 7f, Font.BOLD, BaseColor.Black);
                var fuenteData = new Font(Font.HELVETICA, 7f, Font.NORMAL, BaseColor.Black);
                var cursos = await _context.Curso.ToListAsync();
                var workStream = new MemoryStream();
                var rect = new Rectangle(PageSize.A4);
                var document = new Document(rect, 0, 0, 50, 100);
                var writer = PdfWriter.GetInstance(document, workStream);
                writer.CloseStream = false;
                //Se empieza a crear el contenido del PDF hasta el .Close()
                document.Open();
                document.AddTitle("Lista de Cursos en la Universidad");
                var tabla = new PdfPTable(1);
                tabla.WidthPercentage = 90;
                var celda = new PdfPCell(new Phrase("Lista de Cursos de SQL Server", fuenteTitulo));
                celda.Border = Rectangle.NO_BORDER;
                tabla.AddCell(celda);
                document.Add(tabla);
                var tablaCursos = new PdfPTable(2);
                var widths = new float[]{40, 60};
                tablaCursos.SetWidthPercentage(widths, rect);
                var celdaHeaderTitulo = new PdfPCell(new Phrase("Curso", fuenteHeader));
                tablaCursos.AddCell(celdaHeaderTitulo);
                var celdaHeaderDescripcion = new PdfPCell(new Phrase("Descripción", fuenteHeader));
                tablaCursos.AddCell(celdaHeaderDescripcion);
                tablaCursos.WidthPercentage = 90;
                foreach (var curso in cursos)
                {
                    var celdaDataTitulo = new PdfPCell(new Phrase(curso.Titulo, fuenteData));
                    tablaCursos.AddCell(celdaDataTitulo);
                    var celdaDataDescripcion = new PdfPCell(new Phrase(curso.Descripcion, fuenteData));
                    tablaCursos.AddCell(celdaDataDescripcion);
                }
                document.Add(tablaCursos);
                document.Close();
                //Convertir nuestro pdf a formato string
                var byteData = workStream.ToArray();
                workStream.Write(byteData, 0, byteData.Length);
                workStream.Position = 0;
                return workStream;
            }
        }
    }
}