using System.Data.Common;
using System.Reflection.Metadata;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using Dapper;
using System.Data;
using System.Linq;

namespace Persistencia.DapperConexion.Paginacion
{
    public class PaginacionRepository : IPaginacion
    {
        private readonly IFactoryConnection _factoryConnection;
        public PaginacionRepository(IFactoryConnection factoryConnection)
        {
            this._factoryConnection = factoryConnection;
        }
        public async Task<PaginacionModel> devolverPaginacion(string storeProcedure, 
            int numeroPagina, int cantidadElementos, IDictionary<string, object> parametrosFiltro, 
            string ordenamientoColumna)
        {
            var paginacionModel = new PaginacionModel();
            List<IDictionary<string, object>> listaReporte = null;
            var totalRecords = 0;
            var totalPaginas = 0;
            try
            {
                var connection = _factoryConnection.GetConnection();
                DynamicParameters parametros = new DynamicParameters();
                foreach (var param in parametrosFiltro)
                {
                    parametros.Add("@" + param.Key, param.Value);
                }
                //Parametros entrada
                parametros.Add("@NumeroPagina", numeroPagina);
                parametros.Add("@CantidadElementos", cantidadElementos);
                parametros.Add("@Ordenamiento", ordenamientoColumna);
                //Parametros de vuelta
                parametros.Add("@TotalRecords", totalRecords, DbType.Int32, ParameterDirection.Output);
                parametros.Add("@TotalPaginas", totalPaginas, DbType.Int32, ParameterDirection.Output);
                var result = await connection.QueryAsync(storeProcedure, parametros, commandType : CommandType.StoredProcedure);
                listaReporte = result.Select(x => (IDictionary<string, object>)x).ToList();
                paginacionModel.ListaRecords = listaReporte;
                paginacionModel.NumeroPaginas = parametros.Get<int>("@TotalPaginas");
                paginacionModel.TotalRecords = parametros.Get<int>("@TotalRecords");
            }
            catch (Exception e)
            {
                throw new Exception("No se pudo ejecutar el procedimiento almacenado", e);
            }
            finally
            {
                _factoryConnection.CloseConnection();
            }
            return paginacionModel;

        }
    }
}