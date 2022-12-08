namespace Jobs_BackEnd.DataAccessLayer.Data.Repositories
{
    public class MySQLConfiguration
    {
        public string ConnectionString { get; set; }

        public MySQLConfiguration(string connectionString)
        {
            ConnectionString = connectionString;
        }

    }
}