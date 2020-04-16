using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{
    public class Product
    {
        public long ProductId { get; set; }

        public string ProductName { get; set; }

        public decimal ProductPrice { get; set; }
    }
}