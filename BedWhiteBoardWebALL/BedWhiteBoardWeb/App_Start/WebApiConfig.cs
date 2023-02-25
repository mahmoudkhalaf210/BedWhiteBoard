using System;
using System.Web.Http;
using System.Web.Http.WebHost;

namespace BedManagement
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.         

            // Web API routes
            //TokenInspector tokenInspector = new TokenInspector() { InnerHandler = new HttpControllerDispatcher(config) };

            //config.Routes.MapHttpRoute(name: "BedManagementApi",
            //    routeTemplate: "BedManagementApi/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional },
            //    constraints: null,
            //    handler: tokenInspector);//.RouteHandler = new SessionStateRouteHandler();

            //config.Routes.MapHttpRoute(name: "BedManagementApiActions",
            //    routeTemplate: "BedManagementApiActions/{controller}/{action}/{id}",
            //    defaults: new { id = RouteParameter.Optional },
            //    constraints: null,
            //    handler: tokenInspector);//.RouteHandler = new SessionStateRouteHandler();

            var httpControllerRouteHandler = typeof(HttpControllerRouteHandler).GetField("_instance",
        System.Reflection.BindingFlags.Static | System.Reflection.BindingFlags.NonPublic);

            if (httpControllerRouteHandler != null)
            {
                httpControllerRouteHandler.SetValue(null,
                    new Lazy<HttpControllerRouteHandler>(() => new SessionHttpControllerRouteHandler(), true));
            }

            config.Routes.MapHttpRoute(
                name: "BedManagementApi",
                routeTemplate: "BedManagementApi/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional });

            config.Routes.MapHttpRoute(
                name: "BedManagementApiActions",
                routeTemplate: "BedManagementApiActions/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional });

        }
    }
}
