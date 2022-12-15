using Jobs_BackEnd.BusinessLogicLayer;
using Jobs_BackEnd.DataAccessLayer.Data.Repositories.Interfaces;
using MySql.Data.MySqlClient;
using Dapper;
namespace Jobs_BackEnd.DataAccessLayer.Data.Repositories
{
  public class UserRepository : IUserRepository
    {
        private readonly MySQLConfiguration _connetionString;

        public UserRepository(MySQLConfiguration connetionString)
        {
            _connetionString = connetionString;
        }
        protected MySqlConnection dbConnection() {
            return new MySqlConnection(_connetionString.ConnectionString);
        }

        public async Task<IEnumerable<UserModel>> GetUsers()
        {
            var db = dbConnection();
            var sql = @"SELECT * FROM users";
            var query = await db.QueryAsync<UserModel>(sql, new { });
            db.Close();
            return query;
        }

        public async Task<UserModel> GetAthUser(string username, string password)
        {
            var db = dbConnection();
            var sql = @"SELECT * FROM users";
            var query = await db.QueryAsync<UserModel>(sql, new { });
            var aux = query.FirstOrDefault( e => e.Username==username && e.Password==password);

            db.Close();
            return aux;
        }
        public async Task<UserModel> GetByUsername(string username)
        {
            var db = dbConnection();
            var sql = @"SELECT * FROM users";
            var query = await db.QueryAsync<UserModel>(sql, new { });
            var aux = query.FirstOrDefault(e => e.Username == username);

            db.Close();
            return aux;
        }
        public async Task<UserModel> GetUser(int id)
        {
            var db = dbConnection();
            var sql = @"SELECT * 
                        FROM users
                        WHERE idUser= @Id";
            var query = await db.QueryFirstOrDefaultAsync<UserModel>(sql, new { Id = id });
            db.Close();
            return query;
        }
        public async Task<bool> InsertUser(UserModel user)
        {
            var db = dbConnection();
            var sql = @"INSERT INTO users(nombre, apellidoMaterno, apellidoPaterno, rol, username, password)
                        VALUES(@nombre, @apellidoMaterno, @apellidoPaterno, @rol, @username, @password)";
            var result =await db.ExecuteAsync(sql, new 
            {
                nombre = user.Nombre,
                username= user.Username,
                apellidoPaterno = user.ApellidoPaterno,
                apellidoMaterno = user.ApellidoMaterno,
                password = user.Password,
                rol= "trabajador"
            });



            db.Close();
            return result > 0;
            
        }
       
        public async Task<bool> UpdateUser(int id, UserModel user)
        {
            var db = dbConnection();
            var sql = @"UPDATE users
                        SET nombre=@nombre,
                            apellidoMaterno = @apellidoMaterno,
                            apellidoPaterno =@apellidoPaterno,
                            rol = @rol,
                            username = @username,
                            email = @email,
                            password = @password
                       WHERE idUser = @Id";
            var result = await db.ExecuteAsync(sql, new
            {
                Id=id,
                nombre = user.Nombre,
                apellidoMaterno = user.ApellidoMaterno,
                apellidoPaterno = user.ApellidoPaterno,
                rol = user.Rol,
                username = user.Username,
            });
            
            
            db.Close();
            return result > 0;
        }
        public async Task<bool> DeleteUser(int id)
        {
            var db = dbConnection();
            var sql = @"DELETE FROM users WHERE idUser=@Id";
            var query = await db.ExecuteAsync(sql, new { Id = id });
            db.Close();
            return query > 0 ;
        }

        public async Task<IEnumerable<InformationCompleteDeuda>> getCopropietariosInfoDetailDuedas()
        {
            var db = dbConnection();
            var sql = @"select td.idUser,td.idCopropietario,td.username ,td.nombre ,td.apellido_paterno,e.nombre as nombreEdif, c2.nombre as nombreCondominio,td.totalDeudas ,tde.totalDeudasExpensa
                        from totaldeudasexpensasbyuser tde
                        inner join totaldeudasbyuser td on (td.idUser = tde.idUser)
                        inner join copropietario c on (c.idUser  = tde.idUser)
                        inner join domicilio d on (d.idDomicilio = c.idDomicilio)
                        inner join edificio e on (e.idEdificio = d.idEdificio)
                        inner join condominio c2 on (c2.idCondominio = e.idCondominio)";
            var query = await db.QueryAsync<InformationCompleteDeuda>(sql, new { });
            db.Close();
            return query;
        }

        public async Task<IEnumerable<InformationCompleteDeuda>> getCopropietariosInfoDetailDuedasByCondominio(int idCondominio)
        {
            var db = dbConnection();
            var sql = @"select td.idUser,td.idCopropietario,td.username ,td.nombre ,td.apellido_paterno ,e.nombre as nombreEdif, c2.nombre as nombreCondominio,td.totalDeudas ,tde.totalDeudasExpensa,c2.nombre
                                                    from totaldeudasexpensasbyuser tde
                                                    inner join totaldeudasbyuser td on (td.idUser = tde.idUser)
                                                    inner join copropietario c on (c.idCopropietario = td.idCopropietario)
                                                    inner join domicilio d  on (d.idDomicilio  = c.idDomicilio)
                                                    inner join edificio e on (e.idEdificio = d.idEdificio)
                                                    inner join condominio c2 on (c2.idCondominio = e.idCondominio)
                                                    where c2.idCondominio =@Id";

            var query = await db.QueryAsync<InformationCompleteDeuda>(sql, new 
            {
                Id = idCondominio
            });
            db.Close();
            return query;
        }

        public async Task<IEnumerable<CondominioModel>> getCondominios()
        {
            var db = dbConnection();
            var sql = @"SELECT * FROM condominio";
            var query = await db.QueryAsync<CondominioModel>(sql, new { });
            db.Close();
            return query;
        }

        public async Task<IEnumerable<UserExpensaModel>> getDeudasExpensaByUser(int idUser)
        {
            var db = dbConnection();
            var sql = @"SELECT * 
                        FROM administracionexpensas a
                        where a.idUser =@Id";
            var query = await db.QueryAsync<UserExpensaModel>(sql, new { Id=idUser});
            db.Close();
            return query;
        }
    }
}
