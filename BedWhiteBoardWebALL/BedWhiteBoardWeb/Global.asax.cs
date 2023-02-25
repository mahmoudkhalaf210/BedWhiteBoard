using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;

namespace BedManagement
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            // Code that runs on application startup
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AuthConfig.RegisterOpenAuth();
            WebApiConfig.Register(System.Web.Http.GlobalConfiguration.Configuration);
            //RouteTable.Routes.MapHttpRoute(name: "DefaultApi", routeTemplate: "api/{controller}/{action}");

            //RouteTable.Routes.MapHttpRoute(name: "BedManagementApi", routeTemplate: "BedManagementApi/{controller}/{id}", defaults: new { id = RouteParameter.Optional }).RouteHandler = new SessionStateRouteHandler();
            //RouteTable.Routes.MapHttpRoute(name: "BedManagementApiActions", routeTemplate: "BedManagementApiActions/{controller}/{action}/{id}", defaults: new { id = RouteParameter.Optional }).RouteHandler = new SessionStateRouteHandler();

            AreaRegistration.RegisterAllAreas();
        }

        void Application_End(object sender, EventArgs e)
        {
            //  Code that runs on application shutdown

        }

        void Application_Error(object sender, EventArgs e)
        {
            // Code that runs when an unhandled error occurs

        }
    }
}
