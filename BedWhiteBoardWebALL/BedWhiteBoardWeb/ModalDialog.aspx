<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ModalDialog.aspx.cs" Inherits="WebRuleTest1.ModalDialog" %>

<%@ Register assembly="System.Web.Extensions, Version=3.5.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35" namespace="System.Web.UI" tagprefix="asp" %>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" >
<head runat="server">
    <title>Input Page</title>
    <script type="text/javascript" language="javascript">
    function Done () {
     var hdnivar = document.getElementById ("hdnInput1Val");
        if (window.showModalDialog) 
        {
            var ParmA = document.getElementById('hdnInput1Val').value;
            var MyArgs = new Array(ParmA);
            window.returnValue = MyArgs;
        }
        else 
        {
            //window.opener.UpdateFields(hdnivar.value);
            parent.UpdateFromInput(hdnivar.value);
        }
        window.close();
       
    }
</script>
    <style type="text/css">
        #form1
        {
            top: 17px;
            left: 11px;
            position: absolute;
            height: 87px;
            width: 377px;
            bottom: 213px;
        }
        </style>
</head>
<body>
    <form id="form1" runat="server">

    <asp:ScriptManager ID="ScriptManager1" runat="server">
    </asp:ScriptManager>
    <asp:UpdatePanel ID="UpdatePanel1" runat="server">
        <ContentTemplate>
        <table style="width:100%;height: 96px;">
        <tr>
        <td>
        <asp:Label ID="lblInput1" runat="server" Font-Bold="False" Font-Names="Verdana" 
                ForeColor="#414B56" Font-Italic="False" Font-Size="Medium" >test</asp:Label>
        </td>
        </tr>
        <tr>
        <td >
         <asp:TextBox ID="hdnInput1Val" runat="server" Height="22px" Width="371px" 
                 Font-Names="Verdana" Font-Bold="False"></asp:TextBox>
        </td>
        </tr>
        <tr>
        <td style="text-align: center">
        <asp:Button ID="btnOk" runat="server" OnClientClick="Done()" Text="Ok" Font-Bold="True" 
                Font-Names="Verdana" ForeColor="#414B56" Height="27px" Width="71px" />
            </td>
        </tr>
        </table>
    
        </ContentTemplate>
    </asp:UpdatePanel>

    </form>
</body>
</html>
