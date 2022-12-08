using Jobs_BackEnd.BusinessLogicLayer;

namespace Jobs_BackEnd.DataAccessLayer.Data.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<UserModel>> GetUsers();
        Task<UserModel> GetUser(int id);
        Task<bool> DeleteUser(int id);
        Task<bool> InsertUser(UserModel user);
        Task<bool> UpdateUser(int id, UserModel user);
        Task<UserModel> GetAthUser(string username, string password);

    }
}
