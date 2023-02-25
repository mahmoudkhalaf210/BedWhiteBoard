<%@ Page Title="Home Page" Language="C#" AutoEventWireup="true" CodeBehind="OTWhiteBoard.aspx.cs" Inherits="BedWhiteBoard.OTPage" %>


<!DOCTYPE html>
<html lang="en">
<head id="Head1" runat="server">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <link rel='stylesheet' href='assets/css/main_style.css' />
    <link href="assets/css/main.css" rel="stylesheet" />
    <link href="assets/css/loading.css" rel="stylesheet" />
    <link href="assets/css/kooltip.css" rel="stylesheet" />
    <link href="fonts/font-awesome/font-awesome/css/font-awesome.css" rel="stylesheet">
<%--    <link href='http://fonts.googleapis.com/css?family=Oswald:300,400,700|Open+Sans:400,700,300|Roboto:100,300,400,700|Roboto+Condensed:300,400,700' rel='stylesheet' type='text/css'>--%>
    <link href="assets/css/css.css" rel="stylesheet" />
    <link href="assets/favicon.ico" rel="shortcut icon"/>
    <link href="assets/apple-touch-icon.png" rel="apple-touch-icon" />
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    @javascript html5shiv respond.min<link href="assets/css/loading.css" rel="stylesheet" />
  <![endif]-->
    <title><%: Page.Title %> - MedicaPLUS</title>
    <asp:PlaceHolder ID="PlaceHolder1" runat="server">
        <%: Scripts.Render("~/bundles/modernizr") %>
    </asp:PlaceHolder>
    <webopt:BundleReference ID="BundleReference1" runat="server" Path="~/Content/css" />

    <%--    <link href="Content/themes/base/minified/jquery-ui.min.css" rel="stylesheet" />--%>

    <%--    <link href="Content/themes/base/minified/jquery.ui.theme.min.css" rel="stylesheet" />--%>
    <link href="Content/themes/base/minified/jquery.ui.resizable.min.css" rel="stylesheet" />
    <%--    <link href="Content/themes/base/minified/jquery.ui.slider.css" rel="stylesheet" />--%>
    <link href="Content/themes/base/minified/jquery.ui.dialog.min.css" rel="stylesheet" />
    <link href="fullcalendar/fullcalendar.css" rel='stylesheet' />
    <link href='fullcalendar/fullcalendar.print.css' rel='stylesheet' media='print' />
    <!-- CSS file -->
    <link type="text/css" rel="stylesheet" href="Content/jquery.qtip.css" />
    <link href="Content/toastr.css" rel="stylesheet" />
    <link href="Content/component.css" type="text/css" rel="stylesheet" />
    <%--    <link href="Content/bootstrap.min.css" rel="stylesheet" />--%>
    <link href="Content/bootstrap-theme.min.css" rel="stylesheet" />
    <link href="Content/jquery.contextmenu.css" rel="stylesheet" />


    <script src="Scripts/jquery-2.2.0.min.js"></script>
    <script src="Scripts/jquery-ui-1.10.4.min.js"></script>
    <script src="Scripts/jquery.signalR-1.1.3.js"></script>
    <%--<script src="Scripts/jquery.signalR-2.0.0.min.js"></script>--%>

    <%--<script src="Scripts/jScript171.js"></script>--%>
    <script src="Scripts/knockout-3.2.0.js"></script>
    <%--<script src="Scripts/bed-management.js"></script>--%>
    <script src="Scripts/knockout.wrap.js"></script>
    <script src="Scripts/knockout.mapping-latest.js"></script>
    <script src="Scripts/knockout-switch-case.min.js"></script>

    <%--<script src="fullcalendar/fullcalendar.min.js"></script>--%>
    <script src="fullcalendar/fullcalendar.js"></script>

    <!-- Include either the minifed or production version, NOT both!! -->
    <script type="text/javascript" src="Scripts/jquery.qtip.js"></script>

    <!-- Optional: imagesLoaded script to better support images inside your tooltips -->
    <%--    <script type="text/javascript" src="Scripts/jquery.imagesloaded.pkg.min.js"></script>--%>


    <script src="Scripts/xdate.js"></script>
    <script src="Scripts/toastr.min.js"></script>
    <%--    <script src="Scripts/jquery.tools.min.js"></script>--%>
    <script src="Scripts/bootstrap.min.js"></script>
   
    <script src="Scripts/jquery.contextmenu.js"></script>
 
    <script src="assets/js/script.js"></script>
    <script src="assets/js/me-js.js"></script>

    <script src="Scripts/jquery.globalize/globalize.js"></script>
  <script src="Scripts/ot-management.js"></script>

    <%--  <script src="Scripts/sidebarEffects.js"></script>
    <script src="Scripts/classie.js"></script>--%>



    <style>
        .legand_table tr td
        {
            width:10%;
        }
        iframe{
            border:none;
        }
        .row {
            margin-left: 0;
            margin-right: 0;
        }

        #calendar {
            width: 100%;
        }
        .table tbody+tbody
        {
            border-top:none;
        }
        /*.modal {
            background-color: #fff;
            background-image: url(../Images/backSmall.jpg);
            display: none;
            width: 600px;
            padding: 15px;
            text-align: left;
            /*border:2px solid #333;*/
        /*opacity: 0.9;*/
        /*-moz-border-radius:6px;
        -webkit-border-radius:6px;*/
        /*-moz-box-shadow: 0 0 12px #808080;
            -webkit-box-shadow: 0 0 12px #808080;
        }

            .modal h2 {*/
        /*background:url(/img/global/info.png) 0 50% no-repeat;*/
        /*margin:0px;
        padding:10px 0 10px 45px;
        border-bottom:1px solid #333;
        font-size:20px;
            }*/
        /*g.highcharts-button
            {
                display:none;
            }*/
        g.highcharts-grid path {
            stroke: #dddddd;
            opacity: .5;
        }

        rect.highcharts-background {
            background-color: transparent;
            fill: transparent;
        }

        table[data-area="sec_header_area"] .area_title {
            background: #feda71 !important;
            background: -webkit-gradient(linear, 0 0, 0 bottom, from(#feda71), to(#febe4d)) !important;
            background: -moz-linear-gradient(#feda71, #febe4d) !important;
            background: linear-gradient(#feda71, #febe4d) !important;
            border: solid 1px #eab551 !important;
            border-bottom: solid 1px #b98a37 !important;
            box-shadow: inset 0 0 0 1px #fee9aa !important;
            color: #996633 !important;
            text-shadow: 0 1px 0 #fedd9b !important;
            display: table !important;
            width: 100% !important;
        }

        /*@-webkit-keyframes DIV-BORDER {
            0% {
                background-color: #ff6264;
            }

            50% {
                background-color: transparent;
            }

            100% {
                background-color: #ff6264;
            }
        }*/

        .try_num {
            /*-webkit-transition: all 1s;
            -webkit-animation: DIV-BORDER 2s infinite;
            background-image: none !important;*/
            text-shadow: none !important;
            background-color: #ff6264;
        }

        /*@-webkit-keyframes DIV-BORDERr {
            0% {
                background-color: #fcd036;
            }

            50% {
                background-color: transparent;
            }

            100% {
                background-color: #fcd036;
            }
        }*/

        .try_numa {
            /*-webkit-transition: all 2s;
            -webkit-animation: DIV-BORDERr 3s infinite;
            background-image: none !important;*/
            text-shadow: none !important;
            background-color: #fcd036;
        }

        @-webkit-keyframes DIV-BORDERq {
            0% {
                background-color: #d5080f;
                fill: #d5080f;
            }

            50% {
                background-color: red;
                fill: red;
            }

            100% {
                background-color: #d5080f;
                fill: #d5080f;
            }
        }

        .try_nums, .dxc-series .dxc-markers[fill="#C90707"] {
            -webkit-transition: all 1s;
            -webkit-animation: DIV-BORDERq 1s infinite;
            background-image: none !important;
            text-shadow: none !important;
        }

        @-webkit-keyframes DIV-BORDERq1 {
            0% {
                background-color: #d5080f;
                fill: #d5080f;
            }

            50% {
                background-color: #d5080f;
                fill: red;
                background-image: none;
            }

            100% {
                background-color: #d5080f;
                fill: #d5080f;
            }
        }

        @-webkit-keyframes DIV-BORDERq7 {
            0% {
                background-color: rgba(255,0,0,1);
            }

            50% {
                background-color: rgba(201,7,7,1);
            }

            100% {
                background-color: rgba(255,0,0,1);
            }
        }

        .ani_stop {
            -webkit-animation: stop;
            background-color: #d5080f;
        }



        .try_numss {
            -webkit-transition: all 1.5s;
            -webkit-animation: DIV-BORDERq7 1.5s infinite;
            /*background-image: none !important;
            text-shadow: none !important;*/
        }

        @-webkit-keyframes DIV-BORDERqq {
            0% {
                opacity: 100;
            }

            50% {
                opacity: 0;
            }

            100% {
                opacity: 100;
            }
        }

        .try_iconshad {
            -webkit-transition: all 1.5s;
            -webkit-animation: DIV-BORDERqq 1.5s infinite;
            background-image: none !important;
            text-shadow: none !important;
        }

        .try_iconshadWB {
            -webkit-transition: all 2.5s;
            -webkit-animation: DIV-BORDERqq 2.5s infinite;
            background-image: none !important;
            text-shadow: none !important;
        }

        .try_numg {
            background-color: rgb(25, 246, 72);
            text-shadow: none;
        }

        #accordion h3 td {
            padding: 5px !important;
        }

        /*#try_col231, #try_col447, #try_col449, #try_col451, #try_col453, #try_col455 {
            font-size: 50px;
            font-weight: 100;
            text-align: center;
        }*/

        tr[id*='try_col'] {
            font-size: 50px;
            font-weight: 100;
            text-align: center;
        }

        th {
            text-align: center;
        }

        .accHeader table.table {
            margin-bottom: 0 !important;
        }

            .accHeader table.table tr, .accAllHeader table.table tr {
                border: 1px dashed #cacaca;
                background: rgb(255,255,255); /* Old browsers */
                background: -moz-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(243,243,243,1) 99%); /* FF3.6+ */
                background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,1)), color-stop(99%,rgba(243,243,243,1))); /* Chrome,Safari4+ */
                background: -webkit-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(243,243,243,1) 99%); /* Chrome10+,Safari5.1+ */
                background: -o-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(243,243,243,1) 99%); /* Opera 11.10+ */
                background: -ms-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(243,243,243,1) 99%); /* IE10+ */
                background: linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(243,243,243,1) 99%); /* W3C */
                filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#f3f3f3',GradientType=0 ); /* IE6-9 */
                text-shadow: 0px 1px 0px white;
            }

                .accHeader table.table tr:hover, .accAllHeader table.table tr:hover {
                    border: 1px solid #cacaca;
                    background: rgb(255,255,255); /* Old browsers */
                    background: -moz-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(247,247,247,1) 3%, rgba(225,225,225,1) 100%); /* FF3.6+ */
                    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,1)), color-stop(3%,rgba(247,247,247,1)), color-stop(100%,rgba(225,225,225,1))); /* Chrome,Safari4+ */
                    background: -webkit-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(247,247,247,1) 3%,rgba(225,225,225,1) 100%); /* Chrome10+,Safari5.1+ */
                    background: -o-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(247,247,247,1) 3%,rgba(225,225,225,1) 100%); /* Opera 11.10+ */
                    background: -ms-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(247,247,247,1) 3%,rgba(225,225,225,1) 100%); /* IE10+ */
                    background: linear-gradient(to top, rgba(255,255,255,1) 0%,rgba(247,247,247,1) 3%,rgba(225,225,225,1) 100%); /* W3C */
                    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#e1e1e1',GradientType=0 ); /* IE6-9 */
                    text-shadow: 0px 1px 0px white;
                    cursor: pointer;
                }

            .accHeader table.table td, .accAllHeader table.table td {
                border-top: 1px dashed #cacaca;
            }

        table[data-area="sec_header_area"] {
            display: none;
        }

        .spinner {
            position: fixed;
            top: 50%;
            left: 50%;
            margin-left: -50px; /* half width of the spinner gif */
            margin-top: -50px; /* half height of the spinner gif */
            text-align: center;
            z-index: 1234;
            overflow: auto;
            width: 100px; /* width of the spinner gif */
            height: 102px; /*hight of the spinner gif +2px to fix IE8 issue */
        }
        .table thead>tr>th
        {
            border-bottom:none;
        }
        .ns_img_text {
    margin-left: 40%;
}
        .testo .fc-widget-content, .testo .fc-first.fc-last {
            visibility:hidden
      
}
        .testo {
    position: absolute;
    margin-top: 50px;
        overflow: hidden;
    width: 99%;
    /*margin-left: 35px;*/
}
        .testo td.fc-resourceName {
    line-height: 2.3;
    visibility:visible !important;
}
                .fc-resourceName {
    visibility:hidden;
}

        .fc-content
        {
            margin-left:210px;
        }
        .fc-content .fc-view.fc-view-resourceDay.fc-grid table.fc-border-separate
        {
            margin-left:-200px !important;
        }
    </style>

    <script type="text/javascript">

        //$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        //    options.async = true;
        //});

        var wbType = "";
        var uId = "";
        var uKey = "";
        var vw = "";
        var hospitalid = 0;
        var lang = 0;
        var fromWindows = 1;

        wbType = GetQueryStringParams('wbt');
        vw = GetQueryStringParams('vw');
        uId = GetQueryStringParams('StaffKey');
        web = GetQueryStringParams('web');
        hospitalid = GetQueryStringParams('hospitalid');
        lang = GetQueryStringParams('lang');
        //uId = "616";

        if (web == 1)
            fromWindows = 0;
        else
            fromWindows = 1;

        if (hospitalid == undefined || hospitalid == "")
            hospitalid = -1;

        if (lang == undefined)
            lang = 0;

        $(document).ready(function () {

            $(document).ajaxSend(function () {
                $("#loader-wrapper").fadeIn("slow", function () {
                    $("#loader-wrapper").show();
                });
            });

            $(document).ajaxStop(function () {
                $("#loader-wrapper").fadeOut("slow", function () {
                    $("#loader-wrapper").hide();
                });
            });

            $(document).ajaxError(function () {
                $("#loader-wrapper").fadeOut("slow", function () {
                    $("#loader-wrapper").hide();
                });
            });

        });

        //function GetQueryStringParams(sParam) {
        //    var sPageURL = window.location.search.substring(1);
        //    var sURLVariables = sPageURL.split('&');
        //    for (var i = 0; i < sURLVariables.length; i++) {
        //        var sParameterName = sURLVariables[i].split('=');
        //        if (sParameterName[0] == sParam) {
        //            return sParameterName[1];
        //        }
        //    }
        //}

        function GetQueryStringParams(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            //return decodeURIComponent(results[2].replace(/\+/g, " "));
            return decodeURIComponent(results[2]);
        }

        $("#tre_show").hover(function () {
            $(this).parent().css("-webkit-animation-play-state", "paused");
        },
         function () {
             $(this).parent().css("-webkit-animation-play-state", "running");
         });

    </script>

    <asp:PlaceHolder runat="server" ID="HeadContent" />

