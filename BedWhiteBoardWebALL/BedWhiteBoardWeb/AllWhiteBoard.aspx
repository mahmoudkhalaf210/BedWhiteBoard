<%@ Page Title="Home Page" Language="C#" AutoEventWireup="true" CodeBehind="AllWhiteBoard.aspx.cs" Inherits="BedWhiteBoard._Default" %>


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

    <link href="Content/dx.common.css" rel="stylesheet" />
    <%--<link rel="dx-theme" data-theme="generic.dark" href="Content/dx.dark.css" data-active="false" />--%>
    <link rel="dx-theme" data-theme="generic.light" href="Content/dx.light.css" data-active="true" />
    <%--<link rel="dx-theme" data-theme="android.holo-dark" href="Content/dx.android.holo-dark.css" data-active="false" />
	    <link rel="dx-theme" data-theme="android.holo-light" href="Content/dx.android.holo-light.css" data-active="false" />
	    <link rel="dx-theme" data-theme="win8.black" href="Content/dx.win8.black.css" data-active="false" />
	    <link rel="dx-theme" data-theme="win8.white" href="Content/dx.win8.white.css" data-active="false" />
		<link rel="dx-theme" data-theme="ios" href="Content/dx.ios.default.css" data-active="false" />
	    <link rel="dx-theme" data-theme="ios7" href="Content/dx.ios7.default.css" data-active="false" />
		<link rel="dx-theme" data-theme="tizen.black" href="Content/dx.tizen.black.css" data-active="false" />
	    <link rel="dx-theme" data-theme="tizen.white" href="Content/dx.tizen.white.css" data-active="false" />--%>


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
    <script src="Scripts/jquery.stickyheader.js"></script>
    <script src="Scripts/jquery.blockUI.min.js"></script>
    <script src="Scripts/jquery.contextmenu.js"></script>
    <script src="assets/ChartOnly/js/highcharts.src.js"></script>
    <script src="assets/ChartOnly/js/modules/data.js"></script>
    <script src="assets/ChartOnly/js/modules/drilldown.js"></script>
    <script src="assets/ChartOnly/js/modules/exporting.src.js"></script>
    <%--    <script src="assets/ChartOnly/js/highcharts.js"></script>--%>
    <%--    <script src="assets/ChartOnly/js/modules/exporting.js"></script>--%>
    <%--    <script src="assets/js/c81813dd5f2238060c9ddecda9683907.js"></script>--%>
    <script src="assets/js/script.js"></script>
    <script src="assets/js/me-js.js"></script>

    <script src="Scripts/jquery.globalize/globalize.js"></script>
    <script src="Scripts/dx.webappjs.js"></script>
    <script src="Scripts/dx.chartjs.js"></script>
    <%--<script src="Scripts/bed-management.js"></script>--%>

    <%--  <script src="Scripts/sidebarEffects.js"></script>
    <script src="Scripts/classie.js"></script>--%>



    <style>
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
    </style>

    <script type="text/javascript">

        //$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        //    options.async = true;
        //});

        var wbType = "";
        var uId = "";
        var uKey = "";
        var vw = "";

        wbType = GetQueryStringParams('wbt');
        vw = GetQueryStringParams('vw');
        uId = GetQueryStringParams('StaffKey');
        //uId = "616";

        var fromWindows = 1;

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

            DevExpress.devices.current({ platform: "generic" });
            DevExpress.ui.themes.current("generic.light");

            if (wbType == "1") {
                $.getScript("Scripts/bed-management.js");
                $("#A1").text("Bed WhiteBoard");
            }
            else if (wbType == "2") {
                $.getScript("Scripts/er-management.js");
                $("#A1").text("ER WhiteBoard");
            }
            else if (wbType == "3") {
                $.getScript("Scripts/ot-management.js");
                $("#A1").text("OT WhiteBoard");
            }
            else if (wbType == "4") {
                $.getScript("Scripts/recovery-management.js");
                $("#A1").text("Recovery Management WhiteBoard");
            }

            $("#A1").attr("href", "BedWhiteBoard.aspx?wbt=" + wbType);
            $("#A3").attr("href", "BedWhiteBoard.aspx?wbt=" + wbType);

        });

        function GetQueryStringParams(sParam) {
            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split('&');
            for (var i = 0; i < sURLVariables.length; i++) {
                var sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] == sParam) {
                    return sParameterName[1];
                }
            }
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

                <div class="modal fade" id="modalFormStyle9" tabindex="-1" role="dialog" aria-labelledby="modalFormStyle9Label" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="widget widget-blue">
                                <div class="widget-title">

                                    <h3><i class="icon-ok-sign"></i>Bed Function</h3>
                                </div>
                                <div class="widget-content">
                                    <div class="modal-body">
                                        <div class="form-group">
                                            <button style="width: 100%" type="button" class="btn btn-action btn-primary btn-sm"><i class="icon-envelope-alt"></i>Patient Medical Records</button>
                                        </div>
                                        <div class="form-group">
                                            <button style="width: 100%" type="button" class="btn btn-action btn-primary btn-sm"><i class="icon-envelope-alt"></i>Request for Admission</button>
                                        </div>
                                        <div class="form-group">
                                            <button style="width: 100%" type="button" class="btn btn-action btn-primary btn-sm"><i class="icon-envelope-alt"></i>Discharge Order</button>
                                        </div>
                                        <div class="form-group">
                                            <button style="width: 100%" type="button" class="btn btn-action btn-primary btn-sm"><i class="icon-envelope-alt"></i>Transfer Order</button>
                                        </div>
                                        <button style="width: 100%" type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
                                    <label for="txtNotyInterval">Operation notificaion interval<input class="form-control input-sm" type="text" id="txtNotyInterval" style="width: 50px;" value="5" /></label>
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

                                <div class="page_control">
                                    <div id="wbToolBar" style="display: none;">
                                        <table style="width: 100%; margin-bottom: 10px;">
                                            <tr>
                                                <td>
                                                    <span id="layoutStyle" class="btn-group" data-toggle="buttons" style="display: none;">

                                                        <label class="btn btn-default">
                                                            <input id="rdoGraphical" name="radioLayout" type="radio" value="roomsAndBedsTmpl" data-bind="checked: selectedView" onchange="rdoGraphical_Changed();" />Graphical
                                                        </label>
                                                        <label class="btn btn-default active">
                                                            <input id="rdoTabular" name="radioLayout" type="radio" value="roomsAndBedsTmpl2" data-bind="checked: selectedView" onchange="rdoTabular_Changed();" />Tabular
                                                        </label>
                                                    </span>



                                                    <span id="toolBar" style="display: none; float: left;margin-left: 10px;">
                                                        <img id="btnEdit" src="images/move.png" style="width: 32px; height: 32px; display: inline; cursor: pointer" onclick="btnEdit_click();" />
                                                        <img id="btnSave" src="images/camera_test.png" style="width: 32px; height: 32px; display: none; cursor: pointer" onclick="btnSave_click();" />
                                                        <img id="btnCancel" src="images/button_cancel_256.png" style="width: 32px; height: 32px; display: none; cursor: pointer" onclick="btnCancel_click();" />

                                                    </span>

                                                    <span id="bedSizeBar" style="display: none; float: left;">
                                                        <label for="bedSizeAmount" style="float: left; margin-top: 8px; margin-left: 6px;">Size:</label>
                                                        <input type="text" id="bedSizeAmount" style="width: 20px; height: 10px; font-size: small; float: left; margin-top: 8px; margin-left: 2px;" />

                                                        <div id="bedSize" style="width: 100px; float: left; margin-top: 12px; margin-left: 6px;"></div>
                                                    </span>
                                                </td>
                                                <td style="text-align: right;">
                                                    <span id="connBtnWb" class="DisConnectedBtn">Disconnected
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>



                                    </div>


                                </div>

                                <div id="erToolBar" style="display: none;">
                                    <table style="width: 100%;">
                                        <tr>
                                            <td>
                                                <div class="btn-group" data-toggle="buttons" style="margin-top: 0px; margin-bottom: 0px;visibility:hidden">
                                                    <label class="btn btn-default active">
                                                        <input type="radio" name="erviews" id="rdoNormal" value="normal" checked="checked" data-bind="checked: selectedErView" onchange="rdoNormal_Changed()">Detailed
                                                    </label>
                                                    <label class="btn btn-default">
                                                        <input type="radio" name="erviews" id="rdoAll" value="all" data-bind="checked: selectedErView" onchange="rdoAll_Changed()">Monitor All
                                                    </label>

                                                </div>
                                                <div id="patientsFilters" class="btn-group" data-toggle="buttons" style="display: none; margin-top: 0px; margin-left: 14px; margin-bottom: 0px;">
                                                    <label class="btn btn-default active">
                                                        <input type="radio" name="patientsFilter" id="rdoAllCurrent" value="AllCurrent" checked="checked" onchange="rdoAllCurrent_Changed()">All Current
                                                    </label>
                                                    <label class="btn btn-default">
                                                        <input type="radio" name="patientsFilter" id="rdoToTriage" value="ToTriage" onchange="rdoToTriage_Changed()">Pending Triage
                                                    </label>
                                                    <label class="btn btn-default">
                                                        <input type="radio" name="patientsFilter" id="rdoTriaged" value="Triaged" onchange="rdoTriaged_Changed()">Triaged
                                                    </label>
                                                    <label class="btn btn-default">
                                                        <input type="radio" name="patientsFilter" id="rdoTreatment" value="Treatment" onchange="rdoTreatment_Changed()">In Treatment
                                                    </label>
                                                    <label class="btn btn-default">
                                                        <input type="radio" name="patientsFilter" id="rdoAdmitted" value="Admitted" onchange="rdoAdmitted_Changed()">Admitted
                                                    </label>
                                                    <label class="btn btn-default">
                                                        <input type="radio" name="patientsFilter" id="rdoDischarged" value="Discharged" onchange="rdoDischarged_Changed()">Discharged
                                                    </label>
                                                </div>
                                            </td>
                                            <td style="text-align: right;">
                                                <div style="margin-top: 0px;" id="connBtnEr" class="DisConnectedBtn">
                                                    Disconnected
                                                </div>

                                            </td>
                                        </tr>
                                    </table>






                                    <%--<div style="display: inline; float: left;">
                                            <img id="collAll" src="images/expand_arrow_alt.png" style="width: 32px; height: 32px; display: none; cursor: pointer" onclick="btnCollapseAll_click();" />
                                        </div>--%>
                                </div>

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
                                        <div class="col-md-7">
                                            <div style="margin-top: -6px; margin-bottom: 6px;">
                                                <div>
                                                    <table style="height: 10px; border: 0px; margin: 0; padding: 0; font-size: small; text-align: center; color: #fff; /*background-color: rgb(207, 202, 202); */">
                                                        <tr>
                                                            <td class="fc-event scheduled">Scheduled</td>
                                                            <td class="fc-event sendToOT">Sent to OT</td>
                                                            <td class="fc-event patTransfered">Patient Arrived</td>
                                                            <td class="fc-event patientInOR">Patient in OR</td>
                                                            <td class="fc-event ansStart">Anesthesia Start</td>
                                                            <td class="fc-event surgeryStart">Surgery Start</td>
                                                            <td class="fc-event knifeToSkin">Knife to Skin</td>
                                                        </tr>
                                                        <tr>
                                                            <td class="fc-event surgeryEnd">Surgery End</td>
                                                            <td class="fc-event inductionEnd">Anesthesia End</td>
                                                            <td class="fc-event patientOutOfOR">Patient out of OR</td>
                                                            <td class="fc-event inRecovery">In recovery</td>
                                                            <td class="fc-event InICUOrWard">Out of Recovery</td>
                                                            <td class="fc-event patientLeftOT">Patient Left OT</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </div>

                                        </div>
                                        <div class="col-md-2" style="text-align: right; padding-right: 0;">
                                            <div style="margin-top: 0px;" id="connBtnOp" class="DisConnectedBtn">
                                                Disconnected
                                            </div>
                                        </div>
                                    </div>




                                </div>
                            </div>


                            <input type="hidden" id="hdnPath" />

                            <div id="wbView" style="display: none;">

                                <div id="wbNsList" data-bind="template: { name: templateToUse2, foreach: nursestations }">
                                </div>

                                <div>
                                    <div id="selectedNS" class="ShinyButton" data-bind="click: $root.closeNS, foreach: $root.SelectedNs" style="opacity: 0.0;">
                                        <table style="width: 100%;">
                                            <colgroup>
                                                <col width="3%">
                                                <col width="67%">
                                                <col width="30%">
                                            </colgroup>
                                            <tr>
                                                <td>
                                                    <img src="assets/images/user_medical_female.png" alt="">
                                                </td>
                                                <td>
                                                    <div style="display: inline-block; vertical-align: top;">
                                                        <span style="font-size: 30px; font-weight: 100; color: #019bd7;" data-bind="text: latin_desc, attr: { id: 'spnSelectedNS' + sys_key() }"></span>
                                                        <%--<div data-bind="foreach: alerts">
                                            <img data-bind="attr: { src: icon, width: 32, height: 32 }" />
                                            <span data-bind="text: toolTip, style: { color: color }"></span>
                                        </div>--%>
                                                    </div>
                                                    <br />
                                                    <%--                                    <div class="nur_tasks">
                                                        <table style="font-size:12px;">
                                                            <tbody><tr>
                                                                <td>
                                                                    <b>Nurse Name:</b>
                                                                </td>
                                                                <td>
                                                                    Ay Name YallaBina
                                                                </td>
                                                                <td> / </td>
                                                                <td>
                                                                    <b>Tasks:</b>
                                                                </td>
                                                                <td>
                                                                    Ay Task Felhawa
                                                                </td>
                                                            </tr>
                                                        </tbody></table>
                                                    </div>   
                                                        <br />                                                 --%>
                                                    <div class="nur_alerts">
                                                        <table style="font-size: 12px;">
                                                            <tbody>
                                                                <tr>
                                                                    <td>New Admissions:
                                                                    </td>
                                                                    <td>
                                                                        <b>(<span data-bind="text: PatAdmission"></span>)</b>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div class="nur_alerts">
                                                        <table style="font-size: 12px;">
                                                            <tbody>
                                                                <tr>
                                                                    <td>Pending Discharge:
                                                                    </td>
                                                                    <td>
                                                                        <b>(<span data-bind="text: PatDischarge"></span>)</b>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div class="nur_alerts">
                                                        <table style="font-size: 12px;">
                                                            <tbody>
                                                                <tr>
                                                                    <td>DAMA:
                                                                    </td>
                                                                    <td>
                                                                        <b>(<span data-bind="text: DAMA"></span>)</b>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    <div class="nur_alerts">
                                                        <table style="font-size: 12px;">
                                                            <tbody>
                                                                <tr>
                                                                    <td>Out OnPass:
                                                                    </td>
                                                                    <td>
                                                                        <b>(<span data-bind="text: OutOnPass"></span>)</b>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </td>
                                                <td>
                                                    <table style="text-align: center; width: 100%;">
                                                        <tr class="th_header">
                                                            <th style="border: solid 1px #eab551 !important; border-bottom: solid 1px #b98a37 !important;">Available Beds
                                                            </th>
                                                            <th style="border: solid 1px #eab551 !important; border-bottom: solid 1px #b98a37 !important;">Occupied Male
                                                            </th>
                                                            <th style="border: solid 1px #eab551 !important; border-bottom: solid 1px #b98a37 !important;">Occupied Female
                                                            </th>
                                                            <th style="border: solid 1px #eab551 !important; border-bottom: solid 1px #b98a37 !important;">Total Occupied
                                                            </th>
                                                            <th style="border: solid 1px #eab551 !important; border-bottom: solid 1px #b98a37 !important;">Blocked Beds
                                                            </th>

                                                            <%--                                                                <th>
                                                                    DAMA
                                                                </th>
                                                                <th>
                                                                    Out OnPass
                                                                </th>
                                                                <th>
                                                                    Transfer In
                                                                </th>
                                                                <th>
                                                                   Transfer Out
                                                                </th>--%>
                                                        </tr>
                                                        <tr style="font-size: 50px; font-weight: 100; text-align: center;">
                                                            <td>
                                                                <span data-bind="text: emptyBeds"></span>
                                                            </td>
                                                            <td>
                                                                <span data-bind="text: occupiedMale"></span>
                                                            </td>
                                                            <td>
                                                                <span data-bind="text: occupiedFemale"></span>
                                                            </td>
                                                            <td>
                                                                <span data-bind="text: occupiedPat"></span>
                                                            </td>
                                                            <td>
                                                                <span data-bind="text: blockedBeds"></span>
                                                            </td>
                                                            <%--                                                                <td>
                                                                    <span data-bind="text: DAMA" ></span>
                                                                </td>
                                                                <td>
                                                                    <span data-bind="text: OutOnPass" ></span>
                                                                </td>
                                                                <td>
                                                                    <span data-bind="text: T_in" ></span>
                                                                </td>
                                                                <td>
                                                                    <span data-bind="text: T_Out" ></span>
                                                                </td>--%>
                                                        </tr>
                                                    </table>
                                                    <div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </table>

                                    </div>
                                </div>

                                <div id="wbRoomsBeds" style="display: none;">

                                    <div class="panelfullwidth">

                                        <div id="wbbedsTitle" style="visibility: hidden; display: none;" class="bedTabularTitle">
                                            <table style="border: 0; padding: 0; border-spacing: 0; margin: 0;">
                                                <tr>
                                                    <td style="margin: 0; text-align: left; width: 50px;">Bed</td>
                                                    <td style="margin: 0; text-align: left; width: 150px">Patient Name</td>
                                                    <td style="margin: 0; text-align: left; width: 150px">Doctor Name</td>
                                                    <td style="margin: 0; text-align: left; width: 150px">Speciality</td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div id="wbroomsAndBeds" data-bind="template: { name: templateToUse, foreach: roomsAndBeds }" style="display: block; opacity: 0.0; margin-left: -100px; margin-right: 100px;">
                                        </div>


                                    </div>

                                </div>

                            </div>

                            <div id="erView" style="display: none;">
                                <div id="rangeSelectorContainer"></div>


                                <div id="erDetailed" style="/*display: flex; */ /*width: 100%; */">

                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="widget widget-blue" style="box-shadow: none;">
                                                <div id="wpLbl" style="display: none; transform: rotate(-90deg) translate(-500%,0%); -moz-transform: rotate(-90deg) translate(-500%,0%); -webkit-transform: rotate(-90deg) translate(-500%,0%); -o-transform: rotate(-90deg) translate(-500%,0%); -ms-transform: rotate(-90deg) translate(-500%,0%); transform-origin: top left; -ms-transform-origin: top left; -webkit-transform-origin: top left;">Emergency Area</div>
                                                <div>

                                                    <!--Patient Banner-->
                        <div style="display: none" class="row Patient-Banner">
                            <div class="col-md-12">
                                <div>

                                    <table style="text-align: left; width: 100%; border: 1px solid #d0d0d0;">
                                        <tr style="border-bottom: 1px solid #d0d0d0;">
                                            <td>
                                                <h3 id="pbName" style="margin-bottom: 10px; margin-top: 10px;">CHANDRASHKHER, Suberamanyan (Mr) </h3>
                                            </td>
                                            <td style="text-align: right;">
                                                <table style="width: 60%; float: right;">
                                                    <tr>
                                                        <td>
                                                            <label><i>Born</i></label>
                                                            <span id="pbBDate">14-Jul-1945 (61y)</span>
                                                        </td>
                                                        <td>
                                                            <label><i>Gender</i></label>
                                                            <span id="pbGender">Male</span>
                                                        </td>
                                                        <td>
                                                            <label><i>NHS/MRN No.</i></label>
                                                            <span id="pbMRN">129 728 7652</span>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="2" style="padding: 0;">
                                                <table style="text-align: left; width: 100%;">
                                                    <col width="20%">
                                                    <col width="20%">
                                                    <col width="20%">
                                                    <col width="20%">
                                                    <col width="15%">
                                                    <col width="5%">
                                                    <tr style="vertical-align: middle;display:none;">
                                                        <td style="border-right: 1px solid #d0d0d0;">
                                                            <label><i>Address</i> </label>
                                                            340 Gloucestar R....
                                                        </td>
                                                        <td style="border-right: 1px solid #d0d0d0;">
                                                            <label><i title="Phone and Email">Phone and Email</i></label>
                                                            020 8123 4567
                                                        </td>
                                                        <td style="border-right: 1px solid #d0d0d0;"></td>
                                                        <td style="border-right: 1px solid #d0d0d0;"></td>
                                                        <td style="width: 191px;">
                                                            <div class="allergies_div_known">
                                                            </div>
                                                        </td>
                                                        <td style="background-color: lightgray;">
                                                            <div id="slide_patient_data_details" class="slide_patient_data_details_down"></div>
                                                        </td>
                                                    </tr>
                                                </table>

                                            </td>
                                        </tr>
                                    </table>
                                    <div style="display: none;" class="patient_data_details_slide">
                                        <table style="width: 100%; text-align: left; border: 1px solid #d0d0d0; border-top: none;">
                                            <col width="20%">
                                            <col width="20%">
                                            <col width="20%">
                                            <col width="20%">
                                            <col width="15%">
                                            <col width="5%">

                                            <tr>
                                                <td style="border-right: 1px solid #d0d0d0;">
                                                    <label><i>Usual address</i></label>
                                                    <div>
                                                        340 Gloucestar Road<br />
                                                        Walton<br />
                                                        Tewkesbury<br />
                                                        GL20 4RT<br />
                                                        <a href="#" class="link_patient_pan">View all addresses
                                                        </a>
                                                    </div>
                                                </td>
                                                <td style="border-right: 1px solid #d0d0d0;">
                                                    <div>
                                                        <table>
                                                            <tr>
                                                                <td>
                                                                    <label><i>Home</i></label>
                                                                </td>
                                                                <td>020 8123 4567 
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label><i>Work</i> </label>
                                                                </td>
                                                                <td>0118 4960823
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label><i>Mobile</i></label>
                                                                </td>
                                                                <td>07700 900555 
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label><i>Email</i></label>
                                                                </td>
                                                                <td>rama@abc.xyz.com
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <a href="#" class="link_patient_pan">View all addresses
                                                        </a>
                                                    </div>
                                                </td>
                                                <td style="border-right: 1px solid #d0d0d0;"></td>
                                                <td style="border-right: 1px solid #d0d0d0;"></td>
                                                <td colspan="2">
                                                    <div>
                                                        <table style="width: 100%;">
                                                            <tr>
                                                                <td>
                                                                    <label><i>Latex</i></label>
                                                                </td>
                                                                <td>14-Nov-1961
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label><i>Peanuts</i></label>
                                                                </td>
                                                                <td>15-Aug-1997
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <label><i>Penicillin</i></label>
                                                                </td>
                                                                <td>2-Oct-2003
                                                                </td>
                                                            </tr>
                                                        </table>
                                                        <br />
                                                        <a href="#" class="link_patient_pan">View all addresses
                                                        </a>
                                                    </div>

                                                </td>
                                                <td></td>
                                            </tr>

                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--End Patient Banner-->

                                                    <div id="erNsList" data-bind="template: { name: erWpList, foreach: nursestations }"></div>

                                                </div>

                                            </div>
                                        </div>

                                        <%--                                                                                    <div class="col-md-2">
                                            <div class="panel3">
                                                <div id="SmLbl" class="wpHeader" style="display: none; transform: rotate(-90deg) translate(-500%,0%); -moz-transform: rotate(-90deg) translate(-500%,0%); -webkit-transform: rotate(-90deg) translate(-500%,0%); -o-transform: rotate(-90deg) translate(-500%,0%); -ms-transform: rotate(-90deg) translate(-500%,0%); transform-origin: top left; -ms-transform-origin: top left; -webkit-transform-origin: top left;">Summary</div>
                                                <span class="wpHeader">Summary</span>
                                                <div id="erNsSummary" data-bind="template: { name: 'erNsSumm', foreach: nursestations }">
                                                </div>
                                            </div>
                                        </div>--%>
                                    </div>

                                </div>

                                <div id="erMoitorAll" class="row" style="display: none; opacity: 0.0; margin-left: -40px; width: 100%;">
                                    <div class="col-md-9">
                                        <div class="widget widget-blue">
                                            <div class="widget-title">
                                                <h3><i class="icon-search"></i>All Patients </h3>
                                            </div>
                                            <div class="widget-content">
                                                <div id="erAllPatients" data-bind="template: { name: 'erAll', foreach: nursestations }"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="widget widget-blue">
                                            <div class="widget-title">
                                                <h3><i class="icon-search"></i>Summary </h3>
                                            </div>
                                            <div class="widget-content">
                                                <div class="row">
                                                    <div id="container-down" style="min-width: 280px; height: 400px; margin: 0 auto"></div>
                                                    <pre id="tsv" style="display: none">Browser Version	Total Market Share
                                                        Main A , E Area 8.0	26.61%
                                                        Main A , E Area 9.0	16.96%
                                                        Main A , E Area 10.0	36.96%
                                                        Observation 18.0	8.01%
                                                        Observation 19.0	7.73%
                                                        Rapid Access 12	6.72%
                                                        Main A , E Area 6.0	6.40%
                                                        Rapid Access 11	4.72%
                                                        Main A , E Area 7.0	3.55%
                                                        Minor Injuries 5.1	3.53%
                                                        Rapid Access 13	2.16%
                                                        Rapid Access 3.6	1.87%
                                                        Paediatrics 11.x	1.30%
                                                        Observation 17.0	1.13%
                                                        Rapid Access 10	0.90%
                                                        Minor Injuries 5.0	0.85%
                                                        Rapid Access 9.0	0.65%
                                                        Rapid Access 8.0	0.55%
                                                        Rapid Access 4.0	0.50%
                                                        Observation 16.0	0.45%
                                                        Rapid Access 3.0	0.36%
                                                        Rapid Access 3.5	0.36%
                                                        Rapid Access 6.0	0.32%
                                                        Rapid Access 5.0	0.31%
                                                        Rapid Access 7.0	0.29%
                                                        Resus	10.29%
                                                        Observation 18.0 - Maxthon Edition	0.26%
                                                        Observation 14.0	0.25%
                                                        Observation 20.0	0.24%
                                                        Observation 15.0	0.18%
                                                        Observation 12.0	0.16%
                                                        Paediatrics 12.x	0.15%
                                                        Minor Injuries 4.0	0.14%
                                                        Observation 13.0	0.13%
                                                        Minor Injuries 4.1	0.12%
                                                        Observation 11.0	0.10%
                                                        Rapid Access 14	0.10%
                                                        Rapid Access 2.0	0.09%
                                                        Observation 10.0	0.09%
                                                        Paediatrics 10.x	0.09%
                                                        Main A , E Area 8.0 - Tencent Traveler Edition	0.09%</pre>
                                                </div>
                                                <div class="row">
                                                    <!--teet-->
                                                    <div id="container_pie_all" style="width: 300px; height: 200px; margin: 0 auto"></div>


                                                    <table class="table-bordered" style="width: 100%; font-size: 10px; margin-top: -20px; margin-bottom: 10px;">
                                                        <tbody>
                                                            <tr>
                                                                <td>Bed Available
                                                                </td>
                                                                <td style="text-align: center; background-color: rgb(113, 168, 67); color: white;">15
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>Bed Occupied
                                                                </td>
                                                                <td style="text-align: center; background-color: rgb(214, 59, 63); color: white;">10
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>




                                                <%--                                                    <div id="erNsSummary2" data-bind="template: { name: 'erNsSumm', foreach: nursestations }"></div>--%>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

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

        <script id="nsTmpl" type="text/html">
            <table style="margin-top: 5px;">
                <tbody>
                    <tr>
                        <td>
                            <div>
                                <button data-bind="click: editClick"></button>
                            </div>
                        </td>
                    </tr>
                    <tr data-bind="click: $root.openNS">
                        <td>
                            <div class="ShinyButton">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <span style="font-size: 20px; font-weight: bold;" data-bind="text: latin_desc, attr: { id: 'spnNS' + sys_key() }"></span>
                                                <table style="text-align: left; vertical-align: top; padding: 0;">
                                                    <tr data-bind="foreach: alerts">
                                                        <td>data-bind="click: $root.openNS"
                                                            <img data-bind="attr: { src: icon, width: 32, height: 32 }" />
                                                        </td>
                                                        <td>
                                                            <span data-bind="text: toolTip, style: { color: color }"></span>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                            <td>New Admissions:<span data-bind="text: PatAdmission"></span>
                                            </td>
                                            <td>Pending Discharge:<span data-bind="text: PatDischarge"></span>
                                            </td>
                                            <td>DAMA:<span data-bind="text: DAMA"></span>
                                            </td>
                                            <td>Out OnPass:<span data-bind="text: OutOnPass"></span>
                                            </td>
                                            <td>Transfer In:<span data-bind="text: T_in"></span>
                                            </td>
                                            <td>Transfer Out:<span data-bind="text: T_Out"></span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </script>

        <script id="nsTmpl2" type="text/html">
            <tbody>
                <tr data-bind="click: $root.openNS">
                    <td>
                        <div class="ShinyButton2" style="height: 80px">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <span style="font-size: 12px; font-weight: bold;" data-bind="text: latin_desc"></span>
                                            <table style="text-align: left; vertical-align: top; padding: 0;">
                                                <tr style="background-color: transparent;">
                                                    <td data-bind="foreach: alerts">
                                                        <img data-bind="attr: { src: icon, width: 32, height: 32 }" />
                                                        <span data-bind="text: toolTip, style: { color: color }" style="font-size: 10px;"></span>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                        <td>
                                            New Admissions: <span data-bind="text: PatAdmission"></span>
                                            Pending Discharge: <span data-bind="text: PatDischarge"></span>
                                            DAMA:<span data-bind="text: DAMA"></span>
                                            Out OnPass: <span data-bind="text: OutOnPass"></span>
                                            Transfer In: <span data-bind="text: T_in"></span>
                                            Transfer Out: <span data-bind="text: T_Out"></span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </td>
                </tr>
            </tbody>

        </script>

        <script id="nsTmpl3" type="text/html">

            <div class="ShinyButton" data-bind="click: $root.openNS">

                <table style="width: 100%">
                    <colgroup>
                        <col width="3%">
                        <col width="57%">
                        <col width="40%">
                    </colgroup>
                    <thead>
                        <tr class="th_header">
                        <th colspan="2">
                        </th>
                        
                        <th style="padding: 0;">
                            <table style="width:100%">
                                <colgroup>
                                    <col width="10%">
                                    <col width="10%">
                                    <col width="10%">
                                    <col width="10%">
                                    <col width="10%">
                                </colgroup>
                                <tr>
                                    <th>Available Beds
                                    </th>
                                    <th>Occupied Male
                                    </th>
                                    <th>Occupied Female
                                    </th>
                                    <th>Total Occupied
                                    </th>
                                    <th>Blocked Beds
                                    </th>
                                </tr>
                            </table>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>
                            <img src="assets/images/user_medical_female.png" alt="">
                        </td>
                        <td>
                            <div style="font-size: 30px; font-weight: 100; color: #019bd7;" data-bind="text: latin_desc, attr: { id: 'spnNS' + sys_key() }"></div>
                            <%--                                            <div class="nur_tasks">
                    <table style="font-size:12px;">
                        <tr>
                            <td>
                                <b>Nurse Name:</b>
                            </td>
                            <td>
                                Ay Name YallaBina
                            </td>
                            <td> / </td>
                            <td>
                                <b>Tasks:</b>
                            </td>
                            <td>
                                Ay Task Felhawa
                            </td>
                        </tr>
                    </table>
                </div>
                            <br />--%>
                            <div class="nur_alerts">
                                <table style="font-size: 12px;">
                                    <tr>
                                        <td>New Admissions:
                                        </td>
                                        <td>
                                            <b>(<span data-bind="text: PatAdmission"></span>)</b>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class="nur_alerts">
                                <table style="font-size: 12px;">
                                    <tr>
                                        <td>Pending Discharge:
                                        </td>
                                        <td>
                                            <b>(<span data-bind="text: PatDischarge"></span>)</b>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class="nur_alerts">
                                <table style="font-size: 12px;">
                                    <tr>
                                        <td>DAMA:
                                        </td>
                                        <td>
                                            <b>(<span data-bind="text: DAMA"></span>)</b>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class="nur_alerts">
                                <table style="font-size: 12px;">
                                    <tr>
                                        <td>Out OnPass:
                                        </td>
                                        <td>
                                            <b>(<span data-bind="text: OutOnPass"></span>)</b>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <%--                            <div style="font-size:10px;" data-bind="foreach: alerts">
                                <img data-bind="attr: { src: icon, width: 32, height: 32 }" />
                                <span data-bind="text: toolTip, style: { color: color }"></span>
                            </div>--%>
                            
                        </td>
                        <td>
                            <table style="font-size: 10px; text-align: center; width: 100%">
                                <colgroup>
                                    <col width="10%">
                                    <col width="10%">
                                    <col width="10%">
                                    <col width="10%">
                                    <col width="10%">
                                </colgroup>
                                <tr style="font-size: 50px; font-weight: 100; text-align: center;">
                                    <td>
                                        <span data-bind="text: emptyBeds"></span>
                                    </td>
                                    <td>
                                        <span data-bind="text: occupiedMale"></span>
                                    </td>
                                    <td>
                                        <span data-bind="text: occupiedFemale"></span>
                                    </td>
                                    <td>
                                        <span data-bind="text: occupiedPat"></span>
                                    </td>
                                    <td>
                                        <span data-bind="text: blockedBeds"></span>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                    
                    
                </table>


            </div>
        </script>

        <script id="nsOP" type="text/html">
            <div class="panelfullwidth">


                <!--OPo-->


                <div style="margin-bottom: 5px;" class="accHeader" data-bind="click: collapseNS">
                    <table class="table">
                        <tr>
                            <td style="text-align: center;">
                                <img style="padding: 5px;" src="assets/images/user_medical.png" /><span style="font-size: 20px; font-weight: 300; color: #019bd7; vertical-align: middle;" data-bind="text: latin_desc, attr: { id: 'spnNS' + sys_key() }"></span>
                            </td>
                        </tr>
                    </table>
                    <%--<img data-bind="attr: { id: 'imgNSColl' + sys_key() }" src="images/expand_arrow_alt.png" style="width: 32px; height: 32px; display: none; cursor: pointer;" />--%>
                </div>

                <div id="opRoomsBeds" class="accContent" style="display: none">

                    <div data-bind="attr: { id: 'calendar' + sys_key() }"></div>
                    <%--<div id="contextMenuContainer" style='background-color: #f0f0f0; width: 100px; height: 100px; display: none; z-index: 999; border-radius: 5px; border: 1px solid black; position: absolute;'></div>--%>
                </div>



            </div>

        </script>

        <script id="roomsAndBedsTmpl" type="text/html">

            <div data-bind="style: { left: x, top: y, width: width, height: height, 'transform': 'rotate(' + rotation() + 'deg)', '-moz-transform': 'rotate(' + rotation() + 'deg)', '-webkit-transform': 'rotate(' + rotation() + 'deg)', '-o-transform': 'rotate(' + rotation() + 'deg)', '-ms-transform': 'rotate(' + rotation() + 'deg)' }, attr: { 'id': 'roomId' + room_key() }" class="room ui-widget-content">

                <span data-bind="text: room_name"></span>
                <div data-bind="attr: { 'id': 'rotateArrows' + room_key() }" style="display: none; float: right;">
                    <img id="imgRotateDL" src="Images/control_double_left.png" data-bind="click: rotateDLeftClick" style="width: 16px; height: 16px; cursor: pointer" />
                    <img id="imgRotateL" src="Images/control_left.png" data-bind="click: rotateLeftClick" style="width: 12px; height: 16px; cursor: pointer" />
                    <span data-bind="attr: { 'id': 'degreeR' + room_key() },'text': rotation" style="width: 16px; height: 16px"></span>
                    <img id="imgRotateR" src="Images/control_right.png" data-bind="click: rotateRightClick" style="width: 12px; height: 16px; cursor: pointer" />
                    <img id="imgRotateDR" src="Images/control_double_right.png" data-bind="click: rotateDRightClick" style="width: 16px; height: 16px; cursor: pointer" />
                </div>
            </div>

            <div data-bind="foreach: beds">
                <!-- ko if: iswaitingarea !== '1' -->
                <div data-bind="style: { left: x, top: y, 'transform': 'rotate(' + rotation() + 'deg)', '-moz-transform': 'rotate(' + rotation() + 'deg)', '-webkit-transform': 'rotate(' + rotation() + 'deg)', '-o-transform': 'rotate(' + rotation() + 'deg)', '-ms-transform': 'rotate(' + rotation() + 'deg)', color: patient_sex() == 1 }, attr: { 'id': 'bedId' + sys_key(), 'class': 'bed ' + sexClass() }">
                    <span data-bind="text: latin_desc() +  ' | ' + patient_id()"></span>
                    <div data-bind="attr: { 'id': 'rotateArrowsB' + sys_key() }" style="display: none; float: right;">
                        <img id="imgRotateDLB" src="Images/control_double_left.png" data-bind="click: rotateDLeftClickB" style="width: 16px; height: 16px; cursor: pointer" />
                        <img id="imgRotateLB" src="Images/control_left.png" data-bind="click: rotateLeftClickB" style="width: 12px; height: 16px; cursor: pointer" />
                        <span data-bind="attr: { 'id': 'degreeB' + sys_key() }, 'text': rotation" style="width: 16px; height: 16px">0</span>
                        <img id="imgRotateRB" src="Images/control_right.png" data-bind="click: rotateRightClickB" style="width: 12px; height: 16px; cursor: pointer" />
                        <img id="imgRotateDRB" src="Images/control_double_right.png" data-bind="click: rotateDRightClickB" style="width: 16px; height: 16px; cursor: pointer" />
                    </div>
                    <div data-bind="foreach: bedAlerts">
                            <img data-bind="attr: { 'id': 'bedAlert' + patient_id() + alert_name(), src: icon,title: tooltip}" style="width: 20px; height: 20px;cursor: pointer" class="try_iconshadWB" />
                        </div>
                </div>
                <!-- /ko -->
            </div>

        </script>

        <script id="roomsAndBedsTmpl2" type="text/html">

            <div data-bind="attr: { 'id': 'roomId' + room_key() }" class="roomTabular">
                <table class="table" style="margin-bottom: 0px !important;">
                    <colgroup>
                        <col width="3%" />
                        <col width="17%" />
                        <col width="80%" />
                    </colgroup>

                    <tr>
                        <td>
                            <img src="assets/images/door.png" />
                        </td>
                        <td>
                            <span data-bind="text: room_name"></span>
                        </td>
                        <td>
                            <div data-bind="foreach: beds">
                                <!-- ko if: iswaitingarea !== '1' -->
                                <div data-bind="attr: { 'id': 'bedId' + sys_key(), 'class': 'bedTabular ' + sexClass() }">
                                    <table style="border: 0; padding: 0; border-spacing: 0; margin: 0;">
                                        <tr>
                                            <td data-bind="text: latin_desc" style="margin: 0; text-align: left; width: 50px;"></td>
                                            <td data-bind="text: patient_id" style="margin: 0; text-align: left; width: 80px;"></td>
                                            <td data-bind="text: patengname" style="margin: 0; text-align: left; width: 150px"></td>
                                            <td data-bind="text: physician" style="margin: 0; text-align: left; width: 150px"></td>
                                            <td data-bind="text: specialty" style="margin: 0; text-align: left; width: 150px"></td>
                                            <td style="margin: 0; text-align: left;">
                                                <div data-bind="foreach: bedAlerts">
                                                    <img data-bind="attr: { 'id': 'bedAlert' + patient_id() + alert_name(), src: icon,title: tooltip }" style="width: 20px; height: 20px; cursor: pointer" class="try_iconshadWB"/>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <!-- /ko -->
                            </div>

                        </td>
                    </tr>
                </table>


            </div>

        </script>

        <script id="roomsAndBedsTmpl2RB" type="text/html">

            <div data-bind="attr: { 'id': 'roomId' + room_key() }" class="roomTabular">
                <table class="table" style="margin-bottom: 0px !important;">
                    <colgroup>
                        <col width="3%" />
                        <col width="17%" />
                        <col width="80%" />
                    </colgroup>
                    <thead>
                        <tr class="th_header">
                            <th colspan="2">
                                Room Name
                            </th>
