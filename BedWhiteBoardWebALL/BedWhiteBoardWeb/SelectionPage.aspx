<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SelectionPage.aspx.cs" Inherits="BedManagement.SelectionPage" EnableSessionState="True" %>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">

<head runat="server">
    <title></title>

    <link rel='stylesheet' href='assets/css/main_style.css' />
    <link href="assets/css/main.css" rel="stylesheet" />
    <link href="assets/css/loading.css" rel="stylesheet" />
    <link href="assets/css/kooltip.css" rel="stylesheet" />
    <link href="fonts/font-awesome/font-awesome/css/font-awesome.css" rel="stylesheet" />
    <link href="assets/css/css.css" rel="stylesheet" />
    <link href="assets/favicon.ico" rel="shortcut icon" />
    <link href="assets/apple-touch-icon.png" rel="apple-touch-icon" />

    <script src="Scripts/jquery-2.2.0.min.js"></script>

    <script type="text/javascript" language="javascript">
        function Done() {
            var hdnivar = document.getElementById("hdnSelectionResult");
            if (window.showModalDialog) {
                var ParmA = document.getElementById('hdnSelectionResult').value;
                var MyArgs = new Array(ParmA);
                window.returnValue = MyArgs;
            }
            else {
                //window.opener.UpdateFields(hdnivar.value);
                parent.UpdateFromDialog(hdnivar.value);
            }

            //parent.CloseSelectionDialog();
            //window.close();

        }
        function Close_Click() {
            //if (history.length == 0) {
            //    var windowClose = window.close;
            //    window.close = function() {
            //        window.opener = '';
            //        window.open("", "_self");
            //        windowClose();
            //    }
            //window.opener = '';
            //window.close();
            //}
            //else
            //    history.go(-1);
            parent.CloseSelectionDialog();
        }

        function show_hide_Column() {
            if (GridView1.Visible == true) {
                GridView1.hideColumn(0);
            }
        }
    </script>

    <style type="text/css">
        html, body{
            background-image: none;
            background-color: transparent;
        }
    </style>

</head>
<body>
    <form id="form1" runat="server">
        <asp:ScriptManager ID="ScriptManager1" runat="server">
        </asp:ScriptManager>

       <%-- <script type="text/javascript" language="javascript">
            Sys.WebForms.PageRequestManager.getInstance().add_endRequest(EndRequestHandler);
            function EndRequestHandler(sender, args) {
                if (args.get_error() != undefined) {
                    console.log(args.get_error());
                    args.set_errorHandled(true);
                }
            }

            //$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
            //    options.async = true;
            //});
        </script>--%>

        <asp:UpdatePanel ID="UpdatePanel1" runat="server">
            <ContentTemplate>

                <table style="width: 100%;">
                    <tr>
                        <td>
                            <asp:Label ID="lblPickList" runat="server" Font-Bold="True"
                                Font-Names="Verdana" Font-Size="Small" ForeColor="#414B56"
                                Text="Please select function" Visible="False"></asp:Label>
                        </td>
                        <td>
                            <div class="form-group">
                                <asp:Label ID="Label1" CssClass="title_lable" runat="server" Font-Bold="True" Font-Names="Verdana"
                                 Text="Search"></asp:Label>
                            <asp:TextBox CssClass="form-control input-sm" ID="txtSearch" runat="server"
                                AutoPostBack="True" OnTextChanged="txtSearch_TextChanged"></asp:TextBox>
                            </div>
                            
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="grand-gray">
                                <asp:ListBox ID="PickListValues" CssClass="form-control input-sm" runat="server" Visible="False" Height="200px" Width="100%"></asp:ListBox>
                            </span>
                        </td>
                        <td style="text-align: center">
                            <asp:ListBox ID="SelectionListValue" runat="server" Width="100%" CssClass="form-control input-sm"
                                AutoPostBack="True" Height="200px"></asp:ListBox>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <asp:CheckBox ID="cbSelectAll" runat="server" Text="Select all"
                                AutoPostBack="True" OnCheckedChanged="cbSelectAll_CheckedChanged"
                                Font-Bold="True" Font-Size="Small" ForeColor="#414B56"
                                Font-Names="Verdana" />

                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center"></td>
                        <td style="text-align: center">

                            <button type="button" id="btnOK" class="btn btn-primary btn-sm" onclick="Done()">OK</button>
                            <button type="button" id="btnCancel" class="btn btn-primary btn-sm" onclick="Close_Click()">Cancel</button>

                            <asp:HiddenField ID="hdnSelectionResult" runat="server" />
                        </td>
                    </tr>
                </table>
            </ContentTemplate>
        </asp:UpdatePanel>

    </form>
</body>
</html>
