namespace FastFood.Web.ViewModels.Orders
{
    public class CreateOrderInputModel
    {
        public string Customer { get; set; }

        public int ItemId { get; set; }

        public string ItemName { get; set; }

        public int EmployeeId { get; set; }

        public string EmployeeName { get; set; }

        public int Quantity { get; set; }

        public string OrderType { get; set; }
    }
}
