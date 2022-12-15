using Jobs_BackEnd.BusinessLogicLayer;

namespace Jobs_BackEnd.DataAccessLayer.Data.Repositories.Interfaces
{
    public interface IUserRepository
    {

        // User
        Task<IEnumerable<UserModel>> GetUsers();
        Task<UserModel> GetUser(int id);
        Task<bool> DeleteUser(int id);
        Task<bool> InsertUser(UserModel user);
        Task<bool> UpdateUser(int id, UserModel user);
        Task<UserModel> GetAthUser(string username, string password);
        Task<UserModel> GetByUsername(string username);

        //Copropietario
        Task<IEnumerable<InformationCompleteDeuda>> getCopropietariosInfoDetailDuedas();
        Task<IEnumerable<InformationCompleteDeuda>> getCopropietariosInfoDetailDuedasByCondominio(int idCondominio);

        //Condominio
        Task<IEnumerable<CondominioModel>> getCondominios();

        //Adm Expensas
        Task<IEnumerable<UserExpensaModel>> getDeudasExpensaByUser(int idUser);
    }
}
