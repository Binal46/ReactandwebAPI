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
    public class SalesController : ApiController
    {

        //For Get All Records from Sales 
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();

            string query = @"select SalesId, CustomerName, ProductName, StoreName, 
                            convert(varchar(10),DateSold, 120) as DateSold from dbo.Sales order by SalesId";

            //string query = @"select SalesId, CustomerName, ProductName, StoreName, 
             //                DateSold from dbo.Sales";

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["TaskAppDB"].ConnectionString))

            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }


        //For Add the Sales
        public string Post(Sales sal)
        {
            try
            {
                DataTable table = new DataTable();

                string datesold = sal.DateSold.ToString().Split(' ')[0];

                string query = @"insert into dbo.Sales (CustomerName, ProductName, StoreName, DateSold) 
                               values('" + sal.CustomerName + @"',
                                      '" + sal.ProductName + @"',
                                      '" + sal.StoreName + @"',
                                      '" + datesold + @"')";

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


        //For Update the Sales
        public string Put(Sales sal)
        {
            try
            {
                DataTable table = new DataTable();


                string query = @"update dbo.Sales set CustomerName = '" + sal.CustomerName + @"',
                                                         ProductName = '" + sal.ProductName + @"',
                                                         StoreName = '" + sal.StoreName + @"',
                                                         DateSold = '" +sal.DateSold + @"'
                                where SalesId =" + sal.SalesId + @" ";

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

        // For Delete the Sales Record
        public string Delete(int id)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @" delete from dbo.Sales where SalesId =" + id;

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
