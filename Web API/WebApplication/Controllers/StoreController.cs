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
    public class StoreController : ApiController
    {
        // For Get All Stores Record
        public HttpResponseMessage Get()
        {
            DataTable table = new DataTable();

            string query = @"select StoreId, StoreName, StoreAddress from dbo.Store";

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["TaskAppDB"].ConnectionString))

            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }


        //For Add the Store record
        public string Post(Store sto)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @"insert into dbo.Store (StoreName, StoreAddress) 
                               values('" + sto.StoreName + @"',
                                      '" + sto.StoreAddress + @"')";

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

        //For Update the Store
        public string Put(Store sto)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @"update dbo.Store set StoreName = '" + sto.StoreName + @"',
                                                         StoreAddress = '" + sto.StoreAddress + @"' 
                                where StoreId =" + sto.StoreId + @" ";

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


        // For Delete the Store Record
        public string Delete(int id)
        {
            try
            {
                DataTable table = new DataTable();

                string query = @" delete from dbo.Store where StoreId =" + id;

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
