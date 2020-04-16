using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    public class ProductController : ApiController
    {

        //For get All Records of Products
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();

            string query = @"select ProductId, ProductName, ProductPrice from dbo.Product";

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["TaskAppDB"].ConnectionString))

            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }


        //For Add the Product
        public string Post(Product pro)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @"insert into dbo.Product (ProductName, ProductPrice) 
                               values('" + pro.ProductName + @"',
                                      '" + pro.ProductPrice + @"')";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["TaskAppDB"].ConnectionString))

                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Added Successfully";
            }
            catch (Exception)
            {
                return "Failed to Add";
            }
        }


        //For Update the Product
        public string Put(Product pro)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @"update dbo.Product set ProductName = '" + pro.ProductName + @"',
                                                         ProductPrice = '" + pro.ProductPrice + @"' 
                                where ProductId =" + pro.ProductId + @" ";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["TaskAppDB"].ConnectionString))

                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Updated Successfully";
            }
            catch (Exception)
            {
                return "Failed to Update";
            }
        }


        // For Delete the Product Record
        public string Delete(int id)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @" delete from dbo.Product where ProductId =" + id;

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["TaskAppDB"].ConnectionString))

                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Deleted Successfully";
            }
            catch (Exception)
            {
                return "Failed to delete";
            }
        }
    }
}
