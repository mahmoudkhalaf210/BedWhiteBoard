
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Security.Principal;
using System.Threading;
using System.Web;

namespace MedicaDALApi.Modules
{
    public class AuthHttpModule : IHttpModule
    {
        private const string Realm = "MedicaPlus";

        public void Init(HttpApplication context)
        {

            // Register event handlers
            context.AuthenticateRequest += OnApplicationAuthenticateRequest;
            context.EndRequest += OnApplicationEndRequest;
        }

        private static void SetPrincipal(IPrincipal principal)
        {
            Thread.CurrentPrincipal = principal;
            if (HttpContext.Current != null)
            {
                HttpContext.Current.User = principal;
            }
        }

        private static void EmptyPrincipal()
        {
            if (HttpContext.Current != null)
            {
                HttpContext.Current.User = null;
            }
        }
        private static bool AuthenticateUser(string credentials)
        {
            try
            {
                object objlstTkts = MedicaDAL.MMF.ReadObjectFromMMF("X-Token");
                if (objlstTkts != null && objlstTkts is List<MedicaDAL.Security.Ticket>)
                {
                    MedicaDAL.Security.Ticket objTkt = ((List<MedicaDAL.Security.Ticket>)objlstTkts).Where(t => t.token == credentials).FirstOrDefault();
                    if (objTkt != null)
                    {

                        var identity = new GenericIdentity(objTkt.username);
                        SetPrincipal(new GenericPrincipal(identity, null));

                        return true;
                    }
                }

                return false;
            }
            catch (FileNotFoundException ex)
            {
                return false;
            }
        }

        private static void OnApplicationAuthenticateRequest(object sender, EventArgs e)
        {
            var request = HttpContext.Current.Request;
            var authHeader = request.Headers["Authorization"];
            if (authHeader != null)
            {
                var authHeaderVal = AuthenticationHeaderValue.Parse(authHeader);

                // RFC 2617 sec 1.2, "scheme" name is case-insensitive
                if (authHeaderVal.Scheme.Equals("bearer", StringComparison.OrdinalIgnoreCase) && authHeaderVal.Parameter != null)
                {
                    AuthenticateUser(authHeaderVal.Parameter);
                }
            }
        }

        // If the request was unauthorized, add the WWW-Authenticate header 
        // to the response.
        private static void OnApplicationEndRequest(object sender, EventArgs e)
        {
            var response = HttpContext.Current.Response;
            if (response.StatusCode == 401)
            {
                response.Headers.Add("WWW-Authenticate", string.Format("Basic realm=\"{0}\"", Realm));
            }
        }

        public void Dispose()
        {
        }
    }

}