namespace Onlinecourseseller.Models
{
    public class Order
    {
        public int Id { get; set; }
        public int P_id { get; set; }

        public int Course_id { get; set; }
        public int Qty { get; set;}
        public int Price { get; set; }



    }
}
