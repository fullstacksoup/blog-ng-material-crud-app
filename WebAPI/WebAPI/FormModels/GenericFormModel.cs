using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FileUploadAPI.FormModels
{
    public class GenericFormModel
    {
        public string Text { get; set; }
        public string Number   { get; set; }
        public string Boolean { get; set; }
        public string JSDate { get; set; }
        public string JSDateTime { get; set; }
        
    }
}
