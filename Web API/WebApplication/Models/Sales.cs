using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{
    public class Sales
    {
        public long SalesId { get; set; }

        public String CustomerName { get; set; }

        public String ProductName { get; set; }

        public String StoreName { get; set; }

        public String DateSold  { get; set; }

    }
}