using System;

namespace WebRuleTest1
{
    public partial class ModalDialog : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request.QueryString.Count > 0)
            {
                hdnInput1Val.Text = Request.QueryString["PTitle"];
                lblInput1.Text = Request.QueryString["TValue"];
            }
        }
    }
}
