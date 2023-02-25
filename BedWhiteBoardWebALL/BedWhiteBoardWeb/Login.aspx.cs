using System;
using System.Web.Security;
using System.Web.UI;

namespace Login
{

    public partial class Login : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (String.IsNullOrEmpty(Request.QueryString["logoff"]) == false &&
                Request.QueryString["logoff"].ToLowerInvariant() == "true")
            {
                FormsAuthentication.SignOut();
                ErrorMessage.Text = "You have been signed out";
                ErrorMessage.Visible = true;
            }
        }
        protected void LogIn_Clicked(object sender, EventArgs e)
        {
            string username = Request.Form["username"];
            string password = Request.Form["password"];
            //bool remember = RememberMe.Checked;

            MedicaDAL.DBInteraction objDB = new MedicaDAL.DBInteraction(true);
            password = objDB.Encrypt(password);
            System.Data.IDataReader dr = null;
            if (objDB.DBType == MedicaDAL.DBEngines.DBEngineTypes.ODBC)
            {
                dr = (System.Data.Odbc.OdbcDataReader)objDB.ExecReaderQuery("select staff_id,staff_key,staff_spec from staff where staff_id='" + username + "' and Staff_Passwd='" + password + "'");
            }
            else if (objDB.DBType == MedicaDAL.DBEngines.DBEngineTypes.SqlServer)
            {
                dr = (System.Data.SqlClient.SqlDataReader)objDB.ExecReaderQuery("select staff_id,staff_key,staff_spec from staff where staff_id='" + username + "' and Staff_Passwd='" + password + "'");
            }
            else if (objDB.DBType == MedicaDAL.DBEngines.DBEngineTypes.Oracle)
            {
                dr = (System.Data.OleDb.OleDbDataReader)objDB.ExecReaderQuery("select staff_id,staff_key,staff_spec from staff where staff_id='" + username + "' and Staff_Passwd='" + password + "'");
            }

            if (dr.Read())
            {
                FormsAuthentication.RedirectFromLoginPage(dr["staff_key"].ToString(), createPersistentCookie: false);
                //HttpCookie cok = new HttpCookie("UserInfo");
                //cok["userId"] = dr["staff_key"].ToString();
                //cok.Expires = DateTime.Now.AddDays(5);
                //Response.Cookies.Add(cok);
            }
            else
            {
                ErrorMessage.Visible = true;
            }
        }
    }
}