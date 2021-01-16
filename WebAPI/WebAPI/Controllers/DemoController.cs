using FileUploadAPI.FormModels;
using FileUploadAPI.Models;
using FileUploadAPI.Utilities;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace FileUploadAPI.Controllers
{

    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/demo")]
    public class DemoController : ApiController
    {

        // *********************************************************************************
        // A D D   R E C O R D
        // *********************************************************************************       

        [HttpPost]
        [Route("add")]
        public object addRecord(GenericFormModel form)
        {
            DateTime today = DateTime.Today;
            try
            {
                using (DemoEntities db = new DemoEntities())
                {
                    // Read the form data.

                    GenericTable addRecordForm = new GenericTable();
                    addRecordForm.Text = form.Text;
                    addRecordForm.Number = int.Parse(form.Number);
                    addRecordForm.Boolean = Boolean.Parse(form.Boolean);
                    addRecordForm.JSDate = DateTime.Parse(form.JSDate);
                    //addRecordForm.JSDateTime = DateTime.Parse(form.JSDateTime);

                    db.GenericTables.Add(addRecordForm);
                    db.SaveChanges();

                    return Ok("Successfully Added Record To Database");
                }

            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // *********************************************************************************
        // U P D A T E   R E C O R D
        // *********************************************************************************       

        [HttpPost]
        [Route("update")]
        public object updateRecord(UpdateGenericFormModel form)
        {
            DateTime today = DateTime.Today;
            try
            {
                using (DemoEntities db = new DemoEntities())
                {
                    // Read the form data.
                    GenericTable updateRecordForm = db.GenericTables.Find(form.Id);
                    updateRecordForm.Text = form.Text;
                    updateRecordForm.Number = int.Parse(form.Number);
                    updateRecordForm.Boolean = Boolean.Parse(form.Boolean);
                    updateRecordForm.JSDate = DateTime.Parse(form.JSDate);
                    updateRecordForm.JSDateTime = DateTime.Parse(form.JSDateTime);

                    db.GenericTables.Add(updateRecordForm);
                    db.SaveChanges();

                    return Ok("Successfully Added Record To Database");
                }

            }
            catch (System.Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // *********************************************************************************
        // G E T   A L L   R E C O R D
        // *********************************************************************************       

        [HttpGet]
        [Route("getall")]
        public object getAllRecords()
        {
            try
            {
                using (DemoEntities db = new DemoEntities())
                {

                    var queryResults = db.GenericTables.ToList();

                    return new { status = StatusCodes.OK.code, msg = StatusCodes.OK.msg, data = queryResults };
                }
            }
            catch (System.Exception e)
            {
                return new { status = StatusCodes.NotFound.code, msg = e.InnerException, data = 0 };
            }
        }


        // *********************************************************************************
        // G E T   S I N G L E   R E C O R D
        // *********************************************************************************       

        [HttpGet]
        [Route("getsinglerecord/{id}")]
        public object getSingleRecord(int id)
        {
            try
            {
                using (DemoEntities db = new DemoEntities())
                {
                    var queryResults = db.GenericTables.Find(id);
                    db.GenericTables.Remove(queryResults);
                    db.SaveChanges();
                    return new { status = StatusCodes.OK.code, msg = "Success! Image Record Removed" };
                }
            }
            catch (System.Exception e)
            {
                return new { status = StatusCodes.NotFound.code, msg = e.InnerException };
            }
        }

        // *********************************************************************************
        // R E M O V E   R E C O R D
        // *********************************************************************************       

        [HttpGet]
        [Route("remove/{id}")]
        public object removeRecord(int id)
        {
            try
            {
                using (DemoEntities db = new DemoEntities())
                {
                    var queryResults = db.GenericTables.Find(id);
                    db.GenericTables.Remove(queryResults);
                    db.SaveChanges();
                    return new { status = StatusCodes.OK.code, msg = "Success! Image Record Removed" };
                }
            }
            catch (System.Exception e)
            {
                return new { status = StatusCodes.NotFound.code, msg = e.InnerException };
            }
        }
    }
}