</head>

<body>
    <form class="all-wrapper fixed-header left-menu hide-sub-menu" id="Form1" runat="server">
        
        <asp:ScriptManager ID="ScriptManager1" runat="server">
            <Scripts>
                <%--Framework Scripts--
                <asp:ScriptReference Name="MsAjaxBundle" />
                <asp:ScriptReference Name="jquery" />
                <asp:ScriptReference Name="jquery.ui.combined" />
                <asp:ScriptReference Name="WebForms.js" Assembly="System.Web" Path="~/Scripts/WebForms/WebForms.js" />
                <asp:ScriptReference Name="WebUIValidation.js" Assembly="System.Web" Path="~/Scripts/WebForms/WebUIValidation.js" />
                <asp:ScriptReference Name="MenuStandards.js" Assembly="System.Web" Path="~/Scripts/WebForms/MenuStandards.js" />
                <asp:ScriptReference Name="GridView.js" Assembly="System.Web" Path="~/Scripts/WebForms/GridView.js" />
                <asp:ScriptReference Name="DetailsView.js" Assembly="System.Web" Path="~/Scripts/WebForms/DetailsView.js" />
                <asp:ScriptReference Name="TreeView.js" Assembly="System.Web" Path="~/Scripts/WebForms/TreeView.js" />
                <asp:ScriptReference Name="WebParts.js" Assembly="System.Web" Path="~/Scripts/WebForms/WebParts.js" />
                <asp:ScriptReference Name="Focus.js" Assembly="System.Web" Path="~/Scripts/WebForms/Focus.js" />
                <asp:ScriptReference Name="WebFormsBundle" />
                --Site Scripts--%>
            </Scripts>
        </asp:ScriptManager>

        <div id="loader-wrapper">
            <div id="loader">
            </div>
            <div class="logo_load">
                <img src="assets/images/tryloading.png" />
                <h5 style="text-align: center; margin-top: 60px;">Loading....
                </h5>
            </div>
        </div>

        <div class="main-content-without">

            <div id="st-container" class="st-container">

                <div class="st-menu st-effect-5" id="menu-5">

                    <div class="widget widget-blue">
                        <div class="widget-title">
                            <h3>Settings
                            </h3>
                        </div>
                        <div class="widget-content">
                            <div class="row" style="margin-top: 10px; margin-left: 10px;">

                                <div class="btn-group" data-toggle="buttons">
                                    <label class="btn btn-default">
                                        <input type="radio" name="settings" id="rdoView" value="View" onchange="rdoView_Changed()" />View
                                    </label>
                                    <label class="btn btn-default active">
                                        <input type="radio" name="settings" id="rdoNotification" value="Notification" onchange="rdoNotification_Changed()" checked="checked" />Notification
                                    </label>
                                    <label class="btn btn-default" style="display:none;visibility:hidden">
                                        <input type="radio" name="settings" id="rdoSetup" value="Setup" onchange="rdoSetup_Changed()" />Setup
                                    </label>

                                    
                                </div>
                            </div>
                            <div id="divView" style="display: none; float: left; margin-left: 10px; margin-top: 5px;">
                            </div>
                            <div id="divNotification" style="margin-top: 10px; margin-left: 20px;">
                                <fieldset>
                                    <label for="txtNotyInterval">Operation notification interval<input class="form-control input-sm" type="text" id="txtNotyInterval" style="width: 50px;" value="5" /></label>
                                    <label>
                                        <input type="checkbox" id="chkPName" checked="checked" onchange="" />Show patient name</label>
                                    <label>
                                        <input type="checkbox" id="chkSurgeonName" checked="checked" />Show surgeon name</label>
                                    <label>
                                        <input type="checkbox" id="chkOPTRoomName" checked="checked" />Show operation theatre</label>
                                    <label>
                                        <input type="checkbox" id="chkOPName" checked="checked" />Show operation name</label>
                                    <label>
                                        <input type="checkbox" id="chkStartEnd" checked="checked" />Show start and expected end time</label>
                                </fieldset>
                            </div>
                            <div id="divSetup" style="display: none; float: left; margin-left: 10px; margin-top: 5px;">
                                Setup
                            </div>
                        </div>
                    </div>


                </div>

                <!-- content push wrapper -->
                <div class="st-pusher">

                    <div class="st-content">
                        <!-- this is the wrapper for the content -->
                        <div class="st-content-inner">
                            <!-- extra div for emulating position:fixed of the menu -->
                            <!-- the content -->

                        <%--<div id="spinner" class="spinner" style="display: none;">
                                <img id="img-spinner" src="assets/images/date_magnify.png" alt="Loading" />
                            </div>--%>

                            

                            <div id="divNurseStations" class="content-wrapper">

                                <div id="opToolBar" style="display: none;">


                                    <div class="row">
                                        <div class="col-md-2" style="padding-left: 0;">
                                            <div class="input-group input-group-sm">
                                                <span class="input-group-addon" style="padding: 4px;"><i>
                                                    <img src="assets/images/date_magnify.png" /></i></span>
                                                <input class="form-control input-datepicker" type="text" id="calDate" />
                                                <input type="hidden" id="calDateAlt" />
                                            </div>
                                        </div>
                                        <div class="col-md-1">
                                            <div id="st-trigger-effects">
                                                <button type="button" class="btn btn-default btn-sm" data-effect="st-effect-5">Settings</button>
                                            </div>
                                        </div>
                                        <div class="col-md-8">
                                            <div style="margin-top: -6px; margin-bottom: 6px;">
                                                <div>
                                                    <table class="legand_table" style="height: 10px; border: 0px; margin: 0; padding: 0; font-size: small; text-align: center; color: #fff; /*background-color: rgb(207, 202, 202); */">
                                                        <tr>
                                                            <td class="fc-event scheduled">Scheduled</td>
                                                            <td class="fc-event sendToOT">Send to OT</td>
                                                            <td class="fc-event patTransfered">Patient Arrived</td>

                                                            <td class="fc-event patientInOR">Patient in OR</td>
                                                            <td class="fc-event ansStart">Anaesthesia Start</td>
                                                            <%--<td class="fc-event signIn">Sign in</td>--%>
                                                            
                                                            
                                                            <td class="fc-event surgeryStart">Surgery Start</td>
                                                            <td class="fc-event knifeToSkin">Knife to Skin</td>
                                                        </tr>
                                                        <tr>
                                                            <td class="fc-event surgeryEnd">Surgery End</td>

                                                            <td class="fc-event inductionEnd">Anaesthesia End</td>
                                                            <td class="fc-event patientOutOfOR">Patient Out of OR</td>
                                                          <%--  <td class="fc-event signOut">Sign out</td>--%>                                                           
                                                            
                                                            <td class="fc-event inRecovery">In Recovery</td>
                                                            <td class="fc-event InICUOrWard">Out of Recovery</td>
                                                            <td class="fc-event patientLeftOT">Patient Left OT</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>

                                        </div>
                                       <%-- <div class="col-md-1" style="text-align: right; padding-right: 0;">
                                            <div style="margin-top: 0px;" id="connBtnOp" class="DisConnectedBtn">
                                                Disconnected
                                            </div>
                                        </div>--%>
                                    </div>

                                </div>
                            </div>


                            <input type="hidden" id="hdnPath" />

                            <div id="opView" style="display: none;">
                                <div id="opNsList" data-bind="template: { name: 'nsOP', foreach: nursestations }">
                                </div>
                            </div>

                        </div>

                        <%--                            <footer>
                                <div class="content-wrapper">
                                    <div class="float-left">
                                        <p>&copy; <%: DateTime.Now.Year %> - MedicaPLUS</p>
                                    </div>
                                </div>
                            </footer>  --%>
                    </div>
                    <!-- /st-content-inner -->
                </div>
                <!-- /st-content -->

            </div>
            <!-- /st-pusher -->

        </div>
        <!-- /st-container -->
        <script src="Scripts/classie.js"></script>
        <script src="Scripts/sidebarEffects.js"></script>

        <%--templates--%>

        <script id="nsOP" type="text/html">
            <div class="panelfullwidth">


                <!--OPo-->


                <div style="margin-bottom: 5px;" class="accHeader" data-bind="click: collapseNS">
                    <table class="table">
                        <tr>
                            <td style="text-align: left;">
                                <div class="ns_img_text">
                                    <img style="padding: 5px;" src="assets/images/user_medical.png" /><span style="font-size: 20px; font-weight: 300; color: #019bd7; vertical-align: middle;" data-bind="text: latin_desc, attr: { id: 'spnNS' + sys_key() }"></span>
                                </div>
                                
                            </td>
                        </tr>
                    </table>
                    <%--<img data-bind="attr: { id: 'imgNSColl' + sys_key() }" src="images/expand_arrow_alt.png" style="width: 32px; height: 32px; display: none; cursor: pointer;" />--%>
                </div>
                <div id="opRoomsBeds" class="accContent" style="display: none">
                    <div class="testo" data-bind="attr: { id: 'testo' + sys_key() }">
                       
                        <%--$('.testo').next('.fc.fc-ltr').children('.fc-content').children('.fc-view.fc-view-resourceDay.fc-grid').children('table').children('tbody').children('tr').children('.fc-resourceName').html()--%>
                    </div>
                    <div data-bind="attr: { id: 'calendar' + sys_key() }"></div>
                    <%--<div id="contextMenuContainer" style='background-color: #f0f0f0; width: 100px; height: 100px; display: none; z-index: 999; border-radius: 5px; border: 1px solid black; position: absolute;'></div>--%>
                </div>
                


            </div>

        </script>

        <%--end of templates--%>

    </form>


    <script type="text/javascript">

        $(window).load(function () {


            $('#ui-datepicker-div').addClass('datepicker dropdown-menu').removeClass('ui-datepicker.ui-widget.ui-widget-content.ui-helper-clearfix.ui-corner-all');
            $('body').on("click", "[id^='try_exta'] div.widget-control.widget-control-minimize.extend_div", function () {
                //$("#try_exta, #try_extb").removeClass("col-md-5", 800).fadeIn();
                //$("#try_extc").removeClass("col-md-2", 800).fadeIn();
                $(this).parent().parent().parent().parent().toggleClass("col-md-12", [800]).fadeIn();

                $(this).parent().parent().parent().parent().children().children().next().toggleClass("autohight_contant", [800]).fadeIn();
                //$("#try_exta .widget .widget-content").toggleClass("autohight_contant", [800]).fadeIn();

                $(this).parent().parent().parent().parent().next().toggle(800);
                $(this).parent().parent().parent().parent().next().next().toggle(800);
                //$("#try_extc").toggle(800);
            });

            $('body').on("click", "[id^='try_extb'] div.widget-control.widget-control-minimize.extend_div", function () {
                //$("#try_exta, #try_extb").removeClass("col-md-5", 800).fadeIn();
                //$("#try_extc").removeClass("col-md-2", 800).fadeIn();
                $(this).parent().parent().parent().parent().toggleClass("col-md-12", [800]).fadeIn();

                $(this).parent().parent().parent().parent().children().children().next().toggleClass("autohight_contant", [800]).fadeIn();
                $(this).parent().parent().parent().parent().prev().toggle(800);
                $(this).parent().parent().parent().parent().next().toggle(800);
            });




            $('#hideall_bt').click(function () {
                $("#hideall_bt").toggleClass("click_over");
                $(".page-header").toggleClass("headerhide");
                $(".main-content").toggleClass("contenthide");
                $("ul.nav.nav-tabs").toggleClass("tabshide");
                $(".side").toggleClass("mainmenuhide");
            });

        });

    </script>
</body>
</html>