<%--                            <th>
                                Room Name
                            </th>--%>
                            <th style="padding:0;">
                                <table style="width:100%;">
                                    <colgroup>
                                            <col width="10%">
                                            <col width="10%">
                                            <col width="10%">
                                            <col width="10%">
                                            <col width="10%">
                                        </colgroup>
                                        <thead>
                                            <tr class="th_header">
                                                <th>
                                                    Bed Name
                                                </th>
                                                <th>
                                                    Patient ID
                                                </th>
                                                <th>
                                                    Patient Name
                                                </th>
                                                <th>
                                                    Physician
                                                </th>
                                                <th>
                                                    Specialty
                                                </th>
                                            </tr>
                                        </thead>
                                </table>
                            </th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>
                            <img src="assets/images/door.png" />
                        </td>
                        <td>
                            <span data-bind="text: room_name"></span>
                        </td>
                        <td style="padding: 5px 0;">
                            <div data-bind="foreach: beds">
                                <!-- ko if: iswaitingarea !== '1' -->
                                <div data-bind="attr: { 'id': 'bedId' + sys_key(), 'class': 'bedTabular ' + sexClass() }" >
                                    <table style="border: 0; padding: 0; border-spacing: 0; margin: 0; width:100%;">
                                        <colgroup>
                                            <col width="10%">
                                            <col width="10%">
                                            <col width="10%">
                                            <col width="10%">
                                            <col width="10%">
                                        </colgroup>
                                        <thead style="display:none;">
                                            <tr class="th_header">
                                                <th>
                                                    Bed Name
                                                </th>
                                                <th>
                                                    Patient ID
                                                </th>
                                                <th>
                                                    Patient Name
                                                </th>
                                                <th>
                                                    Physician
                                                </th>
                                                <th>
                                                    Specialty
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr data-bind="click: RecoveryBedClick" >
                                            <td data-bind="text: latin_desc" style="margin: 0; text-align: center;"></td>
                                            <td data-bind="text: patient_id" style="margin: 0; text-align: center;"></td>
                                            <td data-bind="text: patengname" style="margin: 0; text-align: center;"></td>
                                            <td data-bind="text: physician" style="margin: 0; text-align: center;"></td>
                                            <td data-bind="text: specialty" style="margin: 0; text-align: center;"></td>
                                        </tr>
                                        </tbody>
                                        
                                    </table>
                                </div>
                                <!-- /ko -->
                            </div>

                        </td>
                    </tr>
                    </tbody>
                    
                </table>
            </div>

        </script>

        <script id="nsERWPSmall" type="text/html">

            <div class="panelfullwidthS">

                <div style="display: inline; vertical-align: top; height: 25px">

                    <div data-bind="click: collapseNS" class="accHeader" style="display: inline; vertical-align: top; height: 25px">


                        <!--tryh-->

                        <table class="table" data-area="main_header_area">
                            <colgroup>
                                <col width="4%" />
                                <col width="26%" />
                                <col width="10%" />
                                <col width="10%" />
                                <col width="10%" />
                                <col width="10%" />
                                <col width="10%" />
                                <col width="5%" />
                                <col width="5%" />
                                <col width="10%" />
                            </colgroup>
                            <thead>
                                <tr class="main_th">
                                    <th></th>
                                    <th>Area Name</th>
                                    <th>Waiting Patients</th>
                                    <th>In Treatment</th>
                                    <th>Beds Occupied</th>
                                    <th>Beds Available</th>
                                    <th>Holding Bay</th>
                                    <th>Pending Triage</th>
                                    <th>Pending Exam.</th>
                                    <th>Alerts</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr data-bind="attr: { id: 'try_col' + sys_key() }">

                                    <td>
                                        <img src="assets/images/beacon_light.png" alt=""></td>
                                    <td>
                                        <h4 style="font-size: 23px; font-weight: 300; color: #019bd7;" data-bind="text: latin_desc, attr: { id: 'spnNS' + sys_key() }"></h4>
                                        <p style="font-size: 15px; font-weight: 300;"></p>
                                    </td>
                                    <td data-bind="text: waitingPatients().length"></td>
                                    <td data-bind="text: TotalTrt"></td>
                                    <td data-bind="text: occupiedBeds"></td>
                                    <td data-bind="text: freeBeds"></td>
                                    <td data-bind="text: notOnBeds"></td>
                                    <td>
                                        <ul style="font-size: 14px; font-weight: 400; margin-bottom: 0;">
                                            <li class="try_nums">
                                                <span data-bind='text: notTrgMaxTime'></span>
                                            </li>
                                            <li class="try_num">
                                                <span data-bind='text: notTrgAvgMaxTime'></span>
                                            </li>
                                            <li class="try_numa">
                                                <span data-bind='text: notTrgAvgMinTime'></span>
                                            </li>
                                            <li class="try_numg">
                                                <span data-bind='text: notTrgMinTime'></span>
                                            </li>
                                        </ul>
                                    </td>
                                    <td>
                                        <ul style="font-size: 14px; font-weight: 400; margin-bottom: 0;">
                                            <li class="try_nums">
                                                <span data-bind='text: allTrgMaxTime'></span>
                                            </li>
                                            <li class="try_num">
                                                <span data-bind='text: allTrgAvgMaxTime'></span>
                                            </li>
                                            <li class="try_numa">
                                                <span data-bind='text: allTrgAvgMinTime'></span>
                                            </li>
                                            <li class="try_numg">
                                                <span data-bind='text: allTrgMinTime'></span>
                                            </li>
                                        </ul>
                                    </td>
                                    <td>
                                        <table style="width:100%">
                                            <tr style="background-image: none; background-color: transparent; border: none;">
                                                <td style="border: none">
                                                    <div data-bind="foreach: erNsAlerts">
                                                        <img data-bind="attr: { src: icon, title: tooltip, width: 32, height: 32 }" />
                                                    </div>
                                                </td>
                                                <%--<td style="border: none">
                                                    <img alt="High Temperature" src="assets/images/try/temperature_hot.png" />
                                                </td>
                                                <td style="border: none">
                                                    <img alt="Blood Pressure" src="assets/images/try/stethoscope.png" />
                                                </td>
                                                <td style="border: none">
                                                    <img alt="Abnormal Lab Result" src="assets/images/try/tubes.png" />
                                                </td>
                                                <td style="border: none">
                                                    <img alt="Abnormal Rad Result" src="assets/images/try/x_ray.png" />
                                                </td>
                                                <td style="border: none">
                                                    <img alt="Medication Expiration" src="assets/images/try/pill.png" />
                                                </td>--%>
                                            </tr>

                                        </table>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <table data-area="sec_header_area" class="table" id="sec_header_area">
                            <tr class="area_title" data-bind="attr: { id: 'try_col' + sys_key() }">
                                <td>
                                    <h4 style="font-size: 23px; font-weight: 300;" data-bind="text: latin_desc, attr: { id: 'spnNS' + sys_key() }"></h4>
                                </td>
                            </tr>
                        </table>
                        <!--ENDtryh-->




                        <%--                        <img data-bind="attr: { id: 'imgNSColl' + sys_key() }" src="images/expand_arrow_alt.png" style="width: 32px; height: 32px; margin-top: -3px; display: inline; cursor: pointer; float: right;" />--%>
                    </div>

                    <div class="accContent" style="display: none; width: 100%;">
                        

                        <div class="row" style="margin-top: 10px;" data-bind="attr: { id: 'nsWp' + sys_key() }">
                            <div class="col-md-5" data-bind="attr: { id: 'try_exta' + sys_key() }">
                                <div class="widget widget-blue">
                                    <div class="widget-title">
                                        <div class="widget-controls">
                                            <div class="widget-control widget-control-minimize extend_div" onclick="WPMaxMin();" data-toggle="tooltip" data-placement="top" title="" data-original-title="Minimize"><i style="margin-right: 5px; margin-left: 5px;" class="icon-resize-full"></i></div>

                                        </div>
                                        <div class="top-search-w pull-right" style="margin-top: -4px; margin-right: 5px;">
                                            <input id="txtWpSearch" type="text" class="top-search" placeholder="Search" />
                                            <%--<span class="btn-group" data-toggle="buttons">
                                    <label class="btn btn-default active">
                                        <input name="radioLayout" type="radio">ID
                                        </label>
                                    <label class="btn btn-default">
                                        <input name="radioLayout" type="radio">Name
                                        </label>
                                    </span>--%>
                                        </div>
                                        <h3>Patient's Waiting List
                                        </h3>

                                    </div>
                                    <div class="widget-content fixedhight_contant" style="overflow-y: auto;">
                                        <div class="panelfullwidth">
                                            <table id="tblWP" class="table">
                                                <thead>
                                                    <tr class="t_header">
                                                        <th style="margin: 0; text-align: center; vertical-align: middle; width: 50px;">Waiting Min</th>
                                                        <th style="margin: 0; text-align: center; vertical-align: middle; width: 50px;">Triage Min</th>
                                                        <th style="margin: 0; text-align: center; vertical-align: middle; width: 50px;">Triage</th>
                                                        <th style="margin: 0; text-align: center; vertical-align: middle;">NHS/ MRN</th>
                                                        <th style="margin: 0; text-align: center; vertical-align: middle;">Patient Name</th>
                                                        <th style="margin: 0; text-align: center; vertical-align: middle; width: 30px">Age</th>
                                                        <%--<th style="margin: 0; text-align: center; vertical-align:middle; width: 30px">Gender</th>--%>
                                                        <th style="margin: 0; text-align: center; vertical-align: middle; width: 60px">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody style="white-space: nowrap;" data-bind="foreach: sortedWaitingPatients">

                                                    <!-- ko switch: emr_status -->
                                                    <!-- ko case: ['0','10'] -->
                                                    <tr class="cnxMnuWpToTriage"></tr>
                                                    <!-- /ko -->
                                                    <!-- ko case: $default -->
                                                    <tr class="cnxMnuWp"></tr>
                                                    <!-- /ko -->
                                                    <!-- /ko -->

                                                    <tr data-bind="attr: { 'id': 'wp' + patient_id(), 'class': 'bedTabular ' + sex() }, click: wpClick, event: { 'contextmenu': WpRightClick }">

                                                        <td data-bind="text: wMinutes, style: { backgroundColor: wMinutesColor() }" class="wMinutes"></td>
                                                        <td data-bind="text: tMinutes, style: { backgroundColor: tMinutesColor() }" class="wMinutes"></td>
                                                        <td class="triage" data-bind="text: emr_status, style: { backgroundColor: emr_status_color() }"></td>
                                                        <td data-bind="text: patient_id" style="margin: 0; text-align: center;"></td>
                                                        <td data-bind="text: patengname" style="margin: 0; text-align: center;"></td>
                                                        <td style="margin: 0; text-align: center;">
                                                            <span data-bind="text: age"></span>
                                                            <img data-bind="attr: { src: ageIcon, title: ageIconText, width: 16, height: 16 }" />
                                                        </td>
                                                        <%-- <td style="margin: 0; text-align: center; width: 50px">
                                                        <img data-bind="attr: { src: pSex, title: sexText, width: 16, height: 16 }" />
                                                    </td>--%>
                                                        <!-- ko switch: emr_status -->
                                                        <!-- ko case: ['0','10'] -->
                                                        <td data-bind="text: 'Pending Triage'" style="margin: 0; text-align: center;"></td>
                                                        <!-- /ko -->
                                                        <!-- ko case: $default -->
                                                        <td data-bind="text: 'Triaged'" style="margin: 0; text-align: center;"></td>
                                                        <!-- /ko -->
                                                        <!-- /ko -->
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="col-md-5" data-bind="attr: { id: 'try_extb' + sys_key() }">
                                <div class="widget widget-blue" data-bind="if: $root.SelectedERNs()">
                                    <div id="TrLbl" class="wpHeader" style="display: none; transform: rotate(-90deg) translate(-500%,0%); -moz-transform: rotate(-90deg) translate(-500%,0%); -webkit-transform: rotate(-90deg) translate(-500%,0%); -o-transform: rotate(-90deg) translate(-500%,0%); -ms-transform: rotate(-90deg) translate(-500%,0%); transform-origin: top left; -ms-transform-origin: top left; -webkit-transform-origin: top left;">In Treatment</div>
                                    <div class="widget-title">
                                        <div class="widget-controls">
                                            <div class="widget-control widget-control-minimize extend_div" onclick="TrtMaxMin();" data-toggle="tooltip" data-placement="top" title="" data-original-title="Minimize"><i style="margin-right: 5px; margin-left: 5px;" class="icon-resize-full"></i></div>
                                        </div>
                                        <h3 data-bind="text: 'In Treatment: ' + latin_desc()"></h3>


                                        <%--                                                    <div class="btn-group btn-group-xs" data-toggle="buttons" style="float: right; margin-top: 2px; margin-right: 4px;">
                        <label class="btn btn-default active">
                            <input type="radio" name="erviews" id="rdoInTrSmall" value="intrsmall" checked="checked" onchange="rdoTrSmall_Changed()"><img src="images/square_black.png" style="width: 10px; height: 10px;" />
                        </label>
                        <label class="btn btn-default">
                            <input type="radio" name="erviews" id="rdoInTrMedium" value="intrmed" onchange="rdoTrMed_Changed()"><img src="images/square_black.png" style="width: 12px; height: 12px;" />
                        </label>
                        <label class="btn btn-default">
                            <input type="radio" name="erviews" id="rdoInTrLarge" value="interlarge" onchange="rdoTrLarge_Changed()"><img src="images/square_black.png" style="width: 15px; height: 15px;" />
                        </label>
                    </div>--%>
                                    </div>

                                    <div class="widget-content fixedhight_contant" style="overflow-y: auto;" id="erPatients" data-bind="template: { name: $root.erInTrView }">
                                    </div>

                                </div>
                            </div>
                            <div class="col-md-2" id="try_extc">
                                <div class="widget widget-blue">
                                    <div class="widget-content" style="border-radius: 3px 3px 3px 3px;">

                                        <div class="row" style="width: 100%">
                                            <div class="col-md-12" style="background-color: whitesmoke; padding-bottom: 10px;">
                                                <h5 style="font-size: 15px; font-weight: 300; width: 105%; text-align: center; margin-bottom: 0; margin-top: 5px;">Waiting Patients</h5>
                                                <div data-bind="attr: { id: 'chartWPs' + sys_key() }, dxChart: chartWPOptions" style="width: 105%; height: 195px; margin: 0 auto; margin-left: -5px;"></div>
                                                <table style="width: 100%; font-size: 10px; text-align: center; margin-top: 0px; text-shadow: 0px 1px 1px black; color: white;" class="table-bordered">
                                                    <tr>
                                                        <td style="background-color: rgb(0, 221, 47);">00-30
                                                        </td>
                                                        <td style="background-color: rgb(255, 220, 8);">30-60
                                                        </td>
                                                        <td style="background-color: rgb(255, 0, 0);">60-240
                                                        </td>
                                                        <td style="background-color: rgb(201, 7, 7);">+240
                                                        </td>
                                                    </tr>
                                                </table>
                                            </div>
                                            <div class="col-md-12" style="background-color: rgb(229, 229, 229); padding-bottom: 10px;">
                                                <h5 style="font-size: 15px; font-weight: 300; text-align: center; margin-bottom: 0; margin-top: 5px;">Treatment Patients</h5>
                                                <div data-bind="attr: { id: 'chartTrts' + sys_key() }, dxChart: chartTrtOptions" style="width: 100%; height: 140px; margin: 0 auto;"></div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12" style="background-color: whitesmoke; padding-bottom: 10px;">
                                                <h5 style="font-size: 15px; font-weight: 300; text-align: center; margin-bottom: 0; margin-top: 5px;">Beds</h5>
                                                <div data-bind="attr: { id: 'chartBeds' + sys_key() }, dxPieChart: chartBedOptions" style="height: 80px; margin: 0 auto"></div>
                                                <table style="width: 100%; font-size: 10px; text-align: center; margin-top: 7px; text-shadow: 0px 1px 1px black; color: white;">
                                                    <tr>
                                                        <td style="background-color: rgb(113, 168, 67);">V. Clean
                                                        </td>
                                                        <td></td>
                                                        <%--<td style="background-color: #ff7c00;">V. Dirty
                                                        </td>
                                                        <td></td>--%>
                                                        <td style="background-color: #74d0f4;">Male
                                                        </td>
                                                        <td></td>
                                                        <td style="background-color: #ee8090;">Female
                                                        </td>
                                                    </tr>
                                                </table>
                                                <table class="table-bordered" style="width: 100%; font-size: 10px; margin-top: 0px;">
                                                    <tr>
                                                        <td>All In Treatment
                                                        </td>
                                                        <td data-bind="text: TotalTrt()" style="text-align: center;"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Holding bay (Not In Cubicle/Bed)
                                                        </td>
                                                        <td data-bind="text: notOnBeds()" style="text-align: center;"></td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div class="row">
                        </div>
                        <%--<div id="contextMenuContainer" style='background-color: #f0f0f0; width: 100px; height: 100px; display: none; z-index: 999; border-radius: 5px; border: 1px solid black; position: absolute;'></div>--%>
                    </div>
                </div>
            </div>
        </script>

        <script id="nsERWPMed" type="text/html">
            <div class="panelfullwidthS">
                <div style="display: inline; vertical-align: top; height: 25px">
                    <div data-bind="click: collapseNS" class="accHeader" style="display: inline; vertical-align: top; height: 25px">

                        <span style="font-size: 16px; font-weight: normal; margin: 3px; display: inline; width: 100%; height: 25px; vertical-align: top;" data-bind="text: latin_desc, attr: { id: 'spnNS' + sys_key() }"></span>
                        <%--<img data-bind="attr: { id: 'imgNSColl' + sys_key() }" src="images/expand_arrow_alt.png" style="width: 32px; height: 32px; display: inline; cursor: pointer; float: right;" />--%>

                    </div>

                    <div class="accContent" style="display: none; width: 100%;">

                        <div style="margin-top: 10px; width: 100%;" data-bind="attr: { id: 'nsWp' + sys_key() }">
                            <table class="roomTabular" style="border: 0; padding: 0; border-spacing: 0; margin: 0; width: 100%">
                                <thead>
                                    <tr class="t_header">
                                        <th style="margin: 0; text-align: center; width: 50px;">Waiting Min</th>
                                        <th style="margin: 0; text-align: center; width: 50px;">Triage Min</th>
                                        <th style="margin: 0; text-align: center; width: 50px;">Triage</th>
                                        <th style="margin: 0; text-align: center; width: 150px">NHS/ MRN</th>
                                        <th style="margin: 0; text-align: center; width: 150px">Patient Name</th>
                                        <th style="margin: 0; text-align: center; width: 50px">Age</th>
                                        <th style="margin: 0; text-align: center; width: 50px">Sex</th>
                                        <th style="margin: 0; text-align: center; width: 150px">Doctor Name</th>
                                        <th style="margin: 0; text-align: center; width: 150px">Status</th>
                                    </tr>
                                </thead>
                                <tbody data-bind="foreach: sortedWaitingPatients">
                                    <tr data-bind="attr: { 'id': 'wp' + patient_id(), 'class': 'bedTabular ' + sex() }, click: wpClick">
                                        <td style="margin: 0; text-align: center; width: 50px">
                                            <div data-bind="text: wMinutes, style: { backgroundColor: wMinutesColor() }" class="wMinutes"></div>
                                        </td>
                                        <td style="margin: 0; text-align: center; width: 50px">
                                            <div data-bind="text: tMinutes, style: { backgroundColor: tMinutesColor() }" class="wMinutes"></div>
                                        </td>
                                        <td style="margin: 0; text-align: center; width: 50px">
                                            <div class="triage" data-bind="text: emr_status, style: { backgroundColor: emr_status_color() }"></div>
                                        </td>
                                        <td data-bind="text: patient_id" style="margin: 0; text-align: center; width: 150px"></td>
                                        <td data-bind="text: patengname" style="margin: 0; text-align: center; width: 150px"></td>
                                        <td data-bind="text: age" style="margin: 0; text-align: center; width: 50px"></td>
                                        <td style="margin: 0; text-align: center; width: 50px">
                                            <img data-bind="attr: { src: pSex, title: pSex, width: 16, height: 16 }" class="try_iconshad" />
                                        </td>
                                        <td data-bind="text: staff_name" style="margin: 0; text-align: center; width: 150px"></td>

                                        <!-- ko switch: emr_status -->
                                        <!-- ko case: ['0','10'] -->
                                        <td data-bind="text: 'Pending Triage'" style="margin: 0; text-align: center; width: 150px"></td>
                                        <!-- /ko -->
                                        <!-- ko case: $default -->
                                        <td data-bind="text: 'Triaged'" style="margin: 0; text-align: center; width: 150px"></td>
                                        <!-- /ko -->
                                        <!-- /ko -->
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <%--<div id="contextMenuContainer" style='background-color: #f0f0f0; width: 100px; height: 100px; display: none; z-index: 999; border-radius: 5px; border: 1px solid black; position: absolute;'></div>--%>
                    </div>
                </div>
            </div>
        </script>

        <script id="erInTrSmall" type="text/html">



            <div class="">
                <div id="erRoomsBeds" class="panelfullwidth">

                    <div id="erOnBedTitle" class="bedTabularTitle" style="color: black; font-size: larger;">
                        <span>In Cubicle/Bed</span>
                    </div>

                    <div id="erroomsAndBeds" data-bind="foreach: roomsAndBeds">
                        

                        <table class="table" style="border: 0; padding: 0; border-spacing: 0; margin: 0; width: 100%">
