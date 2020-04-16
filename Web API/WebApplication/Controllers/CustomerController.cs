using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication.Models;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;


namespace WebApplication.Controllers
{
    public class CustomerController : ApiController
    {

        //For Get All Records from Customer 
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();

            string query = @"select CustomerId, CustomerName, CustomerAddress from dbo.Customer";

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["TaskAppDB"].ConnectionString)) 

            using (var cmd = new SqlCommand(query,con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        //For Add the Customer
        public string Post(Customer cus)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @"insert into dbo.Customer (CustomerName, CustomerAddress) 
                               values('"+cus.CustomerName + @"',
                                      '" +cus.CustomerAddress + @"')";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["TaskAppDB"].ConnectionString))

                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return "Added Successfully";
            }
            catch(Exception)
            {
                return "Failed to Add";
            }
        }


        //For Update the Customer
        public string Put(Customer cus)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @"update dbo.Customer set CustomerName = '" +cus.CustomerName + @"',
                                                         CustomerAddress = '" +cus.CustomerAddress + @"' 
                                where CustomerId =" + cus.CustomerId +@" ";

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

        // For Delete the Customer Record
        public string Delete(int id)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @" delete from dbo.Customer where CustomerId =" +id ;

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
