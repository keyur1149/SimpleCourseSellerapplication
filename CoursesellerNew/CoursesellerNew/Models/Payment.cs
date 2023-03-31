namespace Onlinecourseseller.Models
{
    public class Payment
    {
        public int PaymentId { get; set; }

        public string Method { get; set; }
        public int s_Id { get; set; } 

        public int Total_price { get; set; }    

    }
}
