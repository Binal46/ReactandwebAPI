using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{
    public class Store
    {
        public long StoreId { get; set; }

        public string StoreName { get; set; }

        public string StoreAddress { get; set; }
    }
}