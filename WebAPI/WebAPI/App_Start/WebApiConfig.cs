﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace FileUploadAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Enable CORS
            config.EnableCors();
            
            config.MapHttpAttributeRoutes();
            // Web API routes
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
