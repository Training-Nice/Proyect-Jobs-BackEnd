namespace Jobs_BackEnd.BusinessLogicLayer
{
    public class UserExpensaModel
    {
        public int idexpensa { get; set; }
        public int idUser { get; set; }
        public string descripcion { get; set; }
        public DateTime fecha { get; set; }
        public string estado { get; set; }
        public int monton { get; set; }
    }
}
