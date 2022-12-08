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
            var sql = @"INSERT INTO users(nombre, apellidoMaterno, apellidoPaterno, rol, username, email, password)
                        VALUES(@nombre, @apellidoMaterno, @apellidoPaterno, @rol, @username, @email, @password)";
            var result =await db.ExecuteAsync(sql, new 
            {
                nombre = user.Nombre,
                apellidoMaterno = user.ApellidoMaterno,
                apellidoPaterno = user.ApellidoPaterno,
                rol= user.Rol,
                username= user.Username,
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

      

    }
}
