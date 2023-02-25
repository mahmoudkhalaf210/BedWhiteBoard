using System;
using System.Web;
using System.Web.UI;

namespace BedWhiteBoard
{
    public partial class OTPage : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                HttpCookie cok = Request.Cookies["UserInfo"];
                if (cok != null)
                {
                    string uId = cok["userId"];

                    //DuplexCaller1.UserId = uId;
                }
            }
        }
    }
}