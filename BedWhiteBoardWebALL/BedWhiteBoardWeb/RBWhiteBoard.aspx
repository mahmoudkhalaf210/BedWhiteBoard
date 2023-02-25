<%@ Page Title="Home Page" Language="C#" AutoEventWireup="true" CodeBehind="RBWhiteBoard.aspx.cs" Inherits="BedWhiteBoard.RBPage" %>


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
    <link href="assets/favicon.ico" rel="shortcut icon" />
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

    <script src="Scripts/recovery-management.js"></script>


    <style>
        /*#wbNsList .ShinyButton
        {
            height: 105px;
        }*/
        iframe {
            border: none;
        }

        .row {
            margin-left: 0;
            margin-right: 0;
        }

        #calendar {
            width: 100%;
        }

        .table tbody + tbody {
            border-top: none;
        }

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


        .try_num {
            /*-webkit-transition: all 1s;
            -webkit-animation: DIV-BORDER 2s infinite;
            background-image: none !important;*/
            text-shadow: none !important;
            background-color: #ff6264;
        }


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

        .table thead > tr > th {
            border-bottom: none;
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

                <!-- content push wrapper -->
                <div class="st-pusher">

                    <div class="st-content">
                        <!-- this is the wrapper for the content -->
                        <div class="st-content-inner">
                            <!-- extra div for emulating position:fixed of the menu -->
                            <!-- the content -->

                            <div id="divNurseStations" class="content-wrapper">

                                <div class="page_control">
                                    <div id="wbToolBar" style="display: none;">
                                        <table style="width: 100%; margin-bottom: 10px;">
                                            <tr>
                                                <td style="text-align: right;">
                                                    <span id="connBtnWb" class="DisConnectedBtn">Disconnected
                                                    </span>
                                                </td>
                                            </tr>
                                        </table>
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
                                                            <th style="border: solid 1px #eab551 !important; border-bottom: solid 1px #b98a37 !important;">Reserved Beds
                                                            </th>

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
                                                            <td>
                                                                <span data-bind="text: reservedBeds"></span>
                                                            </td>

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
                                        <div id="wbroomsAndBeds" data-bind="template: { name: templateToUse }" style="display: block; opacity: 0.0; margin-left: -100px; margin-right: 100px;">
                                        </div>


                                    </div>

                                </div>

                            </div>

                        </div>

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
                            <th colspan="2"></th>

                            <th style="padding: 0;">
                                <table style="width: 100%">
                                    <colgroup>
                                        <col width="10%">
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
                                        <th>Reserved Beds
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


                            </td>
                            <td>
                                <table style="font-size: 10px; text-align: center; width: 100%">
                                    <colgroup>
                                        <col width="10%">
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
                                        <td>
                                            <span data-bind="text: reservedBeds"></span>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </tbody>


                </table>


            </div>
        </script>

        <script id="roomsAndBedsTmpl2RB" type="text/html">

            <div class="bt-sm btn btn-default" style="position: fixed; right: 0; top: 129px; z-index: 999999999; padding: 2px;" data-bind="click: Refresh">
                                    <img src="assets/images/arrow_refresh_small.png" />
                                </div>
            <div class="row">
                <div class="col-md-8" data-bind="foreach: roomsAndBeds">
                <div class="widget widget-blue">
                    <div class="widget-title">
                        <div class="widget-controls" style="display:none;">
                    <table>
                        <tr style="font-size: 17px; font-weight: 100; text-align: center;">
                        <td style="padding: 0 5px;">
                            <span title="Available Beds" style="color: #A6CF5D;">5</span>
                        </td>
                        <td style="padding: 0 5px;">
                            <span title="Occupied Male" style="color: #4FC2EF;">2</span>
                        </td>
                        <td style="padding: 0 5px;">
                            <span title="Occupied Female" style="color: #F66A7C;">1</span>
                        </td>
                        <td style="padding: 0 5px;">
                            <span title="Total Occupied" style="color: #BFBFBF;">3</span>
                        </td>
                        <td style="padding: 0 5px;">
                            <span title="Blocked Beds" style="color: #464646;">1</span>
                        </td>
                        <td style="padding: 0 5px;">
                            <span title="Reserved Beds" style="color: #FFAE0D;">1</span>
                        </td>

                    </tr>
                        </table>
                    
                </div>
                       <h3><img src="assets/images/sdoor.png" /> <span data-bind="text: room_name"></span></h3>
                    </div>
                    <div class="widget-content">
                        <div data-bind="attr: { 'id': 'roomId' + room_key() }" class="">
                            <table class="table" style="margin-bottom: 0px !important;">
                                <colgroup>
                                    <col width="3%" />
                                    <col width="17%" />
                                    <col width="80%" />
                                </colgroup>
                                <thead>
                                    <tr class="th_header">
                                        <%--<th colspan="2">Bay Name</th>--%>
                                        <th style="padding: 0;">
                                            <table style="width: 100%;">
                                                <colgroup>
                                                    <col width="10%">
                                                    <col width="10%">
                                                    <col width="10%">
                                                    <col width="10%">
                                                    <%--<col width="10%">--%>
                                                </colgroup>
                                                <thead>
                                                    <tr class="th_header">
                                                        
                                                        <th>Bed Name
                                                        </th>
                                                        <th>Patient ID
                                                        </th>
                                                        <th>Patient Name
                                                        </th>
                                                        <th>Physician
                                                        </th>
                                                        <%-- <th>
                                                    Specialty
                                                </th>--%>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <%--<td>
                                            <img src="assets/images/door.png" />
                                        </td>
                                        <td>
                                            <span data-bind="text: room_name"></span>
                                        </td>--%>
                                        <td style="padding: 5px 0;">
                                            <div data-bind="foreach: beds">
                                                <!-- ko if: iswaitingarea !== '1' -->
                                                <div data-bind="attr: { 'id': 'bedId' + sys_key(), 'class': 'bedTabular ' + sexClass() }">
                                                    <table style="border: 0; padding: 0; border-spacing: 0; margin: 0; width: 100%;">
                                                        <colgroup>
                                                            <col width="10%">
                                                            <col width="10%">
                                                            <col width="10%">
                                                            <col width="10%">
                                                            <%--<col width="10%">--%>
                                                        </colgroup>
                                                        <thead style="display: none;">
                                                            <tr class="th_header">
                                                                <th>Bed Name
                                                                </th>
                                                                <th>Patient ID
                                                                </th>
                                                                <th>Patient Name
                                                                </th>
                                                                <th>Physician
                                                                </th>
                                                                <%-- <th>
                                                    Specialty
                                                </th>--%>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr data-bind="click: RecoveryBedClick">
                                                                <td data-bind="text: latin_desc" style="margin: 0; text-align: center;"></td>
                                                                <td data-bind="text: patient_id_2" style="margin: 0; text-align: center;"></td>
                                                                <td data-bind="text: patengname" style="margin: 0; text-align: center;"></td>
                                                                <td data-bind="text: physician" style="margin: 0; text-align: center;"></td>
                                                                <%--<td data-bind="text: specialty" style="margin: 0; text-align: center;"></td>--%>
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
                    </div>
                </div>

            </div>
            
            <div class="col-md-4" id="wbwaitingAreas" data-bind="template: { name: 'waitingAreasTmpl2RB', foreach: waitingAreas }">
                
            </div>
            </div>
            


        </script>

        <script id="waitingAreasTmpl2RB" type="text/html">
            <div class="widget widget-blue">
                
                <div class="widget-title">
                <div class="widget-controls">
                    <a><span id="AddtoWA" style="float: right; cursor:pointer" data-bind="click: AddtoWA">
                    <img src="assets/images/_add.png" />
                   </span></a>
                    </div>
                
            <div class="widget-controls" style="display:none;">
                    <table>
                        <tr style="font-size: 17px; font-weight: 100; text-align: center;">
                        <td style="padding: 0 5px;">
                            <span title="Available Beds" style="color: #A6CF5D;">5</span>
                        </td>
                        <td style="padding: 0 5px;">
                            <span title="Occupied Male" style="color: #4FC2EF;">2</span>
                        </td>
                        <td style="padding: 0 5px;">
                            <span title="Occupied Female" style="color: #F66A7C;">1</span>
                        </td>
                        <td style="padding: 0 5px;">
                            <span title="Total Occupied" style="color: #BFBFBF;">3</span>
                        </td>
                        <td style="padding: 0 5px;">
                            <span title="Blocked Beds" style="color: #464646;">1</span>
                        </td>
                        <td style="padding: 0 5px;">
                            <span title="Reserved Beds" style="color: #FFAE0D;">1</span>
                        </td>

                    </tr>
                        </table>
                    
                </div>
                    <h3><img src="assets/images/sdoor.png" /> <span data-bind="text: room_name"></span></h3>
                </div>
                <div class="widget-content">
                    <div data-bind="attr: { 'id': 'roomId' + room_key() }" class="">
                <%--<span data-bind="text: room_name"></span>--%>
                <table class="table" style="margin-bottom: 0px !important;">
                    <colgroup>
                        <col width="80%" />
                    </colgroup>
                    <thead>
                        <tr class="th_header">

                            <th style="padding: 0;">
                                <table style="width: 100%;">
                                    <colgroup>

                                        <col width="10%">
                                        <col width="10%">
                                        <col width="10%">
                                        <%--<col width="10%">--%>
                                    </colgroup>
                                    <thead>
                                        <tr class="th_header">

                                            <th>Patient ID
                                            </th>
                                            <th>Patient Name
                                            </th>
                                            <th>Physician
                                            </th>
                                            <%-- <th>
                                                    Specialty
                                                </th>--%>
                                        </tr>
                                    </thead>
                                </table>
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>

                            <td style="padding: 5px 0;">
                                <div data-bind="foreach: beds">
                                    <!-- ko if: notEmpty -->
                                    <div data-bind="attr: { 'id': 'bedId' + sys_key(), 'class': 'bedTabular ' + sexClass() }">
                                        <table style="border: 0; padding: 0; border-spacing: 0; margin: 0; width: 100%;">
                                            <colgroup>
                                                <col width="10%">
                                                <col width="10%">
                                                <col width="10%">
                                                <%--<col width="10%">--%>
                                            </colgroup>
                                            <thead style="display: none;">
                                                <tr class="th_header">

                                                    <th>Patient ID
                                                    </th>
                                                    <th>Patient Name
                                                    </th>
                                                    <th>Physician
                                                    </th>
                                                    <%--<th>
                                                    Specialty
                                                </th>--%>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr data-bind="click: RecoveryBedClickWA">
                                                    <td data-bind="text: patient_id_2" style="margin: 0; text-align: center;"></td>
                                                    <td data-bind="text: patengname" style="margin: 0; text-align: center;"></td>
                                                    <td data-bind="text: physician" style="margin: 0; text-align: center;"></td>
                                                    <%--<td data-bind="text: specialty" style="margin: 0; text-align: center;"></td>--%>
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
                                <button type="button" class="btn btn-primary btn-sm" data-dismiss="modal">Close</button>
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
                                <iframe id="framSelection" style="width: 100%; height: 300px;"></iframe>
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
                                                    <iframe id="framInput" style="width: 100%;"></iframe>
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
                                                    <iframe id="framConfirm" style="width: 100%;"></iframe>
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
                                                    <span id="spnMsg" class="ui-widget-content"></span>
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



