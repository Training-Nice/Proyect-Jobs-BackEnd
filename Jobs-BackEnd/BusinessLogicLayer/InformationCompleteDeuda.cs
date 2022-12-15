namespace Jobs_BackEnd.BusinessLogicLayer
{
    public class InformationCompleteDeuda
    {
        public int idUser { get; set; }
        public int idCopropietario { get; set; }
        public string username { get; set; }
        public string nombre { get; set; }
        public string apellido_paterno { get; set; }
        public string nombreEdif { get; set; }
        public string nombreCondominio { get; set; }
        public int totalDeudas { get; set; }
        public int totalDeudasExpensa { get; set; }
    }
}