<%--                            <col width="85px">
                            <col width="85px">
                            <col width="85px">
                            <col width="85px">
                            <col width="50px">
                            <col width="90px">--%>

                            <thead>
                                <tr class="t_header">
                                    <th style="width:100px; margin: 0; text-align: center; vertical-align: middle;">Bed</th>
                                    <th style="margin: 0; text-align: center; vertical-align: middle;">Current Location</th>
                                    <th style="margin: 0; text-align: center; vertical-align: middle;">NHS/ MRN</th>
                                    <th style="margin: 0; text-align: center; vertical-align: middle;">Patient Name</th>
                                    <th style="margin: 0; text-align: center; width: 50px; vertical-align: middle;">Triage</th>
                                    <th style="margin: 0; text-align: center; vertical-align: middle;">Doctor Name</th>
                                    <th style="margin: 0; text-align: center; min-width: 90px; vertical-align: middle;">Alerts</th>
                                </tr>
                            </thead>
                            <tr>
                                <td colspan="7" style="padding: 0px;">
                                    <span data-bind="text: room_name"></span>
                                </td>
                            </tr>
                            
                            <tbody style="white-space: nowrap;" data-bind="foreach: beds">
                                <!-- ko if: patient_id -->
                                <tr class="cnxMnuTrtOnBed"></tr>
                                <!-- /ko -->
                                <tr data-bind="attr: { 'id': 'bedId' + sys_key(), 'class': 'bedTabular ' + sex() }, click: OnBedClick, event: { 'contextmenu': bedRightClick }" <%--data-toggle="modal" data-target="#modalFormStyle9"--%>>
                                    <td data-bind="text: latin_desc, attr: { title: latin_desc }" style="margin: 0; text-align: center; vertical-align: middle;"></td>
                                    <td style="margin: 0; text-align: center;">
                                        <%--<span data-bind="text: locationText"></span>--%>
                                        <!-- ko if: patient_id -->
                                        <img data-bind="attr: { src: locationIcon, title: locationText, width: 16, height: 16 }" />
                                        <!-- /ko -->
                                    </td>
                                    <td data-bind="text: patient_id, attr: { title: patient_id }" style="margin: 0; text-align: center; vertical-align: middle;"></td>
                                    <td data-bind="text: patengname, attr: { title: patengname }" style="margin: 0; text-align: center; vertical-align: middle;"></td>
                                    <td class="triage" data-bind="text: emr_status, style: { backgroundColor: emr_status_color() }" style="margin: 0; text-align: center; vertical-align: middle; border: none; padding: 0; padding-top: 1px; margin-top: 2px;"></td>
                                    <td data-bind="text: physician, attr: { title: physician }" style="margin: 0; text-align: center; vertical-align: middle;"></td>

                                    <td style="padding-left: 0; padding-right: 0;">
                                        <table style="width:100%; margin: 0 auto;">
                                            <tr style="background-image: none; background-color: transparent; border: none;">
                                                <td style="border: none; padding-right: 0;">
                                                    <div data-bind="foreach: bedAlerts">
                                                        <img data-bind="attr: { src: icon, title: tooltip, width: 16, height: 16 }" class="try_iconshad" />
                                                    </div>
                                                </td>
                                                <%--<td style="border: none; padding-right:0;" class="try_iconshad">
                                                    <img alt="High Temperature" src="assets/images/try/small/temperature_hot.png" />
                                                </td>
                                                <td style="border: none; padding:0; padding-right:3px;">
                                                    <img alt="Blood Pressure" src="assets/images/try/small/stethoscope.png" />
                                                </td>
                                                <td style="border: none; padding:0; padding-right:3px;">
                                                    <img alt="Abnormal Lab Result" src="assets/images/try/small/tubes.png" />
                                                </td>
                                                <td style="border: none; padding:0; padding-right:3px;">
                                                    <img alt="Abnormal Rad Result" src="assets/images/try/small/x_ray.png" />
                                                </td>
                                                <td style="border: none; padding:0;">
                                                    <img alt="Medication Expiration" src="assets/images/try/small/pill.png" />
                                                </td>--%>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

                </div>
                <div id="erNotOnBed" class="panelfullwidth">
                    <div id="erNotOnBedTitle" class="bedTabularTitle" style="color: black; font-size: larger;">
                        <span>Holding bay (Not in Cubicle/Bed)</span>
                        <div class="top-search-w pull-right">
                            <input id="txtTrtSearch" type="text" class="top-search" placeholder="Search" />
                            <%-- <span class="btn-group" data-toggle="buttons">
                                    <label class="btn btn-default active">
                                        <input name="radioLayout" type="radio">ID
                                        </label>
                                    <label class="btn btn-default">
                                        <input name="radioLayout" type="radio">Name
                                        </label>
                                    </span>--%>
                        </div>

                    </div>
                    <div id="erNotOnBeds" data-bind="foreach: roomsAndBeds()">

                        <table data-bind="attr: { 'id': 'roomId' + room_key() }" class="table" style="border: 0; padding: 0; border-spacing: 0; margin: 0; width: 100%">
                           
