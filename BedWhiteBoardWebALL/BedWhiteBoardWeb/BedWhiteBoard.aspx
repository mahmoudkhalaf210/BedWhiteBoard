<%@ Page Title="Home Page" Language="C#" AutoEventWireup="true" CodeBehind="BedWhiteBoard.aspx.cs" Inherits="BedWhiteBoard.BedPage" %>


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
    <script src="Scripts/dx.webappjs.js"></script>

    <script src="Scripts/bed-management.js"></script>

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
        .table thead>tr>th
        {
            border-bottom:none;
        }
        div[data-bind="foreach: beds"] div.bedTabular table thead
        {
            visibility:hidden;
        }
        div[data-bind="foreach: beds"] div.bedTabular:first-child table thead
        {
            visibility:visible;
        }
        /*div[data-bind="foreach: beds"] div.bedTabular table
        {
            margin-top:-24px;
        }*/
        div[data-bind="foreach: beds"] div.bedTabular:first-child table
        {
           margin-top: 0px !important;
        }
        div.patient_data
        {
            position: absolute;
            top: -1px;
            /*background: #f997b0;
            background: -webkit-gradient(linear, 0 0, 0 bottom, from(#f997b0), to(#f56778));
            background: -moz-linear-gradient(#f997b0, #f56778);
            background: linear-gradient(#f997b0, #f56778);*/
            /* border: solid 1px #ee8090; */
            /* border-bottom: solid 1px #cb5462; */
            /* box-shadow: inset 0 0 0 1px #fbc1d0; */
            /*color: #913944;
            text-shadow: 0 1px 0 #f9a0ad;*/
            left: 2px;
            width: 114px;
            font-size: 11px;
            margin: 0 auto;
            border-radius: 0 0 5px 5px;
            font-weight: bold;
            line-height: 11px;
        }
        div[data-bind="attr: { 'id': 'rotateArrowsB' + sys_key() }"]
        {
            position: absolute;
            top: 35px;
            margin: 0 auto;
            width: 100px;
            left: 5px;
        }
        .alerts_img
        {
            position: absolute;
            top: -22px;
            left: 0;
            /*display:none;*/
        }
        span[data-bind="text: latin_desc()"]
        {
            display: block;
            margin-top: 21px;
            font-size: 10px;
            font-weight: bold;
        }
        div#wbroomsAndBeds div.roomTabular table tbody tr td div[data-bind="foreach: beds"] div.bedTabular table thead
        {
            visibility:hidden;
        }
        div#wbroomsAndBeds div.roomTabular table tbody tr td div[data-bind="foreach: beds"] div.bedTabular table thead tr th
        {
            line-height: 0;
            padding:0;
        }
        .first_th tr th
        {
            visibility: visible;
            line-height: normal !important;
            /*border: 1px dashed #cacaca;*/
            background: rgb(255,255,255);
            background: -moz-linear-gradient(top, rgba(255,255,255,1) 0%, rgba(243,243,243,1) 99%);
            background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(255,255,255,1)), color-stop(99%,rgba(243,243,243,1)));
            background: -webkit-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(243,243,243,1) 99%);
            background: -o-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(243,243,243,1) 99%);
            background: -ms-linear-gradient(top, rgba(255,255,255,1) 0%,rgba(243,243,243,1) 99%);
            background: linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(243,243,243,1) 99%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#f3f3f3',GradientType=0 );
            text-shadow: 0px 1px 0px white;
            -webkit-transition: all 0.4s linear;
            -moz-transition: all 0.4s linear;
            -o-transition: all 0.4s linear;
            transition: all 0.4s linear;
            opacity: 1;
            margin-bottom: 5px;
            position: relative;
            top: -10px;
            padding: 9px 0px !important;
             color: #606060;
        }
        
        /*div#wbRoomsBeds {
            margin-top: 20px;
        }*/
        /*#wbroomsAndBeds .roomTabular {
            padding-top: 30px;
        }*/
        .div_hight {
            height: 30px;
            margin-left: -1px;
            margin-right: -1px;
            /*background-image: url("assets/images/bg.png");*/
            background: linear-gradient(to bottom, rgba(255,255,255,1) 0%,rgba(243,243,243,1) 99%);
            border-bottom: solid 1px #eab551;
            border-top: 1px solid #EEEEEE;
            margin-top: -2px;
        }
        tr[data-bind="foreach: bedAlerts"] td
        {
            width:200px;
        }
        .bedTabular
        {
            margin:0 !important;
            height: 25px;
            font-weight: 600;

        }
        td[data-bind="text: patengname"], td[data-bind="text: physician"] , td[data-bind="text: nurse"], td[data-bind="text: latin_desc()"] {
            max-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .first_th
        {
            display:none;
        }
        .zooom
        {
            width:95px;
        }
        .zoom
        {
            width:150px;
        }
        .zom
        {
            width:250px;
        }
        .wbzooom
        {
            zoom:.8;
        }
        .wbzoom
        {
            zoom:.9;
        }
        .wbzom
        {
            zoom:1;
        }
        .bedTabular {
    font-size: 14px;
    padding-top: 0;
    color: white;
    text-shadow: 0 1px 0 #000000;
    letter-spacing: 1px;
        margin-right: 5px !important;
}
        table span[data-bind="text: room_name"] {
    font-size: 18px;
    font-weight: 300;
}
        @media (min-width: 992px){
        .col-md-4 {
            width: 33%;
        }
           .col-md-6 {
    width: 49.5%;
}
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
        var web = 0;
        var hospitalid = 0;
        var lang = 0;
        var fromWindows = 1;
        var zoomValue = "zom";

        wbType = GetQueryStringParams('wbt');
        vw = GetQueryStringParams('vw');
        uId = GetQueryStringParams('StaffKey');
        //uId = "616";
        web = GetQueryStringParams('web');
        hospitalid = GetQueryStringParams('hospitalid');
        lang = GetQueryStringParams('lang');

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
                <div class="st-pusher" style="padding-left: 2px;">

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
                                                <td>
                                                    <span id="layoutStyle" class="btn-group" data-toggle="buttons" style="display: none;">

                                                        <label class="btn btn-default">
                                                            <input id="rdoGraphical" name="radioLayout" type="radio" value="roomsAndBedsTmpl" data-bind="checked: selectedView" onchange="rdoGraphical_Changed();" />Graphical
                                                        </label>
                                                        <label class="btn btn-default active">
                                                            <input id="rdoTabular" name="radioLayout" type="radio" value="roomsAndBedsTmpl2" data-bind="checked: selectedView" onchange="rdoTabular_Changed();" />Tabular
                                                        </label>
                                                    </span>

                                                    <span id="zoomLevel" class="btn-group" data-toggle="buttons" style="float:right;display: none;" >

                                                        <label class="btn btn-default active" id="zom">
                                                            <input name="radioLayout" type="radio" value="roomsAndBedsTmpl2"  />1X
                                                        </label>
                                                        <label class="btn btn-default" id="zoom">
                                                            <input name="radioLayout" type="radio" value="roomsAndBedsTmpl2"  />2X
                                                        </label>
                                                        <label class="btn btn-default" id="zooom">
                                                            <input name="radioLayout" type="radio" value="roomsAndBedsTmpl2"  />3X
                                                        </label>
                                                    </span>

                                                    <span id="toolBar" style="display: none; float: left;margin-left: 10px;">
                                                        <img id="btnEdit" src="images/move.png" style="width: 32px; height: 32px; display: inline; cursor: pointer" onclick="btnEdit_click();" />
                                                        <img id="btnSave" src="images/camera_test.png" style="width: 32px; height: 32px; display: none; cursor: pointer" onclick="btnSave_click();" />
                                                        <img id="btnCancel" src="images/button_cancel_256.png" style="width: 32px; height: 32px; display: none; cursor: pointer" onclick="btnCancel_click();" />
                                                        <div class="form-group"  id="uploadBackImg" style="display:none; float: right; margin-left: 10px;">
                                                            <div class="input-group">
                                                                <input style="padding-left: 5px;" class="form-control input-sm nrb" type="file" value="Choose a file"/>
                                                                <span class="input-group-btn">
                                                                      <input class="btn btn-sm btn-primary" type="button" disabled="disabled" value="Upload" id="uploadBackground"/>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        
                                                    </span>

                                                    <span id="bedSizeBar" style="display: none; float: left;">
                                                        <label for="bedSizeAmount" style="float: left; margin-top: 8px; margin-left: 6px;">Size:</label>
                                                        <input type="text" id="bedSizeAmount" style="width: 20px; height: 10px; font-size: small; float: left; margin-top: 8px; margin-left: 2px;" />

                                                        <div id="bedSize" style="width: 100px; float: left; margin-top: 12px; margin-left: 6px;"></div>
                                                    </span>
                                                </td>
                                               <%-- <td style="text-align: right;">
                                                    <span id="connBtnWb" class="DisConnectedBtn">Disconnected
                                                    </span>
                                                </td>--%>
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
                                    <div id="selectedNS" class="ShinyButton" data-bind="click: $root.closeNS, foreach: $root.SelectedNs" style="opacity: 0.0; height: 90px;">
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
                                                    <%--<div class="nur_alerts">
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
                                                    </div>--%>
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
                            <%--<div class="nur_alerts">
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
                            </div>--%>

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
                                  
                                </tr>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                    
                    
                </table>


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
                             
                    <span data-bind="text: latin_desc()"></span>
                    <div data-bind="attr: { 'class': 'patient_data ' + sexClass(), title: 'Dr: ' + physician() + '\n' + nurse() }" >
                        <span data-bind="text: patengname()"></span>
                        <br />
                        <span data-bind="text: patient_id()"></span>
                    </div>
                            
                    <div data-bind="attr: { 'id': 'rotateArrowsB' + sys_key() }" style="display: none;">
                        <img id="imgRotateDLB" src="Images/control_double_left.png" data-bind="click: rotateDLeftClickB" style="width: 16px; height: 16px; cursor: pointer" />
                        <img id="imgRotateLB" src="Images/control_left.png" data-bind="click: rotateLeftClickB" style="width: 12px; height: 16px; cursor: pointer" />
                        <span data-bind="attr: { 'id': 'degreeB' + sys_key() }, 'text': rotation" style="width: 16px; height: 16px">0</span>
                        <img id="imgRotateRB" src="Images/control_right.png" data-bind="click: rotateRightClickB" style="width: 12px; height: 16px; cursor: pointer" />
                        <img id="imgRotateDRB" src="Images/control_double_right.png" data-bind="click: rotateDRightClickB" style="width: 16px; height: 16px; cursor: pointer" />
                    </div>
                    <table class="alerts_img">
                        <tr data-bind="foreach: bedAlerts">
                            <td>
                                <img data-bind="attr: { 'id': 'bedAlert' + patient_id() + alert_name(), src: icon, title: tooltip }" style="width: 16px; height: 16px; cursor: pointer" class="try_iconshadWB" />
                            </td>
                        </tr>
                    </table>
                    <div>
                    </div>

                </div>
                <!-- /ko -->
            </div>

        </script>

        <script id="roomsAndBedsTmpl2" type="text/html">
            
            <div data-bind="attr: { 'id': 'roomId' + room_key() }" class="roomTabular">
                <%--<div class="div_hight"style="display:none"></div>--%>
                <table class="table" style="margin-bottom: 0px !important;">
                    <colgroup>
                        <col width="2%" />
                        <col width="6.5%" />
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
                                    <table style="border: 0; padding: 0; border-spacing: 0; width: 100%;">
                                        <thead style="display:none;">
                                            <tr>
                                                <th style="text-align:left">
                                                    Bed
                                                </th>
                                                <th style="text-align:left">
                                                    Patient ID
                                                </th>
                                                <th style="text-align:left">
                                                    Patient Name
                                                </th>
                                                <th style="text-align:left">
                                                    Physician Name
                                                </th>
                                                <th style="text-align:left">
                                                    Nurse Name
                                                </th>
                                                <%--<th style="text-align:left">
                                                    Specialty
                                                </th>--%>
                                                <th style="text-align:left">
                                                    Alerts
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                            <td data-bind="text: latin_desc()" style="margin: 0; text-align: left; width: 120px;"></td><td style="width: 10px;">|</td>
                                            <td data-bind="text: patient_id" style="margin: 0; text-align: left; width: 59px;"></td><td style="width: 10px;">|</td>
                                            <td class="patengname zom" data-bind="text: patengname" style="margin: 0; text-align: left; width: 60px;"></td><td style="width: 10px;">|</td>
                                            <td class="physician zom" data-bind="text: physician" style="margin: 0; text-align: left;"></td><td style="width: 10px;">|</td>
                                            <td class="physician zom" data-bind="text: nurse" style="margin: 0; text-align: left;"></td><td style="width: 10px;">|</td>
                                            <%--<td data-bind="text: specialty" style="margin: 0; text-align: left; width: 150px"></td>--%>
                                            <td style="margin: 0; text-align: left;">
                                                <div style="overflow: hidden; height: 21px;" data-bind="foreach: bedAlerts">
                                                    <img data-bind="attr: { 'id': 'bedAlert' + patient_id() + alert_name(), src: icon, title: tooltip }" style="width: 16px; height: 16px; cursor: pointer" class="try_iconshadWB"/>
                                                </div>
                                            </td>
                                        </tr>
                                        </tbody>
                                        
                                    </table>
                                </div>
                                <!-- /ko -->
                            </div>

                        </td>
                    </tr>
                </table>


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

            $('#zooom').click(function () {
                $('.bedTabular').addClass('col-md-4');
                $('.bedTabular').removeClass('col-md-12');
                $('.bedTabular').removeClass('col-md-6');

                $('.patengname').addClass('zooom');
                $('.patengname').removeClass('zoom');
                $('.patengname').removeClass('zom');

                $('.physician').addClass('zooom');
                $('.physician').removeClass('zoom');
                $('.physician').removeClass('zom');
                
                $('#wbView').addClass('wbzooom');
                $('#wbView').removeClass('wbzoom');
                $('#wbView').removeClass('wbzom');

                zoomValue = "zooom";
            });

            $('#zoom').click(function () {
                $('.bedTabular').addClass('col-md-6');
                $('.bedTabular').removeClass('col-md-12');
                $('.bedTabular').removeClass('col-md-4');

                $('.patengname').addClass('zoom');
                $('.patengname').removeClass('zooom');
                $('.patengname').removeClass('zom');

                $('.physician').addClass('zoom');
                $('.physician').removeClass('zooom');
                $('.physician').removeClass('zom');

                $('#wbView').addClass('wbzoom');
                $('#wbView').removeClass('wbzooom');
                $('#wbView').removeClass('wbzom');

                zoomValue = "zoom";
            });

            $('#zom').click(function () {
                $('.bedTabular').addClass('col-md-12');
                $('.bedTabular').removeClass('col-md-6');
                $('.bedTabular').removeClass('col-md-4');

                $('.patengname').addClass('zom');
                $('.patengname').removeClass('zoom');
                $('.patengname').removeClass('zooom');

                $('.physician').addClass('zom');
                $('.physician').removeClass('zoom');
                $('.physician').removeClass('zooom');

                $('#wbView').addClass('wbzom');
                $('#wbView').removeClass('wbzoom');
                $('#wbView').removeClass('wbzooom');

                zoomValue = "zom";
            });

        });

    </script>
</body>
</html>



