<%@ Page Title="Home Page" Language="C#" AutoEventWireup="true" CodeBehind="TRWhiteBoard.aspx.cs" Inherits="BedWhiteBoard.TRPage" %>


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
    <script src="Scripts/knockout.wrap.js"></script>
    <script src="Scripts/knockout.mapping-latest.js"></script>
    <script src="Scripts/knockout-switch-case.min.js"></script>

    <script src="Scripts/xdate.js"></script>
    <script src="Scripts/toastr.min.js"></script>
    <%--    <script src="Scripts/jquery.tools.min.js"></script>--%>
    <script src="Scripts/bootstrap.min.js"></script>

    <script src="assets/js/script.js"></script>
    <script src="assets/js/me-js.js"></script>

    <script src="Scripts/jquery.globalize/globalize.js"></script>
    <script src="Scripts/dx.webappjs.js"></script>
    <script src="Scripts/dx.chartjs.js"></script>
    <script src="Scripts/tr-management.js"></script>

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

        .try_nums {
            /*-webkit-transition: all 1s;
            -webkit-animation: DIV-BORDERq 1s infinite;*/
            background-image: url("assets/images/alertg.gif");

            text-shadow: none !important;
        }
        /*.try_nums, .dxc-series .dxc-markers[fill="#C90707"] {
            /*-webkit-transition: all 1s;
            -webkit-animation: DIV-BORDERq 1s infinite;
            background-image: url("assets/images/alert.gif");

            text-shadow: none !important;
        }*/

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
            /*-webkit-animation: stop;*/
            background-color: #d5080f;
            background-image:none;
        }


        /*.try_numss {
            -webkit-transition: all 1.5s;
            -webkit-animation: DIV-BORDERq7 1.5s infinite;
            /*background-image: none !important;
            text-shadow: none !important;*/
        /*}*/
       
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
        var hospitalid = 0;
        var lang = 0;
        var fromWindows = 1;

        wbType = 2;
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

            DevExpress.devices.current({ platform: "generic" });
            DevExpress.ui.themes.current("generic.light");

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
                    <div class="st-content">
                        <!-- this is the wrapper for the content -->
                        <div class="st-content-inner">
                            <!-- extra div for emulating position:fixed of the menu -->
                            <!-- the content -->

                        <%--<div id="spinner" class="spinner" style="display: none;">
                                <img id="img-spinner" src="assets/images/date_magnify.png" alt="Loading" />
                            </div>--%>
                            
                            <div id="divNurseStations" class="content-wrapper">
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

                                </div>
                            </div>

                            <input type="hidden" id="hdnPath" />
                         
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

                                    
                                    </div>

                                </div>

                            </div>
                      
                        </div>
                    
                    </div>
        </div>
      

        <%--templates--%>
       
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
                                    <h4 style="font-size: 23px; font-weight: 300;" data-bind="attr: { id: 'spnNS' + sys_key() }">Trauma Whiteboard</h4>
                                </td>
                            </tr>
                        </table>
                        <!--ENDtryh-->




                        <%--                        <img data-bind="attr: { id: 'imgNSColl' + sys_key() }" src="images/expand_arrow_alt.png" style="width: 32px; height: 32px; margin-top: -3px; display: inline; cursor: pointer; float: right;" />--%>
                    </div>

                    <div class="accContent" style="display: none; width: 100%;">
                        

                        <div class="row" style="margin-top: 10px;" data-bind="attr: { id: 'nsWp' + sys_key() }">
                            <div class="col-md-10" data-bind="attr: { id: 'try_exta' + sys_key() }">
                                <div class="widget widget-blue">
                                    <div class="widget-title">
                                        <div class="widget-controls" style="cursor: pointer;" >
                                            <div class="widget-control widget-control-minimize extend_div" onclick="WPMaxMin();" data-toggle="tooltip" data-placement="top" title="" data-original-title="Minimize"><i style="margin-right: 5px; margin-left: 5px;" class="icon-resize-full"></i></div>
                                        </div>
                                        <div class="widget-controls" style="cursor: pointer;" title="Refresh Waiting List">
                                            <div class="widget-control widget-control-refresh extend_div" title="Refresh Waiting List" data-bind="click: RefreshWP" data-toggle="tooltip" data-placement="top" title="" data-original-title="Refresh"><i style="margin-right: 5px; margin-left: 5px;" class="icon-refresh"></i></div>
                                        </div>
                                        <div class="top-search-w pull-right" style="margin-top: -4px; margin-right: 5px;">
                                            <input data-bind="attr: { id: 'txtWpSearch' + sys_key() }" type="text" class="top-search" placeholder="Search" />
                                        </div>
                                        <h3>Trauma Patient's List
                                        </h3>

                                    </div>
                                    <div class="widget-content fixedhight_contant" style="overflow-y: auto;">
                                        <div class="panelfullwidth">
                                            <table data-bind="attr: { id: 'tblWP' + sys_key() }" class="table">
                                                <thead>
                                                    <tr class="t_header">
                                                        <th style="margin: 0; text-align: center; vertical-align: middle; width: 80px"">NHS/ MRN</th>
                                                        <th style="margin: 0; text-align: center; vertical-align: middle; width: 150px"">Patient Name</th>
                                                        <th style="margin: 0; text-align: center; vertical-align: middle; width: 60px">Accident Date</th>
                                                        <th style="margin: 0; text-align: center; vertical-align: middle; width: 50px;">Priority</th>
                                                        <th style="margin: 0; text-align: center; vertical-align: middle; width: 60px;">Admission Date</th>
                                                        <th style="margin: 0; text-align: center; vertical-align: middle; width: 60px;">Current Location</th>
                                                        <th style="margin: 0; text-align: center; vertical-align: middle; width: 50px;">Waiting Minutes</th>
                                                        <th style="margin: 0; text-align: center; vertical-align: middle; width: 150px;">Reason</th>
                                                        <th style="margin: 0; text-align: center; vertical-align: middle; width: 150px;">Diagnosis</th>
                                                        <th style="margin: 0; text-align: center; vertical-align: middle; width: 50px;">Status</th>
                                                        <th style="margin: 0; text-align: center; vertical-align: middle; width: 150px;">Consultant</th>
                                                        <th style="margin: 0; text-align: center; vertical-align: middle; width: 100px;">Management plan</th>
                                                        <th style="margin: 0; text-align: center; vertical-align: middle; width: 60px;">Investigations</th>
                                                        <th style="margin: 0; text-align: center; vertical-align: middle; width: 60px;">Second Opiniion</th>
                                                        <th style="margin: 0; text-align: center; vertical-align: middle; width: 60px;">Decision</th>
                                                        <th style="margin: 0; text-align: center; vertical-align: middle; width: 60px;">Alerts</th>
                                                        
                                                    </tr>
                                                </thead>
                                                <tbody style="white-space: nowrap;">

                                                    <tr id='wp123' class='bedTabular Male' style ="background-color :aliceblue"  onclick="wpClick" oncontextmenu="WpRightClick">
                                                        <td style="margin: 0; text-align: center;">300467885</td>
                                                        <td style="margin: 0; text-align: center;">Jhon Doe</td>
                                                        
                                                        <td style="margin: 0; text-align: center;">08/08/2016</td>
                                                        <td style="background-color: red" class="wMinutes">1</td>
                                                        <td style="margin: 0; text-align: center;">08/08/2016</td>
                                                        <td style="margin: 0; text-align: center;">Emergency</td>
                                                        <td style="background-color: red" class="wMinutes">10</td>
                                                        <td style="margin: 0; text-align: center;">Reason</td>
                                                        <td style="margin: 0; text-align: center;">Diagnosis</td>
                                                        <td style="margin: 0; text-align: center;">Status</td>
                                                        <td style="margin: 0; text-align: center;">Jack Fred</td>
                                                        <td style="margin: 0; text-align: center;">Management Plan</td>
                                                        <td style="margin: 0; text-align: center;">Investigations</td>
                                                        <td style="margin: 0; text-align: center;">Second Opiniion</td>
                                                        <td style="margin: 0; text-align: center;">Decision</td>
                                                        <td style="margin: 0; text-align: center;"><img src="images\ww.png" style ="width :16px;height :16px;" /></td>
                                                        
                                                     
                                                        
                                                    </tr>
                                                     <tr id='wp123' class='bedTabular Male' style ="background-color :aliceblue"  onclick="wpClick" oncontextmenu="WpRightClick">

                                                        <td style="margin: 0; text-align: center;">Jhon Doe</td>
                                                        <td style="margin: 0; text-align: center;">300467885</td>
                                                        <td style="margin: 0; text-align: center;">08/08/2016</td>
                                                        <td style="background-color: red" class="wMinutes">1</td>
                                                        <td style="margin: 0; text-align: center;">08/08/2016</td>
                                                        <td style="margin: 0; text-align: center;">Emergency</td>
                                                        <td style="background-color: red" class="wMinutes">10</td>
                                                        <td style="margin: 0; text-align: center;">Reason</td>
                                                        <td style="margin: 0; text-align: center;">Diagnosis</td>
                                                        <td style="margin: 0; text-align: center;">Status</td>
                                                        <td style="margin: 0; text-align: center;">Jack Fred</td>
                                                        <td style="margin: 0; text-align: center;">Management Plan</td>
                                                        <td style="margin: 0; text-align: center;">Investigations</td>
                                                         <td style="margin: 0; text-align: center;">Second Opiniion</td>
                                                         <td style="margin: 0; text-align: center;">Decision</td>
                                                        <td style="margin: 0; text-align: center;"><img src="images\ww.png" style ="width :16px;height :16px;" /></td>
                                                        
                                                     
                                                        
                                                    </tr>
                                                     <tr id='wp123' class='bedTabular Male' style ="background-color :aliceblue"  onclick="wpClick" oncontextmenu="WpRightClick">

                                                        <td style="margin: 0; text-align: center;">Jhon Doe</td>
                                                        <td style="margin: 0; text-align: center;">300467885</td>
                                                        <td style="margin: 0; text-align: center;">08/08/2016</td>
                                                        <td style="background-color: red" class="wMinutes">1</td>
                                                        <td style="margin: 0; text-align: center;">08/08/2016</td>
                                                        <td style="margin: 0; text-align: center;">Emergency</td>
                                                        <td style="background-color: red" class="wMinutes">10</td>
                                                        <td style="margin: 0; text-align: center;">Reason</td>
                                                        <td style="margin: 0; text-align: center;">Diagnosis</td>
                                                        <td style="margin: 0; text-align: center;">Status</td>
                                                        <td style="margin: 0; text-align: center;">Jack Fred</td>
                                                        <td style="margin: 0; text-align: center;">Management Plan</td>
                                                        <td style="margin: 0; text-align: center;">Investigations</td>
                                                         <td style="margin: 0; text-align: center;">Second Opiniion</td>
                                                         <td style="margin: 0; text-align: center;">Decision</td>
                                                        <td style="margin: 0; text-align: center;"><img src="images\ww.png" style ="width :16px;height :16px;" /></td>
                                                        
                                                     
                                                        
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                         <div class="panelfullwidth">
                                            <table data-bind="attr: { id: 'tblWP' + sys_key() }" class="table">
                                                <thead>
                                                    <tr class="t_header">
                                                        <th style="margin: 0; text-align: center; vertical-align: middle; width: 300px"">Patient</th>
                                                        <th style="margin: 0; text-align: center; vertical-align: middle; width: 300px"">Operation</th>
                                                        <th style="margin: 0; text-align: center; vertical-align: middle; width: 100px"">Operation Date</th>
                                                        <th style="margin: 0; text-align: center; vertical-align: middle; width: 60px">Surgeon</th>                                                      
                                                        
                                                    </tr>
                                                </thead>
                                                <tbody style="white-space: nowrap;">

                                                    <tr id='wp123' class='bedTabular Male' style ="background-color :aliceblue"  onclick="wpClick" oncontextmenu="WpRightClick">

                                                        <td style="margin: 0; text-align: center;">Patient Name Patient Name</td>
                                                        <td style="margin: 0; text-align: center;">Operation Name Operation Name Operation Name Operation Name Operation Name</td>
                                                        <td style="margin: 0; text-align: center;">08/08/2016</td>
                                                        <td style="margin: 0; text-align: center;">Surgeon Name Surgeon Name Surgeon Name</td>
                                                        
                                                    </tr>
                                                     <tr id='wp123' class='bedTabular Male' style ="background-color :aliceblue"  onclick="wpClick" oncontextmenu="WpRightClick">

                                                         <td style="margin: 0; text-align: center;">Patient Name Patient Name</td>
                                                       <td style="margin: 0; text-align: center;">Operation Name Operation Name Operation Name Operation Name Operation Name</td>
                                                        <td style="margin: 0; text-align: center;">08/08/2016</td>
                                                        <td style="margin: 0; text-align: center;">Surgeon Name Surgeon Name Surgeon Name</td>

                                                    </tr>
                                                     <tr id='wp123' class='bedTabular Male' style ="background-color :aliceblue"  onclick="wpClick" oncontextmenu="WpRightClick">

                                                         <td style="margin: 0; text-align: center;">Patient Name Patient Name</td>
                                                       <td style="margin: 0; text-align: center;">Operation Name Operation Name Operation Name Operation Name Operation Name</td>
                                                        <td style="margin: 0; text-align: center;">08/08/2016</td>
                                                        <td style="margin: 0; text-align: center;">Surgeon Name Surgeon Name Surgeon Name</td>

                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                            </div>

                     
                            <div class="col-md-2" id="try_extc">
                                <div class="widget widget-blue">
                                    <div class="widget-content" style="border-radius: 3px 3px 3px 3px;">

                                        <div class="row" style="width: 100%">
                                           
                                            <div class="col-md-12" style="background-color: rgb(229, 229, 229); padding-bottom: 10px;">
                                                <h5 style="font-size: 15px; font-weight: 300; text-align: center; margin-bottom: 0; margin-top: 5px;">Trauma Patients</h5>
                                                <div data-bind="attr: { id: 'chartTrts' + sys_key() }, dxChart: chartTrtOptions" style="width: 100%; height: 140px; margin: 0 auto;"></div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-12" style="background-color: whitesmoke; padding-bottom: 10px;">
                                                <h5 style="font-size: 15px; font-weight: 300; text-align: center; margin-bottom: 0; margin-top: 5px;">Operations</h5>
                                                <div data-bind="attr: { id: 'chartBeds' + sys_key() }, dxPieChart: chartBedOptions" style="height: 80px; margin: 0 auto"></div>
                                                <table style="width: 100%; font-size: 10px; text-align: center; margin-top: 7px; text-shadow: 0px 1px 1px black; color: white;">
                                                    <tr>
                                                        <td style="background-color: rgb(113, 168, 67);">Free
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
                                                    <%--<tr>
                                                        <td>All In Treatment
                                                        </td>
                                                        <td data-bind="text: TotalTrt()" style="text-align: center;"></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Holding bay (Not In Cubicle/Bed)
                                                        </td>
                                                        <td data-bind="text: notOnBeds()" style="text-align: center;"></td>
                                                    </tr>--%>
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
                                <tr data-bind="attr: { 'id': 'cxOnBed' + sys_key() }"  class="cnxMnuTrtOnBed"></tr>
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
                            <input data-bind="attr: { id: 'txtTrtSearch' + sys_key() }" type="text" class="top-search" placeholder="Search" />
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

                                <tr data-bind="attr: { 'id': 'cxNotOnBed' + patient_id() }" class="cnxMnuTrtNotOnBed"></tr>

                                <tr data-bind="attr: { 'id': 'pId' + patient_id(), 'class': 'bedTabular ' + sex() }, click: NotOnBedClick, event: { 'contextmenu': notOnBedRightClick }">
                                    <td></td>
                                    <td style="margin: 0; text-align: center;">
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

        <%--end of templates--%>

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

        <div class="modal fade" id="diagTriagePriority" tabindex="-1" role="dialog" aria-labelledby="modalFormStyle1Label" aria-hidden="true">
            <div class="modal-dialog" style="width:300px">
                <div class="modal-content">
                    <div class="widget widget-blue">
                        <div class="widget-title">
                            <h3><i class="icon-ok-sign"></i>Please select triage priority</h3>
                        </div>
                        <div class="widget-content">
                            <div class="modal-body" style="text-align: center">
                                <form>
                                    <table id="triagePriorityList" class="ui-widget-content table-hover" style="width: 100%">
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