<%--                            <col width="10%">
                            <col width="5%">
                            <col width="10%">
                            <col width="15%">
                            <col width="5%">
                            <col width="15%">
                            <col width="40%">--%>
                            <thead>
                                <tr class="t_header">

                                    <th style=" width:100px; margin: 0; text-align: center; vertical-align: middle; color: transparent; text-shadow: none; white-space: nowrap;"></th>
                                    <th style="margin: 0; text-align: center;">Current Location</th>
                                    <th style="margin: 0; text-align: center;">NHS/ MRN</th>
                                    <th style="margin: 0; text-align: center;">Patient Name</th>
                                    <th style="margin: 0; text-align: center; width: 50px">Triage</th>
                                    <th style="margin: 0; text-align: center;">Doctor Name</th>
                                    <th style="margin: 0; text-align: center; min-width: 90px;">Alerts</th>
                                </tr>
                            </thead>
                            <tbody style="white-space: nowrap;" data-bind="foreach: notOnBeds">

                                <tr class="cnxMnuTrtNotOnBed"></tr>

                                <tr data-bind="attr: { 'id': 'pId' + patient_id(), 'class': 'bedTabular ' + sex() }, click: NotOnBedClick, event: { 'contextmenu': notOnBedRightClick }">
                                    <%--                                    <td data-bind="text: latin_desc" style="margin: 0; text-align: center; vertical-align: middle; color: transparent; text-shadow: none;"></td>--%>
                                    <td></td>
                                    <td style="margin: 0; text-align: center;">
                                        <%--<span data-bind="text: locationText"></span>--%>
                                        <!-- ko if: patient_id -->
                                        <img data-bind="attr: { src: locationIcon, title: locationText, width: 16, height: 16 }" />
                                        <!-- /ko -->
                                    </td>
                                    <td data-bind="text: patient_id, attr: { title: patient_id }" style="margin: 0; text-align: center;"></td>
                                    <td data-bind="text: patengname, attr: { title: patengname }" style="margin: 0; text-align: center;"></td>
                                    <td class="triage" data-bind="text: emr_status, style: { backgroundColor: emr_status_color() }" style="margin: 0; text-align: center; vertical-align: middle; border: none; padding: 0; padding-top: 1px; margin-top: 2px;"></td>
                                    <td data-bind="text: physician, attr: { title: physician }" style="margin: 0; text-align: center;"></td>

                                    <td style="padding-left: 0; padding-right: 0;">
                                        <table width="100%" style="margin: 0 auto;">
                                            <tr style="background-image: none; background-color: transparent; border: none;">
                                                <td style="border: none; padding: 0; padding-right: 3px;">
                                                    <div data-bind="foreach: bedAlerts">
                                                        <img data-bind="attr: { src: icon, title: tooltip, width: 16, height: 16 }" class="try_iconshad" />
                                                    </div>
                                                </td>
                                                <%--<td style="border: none; padding:0; padding-right:3px;">
                                                    <img alt="High Temperature" src="assets/images/try/small/temperature_hot.png" />
                                                </td>
                                                <td style="border: none; padding:0; padding-right:3px;">
                                                    <img alt="Blood Pressure" src="assets/images/try/small/stethoscope.png" />
                                                </td>
                                                <td style="border: none; padding-right:0; padding-right:3px;" class="try_iconshad">
                                                    <img alt="Abnormal Lab Result" src="assets/images/try/small/tubes.png" />
                                                </td>
                                                <td style="border: none; padding:0; padding-right:3px;">
                                                    <img alt="Abnormal Rad Result" src="assets/images/try/small/x_ray.png" />
                                                </td>
                                                <td style="border: none; padding:0; padding-right:3px;">
                                                    <img alt="Medication Expiration" src="assets/images/try/small/pill.png" />
                                                </td>--%>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                            </tbody>


                        </table>
                    </div>
                </div>
            </div>



        </script>

        <script id="erInTrMed" type="text/html">

            <div id="erRoomsBedsM" class="panelfullwidth" style="background: linear-gradient(to bottom, #ffffff 0%,#f6f6f6 47%,#ededed 100%);">
                <div id="erOnBedTitleM" class="bedTabularTitle" style="text-align: center; color: black; font-size: larger; text-shadow: 1px 1px 1px #D1D1D1;">
                    In Cubicle/Bed
                </div>
                <div id="erroomsAndBedsM" data-bind="foreach: roomsAndBeds()">
                    <table class="roomTabular" style="border: 0; padding: 0; border-spacing: 0; margin: 0; width: 100%">
                        <thead>
                            <tr>
                                <th style="margin: 0; text-align: center; width: 50px;">Bed</th>
                                <th style="margin: 0; text-align: center; width: 150px">NHS/ MRN</th>
                                <th style="margin: 0; text-align: center; width: 150px">Patient Name</th>
                                <th style="margin: 0; text-align: center; width: 50px">Age</th>
                                <th style="margin: 0; text-align: center; width: 50px">Sex</th>
                                <th style="margin: 0; text-align: center; width: 50px">Triage</th>
                                <th style="margin: 0; text-align: center; width: 150px">Doctor Name</th>

                            </tr>
                        </thead>
                        <tbody data-bind="foreach: beds">

                            <tr data-bind="attr: { 'id': 'bedId' + sys_key(), 'class': 'bedTabular ' + sex() }">
                                <td data-bind="text: latin_desc" style="margin: 0; text-align: center; width: 50px; vertical-align: middle;"></td>
                                <td data-bind="text: patient_id" style="margin: 0; text-align: center; width: 50px; vertical-align: middle;"></td>
                                <td data-bind="text: patengname" style="margin: 0; text-align: center; width: 150px; vertical-align: middle;"></td>
                                <td data-bind="text: age" style="margin: 0; text-align: center; width: 50px"></td>
                                <td data-bind="text: pSex" style="margin: 0; text-align: center; width: 50px"></td>
                                <td class="triage" data-bind="text: emr_status, style: { backgroundColor: emr_status_color() }" style="margin: 0; text-align: center; width: 50px; vertical-align: middle;"></td>
                                <td data-bind="text: physician" style="margin: 0; text-align: center; width: 150px; vertical-align: middle;"></td>


                            </tr>

                        </tbody>
                    </table>
                </div>

            </div>


            <div id="erNotOnBedM" class="panelfullwidth" style="background: linear-gradient(to bottom, #ffffff 0%,#f6f6f6 47%,#ededed 100%);">
                <div id="erNotOnBedTitleM" class="bedTabularTitle" style="text-align: center; color: black; font-size: larger;">
                    Holding bay (Not in Cubicle/Bed)
                </div>
                <div id="erNotOnBedsM" data-bind="foreach: roomsAndBeds()">
                    <table data-bind="attr: { 'id': 'roomId' + room_key() }" class="roomTabular" style="border: 0; padding: 0; border-spacing: 0; margin: 0; width: 100%">
                        <%--<span data-bind="text: room_name"></span>--%>
                        <thead>
                            <tr>
                                <th style="margin: 0; text-align: center; width: 50px;">NHS/ MRN</th>
                                <th style="margin: 0; text-align: center; width: 150px">Patient Name</th>
                                <th style="margin: 0; text-align: center; width: 50px">Age</th>
                                <th style="margin: 0; text-align: center; width: 50px">Sex</th>
                                <th style="margin: 0; text-align: center; width: 50px">Triage</th>
                                <th style="margin: 0; text-align: center; width: 150px">Doctor Name</th>

                            </tr>
                        </thead>
                        <tbody data-bind="foreach: notOnBeds">

                            <tr data-bind="attr: { 'id': 'pId' + patient_id(), 'class': 'bedTabular ' + sex() }">

                                <td data-bind="text: patient_id" style="margin: 0; text-align: center; width: 50px;"></td>
                                <td data-bind="text: patengname" style="margin: 0; text-align: center; width: 150px"></td>
                                <td data-bind="text: age" style="margin: 0; text-align: center; width: 50px"></td>
                                <td data-bind="text: pSex" style="margin: 0; text-align: center; width: 50px"></td>
                                <td class="triage" data-bind="text: emr_status, style: { backgroundColor: emr_status_color() }" style="margin: 0; text-align: center; width: 50px"></td>
                                <td data-bind="text: physician" style="margin: 0; text-align: center; width: 150px"></td>

                            </tr>

                        </tbody>


                    </table>
                </div>
            </div>

        </script>

        <script id="erAll" type="text/html">

            <div class="panelfullwidthS">
                <div>
                    <div data-bind="click: collapseAllNS" class="accAllHeader">
                        <table class="table">
                            <colgroup>
                                <col width="5%">
                                <col width="90%">
                                <col width="5%">
                            </colgroup>
                            <tr>
                                <td>
                                    <img src="assets/images/beacon_light.png" alt="">
                                </td>
                                <td>
                                    <span style="font-size: 20px; font-weight: 300; color: #019bd7; vertical-align: top;" data-bind="text: latin_desc, attr: { id: 'spnAllNSPs' + sys_key() }"></span>
                                </td>
                                <td>
                                    <%--<img data-bind="attr: { id: 'imgAllNSPsColl' + sys_key() }" src="images/expand_arrow_alt.png" style="width: 32px; height: 32px; display: inline; cursor: pointer; float: right;" />--%>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div class="accAllContent" style="display: none; width: 100%;">

                        <table data-bind="attr: { id: 'nsAllPs' + sys_key() }" style="border: 0; padding: 0; border-spacing: 0; margin: 0; width: 100%">
                            <thead>
                                <tr class="main_th" style="visibility: visible; display: table-row; font-size: 12px;">
                                    <th style="margin: 0; text-align: center; width: 150px; padding-top: 7px; padding-bottom: 7px;">NHS/ MRNs
                                    </th>
                                    <th style="margin: 0; text-align: center; width: 150px; padding-top: 7px; padding-bottom: 7px;">Name
                                    </th>
                                    <th style="margin: 0; text-align: center; width: 150px; padding-top: 7px; padding-bottom: 7px;">Age
                                    </th>
                                    <th style="margin: 0; text-align: center; width: 150px; padding-top: 7px; padding-bottom: 7px;">Sex
                                    </th>
                                    <th style="margin: 0; text-align: center; width: 50px; padding-top: 7px; padding-bottom: 7px;">Triage
                                    </th>
                                    <th style="margin: 0; text-align: center; width: 150px; padding-top: 7px; padding-bottom: 7px;">Doctor
                                    </th>
                                    <th style="margin: 0; text-align: center; width: 150px; padding-top: 7px; padding-bottom: 7px;">Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody style="margin-top: 10px;" data-bind="foreach: sortedWaitingPatients">

                                <tr data-bind="attr: { 'id': 'patientId' + patient_id(), 'class': 'bedTabular ' + sex() }">
                                    <td data-bind="text: patient_id" style="margin: 0; text-align: center; width: 150px"></td>
                                    <td data-bind="text: patengname" style="margin: 0; text-align: center; width: 150px"></td>
                                    <td data-bind="text: age" style="margin: 0; text-align: center; width: 150px"></td>
                                    <td data-bind="text: pSex" style="margin: 0; text-align: center; width: 150px"></td>
                                    <td class="triage" data-bind="text: emr_status, style: { backgroundColor: emr_status_color() }" style="margin: 0; text-align: center; width: 50px"></td>
                                    <td data-bind="text: staff_name" style="margin: 0; text-align: center; width: 150px"></td>

                                    <!-- ko switch: emr_status -->
                                    <!-- ko case: ['0','10'] -->
                                    <td data-bind="text: 'Pending Triage'" style="margin: 0; text-align: center; width: 150px"></td>
                                    <!-- /ko -->
                                    <!-- ko case: $default -->
                                    <td data-bind="text: 'Triaged'" style="margin: 0; text-align: center; width: 150px"></td>
                                    <!-- /ko -->
                                    <!-- /ko -->
                                </tr>
                            </tbody>
                        </table>

                        <div style="margin-top: 10px;" data-bind="foreach: roomsAndBeds">
                            <table data-bind="attr: { 'id': 'roomId' + room_key() }" style="border: 0; padding: 0; border-spacing: 0; margin: 0; width: 100%">
                                <%--<span data-bind="text: room_name"></span>--%>
                                <tbody data-bind="foreach: allBeds">
                                    <!-- ko if: patient_id -->
                                    <tr data-bind="attr: { 'id': 'patientId' + sys_key(), 'class': 'bedTabular ' + sex() }">
                                        <td data-bind="text: patient_id" style="margin: 0; text-align: center; width: 150px"></td>
                                        <td data-bind="text: patengname" style="margin: 0; text-align: center; width: 150px"></td>
                                        <td data-bind="text: age" style="margin: 0; text-align: center; width: 150px"></td>
                                        <td data-bind="text: pSex" style="margin: 0; text-align: center; width: 150px"></td>
                                        <td class="triage" data-bind="text: emr_status, style: { backgroundColor: emr_status_color() }" style="margin: 0; text-align: center; width: 50px"></td>
                                        <td data-bind="text: physician" style="margin: 0; text-align: center; width: 150px"></td>

                                        <td data-bind="text: 'In Treatment'" style="margin: 0; text-align: center; width: 150px"></td>
                                    </tr>
                                    <!-- /ko -->
                                </tbody>
                            </table>
                        </div>

                        <%--<div id="contextMenuContainer" style='background-color: #f0f0f0; width: 100px; height: 100px; display: none; z-index: 999; border-radius: 5px; border: 1px solid black; position: absolute;'></div>--%>
                    </div>
                </div>
            </div>
        </script>

        <script id="erNsSumm" type="text/html">
            <!-- ko switch: $root.triageLevels().length -->
            <!-- ko case: '5' -->
            <div class="panelfullwidthS" data-bind="attr: { id: 'nsSumm' + sys_key() }">
                <div style="display: block; vertical-align: top; width: 100%;">
                    <span style="font-size: 20px; font-weight: bold; margin: 3px; display: inline; width: 100%; vertical-align: top;" data-bind="text: latin_desc, attr: { id: 'spnNS' + sys_key() }"></span>
                    <div>
                        <table class="tblSumm">
                            <tr>
                                <td>
                                    <table class="tblSumm">
                                        <thead>
                                            <tr>
                                                <th colspan="7" style="text-align: center; font-size: small;">Waiting Areas
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td rowspan="2" style="width: 40px">Wait Time</td>
                                                <td rowspan="2" style="width: 10px">Not Triaged</td>
                                                <td colspan="5" style="text-align: center;">Triage Category</td>
                                            </tr>
                                            <tr style="color: black; border: 1px solid darkgray;">
                                                <td style="text-align: center;" data-bind="style: { backgroundColor: $root.getTriageColor(1) }">1</td>
                                                <td style="text-align: center;" data-bind="style: { backgroundColor: $root.getTriageColor(2) }">2</td>
                                                <td style="text-align: center;" data-bind="style: { backgroundColor: $root.getTriageColor(3) }">3</td>
                                                <td style="text-align: center;" data-bind="style: { backgroundColor: $root.getTriageColor(4) }">4</td>
                                                <td style="text-align: center;" data-bind="style: { backgroundColor: $root.getTriageColor(5) }">5</td>
                                            </tr>
                                            <tr style="background-color: red; color: black; border: 1px solid darkgray;">
                                                <td data-bind="text: '> ' + $root.obsERmaxTime()"></td>
                                                <td data-bind="text: notTrgMaxTime"></td>
                                                <td data-bind="text: trg1MaxTime"></td>
                                                <td data-bind="text: trg2MaxTime"></td>
                                                <td data-bind="text: trg3MaxTime"></td>
                                                <td data-bind="text: trg4MaxTime"></td>
                                                <td data-bind="text: trg5MaxTime"></td>
                                            </tr>
                                            <tr style="background-color: red; color: black; border: 1px solid darkgray;">
                                                <td data-bind="text: $root.obsERavgTime() + ' - ' + $root.obsERmaxTime()"></td>
                                                <td data-bind="text: notTrgAvgMaxTime"></td>
                                                <td data-bind="text: trg1AvgMaxTime"></td>
                                                <td data-bind="text: trg2AvgMaxTime"></td>
                                                <td data-bind="text: trg3AvgMaxTime"></td>
                                                <td data-bind="text: trg4AvgMaxTime"></td>
                                                <td data-bind="text: trg5AvgMaxTime"></td>
                                            </tr>
                                            <tr style="background-color: yellow; color: black; border: 1px solid darkgray;">
                                                <td data-bind="text: $root.obsERstartTime() + ' - ' + $root.obsERavgTime()"></td>
                                                <td data-bind="text: notTrgAvgMinTime"></td>
                                                <td data-bind="text: trg1AvgMinTime"></td>
                                                <td data-bind="text: trg2AvgMinTime"></td>
                                                <td data-bind="text: trg3AvgMinTime"></td>
                                                <td data-bind="text: trg4AvgMinTime"></td>
                                                <td data-bind="text: trg5AvgMinTime"></td>
                                            </tr>
                                            <tr style="background-color: #00FF00; color: black; border: 1px solid darkgray;">
                                                <td data-bind="text: '< ' + $root.obsERstartTime()">&lt; 45</td>
                                                <td data-bind="text: notTrgMinTime"></td>
                                                <td data-bind="text: trg1MinTime"></td>
                                                <td data-bind="text: trg2MinTime"></td>
                                                <td data-bind="text: trg3MinTime"></td>
                                                <td data-bind="text: trg4MinTime"></td>
                                                <td data-bind="text: trg5MinTime"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table class="tblSumm">
                                        <thead>
                                            <tr>
                                                <th colspan="7" style="text-align: center; font-size: small;">Treatment Areas</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr style="color: black;">
                                                <td style="width: 60px;">&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td style="text-align: center;" data-bind="style: { backgroundColor: $root.getTriageColor(1) }">1</td>
                                                <td style="text-align: center;" data-bind="style: { backgroundColor: $root.getTriageColor(2) }">2</td>
                                                <td style="text-align: center;" data-bind="style: { backgroundColor: $root.getTriageColor(3) }">3</td>
                                                <td style="text-align: center;" data-bind="style: { backgroundColor: $root.getTriageColor(4) }">4</td>
                                                <td style="text-align: center;" data-bind="style: { backgroundColor: $root.getTriageColor(5) }">5</td>
                                            </tr>
                                            <tr style="color: black; background: linear-gradient(to bottom, #ffffff 0%,#f6f6f6 47%,#ededed 100%);">
                                                <td colspan="2" style="background: rgb(241, 241, 241)"></td>
                                                <td data-bind="text: trg1Trt"></td>
                                                <td data-bind="text: trg2Trt"></td>
                                                <td data-bind="text: trg3Trt"></td>
                                                <td data-bind="text: trg4Trt"></td>
                                                <td data-bind="text: trg5Trt"></td>
                                            </tr>
                                            <tr style="color: black; background: linear-gradient(to bottom, #ffffff 0%,#f6f6f6 47%,#ededed 100%);">
                                                <td colspan="2" style="text-align: left;">In Treatment</td>
                                                <td colspan="4" style="text-align: left;" data-bind="text: TotalTrt"></td>
                                            </tr>
                                            <tr style="color: black; background: linear-gradient(to bottom, #ffffff 0%,#f6f6f6 47%,#ededed 100%);">
                                                <td colspan="2" style="text-align: left;">Beds Occupied</td>
                                                <td colspan="4" style="text-align: left;" data-bind="text: occupiedBeds"></td>
                                            </tr>
                                            <tr style="color: black; background: linear-gradient(to bottom, #ffffff 0%,#f6f6f6 47%,#ededed 100%);">
                                                <td colspan="2" style="text-align: left;">Beds Available</td>
                                                <td colspan="4" style="text-align: left;" data-bind="text: freeBeds"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <!-- /ko -->
            <!-- ko case: '3' -->
            <div class="panelfullwidthS" data-bind="attr: { id: 'nsSumm' + sys_key() }">
                <div style="display: block; vertical-align: top; width: 100%;">
                    <span style="font-size: 20px; font-weight: bold; margin: 3px; display: inline; width: 100%; vertical-align: top;" data-bind="text: latin_desc, attr: { id: 'spnNS' + sys_key() }"></span>
                    <div>
                        <table class="tblSumm">
                            <tr>
                                <td>
                                    <table class="tblSumm">
                                        <thead>
                                            <tr>
                                                <th colspan="7" style="text-align: center; font-size: small;">Waiting Areas
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td rowspan="2" style="width: 40px">Wait Time</td>
                                                <td rowspan="2" style="width: 10px">Not Triaged</td>
                                                <td colspan="5" style="text-align: center;">Triage Category</td>
                                            </tr>
                                            <tr style="color: black; border: 1px solid darkgray;">
                                                <td style="text-align: center;" data-bind="style: { backgroundColor: $root.getTriageColor(1) }">1</td>
                                                <td style="text-align: center;" data-bind="style: { backgroundColor: $root.getTriageColor(2) }">2</td>
                                                <td style="text-align: center;" data-bind="style: { backgroundColor: $root.getTriageColor(3) }">3</td>

                                            </tr>
                                            <tr style="background-color: red; color: black; border: 1px solid darkgray;">
                                                <td data-bind="text: '> ' + $root.obsERmaxTime()"></td>
                                                <td data-bind="text: notTrgMaxTime"></td>
                                                <td data-bind="text: trg1MaxTime"></td>
                                                <td data-bind="text: trg2MaxTime"></td>
                                                <td data-bind="text: trg3MaxTime"></td>

                                            </tr>
                                            <tr style="background-color: red; color: black; border: 1px solid darkgray;">
                                                <td data-bind="text: $root.obsERavgTime() + ' - ' + $root.obsERmaxTime()"></td>
                                                <td data-bind="text: notTrgAvgMaxTime"></td>
                                                <td data-bind="text: trg1AvgMaxTime"></td>
                                                <td data-bind="text: trg2AvgMaxTime"></td>
                                                <td data-bind="text: trg3AvgMaxTime"></td>

                                            </tr>
                                            <tr style="background-color: yellow; color: black; border: 1px solid darkgray;">
                                                <td data-bind="text: $root.obsERstartTime() + ' - ' + $root.obsERavgTime()"></td>
                                                <td data-bind="text: notTrgAvgMinTime"></td>
                                                <td data-bind="text: trg1AvgMinTime"></td>
                                                <td data-bind="text: trg2AvgMinTime"></td>
                                                <td data-bind="text: trg3AvgMinTime"></td>

                                            </tr>
                                            <tr style="background-color: #00FF00; color: black; border: 1px solid darkgray;">
                                                <td data-bind="text: '< ' + $root.obsERstartTime()">&lt; 45</td>
                                                <td data-bind="text: notTrgMinTime"></td>
                                                <td data-bind="text: trg1MinTime"></td>
                                                <td data-bind="text: trg2MinTime"></td>
                                                <td data-bind="text: trg3MinTime"></td>

                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <table class="tblSumm">
                                        <thead>
                                            <tr>
                                                <th colspan="7" style="text-align: center; font-size: small;">Treatment Areas</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr style="color: black;">
                                                <td style="width: 60px;">&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td style="text-align: center; color: black;" data-bind="style: { backgroundColor: $root.getTriageColor(1) }">1</td>
                                                <td style="text-align: center;" data-bind="style: { backgroundColor: $root.getTriageColor(2) }">2</td>
                                                <td style="text-align: center;" data-bind="style: { backgroundColor: $root.getTriageColor(3) }">3</td>

                                            </tr>
                                            <tr style="color: black; background: linear-gradient(to bottom, #ffffff 0%,#f6f6f6 47%,#ededed 100%);">
                                                <td colspan="2" style="background: rgb(241, 241, 241)"></td>
                                                <td data-bind="text: trg1Trt"></td>
                                                <td data-bind="text: trg2Trt"></td>
                                                <td data-bind="text: trg3Trt"></td>

                                            </tr>
                                            <tr style="color: black; background: linear-gradient(to bottom, #ffffff 0%,#f6f6f6 47%,#ededed 100%);">
                                                <td colspan="2" style="text-align: left;">In Treatment</td>
                                                <td colspan="4" style="text-align: left;" data-bind="text: TotalTrt"></td>
                                            </tr>
                                            <tr style="color: black; background: linear-gradient(to bottom, #ffffff 0%,#f6f6f6 47%,#ededed 100%);">
                                                <td colspan="2" style="text-align: left;">Beds Occupied</td>
                                                <td colspan="4" style="text-align: left;" data-bind="text: occupiedBeds"></td>
                                            </tr>
                                            <tr style="color: black; background: linear-gradient(to bottom, #ffffff 0%,#f6f6f6 47%,#ededed 100%);">
                                                <td colspan="2" style="text-align: left;">Beds Available</td>
                                                <td colspan="4" style="text-align: left;" data-bind="text: freeBeds"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <!-- /ko -->
            <!-- /ko -->
        </script>

        <%--end of templates--%>

        <%--<cc1:DuplexCaller ID="DuplexCaller1" runat="server" UserId="616" ClientDescription="WebWB" SessionType="WhiteBoard" DuplexUrl="82.201.194.2" Style="display: none;" />--%>
        <%--<cc1:DuplexCaller ID="DuplexCaller1" runat="server" UserId="616" ClientDescription="WebWB" SessionType="WhiteBoard" DuplexUrl="10.10.0.88" style="display:none;"/>--%>


        <!-----------------------DEL------------------------->
        <!-----------------------DEL------------------------->
        <!-----------------------DEL------------------------->
        <!-----------------------DEL------------------------->
        <!-----------------------DEL------------------------->
        <div class="modal fade" id="diagDoctors" tabindex="-1" role="dialog" aria-labelledby="modalFormStyle1Label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="widget widget-blue">
                        <div class="widget-title">
                            <h3><i class="icon-ok-sign"></i>Please select doctor</h3>
                        </div>
                        <div class="widget-content">
                            <div class="modal-body">
                                <form>
                                    <table id="doctorsList" class="ui-widget-content table-hover" style="width: 100%">
                                        <tbody class="ui-widget-content">
                                        </tbody>
                                    </table>
                                </form>

                                <br />
                                <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal" >Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div class="modal fade" id="diagStatus" tabindex="-1" role="dialog" aria-labelledby="modalFormStyle1Label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="widget widget-blue">
                        <div class="widget-title">
                            <h3><i class="icon-ok-sign"></i>Please select discharge status</h3>
                        </div>
                        <div class="widget-content">
                            <div class="modal-body" style="text-align: center">
                                <form>
                                    <table id="statusList" class="ui-widget-content table-hover" style="width: 100%">
                                        <tbody class="ui-widget-content">
                                        </tbody>
                                    </table>
                                </form>
                                <br />
                                <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" id="diagSelection" tabindex="-1" role="dialog" aria-labelledby="modalFormStyle1Label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="widget widget-blue">
                        <div class="widget-title">
                            <h3><i class="icon-ok-sign"></i>Please select an option from list below:</h3>
                        </div>
                        <div class="widget-content">
                            <div class="modal-body">
                                <iframe id="framSelection" style="width: 100%; height:300px;" >

                                                    </iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" id="diagInput" tabindex="-1" role="dialog" aria-labelledby="modalFormStyle1Label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="widget widget-blue">
                        <div class="widget-title">
                            <h3><i class="icon-ok-sign"></i>Please enter a value in the box below:</h3>
                        </div>
                        <div class="widget-content">
                            <div class="modal-body">
                                <form>
                                    <table id="tblInput" class="ui-widget-content table-hover" style="width: 100%">
                                        <tbody class="ui-widget-content">
                                            <tr>
                                                <td>
                                                    <iframe id="framInput" style="width: 100%;" >

                                                    </iframe>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" id="diagConfirm" tabindex="-1" role="dialog" aria-labelledby="modalFormStyle1Label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="widget widget-blue">
                        <div class="widget-title">
                            <h3><i class="icon-ok-sign"></i>Please select an option from list below:</h3>
                        </div>
                        <div class="widget-content">
                            <div class="modal-body">
                                <form>
                                    <table id="tblConfirm" class="ui-widget-content table-hover" style="width: 100%">
                                        <tbody class="ui-widget-content">
                                            <tr>
                                                <td>
                                                    <iframe id="framConfirm" style="width: 100%;" >

                                                    </iframe>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal" id="diagMsg" tabindex="-1" role="dialog" aria-labelledby="modalFormStyle1Label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="widget widget-blue">
                        <div class="widget-title">
                            <h3><i class="icon-ok-sign"></i>Message:</h3>
                        </div>
                        <div class="widget-content">
                            <div class="modal-body">
                                <form>
                                    <table id="tblMsg" class="ui-widget-content table-hover" style="width: 100%">
                                        <tbody class="ui-widget-content">
                                            <tr>
                                                <td>
                                                    <span id="spnMsg"  class="ui-widget-content" ></span>
                                                    <br />
                                                    <br />
                                                    <button type="button" class="btn btn-primary btn-sm" onclick="UpdateFromDialog('');">OK</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-----------------------ENDDEL------------------------->
        <!-----------------------ENDDEL------------------------->
        <!-----------------------ENDDEL------------------------->
        <!-----------------------ENDDEL------------------------->
        <!-----------------------ENDDEL------------------------->




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




            //$(function () {
            //    $('#container231').highcharts({
            //        chart: {
            //            type: 'column',
            //            spacingLeft: 0,
            //            spacingRight: 0,
            //            marginTop: 40,
            //            marginBottom: 20,
            //            margin: 0,
            //        },
            //        title: {
            //            text: "Waiting Patients",
            //            style: {
            //                fontSize: '13px',
            //            }

            //        },
            //        xAxis: {
            //            categories: ['Not', 'T1', 'T2', 'T3']
            //        },

            //        yAxis: {

            //            min: 0,
            //            //ceiling: 65,
            //            title: {
            //                text: false
            //            },
            //            stackLabels: {
            //                enabled: true,
            //                style: {
            //                    //fontWeight: 'bold',
            //                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
            //                }
            //            }
            //        },
            //        legend: {
            //            enabled: false,
            //            align: 'center',
            //            //x: -70,
            //            verticalAlign: 'bottom',
            //            //y: 20,
            //            floating: false,
            //            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            //            borderColor: '#CCC',
            //            borderWidth: 1,
            //            shadow: false,
            //            //width: 150,
            //        },
            //        tooltip: {
            //            formatter: function () {
            //                return '<b>' + this.x + '</b><br/>' +
            //                    this.series.name + ': ' + this.y + '<br/>' +
            //                    'Total: ' + this.point.stackTotal;
            //            }
            //        },
            //        navigation: {
            //            buttonOptions: {
            //                enabled: false
            //            }
            //        },
            //        plotOptions: {
            //            column: {
            //                stacking: 'normal',
            //                dataLabels: {
            //                    enabled: true,
            //                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
            //                    style: {
            //                        fontSize: '10px',
            //                        fontFamily: 'Verdana, sans-serif',

            //                        textShadow: '0 0 1px black, 0 0 1px black'
            //                    }
            //                }
            //            }
            //        },
            //        series: [{
            //            name: '60-00',
            //            data: [60, 65, 68, 100],
            //            color: '#FF0000'
            //        }, {
            //            name: '45-60',
            //            data: [50, 55, 53, 58],
            //            color: '#C90707'
            //        }, {
            //            name: '30-45',
            //            data: [30, 35, 40, 45],
            //            color: '#FFDC08'
            //        }, {
            //            name: '00-30',
            //            data: [10, 20, 25, 30],
            //            color: '#00DD2F'
            //        }]
            //    });

            //});
            //$(function () {
            //    $('#container_pie231').highcharts({
            //        chart: {
            //            plotBackgroundColor: null,
            //            plotBorderWidth: 0,
            //            plotShadow: false
            //        },
            //        title: {
            //            text: 'Room Status',
            //            align: 'center',
            //            verticalAlign: 'top',
            //            style: {
            //                fontSize: '13px',
            //            },
            //            y: 40
            //        },
            //        tooltip: {
            //            pointFormat: '<b>{point.percentage:.1f}%</b>'
            //        },
            //        plotOptions: {
            //            pie: {
            //                dataLabels: {
            //                    enabled: false,
            //                    distance: -1,
            //                    style: {
            //                        fontWeight: 'bold',
            //                        fontSize: '10',
            //                        color: 'white',
            //                        textShadow: '0px 0px 1px black'
            //                    }
            //                },
            //                startAngle: 0,
            //                endAngle: 360,
            //                center: ['50%', '60%']
            //            }
            //        },
            //        navigation: {
            //            buttonOptions: {
            //                enabled: false
            //            }
            //        },

            //        series: [{
            //            type: 'pie',
            //            name: false,
            //            innerSize: '50%',
            //            data: [
            //                ['Beds Occupied', 60],
            //                ['Beds Available', 40],
            //            ],
            //            colors: ['#bd2226', '#71a843']
            //        }]
            //    });
            //});
            //$(function () {
            //    $('#container_treat').highcharts({
            //        chart: {
            //            type: 'column',
            //            marginBottom: 20,
            //            marginTop: 40,
            //            margin: 0

            //        },
            //        title: {
            //            text: "Treatment Patients",
            //            style: {
            //                fontSize: '13px',
            //            }
            //        },
            //        subtitle: {
            //            text: false
            //        },
            //        xAxis: {
            //            type: 'category',
            //            categories: ['T1', 'T2', 'T3', 'T4'],
            //            labels: {
            //                //rotation: -45,
            //                style: {
            //                    fontSize: '11px',
            //                    fontFamily: 'Verdana, sans-serif'
            //                }
            //            }
            //        },
            //        yAxis: {
            //            min: 0,
            //            title: {
            //                text: false
            //            }
            //        },
            //        legend: {
            //            enabled: false
            //        },
            //        tooltip: {
            //            pointFormat: '<b>{point.y:.1f}</b>'
            //        },
            //        navigation: {
            //            buttonOptions: {
            //                enabled: false
            //            }
            //        },
            //        series: [{
            //            name: 'Population',
            //            data: [
            //                { y: 5, color: '#FF0000' },
            //                { y: 10, color: '#C90707' },
            //                { y: 20, color: '#FFDC08' },
            //                { y: 15, color: '#00DD2F' },
            //            ],
            //            dataLabels: {
            //                enabled: true,
            //                rotation: 0,
            //                color: '#FFFFFF',
            //                align: 'center',
            //                verticalAlign: 'top',
            //                style: {
            //                    fontSize: '10px',
            //                    fontFamily: 'Verdana, sans-serif',
            //                    textShadow: '0 0 1px black'
            //                }
            //            }
            //        }]
            //    });
            //});
            //$(function () {
            //    $('#container_pie_all').highcharts({
            //        chart: {
            //            plotBackgroundColor: null,
            //            plotBorderWidth: 0,
            //            plotShadow: false,
            //            marginTop: 40,
            //            marginBottom: 30,
            //        },
            //        title: {
            //            text: 'Rooms Status',
            //            align: 'center',
            //            verticalAlign: 'top',
            //            style: {
            //                fontSize: '13px',
            //            },
            //            y: 40
            //        },
            //        tooltip: {
            //            pointFormat: '<b>{point.percentage:.1f}%</b>'
            //        },
            //        plotOptions: {
            //            pie: {
            //                dataLabels: {
            //                    enabled: false,
            //                    distance: -1,
            //                    style: {
            //                        fontWeight: 'bold',
            //                        fontSize: '10',
            //                        color: 'white',
            //                        textShadow: '0px 0px 1px black'
            //                    }
            //                },
            //                startAngle: 0,
            //                endAngle: 360,
            //                center: ['50%', '60%']
            //            }
            //        },
            //        navigation: {
            //            buttonOptions: {
            //                enabled: false
            //            }
            //        },

            //        series: [{
            //            type: 'pie',
            //            name: false,
            //            innerSize: '50%',
            //            data: [
            //                ['Beds Occupied', 60],
            //                ['Beds Available', 40],
            //            ],
            //            colors: ['#bd2226', '#71a843']
            //        }]
            //    });
            //});


            $('#hideall_bt').click(function () {
                $("#hideall_bt").toggleClass("click_over");
                $(".page-header").toggleClass("headerhide");
                $(".main-content").toggleClass("contenthide");
                $("ul.nav.nav-tabs").toggleClass("tabshide");
                $(".side").toggleClass("mainmenuhide");
            });

            ////////////////////////Chart Down/////////////////////////////////////////////////////
            $(function () {

                Highcharts.data({
                    csv: document.getElementById('tsv').innerHTML,
                    itemDelimiter: '\t',
                    parsed: function (columns) {

                        var brands = {},
                            brandsData = [],
                            versions = {},
                            drilldownSeries = [];

                        // Parse percentage strings
                        columns[1] = $.map(columns[1], function (value) {
                            if (value.indexOf('%') === value.length - 1) {
                                value = parseFloat(value);
                            }
                            return value;
                        });

                        $.each(columns[0], function (i, name) {
                            var brand,
                                version;

                            if (i > 0) {

                                // Remove special edition notes
                                name = name.split(' -')[0];

                                // Split into brand and version
                                version = name.match(/([0-9]+[\.0-9x]*)/);
                                if (version) {
                                    version = version[0];
                                }
                                brand = name.replace(version, '');

                                // Create the main data
                                if (!brands[brand]) {
                                    brands[brand] = columns[1][i];
                                } else {
                                    brands[brand] += columns[1][i];
                                }

                                // Create the version data
                                if (version !== null) {
                                    if (!versions[brand]) {
                                        versions[brand] = [];
                                    }
                                    versions[brand].push(['v' + version, columns[1][i]]);
                                }
                            }

                        });

                        $.each(brands, function (name, y) {
                            brandsData.push({
                                name: name,
                                y: y,
                                drilldown: versions[name] ? name : null
                            });
                        });
                        $.each(versions, function (key, value) {
                            drilldownSeries.push({
                                name: key,
                                id: key,
                                data: value
                            });
                        });

                        // Create the chart
                        $('#container-down').highcharts({
                            chart: {
                                type: 'column',
                                marginBottom: 70,
                                marginTop: 50,
                                margin: 0
                            },
                            title: {
                                text: 'Room Status',
                                align: 'center',
                                verticalAlign: 'top',
                                style: {
                                    fontSize: '13px',
                                },
                                y: 40
                            },
                            subtitle: {
                                text: false
                            },
                            xAxis: {
                                type: 'category',
                                labels: {
                                    rotation: 45,
                                    style: {
                                        fontSize: '9px',
                                        fontFamily: 'Verdana, sans-serif'
                                    }
                                }
                            },
                            yAxis: {
                                title: {
                                    text: false
                                }
                            },

                            navigation: {
                                buttonOptions: {
                                    enabled: false
                                }
                            },

                            legend: {
                                enabled: false
                            },
                            plotOptions: {
                                series: {
                                    borderWidth: 0,
                                    dataLabels: {
                                        enabled: true,
                                        format: '{point.y:.1f}%'
                                    }
                                }
                            },

                            tooltip: {
                                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                            },

                            series: [{
                                name: 'Brands',
                                colorByPoint: true,
                                data: brandsData
                            }],
                            drilldown: {
                                series: drilldownSeries
                            }
                        });
                    }
                });
            });



        });

    </script>
</body>
</html>



