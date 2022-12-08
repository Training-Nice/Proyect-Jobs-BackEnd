namespace Jobs_BackEnd.BusinessLogicLayer
{
    public class UserModel
    {
        public long? IdUser { get; set; }
        public String Nombre { get; set; }
        public String Username { get; set; }
        public String ApellidoPaterno { get; set; }
        public String ApellidoMaterno { get; set; }
        public String Email { get; set; }
        public String Rol { get; set; }
        public String Password { get; set; }
        public UserModel()
        {
            Rol = "employee";
        }
    }
}
