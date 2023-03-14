/// <reference path="er-management.js" />
// add datepicker by khalifa
var DischargOrderDate;
var triagtype = 0;
var ixxx = 0;
var fasttriagcode = 0;
var DuplexIP = "";
var jsonRoomsAndBeds;
var openedNS;
var IndexNS;
var vm;
var areatype = 0;
var currDate = new Date();
var triageLevelsCount;
var triageLevels;
var triageSheetKey;
var ERstartTime, ERavgTime, ERmaxTime;
var TRGstartTime = new Array(), TRGavgTime = new Array(), TRGmaxTime = new Array();
var WAstartTime = new Array(), WAavgTime = new Array(), WAmaxTime = new Array();
var intTRGstartTime, intTRGavgTime, intTRGmaxTime;
var intWAstartTime, intWAavgTime, intWAmaxTime;
var jsonErDoctors;
var emptyBeds;
var dischareStatus;
var diagDoctors;
var diagStatus;
var selectedWP;
var selectedBed;
var selectedNotOnBed;
var clickedWP;
var clickedBed;
var clickedNotOnBed;
var dxMnuWPToTriage;
var dxMnuTrtOnBed;
var dxMnuTrtNotOnBed;
var moveInfo;
var jsonWPs;
var chartWPSource;
var isInitialReceivCalled = false;
var lastBedClick = "";
var timer;
var childwindow;
var timerAdmission;
var childwindowAdmission;
var timerEMR;
var childwindowEMR;
var serverTimeProcessed;
var subMnuNSs = [];
var BedsMenu = [];
var FTBedsMenu = [];
var newborn;
var infant;
var child;
var adult;
var MnuesAttached = [];
var ER_EnableFastTriage = 0;
var ER_EnableBilling = 0;
var Enable_Alphanumric_PID = 0;
var SelectedBedKey = 0;
var SelectedEpisodeKey = 0;
var subMnuAssList = [];
var BedSelected = "";



//add by khalifa
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return undefined;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}



// add by khalifa

function copyToClipboard(text) {
    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.
        return clipboardData.setData("Text", text);

    } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");  // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}


// add by khalifa
function CopyDataToClibBoard(text) {
    var result = copyToClipboard(text);
    if (result == true) {

        DevExpress.ui.notify("Copied :" + text, "success", 1500);


    }

}





//debugger;
//var str = '{"sys_key":1306,"parent_key":1305,"maintainance":0,"active":0,"inactive":0,"isolated":0,"undercleaning":0,"latin_desc":"RESUS 6","sex":"occupiedFemale","pSex":"F","bed_class":1015,"patient_id":101267441,"patient_sex":2,"patengname":"JESSA WONG      ","patlocname":"       ","status":1,"pat_bithdate":"07/08/1989 12:00:00 AM","age":26,"start_date":"06/06/2016 12:00:00 AM","systime":"","emr_status_time":"06/06/2016 1:42:39 PM","emr_status":2,"emr_status_color":"Red","iswaitingarea":0,"episodekey":44804,"physician":"DR NANTHA KUMERAN                                 ","physician_key":3537,"specialty":"Resident Medical Officer","bedclassname":"SELF-PAY","bedtype":2,"clinickey":4,"nurse":"","price":0,"nursestationcode":1016,"admissionrequested":0,"pat_location":"","location_type":"","investigation_type":"","locationIcon":"assets/images/loc/emergancy.png","locationText":"Emergency","admitted":0,"statusName":null,"icon":"/images/null","color":null,"location":null,"rotation":0,"bedAlerts":[{"sys_key":1,"patient_id":"101267441","alert_name":"High Temprature","add_or_remove":"Add","status":"","alert_type":"bed","tooltip":"High Temprature:37.50 Degrees","icon":"/images/","color":""},{"sys_key":2,"patient_id":"101267441","alert_name":"Systolic Blood Pressure","add_or_remove":"Add","status":"","alert_type":"bed","tooltip":"Systolic Blood Pressure:128.00","icon":"/images/","color":""}]}';
//var jsonStr = JSON.parse(str);
//console.log(jsonStr.sys_key);


//'episode_key:0,iswaitingarea:0,nstationcode:762,nusestationtype:2,pat_birthdate:"1984-06-11T00:00:00",patengname:"ERPATIENT57 ERPATIENT57 ERPATIENT57 ERPATIENT57",patient_id:371773,patient_sex:"1",patlocname:"ERPATIENT57 ERPATIENT57 ERPATIENT57 ERPATIENT57",skey:2061408,staff_id:"ER1",staff_key:623,staff_name:"ER1,                                               ",staff_type:0,start_date:"2017-06-11T00:00:00",start_time:"2017-06-11T13:24:31"'
ko.subscribable.fn.withUpdater = function (handler, target, propname) {
    var self = this;

    var _oldValue;
    this.subscribe(function (oldValue) {
        _oldValue = oldValue;
    }, null, 'beforeChange');

    this.subscribe(function (newValue) {
        handler.call(target, _oldValue, newValue, propname);
    });

    return this;
};
function IsNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

$.ajaxSetup({
    async: true
});

$.extend($.expr[":"], {
    "containsIN": function (elem, i, match, array) {
        return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
    }
});

$.getJSON("BedManagementApiActions/Nursestations/GetServerTime", function (allData) {
    var serverTime = new XDate(allData);
    var localTime = +new XDate();
    var timeDiff = serverTime - localTime;

    setInterval(function () {
        serverTimeProcessed = +new XDate() + timeDiff;
    }, 1000);
});

var ip;
var chat;
/* jQuery.support.cors = true;
$.connection.hub.url = '/bedwhiteboardweb/signalr';
$.connection.hub.logging = true;
var erHub = $.connection.ERHub; */

/* $(function () {
    var erHub = $.connection.eRHub;
    erHub.client.broadcastMessage = function (MessageHeader, MessageBody) {

        console.log('MessageHeader: ' + MessageHeader + '           MessageBody: ' + MessageBody);

    }

    $.connection.hub.start().done(function () {
        console.log('Invocation of ERHub succeeded');
        console.log("Connected, transport = " + $.connection.hub.transport.name);
    }).fail(function (error) {
        console.log('Invocation of ERHub failed. Error: ' + error);
    });
}); */


$.getJSON("BedManagementApiActions/Nursestations/GetIP", function (allData) {
    ip = allData;

});

var mnuWPs = [
    { id: '0', text: 'Transfer to another Emergency Area', iconSrc: 'images/transfare.png', items: subMnuNSs, visible: true },
    // add by khalifa
    { id: '0', text: 'Patient_label', iconSrc: 'images/transfare.png' },

    { id: '0', text: '         ___________________________' },
    { id: '0', text: 'Move to Holding bay', iconSrc: 'images/moveto.png' },
    { id: '-8', text: 'Move to Bed', iconSrc: 'images/transfare.png' },
];

var mnuWPsToTriaged;
//console.log(ER_EnableFastTriage);
if (ER_EnableFastTriage != 1) {
    mnuWPsToTriaged = [
        { id: '0', text: 'Triage Patient Assessment', iconSrc: 'images/list_accept.png' },
        { id: '0', text: 'Cancel Registration (Triage Out)', iconSrc: 'images/Discharge-Order.png' },
        // add by khalifa
        { id: '0', text: 'Patient_label', iconSrc: 'images/transfare.png' },

        { id: '-8', text: 'Move to Bed', iconSrc: 'images/transfare.png' },
    ];
}
else {
    mnuWPsToTriaged = [
        { id: '0', text: 'Triage Patient Assessment', iconSrc: 'images/list_accept.png' },
        { id: '0', text: 'Cancel Registration  (Triage Out)', iconSrc: 'images/Discharge-Order.png' },
        { id: '0', text: 'Patient_label', iconSrc: 'images/transfare.png' },

        //{ id: '0', text: 'Cancel Registration', iconSrc: 'images/list_accept.png' },
        { id: '0', text: '         ___________________________' },
        { id: '0', text: 'Fast Triage & Move to Holding bay', iconSrc: 'images/moveto.png' },
        { id: '-9', text: 'Fast Triag & Move to Bed', iconSrc: 'images/transfare.png' },
    ];
}

var mnuTrtmsOnBed = [
    { id: '0', text: 'Patient Medical Record', iconSrc: 'images/Patient-Medical-Record.png' },
    { id: '0', text: 'Request for Admission', iconSrc: 'images/Request-for-Admission.png', visible: true },
    { id: '0', text: 'Cancel admission request', iconSrc: 'images/Request-for-Admission.png', visible: false },
    { id: '0', text: 'Discharge Order', iconSrc: 'images/Discharge-Order.png' },
    { id: '0', text: 'Reassign Doctor', iconSrc: 'images/reassign.png' },
    { id: '0', text: 'Transfer to another Emergency Area', iconSrc: 'images/transfare.png', items: subMnuNSs, visible: true },
    { id: '0', text: '         ___________________________' },
    { id: '0', text: 'Move to Holding bay', iconSrc: 'images/moveto.png' },
    { id: '-8', text: 'Move to Bed', iconSrc: 'images/transfare.png' },


];

var mnuTrtmsNotOnBed = [
    { id: '0', text: 'Patient Medical Record', iconSrc: 'images/Patient-Medical-Record.png' },
    { id: '0', text: 'Request for Admission', iconSrc: 'images/Request-for-Admission.png', visible: true },
    { id: '0', text: 'Cancel admission request', iconSrc: 'images/Request-for-Admission.png', visible: false },
    { id: '0', text: 'Discharge Order', iconSrc: 'images/Discharge-Order.png' },
    { id: '0', text: 'Reassign Doctor', iconSrc: 'images/reassign.png' },
    { id: '0', text: 'Transfer to another Emergency Area', iconSrc: 'images/transfare.png', items: subMnuNSs, visible: true },
    { id: '0', text: '         ___________________________' },
    { id: '-8', text: 'Move to Bed', iconSrc: 'images/transfare.png' },
];


var mnuWPsItemClicked = function (e) {


    var pId = selectedWP.patient_id();
    var ek = selectedWP.episode_key();
    var sKey = selectedWP.skey();
    var pName = selectedWP.patengname();

    if (e.itemData.id == "0") {

        var bedKey;
        ko.utils.arrayForEach(vm.nursestations(), function (ns) {
            if (ns.sys_key() == openedNS) {
                ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                    ko.utils.arrayForEach(room.beds(), function (bed) {
                        if (bed != undefined) {
                            bedKey = bed.sys_key();
                            return false;
                        }
                    });
                    return false;
                });
                return false;
            }
        });
        BedClicked = bedKey;

        moveInfo = "WPtoHP";
        //console.log(bedKey);
        $("#docsearch").val("");


        $("#doctorsList tbody").empty();
        $.each(jsonErDoctors, function (indexR, valueR) {
            //console.log(jsonErDoctors[indexR]);
            $("#doctorsList tbody").append("<tr data-dismiss='modal' style='cursor:pointer;' bedKey='" + bedKey + "' sKey='" + sKey + "' patientId='" + pId + "' episodeKey='" + ek + "' onclick='selectDoctor(this,\"" + jsonErDoctors[indexR].doctor_id + "," + jsonErDoctors[indexR].doctor_name + "\");'>" + "<td>" + jsonErDoctors[indexR].doctor_name + "</td>" + "</tr>");
        })

        if (e.itemData.text.startsWith("Move")) {//added by sheno

            $("#diagDoctors").modal('show');
        }

        if (e.itemData.text.startsWith("Triage")) {
            var jsonWp = ko.toJSON(selectedWP);
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: "BedManagementApiActions/WaitingPatients/PatientDblClick?uId=" + uId + "&hospId=" + hospitalid,
                data: JSON.stringify(jsonWp),
                success: function (data) {
                    url = data;

                    $('#framTriageSheet').attr("src", "");
                    $('#framTriageSheet').attr("src", url);
                    $('#diagTriageSheet').modal('show');
                    return;

                },
                error: function (error) {
                    console.log('An error has occurred while processing rule: ' + error.responseText);
                    return;
                }
            });

        }
        else if (e.itemData.text.startsWith("Code Blue")) {
            if (typeof window.top.CodeBlueNotification == "function") {
                window.top.CodeBlueNotification(pId, ek);
            }
            else {
                window.CodeBlueNotification(pId, ek);
            }
        }
        else if (e.itemData.text.startsWith("Patient Medical")) {
            if (fromWindows == 1) {
                url = ip + "site-medicaweb/emr.aspx|FreeEMRCaller.exe|" + pId + "," + ek + "," + uId + ",0,0,0";
                window.location.href = url;
            }
            else {
                try {
                    var dynaID;
                    $.getJSON("../BedWhiteBoardWeb/BedManagementApiActions/Emergency/GetEMROrDyna?hospitalID=" + hospitalid, function (data) {
                        dynaID = JSON.parse(data);

                        childwindowEMR = window.parent.General_AddNewTabwon(pId, pId + ' ' + pName, ek, 0, 100, 'E', (dynaID === "" || dynaID === undefined ? 0 : dynaID))

                    });

                    setTimeout(function () {
                        $(e.itemElement).parent().hide();
                    }, 2000);


                }
                catch (err) { }
            }

            $.getJSON("BedManagementApiActions/WaitingPatients/OpenEMR?pId=" + pId + "&ek=" + ek + "&uId=" + uId + "&seen=" + (seen == "" || seen == undefined ? 0 : 1), function (allData) {

            });

            selectedBed.seenbyerdoctor_time(new Date());
        }
        else if (e.itemData.text.startsWith("Patient_label")) {
            var url = '/ChartTrackingAPI/API/ChartTrackingWorkListMRRequest/ChartTracking_print'
            var Reportname = 'PID_MPI.rpt'
            var allformula = "{GENERAL_COD.main_cod}= 102 and {GENERAL_COD.sub_cod} = {Patient.pat_nat} and {Gender_Table.main_cod} = -1000 and {Gender_Table.sub_cod} = " + Psex + "and  {Patient.Patient_id}='" + pId + "'"
            var txt = JSON.stringify({ ReportName: Reportname, Formula: allformula });
            var title = 'Patient Card'
            title = pId + "  " + title
            console.log(txt)
            $("#loader-wrapper").fadeIn("slow", function () {
                $("#loader-wrapper").show();
            });
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url: url,
                data: txt,
                processData: true,
                dataType: "json"
                , success: function (output) {
                    window.top.PublicGeneralPrint(Reportname, output, title);
                    //Hideloading();
                },
                error: function (output) {
                    console.log(output);
                    // Hideloading();
                }
            });
            $("#loader-wrapper").fadeIn("slow", function () {
                $("#loader-wrapper").hide();
            });
        }



    }

    else {

        if (e.itemData.text.startsWith("Move")) {
            moveInfo = "WPtoBed";
            if (NoRoster == 1) {
                $("#diagDoctors").modal("hide");
                MoveToBed(uId, e.itemData.id, sKey, pId, ek);
                return;
            }
            $("#docsearch").val("");

            $("#doctorsList tbody").empty();
            $.each(jsonErDoctors, function (indexR, valueR) {
                //console.log(jsonErDoctors[indexR]);
                $("#doctorsList tbody").append("<tr data-dismiss='modal' style='cursor:pointer;' bedKey='" + e.itemData.id + "' sKey='" + sKey + "' patientId='" + pId + "' episodeKey='" + ek + "' onclick='selectDoctor(this,\"" + jsonErDoctors[indexR].doctor_id + "," + jsonErDoctors[indexR].doctor_name + "\");'>" + "<td>" + jsonErDoctors[indexR].doctor_name + "</td>" + "</tr>");
            })
        }
        else {
            $("#loader-wrapper").fadeIn("slow", function () {
                $("#loader-wrapper").show();
            });
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: "BedManagementApiActions/WaitingPatients/TransferWPtoWP?NS_id=" + e.itemData.id + "&pId=" + pId + "&sKey=" + sKey + "&ek=" + ek + "&hospId=" + hospitalid,
                success: function (data) {
                    //console.log(data);
                    var updatedWP = data;

                    DevExpress.ui.notify("Patient transfered successfully.", "success", 1500);

                    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                        if (ns.sys_key() == openedNS) {
                            ko.utils.arrayForEach(ns.waitingPatients(), function (Wp) {
                                if (Wp != undefined) {
                                    if (Wp.patient_id() == pId) {
                                        ns.waitingPatients.remove(Wp);
                                        return false;
                                    }
                                }
                            });
                        }
                        else if (ns.sys_key() == e.itemData.id) {

                            var addWP = new WaitingPatient(updatedWP);
                            ns.waitingPatients.push(addWP);

                            $('#try_exta' + ns.sys_key() + ' .cnxMnuWp').each(function () {
                                //console.log(mnuWPs);
                                $(this).dxContextMenu({
                                    items: mnuWPs,
                                    target: $(this).next(),
                                    itemClickAction: mnuWPsItemClicked,
                                    //invokeOnlyFromCode: true,
                                });

                            });

                            $('#try_exta' + ns.sys_key() + ' .cnxMnuWpToTriage').each(function () {
                                //console.log(mnuWPs);
                                $(this).dxContextMenu({
                                    items: mnuWPsToTriaged,
                                    target: $(this).next(),
                                    //position: { of: $(this).next() },
                                    //visible: mnuWPsVisible,
                                    itemClickAction: mnuWPsToTriageItemClicked,
                                    //invokeOnlyFromCode: true,
                                });

                            });

                        }
                    });
                },
                error: function (error) {
                    //jsonValue = jQuery.parseJSON(error.responseText);
                    console.log(error.responseText);
                }
            });
            $("#loader-wrapper").fadeIn("slow", function () {
                $("#loader-wrapper").hide();
            });
        }

    }

};

var mnuWPsToTriageItemClicked = function (e) {

    var pId = selectedWP.patient_id();
    var ek = selectedWP.episode_key();
    var sKey = selectedWP.skey();
    var Psex = selectedWP.patient_sex()


    //console.log(e.itemData);
    //console.log(selectedWP);
    if (e.itemData.id == "0") {
        if (selectedWP.emr_status() == "0" || selectedWP.emr_status() == "10" || selectedWP.emr_status() == null) {
            if (e.itemData.text.startsWith("Triage")) {
                var jsonWp = ko.toJSON(selectedWP);
                //console.log(jsonWp);


                if (fromWindows != 1) {
                    $("#loader-wrapper").fadeIn("slow", function () {
                        $("#loader-wrapper").show();
                    });
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        url: "BedManagementApiActions/WaitingPatients/PatientDblClick?uId=" + uId + "&hospId=" + hospitalid,
                        data: JSON.stringify(jsonWp),
                        success: function (data) {
                            //console.log(data);
                            url = data;


                            $('#framTriageSheet').attr("src", "");
                            $('#framTriageSheet').attr("src", url);
                            $('#diagTriageSheet').modal('show');




                        },
                        error: function (error) {
                            //jsonValue = jQuery.parseJSON(error.responseText);
                            console.log(error);
                            console.log('An error has occurred while processing rule: ' + error.responseText);
                        }
                    });
                    $("#loader-wrapper").fadeIn("slow", function () {
                        $("#loader-wrapper").hide();
                    });
                }
                else {
                    $("#loader-wrapper").fadeIn("slow", function () {
                        $("#loader-wrapper").show();
                    });

                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        url: "BedManagementApiActions/WaitingPatients/PatientDblClickWindows?uId=" + uId + "&hospId=" + hospitalid,
                        data: JSON.stringify(jsonWp),
                        success: function (data) {

                            var ret = data.split(',');
                            //url = ip + "site-medicaweb/sheet.aspx|sheetloader.exe|SheetKey~" + ret[0] + "|ReadOnly~0|AllowDefinition~0|*OrderKey~" + ret[1] + "*|PatientID~" + selectedWP.patient_id() + "*|EpisodeKey~-1*|NetPath~*" + ret[2] + "|*UserKey~" + uId + "*|PatName~" + selectedWP.patengname();

                            var path = ret[2];
                            if (ret[2].indexOf(/\\\\/g) > -1)
                                path = ret[2].replace(/\\\\/g, '\\');

                            if (ret[2].indexOf('\\\\') > -1)
                                path = ret[2].replace(/\\\\\\/, '\\');

                            if (ret[2].indexOf('////') > -1)
                                path = ret[2].replace(/\/\//g, '\/');

                            url = ip + "site-medicaweb/sheet.aspx|SheetLoader.exe|SheetKey~" + ret[0] + "|ReadOnly~0|AllowDefinition~0|OrderKey~" + ret[1] + "|PatientID~" + selectedWP.patient_id() + "|EpisodeKey~-1|NetPath~" + path + "|UserKey~" + uId + "|PatName~" + selectedWP.patengname();

                            //url = ip + "site-medicaweb/AdmissionRequest.aspx";

                            window.location.href = url;

                        },
                        error: function (error) {
                            //jsonValue = jQuery.parseJSON(error.responseText);
                            console.log(error);
                            console.log('An error has occurred while processing rule: ' + error.responseText);
                        }
                    });
                    $("#loader-wrapper").fadeIn("slow", function () {
                        $("#loader-wrapper").hide();
                    });
                }
            }
            else if (e.itemData.text.startsWith("Code Blue")) {
                if (typeof window.top.CodeBlueNotification == "function") {
                    window.top.CodeBlueNotification(pId, ek);
                }
                else {
                    window.CodeBlueNotification(pId, ek);
                }
            }
            else if (e.itemData.text.startsWith("Patient Medical")) {
                if (fromWindows == 1) {
                    url = ip + "site-medicaweb/emr.aspx|FreeEMRCaller.exe|" + pId + "," + ek + "," + uId + ",0,0,0";
                    window.location.href = url;
                }
                else {
                    try {
                        var dynaID;
                        $.getJSON("../BedWhiteBoardWeb/BedManagementApiActions/Emergency/GetEMROrDyna?hospitalID=" + hospitalid, function (data) {
                            dynaID = JSON.parse(data);

                            childwindowEMR = window.parent.General_AddNewTabwon(pId, pId + ' ' + pName, ek, 0, 100, 'E', (dynaID === "" || dynaID === undefined ? 0 : dynaID))

                        });

                        setTimeout(function () {
                            $(e.itemElement).parent().hide();
                        }, 2000);


                    }
                    catch (err) { }
                }

                $.getJSON("BedManagementApiActions/WaitingPatients/OpenEMR?pId=" + pId + "&ek=" + ek + "&uId=" + uId + "&seen=" + (seen == "" || seen == undefined ? 0 : 1), function (allData) {

                });

                selectedBed.seenbyerdoctor_time(new Date());
            }
            // add by khalifa
            else if (e.itemData.text.startsWith("Patient_label")) {
                $("#loader-wrapper").show('slow');

                var url = "/ChartTrackingAPI/API/ChartTrackingWorkListMRRequest/ChartTracking_print{GENERAL_COD.main_cod}=102and{GENERAL_COD.sub_cod}={Patient.pat_nat}and{Gender_Table.main_cod}=-1000and{Gender_Table.sub_cod}=" + Psex + "and{Patient.Patient_id}='" + pId + "'" + "&DBCode=" + dbcode + "&HospitalID=" + hospitalid;
                var Reportname = 'PID_MPI.rpt'
                var allformula = "{GENERAL_COD.main_cod}= 102 and {GENERAL_COD.sub_cod} = {Patient.pat_nat} and {Gender_Table.main_cod} = -1000 and {Gender_Table.sub_cod} = " + Psex + "and  {Patient.Patient_id}='" + pId + "'"
                var txt = JSON.stringify({ ReportName: Reportname, Formula: allformula });
                var title = 'Patient Card'
                title = pId + "  " + title
                console.log(txt)
                console.log(url)
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    url: url,
                    data: txt,
                    processData: true,
                    dataType: "json"
                    , success: function (output) {
                        window.top.PublicGeneralPrint(Reportname, output, title);
                        //Hideloading();
                    },
                    error: function (output) {
                        console.log(output);
                        // Hideloading();
                    }
                });


                console.log('khaloasd');
            }
            else if (e.itemData.text.startsWith("Cancel")) {
                $('#diagCancelReg').modal('show');
                setTimeout(function () {
                    $("#framCancelReg").attr('src', '/EmergencyWEB/CancelBokingWB.html?userkey=' + uId + '&hospitalid=' + hospitalid + '&lang=0&pid=' + pId +
                        '&pname=' + selectedWP.patengname() + '&skey=' + sKey)
                }, 300);
            }
            else if (e.itemData.text.startsWith("Fast")) {



                // var bedKey
                //ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                //    if (ns.sys_key() == openedNS) {
                //        ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                //            ko.utils.arrayForEach(room.beds(), function (bed) {
                //                if (bed != undefined) {
                //                    bedKey = bed.sys_key();
                //                    return false;
                //                }
                //            });
                //            return false;
                //        });
                //        return false;
                //    }
                //});
                //BedClicked=bedKey;

                // edit khalifa
                // alert('holding Bay');


                var bedKey;
                vm.nursestations().forEach(myfun)
                function myfun(item, index, arr) {

                    if (item.sys_key() == openedNS) {
                        if (item.roomsAndBeds()[0].beds()[0].sys_key() != undefined) {
                            bedKey = item.roomsAndBeds()[0].beds()[0].sys_key()
                        } else {
                            bedKey = item.roomsAndBeds()[1].beds()[0].sys_key()
                        }
                    }



                }


                $("#diagTriagePriority tbody").empty();

                //console.log(triageLevels);
                $.each(triageLevels, function (indexR, valueR) {
                    //console.log(triageLevels[indexR]);
                    $("#triagePriorityList tbody").append("<tr data-dismiss='modal' style='cursor:pointer;' bedKey='wa" + bedKey + "' sKey='" + sKey + "' patientId='" + pId + "' episodeKey='" + ek + "' onclick='selectTriagePriority( this,\"" + triageLevels[indexR].sub_cod + "," + triageLevels[indexR].latin_desc + "\");'>" + "<td data-toggle='modal' data-target='#diagDoctors' >   <div style='float: left;'>" + triageLevels[indexR].latin_desc + "</div><div class='triage1' style='float: right; background-color:" + GetColorByStatus(triageLevels[indexR].sub_cod) + ";' >" + triageLevels[indexR].sub_cod + "</div></td>" + "</tr>");
                })
            }


        }
    }
    else {
        if (e.itemData.text.startsWith("Fast")) {
            //  alert("fast Bed");
            $("#diagTriagePriority tbody").empty();

            //console.log(dischareStatus);
            $.each(triageLevels, function (indexR, valueR) {
                //console.log(dischareStatus[indexR]);
                $("#triagePriorityList tbody").append("<tr data-dismiss='modal' style='cursor:pointer;' bedKey='" + e.itemData.id + "' sKey='" + sKey + "' patientId='" + pId + "' episodeKey='" + ek + "' onclick='selectTriagePriority( this,\"" + triageLevels[indexR].sub_cod + "," + triageLevels[indexR].latin_desc + "\");'>" + "<td data-toggle='modal' data-target='#diagDoctors' >   <div style='float: left;'>" + triageLevels[indexR].latin_desc + "</div><div class='triage1' style='float: right; background-color:" + GetColorByStatus(triageLevels[indexR].sub_cod) + ";' >" + triageLevels[indexR].sub_cod + "</div></td>" + "</tr>");
            })


        }
    }

};

var mnuTrtmsOnBedItemClicked = function (e) {
    var frombk = selectedBed.sys_key();
    var pId = selectedBed.patient_id();
    var ek = selectedBed.episodekey();
    var sKey = selectedBed.clinickey();
    var pName = selectedBed.patengname();
    var docId = selectedBed.physician_key();
    var seen = selectedBed.seenbyerdoctor_time();
    var bk = e.itemData.id;

    // add by khalifa
    var uId = getParameterByName("StaffKey");


    selectedWP = selectedBed;

    if (e.itemData.id === "-999") {
        //open webmedicaltemp
        //Ahmed Saleh

        var url = "/WebMedicalTemplates/MedicalTemplate.html?PatId=" + pId + "&EpsKey=" + ek +
            "&UserID=" + uId + "&lang=" + lang + "&hospitalid=" + hospitalid + "&orderkey=" + ek + "&tempkey=" + e.itemData.mykey + "&dbcode=" + dbcode;
        $('#framShowDoc').attr("src", "");
        $('#framShowDoc').attr("src", url);
        $('#diagShowDoc').modal('show');

        return;
    }
    if (e.itemData.id != "0") {
        if (e.itemData.text.startsWith("Move")) {

            moveInfo = "MoveBedtoBed";
            return;
            $("#loader-wrapper").fadeIn("slow", function () {
                $("#loader-wrapper").show();
            });
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: "BedManagementApiActions/WaitingPatients/MoveBedtoBed?pId=" + pId + "&ek=" + ek + "&bk=" + BedSelected,
                success: function (data) {
                    //console.log(data);
                    url = data;
                    if (data == "") {
                        DevExpress.ui.notify("There is a patient on this bed.", "warning", 1500);
                        $("#RefreshPats").click();
                        $('#refreshid').click();
                        return;
                    }

                    DevExpress.ui.notify("Patient moved successfully.", "success", 1500);

                    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                        if (ns.sys_key() == openedNS) {

                            var fromBed = null;
                            ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {

                                //console.log(frombk, bk, pId);
                                ko.utils.arrayForEach(room.beds(), function (bed) {
                                    if (bed.sys_key() == frombk && bed.patient_id() == pId) {
                                        fromBed = ko.toJSON(bed);

                                        bed.sex('free');
                                        bed.pSex('');
                                        bed.patient_id(0);
                                        bed.patient_sex('');
                                        bed.patengname('');
                                        // add by khalifa  ageicon      bed.Chief_Complaint('');
                                        self.ageIcon('')
                                        bed.Chief_Complaint('');

                                        bed.patlocname('');
                                        bed.status('');
                                        bed.pat_bithdate('');
                                        bed.age('');
                                        bed.start_date('');
                                        bed.systime('');
                                        bed.emr_status_time('');
                                        bed.emr_status('0');
                                        bed.emr_status_color('lightgray');
                                        bed.episodekey('');
                                        bed.physician('');
                                        bed.physician_key('');
                                        bed.specialty('');
                                        bed.bedtype('');
                                        bed.clinickey('');
                                        bed.nurse('');
                                        bed.statusName('');
                                        bed.icon('');
                                        bed.color('');
                                        bed.location('');
                                        bed.admissionrequested('');
                                        bed.pat_location('');
                                        bed.location_type('');
                                        bed.investigation_type('');
                                        bed.admitted('');
                                        bed.locationIcon('');
                                        bed.locationText('');
                                        bed.bedAlerts([]);

                                        return false;
                                    }

                                });

                            });

                            ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {

                                ko.utils.arrayForEach(room.beds(), function (bed) {

                                    //debugger;
                                    if (bed.sys_key() == bk) {
                                        var jsonFromBed = null;
                                        console.log(fromBed);
                                        if (typeof fromBed != 'object') {
                                            //console.log(fromBed);
                                            jsonFromBed = JSON.parse(fromBed);
                                            //console.log(jsonFromBed);
                                        }
                                        else
                                            jsonFromBed = fromBed;

                                        //console.log(jsonFromBed);
                                        //console.log(' To Bed : ' + jsonFromBed.sex);

                                        if (jsonFromBed != null) {
                                            //Fill toBed
                                            bed.sex(jsonFromBed.sex);
                                            bed.pSex(jsonFromBed.pSex);
                                            bed.patient_id(jsonFromBed.patient_id);
                                            bed.patient_sex(jsonFromBed.patient_sex);
                                            bed.patengname(jsonFromBed.patengname);
                                            // add by khalifa ageicon Chief_Complaint;
                                            bed.Chief_Complaint(jsonFromBed.Chief_Complaint)
                                            bed.ageIcon(jsonFromBed.ageIcon)
                                            bed.patlocname(jsonFromBed.patlocname);
                                            bed.status(jsonFromBed.status);
                                            bed.pat_bithdate(jsonFromBed.pat_bithdate);
                                            bed.age(jsonFromBed.age);
                                            bed.start_date(jsonFromBed.start_date);
                                            bed.systime(jsonFromBed.systime);
                                            bed.emr_status_time(jsonFromBed.emr_status_time);
                                            bed.emr_status(jsonFromBed.emr_status);
                                            bed.emr_status_color(jsonFromBed.emr_status_color);
                                            bed.iswaitingarea(jsonFromBed.iswaitingarea);
                                            bed.episodekey(jsonFromBed.episodekey);
                                            bed.physician(jsonFromBed.physician);
                                            bed.physician_key(jsonFromBed.physician_key);
                                            bed.specialty(jsonFromBed.specialty);
                                            bed.bedtype(jsonFromBed.bedtype);
                                            bed.clinickey(jsonFromBed.clinickey);
                                            bed.nurse(jsonFromBed.nurse);
                                            bed.statusName(jsonFromBed.statusName);
                                            bed.icon(jsonFromBed.icon);
                                            bed.color(jsonFromBed.color);
                                            bed.location(jsonFromBed.location);
                                            bed.admissionrequested(jsonFromBed.admissionrequested);
                                            bed.pat_location(jsonFromBed.pat_location);
                                            bed.location_type(jsonFromBed.location_type);
                                            bed.investigation_type(jsonFromBed.investigation_type);
                                            bed.admitted(jsonFromBed.admitted);
                                            bed.locationIcon(jsonFromBed.locationIcon);
                                            bed.locationText(jsonFromBed.locationText);
                                            bed.bedAlerts(jsonFromBed.bedAlerts);
                                        }
                                        return false;
                                    }

                                });

                            });

                            UpdateMnuWps(ns);
                            $("#refreshid").click();


                        }
                    });

                    $("#loader-wrapper").show();
                    setTimeout(function () {
                        alert('hh');
                        $("#loader-wrapper").hide();
                    }, 2000);
                },
                error: function (error) {
                    //jsonValue = jQuery.parseJSON(error.responseText);
                    console.log(error.responseText);
                }
            });
            $("#loader-wrapper").fadeIn("slow", function () {
                $("#loader-wrapper").hide();
            });
        }
        else {
            //console.log(e.itemData.id);
            $("#loader-wrapper").fadeIn("slow", function () {
                $("#loader-wrapper").show();
            });
            $.getJSON("BedManagementApiActions/WaitingPatients/CheckMaximumCapacity?uId=" + uId + "&Ns=" + e.itemData.id, function (allData) {
                if (allData == 0) {
                    DevExpress.ui.notify("Area reached Maximum Capacity.", "warning", 1500);
                    return;
                }
                else {
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        url: "BedManagementApiActions/WaitingPatients/TransferTrttoHP?NS_id=" + e.itemData.id + "&pId=" + pId + "&ek=" + ek + "&sKey=" + sKey + "&uId=" + uId,
                        success: function (data) {
                            //console.log(data);
                            var updatedBed = data;

                            DevExpress.ui.notify("Patient transfered successfully.", "success", 1500);

                            ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                                if (ns.sys_key() == openedNS) {
                                    ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                                        ko.utils.arrayForEach(room.beds(), function (bed) {
                                            //console.log(bed.sys_key());
                                            if (bed.patient_id() == pId) {

                                                //room.allBeds.remove(bed);
                                                // Empty the fromBed
                                                bed.sex('free');
                                                bed.pSex('');
                                                bed.patient_id(0);
                                                bed.patient_sex('');
                                                bed.patengname('');
                                                // add by khalifa Chief_Complaint;
                                                bed.Chief_Complaint('');
                                                bed.ageIcon('');

                                                bed.patlocname('');
                                                bed.status('');
                                                bed.pat_bithdate('');
                                                bed.age('');
                                                bed.start_date('');
                                                bed.systime('');
                                                bed.emr_status_time('');
                                                bed.emr_status('0');
                                                bed.emr_status_color('lightgray');
                                                bed.episodekey('');
                                                bed.physician('');
                                                bed.physician_key('');
                                                bed.specialty('');
                                                bed.bedtype('');
                                                bed.clinickey('');
                                                bed.nurse('');
                                                bed.statusName('');
                                                bed.icon('');
                                                bed.color('');
                                                bed.location('');
                                                bed.admissionrequested('');
                                                bed.pat_location('');
                                                bed.location_type('');
                                                bed.investigation_type('');
                                                bed.admitted('');
                                                bed.locationIcon('');
                                                bed.locationText('');
                                                bed.bedAlerts([]);

                                                return false;
                                            }
                                        });

                                        UpdateMnuWps(ns);


                                    });
                                }
                                else if (ns.sys_key() == e.itemData.id) {

                                    ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                                        if (updatedBed.parent_key == room.room_key()) {
                                            //console.log(jsonBed);
                                            var addBed = new RoomBeds(updatedBed);
                                            room.allBeds.push(addBed);
                                            return false;
                                        }
                                    });

                                    UpdateMnuWps(ns);


                                }
                            });
                        },
                        error: function (error) {
                            //jsonValue = jQuery.parseJSON(error.responseText);
                            console.log(error.responseText);
                        }
                    });
                }
            })

         
            $("#loader-wrapper").fadeIn("slow", function () {
                $("#loader-wrapper").hide();
            });
        }

    }
    else if (e.itemData.text.startsWith("View")) {
        var url = "/ERLogViewer/index.html?EKEY=" + ek;
        $('#framLog').attr("src", "");
        $('#framLog').attr("src", url);
        $('#logviewer').modal('show');
    }
    else if (e.itemData.text.startsWith("Code Blue")) {
        if (typeof window.top.CodeBlueNotification == "function") {
            window.top.CodeBlueNotification(pId, ek);
        }
        else {
            window.CodeBlueNotification(pId, ek);
        }
        setTimeout(function () {
            $.ajax({
                timeout: 30000,
                url: "BedManagementApiActions/WaitingPatients/GetInitialReceive?CategoryName=ER ALERTS",
                success: function (objBedsAlerts) {
                    console.log("GetInitialReceive");
                    var bed = selectedBed;
                    if ($.isEmptyObject(objBedsAlerts) == false) {
                        $.each(objBedsAlerts, function (indexR, valueR) {
                            var isUpper;
                            if (objBedsAlerts[indexR].patient_id == undefined)
                                isUpper = true;
                            else
                                isUpper = false;

                            if (isUpper == false) {

                                if (objBedsAlerts[indexR] != undefined) {
                                    if (bed.patient_id() == objBedsAlerts[indexR].patient_id) {
                                        if (objBedsAlerts[indexR].add_or_remove == "Add") {
                                            var alertExist = false;
                                            ko.utils.arrayForEach(bed.bedAlerts(), function (alertBed) {
                                                if (alertBed.alert_name().toLowerCase().trim() == objBedsAlerts[indexR].alert_name.toLowerCase().trim()) {

                                                    var tooltips = alertBed.tooltip().toLowerCase().split('\n');

                                                    var tooltipExists = false;
                                                    for (i = 0; i < tooltips.length; i++) {
                                                        if (tooltips[i].toLowerCase() == objBedsAlerts[indexR].tooltip.toLowerCase()) {
                                                            tooltipExists = true;
                                                            break;
                                                        }
                                                    }

                                                    if (tooltipExists == false)
                                                        alertBed.tooltip(alertBed.tooltip() + '\n' + objBedsAlerts[indexR].tooltip);

                                                    alertExist = true;
                                                }
                                            });

                                            if (alertExist == false)
                                                bed.bedAlerts.push(new BedAlerts(objBedsAlerts[indexR]));

                                        }
                                        else {
                                            try {
                                                if (alertBed.alert_name().toLowerCase() == objBedsAlerts[indexR].alert_name.toLowerCase()) {
                                                    bed.bedAlerts.remove(alertBed);
                                                }
                                            }
                                            catch (ex) {
                                            }
                                        }
                                    }
                                    //console.log(bed.bedAlerts());
                                }
                            }
                            else {
                                if (objBedsAlerts[indexR] != undefined) {
                                    //console.log(bed.latin_desc() + '  ||  ' + bed.patient_id() + ' || ' + objBedsAlerts[indexR].PATIENT_ID);
                                    if (bed.patient_id() == objBedsAlerts[indexR].PATIENT_ID) {
                                        //console.log(objBedsAlerts[indexR].PATIENT_ID);
                                        //console.log(objBedsAlerts[indexR].TOOLTIP);
                                        if (objBedsAlerts[indexR].ADD_OR_REMOVE == "Add") {
                                            //console.log(objBedsAlerts[indexR].PATIENT_ID);
                                            //console.log(objBedsAlerts[indexR].TOOLTIP);
                                            var alertExist = false;
                                            ko.utils.arrayForEach(bed.bedAlerts(), function (alertBed) {
                                                //console.log(alertBed.alert_name().toLowerCase().trim() + '         ' + alertBed.tooltip() + '======' + objBedsAlerts[indexR].alert_name.toLowerCase().trim() + '         ' + objBedsAlerts[indexR].tooltip);
                                                if (alertBed.alert_name().toLowerCase().trim() == objBedsAlerts[indexR].ALERT_NAME.toLowerCase().trim()) {

                                                    var tooltips = alertBed.tooltip().toLowerCase().split('\n');

                                                    var tooltipExists = false;
                                                    for (i = 0; i < tooltips.length; i++) {
                                                        //console.log(tooltips[i].toLowerCase() + '      ' + objBedsAlerts[indexR].tooltip.toLowerCase());
                                                        if (tooltips[i].toLowerCase() == objBedsAlerts[indexR].TOOLTIP.toLowerCase()) {
                                                            tooltipExists = true;
                                                            break;
                                                        }
                                                    }

                                                    if (tooltipExists == false)
                                                        alertBed.tooltip(alertBed.tooltip() + '\n' + objBedsAlerts[indexR].TOOLTIP);

                                                    alertExist = true;
                                                }
                                            });

                                            if (alertExist == false)
                                                bed.bedAlerts.push(new BedAlerts(objBedsAlerts[indexR]));

                                        }
                                        else {
                                            try {
                                                if (alertBed.alert_name().toLowerCase() == objBedsAlerts[indexR].ALERT_NAME.toLowerCase()) {
                                                    bed.bedAlerts.remove(alertBed);
                                                }
                                            }
                                            catch (ex) {
                                            }
                                        }

                                    }
                                    //console.log(bed.bedAlerts());
                                }
                            }

                        });
                    }


                },
                global: false,     // this makes sure ajaxStart is not triggered
                dataType: 'json',
            });
        }, 2000);
    }
    else if (e.itemData.text.startsWith("Move")) {

        // move bed to hb
        $("#loader-wrapper").fadeIn("slow", function () {
            $("#loader-wrapper").show();
        });

        $.getJSON("BedManagementApiActions/WaitingPatients/CheckMaximumCapacity?uId=" + uId + "&Ns=" + openedNS, function (allData) {
            if (allData == 0) {
                DevExpress.ui.notify("Area reached Maximum Capacity.", "warning", 1500);
                return;
            }
            else {
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    url: "BedManagementApiActions/WaitingPatients/MoveBedtoHP?pId=" + pId + "&ek=" + ek + "&uId=" + uId,
                    success: function (data) {
                        //console.log(data);
                        url = data;

                        if (data == "") {
                            DevExpress.ui.notify("Unable to move patient to holding bay.", "warning", 1500);

                            return;
                        }

                        DevExpress.ui.notify("Patient moved successfully.", "success", 1500);

                        ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                            if (ns.sys_key() == openedNS) {
                                ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                                    ko.utils.arrayForEach(room.beds(), function (bed) {
                                        //console.log(bed.sys_key());
                                        if (bed.patient_id() == pId) {

                                            $("#bedId" + bed.sys_key() + " .triage").text('0').css("background-color", "lightgray");
                                            bed.iswaitingarea('1');

                                            UpdateMnuWps(ns);

                                            // add by khalifa fix error update beds
                                            $('#try_exta' + openedNS + ' .cnxMnuWp').each(function () {
                                                //console.log(mnuWPs);
                                                $(this).dxContextMenu({
                                                    items: mnuWPs,
                                                    target: $(this).next(),
                                                    //position: { of: $(this).next() },
                                                    //visible: mnuWPsVisible,
                                                    itemClickAction: mnuWPsItemClicked,
                                                    //invokeOnlyFromCode: true,
                                                });

                                            });

                                            $('#try_exta' + openedNS + ' .cnxMnuWpToTriage').each(function () {
                                                //console.log(mnuWPs);
                                                $(this).dxContextMenu({
                                                    items: mnuWPsToTriaged,
                                                    target: $(this).next(),
                                                    //position: { of: $(this).next() },
                                                    //visible: mnuWPsVisible,
                                                    itemClickAction: mnuWPsToTriageItemClicked,
                                                    //invokeOnlyFromCode: true,
                                                });

                                            });

                                            $('#try_extb' + openedNS + ' .cnxMnuTrtOnBed').each(function () {
                                                //console.log(mnuTrtmsOnBed);
                                                $(this).dxContextMenu({
                                                    items: mnuTrtmsOnBed,
                                                    target: $(this).next(),
                                                    //position: { of: $(this).next() },
                                                    //visible: mnuTrtOnBedVisible,
                                                    itemClickAction: mnuTrtmsOnBedItemClicked,
                                                    //invokeOnlyFromCode: true,
                                                });

                                            });

                                            $('#try_extb' + openedNS + ' .cnxMnuTrtNotOnBed').each(function () {
                                                //console.log(mnuTrtmsOnBed);
                                                $(this).dxContextMenu({
                                                    items: mnuTrtmsNotOnBed,
                                                    target: $(this).next(),
                                                    //position: { of: $(this).next() },
                                                    //visible: mnuTrtOnBedVisible,
                                                    itemClickAction: mnuTrtmsNotOnBedItemClicked,
                                                    //invokeOnlyFromCode: true,
                                                });

                                            });


                                            return false;

                                        }
                                    });
                                });
                            }
                        });

                        // add by khalifa to remove free bed added when move to hb
                        document.getElementById("pId").remove();

                        //add by khalifa make signal r move patient from bed to hb Not on Beds
                        // fill object send signal r chat message
                        var Object = {};
                        ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                            if (ns.sys_key() == openedNS) {
                                ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                                    ko.utils.arrayForEach(room.notOnBeds(), function (bed) {
                                        if (bed.patient_id() == pId) {
                                            Object.MessageHeader = "ER NOTONBEDS";
                                            Object.MessageBody = {};
                                            Object.MessageBody.parent_key = bed.parent_key();
                                            Object.MessageBody.sys_key = bed.sys_key();
                                            Object.MessageBody.patient_id = bed.patient_id();
                                            Object.MessageBody.latin_desc = bed.latin_desc();
                                            Object.MessageBody.patient_sex = bed.patient_sex();
                                            Object.MessageBody.patengname = bed.patengname();
                                            Object.MessageBody.Chief_Complaint = bed.Chief_Complaint();
                                            Object.MessageBody.ageIcon = bed.ageIcon();
                                            Object.MessageBody.patlocname = bed.patlocname();
                                            Object.MessageBody.status = bed.status();
                                            Object.MessageBody.pat_bithdate = bed.pat_bithdate();
                                            Object.MessageBody.start_date = bed.start_date();
                                            Object.MessageBody.systime = bed.systime();
                                            Object.MessageBody.emr_status_time = bed.emr_status_time();
                                            Object.MessageBody.emr_status = bed.emr_status();
                                            Object.MessageBody.iswaitingarea = bed.iswaitingarea();
                                            Object.MessageBody.episodekey = bed.episodekey();
                                            Object.MessageBody.physician = bed.physician();
                                            Object.MessageBody.physician_key = bed.physician_key();
                                            Object.MessageBody.specialty = bed.specialty();
                                            Object.MessageBody.bedtype = bed.bedtype();
                                            Object.MessageBody.clinickey = bed.clinickey();
                                            Object.MessageBody.nurse = bed.nurse();
                                            Object.MessageBody.nursestationcode = bed.nursestationcode();
                                            Object.MessageBody.icon = bed.icon();
                                            Object.MessageBody.color = bed.color();
                                            Object.MessageBody.location = bed.location();
                                        }
                                    })
                                })
                            }
                        })
                        try {
                            console.log("object body before Sent");
                            console.log(Object.MessageBody)
                            /*   $("#loader-wrapper").fadeIn("slow", function () {
                                   $("#loader-wrapper").show();
                               });*/
                            ChatMessage("tomodule", "bedwhiteboardweb/erwhiteboard.html", JSON.stringify(Object));
                            /*    $("#loader-wrapper").fadeIn("slow", function () {
                                    $("#loader-wrapper").hide();
                                });*/
                        }
                        catch (e) {
                            console.log(e)
                        }

                    },
                    error: function (error) {
                        //jsonValue = jQuery.parseJSON(error.responseText);
                        console.log(error.responseText);
                    }
                });
            }
        })

      

        $("#loader-wrapper").fadeIn("slow", function () {
            //setTimeout(function () {
            $("#loader-wrapper").hide();
            //}, 2000)
        });
    }
    else if (e.itemData.text.startsWith("Discharge")) {
        //var obsRow = ko.dataFor(this);
        //console.log(obsRow);

        // add by khalifa if don't input date
        $.getJSON("BedManagementApiActions/WaitingPatients/CheckDischageIfDischargeOrNot?ek=" + ek, function (status) {
            if (status == 0) {
                DevExpress.ui.notify("Patient Already Discharged.", "warning", 1500);
                return;
            } else {
                $.getJSON("BedManagementApiActions/WaitingPatients/CheckDischarge?episodkey=" + ek, function (allData) {

                    var disstatus = 0;
                    disstatus = allData;
                    if (allData == 0) {
                        $.getJSON("BedManagementApiActions/WaitingPatients/GetDischareStatus?hospid=" + hospitalid, function (allData) {
                            dischareStatus = allData;

                            $("#statusList tbody").empty();

                            //console.log(dischareStatus);
                            $.each(dischareStatus, function (indexR, valueR) {
                                //console.log(dischareStatus[indexR]);
                                $("#statusList tbody").append("<tr data-dismiss='modal' style='cursor:pointer;' episodeKey='" + ek + "' sKey='" + sKey
                                    + "' pId='" + pId + "' onclick='selectStatus(this,\"" + dischareStatus[indexR].status_id +
                                    "," + dischareStatus[indexR].status_name + "," + dischareStatus[indexR].doc_code + "\");'>"
                                    + "<td>" + dischareStatus[indexR].status_name + "</td>" + "</tr>");
                            })



                        });

                    }
                    else {
                        $.getJSON("BedManagementApiActions/WaitingPatients/GetDischareStatus?hospid=" + hospitalid, function (allData) {
                            dischareStatus = allData;


                            if (ShowDischargeDocument == 0) {
                                _selectStatus(selectedelm, selectedargs);
                                return;
                            }
                            $.each(dischareStatus, function (indexR, valueR) {
                                if (dischareStatus[indexR].status_id == disstatus) {

                                    var url = "/WebMedicalTemplates/MedicalTemplate.html?PatId=" + pId + "&EpsKey=" + ek +
                                        "&UserID=" + uId + "&lang=" + lang + "&hospitalid=" + hospitalid + "&orderkey=" + ek + "&tempkey=" + dischareStatus[indexR].doc_code + "&dbcode=" + dbcode;
                                    $('#framShowDoc').attr("src", "");
                                    $('#framShowDoc').attr("src", url);
                                    $('#diagShowDoc').modal('show');
                                    return;
                                }
                            })




                        });


                    }

                });

            }
        })


     

    }
    else if (e.itemData.text.startsWith("Request")) {
        if (fromWindows == 1) {
            url = ip + "site-medicaweb/AdmissionRequest.aspx|AdmissionRequest.exe|" + uKey + ",0,0,IsEr~1|PatientID~" + pId + "|BookingNum~" + sKey + "|DocID~" + docId;
            window.location.href = url;
        }
        else {
            url = "../AdmissionRequestUI/AdmissionRequest.html?lang=" + lang + "&hospitalid=" + hospitalid + "&userkey=" + uId +
                "&bookingkey=" + sKey + "&iser=1&docid=" + docId + "&patientid=" + pId + "&isedit=0&regsnumber=0" +
                "&IsEr=1&Episode_Key=" + ek + "&dbcode=" + dbcode;



            $('#framRequestAdmission').attr("src", "");
            $('#framRequestAdmission').attr("src", url);
            $('#diagRequestAdmission').modal('show');
        }
    }
    else if (e.itemData.text.startsWith("Cancel")) {
        $.getJSON("BedManagementApiActions/Nursestations/CancelAdmissionRequest?bookingKey=" + sKey, function (allData) {
            if (allData == true) {
                DevExpress.ui.notify("Admission request canceled.", "success", 1500);
                e.model.admissionrequested(0);

            }
        });
    }
    // add by khalifa
    else if (e.itemData.text.startsWith("Send")) {
        url = "../BookingRequestUI/BookingRequestMain.html?userkey=" + uId + "&patientid=" + pId + "&hospitalid=" + hospitalid + "&lang=0&dbcode=" + dbcode + " &dockey=" + uId + "&reqargkey=1&rsource=2"
        //  alert(uId)
        // console.log("userid" + uId);
        $('#framBooking').attr("src", "");
        $('#framBooking').attr("src", url);
        $('#SendBookingRequest').modal('show');
        return;

    }
    else if (e.itemData.text.startsWith("Patient Medical")) {
        if (fromWindows == 1) {
            url = ip + "site-medicaweb/emr.aspx|FreeEMRCaller.exe|" + pId + "," + ek + "," + uId + ",0,0,0";
            window.location.href = url;
        }
        else {
            try {
                var dynaID;
                $.getJSON("../BedWhiteBoardWeb/BedManagementApiActions/Emergency/GetEMROrDyna?hospitalID=" + hospitalid, function (data) {
                    dynaID = JSON.parse(data);

                    childwindowEMR = window.parent.General_AddNewTabwon(pId, pId + ' ' + pName, ek, 0, 100, 'E', (dynaID === "" || dynaID === undefined ? 0 : dynaID))

                });

                setTimeout(function () {
                    $(e.itemElement).parent().hide();
                }, 2000);


            }
            catch (err) { }
        }

        $.getJSON("BedManagementApiActions/WaitingPatients/OpenEMR?pId=" + pId + "&ek=" + ek + "&uId=" + uId + "&seen=" + (seen == "" || seen == undefined ? 0 : 1), function (allData) {

        });

        selectedBed.seenbyerdoctor_time(new Date());
    }
    else if (e.itemData.text.startsWith("Reassign")) {
        moveInfo = "ReassignDoctor";
        //console.log(e.itemData.text);
        $("#docsearch").val("");

        $("#doctorsList tbody").empty();
        $.each(jsonErDoctors, function (indexR, valueR) {
            //console.log(jsonErDoctors[indexR]);
            $("#doctorsList tbody").append("<tr data-dismiss='modal' style='cursor:pointer;' bedKey='" + 0 + "' sKey='" + sKey + "' patientId='" + pId + "' episodeKey='" + ek + "' onclick='selectDoctor(this,\"" + jsonErDoctors[indexR].doctor_id + "," + jsonErDoctors[indexR].doctor_name + "\");'>" + "<td>" + jsonErDoctors[indexR].doctor_name + "</td>" + "</tr>");
        })

    }
    else if (e.itemData.text.startsWith("Triage")) {
        selectedBed.skey = ko.observable();
        selectedBed.skey(sKey);
        var jsonWp = ko.toJSON(selectedBed);
        triagtype = 1;
        $("#loader-wrapper").fadeIn("slow", function () {
            $("#loader-wrapper").show();
        });
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "BedManagementApiActions/WaitingPatients/PatientDblClick?uId=" + uId + "&hospId=" + hospitalid,
            data: JSON.stringify(jsonWp),
            success: function (data) {
                url = data;

                $('#framTriageSheet').attr("src", "");
                $('#framTriageSheet').attr("src", url);
                $('#diagTriageSheet').modal('show');

            },
            error: function (error) {
                console.log(error);
                console.log('An error has occurred while processing rule: ' + error.responseText);
            }
        });
        $("#loader-wrapper").fadeIn("slow", function () {
            $("#loader-wrapper").hide();
        });
    }

};

function checkChildAdmission() {
    if (childwindowAdmission.closed) {
        clearInterval(timerAdmission);

        AfterAdmissionClose();
    }
}

function AfterAdmissionClose() {

    console.log('AfterAdmissionClose');

    var pId;
    if (selectedBed == null)
        pId = selectedNotOnBed.patient_id();
    else if (selectedNotOnBed != null)
        pId = selectedBed.patient_id();

    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
        if (ns.sys_key() == openedNS) {
            ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                ko.utils.arrayForEach(room.allBeds(), function (bed) {
                    //console.log(bed.sys_key());
                    if (bed.patient_id() == pId) {
                        $.getJSON("BedManagementApiActions/Beds/GetERSingleBed?pId=" + pId + "&uId=" + uId, function (allData) {
                            var updatedBed = allData;

                            bed.admissionrequested(updatedBed.admissionrequested);
                            bed.admitted(updatedBed.admitted);
                        });
                        return false;
                    }
                });
            });
        }
    });


}


function checkChildEMR() {
    if (childwindowEMR.closed) {
        clearInterval(timerEMR);
    }
}

var mnuTrtmsNotOnBedItemClicked = function (e) {

    var pId = selectedNotOnBed.patient_id();
    var ek = selectedNotOnBed.episodekey();
    var sKey = selectedNotOnBed.clinickey();
    var pName = selectedNotOnBed.patengname();
    var docId = selectedNotOnBed.physician_key();
    var seen = selectedNotOnBed.seenbyerdoctor_time();
    var uId = getParameterByName("userkey");
    SelectedBedKey = e.itemData.id;
    SelectedEpisodeKey = ek;

    if (e.itemData.id != "0") {

        if (e.itemData.text.startsWith("Move")) {

            /*
            console.log(BedsMenu)
            while (BedsMenu.length > 0) {
                BedsMenu.pop();
            }


      
             add by khalifa to show dialog free bed
            console.log(vm.LastFreeBeds())

            console.log(BedsMenu.length)
                $.getJSON("BedManagementApiActions/Beds/GetEREmptyBedsInNS?uId=" + uId + "&NsCode=" + selectedNotOnBed.nursestationcode(), function (allData) {
                 //   console.log(allData)
                  //  console.log(selectedNotOnBed.LastFreeBeds)

                    var mappedFreeBeds = $.map(allData, function (fbed) { return new bedsfree(fbed) });
                    vm.LastFreeBeds(mappedFreeBeds);
                  //  bedsfreeCount = vm.bedsfree().length;
                    bedsfree = allData;
                    console.log(mappedFreeBeds)
                    console.log(vm.LastFreeBeds())

                })
                */

            //alert(sKey)
            //alert(docId)
            //alert(selectedNotOnBed.nursestationcode())

            //console.log(selectedNotOnBed)
            //console.log(BedsMenu)


            moveInfo = "HPtoBed";

            $("#docsearch").val("");
            $("#doctorsList tbody").empty();
            $.each(jsonErDoctors, function (indexR, valueR) {
                //console.log(jsonErDoctors[indexR]);
                $("#doctorsList tbody").append("<tr data-dismiss='modal' style='cursor:pointer;' bedKey='" + e.itemData.id + "' sKey='" + sKey + "' patientId='" + pId + "' episodeKey='" + ek + "' onclick='selectDoctor(this,\"" + jsonErDoctors[indexR].doctor_id + "," + jsonErDoctors[indexR].doctor_name + "\");'>" + "<td>" + jsonErDoctors[indexR].doctor_name + "</td>" + "</tr>");
            })
            $("#doctorsList").modal("show");



            /*
            diagDoctors = $("#diagDoctors").dialog({
                autoOpen: false,
                height: 300,
                width: 350,
                modal: true,
                buttons: {
                    "Ok": selectDoctor,
                    Cancel: function () {
                        diagDoctors.dialog("close");
                    }
                },
                close: function () {
                    //allFields.removeClass("ui-state-error");
                }
            });

            form = diagDoctors.find("form").on("submit", function (event) {
                event.preventDefault();
                selectDoctor();
            });

            diagDoctors.dialog("open");
            diagDoctors.parent().css("backgroundColor", "White");
            diagDoctors.parent().css("zIndex", "99999");
            */
        }
        else {
            $.getJSON("BedManagementApiActions/WaitingPatients/CheckMaximumCapacity?uId=" + uId + "&Ns=" + e.itemData.id, function (allData) {
                if (allData == 0) {
                    DevExpress.ui.notify("Area reached Maximum Capacity.", "warning", 1500);
                    return;
                }
                else {
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        url: "BedManagementApiActions/WaitingPatients/TransferTrttoHP?NS_id=" + e.itemData.id + "&pId=" + pId + "&ek=" + ek + "&sKey=" + sKey + "&uId=" + uId,
                        success: function (data) {
                            //console.log(data);
                            var updatedBed = data;

                            DevExpress.ui.notify("Patient transfered successfully.", "success", 1500);

                            ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                                if (ns.sys_key() == openedNS) {
                                    ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                                        ko.utils.arrayForEach(room.notOnBeds(), function (bed) {
                                            //console.log(bed.sys_key());
                                            if (bed.patient_id() == pId) {

                                                room.allBeds.remove(bed);
                                                return false;
                                            }
                                        });
                                        UpdateMnuWps(ns);

                                    });
                                }
                                else if (ns.sys_key() == e.itemData.id) {

                                    ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                                        if (updatedBed.parent_key == room.room_key()) {
                                            //console.log(jsonBed);
                                            var addBed = new RoomBeds(updatedBed);
                                            room.allBeds.push(addBed);
                                            return false;
                                        }
                                    });

                                    UpdateMnuWps(ns);


                                }
                            });
                        },
                        error: function (error) {
                            //jsonValue = jQuery.parseJSON(error.responseText);
                            console.log(error.responseText);
                        }
                    });
                }
            })
         

        }

    }
    else if (e.itemData.text.startsWith("View")) {
        var url = "/ERLogViewer/index.html?EKEY=" + ek;
        $('#framLog').attr("src", "");
        $('#framLog').attr("src", url);
        $('#logviewer').modal('show');
    }
    else if (e.itemData.text.startsWith("Code Blue")) {
        //alert("Code Blue");
        var jsonWp = ko.toJSON(selectedNotOnBed);
        window.top.CodeBlueNotification(selectedNotOnBed.patient_id(), selectedNotOnBed.episodekey());
        setTimeout(function () {
            $("#loader-wrapper").fadeIn("slow", function () {
                $("#loader-wrapper").show();
            });
            $.ajax({
                timeout: 30000,
                url: "BedManagementApiActions/WaitingPatients/GetInitialReceive?CategoryName=ER ALERTS",
                success: function (objBedsAlerts) {
                    console.log("GetInitialReceive");
                    //console.log(objBedsAlerts);
                    //ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                    //if (ns.sys_key() == openedNS) {
                    //console.log(ns.roomsAndBeds().length);
                    ko.utils.arrayForEach(vm.roomsAndBeds(), function (room) {
                        //console.log(room.room_key());
                        ko.utils.arrayForEach(room.beds(), function (bed) {
                            //console.log(bed.sys_key());
                            //console.log(bed.patient_id());

                            if ($.isEmptyObject(objBedsAlerts) == false) {
                                $.each(objBedsAlerts, function (indexR, valueR) {
                                    //console.log(objBedsAlerts[indexR]);
                                    var isUpper;
                                    if (objBedsAlerts[indexR].patient_id == undefined)
                                        isUpper = true;
                                    else
                                        isUpper = false;

                                    if (isUpper == false) {

                                        if (objBedsAlerts[indexR] != undefined) {
                                            //console.log(bed.latin_desc() + '  ||  ' + bed.patient_id() + ' || ' + objBedsAlerts[indexR].patient_id);
                                            if (bed.patient_id() == objBedsAlerts[indexR].patient_id) {
                                                //console.log(objBedsAlerts[indexR].patient_id);
                                                //console.log(objBedsAlerts[indexR].tooltip);
                                                if (objBedsAlerts[indexR].add_or_remove == "Add") {
                                                    //console.log(objBedsAlerts[indexR].patient_id);
                                                    //console.log(objBedsAlerts[indexR].tooltip);
                                                    var alertExist = false;
                                                    ko.utils.arrayForEach(bed.bedAlerts(), function (alertBed) {
                                                        //console.log(alertBed.alert_name().toLowerCase().trim() + '         ' + alertBed.tooltip() + '======' + objBedsAlerts[indexR].alert_name.toLowerCase().trim() + '         ' + objBedsAlerts[indexR].tooltip);
                                                        if (alertBed.alert_name().toLowerCase().trim() == objBedsAlerts[indexR].alert_name.toLowerCase().trim()) {

                                                            var tooltips = alertBed.tooltip().toLowerCase().split('\n');

                                                            var tooltipExists = false;
                                                            for (i = 0; i < tooltips.length; i++) {
                                                                //console.log(tooltips[i].toLowerCase() + '      ' + objBedsAlerts[indexR].tooltip.toLowerCase());
                                                                if (tooltips[i].toLowerCase() == objBedsAlerts[indexR].tooltip.toLowerCase()) {
                                                                    tooltipExists = true;
                                                                    break;
                                                                }
                                                            }

                                                            if (tooltipExists == false)
                                                                alertBed.tooltip(alertBed.tooltip() + '\n' + objBedsAlerts[indexR].tooltip);

                                                            alertExist = true;
                                                        }
                                                    });

                                                    if (alertExist == false)
                                                        bed.bedAlerts.push(new BedAlerts(objBedsAlerts[indexR]));

                                                }
                                                else {
                                                    try {
                                                        if (alertBed.alert_name().toLowerCase() == objBedsAlerts[indexR].alert_name.toLowerCase()) {
                                                            bed.bedAlerts.remove(alertBed);
                                                        }
                                                    }
                                                    catch (ex) {
                                                    }
                                                }
                                            }
                                            //console.log(bed.bedAlerts());
                                        }
                                    }
                                    else {
                                        if (objBedsAlerts[indexR] != undefined) {
                                            //console.log(bed.latin_desc() + '  ||  ' + bed.patient_id() + ' || ' + objBedsAlerts[indexR].PATIENT_ID);
                                            if (bed.patient_id() == objBedsAlerts[indexR].PATIENT_ID) {
                                                //console.log(objBedsAlerts[indexR].PATIENT_ID);
                                                //console.log(objBedsAlerts[indexR].TOOLTIP);
                                                if (objBedsAlerts[indexR].ADD_OR_REMOVE == "Add") {
                                                    //console.log(objBedsAlerts[indexR].PATIENT_ID);
                                                    //console.log(objBedsAlerts[indexR].TOOLTIP);
                                                    var alertExist = false;
                                                    ko.utils.arrayForEach(bed.bedAlerts(), function (alertBed) {
                                                        //console.log(alertBed.alert_name().toLowerCase().trim() + '         ' + alertBed.tooltip() + '======' + objBedsAlerts[indexR].alert_name.toLowerCase().trim() + '         ' + objBedsAlerts[indexR].tooltip);
                                                        if (alertBed.alert_name().toLowerCase().trim() == objBedsAlerts[indexR].ALERT_NAME.toLowerCase().trim()) {

                                                            var tooltips = alertBed.tooltip().toLowerCase().split('\n');

                                                            var tooltipExists = false;
                                                            for (i = 0; i < tooltips.length; i++) {
                                                                //console.log(tooltips[i].toLowerCase() + '      ' + objBedsAlerts[indexR].tooltip.toLowerCase());
                                                                if (tooltips[i].toLowerCase() == objBedsAlerts[indexR].TOOLTIP.toLowerCase()) {
                                                                    tooltipExists = true;
                                                                    break;
                                                                }
                                                            }

                                                            if (tooltipExists == false)
                                                                alertBed.tooltip(alertBed.tooltip() + '\n' + objBedsAlerts[indexR].TOOLTIP);

                                                            alertExist = true;
                                                        }
                                                    });

                                                    if (alertExist == false)
                                                        bed.bedAlerts.push(new BedAlerts(objBedsAlerts[indexR]));

                                                }
                                                else {
                                                    try {
                                                        if (alertBed.alert_name().toLowerCase() == objBedsAlerts[indexR].ALERT_NAME.toLowerCase()) {
                                                            bed.bedAlerts.remove(alertBed);
                                                        }
                                                    }
                                                    catch (ex) {
                                                    }
                                                }
                                            }
                                            //console.log(bed.bedAlerts());
                                        }
                                    }

                                });
                            }

                        });
                    });
                    //}
                    //});

                },
                global: false,     // this makes sure ajaxStart is not triggered
                dataType: 'json',
            });
        }, 2000);
        $("#loader-wrapper").fadeIn("slow", function () {
            $("#loader-wrapper").hide();
        });

    }
    else if (e.itemData.text.startsWith("Triage")) {
        triagtype = 1;
        selectedNotOnBed.skey = ko.observable();
        selectedNotOnBed.skey(sKey);
        var jsonWp = ko.toJSON(selectedNotOnBed);
        selectedWP = selectedNotOnBed;

        $("#loader-wrapper").fadeIn("slow", function () {
            $("#loader-wrapper").show();
        });
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "BedManagementApiActions/WaitingPatients/PatientDblClick?uId=" + uId + "&hospId=" + hospitalid,
            data: JSON.stringify(jsonWp),
            success: function (data) {
                url = data;

                $('#framTriageSheet').attr("src", "");
                $('#framTriageSheet').attr("src", url);
                $('#diagTriageSheet').modal('show');

            },
            error: function (error) {
                console.log(error);
                console.log('An error has occurred while processing rule: ' + error.responseText);
            }
        });
        $("#loader-wrapper").fadeIn("slow", function () {
            $("#loader-wrapper").hide();
        });
    }

    else if (e.itemData.text.startsWith("Discharge")) {
        //console.log('discharge');
        $.getJSON("BedManagementApiActions/WaitingPatients/GetDischareStatus?hospid=" + hospitalid, function (allData) {
            dischareStatus = allData;



            $("#statusList tbody").empty();

            $.each(dischareStatus, function (indexR, valueR) {
                //console.log("<tr data-dismiss='modal' style='cursor:pointer;' episodeKey='" + ek + "' sKey='" + sKey + "' onclick='selectStatus(this,\"" + dischareStatus[indexR].status_id + "," + dischareStatus[indexR].status_name + "\");'>" + "<td>" + dischareStatus[indexR].status_name + "</td>" + "</tr>");
                $("#statusList tbody").append("<tr data-dismiss='modal' style='cursor:pointer;' episodeKey='" + ek + "' sKey='" + sKey + "' pId='" + pId + "' onclick='selectStatus(this,\"" + dischareStatus[indexR].status_id + "," + dischareStatus[indexR].status_name + "," + dischareStatus[indexR].doc_code + "\");'>" + "<td>" + dischareStatus[indexR].status_name + "</td>" + "</tr>");
            })



        });

    }
    else if (e.itemData.text.startsWith("Request")) {
        if (fromWindows == 1) {
            url = ip + "site-medicaweb/AdmissionRequest.aspx|AdmissionRequest.exe|" + uKey + ",0,0,IsEr~1|PatientID~" + pId + "|BookingNum~" + sKey + "|DocID~" + docId;
            window.location.href = url;
        }
        else {
            url = "../AdmissionRequestUI/AdmissionRequest.html?lang=" + lang + "&hospitalid=" + hospitalid + "&userkey=" + uId +
                "&bookingkey=" + sKey + "&iser=1&docid=" + docId + "&patientid=" + pId + "&isedit=0&regsnumber=0" +
                "&IsEr=1&Episode_Key=" + ek + "&dbcode=" + dbcode;

            ////console.log(url);

            //childwindowAdmission = window.open(url, "mywindow", "location=0,status=0,scrollbars=0,menubar=0,directories=0,resizable=1,scrollbars=1,width=1200,height=800");

            //if (window.focus) { childwindowAdmission.focus() }
            ////childwindowAdmission.moveTo(0, 0);

            //timerAdmission = setInterval(checkChildAdmission, 500);

            $('#framRequestAdmission').attr("src", "");
            $('#framRequestAdmission').attr("src", url);
            $('#diagRequestAdmission').modal('show');
        }
    }//add by khalifa
    else if (e.itemData.text.startsWith("Send")) {
        url = "../BookingRequestUI/BookingRequestMain.html?userkey=" + uId + "&patientid=" + pId + "&hospitalid=" + hospitalid + "&lang=0&dbcode=" + dbcode + " &dockey=" + uId + "&reqargkey=1&rsource=2"        //alert(dbcode)
        //alert(lang)
        $('#framBooking').attr("src", "");
        $('#framBooking').attr("src", url);
        $('#SendBookingRequest').modal('show');

    }
    else if (e.itemData.text.startsWith("Cancel")) {
        //console.log(e);
        $.getJSON("BedManagementApiActions/Nursestations/CancelAdmissionRequest?bookingKey=" + sKey, function (allData) {
            if (allData == true) {
                DevExpress.ui.notify("Admission request canceled.", "success", 1500);
                e.model.admissionrequested(0);
            }
        });
    }
    else if (e.itemData.text.startsWith("Patient Medical")) {
        if (fromWindows == 1) {
            url = ip + "site-medicaweb/emr.aspx|FreeEMRCaller.exe|" + pId + "," + ek + "," + uId + ",0,0,0";
            window.location.href = url;
        }
        else {
            try {
                var dynaID;
                $.getJSON("../BedWhiteBoardWeb/BedManagementApiActions/Emergency/GetEMROrDyna?hospitalID=" + hospitalid, function (data) {
                    dynaID = JSON.parse(data);
                    childwindowEMR = window.parent.General_AddNewTabwon(pId, pId + ' ' + pName, ek, 0, 100, 'E', (dynaID === "" || dynaID === undefined ? 0 : dynaID))
                });
                // url = "/NewPatientRecord/PatientMedicalRecord.html?PatId=" + pId + "&EpsKey=" + ek + "&UserID=" + uId;
                //childwindowEMR = window.open(url, "mywindow", "location=0,status=0,scrollbars=0,menubar=0,directories=0,resizable=1,scrollbars=1,width=1200,height=800");
                //childwindowEMR = window.parent.AddNewTabwon(pId, pId + ' ' + pName, url + '&Distrct=' + localStorage.getItem('vvDistrictId') + '&hospitalid=' + hospitalid);
                //  childwindowEMR = window.parent.General_AddNewTabwon(pId, pId + ' ' + pName, ek, 0, 100, 'E')

                setTimeout(function () {
                    //console.log($(e.itemElement).parent());
                    $(e.itemElement).parent().hide();
                }, 2000);



                //AddNewTabwon(e.appointmentData.Pat_ID, e.appointmentData.Pat_ID + ' ' + e.appointmentData.Pat_Name,
                //                                '/NewPatientRecord/PatientMedicalRecord.html?PatId=' + e.appointmentData.Pat_ID + '&EpsKey=' + EpsKey + '&UserID=' + StaffKey + '&lang='
                //        + localStorage.getItem('MenuLangID') + '&UILang=' + localStorage.getItem('MenuLangID') + '&Distrct=' + localStorage.getItem('vvDistrictId')
                //        + '&hospitalid=' + localStorage.getItem('vvHospID'))


                //if (window.focus) { childwindowEMR.focus() }
                //childwindowAdmission.moveTo(0, 0);

                //timerEMR = setInterval(checkChildEMR, 500);
            }
            catch (err) { }
        }
        $.getJSON("BedManagementApiActions/WaitingPatients/OpenEMR?pId=" + pId + "&ek=" + ek + "&uId=" + uId + "&seen=" + (seen == "" || seen == undefined ? 0 : 1), function (allData) {

        });

        selectedNotOnBed.seenbyerdoctor_time(new Date());
    }
    else if (e.itemData.text.startsWith("Reassign")) {
        moveInfo = "ReassignDoctor";
        //console.log(e.itemData.text);

        $("#doctorsList tbody").empty();
        $.each(jsonErDoctors, function (indexR, valueR) {
            //console.log(jsonErDoctors[indexR]);
            $("#doctorsList tbody").append("<tr data-dismiss='modal' style='cursor:pointer;' bedKey='" + 0 + "' sKey='" + sKey + "' patientId='" + pId + "' episodeKey='" + ek + "' onclick='selectDoctor(this,\"" + jsonErDoctors[indexR].doctor_id + "," + jsonErDoctors[indexR].doctor_name + "\");'>" + "<td>" + jsonErDoctors[indexR].doctor_name + "</td>" + "</tr>");
        })

    }

};

function GetColorByStatus(triageStatus) {
    var res = "";
    //console.log(triageStatus);
    if (triageLevels != null && triageStatus != 0) {

        $.each(triageLevels, function (i, v) {
            if (v.sub_cod == triageStatus) {
                //console.log(v.sub_cod);
                //console.log(v.local_desc);
                res = v.local_desc;
                return false;
            }
        });
    }

    return res;
}

var AllPublicGeneralData = {};

var NursestationViewModel = function () {
    var self = this;


    // add datepicker by khalifa 
    self.DischargOrderDate = ko.observable();


    // add by khalifa 
    //  self.LastFreeBeds = ko.observableArray();

    // search in dialog free bed 
    /*  self.FreeBedsFilters = ko.observable('');
  
      self.FilteredLastFreeBeds = ko.computed(function () {
          var filter = self.FreeBedsFilters().toLowerCase();
          if (!filter) {
              return self.LastFreeBeds();
          } else {
              return ko.utils.arrayFilter(self.LastFreeBeds(), function (item) {
                  return ((item.latin_desc().toLowerCase().indexOf(filter) !== -1));
              });
          }
      });
  
  */





    self.AllStickNotes = ko.observableArray();



    self.renderstickynotes = function (item, item2) {
        var id = '#sticknotes' + item2.Patient_id();
        $(id).draggable()
    }

    self.rmoveSticknote = function (item, item2) {
        self.AllStickNotes.remove(item2);
    }

    // add by khalifa Sticky
    self.OpenStikyNotes = function (wp, ek) {




        var data = {}
        data.Patient_id = wp.patient_id();
        var newstiky = new StickyNotes(wp.patient_id(), 1, ek, wp.patengname(), wp.patient_id(), 0);
        newstiky._loadsticknotes();
        data.stickdata = newstiky;
        data.StickyTempName = ko.observable('/MPlusReferences/Templates/StickyNotes/StickyNotes');

        // console.log(data)
        self.AllStickNotes.push(data);
    }


    self.wbType = ko.observable(wbType);

    self.triageLevels = ko.observableArray([]);

    self.triageSheetKey = ko.observable();

    self.nursestations = ko.observableArray([]);
    self.roomsAndBeds = ko.observableArray([]);

    self.alertSize = ko.observable();
    self.er_maxtime = ko.observable();
    self.er_maxtriagetime = ko.observable();
    self.er_maxwaitingareatime = ko.observable();
    self.RoomsFilter = ko.observable([]);

    self.obsWAstartTime = ko.observable();
    self.obsWAavgTime = ko.observable();
    self.obsWAmaxTime = ko.observable();
    self.SelectedRoom = ko.observableArray('');
    self.SelectedValue = ko.observableArray('');
    self.filteredAry = ko.observableArray([]);

    self.roomChanged = function (newValue, event) {

        if (event.originalEvent) { //user changed
            if (event.originalEvent.currentTarget.selectedIndex != 0) {
                //alert('myfield changed to ' + newValue.room_name());
                self.filteredAry = vm.SelectedERNs().RoomsFilter().filter(e => e.room_name() == vm.SelectedERNs().RoomsFilter()[event.originalEvent.currentTarget.selectedIndex - 1].room_name());
                vm.SelectedERNs().roomsAndBeds(self.filteredAry);

            }
            else {
                vm.SelectedERNs().roomsAndBeds(vm.SelectedERNs().RoomsFilter());
            }
        } else { // program changed

        }

    }

    $.getJSON("BedManagementApiActions/WaitingPatients/GetUserKey?uId=" + uId, function (allData) {
        uKey = allData;

        $.getJSON("BedManagementApiActions/Nursestations/GetSysParams?hospId=" + hospitalid, function (allData) {
            self.alertSize(allData.alertSize);
            self.er_maxtime(allData.er_maxtime);
            self.er_maxtriagetime(allData.er_maxtriagetime);
            self.er_maxwaitingareatime(allData.er_maxwaitingareatime);
            self.er_enablefasttriage = ko.observable(allData.er_enablefasttriage);
            self.er_enablebilling = ko.observable(allData.er_enablebilling);
            self.enable_alphanumric_pid = ko.observable(allData.enable_alphanumric_pid);

            ER_EnableFastTriage = allData.er_enablefasttriage;
            ER_EnableBilling = allData.er_enablebilling;
            Enable_Alphanumric_PID = allData.enable_alphanumric_pid;

            //console.log(ER_EnableFastTriage);

            self.ExtractMaxTimes(self);

            self.obsERstartTime = ko.observable(ERstartTime);
            self.obsERavgTime = ko.observable(ERavgTime);
            self.obsERmaxTime = ko.observable(ERmaxTime);

            //console.log(allData.patient_age_icon);
            var patientAgeIcon = allData.patient_age_icon.split("|");
            //console.log(patientAgeIcon);

            for (i = 0; i < patientAgeIcon.length; i++) {
                var v = patientAgeIcon[i];
                if (v.indexOf("~") > -1) {
                    if (v.split("~")[0].toLowerCase() == 'newborn') {
                        newborn = v.split("~")[1].replace(">", "").replace("<", "");
                    }
                    else if (v.split("~")[0].toLowerCase() == 'infant') {
                        infant = v.split("~")[1].replace(">", "").replace("<", "");
                    }
                    else if (v.split("~")[0].toLowerCase() == 'child') {
                        child = v.split("~")[1].replace(">", "").replace("<", "");
                    }
                    else if (v.split("~")[0].toLowerCase() == 'adult') {
                        adult = v.split("~")[1].replace(">", "").replace("<", "");
                    }
                    //console.log(newborn + ' ' + infant + ' ' + child + ' ' + adult);
                }
            }


            // edit by khalifa
            var hospId = getParameterByName("hospitalid")


            $.getJSON("BedManagementApiActions/Nursestations/GetTriageLevels?hospId=" + hospId, function (allData) {
                var mappedTriageLevels = $.map(allData, function (tLevel) { return new TriageLevels(tLevel) });
                self.triageLevels(mappedTriageLevels);
                triageLevelsCount = self.triageLevels().length;
                triageLevels = allData;

                //getAllNurseStation(currDate.toLocaleDateString(), wbType, uId, hospitalid )
                $("#loader-wrapper").fadeIn("slow", function () {
                    $("#loader-wrapper").show();
                });
                $.getJSON("BedManagementApiActions/Nursestations/GetAllNurseStationsWithAlertsER?startDate=" + currDate.toLocaleDateString() + "&NsType=" + wbType + "&uId=" + uId + "&hospId=" + hospitalid, function (allData) {
                    var mappedNursestations = $.map(allData, function (Ns) { return new Nursestation(Ns) });
                    self.nursestations(mappedNursestations);

                });


                if (UseAssignments == 0 || UseAssignments == undefined) {
                    $.getJSON("BedManagementApiActions/Nursestations/GetNurseStationsWithAlertsERWithoutAssign?startDate=" + currDate.toLocaleDateString() + "&NsType=" + wbType + "&hospId=" + hospitalid, function (allData) {
                        $.each(allData, function (i, val) {
                            if (val != undefined) {
                                subMnuNSs.push({ id: val.sys_key, text: val.latin_desc, iconSrc: 'images/beacon_light.png', visible: true });
                            }
                        });
                    });
                }
                else {

                    $.getJSON("BedManagementApiActions/Nursestations/GetNurseStationsWithAlertsER?startDate=" + currDate.toLocaleDateString() + "&NsType=" + wbType + "&uId=" + uId + "&hospId=" + hospitalid, function (allData) {

                        $.each(allData, function (i, val) {
                            if (val != undefined) {
                                subMnuNSs.push({ id: val.sys_key, text: val.latin_desc, iconSrc: 'images/beacon_light.png', visible: true });
                            }
                        });

                    });
                }
                $.getJSON("BedManagementApiActions/Nursestations/GetDoctorAss?hospId=" + GetQueryStringParams('hospitalid'), function (allData) {
                    if (allData != null && allData != undefined && allData != "") {
                        var DocAssList = $.parseJSON(allData);
                        $.each(DocAssList, function (i, val) {
                            if (val != undefined) {
                                subMnuAssList.push({ id: "-999", text: val.ShortHand, iconSrc: 'images/beacon_light.png', mykey: val.SysKey });
                            }
                        });
                    }

                });


                $("#loader-wrapper").fadeIn("slow", function () {
                    $("#loader-wrapper").hide();
                });
            });

        });

    });






    self.SelectedNs = ko.observable();
    self.SelectedERNs = ko.observable();

    self.selectedViewInTrSmall = ko.observable("erInTrSmall");
    self.nsErWpView = ko.observable("nsERWPSmall");
    self.selectedErView = ko.observable("erDetailed");

    //this.toggle = function () {
    //    this.template(this.template() === "roomsAndBedsTmpl" ? "roomsAndBedsTmpl2" : "roomsAndBedsTmpl");
    //};
    self.ExtractMaxTimes = function () {

        var wTime = self.er_maxtime().split(',');
        if (wTime.length >= 3) {
            ERstartTime = wTime[0];
            ERavgTime = wTime[1];
            ERmaxTime = wTime[2];
        }

        var wTTime = self.er_maxtriagetime().split('|');

        for (i = 0; i < wTTime.length; i++) {
            var wTriageTime = wTTime[i].split('^')[1].split(',');
            if (wTriageTime.length >= 3) {
                TRGstartTime.push(wTriageTime[0]);
                TRGavgTime.push(wTriageTime[1]);
                TRGmaxTime.push(wTriageTime[2]);
            }
        }

        var wWATime = self.er_maxwaitingareatime().split('|');
        for (i = 0; i < wWATime.length; i++) {
            var wWaitAreaTime = wWATime[i].split('^')[1].split(',');
            if (wWaitAreaTime.length >= 3) {
                WAstartTime.push(wWaitAreaTime[0]);
                WAavgTime.push(wWaitAreaTime[1]);
                WAmaxTime.push(wWaitAreaTime[2]);
            }
        }
    };

    self.getTriageColor = function (status) {
        return ko.observable(GetColorByStatus(status));
    }


}


//add by khalifa

var bedsfree = function (fbed) {
    var self = this;
    self.sys_key = ko.observable(fbed.sys_key);
    self.latin_desc = ko.observable(fbed.latin_desc);
    self.BedsClck = function () {

        selectBed(self.sys_key())
        $('#freeBeds').dialog("close");

    }
}

var TriageLevels = function (tLevel) {
    var self = this;
    self.main_cod = ko.observable(tLevel.main_cod);
    self.sub_cod = ko.observable(tLevel.sub_cod);
    self.latin_desc = ko.observable(tLevel.latin_desc);
    self.local_desc = ko.observable(tLevel.local_desc);
    //console.log(this.local_desc());
}




var ErDoctors = function (dr) {
    var self = this;
    this.doctor_id = ko.observable(dr.doctor_id);
    this.doctor_name = ko.observable(dr.doctor_name);
}

function UpdateMnuWps(Ns) {

    $(".free .OrderTimeUpnormal").removeClass("OrderTimeUpnormal")
    $(".free .ordertimeNormal").removeClass("ordertimeNormal")

    var ShowMove = false;
    var showcodeblue = false;
    var showretriag = false;
    if (subMnuNSs.length > 1) {
        ShowMove = true;
    }
    if (ShowCodeBlue == 1) {
        showcodeblue = true;
    }
    if (ShowReTriag == 1) {
        showretriag = true;
    }
    mnuWPs = [
        { id: '0', text: 'Code Blue', iconSrc: 'images/list_accept.png', visible: showcodeblue },
        { id: '0', text: 'Triage Patient Assessment', iconSrc: 'images/list_accept.png' },
        { id: '0', text: 'Patient Medical Record', iconSrc: 'images/Patient-Medical-Record.png' },
        { id: '0', text: 'Transfer to another Emergency Area', iconSrc: 'images/transfare.png', items: subMnuNSs, visible: ShowMove },
        // add by khalifa
        { id: '0', text: 'Patient_label', iconSrc: 'images/transfare.png' },
        { id: '0', text: '         ___________________________' },
        { id: '0', text: 'Move to Holding bay', iconSrc: 'images/moveto.png' },
        { id: '-8', text: 'Move to Bed', iconSrc: 'images/transfare.png' },

        //{ id: '0', text: '_________________________________________' },
    ];

    if (ER_EnableFastTriage != 1) {
        mnuWPsToTriaged = [
            { id: '0', text: 'Code Blue', iconSrc: 'images/list_accept.png', visible: showcodeblue },
            { id: '0', text: 'Triage Patient Assessment', iconSrc: 'images/list_accept.png' },
            { id: '0', text: 'Cancel Registration (Triage Out)', iconSrc: 'images/Discharge-Order.png' },
            // add by khalifa
            { id: '0', text: 'Patient_label', iconSrc: 'images/transfare.png' },
            { id: '-8', text: 'Move to Bed', iconSrc: 'images/transfare.png' },
            //{ id: '0', text: 'Cancel Registration', iconSrc: 'images/list_accept.png' },
        ];
    }
    else {
        mnuWPsToTriaged = [
            { id: '0', text: 'Code Blue', iconSrc: 'images/list_accept.png', visible: showcodeblue },
            { id: '0', text: 'Triage Patient Assessment', iconSrc: 'images/list_accept.png' },
            { id: '0', text: 'Cancel Registration (Triage Out)', iconSrc: 'images/Discharge-Order.png' },
            // add by khalifa
            { id: '0', text: 'Patient_label', iconSrc: 'images/transfare.png' },

            //{ id: '0', text: 'Cancel Registration', iconSrc: 'images/list_accept.png' },
            { id: '0', text: '         ___________________________' },
            { id: '0', text: 'Fast Triage & Move to Holding bay', iconSrc: 'images/moveto.png' },
            { id: '-9', text: 'Fast Triage & Move to Bed', iconSrc: 'images/transfare.png' },

        ];
    }

    mnuTrtmsOnBed = [
        { id: '0', text: 'Code Blue', iconSrc: 'images/list_accept.png', visible: showcodeblue },
        { id: '0', text: 'Triage Patient Assessment', iconSrc: 'images/list_accept.png', visible: showretriag },
        { id: '0', text: 'Patient Medical Record', iconSrc: 'images/Patient-Medical-Record.png' },
        { id: '0', text: 'Doctor Initial Assessment', iconSrc: 'images/Patient-Medical-Record.png', visible: ShowDocAssessment, items: subMnuAssList },
        { id: '0', text: 'Request for Admission', iconSrc: 'images/Request-for-Admission.png', visible: true },
        { id: '0', text: 'Send Booking Request', iconSrc: 'images/Request-for-Admission.png' },
        { id: '0', text: 'Cancel admission request', iconSrc: 'images/Request-for-Admission.png', visible: false },
        { id: '0', text: 'Discharge Order', iconSrc: 'images/Discharge-Order.png' },
        { id: '0', text: 'Reassign Doctor', iconSrc: 'images/reassign.png' },
        { id: '0', text: 'Transfer to another Emergency Area', iconSrc: 'images/transfare.png', items: subMnuNSs, visible: ShowMove },
        { id: '0', text: 'View Log', iconSrc: 'images/reassign.png' },
        { id: '0', text: '         ___________________________' },
        { id: '0', text: 'Move to Holding bay', iconSrc: 'images/moveto.png' },
        { id: '-8', text: 'Move to Bed', iconSrc: 'images/transfare.png' },

    ];

    mnuTrtmsNotOnBed = [
        { id: '0', text: 'Code Blue', iconSrc: 'images/list_accept.png', visible: showcodeblue },
        { id: '0', text: 'Triage Patient Assessment', iconSrc: 'images/list_accept.png', visible: showretriag },
        { id: '0', text: 'Patient Medical Record', iconSrc: 'images/Patient-Medical-Record.png' },
        { id: '0', text: 'Request for Admission', iconSrc: 'images/Request-for-Admission.png', visible: true },
        { id: '0', text: 'Send Booking Request', iconSrc: 'images/Request-for-Admission.png', visible: true },
        { id: '0', text: 'Cancel admission request', iconSrc: 'images/Request-for-Admission.png', visible: false },
        { id: '0', text: 'Discharge Order', iconSrc: 'images/Discharge-Order.png' },
        { id: '0', text: 'Reassign Doctor', iconSrc: 'images/reassign.png' },
        { id: '0', text: 'Transfer to another Emergency Area', iconSrc: 'images/transfare.png', items: subMnuNSs, visible: ShowMove },
        { id: '0', text: 'View Log', iconSrc: 'images/reassign.png' },
        { id: '0', text: '         ___________________________' },
        { id: '-8', text: 'Move to Bed', iconSrc: 'images/transfare.png' },

    ];
    BedsMenu = [];
    FTBedsMenu = [];





    ko.utils.arrayForEach(Ns.roomsAndBeds(), function (room) {
        ko.utils.arrayForEach(room.beds(), function (bed) {
            if (bed.patient_id() == 0 || bed.patient_id() == null) {
                //mnuWPs.push({ id: bed.sys_key(), text: 'Move to "' + bed.latin_desc() + '"', iconSrc: 'images/Bed.png' });
                if (ER_EnableFastTriage == 1) {
                    //mnuWPsToTriaged.push({ id: bed.sys_key(), text: 'Fast Triage & Move to "' + bed.latin_desc() + '"', iconSrc: 'images/Bed.png' });
                    FTBedsMenu.push({ id: bed.sys_key(), text: 'Fast Triage & Move to "' + bed.latin_desc() + '"', iconSrc: 'images/Bed.png' });
                }
                //mnuTrtmsNotOnBed.push({ id: bed.sys_key(), text: 'Move to "' + bed.latin_desc() + '"', iconSrc: 'images/Bed.png' });
                //mnuTrtmsOnBed.push({ id: bed.sys_key(), text: 'Move to "' + bed.latin_desc() + '"', iconSrc: 'images/Bed.png' });
                BedsMenu.push({ id: bed.sys_key(), text: 'Move to ' + bed.latin_desc() + '', iconSrc: 'images/Bed.png' });
            }
        });
    });
    $("#bedsList tbody").empty();





    $.each(BedsMenu, function (indexR, valueR) {
        $("#bedsList tbody").append("<tr data-dismiss='modal' style='cursor:pointer;' bedKey='bedd"
            + BedsMenu[indexR].id + "' onclick='selectBed(" + BedsMenu[indexR].id + ")'>" + "<td  >   <div style='float: left;'>" + BedsMenu[indexR].text
            + "</div><div class='triage1' style='float: right; background-color:white;' >" + BedsMenu[indexR].id + "</div></td>" + "</tr>");
    })
    $("#ftbedsList tbody").empty();

    $.each(FTBedsMenu, function (indexR, valueR) {
        $("#ftbedsList tbody").append("<tr data-dismiss='modal' style='cursor:pointer;' bedKey='bedd"
            + FTBedsMenu[indexR].id + "' onclick='selectFTBed(" + FTBedsMenu[indexR].id + ")'>" + "<td data-toggle='modal' data-target='#diagTriagePriority' >   <div style='float: left;'>" + FTBedsMenu[indexR].text
            + "</div><div class='triage1' style='float: right; background-color:white;' >" + FTBedsMenu[indexR].id + "</div></td>" + "</tr>");
    })

}

var Nursestation = function (Ns) {
    var self = this;
    self.sys_key = ko.observable(Ns.sys_key);
    self.latin_desc = ko.observable(Ns.latin_desc);
    self.ns_image = ko.observable('/images/' + Ns.ns_image);
    self.occupiedPat = ko.observable(Ns.occupiedPat);
    self.occupiedMale = ko.observable(Ns.occupiedMale);
    self.occupiedFemale = ko.observable(Ns.occupiedFemale);
    self.PatAdmission = ko.observable(Ns.PatAdmission);
    self.PatDischarge = ko.observable(Ns.PatDischarge);
    self.DAMA = ko.observable(Ns.DAMA);
    self.OutOnPass = ko.observable(Ns.OutOnPass);
    self.pendingDis = ko.observable(Ns.pendingDis);
    self.T_in = ko.observable(Ns.T_in);
    self.T_Out = ko.observable(Ns.T_Out);
    self.emptyBeds = ko.observable(Ns.emptyBeds);
    self.blockedBeds = ko.observable(Ns.blockedBeds);
    self.clinic_code = ko.observable(Ns.clinic_code);
    self.alerts = ko.observableArray([]);
    self.waitingPatients = ko.observableArray([]);
    self.sortedWaitingPatients = ko.observableArray([]);
    self.roomsAndBeds = ko.observableArray([]);
    self.RoomsFilter = ko.observableArray([]);

    self.erDoctors = ko.observableArray([]);
    self.erNsAlerts = ko.observableArray([]);

    self.notTrgMaxTime = ko.observable();
    self.trg1MaxTime = ko.observable();
    self.trg2MaxTime = ko.observable();
    self.trg3MaxTime = ko.observable();
    self.trg4MaxTime = ko.observable();
    self.trg5MaxTime = ko.observable();
    self.notTrgAvgMaxTime = ko.observable();
    self.trg1AvgMaxTime = ko.observable();
    self.trg2AvgMaxTime = ko.observable();
    self.trg3AvgMaxTime = ko.observable();
    self.trg4AvgMaxTime = ko.observable();
    self.trg5AvgMaxTime = ko.observable();
    self.notTrgAvgMinTime = ko.observable();
    self.trg1AvgMinTime = ko.observable();
    self.trg2AvgMinTime = ko.observable();
    self.trg3AvgMinTime = ko.observable();
    self.trg4AvgMinTime = ko.observable();
    self.trg5AvgMinTime = ko.observable();
    self.notTrgMinTime = ko.observable();
    self.trg1MinTime = ko.observable();
    self.trg2MinTime = ko.observable();
    self.trg3MinTime = ko.observable();
    self.trg4MinTime = ko.observable();
    self.trg5MinTime = ko.observable();

    self.allTrgMaxTime = ko.observable();
    self.allTrgAvgMaxTime = ko.observable();
    self.allTrgAvgMinTime = ko.observable();
    self.allTrgMinTime = ko.observable();

    self.sortedWaitingPatients = ko.computed(function () {
        return self.waitingPatients().sort(function (l, r) {
            return parseInt(l.emr_status().toString().replace(0, 10)) - parseInt(r.emr_status().toString().replace(0, 10));
        });
    });


    //$.getJSON("BedManagementApiActions/WaitingPatients/GetWpByERNs?NS_id=" + self.sys_key() + "&hospId=" + hospitalid, function (allData) {
    //console.log("GetWpByERNs Succeded");
    var mappedWaitingPatients = $.map(Ns.waitingpatients, function (wp) { return new WaitingPatient(wp) });
    //console.log("GetWpByERNs After Mapping");
    self.waitingPatients(mappedWaitingPatients);
    //console.log("GetWpByERNs Adding to observable");

    setInterval(function () {

        var vnotTrgMaxTime = 0;
        var vtrg1MaxTime = 0;
        var vtrg2MaxTime = 0;
        var vtrg3MaxTime = 0;
        var vtrg4MaxTime = 0;
        var vtrg5MaxTime = 0;
        var vnotTrgAvgMaxTime = 0;
        var vtrg1AvgMaxTime = 0;
        var vtrg2AvgMaxTime = 0;
        var vtrg3AvgMaxTime = 0;
        var vtrg4AvgMaxTime = 0;
        var vtrg5AvgMaxTime = 0;
        var vnotTrgAvgMinTime = 0;
        var vtrg1AvgMinTime = 0;
        var vtrg2AvgMinTime = 0;
        var vtrg3AvgMinTime = 0;
        var vtrg4AvgMinTime = 0;
        var vtrg5AvgMinTime = 0;
        var vnotTrgMinTime = 0;
        var vtrg1MinTime = 0;
        var vtrg2MinTime = 0;
        var vtrg3MinTime = 0;
        var vtrg4MinTime = 0;
        var vtrg5MinTime = 0;

        ko.utils.arrayForEach(self.waitingPatients(), function (wp) {
            if (wp.emr_status() == 1) {
                if (parseInt(wp.wMinutes()) >= ERmaxTime)
                    vtrg1MaxTime += 1;
                else if (parseInt(wp.wMinutes()) < ERmaxTime && parseInt(wp.wMinutes()) >= ERavgTime)
                    vtrg1AvgMaxTime += 1;
                else if (parseInt(wp.wMinutes()) < ERavgTime && parseInt(wp.wMinutes()) >= ERstartTime)
                    vtrg1AvgMinTime += 1;
                else if (parseInt(wp.wMinutes()) < ERstartTime)
                    vtrg1MinTime += 1;
            }
            else if (wp.emr_status() == 2) {
                if (parseInt(wp.wMinutes()) >= ERmaxTime)
                    vtrg2MaxTime += 1;
                else if (parseInt(wp.wMinutes()) < ERmaxTime && parseInt(wp.wMinutes()) >= ERavgTime)
                    vtrg2AvgMaxTime += 1;
                else if (parseInt(wp.wMinutes()) < ERavgTime && parseInt(wp.wMinutes()) >= ERstartTime)
                    vtrg2AvgMinTime += 1;
                else if (parseInt(wp.wMinutes()) < ERstartTime)
                    vtrg2MinTime += 1;
            }
            else if (wp.emr_status() == 3) {
                if (parseInt(wp.wMinutes()) >= ERmaxTime)
                    vtrg3MaxTime += 1;
                else if (parseInt(wp.wMinutes()) < ERmaxTime && parseInt(wp.wMinutes()) >= ERavgTime)
                    vtrg3AvgMaxTime += 1;
                else if (parseInt(wp.wMinutes()) < ERavgTime && parseInt(wp.wMinutes()) >= ERstartTime)
                    vtrg3AvgMinTime += 1;
                else if (parseInt(wp.wMinutes()) < ERstartTime)
                    vtrg3MinTime += 1;
            }
            else if (wp.emr_status() == 4) {
                if (parseInt(wp.wMinutes()) >= ERmaxTime)
                    vtrg4MaxTime += 1;
                else if (parseInt(wp.wMinutes()) < ERmaxTime && parseInt(wp.wMinutes()) >= ERavgTime)
                    vtrg4AvgMaxTime += 1;
                else if (parseInt(wp.wMinutes()) < ERavgTime && parseInt(wp.wMinutes()) >= ERstartTime)
                    vtrg4AvgMinTime += 1;
                else if (parseInt(wp.wMinutes()) < ERstartTime)
                    vtrg4MinTime += 1;
            }
            else if (wp.emr_status() == 5) {
                if (parseInt(wp.wMinutes()) >= ERmaxTime)
                    vtrg5MaxTime += 1;
                else if (parseInt(wp.wMinutes()) < ERmaxTime && parseInt(wp.wMinutes()) >= ERavgTime)
                    vtrg5AvgMaxTime += 1;
                else if (parseInt(wp.wMinutes()) < ERavgTime && parseInt(wp.wMinutes()) >= ERstartTime)
                    vtrg5AvgMinTime += 1;
                else if (parseInt(wp.wMinutes()) < ERstartTime)
                    vtrg5MinTime += 1;
            }
            else {
                if (parseInt(wp.wMinutes()) >= ERmaxTime)
                    vnotTrgMaxTime += 1;
                else if (parseInt(wp.wMinutes()) < ERmaxTime && parseInt(wp.wMinutes()) >= ERavgTime)
                    vnotTrgAvgMaxTime += 1;
                else if (parseInt(wp.wMinutes()) < ERavgTime && parseInt(wp.wMinutes()) >= ERstartTime)
                    vnotTrgAvgMinTime += 1;
                else if (parseInt(wp.wMinutes()) < ERstartTime)
                    vnotTrgMinTime += 1;
            }

        });

        self.notTrgMaxTime(vnotTrgMaxTime);
        self.trg1MaxTime(vtrg1MaxTime);
        self.trg2MaxTime(vtrg2MaxTime);
        self.trg3MaxTime(vtrg3MaxTime);
        self.trg4MaxTime(vtrg4MaxTime);
        self.trg5MaxTime(vtrg5MaxTime);
        self.notTrgAvgMaxTime(vnotTrgAvgMaxTime);
        self.trg1AvgMaxTime(vtrg1AvgMaxTime);
        self.trg2AvgMaxTime(vtrg2AvgMaxTime);
        self.trg3AvgMaxTime(vtrg3AvgMaxTime);
        self.trg4AvgMaxTime(vtrg4AvgMaxTime);
        self.trg5AvgMaxTime(vtrg5AvgMaxTime);
        self.notTrgAvgMinTime(vnotTrgAvgMinTime);
        self.trg1AvgMinTime(vtrg1AvgMinTime);
        self.trg2AvgMinTime(vtrg2AvgMinTime);
        self.trg3AvgMinTime(vtrg3AvgMinTime);
        self.trg4AvgMinTime(vtrg4AvgMinTime);
        self.trg5AvgMinTime(vtrg5AvgMinTime);
        self.notTrgMinTime(vnotTrgMinTime);
        self.trg1MinTime(vtrg1MinTime);
        self.trg2MinTime(vtrg2MinTime);
        self.trg3MinTime(vtrg3MinTime);
        self.trg4MinTime(vtrg4MinTime);
        self.trg5MinTime(vtrg5MinTime);

        self.allTrgMaxTime(parseInt(vtrg1MaxTime) + parseInt(vtrg2MaxTime) + parseInt(vtrg3MaxTime) + parseInt(vtrg4MaxTime) + parseInt(vtrg5MaxTime));
        self.allTrgAvgMaxTime(parseInt(vtrg1AvgMaxTime) + parseInt(vtrg2AvgMaxTime) + parseInt(vtrg3AvgMaxTime) + parseInt(vtrg4AvgMaxTime) + parseInt(vtrg5AvgMaxTime));
        self.allTrgAvgMinTime(parseInt(vtrg1AvgMinTime) + parseInt(vtrg2AvgMinTime) + parseInt(vtrg3AvgMinTime) + parseInt(vtrg4AvgMinTime) + parseInt(vtrg5AvgMinTime));
        self.allTrgMinTime(parseInt(vtrg1MinTime) + parseInt(vtrg2MinTime) + parseInt(vtrg3MinTime) + parseInt(vtrg4MinTime) + parseInt(vtrg5MinTime));

        $('li.try_nums span').each(function () {
            //console.log($(this).text());
            if ($(this).text() == '0') {
                $(this).parent('li.try_nums').addClass('ani_stop');
            } else {
                $(this).parent('li.try_nums').removeClass('ani_stop');
            }
        });

    }, 1000);

    //nsWPs[Ns.sys_key] = allData;

    setTimeout(function () {
        $('#try_exta' + openedNS + ' .cnxMnuWp').each(function () {
            //console.log(mnuWPs);
            $(this).dxContextMenu({
                items: mnuWPs,
                target: $(this).next(),
                //position: { of: $(this).next() },
                //visible: mnuWPsVisible,
                itemClickAction: mnuWPsItemClicked,
                //invokeOnlyFromCode: true,
            });

        });

        $('#try_exta' + openedNS + ' .cnxMnuWpToTriage').each(function () {
            //console.log(mnuWPs);
            $(this).dxContextMenu({
                items: mnuWPsToTriaged,
                target: $(this).next(),
                //position: { of: $(this).next() },
                //visible: mnuWPsVisible,
                itemClickAction: mnuWPsToTriageItemClicked,
                //invokeOnlyFromCode: true,
            });

        });

    }, 1000);

    //});

    self.trg1Trt = ko.observable();
    self.trg2Trt = ko.observable();
    self.trg3Trt = ko.observable();
    self.trg4Trt = ko.observable();
    self.trg5Trt = ko.observable();
    self.TotalTrt = ko.observable();
    self.notOnBeds = ko.observable();
    self.occupiedBeds = ko.observable();
    self.freeBeds = ko.observable();
    self.vClean = ko.observable();
    self.vDirty = ko.observable();
    self.occMale = ko.observable();
    self.occFemale = ko.observable();



    //$.getJSON("BedManagementApiActions/Rooms/GetErRoomsWBedsWStatus?NS_id=" + self.sys_key() + "&startDate=" + currDate.toLocaleDateString() + "&uId=" + uId, function (allData) {
    //console.log("GetErRoomsWBedsWStatus Succeded");
    var mappedRoomsAndBeds = $.map(Ns.rooms, function (roomWBeds) { return new RoomAndBeds(roomWBeds) });
    //console.log("GetErRoomsWBedsWStatus After Mapping");
    self.roomsAndBeds(mappedRoomsAndBeds);
    self.RoomsFilter(mappedRoomsAndBeds);

    //console.log("GetErRoomsWBedsWStatus After Adding to observable");
    jsonRoomsAndBeds = self.roomsAndBeds();
    //console.log("GetErRoomsWBedsWStatus After JSON");

    var vtrg1Trt = 0;
    var vtrg2Trt = 0;
    var vtrg3Trt = 0;
    var vtrg4Trt = 0;
    var vtrg5Trt = 0;
    var vTotalTrt = 0;
    var vnotOnbeds = 0;
    var voccupiedBeds = 0;
    var vfreeBeds = 0;
    var vVClean = 0;
    var vVDirty = 0;
    var vOccMale = 0;
    var vOccFemale = 0;

    ko.computed(function () {

        vtrg1Trt = 0;
        vtrg2Trt = 0;
        vtrg3Trt = 0;
        vtrg4Trt = 0;
        vtrg5Trt = 0;
        vTotalTrt = 0;
        vnotOnbeds = 0;
        voccupiedBeds = 0;
        vfreeBeds = 0;
        vVClean = 0;
        vVDirty = 0;
        vOccMale = 0;
        vOccFemale = 0;

        ko.utils.arrayForEach(self.roomsAndBeds(), function (room) {

            ko.utils.arrayForEach(room.beds(), function (bed) {
                if (bed.patient_id() != 0) {
                    voccupiedBeds += 1;

                    if (bed.patient_sex() == 1) {
                        vOccMale += 1;
                    }
                    else if (bed.patient_sex() == 2) {
                        vOccFemale += 1;
                    }

                    if (bed.emr_status() == 1) {
                        vtrg1Trt += 1;
                    }
                    else if (bed.emr_status() == 2) {
                        vtrg2Trt += 1;
                    }
                    else if (bed.emr_status() == 3) {
                        vtrg3Trt += 1;
                    }
                    else if (bed.emr_status() == 4) {
                        vtrg4Trt += 1;
                    }
                    else if (bed.emr_status() == 5) {
                        vtrg5Trt += 1;
                    }
                }
                else {
                    vfreeBeds += 1;

                    //console.log(bed.statusName());
                    if (bed.statusName() == "vacant clean") {
                        vVClean += 1;
                    }
                    else if (bed.statusName() == "vacant dirty") {
                        vVDirty += 1;
                    }
                }

            });

            ko.utils.arrayForEach(room.notOnBeds(), function (bed) {
                vnotOnbeds += 1;

                if (bed.emr_status() == 1) {
                    vtrg1Trt += 1;
                }
                else if (bed.emr_status() == 2) {
                    vtrg2Trt += 1;
                }
                else if (bed.emr_status() == 3) {
                    vtrg3Trt += 1;
                }
                else if (bed.emr_status() == 4) {
                    vtrg4Trt += 1;
                }
                else if (bed.emr_status() == 5) {
                    vtrg5Trt += 1;
                }
            });

            vTotalTrt = voccupiedBeds + vnotOnbeds;
        });

        self.trg1Trt(vtrg1Trt);
        self.trg2Trt(vtrg2Trt);
        self.trg3Trt(vtrg3Trt);
        self.trg4Trt(vtrg4Trt);
        self.trg5Trt(vtrg5Trt);
        self.TotalTrt(vTotalTrt);
        self.notOnBeds(vnotOnbeds);
        self.occupiedBeds(voccupiedBeds);
        self.freeBeds(vfreeBeds);
        self.occMale(vOccMale);
        self.occFemale(vOccFemale);
        self.vClean(vVClean);
        self.vDirty(vVDirty);
    });

    MnuesAttached.push({ opened: false, nsId: self.sys_key() });




    self.RefreshAllTrt = function () {


        var allBedsAlerts = ko.observableArray([]);
        ko.utils.arrayForEach(self.roomsAndBeds(), function (room) {
            ko.utils.arrayForEach(room.beds(), function (bed) {
                ko.utils.arrayForEach(bed.bedAlerts(), function (alertBed) {
                    allBedsAlerts.push(alertBed);
                });
            });
        });





        //console.log(allBedsAlerts());

        $.getJSON("BedManagementApiActions/Rooms/GetErRoomsWBedsWStatus?NS_id=" + self.sys_key() + "&startDate=" + currDate.toLocaleDateString() + "&uId=" + uId, function (allData) {
            var mappedRoomsAndBeds = $.map(allData, function (roomWBeds) { return new RoomAndBeds(roomWBeds) });
            self.roomsAndBeds(mappedRoomsAndBeds);
            jsonRoomsAndBeds = self.roomsAndBeds();

            ko.utils.arrayForEach(self.roomsAndBeds(), function (room) {
                ko.utils.arrayForEach(room.beds(), function (bed) {
                    ko.utils.arrayForEach(allBedsAlerts(), function (allAlertBed) {
                        if (allAlertBed.patient_id() == bed.patient_id()) {
                            bed.bedAlerts.push(allAlertBed);
                        }
                    });
                });
            });

            var vtrg1Trt = 0;
            var vtrg2Trt = 0;
            var vtrg3Trt = 0;
            var vtrg4Trt = 0;
            var vtrg5Trt = 0;
            var vTotalTrt = 0;
            var vnotOnbeds = 0;
            var voccupiedBeds = 0;
            var vfreeBeds = 0;
            var vVClean = 0;
            var vVDirty = 0;
            var vOccMale = 0;
            var vOccFemale = 0;

            ko.computed(function () {

                vtrg1Trt = 0;
                vtrg2Trt = 0;
                vtrg3Trt = 0;
                vtrg4Trt = 0;
                vtrg5Trt = 0;
                vTotalTrt = 0;
                vnotOnbeds = 0;
                voccupiedBeds = 0;
                vfreeBeds = 0;
                vVClean = 0;
                vVDirty = 0;
                vOccMale = 0;
                vOccFemale = 0;

                ko.utils.arrayForEach(self.roomsAndBeds(), function (room) {

                    ko.utils.arrayForEach(room.beds(), function (bed) {
                        if (bed.patient_id() != 0) {
                            voccupiedBeds += 1;

                            if (bed.patient_sex() == 1) {
                                vOccMale += 1;
                            }
                            else if (bed.patient_sex() == 2) {
                                vOccFemale += 1;
                            }

                            if (bed.emr_status() == 1) {
                                vtrg1Trt += 1;
                            }
                            else if (bed.emr_status() == 2) {
                                vtrg2Trt += 1;
                            }
                            else if (bed.emr_status() == 3) {
                                vtrg3Trt += 1;
                            }
                            else if (bed.emr_status() == 4) {
                                vtrg4Trt += 1;
                            }
                            else if (bed.emr_status() == 5) {
                                vtrg5Trt += 1;
                            }
                        }
                        else {
                            vfreeBeds += 1;

                            //console.log(bed.statusName());
                            if (bed.statusName() == "vacant clean") {
                                vVClean += 1;
                            }
                            else if (bed.statusName() == "vacant dirty") {
                                vVDirty += 1;
                            }
                        }

                    });

                    ko.utils.arrayForEach(room.notOnBeds(), function (bed) {
                        vnotOnbeds += 1;

                        if (bed.emr_status() == 1) {
                            vtrg1Trt += 1;
                        }
                        else if (bed.emr_status() == 2) {
                            vtrg2Trt += 1;
                        }
                        else if (bed.emr_status() == 3) {
                            vtrg3Trt += 1;
                        }
                        else if (bed.emr_status() == 4) {
                            vtrg4Trt += 1;
                        }
                        else if (bed.emr_status() == 5) {
                            vtrg5Trt += 1;
                        }
                    });

                    vTotalTrt = voccupiedBeds + vnotOnbeds;
                });

                self.trg1Trt(vtrg1Trt);
                self.trg2Trt(vtrg2Trt);
                self.trg3Trt(vtrg3Trt);
                self.trg4Trt(vtrg4Trt);
                self.trg5Trt(vtrg5Trt);
                self.TotalTrt(vTotalTrt);
                self.notOnBeds(vnotOnbeds);
                self.occupiedBeds(voccupiedBeds);
                self.freeBeds(vfreeBeds);
                self.occMale(vOccMale);
                self.occFemale(vOccFemale);
                self.vClean(vVClean);
                self.vDirty(vVDirty);
            });

            UpdateMnuWps(self);



        });

    };

    self.RefreshWP = function () {
        $("#loader-wrapper").fadeIn("slow", function () {
            $("#loader-wrapper").show();
        });

        $.getJSON("BedManagementApiActions/WaitingPatients/GetWpByERNs?NS_id=" + openedNS + "&hospId=" + hospitalid, function (allData) {
            var mappedWaitingPatients = $.map(allData, function (Wp) { return new WaitingPatient(Wp) });

            ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                if (ns.sys_key() == openedNS) {
                    ns.waitingPatients(mappedWaitingPatients);
                }
            });
            UpdateMnuWps(self);

            $("#loader-wrapper").fadeIn("slow", function () {
                $("#loader-wrapper").hide();
            });



        });


    };

    self.currentNS = ko.observable();
    //console.log(i + ' ' + nsOPTs[i]);
    //self.currResources = nsOPTs[i];

    self.collapseNS = function (Ns, event) {


        if ($($('#nsWp' + self.sys_key()).parents(3)[2]).hasClass('panelfullwidthSel')) {
            //$('#imgNSColl' + self.sys_key()).attr('src', 'images/expand_arrow_alt.png');
            $($('#nsWp' + self.sys_key()).parent()[0]).slideUp();
            //console.log($('#nsWp' + self.sys_key()).parents(3));
            $($('#nsWp' + self.sys_key()).parents(3)[2]).attr("class", "panelfullwidthS");

            $('table[data-area="sec_header_area"]').hide();
            $('table[data-area="main_header_area"]').show();
            //clearInterval(chartWPsUpdateInterval);
            //console.log("if");

            //$('html,body').animate({ scrollTop: $($('#nsWp' + self.sys_key()).parent()[0]).prev().children("table[data-area='main_header_area']").offset().top - 43 }, 800);
        }
        else {
            //console.log("else");

            //$('[id^="imgNSColl"]').attr('src', 'images/expand_arrow_alt.png');

            //$('.panelfullwidthSel')



            // add by khalifa  to close two open ns 
            for (i = 0; i < vm.nursestations().length; i++) {
                if (vm.nursestations()[i].sys_key() != self.sys_key()) {

                    $($('#nsWp' + vm.nursestations()[i].sys_key()).parent()[0]).slideUp();
                    //console.log($('#nsWp' + self.sys_key()).parents(3));
                    $($('#nsWp' + vm.nursestations()[i].sys_key()).parents(3)[2]).attr("class", "panelfullwidthS");

                    $('table[data-area="sec_header_area"]').hide();
                    $('table[data-area="main_header_area"]').show();
                }


            }

            $('.panelfullwidthSel').attr("class", "panelfullwidthS");
            $('.accContent').slideUp();

            $('table[data-area="sec_header_area"]').hide();
            $('table[data-area="main_header_area"]').show();

            //$('#imgNSColl' + self.sys_key()).attr('src', 'images/collapse_arrow_alt.png');
            $($('#nsWp' + self.sys_key()).parent()[0]).slideDown();
            //console.log($('#nsWp' + self.sys_key()).parents(3));
            $($('#nsWp' + self.sys_key()).parents(3)[2]).attr("class", "panelfullwidthSel");
            $($('#nsWp' + self.sys_key()).parent()[0]).prev().children("table[data-area='sec_header_area']").show();
            $($('#nsWp' + self.sys_key()).parent()[0]).prev().children("table[data-area='main_header_area']").hide();

            //$('html,body').animate({ scrollTop: $($('#nsWp' + self.sys_key()).parent()[0]).prev().children("table[data-area='sec_header_area']").offset().top + 0 }, 800);

            self.currentNS(Ns);
            vm.SelectedERNs(Ns);
            openedNS = self.sys_key();
            for (i = 0; i < vm.nursestations().length; i++) {
                if (vm.nursestations()[i].sys_key() == openedNS) {
                    IndexNS = i;
                    break;
                }
            }

            $("#loader-wrapper").fadeIn("slow", function () {
                $("#loader-wrapper").show();
            });
            $.getJSON("BedManagementApiActions/WaitingPatients/GetERShiftDoctors?hospId=" + hospitalid, function (allData) {
                var mappedErDoctors = $.map(allData, function (dr) { return new ErDoctors(dr) });
                jsonErDoctors = allData;
                //console.log(jsonErDoctors);

                self.erDoctors(mappedErDoctors);
            });

            var chartWPs = $("#chartWPs" + openedNS).dxChart("instance");
            if (chartWPs != undefined)
                chartWPs.render();

            var chartTrts = $("#chartTrts" + openedNS).dxChart("instance");
            if (chartTrts != undefined)
                chartTrts.render();

            var chartBeds = $("#chartBeds" + openedNS).dxPieChart("instance");
            if (chartBeds != undefined)
                chartBeds.render();

            UpdateMnuWps(Ns);
            $("#loader-wrapper").fadeIn("slow", function () {
                $("#loader-wrapper").hide();
            });

            // khalifa
            //tocheck
            $("#txtWpSearch" + openedNS).keyup(function () {
                if ($(this).val() != "") {
                    var rows = $("#tblWP" + openedNS + " tbody").find("tr").hide();
                    var data = $(this).val().split(" ");
                    $.each(data, function (i, v) {
                        rows.find("td:nth-child(5)").filter(":containsIN('" + v + "')").parent().show();
                        rows.find("td:nth-child(5)").filter(":containsIN('" + v + "')").parent().prev().show();
                        rows.find("td:nth-child(6)").filter(":containsIN('" + v + "')").parent().show();
                        rows.find("td:nth-child(6)").filter(":containsIN('" + v + "')").parent().prev().show();
                    });
                }
                else
                    var rows = $("#tblWP" + openedNS + " tbody").find("tr").show();

            });

            //    const table = document.getElementById("my-table");



            ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                if (ns.sys_key() == openedNS) {

            const input = document.getElementById("txtTrtSearch" + openedNS);
            input.addEventListener("keyup", function () {

  

                var table = $("#roomId" + ns.roomsAndBeds()[0].room_key()).find("tbody tr").next();
                const value = this.value.toLowerCase().trim();

                if (value != "") {
                    for (let i = 0; i < table.length; i++) {

                        const rowData = table[i].textContent.toLowerCase();
                        if (rowData.indexOf(value) > -1) {
                            table[i].style.display = "";
                        } else {
                            table[i].style.display = "none";
                        }
                    }

                }
            })

            }


                


            })

              

           





        


          /*  $("#txtTrtSearch" + openedNS).keyup(function () {
                //console.log(.parents(2).next().children().first().find("tbody tr"));
                if ($(this).val() != "") {
                    var rows = $(this).parents(2).next().children().find("tbody tr").hide();
                    var data = $(this).val().split(" ");
                    $.each(data, function (i, v) {
                        rows.find("td:contains('" + v + "')").parent().show();
                        rows.find("td:contains('" + v + "')").parent().prev().show();

                        *//*                      rows.find("td:nth-child(3)").filter(":containsIN('" + v + "')").parent().show();
                                                rows.find("td:nth-child(3)").filter(":containsIN('" + v + "')").parent().prev().show();
                                                rows.find("td:nth-child(4)").filter(":containsIN('" + v + "')").parent().show();
                                                rows.find("td:nth-child(4)").filter(":containsIN('" + v + "')").parent().prev().show();*//*
                    });
                }
                else
                    var rows = $(this).parents(2).next().children().first().find("tbody tr").show();

            });
*/
            if (vw == 0) {

            }
            else if (vw == 1) {
                $("div[data-original-title='Minimize']").parent().css("cssText", "display:none !important;");
                $("#try_extb" + Ns.sys_key()).hide();
                $("#try_exta" + Ns.sys_key()).attr("class", "col-md-10");

            }
            else if (vw == 2) {
                $("div[data-original-title='Minimize']").parent().css("cssText", "display:none !important;");
                //$("div[data-original-title='Minimize']").each(function () {
                //    console.log($(this).parent());
                //    $(this).parent().css("cssText", "display:none !important;");
                //});
                $("div[data-original-title='Minimize']").parent().css("cssText", "display:none !important;");
                $("#try_exta" + Ns.sys_key()).hide();
                $("#try_extb" + Ns.sys_key()).attr("class", "col-md-10");
            }
            else {

            }

            //if (!isInitialReceivCalled) {
            //    chat.invoke('GetInitialReceive', uId, "WhiteBoard");
            //    isInitialReceivCalled = true;
            //}

            $("#myTrt" + openedNS).change(function () {
                if ($(this).prop('checked') === true) {
                    var rows = $("#erPatients table tbody").find("tr").hide();
/*
                    console.log($("#erPatients table tbody").find("tr"))
                    console.log(rows.find("td:nth-child(7)").filter(":containsIN('" + uId + "')"))
                    console.log(uId)*/

                    // edit by khalifa replace 7 to 14 because increase some column
                    rows.find("td:nth-child(14)").filter(":containsIN('" + uId + "')").parent().show();
                    rows.find("td:nth-child(6)").filter(":containsIN('" + uId + "')").parent().show();
                }
                else
                    var rows = $("#erPatients table tbody").find("tr").show();
            });

            $.ajax({
                timeout: 30000,
                url: "BedManagementApiActions/WaitingPatients/GetInitialReceive?CategoryName=ER ALERTS",
                success: function (objBedsAlerts) {
                    console.log("GetInitialReceive");
                    //console.log(objBedsAlerts);
                    //ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                    //if (ns.sys_key() == openedNS) {
                    //console.log(ns.roomsAndBeds().length);
                    ko.utils.arrayForEach(self.roomsAndBeds(), function (room) {
                        //console.log(room.room_key());
                        ko.utils.arrayForEach(room.beds(), function (bed) {
                            //console.log(bed.sys_key());
                            //console.log(bed.patient_id());

                            if ($.isEmptyObject(objBedsAlerts) == false) {
                                $.each(objBedsAlerts, function (indexR, valueR) {
                                    //console.log(objBedsAlerts[indexR]);
                                    var isUpper;
                                    if (objBedsAlerts[indexR].patient_id == undefined)
                                        isUpper = true;
                                    else
                                        isUpper = false;

                                    if (isUpper == false) {

                                        if (objBedsAlerts[indexR] != undefined) {
                                            //console.log(bed.latin_desc() + '  ||  ' + bed.patient_id() + ' || ' + objBedsAlerts[indexR].patient_id);
                                            if (bed.patient_id() == objBedsAlerts[indexR].patient_id) {
                                                //console.log(objBedsAlerts[indexR].patient_id);
                                                //console.log(objBedsAlerts[indexR].tooltip);
                                                if (objBedsAlerts[indexR].add_or_remove == "Add") {
                                                    //console.log(objBedsAlerts[indexR].patient_id);
                                                    //console.log(objBedsAlerts[indexR].tooltip);
                                                    var alertExist = false;
                                                    ko.utils.arrayForEach(bed.bedAlerts(), function (alertBed) {
                                                        //console.log(alertBed.alert_name().toLowerCase().trim() + '         ' + alertBed.tooltip() + '======' + objBedsAlerts[indexR].alert_name.toLowerCase().trim() + '         ' + objBedsAlerts[indexR].tooltip);
                                                        if (alertBed.alert_name().toLowerCase().trim() == objBedsAlerts[indexR].alert_name.toLowerCase().trim()) {

                                                            var tooltips = alertBed.tooltip().toLowerCase().split('\n');

                                                            var tooltipExists = false;
                                                            for (i = 0; i < tooltips.length; i++) {
                                                                //console.log(tooltips[i].toLowerCase() + '      ' + objBedsAlerts[indexR].tooltip.toLowerCase());
                                                                if (tooltips[i].toLowerCase() == objBedsAlerts[indexR].tooltip.toLowerCase()) {
                                                                    tooltipExists = true;
                                                                    break;
                                                                }
                                                            }

                                                            if (tooltipExists == false)
                                                                alertBed.tooltip(alertBed.tooltip() + '\n' + objBedsAlerts[indexR].tooltip);

                                                            alertExist = true;
                                                        }
                                                    });

                                                    if (alertExist == false)
                                                        bed.bedAlerts.push(new BedAlerts(objBedsAlerts[indexR]));

                                                }
                                                else {
                                                    try {
                                                        if (alertBed.alert_name().toLowerCase() == objBedsAlerts[indexR].alert_name.toLowerCase()) {
                                                            bed.bedAlerts.remove(alertBed);
                                                        }
                                                    }
                                                    catch (ex) { }
                                                }
                                            }
                                            //console.log(bed.bedAlerts());
                                        }
                                    }
                                    else {
                                        if (objBedsAlerts[indexR] != undefined) {
                                            //console.log(bed.latin_desc() + '  ||  ' + bed.patient_id() + ' || ' + objBedsAlerts[indexR].PATIENT_ID);
                                            if (bed.patient_id() == objBedsAlerts[indexR].PATIENT_ID) {
                                                //console.log(objBedsAlerts[indexR].PATIENT_ID);
                                                //console.log(objBedsAlerts[indexR].TOOLTIP);
                                                if (objBedsAlerts[indexR].ADD_OR_REMOVE == "Add") {
                                                    //console.log(objBedsAlerts[indexR].PATIENT_ID);
                                                    //console.log(objBedsAlerts[indexR].TOOLTIP);
                                                    var alertExist = false;
                                                    ko.utils.arrayForEach(bed.bedAlerts(), function (alertBed) {
                                                        //console.log(alertBed.alert_name().toLowerCase().trim() + '         ' + alertBed.tooltip() + '======' + objBedsAlerts[indexR].alert_name.toLowerCase().trim() + '         ' + objBedsAlerts[indexR].tooltip);
                                                        if (alertBed.alert_name().toLowerCase().trim() == objBedsAlerts[indexR].ALERT_NAME.toLowerCase().trim()) {

                                                            var tooltips = alertBed.tooltip().toLowerCase().split('\n');

                                                            var tooltipExists = false;
                                                            for (i = 0; i < tooltips.length; i++) {
                                                                //console.log(tooltips[i].toLowerCase() + '      ' + objBedsAlerts[indexR].tooltip.toLowerCase());
                                                                if (tooltips[i].toLowerCase() == objBedsAlerts[indexR].TOOLTIP.toLowerCase()) {
                                                                    tooltipExists = true;
                                                                    break;
                                                                }
                                                            }

                                                            if (tooltipExists == false)
                                                                alertBed.tooltip(alertBed.tooltip() + '\n' + objBedsAlerts[indexR].TOOLTIP);

                                                            alertExist = true;
                                                        }
                                                    });

                                                    if (alertExist == false)
                                                        bed.bedAlerts.push(new BedAlerts(objBedsAlerts[indexR]));

                                                }
                                                else {
                                                    if (alertBed.alert_name().toLowerCase() == objBedsAlerts[indexR].ALERT_NAME.toLowerCase()) {
                                                        bed.bedAlerts.remove(alertBed);
                                                    }
                                                }
                                            }
                                            //console.log(bed.bedAlerts());
                                        }
                                    }

                                });
                            }

                        });
                    });
                    //}
                    //});

                },
                global: false,     // this makes sure ajaxStart is not triggered
                dataType: 'json',
            });

            //$('#tblWP762').tablesorter();
        }
    };

    this.collapseAllNS = function (Ns, event) {
    };

    self.obsChartWPSource = ko.computed(function () {
        var obsArray = ko.observableArray([{ triage: 'Not Triaged', st: self.notTrgMinTime(), nd: self.notTrgAvgMinTime(), rd: self.notTrgAvgMaxTime(), th: self.notTrgMaxTime() }]);
        var counter = 0;
        try {
            ko.utils.arrayForEach(vm.triageLevels(), function (tl) {
                counter++;
                switch (counter) {
                    case 1:
                        obsArray.push({ triage: tl.latin_desc(), st: self.trg1MinTime(), nd: self.trg1AvgMinTime(), rd: self.trg1AvgMaxTime(), th: self.trg1MaxTime() });
                        break;
                    case 2:
                        obsArray.push({ triage: tl.latin_desc(), st: self.trg2MinTime(), nd: self.trg2AvgMinTime(), rd: self.trg2AvgMaxTime(), th: self.trg2MaxTime() });
                        break;
                    case 3:
                        obsArray.push({ triage: tl.latin_desc(), st: self.trg3MinTime(), nd: self.trg3AvgMinTime(), rd: self.trg3AvgMaxTime(), th: self.trg3MaxTime() });
                        break;
                    case 4:
                        obsArray.push({ triage: tl.latin_desc(), st: self.trg4MinTime(), nd: self.trg4AvgMinTime(), rd: self.trg4AvgMaxTime(), th: self.trg4MaxTime() });
                        break;
                    case 5:
                        obsArray.push({ triage: tl.latin_desc(), st: self.trg5MinTime(), nd: self.trg5AvgMinTime(), rd: self.trg5AvgMaxTime(), th: self.trg5MaxTime() });
                        break;
                }
            });
        }
        catch (err) { }
        return obsArray;
    });








    self.chartWPOptions = {
        dataSource: self.obsChartWPSource,
        equalBarWidth: false,
        //title: {
        //    font: {
        //        //color: 'steelblue',
        //        //family: 'Zapf-Chancery, cursive',
        //        opacity: 1,
        //        size: 15,
        //        //weight: 400
        //    },
        //    text: 'Waiting Patients',

        //},
        //size: {
        //    height: 275,
        //    width: 200
        //},
        tooltip: {
            enabled: false,
            location: "edge",
            customizeText: function () {
                return this.seriesName + " = " + this.valueText;
            }
        },
        commonSeriesSettings: {
            type: 'stackedBar',
            label: {
                position: 'inside',
                visible: true,
                showForZeroValues: false,
                backgroundColor: 'transparent',
                font: {
                    //color: 'steelblue',
                    //family: 'Zapf-Chancery, cursive',
                    //opacity: 1,
                    //size: 10,
                    //weight: 400
                },
            },
            //border: {
            //    visible: false,
            //    width: 1,
            //    color: 'white',

            //},
        },
        customizeLabel: function (bar) {
            //if (bar.value == 0) {
            //    return { visible: false }
            //}
        },
        //equalBarWidth: {
        //    width: 8,
        //    spacing: 2
        //},
        series: [{
            name: '00-' + ERstartTime,
            argumentField: 'triage',
            valueField: 'st',
            color: '#00DD2F',
        }, {
            name: ERstartTime + '-' + ERavgTime,
            argumentField: 'triage',
            valueField: 'nd',
            color: '#FFDC08',
        }, {
            name: ERavgTime + '-' + ERmaxTime,
            argumentField: 'triage',
            valueField: 'rd',
            color: '#FF0000',
        }, {
            name: '+' + ERmaxTime,
            argumentField: 'triage',
            valueField: 'th',
            color: '#C90707',
        }],
        valueAxis: {
            visible: false,
            opacity: .5,
            minValueMargin: 1,
        },
        argumentAxis: {
            visible: false,
            opacity: .5
        },
        legend: {
            visible: false,
            verticalAlignment: "bottom",
            horizontalAlignment: "center",
            maxHorizontalPercentage: "100",
            //horizontalAlignment: "right",
            //position: "inside",
            //border: { visible: true }
        },

    };

    self.obsChartTrtSource = ko.computed(function () {
        var obsArray = ko.observableArray([]);
        var counter = 0;
        try {
            if (triageLevelsCount == 3) {
                obsArray.push({ Triage: 'Triage', t1: vm.triageLevels()[0].latin_desc(), c1: self.trg1Trt(), t2: vm.triageLevels()[1].latin_desc(), c2: self.trg2Trt(), t3: vm.triageLevels()[2].latin_desc(), c3: self.trg3Trt() });
            }
            else {
                obsArray.push({ Triage: 'Triage', t1: vm.triageLevels()[0].latin_desc(), c1: self.trg1Trt(), t2: vm.triageLevels()[1].latin_desc(), c2: self.trg2Trt(), t3: vm.triageLevels()[2].latin_desc(), c3: self.trg3Trt(), t4: vm.triageLevels()[3].latin_desc(), c4: self.trg4Trt(), t5: vm.triageLevels()[4].latin_desc(), c5: self.trg5Trt() });
            }
        }
        catch (err) { }
        return obsArray;
    });

    if (triageLevelsCount == 3) {
        self.chartTrtOptions = {
            dataSource: self.obsChartTrtSource,
            equalBarWidth: false,
            //title: {
            //    font: {
            //        //color: 'steelblue',
            //        //family: 'Zapf-Chancery, cursive',
            //        opacity: 1,
            //        size: 15,
            //        //weight: 400
            //    },
            //    text: 'Treatment Patients',
            //},        
            commonSeriesSettings: {
                type: 'bar',

                label: {
                    position: 'inside',
                    visible: true,
                    showForZeroValues: false,
                    backgroundColor: 'transparent',
                    font: {
                        //color: 'steelblue',
                        //family: 'Zapf-Chancery, cursive',
                        //opacity: 1,
                        //size: 10,
                        //weight: 400
                    },
                },
                //border: {
                //    visible: false,
                //    width: 2,
                //    color: 'white',
                //},
            },
            customizeLabel: function (bar) {
                //if (bar.value == 0) {
                //    return { visible: false }
                //}
            },
            //equalBarWidth: {
            //    width: 15,
            //    spacing: 2
            //},
            series: [{
                name: 'C1',
                argumentField: 't1',
                valueField: 'c1',
                color: GetColorByStatus(1),
            }, {
                name: 'C2',
                argumentField: 't2',
                valueField: 'c2',
                color: GetColorByStatus(2),
            }, {
                name: 'C3',
                argumentField: 't3',
                valueField: 'c3',
                color: GetColorByStatus(3),
            }],
            valueAxis: {
                visible: false,
                opacity: .5,
                minValueMargin: 1,
            },
            argumentAxis: {
                visible: false,
                opacity: .5
            },
            legend: {
                visible: false,
                //verticalAlignment: 'bottom',
                //horizontalAlignment: 'center'
            },

        };
    }
    else {
        self.chartTrtOptions = {
            dataSource: self.obsChartTrtSource,
            equalBarWidth: false,
            //title: {
            //    font: {
            //        //color: 'steelblue',
            //        //family: 'Zapf-Chancery, cursive',
            //        opacity: 1,
            //        size: 15,
            //        //weight: 400
            //    },
            //    text: 'Treatment Patients',
            //},        
            commonSeriesSettings: {
                type: 'bar',

                label: {
                    position: 'inside',
                    visible: true,
                    showForZeroValues: false,
                    backgroundColor: 'transparent',
                    font: {
                        //color: 'steelblue',
                        //family: 'Zapf-Chancery, cursive',
                        //opacity: 1,
                        //size: 10,
                        //weight: 400
                    },
                },
                //border: {
                //    visible: false,
                //    width: 2,
                //    color: 'white',
                //},
            },
            customizeLabel: function (bar) {
                //if (bar.value == 0) {
                //    return { visible: false }
                //}
            },
            //equalBarWidth: {
            //    width: 15,
            //    spacing: 2
            //},
            series: [{
                name: 'C1',
                argumentField: 't1',
                valueField: 'c1',
                color: GetColorByStatus(1),
            }, {
                name: 'C2',
                argumentField: 't2',
                valueField: 'c2',
                color: GetColorByStatus(2),
            }, {
                name: 'C3',
                argumentField: 't3',
                valueField: 'c3',
                color: GetColorByStatus(3),
            }, {
                name: 'C4',
                argumentField: 't4',
                valueField: 'c4',
                color: GetColorByStatus(4),
            }, {
                name: 'C5',
                argumentField: 't5',
                valueField: 'c5',
                color: GetColorByStatus(5),
            }],
            valueAxis: {
                visible: false,
                opacity: .5,
                minValueMargin: 1,
            },
            argumentAxis: {
                visible: false,
                opacity: .5
            },
            legend: {
                visible: false,
                //verticalAlignment: 'bottom',
                //horizontalAlignment: 'center'
            },

        };
    }

    self.obsChartBedSource = ko.computed(function () {
        var obsArray = ko.observableArray([{ beds: 'V. Clean', count: self.freeBeds() },
        { beds: 'V. Dirty', count: self.vDirty() },
        { beds: 'Male', count: self.occMale() },
        { beds: 'Female', count: self.occFemale() }]);

        return obsArray;
    });

    self.chartBedOptions = {
        dataSource: self.obsChartBedSource,
        //title: {
        //    font: {
        //        //color: 'steelblue',
        //        //family: 'Zapf-Chancery, cursive',
        //        opacity: 1,
        //        size: 15,
        //        //weight: 400
        //    },

        //    text: 'Beds',

        //},
        tooltip: {
            enabled: false,
            //percentPrecision: 2,
            //customizeTooltip: function (value) {
            //    return {
            //        text: value.percentText
            //    };
            //}
        },
        label: {
            position: 'inside',
            visible: true,
            showForZeroValues: false,
            backgroundColor: 'transparent',
            font: {
                //color: 'steelblue',
                //family: 'Zapf-Chancery, cursive',
                //opacity: 1,
                //size: 10,
                //weight: 400
            },
        },
        series: [{
            type: 'doughnut',
            name: 'Beds',
            argumentField: 'beds',
            valueField: 'count',
            label: {
                position: 'inside',
                visible: true
            },
            //color: 'color',
            //label: {
            //    visible: true
            //}
        }],
        palette: ['rgb(113, 168, 67)', '#ff7c00', '#74d0f4', '#ee8090'],
        legend: {
            visible: false,
            verticalAlignment: 'bottom',
            horizontalAlignment: 'center'
        },

    };

    self.FilterByAlerts = function (alertName) {
        ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
            //console.log(room.room_key());
            ko.utils.arrayForEach(room.beds(), function (bed) {
                var hasAlert = false;
                ko.utils.arrayForEach(bed.bedAlerts(), function (alertBed) {
                    //console.log(alertBed.alert_name().toLowerCase().trim() + '         ' + alertBed.tooltip() + '======' + objBedsAlerts[indexR].alert_name.toLowerCase().trim() + '         ' + objBedsAlerts[indexR].tooltip);
                    if (alertBed.alert_name().toLowerCase().trim() == alertName) {
                        hasAlert = true;
                    }
                });

                if (!hasAlert)
                    console.log(bed.target);
            });
        });
    }
}




function dxMnuWP_Showing(WP) {
    if (!(WP.emr_status() == "0" || WP.emr_status() == "10" || WP.emr_status() == null)) {
        $.each(mnuWPs, function (i, val) {
            if (val.text.startsWith("Transfer")) {
                //if (vm.nursestations().length == 1) {
                //    //val.visible = false;
                //}
                //else {
                $.each(val.items, function (j, v) {
                    if (v.id == openedNS)
                        v.visible = false;
                    else
                        v.visible = true;
                });
                //}
            }
        });

        if (WP != null && WP.patient_id() != null && WP.patient_id() != 0) {
            //console.log('#cxWPToTriage' + WP.patient_id());
            try {
                dxMnuWP = $('#cxWP' + WP.patient_id()).dxContextMenu("instance");
            }
            catch (ex) {
                $('#cxWP' + WP.patient_id()).dxContextMenu({
                    items: mnuWPs,
                    target: $('#cxWP' + WP.patient_id()),
                    //position: { of: $(this).next() },
                    //visible: mnuWPsVisible,
                    itemClickAction: mnuWPsItemClicked,
                    //invokeOnlyFromCode: true,
                });
                dxMnuWP = $('#cxWP' + WP.patient_id()).dxContextMenu("instance");
            }
            dxMnuWP.repaint();
        }
    }
}

// Craete  Function By Khalifa
function CheckDiscrgeTest(bed) {
    $.getJSON("BedManagementApiActions/WaitingPatients/CheckDischarge?episodkey=" + bed.episodekey(), function (allData) {

        var disstatus = 0;
        disstatus = allData;
        if (allData == 0) {
            $(".dx-menu-item-text").filter(":containsIN('Discharge Order')").parent().parent().attr("data-toggle", "modal");
            $(".dx-menu-item-text").filter(":containsIN('Discharge Order')").parent().parent().attr("data-target", "#diagStatus");
        }

    });

}

function dxMnuTrtOnBed_Showing(bed) {


    if (bed.admitted() == 1) {
        $.each(mnuTrtmsOnBed, function (key, value) {
            if (value != undefined) {
                if (mnuTrtmsOnBed[key].text.startsWith("Request"))
                    mnuTrtmsOnBed[key].visible = false;
                else if (mnuTrtmsOnBed[key].text.startsWith("Cancel"))
                    mnuTrtmsOnBed[key].visible = false;
            }
        });
    }
    else {
        if (bed.admissionrequested() > 0) {
            $.each(mnuTrtmsOnBed, function (key, value) {
                if (mnuTrtmsOnBed[key].text.startsWith("Request"))
                    mnuTrtmsOnBed[key].visible = false;
                else if (mnuTrtmsOnBed[key].text.startsWith("Cancel"))
                    mnuTrtmsOnBed[key].visible = true;
            });
        }
        else {
            $.each(mnuTrtmsOnBed, function (key, value) {
                if (mnuTrtmsOnBed[key].text.startsWith("Request"))
                    mnuTrtmsOnBed[key].visible = true;
                else if (mnuTrtmsOnBed[key].text.startsWith("Cancel"))
                    mnuTrtmsOnBed[key].visible = false;
            });
        }
    }

    //console.log(mnuTrtmsOnBed);

    $.each(mnuTrtmsOnBed, function (i, val) {
        if (val.text.startsWith("Transfer to")) {
            //if (vm.nursestations().length == 1) {
            //    //val.visible = false;
            //}
            //else {
            $.each(val.items, function (j, v) {
                if (v.id == openedNS)
                    v.visible = false;
                else
                    v.visible = true;
            });
            //}
        }
    });

    if (bed.seenbyerdoctor_time() == null || bed.seenbyerdoctor_time() == '') {
        $.each(mnuTrtmsOnBed, function (key, value) {
            if (value != undefined) {
                if (mnuTrtmsOnBed[key].text.startsWith("Patient Medical") && (!(mnuTrtmsOnBed[key].text.endsWith(" (start examination)"))))
                    mnuTrtmsOnBed[key].text = mnuTrtmsOnBed[key].text + " (start examination)";
                //if (mnuTrtmsOnBed[key].text.startsWith("Patient Medical") && mnuTrtmsOnBed[key].iconSrc == 'images/Patient-Medical-Record.png')
                //    mnuTrtmsOnBed[key].iconSrc == 'images/Request-for-Admission.png';
            }
        });
    }
    else {
        $.each(mnuTrtmsOnBed, function (key, value) {
            if (value != undefined) {
                if (mnuTrtmsOnBed[key].text.startsWith("Patient Medical") && mnuTrtmsOnBed[key].text.endsWith(" (start examination)"))
                    mnuTrtmsOnBed[key].text = mnuTrtmsOnBed[key].text.replace(" (start examination)", "");
                //if (mnuTrtmsOnBed[key].text.startsWith("Patient Medical") && mnuTrtmsOnBed[key].iconSrc == 'images/Request-for-Admission.png')
                //    mnuTrtmsOnBed[key].iconSrc == 'images/Patient-Medical-Record.png';
            }
        });
    }

    if (bed.patient_id() != null && bed.patient_id() != 0) {
        dxMnuTrtOnBed = $('#cxOnBed' + bed.sys_key()).dxContextMenu("instance");
        dxMnuTrtOnBed.repaint();
    }
}

function dxMnuTrtNotOnBed_Showing(notOnBed) {
    //console.log(notOnBed.admissionrequested());
    if (notOnBed.admitted() == 1) {
        $.each(mnuTrtmsNotOnBed, function (key, value) {
            if (value != undefined) {
                //console.log(mnuTrtmsNotOnBed[key]);
                if (mnuTrtmsNotOnBed[key].text.startsWith("Request"))
                    mnuTrtmsNotOnBed[key].visible = false;
                else if (mnuTrtmsNotOnBed[key].text.startsWith("Cancel"))
                    mnuTrtmsNotOnBed[key].visible = false;
            }
        });
    }
    else {
        if (notOnBed.admissionrequested() > 0) {
            $.each(mnuTrtmsNotOnBed, function (key, value) {
                if (value != undefined) {
                    //console.log(mnuTrtmsNotOnBed[key]);
                    if (mnuTrtmsNotOnBed[key].text.startsWith("Request"))
                        mnuTrtmsNotOnBed[key].visible = false;
                    else if (mnuTrtmsNotOnBed[key].text.startsWith("Cancel"))
                        mnuTrtmsNotOnBed[key].visible = true;
                }
            });
        }
        else {
            $.each(mnuTrtmsNotOnBed, function (key, value) {
                if (value != undefined) {
                    //console.log(mnuTrtmsNotOnBed[key]);
                    if (mnuTrtmsNotOnBed[key].text.startsWith("Request"))
                        mnuTrtmsNotOnBed[key].visible = true;
                    else if (mnuTrtmsNotOnBed[key].text.startsWith("Cancel"))
                        mnuTrtmsNotOnBed[key].visible = false;
                }
            });
        }
    }


    //console.log(mnuTrtmsNotOnBed);
    $.each(mnuTrtmsNotOnBed, function (i, val) {
        if (val.text.startsWith("Transfer to")) {
            //if (vm.nursestations().length == 1) {
            //val.visible = false;
            //}
            //else {
            $.each(val.items, function (j, v) {
                if (v.id == openedNS)
                    v.visible = false;
                else
                    v.visible = true;
            });
            //}
        }
    });

    if (notOnBed.seenbyerdoctor_time() == null || notOnBed.seenbyerdoctor_time() == '') {
        $.each(mnuTrtmsNotOnBed, function (key, value) {
            if (value != undefined) {
                if (mnuTrtmsNotOnBed[key].text.startsWith("Patient Medical") && (!(mnuTrtmsNotOnBed[key].text.endsWith(" (start examination)"))))
                    mnuTrtmsNotOnBed[key].text = mnuTrtmsNotOnBed[key].text + " (start examination)";
            }
        });
    }
    else {
        $.each(mnuTrtmsNotOnBed, function (key, value) {
            if (value != undefined) {
                if (mnuTrtmsNotOnBed[key].text.startsWith("Patient Medical") && mnuTrtmsNotOnBed[key].text.endsWith(" (start examination)"))
                    mnuTrtmsNotOnBed[key].text = mnuTrtmsNotOnBed[key].text.replace(" (start examination)", "");
            }
        });
    }

    dxMnuTrtNotOnBed = $('#cxNotOnBed' + notOnBed.patient_id()).dxContextMenu("instance");
    dxMnuTrtNotOnBed.repaint();
}

function selectBed(SBedKey) {
    BedSelected = SBedKey;
    if (moveInfo != "MoveBedtoBed") {
        if (moveInfo == "HPtoBed") {
            if (NoRoster == 1) {

                var frombk = selectedNotOnBed.sys_key();
                var pId = selectedNotOnBed.patient_id();
                var ek = selectedNotOnBed.episodekey();
                var sKey = selectedNotOnBed.clinickey();
                var pName = selectedNotOnBed.patengname();
                var docId = selectedNotOnBed.physician_key();
                var seen = selectedNotOnBed.seenbyerdoctor_time();
                var bk = BedSelected;
                selectedWP = selectedBed;
                MoveHPToBed(uId, BedSelected, sKey, pId, ek);
       
                return;
            }
            else {
                $('#diagDoctors').modal('show');
            }
        }
        else {
            $('#diagDoctors').modal('show');
        }
    }
    else {


        var frombk = selectedBed.sys_key();
        var pId = selectedBed.patient_id();
        var ek = selectedBed.episodekey();
        var sKey = selectedBed.clinickey();
        var pName = selectedBed.patengname();
        var docId = selectedBed.physician_key();
        var seen = selectedBed.seenbyerdoctor_time();
        var bk = BedSelected;
        selectedWP = selectedBed;
        console.log(selectedBed)
        $("#loader-wrapper").fadeIn("slow", function () {
            $("#loader-wrapper").show();
        });
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "BedManagementApiActions/WaitingPatients/MoveBedtoBed?pId=" + pId + "&ek=" + ek + "&bk=" + BedSelected,
            success: function (data) {
                //console.log(data);
                url = data;
                console.log("data")
                //  console.log(data)
                // add by khalifa print and refresh 
                if (data == "") {
                    DevExpress.ui.notify("There is a patient on this bed.", "warning", 1500);

                    $("#RefreshPats").click();

                    return;
                }

                DevExpress.ui.notify("Patient moved successfully.", "success", 1500);



                ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                    if (ns.sys_key() == openedNS) {

                        var fromBed = null;
                        ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {

                            //console.log(frombk, bk, pId);
                            ko.utils.arrayForEach(room.beds(), function (bed) {
                                if (bed.sys_key() == frombk && bed.patient_id() == pId) {
                                    fromBed = ko.toJSON(bed);

                                    bed.sex('free');
                                    bed.pSex('');
                                    bed.patient_id(0);
                                    bed.patient_sex('');
                                    bed.patengname('');
                                    // add by khalifa ageicon Chief_Complaint;
                                    bed.Chief_Complaint('');
                                    bed.ageIcon('');

                                    bed.patlocname('');
                                    bed.status('');
                                    bed.pat_bithdate('');
                                    bed.age('');
                                    bed.start_date('');
                                    bed.systime('');
                                    bed.emr_status_time('');
                                    bed.emr_status(0);
                                    bed.emr_status_color('lightgray');
                                    bed.episodekey('');
                                    bed.physician('');
                                    bed.physician_key('');
                                    bed.specialty('');
                                    bed.bedtype('');
                                    bed.clinickey('');
                                    bed.nurse('');
                                    bed.statusName('');
                                    bed.icon('');
                                    bed.color('');
                                    bed.location('');
                                    bed.admissionrequested('0');
                                    bed.pat_location('');
                                    bed.location_type('');
                                    bed.investigation_type('');
                                    bed.admitted('');
                                    bed.locationIcon('');
                                    bed.locationText('');
                                    bed.bedAlerts([]);
                                    bed.ntasksicon('');

                  

                                    $(".free .OrderTimeUpnormal").removeClass("OrderTimeUpnormal")
                                    $(".free .ordertimeNormal").removeClass("ordertimeNormal")



                                    return false;


                                }

                            });

                        });

                        ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {

                            ko.utils.arrayForEach(room.beds(), function (bed) {

                                //debugger;
                                if (bed.sys_key() == bk) {
                                    var jsonFromBed = null;
                                    //console.log(fromBed);
                                    if (typeof fromBed != 'object') {
                                        //console.log(fromBed);
                                        jsonFromBed = JSON.parse(fromBed);
                                        //console.log(jsonFromBed);
                                    }
                                    else
                                        jsonFromBed = fromBed;

                                    //console.log(jsonFromBed);
                                    //console.log(' To Bed : ' + jsonFromBed.sex);

                                    if (jsonFromBed != null) {
                                        //Fill toBed
                                        bed.sex(jsonFromBed.sex);
                                        bed.pSex(jsonFromBed.pSex);
                                        bed.patient_id(jsonFromBed.patient_id);
                                        bed.patient_sex(jsonFromBed.patient_sex);
                                        bed.patengname(jsonFromBed.patengname);
                                        // add by khalifa ageIcon Chief_Complaint;
                                        bed.Chief_Complaint(jsonFromBed.Chief_Complaint);
                                        bed.ageIcon(jsonFromBed.ageIcon);

                                        bed.patlocname(jsonFromBed.patlocname);
                                        bed.status(jsonFromBed.status);
                                        bed.pat_bithdate(jsonFromBed.pat_bithdate);
                                        bed.age(jsonFromBed.age);
                                        bed.start_date(jsonFromBed.start_date);
                                        bed.systime(jsonFromBed.systime);
                                        bed.emr_status_time(jsonFromBed.emr_status_time);
                                        bed.emr_status(jsonFromBed.emr_status);
                                        bed.emr_status_color(jsonFromBed.emr_status_color);
                                        bed.iswaitingarea(jsonFromBed.iswaitingarea);
                                        bed.episodekey(jsonFromBed.episodekey);
                                        bed.physician(jsonFromBed.physician);
                                        bed.physician_key(jsonFromBed.physician_key);
                                        bed.specialty(jsonFromBed.specialty);
                                        bed.bedtype(jsonFromBed.bedtype);
                                        bed.clinickey(jsonFromBed.clinickey);
                                        bed.nurse(jsonFromBed.nurse);
                                        bed.statusName(jsonFromBed.statusName);
                                        bed.icon(jsonFromBed.icon);
                                        bed.color(jsonFromBed.color);
                                        bed.location(jsonFromBed.location);
                                        bed.admissionrequested(jsonFromBed.admissionrequested);
                                        bed.pat_location(jsonFromBed.pat_location);
                                        bed.location_type(jsonFromBed.location_type);
                                        bed.investigation_type(jsonFromBed.investigation_type);
                                        bed.admitted(jsonFromBed.admitted);
                                        bed.locationIcon(jsonFromBed.locationIcon);
                                        bed.locationText(jsonFromBed.locationText);
                                        bed.bedAlerts(jsonFromBed.bedAlerts);
                                        bed.ntasksicon(jsonFromBed.ntasksicon)
                                    }
                                    return false;
                                }

                            });

                        });

                        UpdateMnuWps(ns);
                        // 	$("#refreshid").click();


                    }
                });

                var Object = {};
                // fill object send signal r chat message
                ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                    if (ns.sys_key() == openedNS) {
                        ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                            ko.utils.arrayForEach(room.beds(), function (bed) {
                                if (bed.patient_id() == pId) {
                                    Object.MessageHeader = "ER BEDS";
                                    Object.MessageBody = {};
                                    Object.MessageBody.patient_id = bed.patient_id();
                                    Object.MessageBody.sys_key = BedSelected;
                                    Object.MessageBody.latin_desc = bed.latin_desc();
                                    Object.MessageBody.patient_sex = bed.patient_sex();
                                    Object.MessageBody.patengname = bed.patengname();
                                    Object.MessageBody.Chief_Complaint = bed.Chief_Complaint();
                                    Object.MessageBody.ageIcon = bed.ageIcon();

                                    Object.MessageBody.patlocname = bed.patlocname();
                                    Object.MessageBody.status = bed.status();
                                    Object.MessageBody.pat_bithdate = bed.pat_bithdate();
                                    Object.MessageBody.start_date = bed.start_date();
                                    Object.MessageBody.systime = bed.systime();
                                    Object.MessageBody.emr_status_time = bed.emr_status_time();
                                    Object.MessageBody.emr_status = bed.emr_status();
                                    Object.MessageBody.iswaitingarea = bed.iswaitingarea();
                                    Object.MessageBody.episodekey = bed.episodekey();
                                    Object.MessageBody.physician = bed.physician();
                                    Object.MessageBody.physician_key = bed.physician_key();
                                    Object.MessageBody.specialty = bed.specialty();
                                    Object.MessageBody.bedtype = bed.bedtype();
                                    Object.MessageBody.clinickey = bed.clinickey();
                                    Object.MessageBody.nurse = bed.nurse();
                                    Object.MessageBody.nursestationcode = bed.nursestationcode();
                                    Object.MessageBody.icon = bed.icon();
                                    Object.MessageBody.color = bed.color();
                                    Object.MessageBody.location = bed.location();
                                    Object.MessageBody.ntasksicon = bed.ntasksicon();
                                }

                            })
                        })
                    }

                })

                try {
                    /*   $("#loader-wrapper").fadeIn("slow", function () {
                           $("#loader-wrapper").show();
                       });*/
                    ChatMessage("tomodule", "bedwhiteboardweb/erwhiteboard.html", JSON.stringify(Object));
                    /*     $("#loader-wrapper").fadeIn("slow", function () {
                             $("#loader-wrapper").hide();
                         });*/
                    // disappear icons after move
                    //$('.free .triage_new img').css('display','none');

                }
                catch (e) {
                    console.log(e)
                }






            },
            error: function (error) {
                //jsonValue = jQuery.parseJSON(error.responseText);
                console.log(error.responseText);
            }
        });
        $("#loader-wrapper").fadeIn("slow", function () {
            $("#loader-wrapper").hide();
        });
    }
}
function selectFTBed(SBedKey) {
    BedSelected = SBedKey;
    $("#diagTriagePriority").modal("show");
}
function selectDoctor(elm, arg) {
    //console.log(elm);
    if (arg != undefined) {
        //console.log(arg);
        var docId = arg.split(',')[0];
        var docName = arg.split(',')[1];

        if (docId == '' || docId == null) {
            alert("Doctor not selected , move patient to bed is cancellled");
            return;
        }

        //console.log($(elm).attr("bedKey"));

        var bedKey = $(elm).attr("bedKey");
        if (parseInt(bedKey) <= 0) {
            bedKey = BedSelected;
        }
        var sKey = $(elm).attr("sKey");
        var patientId = $(elm).attr("patientId");
        var episodeKey = $(elm).attr("episodeKey");
        var tCode = $(elm).attr("tCode");

        if (moveInfo == "WPtoBed") {
            $("#loader-wrapper").fadeIn("slow", function () {
                $("#loader-wrapper").show();
            });
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: "BedManagementApiActions/WaitingPatients/MoveWPtoBed?bKey=" + bedKey + "&pId=" + patientId + "&ek=" + episodeKey + "&drId=" + docId + "&sKey=" + sKey + "&uId=" + uId,
                success: function (data) {
                    //console.log(data);
                    var updatedBed = data;

                    if (updatedBed != null) {
                        DevExpress.ui.notify("Patient moved successfully.", "success", 1500);

                        try {
                            ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                                if (ns.sys_key() == openedNS) {

                                    ko.utils.arrayForEach(ns.waitingPatients(), function (Wp) {
                                        if (Wp != undefined) {
                                            //console.log(trtm);
                                            if (Wp.patient_id() == patientId) {

                                                ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                                                    if (updatedBed.parent_key == room.room_key()) {
                                                        ko.utils.arrayForEach(room.beds(), function (bed) {
                                                            //console.log(bed.sys_key());
                                                            if (bed.sys_key() == bedKey && (bed.patient_id() == 0 || bed.patient_id() == null || bed.patient_id() == "")) {

                                                                var addBed = new RoomBeds(updatedBed);
                                                                bed.sex(addBed.sex());
                                                                bed.pSex(addBed.pSex());
                                                                bed.patient_id(addBed.patient_id());
                                                                bed.patient_sex(addBed.patient_sex());
                                                                bed.patengname(addBed.patengname());
                                                                // add by khalifa ageIcon Chief_Complaint;
                                                                bed.Chief_Complaint(addBed.Chief_Complaint());
                                                                bed.ageIcon(addBed.ageIcon());

                                                                bed.patlocname(addBed.patlocname());
                                                                bed.status(addBed.status());
                                                                bed.pat_bithdate(addBed.pat_bithdate());
                                                                bed.age(addBed.age());
                                                                bed.start_date(addBed.start_date());
                                                                bed.systime(addBed.systime());
                                                                bed.emr_status_time(addBed.emr_status_time());
                                                                bed.emr_status(addBed.emr_status());
                                                                bed.emr_status_color(addBed.emr_status_color());
                                                                bed.iswaitingarea(addBed.iswaitingarea());
                                                                bed.episodekey(addBed.episodekey());
                                                                bed.physician(addBed.physician());
                                                                bed.physician_key(addBed.physician_key());
                                                                bed.specialty(addBed.specialty());
                                                                bed.bedtype(addBed.bedtype());
                                                                bed.clinickey(addBed.clinickey());
                                                                bed.nurse(addBed.nurse());
                                                                bed.statusName(addBed.statusName());
                                                                bed.icon(addBed.icon());
                                                                bed.color(addBed.color());
                                                                bed.location(addBed.location());
                                                                bed.admissionrequested(addBed.admissionrequested());
                                                                bed.pat_location(addBed.pat_location());
                                                                bed.location_type(addBed.location_type());
                                                                bed.investigation_type(addBed.investigation_type());
                                                                bed.admitted(addBed.admitted());
                                                                bed.locationIcon(addBed.locationIcon());
                                                                bed.locationText(addBed.locationText());
                                                                bed.bedAlerts(addBed.bedAlerts());

                                                                return false;
                                                            }
                                                        });

                                                        return false;
                                                    }
                                                });

                                                ns.waitingPatients.remove(Wp);
                                                return false;
                                            }
                                        }
                                    });

                                    UpdateMnuWps(ns);
                                    $("#refreshid").click();


                                    return false;
                                }
                            });

                        }
                        catch (err) {
                            $("#loader-wrapper").fadeOut("slow", function () {
                                $("#loader-wrapper").hide();
                            });
                        }
                    }
                    else
                        DevExpress.ui.notify("There is a patient on this bed.", "warning", 1500);


                },
                error: function (error) {
                    //jsonValue = jQuery.parseJSON(error.responseText);
                    console.log(error.responseText);
                }
            });
            $("#loader-wrapper").fadeIn("slow", function () {
                $("#loader-wrapper").hide();
            });
        }
        else if (moveInfo == "HPtoBed") {
            $("#loader-wrapper").fadeIn("slow", function () {
                $("#loader-wrapper").show();
            });
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: "BedManagementApiActions/WaitingPatients/MoveHPtoBed?bKey=" + bedKey + "&pId=" + patientId + "&ek=" + episodeKey + "&drId=" + docId + "&sKey=" + sKey + "&uId=" + uId,
                success: function (data) {


                    //  console.log(data);
                    //  alert(data)
                    var updatedBed = data;
                    // alert(updatedBed)
                    if (updatedBed != null) {
                        DevExpress.ui.notify("Patient moved successfully.", "success", 1500);

                        ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                            if (ns.sys_key() == openedNS) {
                                ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {

                                    ko.utils.arrayForEach(room.notOnBeds(), function (notOnBed) {
                                        if (notOnBed.patient_id() == patientId) {
                                            room.allBeds.remove(notOnBed);

                                            return false;
                                        }
                                    });

                                    ko.utils.arrayForEach(room.beds(), function (bed) {
                                        //console.log(bed.sys_key());
                                        if (bed.sys_key() == bedKey && (bed.patient_id() == 0 || bed.patient_id() == null)) {

                                            var addBed = new RoomBeds(updatedBed);
                                            bed.sex(addBed.sex());
                                            bed.pSex(addBed.pSex());
                                            bed.patient_id(addBed.patient_id());
                                            bed.patient_sex(addBed.patient_sex());
                                            bed.patengname(addBed.patengname());
                                            // add by khalifa ageIcon Chief_Complaint;
                                            bed.Chief_Complaint(addBed.Chief_Complaint());
                                            bed.ageIcon(addBed.ageIcon());

                                            bed.patlocname(addBed.patlocname());
                                            bed.status(addBed.status());
                                            bed.pat_bithdate(addBed.pat_bithdate());
                                            bed.age(addBed.age());
                                            bed.start_date(addBed.start_date());
                                            bed.systime(addBed.systime());
                                            bed.emr_status_time(addBed.emr_status_time());
                                            bed.emr_status(addBed.emr_status());
                                            bed.emr_status_color(addBed.emr_status_color());
                                            bed.iswaitingarea(addBed.iswaitingarea());
                                            bed.episodekey(addBed.episodekey());
                                            bed.physician(addBed.physician());
                                            bed.physician_key(addBed.physician_key());
                                            bed.specialty(addBed.specialty());
                                            bed.bedtype(addBed.bedtype());
                                            bed.clinickey(addBed.clinickey());
                                            bed.nurse(addBed.nurse());
                                            bed.statusName(addBed.statusName());
                                            bed.icon(addBed.icon());
                                            bed.color(addBed.color());
                                            bed.location(addBed.location());
                                            bed.admissionrequested(addBed.admissionrequested());
                                            bed.pat_location(addBed.pat_location());
                                            bed.location_type(addBed.location_type());
                                            bed.investigation_type(addBed.investigation_type());
                                            bed.admitted(addBed.admitted());
                                            bed.locationIcon(addBed.locationIcon());
                                            bed.locationText(addBed.locationText());
                                            bed.bedAlerts(addBed.bedAlerts());

                                            return false;
                                        }
                                    });
                                    $('#doctorsList').css('display', 'block');
                                    UpdateMnuWps(ns);
                                });
                            }
                        });
                        //add by khalifa fill object send signal r chat message
                        // move hp to bed
                        var Object = {};
                        ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                            if (ns.sys_key() == openedNS) {
                                ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                                    ko.utils.arrayForEach(room.beds(), function (bed) {
                                        if (bed.patient_id() == patientId) {
                                            Object.MessageHeader = "ER BEDS";
                                            Object.MessageBody = {};
                                            Object.MessageBody.patient_id = bed.patient_id();
                                            Object.MessageBody.sys_key = bedKey;
                                            Object.MessageBody.latin_desc = bed.latin_desc();
                                            Object.MessageBody.patient_sex = bed.patient_sex();
                                            Object.MessageBody.patengname = bed.patengname();
                                            Object.MessageBody.Chief_Complaint = bed.Chief_Complaint();
                                            Object.MessageBody.ageIcon = bed.ageIcon();
                                            Object.MessageBody.patlocname = bed.patlocname();
                                            Object.MessageBody.status = bed.status();
                                            Object.MessageBody.pat_bithdate = bed.pat_bithdate();
                                            Object.MessageBody.start_date = bed.start_date();
                                            Object.MessageBody.systime = bed.systime();
                                            Object.MessageBody.emr_status_time = bed.emr_status_time();
                                            Object.MessageBody.emr_status = bed.emr_status();
                                            Object.MessageBody.iswaitingarea = bed.iswaitingarea();
                                            Object.MessageBody.episodekey = bed.episodekey();
                                            Object.MessageBody.physician = bed.physician();
                                            Object.MessageBody.physician_key = bed.physician_key();
                                            Object.MessageBody.specialty = bed.specialty();
                                            Object.MessageBody.bedtype = bed.bedtype();
                                            Object.MessageBody.clinickey = bed.clinickey();
                                            Object.MessageBody.nurse = bed.nurse();
                                            Object.MessageBody.nursestationcode = bed.nursestationcode();
                                            Object.MessageBody.icon = bed.icon();
                                            Object.MessageBody.color = bed.color();
                                            Object.MessageBody.location = bed.location();
                                        }
                                    })
                                })
                            }

                        })

                        try {
                            //   console.log("object body before Sent");
                            //  console.log(Object.MessageBody)
                            /*        $("#loader-wrapper").fadeIn("slow", function () {
                                        $("#loader-wrapper").show();
                                    });*/
                            ChatMessage("tomodule", "bedwhiteboardweb/erwhiteboard.html", JSON.stringify(Object));
                            /*       $("#loader-wrapper").fadeIn("slow", function () {
                                       $("#loader-wrapper").hide();
                                   });*/
                        }

                        catch (e) {
                            console.log(e)
                        }

                    }
                    //create by khalifa
                    else if (data == null) {
                        DevExpress.ui.notify("Sorry, the selected bed is occupied by another patient. Please refresh the list", "warning", 1900);
                        $('#refreshid').click();

                    }



                },
                error: function (error) {
                    //jsonValue = jQuery.parseJSON(error.responseText);
                    console.log(error.responseText);

                }
            });
            $("#loader-wrapper").fadeIn("slow", function () {
                $("#loader-wrapper").hide();
            });
        }
        else if (moveInfo == "WPtoHP") {
            $("#loader-wrapper").fadeIn("slow", function () {
                $("#loader-wrapper").show();
            });

            $.getJSON("BedManagementApiActions/WaitingPatients/CheckMaximumCapacity?uId=" + uId + "&Ns=" + openedNS, function (allData) {
                if (allData == 0) {
                    DevExpress.ui.notify("Area reached Maximum Capacity.", "warning", 1500);
                    return;
                }
                else {
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        url: "BedManagementApiActions/WaitingPatients/MoveWPtoHP?bKey=" + bedKey + "&pId=" + patientId + "&ek=" + episodeKey + "&drId=" + docId + "&sKey=" + sKey + "&uId=" + uId,
                        success: function (data) {
                            //console.log(data);
                            var updatedBed = data;

                            DevExpress.ui.notify("Patient moved successfully.", "success", 1500);

                            try {

                                ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                                    if (ns.sys_key() == openedNS) {

                                        ko.utils.arrayForEach(ns.waitingPatients(), function (Wp) {
                                            if (Wp != undefined) {
                                                //console.log(trtm);
                                                if (Wp.patient_id() == patientId) {

                                                    ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {

                                                        if (updatedBed.parent_key == room.room_key()) {
                                                            var addBed = new RoomBeds(updatedBed);
                                                            room.allBeds.push(addBed);
                                                            return false;
                                                        }
                                                    });

                                                    ns.waitingPatients.remove(Wp);
                                                    return false;
                                                }
                                            }
                                        });

                                        $('#try_extb' + openedNS + ' .cnxMnuTrtNotOnBed').each(function () {
                                            //console.log(mnuTrtmsOnBed);
                                            $(this).dxContextMenu({
                                                items: mnuTrtmsNotOnBed,
                                                target: $(this).next(),
                                                //position: { of: $(this).next() },
                                                //visible: mnuTrtOnBedVisible,
                                                itemClickAction: mnuTrtmsNotOnBedItemClicked,
                                                //invokeOnlyFromCode: true,
                                            });

                                        });


                                        return false;
                                    }
                                });

                            }
                            catch (err) {
                                $("#loader-wrapper").fadeOut("slow", function () {
                                    $("#loader-wrapper").hide();
                                });
                            }
                        },
                        error: function (error) {
                            //jsonValue = jQuery.parseJSON(error.responseText);
                            console.log(error.responseText);
                        }
                    });
                }

                })


           
            $("#loader-wrapper").fadeIn("slow", function () {
                $("#loader-wrapper").hide();
            });
        }
        else if (moveInfo == "ReassignDoctor") {
            $("#loader-wrapper").fadeIn("slow", function () {
                $("#loader-wrapper").show();
            });
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: "BedManagementApiActions/WaitingPatients/ReassignDoctor?drId=" + docId + "&ek=" + episodeKey + "&sKey=" + sKey + "&pId=" + patientId + "&uId=" + uId,
                success: function (data) {
                    //console.log(data);
                    var updatedBed = data;

                    DevExpress.ui.notify("Doctor assigned successfully.", "success", 1500);

                    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                        if (ns.sys_key() == openedNS) {

                            ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                                ko.utils.arrayForEach(room.allBeds(), function (bed) {
                                    if (bed != undefined) {
                                        if (bed.sys_key() == updatedBed.sys_key && bed.patient_id() == updatedBed.patient_id) {
                                            bed.physician(updatedBed.physician);
                                            bed.physician_key(updatedBed.physician_key);
                                            return false;
                                        }
                                    }
                                });
                            });
                        }
                    });

                },
                error: function (error) {
                    //jsonValue = jQuery.parseJSON(error.responseText);
                    console.log(error.responseText);
                }
            });
            $("#loader-wrapper").fadeIn("slow", function () {
                $("#loader-wrapper").hide();
            });
        }
        else if (moveInfo == "WPtoBedFast") {
            $("#loader-wrapper").fadeIn("slow", function () {
                $("#loader-wrapper").show();
            });
      

                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        url: "BedManagementApiActions/WaitingPatients/FastMoveWPtoBed?tCode=" + tCode + "&bKey=" + bedKey + "&pId=" + patientId + "&ek=" + episodeKey + "&drId=" + docId + "&sKey=" + sKey + "&uId=" + uId + "&cBll=" + ER_EnableBilling + "&hospId=" + hospitalid,
                        success: function (data) {
                            //console.log(data);
                            var updatedBed = data;

                            if (updatedBed != null) {
                                DevExpress.ui.notify("Patient moved successfully.", "success", 1500);

                                ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                                    if (ns.sys_key() == openedNS) {

                                        ko.utils.arrayForEach(ns.waitingPatients(), function (Wp) {
                                            if (Wp != undefined) {
                                                //console.log(trtm);
                                                if (Wp.patient_id() == patientId) {

                                                    ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                                                        if (updatedBed.parent_key == room.room_key()) {
                                                            ko.utils.arrayForEach(room.beds(), function (bed) {
                                                                //console.log(bed.sys_key());
                                                                if (bed.sys_key() == bedKey && (bed.patient_id() == 0 || bed.patient_id() == null || bed.patient_id() == "")) {

                                                                    var addBed = new RoomBeds(updatedBed);
                                                                    bed.sex(addBed.sex());
                                                                    bed.pSex(addBed.pSex());
                                                                    bed.patient_id(addBed.patient_id());
                                                                    bed.patient_sex(addBed.patient_sex());
                                                                    bed.patengname(addBed.patengname());
                                                                    // add by khalifa ageIcon Chief_Complaint;
                                                                    bed.Chief_Complaint(addBed.Chief_Complaint());
                                                                    bed.ageIcon(addBed.ageIcon());

                                                                    bed.patlocname(addBed.patlocname());
                                                                    bed.status(addBed.status());
                                                                    bed.pat_bithdate(addBed.pat_bithdate());
                                                                    bed.age(addBed.age());
                                                                    bed.start_date(addBed.start_date());
                                                                    bed.systime(addBed.systime());
                                                                    bed.emr_status_time(addBed.emr_status_time());
                                                                    bed.emr_status(addBed.emr_status());
                                                                    bed.emr_status_color(addBed.emr_status_color());
                                                                    bed.iswaitingarea(addBed.iswaitingarea());
                                                                    bed.episodekey(addBed.episodekey());
                                                                    bed.physician(addBed.physician());
                                                                    bed.physician_key(addBed.physician_key());
                                                                    bed.specialty(addBed.specialty());
                                                                    bed.bedtype(addBed.bedtype());
                                                                    bed.clinickey(addBed.clinickey());
                                                                    bed.nurse(addBed.nurse());
                                                                    bed.statusName(addBed.statusName());
                                                                    bed.icon(addBed.icon());
                                                                    bed.color(addBed.color());
                                                                    bed.location(addBed.location());
                                                                    bed.admissionrequested(addBed.admissionrequested());
                                                                    bed.pat_location(addBed.pat_location());
                                                                    bed.location_type(addBed.location_type());
                                                                    bed.investigation_type(addBed.investigation_type());
                                                                    bed.admitted(addBed.admitted());
                                                                    bed.locationIcon(addBed.locationIcon());
                                                                    bed.locationText(addBed.locationText());
                                                                    bed.bedAlerts(addBed.bedAlerts());

                                                                    return false;
                                                                }
                                                            });

                                                            return false;
                                                        }
                                                    });

                                                    ns.waitingPatients.remove(Wp);
                                                    return false;
                                                }
                                            }
                                        });

                                        UpdateMnuWps(ns);


                                        return false;
                                    }
                                });


                                var Object = {};
                                // fill object send signal r chat message WPtoBedFast
                                ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                                    if (ns.sys_key() == openedNS) {
                                        ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                                            ko.utils.arrayForEach(room.beds(), function (bed) {
                                                if (bed.patient_id() == patientId) {
                                                    Object.MessageHeader = "ER BEDS";
                                                    Object.MessageBody = {};
                                                    Object.MessageBody.patient_id = bed.patient_id();
                                                    Object.MessageBody.sys_key = bedKey;
                                                    Object.MessageBody.latin_desc = bed.latin_desc();
                                                    Object.MessageBody.patient_sex = bed.patient_sex();
                                                    Object.MessageBody.patengname = bed.patengname();
                                                    Object.MessageBody.Chief_Complaint = bed.Chief_Complaint();
                                                    Object.MessageBody.ageIcon = bed.ageIcon();
                                                    Object.MessageBody.patlocname = bed.patlocname();
                                                    Object.MessageBody.status = bed.status();
                                                    Object.MessageBody.pat_bithdate = bed.pat_bithdate();
                                                    Object.MessageBody.start_date = bed.start_date();
                                                    Object.MessageBody.systime = bed.systime();
                                                    Object.MessageBody.emr_status_time = bed.emr_status_time();
                                                    Object.MessageBody.emr_status = bed.emr_status();
                                                    Object.MessageBody.iswaitingarea = bed.iswaitingarea();
                                                    Object.MessageBody.episodekey = bed.episodekey();
                                                    Object.MessageBody.physician = bed.physician();
                                                    Object.MessageBody.physician_key = bed.physician_key();
                                                    Object.MessageBody.specialty = bed.specialty();
                                                    Object.MessageBody.bedtype = bed.bedtype();
                                                    Object.MessageBody.clinickey = bed.clinickey();
                                                    Object.MessageBody.nurse = bed.nurse();
                                                    Object.MessageBody.nursestationcode = bed.nursestationcode();
                                                    Object.MessageBody.icon = bed.icon();
                                                    Object.MessageBody.color = bed.color();
                                                    Object.MessageBody.location = bed.location();
                                                }
                                            })

                                        })
                                    }

                                })
                                try {
                                    console.log("object body before Sent");
                                    console.log(Object.MessageBody)
                                    /*       $("#loader-wrapper").fadeIn("slow", function () {
                                               $("#loader-wrapper").show();
                                           });*/
                                    ChatMessage("tomodule", "bedwhiteboardweb/erwhiteboard.html", JSON.stringify(Object));
                                    /*         $("#loader-wrapper").fadeIn("slow", function () {
                                                 $("#loader-wrapper").hide();
                                             });*/
                                }
                                catch (e) {
                                    console.log(e)
                                }



                            }
                            else {
                                DevExpress.ui.notify("There is a patient on this bed.", "warning", 1500);
                                $("#RefreshPats").click();
                            }

                        },
                        error: function (error) {
                            //jsonValue = jQuery.parseJSON(error.responseText);
                            console.log(error.responseText);
                        }
                    });
                
            

            $("#loader-wrapper").fadeIn("slow", function () {
                $("#loader-wrapper").hide();
            });
        }
        else if (moveInfo == "WPtoHPFast") {
            $("#loader-wrapper").fadeIn("slow", function () {
                $("#loader-wrapper").show();
            });
            $.getJSON("BedManagementApiActions/WaitingPatients/CheckMaximumCapacity?uId=" + uId + "&Ns=" + openedNS, function (allData) {
                if (allData == 0) {
                    DevExpress.ui.notify("Area reached Maximum Capacity.", "warning", 1500);
                    return;
                }
                else {
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        url: "BedManagementApiActions/WaitingPatients/FastMoveWPtoHP?tCode=" + tCode + "&bKey=" + bedKey + "&pId=" + patientId + "&ek=" + episodeKey + "&drId=" + docId + "&sKey=" + sKey + "&uId=" + uId + "&cBll=" + ER_EnableBilling + "&hospId=" + hospitalid,
                        success: function (data) {
                            //console.log(data);
                            var updatedBed = data;

                            DevExpress.ui.notify("Patient moved successfully.", "success", 1500);

                            ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                                if (ns.sys_key() == openedNS) {

                                    ko.utils.arrayForEach(ns.waitingPatients(), function (Wp) {
                                        if (Wp != undefined) {
                                            //console.log(trtm);
                                            if (Wp.patient_id() == patientId) {

                                                ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {

                                                    if (updatedBed.parent_key == room.room_key()) {
                                                        var addBed = new RoomBeds(updatedBed);
                                                        room.allBeds.push(addBed);
                                                        return false;
                                                    }
                                                });

                                                ns.waitingPatients.remove(Wp);
                                                return false;
                                            }
                                        }
                                    });

                                    $('#try_extb' + openedNS + ' .cnxMnuTrtNotOnBed').each(function () {
                                        //console.log(mnuTrtmsOnBed);
                                        $(this).dxContextMenu({
                                            items: mnuTrtmsNotOnBed,
                                            target: $(this).next(),
                                            //position: { of: $(this).next() },
                                            //visible: mnuTrtOnBedVisible,
                                            itemClickAction: mnuTrtmsNotOnBedItemClicked,
                                            //invokeOnlyFromCode: true,
                                        });

                                    });


                                    return false;
                                }
                            });


                            //add by khalifa make signal r move patient from wp  to hb Not on Beds
                            // fill object send signal r chat message
                            var Object = {};
                            ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                                if (ns.sys_key() == openedNS) {
                                    ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                                        ko.utils.arrayForEach(room.notOnBeds(), function (bed) {


                                            if (bed.patient_id() == patientId) {
                                                Object.MessageHeader = "ER NOTONBEDS";
                                                Object.MessageBody = {};
                                                Object.MessageBody.parent_key = bed.parent_key();
                                                Object.MessageBody.sys_key = bedKey;
                                                Object.MessageBody.patient_id = bed.patient_id();
                                                Object.MessageBody.latin_desc = bed.latin_desc();
                                                Object.MessageBody.patient_sex = bed.patient_sex();
                                                Object.MessageBody.patengname = bed.patengname();
                                                Object.MessageBody.Chief_Complaint = bed.Chief_Complaint();
                                                Object.MessageBody.ageIcon = bed.ageIcon();
                                                Object.MessageBody.patlocname = bed.patlocname();
                                                Object.MessageBody.status = bed.status();
                                                Object.MessageBody.pat_bithdate = bed.pat_bithdate();
                                                Object.MessageBody.start_date = bed.start_date();
                                                Object.MessageBody.systime = bed.systime();
                                                Object.MessageBody.emr_status_time = bed.emr_status_time();
                                                Object.MessageBody.emr_status = bed.emr_status();
                                                Object.MessageBody.iswaitingarea = bed.iswaitingarea();
                                                Object.MessageBody.episodekey = bed.episodekey();
                                                Object.MessageBody.physician = bed.physician();
                                                Object.MessageBody.physician_key = bed.physician_key();
                                                Object.MessageBody.specialty = bed.specialty();
                                                Object.MessageBody.bedtype = bed.bedtype();
                                                Object.MessageBody.clinickey = bed.clinickey();
                                                Object.MessageBody.nurse = bed.nurse();
                                                Object.MessageBody.nursestationcode = bed.nursestationcode();
                                                Object.MessageBody.icon = bed.icon();
                                                Object.MessageBody.color = bed.color();
                                                Object.MessageBody.location = bed.location();
                                            }

                                        })
                                    })
                                }
                            })
                            try {
                                console.log("object body before Sent");
                                console.log(Object.MessageBody)
                                /*       $("#loader-wrapper").fadeIn("slow", function () {
                                           $("#loader-wrapper").show();
                                       });*/
                                ChatMessage("tomodule", "bedwhiteboardweb/erwhiteboard.html", JSON.stringify(Object));
                                /*         $("#loader-wrapper").fadeIn("slow", function () {
                                             $("#loader-wrapper").hide();
                                         });*/
                            }
                            catch (e) {
                                console.log(e)
                            }


                        },
                        error: function (error) {
                            //jsonValue = jQuery.parseJSON(error.responseText);
                            console.log(error.responseText);
                        }
                    });
                }
            })
       
            $("#loader-wrapper").fadeIn("slow", function () {
                $("#loader-wrapper").hide();
            });
        }

    }

    //diagDoctors.dialog("close");
}
var selectedargs = "";
var selectedelm = "";
function selectStatus(elm, arg) {

    var statId = arg.split(',')[0];
    var statName = arg.split(',')[1];
    var doccode = arg.split(',')[2];

    selectedargs = arg;
    selectedelm = elm;

    var sKey = $(elm).attr("sKey");
    var episodeKey = $(elm).attr("episodeKey");
    var pId = $(elm).attr("pId");



    if (ShowDischargeDocument == 0) {
                _selectStatus(elm, arg);
                return;
    }

    var url = "/WebMedicalTemplates/MedicalTemplate.html?PatId=" + pId + "&EpsKey=" + episodeKey +
        "&UserID=" + uId + "&lang=" + lang + "&hospitalid=" + hospitalid + "&orderkey=" + episodeKey +
        "&tempkey=" + doccode + "&dbcode=" + dbcode + "&disstatus=" + statId + "&disdesc=" + statName;
    $('#framDischarge').attr("src", "");
    $('#framDischarge').attr("src", url);
    $('#diagDischarge').modal('show');

}
function ConfirmDischarge() {
    //        public int CheckForDischargeDoc(string patId,string epskey, string DocCode)
    var statId = selectedargs.split(',')[0];
    var statName = selectedargs.split(',')[1];
    var doccode = selectedargs.split(',')[2];

    var sKey = $(selectedelm).attr("sKey");
    var episodeKey = $(selectedelm).attr("episodeKey");
    var pId = $(selectedelm).attr("pId");

    if (ShowDischargeDocument == 0) {
        _selectStatus(selectedelm, selectedargs);
        return;
    }

    var PList = [];

    PList.push({ Name: "hospitalid", Value: hospitalid, datatype: "1" })
    PList.push({ Name: "ruleparameter", Value: "EpisodeKey", datatype: episodeKey })
    PList.push({ Name: "ruleparameter", Value: "mrn", datatype: pId })
    PList.push({ Name: "ruleparameter", Value: "hospitalid", datatype: hospitalid })
    PList.push({ Name: "ruleparameter", Value: "userkey", datatype: uId })
    PList.push({ Name: "ruleparameter", Value: "cmd", datatype: "CheckInitalAss" })


    var records = [];
    for (i = 0; i < PList.length; i++) {
        records.push({ Name: PList[i].Name, Value: PList[i].Value, datatype: PList[i].datatype });
    }

    records.push({ Name: "rulename", Value: "ERDischargeValidation", datatype: 1 });

    var url = "/GenericAPI/api/CallRule";
    var jsonString = JSON.stringify(records);
    $.ajax({
        url: url,
        type: 'POST',
        data: jsonString,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {

            var data = $.parseJSON(response);
            if (data[0].cnt <= 0) {
                alert("Initial Assessment must be saved and signed");
            }
            else {
                $.getJSON("BedManagementApiActions/Nursestations/CheckForDischargeDoc?patId=" + pId + "&epskey=" + episodeKey +
                    "&DocCode=" + doccode + "&orderkey=" + episodeKey, function (allData) {
                        if (allData > 0) {
                            _selectStatus(selectedelm, selectedargs);
                            $('#diagDischarge').modal('hide');
                        }
                        else {
                            alert("Discharge summary must be saved and signed");
                        }

                    });
            }
        }
    });


}

function _selectStatus(elm, arg) {
    //console.log(elm);
    //console.log(arg);

    //Ahmed Saleh
    if (arg != undefined) {//console.log(arg);

        var statId = arg.split(',')[0];
        var statName = arg.split(',')[1];

        var sKey = $(elm).attr("sKey");
        var episodeKey = $(elm).attr("episodeKey");
        var pId = $(elm).attr("pId");
        //    console.log(self.DischargOrderDate())

        // check if doctor enter date or not add by khalifa
        console.log(episodeKey)
        $.getJSON("BedManagementApiActions/WaitingPatients/CheckDischageIfDischargeOrNot?ek=" + episodeKey, function (status) {
            if (status == 0) {
                DevExpress.ui.notify("Patient Already Discharged.", "warning", 1500);
                return;
            }
            else {

                if (vm.DischargOrderDate() == undefined || vm.DischargOrderDate() == '') {
                    //  console.log(vm.DischargOrderDate)
                    DevExpress.ui.notify("Dicharge Failed , you must enter date.", "warning", 1500);
                    return;
                } else {
                    if (statId == 2) {
                        $.confirm({
                            title: 'Confirm!',
                            content: 'Are sure you want to discharge patient?',
                            buttons: {
                                confirm: function () {
                                    //$.alert('Confirmed!');
                                    $.ajax({
                                        type: "POST",
                                        contentType: "application/json; charset=utf-8",
                                        dataType: "json",
                                        url: "BedManagementApiActions/WaitingPatients/DischargePatient?DischargOrderDate=" + vm.DischargOrderDate() + "&ek=" + episodeKey + "&pId=" + pId + "&sKey=" + sKey + "&dStatus=" + statId + "&uId=" + uId + "&hospId=" + hospitalid,
                                        success: function (data) {
                                            //console.log(data);
                                            if (data == "0") {

                                                DevExpress.ui.notify("Patient discharged successfully", "success", 1500);


                                                // add chat message discharge   signal r by khalifa
                                                // fill object send signal r chat message
                                                var Object = {};
                                                ko.utils.arrayForEach(vm.nursestations(), function (ns) {

                                                    if (ns.sys_key() == openedNS) {
                                                        ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                                                            ko.utils.arrayForEach(room.beds(), function (bed) {
                                                                if (bed.patient_id() == pId) {
                                                                    Object.MessageHeader = "ER DISCHARGEDTODAY";
                                                                    Object.MessageBody = {};
                                                                    Object.MessageBody.parent_key = bed.parent_key();
                                                                    Object.MessageBody.sys_key = bed.sys_key();
                                                                    Object.MessageBody.patient_id = bed.patient_id();
                                                                    Object.MessageBody.latin_desc = bed.latin_desc();
                                                                    Object.MessageBody.patient_sex = bed.patient_sex();
                                                                    Object.MessageBody.patengname = bed.patengname();
                                                                    Object.MessageBody.Chief_Complaint = bed.Chief_Complaint();
                                                                    Object.MessageBody.ageIcon = bed.ageIcon();
                                                                    Object.MessageBody.patlocname = bed.patlocname();
                                                                    Object.MessageBody.status = bed.status();
                                                                    Object.MessageBody.pat_bithdate = bed.pat_bithdate();
                                                                    Object.MessageBody.start_date = bed.start_date();
                                                                    Object.MessageBody.systime = bed.systime();
                                                                    Object.MessageBody.emr_status_time = bed.emr_status_time();
                                                                    Object.MessageBody.emr_status = bed.emr_status();
                                                                    Object.MessageBody.iswaitingarea = bed.iswaitingarea();
                                                                    Object.MessageBody.episodekey = bed.episodekey();
                                                                    Object.MessageBody.physician = bed.physician();
                                                                    Object.MessageBody.physician_key = bed.physician_key();
                                                                    Object.MessageBody.specialty = bed.specialty();
                                                                    Object.MessageBody.bedtype = bed.bedtype();
                                                                    Object.MessageBody.clinickey = bed.clinickey();
                                                                    Object.MessageBody.nurse = bed.nurse();
                                                                    Object.MessageBody.nursestationcode = bed.nursestationcode();
                                                                    Object.MessageBody.icon = bed.icon();
                                                                    Object.MessageBody.color = bed.color();
                                                                    Object.MessageBody.location = bed.location();
                                                                }
                                                            })
                                                        })

                                                        if (JSON.stringify(Object) === '{}') {
                                                            ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                                                                ko.utils.arrayForEach(room.notOnBeds(), function (bed) {
                                                                    if (bed.patient_id() == pId) {
                                                                        Object.MessageHeader
                                                                            = "ER DISCHARGEDTODAY";
                                                                        Object.MessageBody = {};
                                                                        Object.MessageBody.parent_key = bed.parent_key();
                                                                        Object.MessageBody.sys_key = bed.sys_key();
                                                                        Object.MessageBody.patient_id = bed.patient_id();
                                                                        Object.MessageBody.latin_desc = bed.latin_desc();
                                                                        Object.MessageBody.patient_sex = bed.patient_sex();
                                                                        Object.MessageBody.patengname = bed.patengname();
                                                                        Object.MessageBody.Chief_Complaint = bed.Chief_Complaint();
                                                                        Object.MessageBody.ageIcon = bed.ageIcon();
                                                                        Object.MessageBody.patlocname = bed.patlocname();
                                                                        Object.MessageBody.status = bed.status();
                                                                        Object.MessageBody.pat_bithdate = bed.pat_bithdate();
                                                                        Object.MessageBody.start_date = bed.start_date();
                                                                        Object.MessageBody.systime = bed.systime();
                                                                        Object.MessageBody.emr_status_time = bed.emr_status_time();
                                                                        Object.MessageBody.emr_status = bed.emr_status();
                                                                        Object.MessageBody.iswaitingarea = bed.iswaitingarea();
                                                                        Object.MessageBody.episodekey = bed.episodekey();
                                                                        Object.MessageBody.physician = bed.physician();
                                                                        Object.MessageBody.physician_key = bed.physician_key();
                                                                        Object.MessageBody.specialty = bed.specialty();
                                                                        Object.MessageBody.bedtype = bed.bedtype();
                                                                        Object.MessageBody.clinickey = bed.clinickey();
                                                                        Object.MessageBody.nurse = bed.nurse();
                                                                        Object.MessageBody.nursestationcode = bed.nursestationcode();
                                                                        Object.MessageBody.icon = bed.icon();
                                                                        Object.MessageBody.color = bed.color();
                                                                        Object.MessageBody.location = bed.location();
                                                                    }
                                                                })
                                                            })


                                                        }


                                                    }
                                                })




                                                try {
                                                    console.log("object body before Sent");
                                                    console.log(Object.MessageBody)
                                                    /*         $("#loader-wrapper").fadeIn("slow", function () {
                                                                 $("#loader-wrapper").show();
                                                             });*/
                                                    ChatMessage("tomodule", "bedwhiteboardweb/erwhiteboard.html", JSON.stringify(Object));
                                                    /*         $("#loader-wrapper").fadeIn("slow", function () {
                                                                 $("#loader-wrapper").hide();
                                                             });*/
                                                }
                                                catch (e) {
                                                    console.log(e)
                                                }


                                                ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                                                    if (ns.sys_key() == openedNS) {

                                                        ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {

                                                            ko.utils.arrayForEach(room.allBeds(), function (bed) {
                                                                if (bed != undefined) {
                                                                    if (bed.episodekey() == episodeKey) {
                                                                        room.allBeds.remove(bed);
                                                                        return false;
                                                                    }
                                                                }
                                                            });

                                                        });

                                                        UpdateMnuWps(ns);


                                                    }
                                                });







                                            }

                                        }
                                    });
                                },
                                cancel: function () {
                                    //$.alert('Canceled!');
                                }
                            },
                            animation: 'scale',
                            closeAnimation: 'zoom',
                        });
                    }
                    else {
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            url: "BedManagementApiActions/WaitingPatients/DischargePatient?DischargOrderDate=" + vm.DischargOrderDate() + "&ek=" + episodeKey + "&pId=" + pId + "&sKey=" + sKey + "&dStatus=" + statId + "&uId=" + uId + "&hospId=" + hospitalid,
                            success: function (data) {
                                //console.log(data);
                                if (data == "0") {

                                    DevExpress.ui.notify("Patient discharged successfully", "success", 1500);
                                    vm.DischargOrderDate('');


                                    var Object = {};
                                    ko.utils.arrayForEach(vm.nursestations(), function (ns) {

                                        if (ns.sys_key() == openedNS) {
                                            ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                                                ko.utils.arrayForEach(room.beds(), function (bed) {
                                                    if (bed.patient_id() == pId) {
                                                        Object.MessageHeader = "ER DISCHARGEDTODAY";
                                                        Object.MessageBody = {};
                                                        Object.MessageBody.parent_key = bed.parent_key();
                                                        Object.MessageBody.sys_key = bed.sys_key();
                                                        Object.MessageBody.patient_id = bed.patient_id();
                                                        Object.MessageBody.latin_desc = bed.latin_desc();
                                                        Object.MessageBody.patient_sex = bed.patient_sex();
                                                        Object.MessageBody.patengname = bed.patengname();
                                                        Object.MessageBody.Chief_Complaint = bed.Chief_Complaint();
                                                        Object.MessageBody.ageIcon = bed.ageIcon();
                                                        Object.MessageBody.patlocname = bed.patlocname();
                                                        Object.MessageBody.status = bed.status();
                                                        Object.MessageBody.pat_bithdate = bed.pat_bithdate();
                                                        Object.MessageBody.start_date = bed.start_date();
                                                        Object.MessageBody.systime = bed.systime();
                                                        Object.MessageBody.emr_status_time = bed.emr_status_time();
                                                        Object.MessageBody.emr_status = bed.emr_status();
                                                        Object.MessageBody.iswaitingarea = bed.iswaitingarea();
                                                        Object.MessageBody.episodekey = bed.episodekey();
                                                        Object.MessageBody.physician = bed.physician();
                                                        Object.MessageBody.physician_key = bed.physician_key();
                                                        Object.MessageBody.specialty = bed.specialty();
                                                        Object.MessageBody.bedtype = bed.bedtype();
                                                        Object.MessageBody.clinickey = bed.clinickey();
                                                        Object.MessageBody.nurse = bed.nurse();
                                                        Object.MessageBody.nursestationcode = bed.nursestationcode();
                                                        Object.MessageBody.icon = bed.icon();
                                                        Object.MessageBody.color = bed.color();
                                                        Object.MessageBody.location = bed.location();
                                                    }
                                                })
                                            })

                                            if (JSON.stringify(Object) === '{}') {
                                                ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                                                    ko.utils.arrayForEach(room.notOnBeds(), function (bed) {
                                                        if (bed.patient_id() == pId) {
                                                            Object.MessageHeader = "ER DISCHARGEDTODAY";
                                                            Object.MessageBody = {};
                                                            Object.MessageBody.parent_key = bed.parent_key();
                                                            Object.MessageBody.sys_key = bed.sys_key();
                                                            Object.MessageBody.patient_id = bed.patient_id();
                                                            Object.MessageBody.latin_desc = bed.latin_desc();
                                                            Object.MessageBody.patient_sex = bed.patient_sex();
                                                            Object.MessageBody.patengname = bed.patengname();
                                                            Object.MessageBody.Chief_Complaint = bed.Chief_Complaint();
                                                            Object.MessageBody.ageIcon = bed.ageIcon();

                                                            Object.MessageBody.patlocname = bed.patlocname();
                                                            Object.MessageBody.status = bed.status();
                                                            Object.MessageBody.pat_bithdate = bed.pat_bithdate();
                                                            Object.MessageBody.start_date = bed.start_date();
                                                            Object.MessageBody.systime = bed.systime();
                                                            Object.MessageBody.emr_status_time = bed.emr_status_time();
                                                            Object.MessageBody.emr_status = bed.emr_status();
                                                            Object.MessageBody.iswaitingarea = bed.iswaitingarea();
                                                            Object.MessageBody.episodekey = bed.episodekey();
                                                            Object.MessageBody.physician = bed.physician();
                                                            Object.MessageBody.physician_key = bed.physician_key();
                                                            Object.MessageBody.specialty = bed.specialty();
                                                            Object.MessageBody.bedtype = bed.bedtype();
                                                            Object.MessageBody.clinickey = bed.clinickey();
                                                            Object.MessageBody.nurse = bed.nurse();
                                                            Object.MessageBody.nursestationcode = bed.nursestationcode();
                                                            Object.MessageBody.icon = bed.icon();
                                                            Object.MessageBody.color = bed.color();
                                                            Object.MessageBody.location = bed.location();
                                                        }
                                                    })
                                                })


                                            }
                                        }




                                    })

                                    try {
                                        console.log("object body before Sent");
                                        console.log(Object.MessageBody)
                                        /*           $("#loader-wrapper").fadeIn("slow", function () {
                                                       $("#loader-wrapper").show();
                                                   });*/
                                        ChatMessage("tomodule", "bedwhiteboardweb/erwhiteboard.html", JSON.stringify(Object));
                                        /*        $("#loader-wrapper").fadeIn("slow", function () {
                                                    $("#loader-wrapper").hide();
                                                });*/
                                    }
                                    catch (e) {
                                        console.log(e)
                                    }

                                    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                                        if (ns.sys_key() == openedNS) {

                                            ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {

                                                ko.utils.arrayForEach(room.allBeds(), function (bed) {
                                                    if (bed != undefined) {
                                                        if (bed.episodekey() == episodeKey) {
                                                            room.allBeds.remove(bed);
                                                            return false;
                                                        }
                                                    }
                                                });

                                            });

                                            UpdateMnuWps(ns);


                                        }
                                    });

                                }

                            }
                        });
                    }

                }
            }
           
        })


    }

    //diagStatus.dialog("close");
}

function selectTriagePriority(elm, arg) {
    //console.log(elm);
    //console.log(arg);
    triagtype = 4;

    if (arg != undefined) {//console.log(arg);

        var triageSub_code = arg.split(',')[0];
        var triageLatin_desc = arg.split(',')[1];
        fasttriagcode = triageSub_code;

        //console.log($(elm).attr("bedKey"));
        var bedKey = $(elm).attr("bedKey");
        var sKey = $(elm).attr("sKey");
        var patientId = $(elm).attr("patientId");
        var episodeKey = $(elm).attr("episodeKey");

        if (NoRoster == 1) {
            FastMoveToBed(uId, BedSelected, sKey, patientId, episodeKey, triageSub_code);
            return;
        }
        if (!bedKey.startsWith('wa')) {
            moveInfo = "WPtoBedFast";

            $("#docsearch").val("");
            $("#doctorsList tbody").empty();
            $.each(jsonErDoctors, function (indexR, valueR) {
                //console.log(jsonErDoctors[indexR]);
                $("#doctorsList tbody").append("<tr data-dismiss='modal' style='cursor:pointer;' tCode=" + triageSub_code + " bedKey='" + bedKey + "' sKey='" + sKey + "' patientId='" + patientId + "' episodeKey='" + episodeKey + "' onclick='selectDoctor(this,\"" + jsonErDoctors[indexR].doctor_id + "," + jsonErDoctors[indexR].doctor_name + "\");'>" + "<td>" + jsonErDoctors[indexR].doctor_name + "</td>" + "</tr>");
            })
        }
        else {
            moveInfo = "WPtoHPFast";

            $("#docsearch").val("");
            $("#doctorsList tbody").empty();
            $.each(jsonErDoctors, function (indexR, valueR) {
                //console.log(jsonErDoctors[indexR]);
                $("#doctorsList tbody").append("<tr data-dismiss='modal' style='cursor:pointer;' tCode=" + triageSub_code + " bedKey='" + bedKey.replace('wa', '') + "' sKey='" + sKey + "' patientId='" + patientId + "' episodeKey='" + episodeKey + "' onclick='selectDoctor(this,\"" + jsonErDoctors[indexR].doctor_id + "," + jsonErDoctors[indexR].doctor_name + "\");'>" + "<td>" + jsonErDoctors[indexR].doctor_name + "</td>" + "</tr>");
            })
        }

    }

    //diagStatus.dialog("close");
}

var trtMin = true;
function TrtMaxMin() {
    if (trtMin) {
        //alert('Treatment Maxmized');
        var displayValue = $(".Patient-Banner").css("display");

        if (displayValue != "none" && lastBedClick == "WP") {
            $(".Patient-Banner").slideToggle();

            if (lastBedClick == "NotOnBed")
                $("tr[id^='pId']").removeClass('selected_row_em');
            else if (lastBedClick == "OnBed")
                $("tr[id^='bedId']").removeClass('selected_row_em');
            else if (lastBedClick == "WP")
                $("tr[id^='wp']").removeClass('selected_row_em');

        }
        trtMin = false;
    }
    else {
        //alert('Treatment Minimized');
        trtMin = true;
    }
}

var wpMin = true;
function WPMaxMin() {
    if (wpMin) {
        //alert('Waiting Maxmized');
        var displayValue = $(".Patient-Banner").css("display");

        if (displayValue != "none" && lastBedClick != "WP") {
            $(".Patient-Banner").slideToggle();

            if (lastBedClick == "NotOnBed")
                $("tr[id^='pId']").removeClass('selected_row_em');
            else if (lastBedClick == "OnBed")
                $("tr[id^='bedId']").removeClass('selected_row_em');

        }
        wpMin = false;
    }
    else {
        //alert('Waiting Minimized');
        wpMin = true;
    }
}

function btnCollapseAll_click() {
    //$('.accContent').slideToggle("slow");

    //if ($('#collAll').attr('src') == 'images/collapse_arrow_alt.png') {
    //    $('#collAll').attr('src', 'images/expand_arrow_alt.png');
    //    $('[id^="imgNSColl"]').attr('src', 'images/expand_arrow_alt.png');
    //    $('.accContent').slideUp("slow");
    //}
    //else {
    //    $('#collAll').attr('src', 'images/collapse_arrow_alt.png');
    //    $('[id^="imgNSColl"]').attr('src', 'images/collapse_arrow_alt.png');
    //    $('.accContent').slideDown("slow");
    //}
}

var NsAlerts = function (NsAlert) {
    this.NS_key = ko.observable(NsAlert.NS_key);
    this.alert_name = ko.observable(NsAlert.alert_name);
    this.alert_type = ko.observable(NsAlert.alert_type);
    this.toolTip = ko.observable(NsAlert.toolTip);
    this.icon = ko.observable('/images/' + NsAlert.icon);
    this.color = ko.observable(NsAlert.color);
}

var RoomAndBeds = function (roomWBeds) {
    var self = this;
    self.room_key = ko.observable(roomWBeds.room_key);
    self.room_name = ko.observable(roomWBeds.room_name);
    self.nursestationcode = ko.observable(roomWBeds.nursestationcode);
    self.location = ko.observable(roomWBeds.location);
    self.x = roomWBeds.location == null ? ko.observable() : ko.observable((parseInt(roomWBeds.location.split(',')[0]) + 5) + 'px');
    self.y = roomWBeds.location == null ? ko.observable() : ko.observable((parseInt(roomWBeds.location.split(',')[1]) + 145) + 'px');
    self.rotation = roomWBeds.rotation == null ? ko.observable(0) : ko.observable(roomWBeds.rotation);
    self.size = ko.observable(roomWBeds.size);
    self.width = roomWBeds.size == null ? ko.observable() : ko.observable((parseInt(roomWBeds.size.split(',')[0]) - 15) + 'px');
    self.height = roomWBeds.size == null ? ko.observable() : ko.observable((parseInt(roomWBeds.size.split(',')[1]) - 15) + 'px');
    self.allBeds = ko.observableArray($.map(roomWBeds.beds, function (roomBeds) {

     


        return new RoomBeds(roomBeds)
    }));
    self.SelectedValue = ko.observable();








    //console.log(self.allBeds());

    self.notOnBeds = ko.computed(function () {
        return ko.utils.arrayFilter(self.allBeds(), function (bed) {
            //console.log(bed);
            return bed.iswaitingarea() == 1 && bed.emr_status() != 0;
        });
    });
    //console.log(self.notOnBeds());

    //self.beds = ko.observableArray([]);

    self.beds = ko.computed(function () {






        self.allBeds().sort(function (l, r) {
            return (l.sys_key() == r.sys_key()) ? (l.iswaitingarea() > r.iswaitingarea() ? 1 : -1) : (l.sys_key() > r.sys_key() ? 1 : -1)
        });

        bedsArray = ko.observableArray([]);
        var prevBedId;
        ko.utils.arrayForEach(self.allBeds(), function (bed) {

            // treatment time start
            self.seenbyerdoctor_time = ko.observable(bed.seenbyerdoctor_time);
            var start = new Date(bed.seenbyerdoctor_time).getTime();
            var end = new Date().getTime();

            var diff = end - start;
            var minutes = Math.floor((diff / 1000) / 60);
            if (minutes == NaN) {
                minutes = 0;
            }

            self.onbed_time = ko.observable(minutes);
            if (bed.seenbyerdoctor_time() == "") {
                bed.onbed_time("--")
            }
            self.onbed_timeClass = ko.observable("ordertimeNormal");
            if (bed.iswaitingarea() == 1 | bed.patient_id() == "") {
                bed.onbed_timeClass("");

            }
            self.onbed_time.subscribe(function (newValue) {

                if (bed.iswaitingarea() == 1 | bed.patient_id() == "") {
                    bed.onbed_timeClass("");

                    return;
                }

                if (newValue == "--") {
                    bed.onbed_timeClass("ordertimeNormal");
                } else if (String(newValue).includes("Days") | String(newValue).includes("يوم")) {
                    bed.onbed_timeClass("OrderTimeUpnormal");
                } else if (newValue == "") {
                    bed.onbed_timeClass("");
                } else {
                    bed.onbed_timeClass("ordertimeNormal");
                }

                // remove colors

                $(".free .OrderTimeUpnormal").removeClass("OrderTimeUpnormal")
                $(".free .ordertimeNormal").removeClass("ordertimeNormal")



            })
            if (bed.onbed_time() > 0 && bed.iswaitingarea() == 0 && bed.patient_id() != "") {
                var total = Number(bed.onbed_time());
                var hrs = Math.floor(total / 60);
                var min = total % 60;
                var isdone = 0;
                if (hrs > 24) {
                    bed.onbed_time("+Days");
                    isdone = 1;
                }
                if (hrs == 0 & isdone == 0) {
                    bed.onbed_time(min + "M");
                    isdone = 1;
                }
                if (hrs > 0 & min == 0 && isdone == 0) {
                    bed.onbed_time(hrs + "H");
                    isdone = 1;
                }
                if (hrs > 0 & min > 0 && isdone == 0) {
                    bed.onbed_time(hrs + "H:" + min + "M");
                }
            }
            self.CalcOnBedTime = function () {
                var start = new Date(bed.seenbyerdoctor_time()).getTime();
                var end = new Date().getTime();
                var diff = end - start;
                var minutes = Math.floor((diff / 1000) / 60);
                if (minutes == NaN) {
                    minutes = 0;
                }
                bed.onbed_time(minutes);
                if (bed.seenbyerdoctor_time() == "") {
                    bed.onbed_time("--")
                }

                if (bed.iswaitingarea() == 1 | bed.patient_id() == "") {
                    bed.onbed_timeClass("");
                    bed.onbed_time("");
                    return;
                }


                if (bed.onbed_time() > 0) {
                    var total = Number(bed.onbed_time());
                    var hrs = Math.floor(total / 60);
                    var min = total % 60;
                    if (hrs > 24) {
                        self.onbed_time("+Days")
                        return;
                    }
                    if (hrs == 0) {
                        self.onbed_time(min + "M");
                        return;
                    }
                    if (hrs > 0 & min == 0) {
                        self.onbed_time(hrs + "H");
                        return;
                    }
                    if (hrs > 0 & min > 0) {
                        self.onbed_time(hrs + "H:" + min + "M");
                    }
                }

                // remove colors
                $(".free .OrderTimeUpnormal").removeClass("OrderTimeUpnormal")
                $(".free .ordertimeNormal").removeClass("ordertimeNormal")



            }

    // treatment time end 





            if (bed.sys_key() != prevBedId) {
                bedsArray.push(bed);
            }
            prevBedId = bed.sys_key();
        });

        var jsonBed;

        start: ko.utils.arrayForEach(bedsArray(), function (bed) {
            if (bed.iswaitingarea() == 1) {
                var strBed = ko.toJSON(bed);
                jsonBed = JSON.parse(strBed);

                self.allBeds.push(new RoomBeds(jsonBed));

                bed.sex('free');
                bed.patient_id('');
                bed.patient_sex('');
                bed.patengname('');
                // add by khalifa ageicon Chief_Complaint;
                bed.Chief_Complaint('');
                bed.ageIcon('');

                bed.patlocname('');
                bed.status('');

                bed.pat_bithdate('');
                bed.age('');
                bed.start_date('');
                bed.systime('');
                bed.emr_status_time('');
                bed.emr_status_color = ko.observable('lightgray');
                bed.emr_status = ko.observable('0');
                bed.iswaitingarea('1');
                bed.episodekey('');
                bed.physician('');
                bed.physician_key('');
                bed.specialty('');
                bed.clinickey('');
                bed.nurse('');
                bed.price('');
                bed.nursestationcode('');
                bed.statusName('');
                bed.ntasksicon('');
                //bedsArray.remove(bed);
                //continue start:;
                //break;
            }
        });

        return bedsArray.sort(function (l, r) {
            return l.sys_key - r.sys_key;
        });


        //return bedsArray();
    });

    //console.log(self.beds());
    //self.buildBeds();

    self.resizeDrag = function (room, event) {
        $('#roomId' + room.room_key()).resizable();
        $('#roomId' + room.room_key()).draggable();
    };

    var degreeR = 0;
    self.rotateRightClick = function (room, event) {
        degreeR += 1;

        $('#roomId' + room.room_key()).css({
            '-moz-transform': 'rotate(' + degreeR + 'deg)',
            '-webkit-transform': 'rotate(' + degreeR + 'deg)',
            '-o-transform': 'rotate(' + degreeR + 'deg)',
            '-ms-transform': 'rotate(' + degreeR + 'deg)',
            'transform': 'rotate(' + degreeR + 'deg)'
        });
        $('#degreeR' + room.room_key()).text(degreeR);
    };

    self.rotateLeftClick = function (room, event) {
        degreeR -= 1;

        $('#roomId' + room.room_key()).css({
            '-moz-transform': 'rotate(' + degreeR + 'deg)',
            '-webkit-transform': 'rotate(' + degreeR + 'deg)',
            '-o-transform': 'rotate(' + degreeR + 'deg)',
            '-ms-transform': 'rotate(' + degreeR + 'deg)',
            'transform': 'rotate(' + degreeR + 'deg)'
        });
        $('#degreeR' + room.room_key()).text(degreeR);
    };

    self.rotateDRightClick = function (room, event) {
        degreeR += 5;

        $('#roomId' + room.room_key()).css({
            '-moz-transform': 'rotate(' + degreeR + 'deg)',
            '-webkit-transform': 'rotate(' + degreeR + 'deg)',
            '-o-transform': 'rotate(' + degreeR + 'deg)',
            '-ms-transform': 'rotate(' + degreeR + 'deg)',
            'transform': 'rotate(' + degreeR + 'deg)'
        });
        $('#degreeR' + room.room_key()).text(degreeR);
    };

    self.rotateDLeftClick = function (room, event) {
        degreeR -= 5;

        $('#roomId' + room.room_key()).css({
            '-moz-transform': 'rotate(' + degreeR + 'deg)',
            '-webkit-transform': 'rotate(' + degreeR + 'deg)',
            '-o-transform': 'rotate(' + degreeR + 'deg)',
            '-ms-transform': 'rotate(' + degreeR + 'deg)',
            'transform': 'rotate(' + degreeR + 'deg)'
        });
        $('#degreeR' + room.room_key()).text(degreeR);
    };

    self.CancelEdit = function () {
    };

}






var WaitingPatient = function (Wp) {
    //console.log(Wp);
    var self = this;
    self.staff_key = ko.observable(Wp.staff_key);
    self.staff_id = ko.observable(Wp.staff_id);
    self.staff_name = ko.observable(Wp.staff_name);
    self.episode_key = ko.observable(Wp.episode_key);
    self.patient_id = ko.observable(Wp.patient_id);
    self.skey = ko.observable(Wp.skey);
    self.acuitylevel = ko.observable(Wp.acuitylevel);
    self.start_date = ko.observable(Wp.start_date);
    self.start_time = ko.observable(Wp.start_time);
    self.bed_key = ko.observable(Wp.bed_key);
    self.emrbedkey = ko.observable(Wp.emrbedkey);
    self.emr_status = ko.observable(Wp.emr_status);
    self.WaitingTime = ko.observable(Wp.WaitingTime);



    if (IsNumeric(Wp.emr_status) && Wp.emr_status != 0 && Wp.emr_status != 10)
        self.emr_status_color = ko.observable(GetColorByStatus(Wp.emr_status));
    else {
        self.emr_status_color = ko.observable('lightgray');
        self.emr_status = ko.observable('0');
    }
    if (IsNumeric(Wp.WaitingTime) && Wp.WaitingTime > 0)
        self.waitingstatus_icon = ko.observable("assets/images/warning.png");
    else {
        self.waitingstatus_icon = ko.observable("");
    }

    self.emr_status_time = ko.observable(Wp.emr_status_time);
    self.iswaitingarea = ko.observable(Wp.iswaitingarea);
    self.patlocname = ko.observable(Wp.patlocname);
    self.patengname = ko.observable(Wp.patengname);
    // add by khalifa Chief_Complaint;
    self.Chief_Complaint = ko.observable(Wp.Chief_Complaint);
    self.pat_birthdate = ko.observable(Wp.pat_birthdate);
    var diffMs = new Date() - new Date(Wp.pat_birthdate);
    //var diffFs = diffMs / 1000; var diffMs = diffFs / 60; var diffHs = diffMs / 60; var diffDs = diffHs / 24; var diffMos = diffDs / 30; var diffYs = Math.floor(diffMos / 12);
    var diffYs = Math.floor(diffMs / 31536000000);
    if (isNaN(diffYs))
        self.age = ko.observable();
    else
        self.age = ko.observable(Math.round(parseInt(diffYs)));

    self.patient_sex = ko.observable(Wp.patient_sex);
    self.ageIcon = ko.observable();
    self.ageIconText = ko.observable();

    if (Wp.patient_sex == 1) {
        self.sex = ko.observable('occupiedMale');
        self.sexText = ko.observable('Male');
        self.pSex = ko.observable('assets/images/male.png');

        if (self.age() <= newborn) {
            self.ageIcon = ko.observable('assets/images/age/baby-boy.png');
            self.ageIconText = ko.observable('Newborn Male');
        }
        else if (self.age() > newborn && self.age() <= infant) {
            self.ageIcon = ko.observable('assets/images/age/boy.png');
            self.ageIconText = ko.observable('Infant Male');
        }
        else if (self.age() > infant && self.age() <= child) {
            self.ageIcon = ko.observable('assets/images/age/boy.png');
            self.ageIconText = ko.observable('Child Male');
        }
        else if (self.age() > child) {
            self.ageIcon = ko.observable('assets/images/user.png');
            self.ageIconText = ko.observable('Male');
        }
    }
    else if (Wp.patient_sex == 2) {
        self.sex = ko.observable('occupiedFemale');
        self.sexText = ko.observable('Female');
        self.pSex = ko.observable('assets/images/female.png');

        if (self.age() <= newborn) {
            self.ageIcon = ko.observable('assets/images/age/baby-girl.png');
            self.ageIconText = ko.observable('Newborn Female');
        }
        else if (self.age() > newborn && self.age() <= infant) {
            self.ageIcon = ko.observable('assets/images/age/girl.png');
            self.ageIconText = ko.observable('Infant Female');
        }
        else if (self.age() > infant && self.age() <= child) {
            self.ageIcon = ko.observable('assets/images/age/girl.png');
            self.ageIconText = ko.observable('Child Female');
        }
        else if (self.age() > child) {
            self.ageIcon = ko.observable('assets/images/user_female.png');
            self.ageIconText = ko.observable('Female');
        }
    }
    else {
        self.pSex = ko.observable('');
        self.sexText = ko.observable('');
        self.sex = ko.observable('free');
    }

    self.nuseStationtype = ko.observable(Wp.nuseStationtype);
    self.nstationcode = ko.observable(Wp.nstationcode);

    self.wMinutes = ko.observable();
    self.tMinutes = ko.observable();
    self.waMinutes = ko.observable();

    self.wMinutesColor = ko.observable();
    self.tMinutesColor = ko.observable();
    self.waMinutesColor = ko.observable();

    self.tick = function () {
        // set er max time notifications ==========================


        //$.getJSON("BedManagementApiActions/WaitingPatients/GetSingleWp?pId=" + Wp.patient_id + "&hospId=" + hospitalid , function (allData) {
        //	self.WaitingTime(allData.WaitingTime);
        //	if (IsNumeric(allData.WaitingTime) && allData.WaitingTime > 0 )
        //		self.waitingstatus_icon = ko.observable("assets/images/warning.png");
        //	else {
        //		self.waitingstatus_icon = ko.observable("");
        //	}			

        //});

        if (self.start_time() != '' && self.start_time() != undefined) {
            //console.log(Wp);

            var m = 0;
            m = Math.floor(new XDate(self.start_time()).diffMinutes(new XDate(serverTimeProcessed)));

            if (m < 0)
                m = 0;

            if (m > ERmaxTime)
                self.wMinutes("+" + ERmaxTime);
            else
                self.wMinutes(m);

            if (m < ERstartTime) {
                self.wMinutesColor('#00FF00');
            }
            else if (m >= ERstartTime && m < ERavgTime) {
                self.wMinutesColor('yellow');
            }
            else if (m >= ERavgTime && m < ERmaxTime) {
                self.wMinutesColor('red');
            }
            else if (m >= ERmaxTime) {
                self.wMinutesColor('red');
                // flicker alert
            }

            var t = 0;
            if (self.emr_status_time() != '' && self.emr_status_time() != undefined)
                t = Math.floor(new XDate(self.emr_status_time()).diffMinutes(new XDate(serverTimeProcessed)));

            if (t < 0)
                t = 0;

            switch (self.emr_status()) {
                case "1":
                    intTRGstartTime = TRGstartTime[0];
                    intTRGavgTime = TRGavgTime[0];
                    intTRGmaxTime = TRGmaxTime[0];
                    break;
                case "2":
                    intTRGstartTime = TRGstartTime[1];
                    intTRGavgTime = TRGavgTime[1];
                    intTRGmaxTime = TRGmaxTime[1];
                    break;
                case "3":
                    intTRGstartTime = TRGstartTime[2];
                    intTRGavgTime = TRGavgTime[2];
                    intTRGmaxTime = TRGmaxTime[2];
                    break;
                default:
                    intTRGstartTime = 30;
                    intTRGavgTime = 45;
                    intTRGmaxTime = 60;
                    break;
            }

            if (self.emr_status() == "1" || self.emr_status() == "2" || self.emr_status() == "3" || self.emr_status() == "4" || self.emr_status() == "5") {

                if (t > intTRGmaxTime)
                    self.tMinutes("+" + intTRGmaxTime);
                else
                    self.tMinutes(t);

                if (t < intTRGstartTime) {
                    self.tMinutesColor('#00FF00');
                }
                else if (t >= intTRGstartTime && t < intTRGavgTime) {
                    self.tMinutesColor('yellow');
                }
                else if (t >= intTRGavgTime && t < intTRGmaxTime) {
                    self.tMinutesColor('red');
                }
                else if (t >= intTRGmaxTime) {
                    self.tMinutesColor('darkred');
                }

            }

            $('.wMinutes').each(function () {
                if ($(this).text().indexOf("+") != -1 && $(this).attr('class') != 'try_nums')
                    $(this).addClass('try_nums');
            });

            $('.tMinutes').each(function () {
                if ($(this).text().indexOf("+") != -1 && $(this).attr('class') != 'try_nums')
                    $(this).addClass('try_nums');
            });


        }
    };

    self.tick2 = function () {

    };

    //Stop this line for loading
    setInterval(self.tick, 4000);

    //setInterval(self.tick2,5000);
    self.wpShowMenu = function () {
        $(".dx-overlay-content dx-context-menu dx-menu-base").css("margin", "40px");
        $(CurrentWpMenu).dxContextMenu("show");
    }
    self.wpClick = function (wp, e) {
        $("tr[id^='wp']").removeClass('selected_row_em');
        $("tr[id^='bedId']").removeClass('selected_row_em');
        $("tr[id^='pId']").removeClass('selected_row_em');

        var displayValue = $(".Patient-Banner").css("display");

        if (displayValue == "none") {
            //  $(".Patient-Banner").slideToggle();
            $('#wp' + wp.patient_id()).addClass('selected_row_em');
        }
        else {
            if (clickedWP != null) {
                if (clickedWP.patient_id() == wp.patient_id()) {
                    $(".Patient-Banner").slideToggle();
                }
                else
                    $('#wp' + wp.patient_id()).addClass('selected_row_em');
            }
            else
                $('#wp' + wp.patient_id()).addClass('selected_row_em');
        }

        try {

            var xd = new XDate(wp.pat_birthdate());
            $('#pbBDate').text(xd.toString("yyyy MMM dd") + "(" + wp.age() + "y)");

        }
        catch (ex) { }
        if (wp.patient_sex() == 1)
            $('#pbGender').text("Male");
        else if (wp.patient_sex() == 2)
            $('#pbGender').text("Female");

        $('#pbName').text(wp.patengname());
        $('#pbMRN').text(wp.patient_id());


        clickedWP = wp;
        lastBedClick = "WP";

    };
    self.WpMouseOver = function (e) {
        var mnu1 = 'cxWP' + self.patient_id();
        var mnu2 = 'cxWPTR' + self.patient_id();

        var MyMnu1;
        var MyMnu2;
        var i = 0;


        $('#try_exta' + openedNS + ' .cnxMnuWp').each(function () {
            if ($('#try_exta' + openedNS + ' .cnxMnuWp')[i].id == mnu1) {
                MyMnu1 = this;
                return false;
            }
            i++;
        });

        i = 0;
        $('#try_exta' + openedNS + ' .cnxMnuWpToTriage').each(function () {
            if ($('#try_exta' + openedNS + ' .cnxMnuWpToTriage')[i].id == mnu2) {
                MyMnu2 = this;
                return false;
            }
            i++;
        });
        if (MyMnu1 != undefined) {
            $(MyMnu1).dxContextMenu({
                items: mnuWPs,
                target: $(MyMnu1).next(),
                itemClickAction: mnuWPsItemClicked,
            });
            CurrentWpMenu = MyMnu1;
        }

        if (MyMnu2 != undefined) {
            $(MyMnu2).dxContextMenu({
                items: mnuWPsToTriaged,
                target: $(MyMnu2).next(),
                itemClickAction: mnuWPsToTriageItemClicked,
            });
            CurrentWpMenu = MyMnu2;
            //$(MyMnu2).dxContextMenu("hide");
            //$(MyMnu2).dxContextMenu("show");
        }

    }



    self.WpRightClick = function (wp, e) {

        // console.log(wp);
        areatype = 1;
        selectedWP = wp;

        //alert(selectedWP);

        dxMnuWP_Showing(wp);

        if (selectedWP.emr_status() == "0" || selectedWP.emr_status() == "10" || selectedWP.emr_status() == null) {
            $("#tblWP" + openedNS + " .dx-menu-item-text").filter(":containsIN('Fast')").parent().parent().attr("data-toggle", "modal");
            // $("#tblWP" + openedNS + " .dx-menu-item-text").filter(":containsIN('Fast')").parent().parent().attr("data-target", "#diagFTBeds");
            $("#tblWP" + openedNS + " .dx-menu-item-text").filter(":containsIN('Move to Bed')").parent().parent().attr("data-target", "#diagFTBeds");
            $("#tblWP" + openedNS + " .dx-menu-item-text").filter(":containsIN('Holding bay')").parent().parent().attr("data-target", "#diagTriagePriority");


        }
        else {
            $("#tblWP" + openedNS + " .dx-menu-item-text").filter(":containsIN('Move to Bed')").parent().parent().attr("data-toggle", "modal");
            $("#tblWP" + openedNS + " .dx-menu-item-text").filter(":containsIN('Move to Bed')").parent().parent().attr("data-target", "#diagBeds");
        }
    };


    // add by khalifa copy id
    self.WpLeftClick = function (wp, e) {
        // console.log(wp);
        //console.log(wp);

        areatype = 1;
        selectedWP = wp;
        // alert(wp.patient_id());
        //   alert(wp.patient_id())

        CopyDataToClibBoard(wp.patient_id());
    }

    // add by khalifa add border and remove when click to name 
    self.WpLeftClickAddBorder = function (wp) {
        // alert(wp.nstationcode)
        tableDle = "tblWP" + (wp.nstationcode()).toString();
        borderid = "wp" + (wp.patient_id()).toString();
        $('#' + tableDle + "> tbody > tr").each(function () {
            $(this).removeClass('addBorderSearch');
        })
        $('#' + borderid).addClass('addBorderSearch');
    }



    //add sticky add by khalifa in waiting patient
    self.opensticky = function (wp) {
        areatype = 1;
        selectedWP = wp;

        //alert(wp.patient_id())
        //alert(wp.episode_key())
        //alert(wp.patengname())

        vm.OpenStikyNotes(wp, wp.episode_key());

    }


}



function checkChild() {
    if (childwindow.closed) {
        clearInterval(timer);

        AfterSheetClose();
    }
}

function AfterSheetClose() {

    console.log('AfterAdmissionClose');

    //alert("after sheet close");
    //To Be Tested
    if (triagtype === 1) {
        //asaleh 1

        var pId = selectedWP.patient_id();
        var sKey = selectedWP.clinickey();
        var docId = selectedWP.physician_key();

        $("#loader-wrapper").fadeIn("slow", function () {
            $("#loader-wrapper").show();
        });
        //////
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "BedManagementApiActions/WaitingPatients/ReassignDoctor?drId=" + docId + "&sKey=" + sKey + "&pId=" + pId + "&uId=" + uId,
            success: function (data) {
                //console.log(data);
                var updatedBed = data;

                //DevExpress.ui.notify("Doctor assigned successfully.", "success", 1500);

                ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                    if (ns.sys_key() == openedNS) {

                        ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                            ko.utils.arrayForEach(room.allBeds(), function (bed) {
                                if (bed != undefined) {
                                    if (bed.sys_key() == updatedBed.sys_key && bed.patient_id() == updatedBed.patient_id) {
                                        bed.emr_status(updatedBed.emr_status);

                                        return false;
                                    }
                                }
                            });
                        });
                    }
                });

            },
            error: function (error) {
                //jsonValue = jQuery.parseJSON(error.responseText);
                console.log(error.responseText);
            }
        });

        //////
        $("#loader-wrapper").fadeIn("slow", function () {
            $("#loader-wrapper").hide();
        });

        triagtype = 0;
        return;
    }
    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
        if (ns.sys_key() == openedNS) {
            ko.utils.arrayForEach(ns.waitingPatients(), function (Wp) {
                if (Wp != undefined && selectedWP != undefined) {

                    //alert(selectedWP);

                    try {
                        if (Wp.patient_id() == selectedWP.patient_id()) {
                            //alert(Wp.patient_id());
                            //alert(selectedWP.patient_id());

                            ns.waitingPatients.remove(Wp);

                            $.getJSON("BedManagementApiActions/WaitingPatients/GetSingleWp?pId=" + Wp.patient_id() + "&hospId=" + hospitalid, function (allData) {
                                var updatedWP = allData;

                                //Wp.emr_status(updatedWP.emr_status);
                                //if (IsNumeric(updatedWP.emr_status) && updatedWP.emr_status != 0 && updatedWP.emr_status != 10)
                                //    Wp.emr_status_color(GetColorByStatus(updatedWP.emr_status));
                                //else {
                                //    Wp.emr_status_color('lightgray');
                                //    Wp.emr_status('0');
                                //}

                                //Wp.emr_status_time(updatedWP.emr_status_time);

                                var addWP = new WaitingPatient(updatedWP);
                                ns.waitingPatients.push(addWP);

                                /*$('#try_exta' + openedNS + ' .cnxMnuWp').each(function () {
                                    //console.log(mnuWPs);
                                    $(this).dxContextMenu({
                                        items: mnuWPs,
                                        target: $(this).next(),
                                        //position: { of: $(this).next() },
                                        //visible: mnuWPsVisible,
                                        itemClickAction: mnuWPsItemClicked,
                                        //invokeOnlyFromCode: true,
                                    });

                                });

                                $('#try_exta' + openedNS + ' .cnxMnuWpToTriage').each(function () {
                                    //console.log(mnuWPs);
                                    $(this).dxContextMenu({
                                        items: mnuWPsToTriaged,
                                        target: $(this).next(),
                                        //position: { of: $(this).next() },
                                        //visible: mnuWPsVisible,
                                        itemClickAction: mnuWPsToTriageItemClicked,
                                        //invokeOnlyFromCode: true,
                                    });

                                });*/

                            });

                            return false;
                        }
                    }
                    catch (err) {
                        $("#loader-wrapper").fadeOut("slow", function () {
                            $("#loader-wrapper").hide();
                        });
                    }
                }
            });

            return false;
        }
    });
}

//setInterval(function () {
//    //console.log(Wp.start_times);

//}, 1000);

var RoomBeds = function (roomBeds) {
    var self = this;
    self.score_status = ko.observable();
    self.refwaitintime = ko.observable();
    self.sys_key = ko.observable(roomBeds.sys_key);
    self.parent_key = ko.observable(roomBeds.parent_key);
    self.room_name = ko.observable(roomBeds.room_name);
    self.maintainance = ko.observable(roomBeds.maintainance);
    self.active = ko.observable(roomBeds.active);
    self.inactive = ko.observable(roomBeds.inactive);
    self.isolated = ko.observable(roomBeds.isolated);
    self.undercleaning = ko.observable(roomBeds.undercleaning);
    self.latin_desc = ko.observable(roomBeds.latin_desc);

    // age Icon Add By khalifa To Show Icon In Treatment
    self.pat_bithdate = ko.observable(roomBeds.pat_bithdate);

    self.age = ko.observable();
    try {
        var from = self.pat_bithdate().split(" ")[0].split("/");
        xd = new XDate(from[2], from[1] - 1, from[0]);

        var diffMs = new Date() - new Date(xd.toString());
        //var diffFs = diffMs / 1000; var diffMs = diffFs / 60; var diffHs = diffMs / 60; var diffDs = diffHs / 24; var diffMos = diffDs / 30; var diffYs = Math.floor(diffMos / 12);
        var diffYs = Math.floor(diffMs / 31536000000);
        if (isNaN(diffYs))
            self.age();
        else
            self.age(diffYs);
    }
    catch (ex) {

    }

    self.ageIcon = ko.observable();

    if (roomBeds.patient_sex == 1) {
        self.sex = ko.observable('occupiedMale');
        self.pSex = ko.observable('M');
        if (self.age() <= newborn) {
            self.ageIcon = ko.observable('assets/images/age/baby-boy.png');
            //  self.ageIconText = ko.observable('Newborn Male');
        }
        else if (self.age() > newborn && self.age() <= infant) {
            self.ageIcon = ko.observable('assets/images/age/boy.png');
            //  self.ageIconText = ko.observable('Infant Male');
        }
        else if (self.age() > infant && self.age() <= child) {
            self.ageIcon = ko.observable('assets/images/age/boy.png');
            // self.ageIconText = ko.observable('Child Male');
        }
        else if (self.age() > child) {
            self.ageIcon = ko.observable('assets/images/user.png');
            // self.ageIconText = ko.observable('Male');
        }

    }
    else if (roomBeds.patient_sex == 2) {
        self.sex = ko.observable('occupiedFemale');
        self.pSex = ko.observable('F');
        if (self.age() <= newborn) {
            self.ageIcon = ko.observable('assets/images/age/baby-girl.png');
            // self.ageIconText = ko.observable('Newborn Female');
        }
        else if (self.age() > newborn && self.age() <= infant) {
            self.ageIcon = ko.observable('assets/images/age/girl.png');
            //  self.ageIconText = ko.observable('Infant Female');
        }
        else if (self.age() > infant && self.age() <= child) {
            self.ageIcon = ko.observable('assets/images/age/girl.png');
            // self.ageIconText = ko.observable('Child Female');
        }
        else if (self.age() > child) {
            self.ageIcon = ko.observable('assets/images/user_female.png');
            // self.ageIconText = ko.observable('Female');
        }
    }
    else {
        self.sex = ko.observable('free');
        self.pSex = ko.observable('');
    }
    self.bed_class = ko.observable(roomBeds.bed_class);
    self.patient_id = ko.observable(roomBeds.patient_id);
    self.score = ko.observable(roomBeds.score);
    self.refwaitintime = ko.observable(roomBeds.refwaitintime);

    self.patient_sex = ko.observable(roomBeds.patient_sex);
    self.patengname = ko.observable(roomBeds.patengname);
    // add by khalifa Chief_Complaint
    self.Chief_Complaint = ko.observable(roomBeds.Chief_Complaint);

    self.patlocname = ko.observable(roomBeds.patlocname);
    self.status = ko.observable(roomBeds.status);


    self.start_date = ko.observable(roomBeds.start_date);
    self.systime = ko.observable(roomBeds.systime);
    self.emr_status_time = ko.observable(roomBeds.emr_status_time);
    self.emr_status = ko.observable(roomBeds.emr_status);

    if (IsNumeric(roomBeds.emr_status) && roomBeds.emr_status != 0 && roomBeds.emr_status != 10)
        self.emr_status_color = ko.observable(GetColorByStatus(roomBeds.emr_status));
    else {
        self.emr_status_color = ko.observable('lightgray');
        self.emr_status = ko.observable('0');
    }
    if (self.score() < 3) {
        self.score_status = ko.observable('green');
    }
    if (self.score() >= 3 && self.score() < 5) {
        self.score_status = ko.observable('yellow');
    }
    if (self.score() > 4) {
        self.score_status = ko.observable('red');
    }

    self.iswaitingarea = ko.observable(roomBeds.iswaitingarea);
    self.episodekey = ko.observable(roomBeds.episodekey);
    self.physician = ko.observable(roomBeds.physician);
    self.physician_key = ko.observable(roomBeds.physician_key);
    self.specialty = ko.observable(roomBeds.specialty);
    self.bedclassname = ko.observable(roomBeds.bedclassname);
    self.bedtype = ko.observable(roomBeds.bedtype);
    self.clinickey = ko.observable(roomBeds.clinickey);
    self.nurse = ko.observable(roomBeds.nurse);
    self.price = ko.observable(roomBeds.price);


    // treatment time start
    self.seenbyerdoctor_time = ko.observable(roomBeds.seenbyerdoctor_time);
    var start = new Date(roomBeds.seenbyerdoctor_time).getTime();
    var end = new Date().getTime();

    var diff = end - start;
    var minutes = Math.floor((diff / 1000) / 60);
    if (minutes == NaN) {
        minutes = 0;
    }

    self.onbed_time = ko.observable(minutes);
    if (self.seenbyerdoctor_time() == "") {
        self.onbed_time("--")
    }
    self.onbed_timeClass = ko.observable("ordertimeNormal");
    if (self.iswaitingarea() == 1 | self.patient_id() == "") {
        self.onbed_timeClass("");

    }
    self.onbed_time.subscribe(function (newValue) {

        if (self.iswaitingarea() == 1 | self.patient_id() == "") {
            self.onbed_timeClass("");

            return;
        }

        if (newValue == "--") {
            self.onbed_timeClass("ordertimeNormal");
        } else if (String(newValue).includes("Days") | String(newValue).includes("يوم")) {
            self.onbed_timeClass("OrderTimeUpnormal");
        } else if (newValue == "") {
            self.onbed_timeClass("");
        } else {
            self.onbed_timeClass("ordertimeNormal");
        }

        // remove colors

        $(".free .OrderTimeUpnormal").removeClass("OrderTimeUpnormal")
        $(".free .ordertimeNormal").removeClass("ordertimeNormal")



    })
    if (self.onbed_time() > 0 && self.iswaitingarea() == 0 && self.patient_id() != "") {
        var total = Number(self.onbed_time());
        var hrs = Math.floor(total / 60);
        var min = total % 60;
        var isdone = 0;
        if (hrs > 24) {
            self.onbed_time("+Days");
            isdone = 1;
        }
        if (hrs == 0 & isdone == 0) {
            self.onbed_time(min + "M");
            isdone = 1;
        }
        if (hrs > 0 & min == 0 && isdone == 0) {
            self.onbed_time(hrs + "H");
            isdone = 1;
        }
        if (hrs > 0 & min > 0 && isdone == 0) {
            self.onbed_time(hrs + "H:" + min + "M");
        }
    }
    self.CalcOnBedTime = function () {
        var start = new Date(self.seenbyerdoctor_time()).getTime();
        var end = new Date().getTime();
        var diff = end - start;
        var minutes = Math.floor((diff / 1000) / 60);
        if (minutes == NaN) {
            minutes = 0;
        }
        self.onbed_time(minutes);
        if (self.seenbyerdoctor_time() == "") {
            self.onbed_time("--")
        }

        if (self.iswaitingarea() == 1 | self.patient_id() == "") {
            self.onbed_timeClass("");
            self.onbed_time("");
            return;
        }


        if (self.onbed_time() > 0) {
            var total = Number(self.onbed_time());
            var hrs = Math.floor(total / 60);
            var min = total % 60;
            if (hrs > 24) {
                self.onbed_time("+Days")
                return;
            }
            if (hrs == 0) {
                self.onbed_time(min + "M");
                return;
            }
            if (hrs > 0 & min == 0) {
                self.onbed_time(hrs + "H");
                return;
            }
            if (hrs > 0 & min > 0) {
                self.onbed_time(hrs + "H:" + min + "M");
            }
        }

        // remove colors
        $(".free .OrderTimeUpnormal").removeClass("OrderTimeUpnormal")
        $(".free .ordertimeNormal").removeClass("ordertimeNormal")



    }

    // treatment time end 



    self.dischargeorderdate = ko.observable(roomBeds.dischargeorderdate);
    self.nursestationcode = ko.observable(roomBeds.nursestationcode);
    self.admissionrequested = ko.observable(roomBeds.admissionrequested);
    self.IsOutOfEr = ko.observable('');
    if (roomBeds.pat_location == '') {
        self.IsOutOfEr('In')
    }
    else {
        self.IsOutOfEr('Out')
    }
    self.pat_location = ko.observable(roomBeds.pat_location);
    self.location_type = ko.observable(roomBeds.location_type);
    self.investigation_type = ko.observable(roomBeds.investigation_type);
    self.waitingarea_time = ko.observable(roomBeds.waitingarea_time);

    self.locationIcon = ko.observable('');
    self.locationText = ko.observable('');

    if (roomBeds.patient_id != "") {
        if (roomBeds.location_type == "4") {
            if (roomBeds.investigation_type == "1") {
                self.locationIcon = ko.observable('assets/images/loc/lab.png');
                self.locationText = ko.observable(roomBeds.pat_location);
            }
            else if (roomBeds.investigation_type == "2") {
                self.locationIcon = ko.observable('assets/images/loc/rad.png');
                self.locationText = ko.observable(roomBeds.pat_location);
            }
            else {
                self.locationIcon = ko.observable('assets/images/beacon_light.gif');
                self.locationText = ko.observable('Emergency');
            }
        }
        else {
            self.locationIcon = ko.observable('assets/images/beacon_light.gif');
            self.locationText = ko.observable('Emergency');
        }

    }

    self.admitted = ko.observable(roomBeds.admitted);
    self.statusName = ko.observable(roomBeds.statusName);
    self.icon = ko.observable('/images/' + roomBeds.icon);
    self.color = ko.observable(roomBeds.color);
    self.location = ko.observable(roomBeds.location);
    self.x = roomBeds.location == null ? ko.observable() : ko.observable((parseInt(roomBeds.location.split(',')[0]) + 5) + 'px');
    self.y = roomBeds.location == null ? ko.observable() : ko.observable((parseInt(roomBeds.location.split(',')[1]) + 145) + 'px');
    self.rotation = roomBeds.rotation == null ? ko.observable(0) : ko.observable(roomBeds.rotation);
    self.bedAlerts = ko.observableArray([]);
    self.ntasksicon = self.patient_id() == "" ? ko.observable("") : ko.observable("Images/list_accept.png");
    //alert(self.ntasksicon() + " " + roomBeds.patient_id);
    self.tick = function () {
        if (roomBeds.patient_id != "") {
            $.getJSON("BedManagementApiActions/Beds/GetERSingleBed?pId=" + roomBeds.patient_id + "&uId=" + uId, function (allData) {
                var updatedBed = allData;

                self.admissionrequested(updatedBed.admissionrequested);
                self.admitted(updatedBed.admitted);
                self.refwaitintime(updatedBed.refwaitintime);
            });
        }
    }
    setInterval(self.tick, 12 * 5000 * 5);

    self.BedMouseMove = function (bed, event) {


        var mnu1 = 'cxOnBed' + bed.sys_key();
        var i = 0;
        selectedBed = bed;

        $('#try_extb' + openedNS + ' .cnxMnuTrtOnBed').each(function () {
            if ($('#try_extb' + openedNS + ' .cnxMnuTrtOnBed')[i].id == mnu1) {
                $(this).dxContextMenu({
                    items: mnuTrtmsOnBed,
                    target: $(this).next(),
                    itemClickAction: mnuTrtmsOnBedItemClicked,
                });
                CurrentBedMenu = this;
                self.bedRightClick(bed, event);
                return false;
            }
            i++



        });
    }
    self.OpenNurseTasks = function () {
        //alert(self.patient_id());
        ///NursingCareUI/Nursingcare.html?hospitalid=1&userkey=616&lang=0&dbcode=0&ismobile=0&mrn=33391&visit_type=er or inp or out
        console.log(self.patient_id())
        if ( self.patient_id() != '') {
            var url = "/NursingCareUI/Nursingcare.html?hospitalid=" + hospitalid + "&userkey=" + uId + "&lang=0&dbcode=" + dbcode + "&ismobile=0&mrn=" + self.patient_id() + "&visit_type=er";
            $('#framLog').attr("src", "");
            $('#framLog').attr("src", url);
            $('#logviewer').modal('show');
        }
  
    }



    self.bedRightClick = function (bed, event) {
        //mnuTrtOnBedVisible(true);
        areatype = 2;
        selectedNotOnBed = null;
        selectedBed = bed;

        dxMnuTrtOnBed_Showing(bed);
        CheckDiscrgeTest(bed);
        
        $.getJSON("BedManagementApiActions/WaitingPatients/CheckDischarge?episodkey=" + bed.episodekey(), function (allData) {
     
                 var disstatus = 0;
                 disstatus = allData;
                 if (allData == 0) {
                     $(".dx-menu-item-text").filter(":containsIN('Discharge Order')").parent().parent().attr("data-toggle", "modal");
                     $(".dx-menu-item-text").filter(":containsIN('Discharge Order')").parent().parent().attr("data-target", "#diagStatus");
     
                 }
     
             });



        $("#erroomsAndBeds .dx-menu-item-text").filter(":containsIN('Reassign')").parent().parent().attr("data-toggle", "modal");
        $("#erroomsAndBeds .dx-menu-item-text").filter(":containsIN('Reassign')").parent().parent().attr("data-target", "#diagDoctors");
        $("#erroomsAndBeds .dx-menu-item-text").filter(":containsIN('Move to Bed')").parent().parent().attr("data-toggle", "modal");
        $("#erroomsAndBeds .dx-menu-item-text").filter(":containsIN('Move to Bed')").parent().parent().attr("data-target", "#diagBeds");

    };




    //add sticky add by khalifa
    self.opensticky = function (openedNS) {
        areatype = 1;
        selectedWP = openedNS;

        //alert(wp.patient_id())
        //alert(wp.episode_key())
        //alert(wp.patengname())
        vm.OpenStikyNotes(openedNS, roomBeds.episodekey);

    }









    self.NotBedMouseMove = function (bed, event) {
        var mnu1 = 'cxNotOnBed' + bed.patient_id();
        var i = 0;
        selectedNotOnBed = bed;

        $('#try_extb' + openedNS + ' .cnxMnuTrtNotOnBed').each(function () {
            if ($('#try_extb' + openedNS + ' .cnxMnuTrtNotOnBed')[i].id == mnu1) {
                $(this).dxContextMenu({
                    items: mnuTrtmsNotOnBed,
                    target: $(this).next(),
                    itemClickAction: mnuTrtmsNotOnBedItemClicked,
                    position: { at: 'left top', my: 'left top' }
                });
                CurrentHPMenu = this;
                self.notOnBedRightClick(bed, event);
                return false;
            }
            i++;

        });

    }

    self.notOnBedRightClick = function (bed, event) {
        //mnuTrtNotOnBedVisible(true);
        areatype = 3;
        selectedBed = null;
        selectedNotOnBed = bed;
        //console.log(bed.nursestationcode())
        //console.log(bed)

        dxMnuTrtNotOnBed_Showing(bed);
        $(".dx-menu-item-text").filter(":containsIN('Discharge Order')").parent().parent().attr("data-toggle", "modal");
        $(".dx-menu-item-text").filter(":containsIN('Discharge Order')").parent().parent().attr("data-target", "#diagStatus");

        $("#erNotOnBeds .dx-menu-item-text").filter(":containsIN('Move to Bed')").parent().parent().attr("data-toggle", "modal");
        $("#erNotOnBeds .dx-menu-item-text").filter(":containsIN('Move to Bed')").parent().parent().attr("data-target", "#diagBeds");
        //  $("#erNotOnBeds .dx-menu-item-text").filter(":containsIN('Move to Bed')").parent().parent().attr("data-target", "#freeBeds");

        $("#erNotOnBeds .dx-menu-item-text").filter(":containsIN('Reassign')").parent().parent().attr("data-toggle", "modal");
        $("#erNotOnBeds .dx-menu-item-text").filter(":containsIN('Reassign')").parent().parent().attr("data-target", "#diagDoctors");

    };

    self.ShowBedMenu = function (bed) {

        CheckDiscrgeTest(bed);
        $(CurrentBedMenu).dxContextMenu("show");

    }
    self.OnBedClick = function (OnBed, e) {

        // add by khalifa  add border when click
        borderid = "bedId" + (OnBed.sys_key()).toString();
        //$('#erroomsAndBeds > table:nth-child(3) > tbody > tr ').each(function () {
        //    $(this).removeClass('addBorderSearch');
        //})
        $("tr[id^='bedId']").removeClass('addBorderSearch');
        $('#' + borderid).addClass('addBorderSearch');




        //console.log(OnBed);
        $("tr[id^='wp']").removeClass('selected_row_em');
        $("tr[id^='bedId']").removeClass('selected_row_em');
        $("tr[id^='pId']").removeClass('selected_row_em');

        var displayValue = $(".Patient-Banner").css("display");

        if (displayValue == "none") {
            if (OnBed.patient_id() != null && OnBed.patient_id() != 0) {
                $(".Patient-Banner").slideToggle();
                $('#bedId' + OnBed.sys_key()).addClass('selected_row_em');
            }
        }
        else {
            if (OnBed.patient_id() != null && OnBed.patient_id() != 0) {
                if (clickedBed != null) {
                    if (clickedBed.patient_id() == OnBed.patient_id()) {
                        $(".Patient-Banner").slideToggle();
                    }
                    else
                        $('#bedId' + OnBed.sys_key()).addClass('selected_row_em');
                }
                else
                    $('#bedId' + OnBed.sys_key()).addClass('selected_row_em');
            }
            else {
                $(".Patient-Banner").slideToggle();
            }
        }

        try {


            var xd = new XDate(OnBed.pat_bithdate());
            //console.log(xd.toString("yyyy MMM dd"));
            //if (xd.toString("yyyy MMM dd") == "Invalid Date")
            //{
            var from = OnBed.pat_bithdate().split(" ")[0].split("/");
            //console.log(from[2] + "   " + (from[1] - 1) + "   " + from[0]);
            xd = new XDate(from[2], from[1] - 1, from[0]);
            //console.log(xd.toString("yyyy MMM dd"));
            //}

        } catch (ex) { }

        $('#pbBDate').text(xd.toString("yyyy MMM dd") + "(" + OnBed.age() + "y)");

        if (OnBed.patient_sex() == 1)
            $('#pbGender').text("Male");
        else if (OnBed.patient_sex() == 2)
            $('#pbGender').text("Female");

        $('#pbName').text(OnBed.patengname());
        $('#pbMRN').text(OnBed.patient_id());


        clickedBed = OnBed;
        lastBedClick = "OnBed";
    }
    self.ShowHPMenu = function () {
        $(CurrentHPMenu).dxContextMenu("show");
    }

    self.NotOnBedClick = function (NotOnBed, e) {
        // alert("khalifa")
        // alert(NotOnBed.patient_id())
        // add by khalifa  add border when click
        borderid = "pId" + (NotOnBed.patient_id()).toString();
        $("tr[id^='pId']").removeClass('addBorderSearch');
        $('#' + borderid).addClass('addBorderSearch');





        //console.log(NotOnBed);
        $("tr[id^='wp']").removeClass('selected_row_em');
        $("tr[id^='bedId']").removeClass('selected_row_em');
        $("tr[id^='pId']").removeClass('selected_row_em');

        var displayValue = $(".Patient-Banner").css("display");

        if (displayValue == "none") {
            $(".Patient-Banner").slideToggle();
            $('#pId' + NotOnBed.patient_id()).addClass('selected_row_em');
        }
        else {
            if (clickedNotOnBed != null) {
                if (clickedNotOnBed.patient_id() == NotOnBed.patient_id()) {
                    $(".Patient-Banner").slideToggle();
                }
                else
                    $('#pId' + NotOnBed.patient_id()).addClass('selected_row_em');
            }
            else
                $('#pId' + NotOnBed.patient_id()).addClass('selected_row_em');
        }

        try {
            var xd = new XDate(NotOnBed.pat_bithdate());
            //console.log(xd.toString("yyyy MMM dd"));
            //if (xd.toString("yyyy MMM dd") == "Invalid Date")
            //{
            var from = NotOnBed.pat_bithdate().split(" ")[0].split("/");
            //console.log(from[2] + "   " + (from[1] - 1) + "   " + from[0]);
            xd = new XDate(from[2], from[1] - 1, from[0]);
            //console.log(xd.toString("yyyy MMM dd"));
            //}

            $('#pbBDate').text(xd.toString("yyyy MMM dd") + "(" + NotOnBed.age() + "y)");
        }
        catch (ex) { }

        $('#pbName').text(NotOnBed.patengname());


        if (NotOnBed.patient_sex() == 1)
            $('#pbGender').text("Male");
        else if (NotOnBed.patient_sex() == 2)
            $('#pbGender').text("Female");

        $('#pbMRN').text(NotOnBed.patient_id());


        clickedNotOnBed = NotOnBed;
        lastBedClick = "NotOnBed";
    }

    //console.log($('#bedId' + bed.sys_key()).attr('id'));
    //$('#bedId' + bed.sys_key()).contextmenu(mnuTest);
}

var BedAlerts = function (BedAlert) {
    this.sys_key = ko.observable(BedAlert.sys_key);
    this.patient_id = ko.observable(BedAlert.patient_id);
    this.alert_name = ko.observable(BedAlert.alert_name);
    this.add_or_remove = ko.observable(BedAlert.add_or_remove);
    this.status = ko.observable(BedAlert.status);
    this.alert_type = ko.observable(BedAlert.alert_type);
    this.tooltip = ko.observable(BedAlert.tooltip);
    this.icon = ko.observable('/images/' + BedAlert.icon);
    this.color = ko.observable(BedAlert.color);
}

$(document).ready(function () {




    AllPublicGeneralData.staff_key = getParameterByName("StaffKey")


    AllPublicGeneralData.Langid = getParameterByName("UILang")

    AllPublicGeneralData.Hospid = getParameterByName("hospitalid")





    //alert("hii");
    vm = new NursestationViewModel();
    vm.erWpList = function (item) { return this.nsErWpView(); }.bind(vm);
    vm.erInTrView = function (item) { return this.selectedViewInTrSmall(); }.bind(vm);
    vm.erViews = function (item) { return this.selectedErView(); }.bind(vm);

    ko.applyBindings(vm);


    setInterval(function () {
        //vm.nursestations()[0].roomsAndBeds()[0].beds()[2].patient_id ()

        ko.utils.arrayForEach(vm.nursestations(), function (tns) {

            ko.utils.arrayForEach(tns.roomsAndBeds(), function (robds) {

                ko.utils.arrayForEach(robds.beds(), function (beds) {
                    if (beds.patient_id() != "") {
                        beds.CalcOnBedTime();
                    }
                })



            })


        });


    }, 60000);





    // add by khalifa refreshAll button 
    $('#RefreshAllPage').click(function () {
        location.reload();
    })

    // add by khalifa close dialog 
    $('#closeBed').click(function () {
        // window.close();
        $('#diagBeds').css('display', 'none');
        $('.modal-backdrop').css('display', 'none');
    });

    $('#erToolBar').css('display', 'inline');
    $('#collAll').css('display', 'inline');
    $('#erView').css('display', 'block');

    setTimeout(function () {
        $("#erNsList .panelfullwidthS:first-child tr[id*='try_col'] td").on("click", function () {
            //console.log($(this).offset().top - 43);
            $('html,body').animate({ scrollTop: $(this).offset().top - 43 }, 800);
        });
        $("#erNsList .panelfullwidthS:not(:first-child) tr[id*='try_col'] td").slice(1).on("click", function () {
            //console.log($(this).offset().top + 0);
            $('html,body').animate({ scrollTop: $(this).offset().top + 0 }, 800);
        });

        //var all = $("#erNsList .panelfullwidthS:first-child tr[id*='try_col'] td");
        //$.each(all, function (indexR, valueR) {
        //    if (indexR == 0)
        //        $(this).on("click", function () {
        //            console.log('teet');
        //            $('html,body').animate({ scrollTop: $(this).offset().top - 43 }, 800);
        //        });
        //    else
        //        $(this).on("click", function () {
        //            console.log('teet2');
        //            $('html,body').animate({ scrollTop: $(this).offset().top - 00 }, 800);
        //        });
        //});

        //$('table[data-area="sec_header_area"]').hide();
        //$('table[data-area="main_header_area"]').on('click',
        //    function () {
        //        $(this).toggle();
        //        $(this).next().toggle();
        //    });
        //$('table[data-area="sec_header_area').on('click',
        //function () {
        //    $(this).toggle();
        //    $(this).prev().toggle();
        //});

        $("#slide_patient_data_details").click(function () {
            $(this).toggleClass("slide_patient_data_details_up slide_patient_data_details_down");
            $(".patient_data_details_slide").slideToggle();
        });




    }, 1000);

    $('#diagTriageSheet').on('hidden.bs.modal', function () {
        ModalSheetClose();
    })

    $('#diagAdmissionRequest').on('hidden.bs.modal', function () {
        ModalRequestAdmissionClose();
    })




    $("#txtGeneralSearch").keyup(function () {
        var foundRes = false;
        var foundNs = null;
        var foundBed = null;
        var foundNotOnBed = null;
        var foundWPatient = null;
        var searchtext = $("#txtGeneralSearch").val();

        // edit by khalifa
        //ko.utils.arrayForEach(vm.nursestations(), function (ns) {
        //    if (ns.sys_key() == openedNS) {

        //        var fromBed = null;
        //        ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {

        //            //console.log(frombk, bk, pId);
        //            ko.utils.arrayForEach(room.beds(), function (bed) {
        //                if (bed.sys_key() == frombk && bed.patient_id() == pId) {
        //                    fromBed = ko.toJSON(bed);

        //                    bed.sex('free');



        //edit by khalifa add border
        //  var rows = $("#txtTrtSearch" + ns.sys_key()).parent().parent().parent().parent().children().find("#erRoomsBeds").find("#erroomsAndBeds").children().find("tbody tr").addClass("addBorderSearch").hide()
        // 

        if (searchtext != '') {
            ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                ko.utils.arrayForEach(ns.waitingPatients(), function (Wp) {
                    if (Wp != undefined) {
                        //console.log(Wp.patengname().toString().toLowerCase() + "   " + searchtext.toLowerCase());
                        if (Wp.patient_id().toString().toLowerCase() == searchtext.toLowerCase() || Wp.patengname().toString().toLowerCase().trim() == searchtext.toLowerCase().trim()) {
                            //console.log(Wp.patengname().toString().toLowerCase() + "   " + searchtext.toLowerCase());
                            $("#lblSearchResult").html("Patient in: " + ns.latin_desc() + " ( Patient's Waiting List )");
                            foundRes = true;
                            foundNs = ns;
                            foundWPatient = Wp;
                            $("#txtWpSearch" + ns.sys_key()).val(searchtext);
                            // edit by khalifa add class
                            var rows = $("#tblWP" + openedNS + " tbody").find("tr").hide();
                            var data = searchtext.split(" ");
                            //   bed.sex('addBorderSearch')
                            $.each(data, function (i, v) {
                                //  rows.addClass("addBorderSearch");
                                rows.find("td:nth-child(5)").filter(":containsIN('" + v + "')").parent().addClass("addBorderSearch").show();
                                rows.find("td:nth-child(5)").filter(":containsIN('" + v + "')").parent().prev().addClass("addBorderSearch").show();
                                rows.find("td:nth-child(6)").filter(":containsIN('" + v + "')").parent().addClass("addBorderSearch").show();
                                rows.find("td:nth-child(6)").filter(":containsIN('" + v + "')").parent().prev().addClass("addBorderSearch").show();
                            });

                        }
                    }
                });

                if (foundRes == false) {
                    ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                        ko.utils.arrayForEach(room.beds(), function (bed) {
                            if (bed != undefined) {
                                //console.log(bed.patient_id())
                                if (bed.patient_id().toString().toLowerCase() == searchtext.toLowerCase() || bed.patengname().toString().toLowerCase().trim() == searchtext.toLowerCase().trim()) {
                                    $("#lblSearchResult").html("Patient in: " + ns.latin_desc() + " ( In Treatment ).");
                                    foundRes = true;
                                    foundNs = ns;
                                    foundBed = bed;
                                    $("#txtTrtSearch" + ns.sys_key()).val(searchtext);

                                    var rows = $("#txtTrtSearch" + ns.sys_key()).parent().parent().parent().children().find("#erRoomsBeds").find("#erroomsAndBeds").children().find("tbody tr ");

                                    // add by khalifa to show Bed Search in Treatment
                                    $("#bedId" + bed.sys_key()).parent().children().hide();
                                    $("#bedId" + bed.sys_key()).show();



                                    //   var rows = $(this).parents(2).next().children().first().find("tbody tr").css({ "background-color": "red", "border": "2px solid red" }).hide();
                                    //  var rows = $("#txtTrtSearch" + ns.sys_key()).parent().parent().parent().pare.addClass("addBorderSearch")
                                    //  var rows = $("#txtTrtSearch" + ns.sys_key()).parents(2).next().children().first().find("tbody tr").addClass("addBorderSearch").hide();
                                    var data = searchtext.split(" ");
                                    $.each(data, function (i, v) {
                                        rows.find("td:nth-child(4)").filter(":containsIN('" + v + "')").parent().addClass("addBorderSearch").show();
                                        rows.find("td:nth-child(4)").filter(":containsIN('" + v + "')").parent().prev().addClass("addBorderSearch").show();
                                        rows.find("td:nth-child(5)").filter(":containsIN('" + v + "')").parent().addClass("addBorderSearch").show();
                                        rows.find("td:nth-child(5)").filter(":containsIN('" + v + "')").parent().prev().addClass("addBorderSearch").show();
                                    });
                                }




                            }
                        })

                        ko.utils.arrayForEach(room.notOnBeds(), function (bed) {
                            if (bed != undefined) {
                                //console.log(bed.patengname().toString().toLowerCase() + "   " + searchtext.toLowerCase());
                                if (bed.patient_id().toString().toLowerCase() == searchtext.toLowerCase() || bed.patengname().toString().toLowerCase().trim() == searchtext.toLowerCase().trim()) {
                                    //console.log(bed.patengname().toString().toLowerCase() + "   " + searchtext.toLowerCase());
                                    $("#lblSearchResult").html("Patient in: " + ns.latin_desc() + " ( In Treatment ).");
                                    foundRes = true;
                                    foundNs = ns;
                                    foundNotOnBed = bed;
                                    $("#txtTrtSearch" + ns.sys_key()).val(searchtext);
                                    // edit by khalifa add class
                                    //var rows = $(this).parents(2).next().children().first().find("tbody tr").hide();
                                    // var rows = $("#txtTrtSearch" + ns.sys_key()).parents(2).next().children().first().find("tbody tr").hide();
                                    var rows = $("#txtTrtSearch" + ns.sys_key()).parents(2).next().children().find("tbody tr").hide();

                                    var data = searchtext.split(" ");
                                    $.each(data, function (i, v) {
                                       rows.find("td:contains('" + v + "')").parent().addClass("addBorderSearch").show();
                                        rows.find("td:contains('" + v + "')").parent().prev().addClass("addBorderSearch").show();


                                        /*   rows.find("td:nth-child(1)").filter(":containsIN('" + v + "')").parent().show();
                                           rows.find("td:nth-child(1)").filter(":containsIN('" + v + "')").parent().prev().show();
                                           rows.find("td:nth-child(2)").filter(":containsIN('" + v + "')").parent().show();
                                           rows.find("td:nth-child(2)").filter(":containsIN('" + v + "')").parent().prev().show(); */
                                    });

                                }
                            }
                        });

                    })









                }

            });

            if (foundRes == false)
                $("#lblSearchResult").html('');
            else {
                //console.log(foundNs.sys_key() + "   " + openedNS);
                if (openedNS == undefined || foundNs.sys_key() != openedNS) {
                    foundNs.collapseNS(foundNs, null);
                }


                if (foundWPatient != null) {
                    console.log(foundWPatient.patient_id() + "       " + lastBedClick + "       " + foundWPatient.patient_id() + "        " + (clickedWP == undefined ? 'undefined' : clickedWP.patient_id()));
                    if (clickedWP == undefined || (!(lastBedClick == "WP" && clickedWP.patient_id() == foundWPatient.patient_id())))
                        foundWPatient.wpClick(foundWPatient, null);
                }

                if (foundBed != null) {
                    console.log(foundBed.patient_id() + "       " + lastBedClick + "       " + foundBed.patient_id() + "        " + (clickedBed == undefined ? 'undefined' : clickedBed.patient_id()));
                    if (clickedBed == undefined || (!(lastBedClick == "OnBed" && clickedBed.patient_id() == foundBed.patient_id())))
                        foundBed.OnBedClick(foundBed, null);
                }

                if (foundNotOnBed != null) {
                    console.log(foundNotOnBed.patient_id() + "       " + lastBedClick + "       " + foundNotOnBed.patient_id() + "        " + (clickedNotOnBed == undefined ? 'undefined' : clickedNotOnBed.patient_id()));
                    if (clickedNotOnBed == undefined || (!(lastBedClick == "NotOnBed" && clickedNotOnBed.patient_id() == foundNotOnBed.patient_id())))
                        foundNotOnBed.NotOnBedClick(foundNotOnBed, null);
                }
            }
        }

    });

    // $.contextMenu.theme = 'vista';
    $(document).ready(function () {
        // alert("hiii2");
        //$(document).bind("contextmenu", function (e) {
        //   return false;
        //});
    });



});

function rdoNormal_Changed() {
    vm.selectedErView('erDetailed');

    $('#erMoitorAll').animate({ opacity: 0.0, marginLeft: '-40' }, 500, function () {

        $('#erMoitorAll').css('display', 'none');
        $('#erDetailed').css('display', 'block');
        $('#erDetailed').animate({ opacity: 1.0, marginLeft: '0px', marginRight: '0px' }, 500);

    });

    $('#patientsFilters').hide();
}

function rdoAll_Changed() {
    vm.selectedErView('erMonitorAll');

    $('#erDetailed').animate({ opacity: 0.0, marginLeft: '-40' }, 500, function () {

        $('#erDetailed').css('display', 'none');
        $('#erMoitorAll').css('display', 'flex');
        $('#erMoitorAll').animate({ opacity: 1.0, marginLeft: '0px', marginRight: '0px' }, 500);

    });

    //$('[id^="imgAllNSPsColl"]').attr('src', 'images/collapse_arrow_alt.png');
    $('.accAllContent').slideDown("slow");

    $('#patientsFilters').show();
}

function rdoAllCurrent_Changed() {

}

function rdoToTriage_Changed() {

}

function rdoTriaged_Changed() {

}

function rdoTreatment_Changed() {

}

function rdoAdmitted_Changed() {

}

function rdoDischarged_Changed() {

}

function rdoTrSmall_Changed() {
    SmallWpSmallTrSmallSm();
}

function rdoTrMed_Changed() {
    NoWpMedTrSmallSm();
}

function rdoTrLarge_Changed() {
    NoWpLargeTrNoSm();
}

function rdoWpSmall_Changed() {
    SmallWpSmallTrSmallSm();
}

function rdoWpMed_Changed() {
    MedWpNoTrMedSm();
}

function rdoWpLarge_Changed() {
    MedWpNoTrNoSm();
}

function SmallWpSmallTrSmallSm() {
    $('.panel1').css('width', '37%');
    $('.panel1').css('backgroundImage', 'none');
    $('.panel1').children().show();
    $('#wpLbl').hide();
    $('.panel2').css('width', '40%');
    $('.panel2').children().show();
    $('#TrLbl').hide();
    $('.panel3').css('width', '22%');
    $('.panel3').children().show();
    $('#SmLbl').hide();

    vm.selectedViewInTrSmall('erInTrSmall');
    vm.nsErWpView('nsERWPSmall');
}

function NoWpMedTrSmallSm() {
    $('.panel1').css('width', '3%');
    $('.panel1').css({ 'backgroundImage': '-webkit-linear-gradient(left, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.0) 51%, rgba(255, 255, 255, 0.2) 100%)', position: 'relative' });
    $('.panel1').children().hide();
    $('#wpLbl').show();
    $('#wpLbl').css({ whiteSpace: 'nowrap', position: 'absolute', top: '50%', transform: 'rotate(-90deg)', left: '0', 'background-image': 'none', border: 'none' });
    $('.panel2').css('width', '74%');
    $('.panel2').children().show();
    $('#TrLbl').hide();
    $('.panel3').css('width', '22%');
    $('.panel3').children().show();
    $('#SmLbl').hide();

    vm.selectedViewInTrSmall('erInTrMed');
}

function NoWpLargeTrNoSm() {
    $('.panel1').css('width', '3%');
    $('.panel1').children().hide();
    $('#wpLbl').show();
    $('.panel2').css('width', '93%');
    $('.panel2').children().show();
    $('#TrLbl').hide();
    $('.panel3').css('width', '3%');
    $('.panel3').children().hide();
    $('#SmLbl').show();
}

function MedWpNoTrMedSm() {
    $('.panel1').css('width', '74%');
    $('.panel1').children().show();
    $('#wpLbl').hide();
    $('.panel2').css('width', '3%');
    $('.panel2').children().hide();
    $('#TrLbl').show();
    $('.panel3').css('width', '22%');
    $('.panel3').children().show();
    $('#SmLbl').hide();

    vm.nsErWpView('nsERWPMed');
}

function MedWpNoTrNoSm() {
    $('.panel1').css('width', '93%');
    $('.panel1').children().show();
    $('#wpLbl').hide();
    $('.panel2').css('width', '3%');
    $('.panel2').children().hide();
    $('#TrLbl').show();
    $('.panel3').css('width', '3%');
    $('.panel3').children().hide();
    $('#SmLbl').show();
}

function ModalSheetClose() {
    $('#framTriageSheet').attr('src', '');
    AfterSheetClose();
}

function ModalRequestAdmissionClose() {
    $('#framRequestAdmission').attr('src', '');
    AfterAdmissionClose();
}





function AfterCancelRegistration(pId) {
    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
        ko.utils.arrayForEach(ns.waitingPatients(), function (Wp) {
            //$.each(objWps, function (indexR, valueR) {
            if (Wp != undefined) {
                //console.log(Wp.patient_id() + "   Before     " + objWps.MessageBody.patient_id);
                if (Wp.patient_id() == pId) {
                    ns.waitingPatients.remove(Wp);
                }
            }
            //});
        });
    });

    $('#diagCancelReg').modal('hide');
}


ko.bindingHandlers.sort = {
    init: function (element, valueAccessor) {
        var asc = false;

        ko.utils.registerEventHandler(element, 'click', function (event) {
            element.style.cursor = 'pointer';

            var value = ko.utils.unwrapObservable(valueAccessor()),
                sortBy = event.target.getAttribute('data-sort-by'),
                list = value.list,
                alwaysBy = value.alwaysBy;

            asc = !asc;
            list().sort(function (left, right) {
                var leftValue = left[sortBy],
                    rightValue = right[sortBy];

                if (typeof leftValue === 'string' && typeof rightValue === 'string') {
                    leftValue = leftValue.toLowerCase();
                    rightValue = rightValue.toLowerCase();
                }

                var x = 0;
                if (leftValue < rightValue) {
                    x = -1;
                } else if (leftValue > rightValue) {
                    x = 1;
                }
                x = asc ? x : -1 * x;
                if (alwaysBy) {
                    x = x ? x : left[alwaysBy] - right[alwaysBy];
                }

                return x;
            });

            //list.remove(list()[0]);
            //list.valueHasMutated();
        });
    }
};


function DoctorSearch() {
    if (selectedWP === undefined) {
        selectedWP = selectedNotOnBed;
    }
    var pId = selectedWP.patient_id();

    var ek = 0;
    try {
        ek = selectedWP.episode_key();
    }
    catch (ex) {
        ek = selectedWP.episodekey();
    }
    var sKey = 0;
    try {

        sKey = selectedWP.skey();
    }
    catch (ex) {
        skey = 0;
    }
    var bedKey = 0;
    if (areatype == 2) {
        //bedKey=selectedBed.sys_key();
        bedKey = SelectedBedKey;
        sKey = selectedBed.clinickey();
        pId = selectedBed.patient_id();
        ek = SelectedEpisodeKey;
    }
    else if (areatype == 3) {
        //bedKey=selectedNotOnBed.sys_key();
        bedKey = SelectedBedKey;
        sKey = selectedNotOnBed.clinickey();
        pId = selectedNotOnBed.patient_id()
        ek = SelectedEpisodeKey;
    }
    else {
        ko.utils.arrayForEach(vm.nursestations(), function (ns) {
            if (ns.sys_key() == openedNS) {
                ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                    ko.utils.arrayForEach(room.beds(), function (bed) {
                        if (bed != undefined) {
                            bedKey = bed.sys_key();
                            return false;
                        }
                    });
                    return false;
                });
                return false;
            }
        });
    }

    var DocList = [];
    for (i = 0; i < jsonErDoctors.length; i++) {
        if (jsonErDoctors[i].doctor_name.toLowerCase().indexOf($("#docsearch").val().toLowerCase()) >= 0) {
            DocList.push(jsonErDoctors[i]);
        }
    }
    if (triagtype === 4) {
        $("#doctorsList tbody").empty();
        $.each(DocList, function (indexR, valueR) {
            //console.log(jsonErDoctors[indexR]);
            $("#doctorsList tbody").append("<tr data-dismiss='modal' style='cursor:pointer;' tCode=" + fasttriagcode + " bedKey='" + bedKey +
                "' sKey='" + sKey + "' patientId='" + pId + "' episodeKey='" + ek + "' onclick='selectDoctor(this,\"" + DocList[indexR].doctor_id
                + "," + DocList[indexR].doctor_name + "\");'>" + "<td>" + DocList[indexR].doctor_name + "</td>" + "</tr>");
        })
        if ($("#docsearch").val() === "") {
            $("#doctorsList tbody").empty();
            $.each(jsonErDoctors, function (indexR, valueR) {
                //console.log(jsonErDoctors[indexR]);
                $("#doctorsList tbody").append("<tr data-dismiss='modal' style='cursor:pointer;' tCode=" + fasttriagcode + " bedKey='" + bedKey + "' sKey='" + sKey
                    + "' patientId='" + pId + "' episodeKey='" + ek + "' onclick='selectDoctor(this,\"" + jsonErDoctors[indexR].doctor_id + ","
                    + jsonErDoctors[indexR].doctor_name + "\");'>" + "<td>" + jsonErDoctors[indexR].doctor_name + "</td>" + "</tr>");
            })
        }


    }
    else {
        $("#doctorsList tbody").empty();
        $.each(DocList, function (indexR, valueR) {
            //console.log(jsonErDoctors[indexR]);
            $("#doctorsList tbody").append("<tr data-dismiss='modal' style='cursor:pointer;' bedKey='" + bedKey + "' sKey='" + sKey + "' patientId='" + pId
                + "' episodeKey='" + ek + "' onclick='selectDoctor(this,\"" + DocList[indexR].doctor_id + "," + DocList[indexR].doctor_name + "\");'>" + "<td>"
                + DocList[indexR].doctor_name + "</td>" + "</tr>");
        })
        if ($("#docsearch").val() === "") {
            $("#doctorsList tbody").empty();
            $.each(jsonErDoctors, function (indexR, valueR) {
                //console.log(jsonErDoctors[indexR]);
                $("#doctorsList tbody").append("<tr data-dismiss='modal' style='cursor:pointer;' bedKey='" + bedKey + "' sKey='" + sKey + "' patientId='" + pId
                    + "' episodeKey='" + ek + "' onclick='selectDoctor(this,\"" + jsonErDoctors[indexR].doctor_id + "," + jsonErDoctors[indexR].doctor_name + "\");'>" + "<td>"
                    + jsonErDoctors[indexR].doctor_name + "</td>" + "</tr>");
            })
        }
    }
    var CurrentWpMenu;
    var CurrentBedMenu;
    var CurrentHPMenu;

    //alert($("#docsearch").val());
}
function arSelected(e) {
    selectedAreacode = e.currentTarget.id;
}
function trSelected(e) {
    selectedTriagcode = e.currentTarget.id;
}
function ConfirmFTMove() {
    if (selectedTriagcode == 0 || selectedAreacode == 0) {
        DevExpress.ui.notify("Please select Triage level and Area.", "error", 1500);
        return;
    }
    $("#loader-wrapper").show('slow');

    var sKey = $('#diagNFast').attr("sKey");
    var uid = $('#diagNFast').attr("uId");
    var patientId = $('#diagNFast').attr("pId");
    var hospitalid = $('#diagNFast').attr("hid");
    var episodeKey = $('#diagNFast').attr("episodeKey");
    var wPat;
    $("#loader-wrapper").fadeIn("slow", function () {
        $("#loader-wrapper").show();
    });
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "BedManagementApiActions/WaitingPatients/FastMoveWPtoArea?tCode=" + selectedTriagcode +
            "&aKey=" + selectedAreacode +
            "&pId=" + patientId +
            "&ek=" + episodeKey + "&drId=" + uId +
            "&sKey=" + sKey + "&uId=" + uId +
            "&cBll=" + ER_EnableBilling +
            "&hospId=" + hospitalid,
        success: function (data) {
            //console.log(data);
            var updatedBed = data;

            if (updatedBed != null) {
                DevExpress.ui.notify("Patient moved successfully.", "success", 1500);

                ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                    if (ns.sys_key() == openedNS) {

                        ko.utils.arrayForEach(ns.waitingPatients(), function (Wp) {
                            if (Wp != undefined) {
                                //console.log(trtm);
                                if (Wp.patient_id() == patientId) {
                                    wPat = Wp;
                                    ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                                        if (updatedBed.parent_key == room.room_key()) {
                                            ko.utils.arrayForEach(room.beds(), function (bed) {
                                                //console.log(bed.sys_key());
                                                if (bed.sys_key() == bedKey && (bed.patient_id() == 0 || bed.patient_id() == null || bed.patient_id() == "")) {

                                                    var addBed = new RoomBeds(updatedBed);
                                                    bed.sex(addBed.sex());
                                                    bed.pSex(addBed.pSex());
                                                    bed.patient_id(addBed.patient_id());
                                                    bed.patient_sex(addBed.patient_sex());
                                                    bed.patengname(addBed.patengname());
                                                    // add by khalifa ageIcon Chief_Complaint
                                                    bed.Chief_Complaint(addBed.Chief_Complaint())
                                                    bed.ageIcon(addBed.ageIcon())

                                                    bed.patlocname(addBed.patlocname());
                                                    bed.status(addBed.status());
                                                    bed.pat_bithdate(addBed.pat_bithdate());
                                                    bed.age(addBed.age());
                                                    bed.start_date(addBed.start_date());
                                                    bed.systime(addBed.systime());
                                                    bed.emr_status_time(addBed.emr_status_time());
                                                    bed.emr_status(addBed.emr_status());
                                                    bed.emr_status_color(addBed.emr_status_color());
                                                    bed.iswaitingarea(addBed.iswaitingarea());
                                                    bed.episodekey(addBed.episodekey());
                                                    bed.physician(addBed.physician());
                                                    bed.physician_key(addBed.physician_key());
                                                    bed.specialty(addBed.specialty());
                                                    bed.bedtype(addBed.bedtype());
                                                    bed.clinickey(addBed.clinickey());
                                                    bed.nurse(addBed.nurse());
                                                    bed.statusName(addBed.statusName());
                                                    bed.icon(addBed.icon());
                                                    bed.color(addBed.color());
                                                    bed.location(addBed.location());
                                                    bed.admissionrequested(addBed.admissionrequested());
                                                    bed.pat_location(addBed.pat_location());
                                                    bed.location_type(addBed.location_type());
                                                    bed.investigation_type(addBed.investigation_type());
                                                    bed.admitted(addBed.admitted());
                                                    bed.locationIcon(addBed.locationIcon());
                                                    bed.locationText(addBed.locationText());
                                                    bed.bedAlerts(addBed.bedAlerts());

                                                    return false;
                                                }
                                            });

                                            return false;
                                        }
                                    });

                                    ns.waitingPatients.remove(Wp);
                                    return false;
                                }
                            }
                        });

                        UpdateMnuWps(ns);
                        ko.utils.arrayForEach(vm.nursestations(), function (tns) {
                            if (tns.sys_key() == selectedAreacode) {

                                UpdateMnuWps(tns);
                                tns.waitingPatients.push(wPat);
                                tns.RefreshAllTrt();
                                return false;
                            }
                        });
                        $('#diagNFast').modal("hide");
                        $("#loader-wrapper").hide('slow');
                        return false;
                    }
                });
            }
            else {
                $("#loader-wrapper").hide('slow');
                DevExpress.ui.notify("There is a patient on this bed.", "warning", 1500);
                $("#RefreshPats").click();
            }

        },
        error: function (error) {
            $("#loader-wrapper").hide('slow');
            console.log(error.responseText);
        }
    });
    $("#loader-wrapper").fadeIn("slow", function () {
        $("#loader-wrapper").hide();
    });
}
function MoveHPToBed(docId, bedKey, sKey, patientId, episodeKey) {
    $("#loader-wrapper").fadeIn("slow", function () {
        $("#loader-wrapper").show();
    });
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "BedManagementApiActions/WaitingPatients/MoveHPtoBed?bKey=" + bedKey + "&pId=" + patientId + "&ek=" + episodeKey + "&drId=" + docId +
            "&sKey=" + sKey + "&uId=" + uId,
        success: function (data) {
            //console.log(data);
            var updatedBed = data;
            $("#diagDoctors").modal("hide");
            DevExpress.ui.notify("Patient moved successfully.", "success", 1500);

            ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                if (ns.sys_key() == openedNS) {
                    ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {

                        ko.utils.arrayForEach(room.notOnBeds(), function (notOnBed) {
                            if (notOnBed.patient_id() == patientId) {
                                room.allBeds.remove(notOnBed);

                                return false;
                            }
                        });

                        ko.utils.arrayForEach(room.beds(), function (bed) {
                            //console.log(bed.sys_key());
                            if (bed.sys_key() == bedKey && (bed.patient_id() == 0 || bed.patient_id() == null)) {

                                var addBed = new RoomBeds(updatedBed);
                                bed.sex(addBed.sex());
                                bed.pSex(addBed.pSex());
                                bed.patient_id(addBed.patient_id());
                                bed.patient_sex(addBed.patient_sex());
                                bed.patengname(addBed.patengname());
                                // add by khalifa Chief_Complaint
                                bed.Chief_Complaint(addBed.Chief_Complaint());
                                bed.ageIcon(addBed.ageIcon());

                                bed.patlocname(addBed.patlocname());
                                bed.status(addBed.status());
                                bed.pat_bithdate(addBed.pat_bithdate());
                                bed.age(addBed.age());
                                bed.start_date(addBed.start_date());
                                bed.systime(addBed.systime());
                                bed.emr_status_time(addBed.emr_status_time());
                                bed.emr_status(addBed.emr_status());
                                bed.emr_status_color(addBed.emr_status_color());
                                bed.iswaitingarea(addBed.iswaitingarea());
                                bed.episodekey(addBed.episodekey());
                                bed.physician(addBed.physician());
                                bed.physician_key(addBed.physician_key());
                                bed.specialty(addBed.specialty());
                                bed.bedtype(addBed.bedtype());
                                bed.clinickey(addBed.clinickey());
                                bed.nurse(addBed.nurse());
                                bed.statusName(addBed.statusName());
                                bed.icon(addBed.icon());
                                bed.color(addBed.color());
                                bed.location(addBed.location());
                                bed.admissionrequested(addBed.admissionrequested());
                                bed.pat_location(addBed.pat_location());
                                bed.location_type(addBed.location_type());
                                bed.investigation_type(addBed.investigation_type());
                                bed.admitted(addBed.admitted());
                                bed.locationIcon(addBed.locationIcon());
                                bed.locationText(addBed.locationText());
                                bed.bedAlerts(addBed.bedAlerts());

                                return false;
                            }
                        });
                        alert("display")
                        $('#doctorsList').css('display', 'block');
                        UpdateMnuWps(ns);



                    });
                }
            });



        },
        error: function (error) {
            //jsonValue = jQuery.parseJSON(error.responseText);
            console.log(error.responseText);
        }
    });
    $("#loader-wrapper").fadeIn("slow", function () {
        $("#loader-wrapper").hide();
    });
}
function MoveToBed(docId, bedKey, sKey, patientId, episodeKey) {
    //console.log(elm);
    if (1 == 1) {
        //console.log(arg);


        if (1 == 1) {
            $("#loader-wrapper").fadeIn("slow", function () {
                $("#loader-wrapper").show();
            });
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: "BedManagementApiActions/WaitingPatients/MoveWPtoBed?bKey=" + bedKey + "&pId=" + patientId +
                    "&ek=" + episodeKey + "&drId=" + uId + "&sKey=" + sKey + "&uId=" + uId,
                success: function (data) {
                    //console.log(data);
                    var updatedBed = data;

                    if (updatedBed != null) {
                        DevExpress.ui.notify("Patient moved successfully.", "success", 1500);

                        try {
                            ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                                if (ns.sys_key() == openedNS) {

                                    ko.utils.arrayForEach(ns.waitingPatients(), function (Wp) {
                                        if (Wp != undefined) {
                                            //console.log(trtm);
                                            if (Wp.patient_id() == patientId) {

                                                ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                                                    if (updatedBed.parent_key == room.room_key()) {
                                                        ko.utils.arrayForEach(room.beds(), function (bed) {
                                                            //console.log(bed.sys_key());
                                                            if (bed.sys_key() == bedKey && (bed.patient_id() == 0 || bed.patient_id() == null || bed.patient_id() == "")) {

                                                                var addBed = new RoomBeds(updatedBed);
                                                                bed.sex(addBed.sex());
                                                                bed.pSex(addBed.pSex());
                                                                bed.patient_id(addBed.patient_id());
                                                                bed.patient_sex(addBed.patient_sex());
                                                                bed.patengname(addBed.patengname());
                                                                // add by khalifa ageIcon Chief_Complaint
                                                                bed.Chief_Complaint(addBed.Chief_Complaint());
                                                                bed.ageIcon(addBed.ageIcon());

                                                                bed.patlocname(addBed.patlocname());
                                                                bed.status(addBed.status());
                                                                bed.pat_bithdate(addBed.pat_bithdate());
                                                                bed.age(addBed.age());
                                                                bed.start_date(addBed.start_date());
                                                                bed.systime(addBed.systime());
                                                                bed.emr_status_time(addBed.emr_status_time());
                                                                bed.emr_status(addBed.emr_status());
                                                                bed.emr_status_color(addBed.emr_status_color());
                                                                bed.iswaitingarea(addBed.iswaitingarea());
                                                                bed.episodekey(addBed.episodekey());
                                                                bed.physician(addBed.physician());
                                                                bed.physician_key(addBed.physician_key());
                                                                bed.specialty(addBed.specialty());
                                                                bed.bedtype(addBed.bedtype());
                                                                bed.clinickey(addBed.clinickey());
                                                                bed.nurse(addBed.nurse());
                                                                bed.statusName(addBed.statusName());
                                                                bed.icon(addBed.icon());
                                                                bed.color(addBed.color());
                                                                bed.location(addBed.location());
                                                                bed.admissionrequested(addBed.admissionrequested());
                                                                bed.pat_location(addBed.pat_location());
                                                                bed.location_type(addBed.location_type());
                                                                bed.investigation_type(addBed.investigation_type());
                                                                bed.admitted(addBed.admitted());
                                                                bed.locationIcon(addBed.locationIcon());
                                                                bed.locationText(addBed.locationText());
                                                                bed.bedAlerts(addBed.bedAlerts());
                                                                return false;
                                                            }
                                                        });

                                                        return false;
                                                    }
                                                });

                                                ns.waitingPatients.remove(Wp);
                                                return false;
                                            }
                                        }
                                    });

                                    UpdateMnuWps(ns);

                                    return false;
                                }
                            });
                        }
                        catch (err) {
                            $("#loader-wrapper").fadeOut("slow", function () {
                                $("#loader-wrapper").hide();
                            });
                        }
                    }
                    else
                        DevExpress.ui.notify("There is a patient on this bed.", "warning", 1500);


                },
                error: function (error) {
                    //jsonValue = jQuery.parseJSON(error.responseText);
                    console.log(error.responseText);
                }
            });
            $("#loader-wrapper").fadeIn("slow", function () {
                $("#loader-wrapper").hide();
            });
        }

    }


}
function FastMoveToBed(docId, bedKey, sKey, patientId, episodeKey, tCode) {
    //console.log(elm);
    if (1 == 1) {
        //console.log(arg);


        if (1 == 1) {
            $("#loader-wrapper").fadeIn("slow", function () {
                $("#loader-wrapper").show();
            });

            $.getJSON("BedManagementApiActions/WaitingPatients/CheckMaximumCapacity?uId=" + uId + "&Ns=" + openedNS, function (allData) {
                if (allData == 0) {
                    DevExpress.ui.notify("Area reached Maximum Capacity.", "warning", 1500);
                    return;
                } else {
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        url: "BedManagementApiActions/WaitingPatients/FastMoveWPtoBed?tCode=" + tCode + "&bKey=" + bedKey + "&pId=" + patientId + "&ek=" + episodeKey + "&drId=" + docId + "&sKey=" + sKey + "&uId=" + uId + "&cBll=" + ER_EnableBilling + "&hospId=" + hospitalid,
                        success: function (data) {
                            //console.log(data);
                            $("#diagDoctors").modal("hide");

                            var updatedBed = data;

                            if (updatedBed != null) {
                                DevExpress.ui.notify("Patient moved successfully.", "success", 1500);

                                ko.utils.arrayForEach(vm.nursestations(), function (ns) {

                                    if (ns.sys_key() == openedNS) {

                                        ko.utils.arrayForEach(ns.waitingPatients(), function (Wp) {
                                            if (Wp != undefined) {
                                                //console.log(trtm);
                                                if (Wp.patient_id() == patientId) {

                                                    ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                                                        if (updatedBed.parent_key == room.room_key()) {
                                                            ko.utils.arrayForEach(room.beds(), function (bed) {
                                                                //console.log(bed.sys_key());
                                                                if (bed.sys_key() == bedKey && (bed.patient_id() == 0 || bed.patient_id() == null || bed.patient_id() == "")) {

                                                                    var addBed = new RoomBeds(updatedBed);
                                                                    bed.sex(addBed.sex());
                                                                    bed.pSex(addBed.pSex());
                                                                    bed.patient_id(addBed.patient_id());
                                                                    bed.patient_sex(addBed.patient_sex());
                                                                    bed.patengname(addBed.patengname());
                                                                    // add by khalifa ageIcon Chief_Complaint
                                                                    bed.Chief_Complaint(addBed.Chief_Complaint());
                                                                    bed.ageIcon(addBed.ageIcon());

                                                                    bed.patlocname(addBed.patlocname());
                                                                    bed.status(addBed.status());
                                                                    bed.pat_bithdate(addBed.pat_bithdate());
                                                                    bed.age(addBed.age());
                                                                    bed.start_date(addBed.start_date());
                                                                    bed.systime(addBed.systime());
                                                                    bed.emr_status_time(addBed.emr_status_time());
                                                                    bed.emr_status(addBed.emr_status());
                                                                    bed.emr_status_color(addBed.emr_status_color());
                                                                    bed.iswaitingarea(addBed.iswaitingarea());
                                                                    bed.episodekey(addBed.episodekey());
                                                                    bed.physician(addBed.physician());
                                                                    bed.physician_key(addBed.physician_key());
                                                                    bed.specialty(addBed.specialty());
                                                                    bed.bedtype(addBed.bedtype());
                                                                    bed.clinickey(addBed.clinickey());
                                                                    bed.nurse(addBed.nurse());
                                                                    bed.statusName(addBed.statusName());
                                                                    bed.icon(addBed.icon());
                                                                    bed.color(addBed.color());
                                                                    bed.location(addBed.location());
                                                                    bed.admissionrequested(addBed.admissionrequested());
                                                                    bed.pat_location(addBed.pat_location());
                                                                    bed.location_type(addBed.location_type());
                                                                    bed.investigation_type(addBed.investigation_type());
                                                                    bed.admitted(addBed.admitted());
                                                                    bed.locationIcon(addBed.locationIcon());
                                                                    bed.locationText(addBed.locationText());
                                                                    bed.bedAlerts(addBed.bedAlerts());

                                                                    return false;
                                                                }
                                                            });

                                                            return false;
                                                        }
                                                    });

                                                    ns.waitingPatients.remove(Wp);
                                                    return false;
                                                }
                                            }
                                        });

                                        UpdateMnuWps(ns);


                                        return false;
                                    }
                                });




                            }
                            else {
                                DevExpress.ui.notify("There is a patient on this bed.", "warning", 1500);
                                $("#RefreshPats").click();
                            }

                        },
                        error: function (error) {
                            //jsonValue = jQuery.parseJSON(error.responseText);
                            console.log(error.responseText);
                        }
                    });
                }
            })

         
            $("#loader-wrapper").fadeIn("slow", function () {
                $("#loader-wrapper").hide();
            });
        }

    }


}

function OpenEMR(e) {
    if (e.button != 0) {
        return;
    }
    var pId = e.target.getAttribute("pId");
    var ek = e.target.getAttribute("eps");
    var pName = e.target.getAttribute("pname");
    try {
        var dynaID;
        $.getJSON("../BedWhiteBoardWeb/BedManagementApiActions/Emergency/GetEMROrDyna?hospitalID=" + hospitalid, function (data) {
            dynaID = JSON.parse(data);

            childwindowEMR = window.parent.General_AddNewTabwon(pId, pId + ' ' + pName, ek, 0, 100, 'E', (dynaID === "" || dynaID === undefined ? 0 : dynaID))

        });

        setTimeout(function () {
            $(e.itemElement).parent().hide();
        }, 2000);


    }
    catch (err) { }

    $.getJSON("BedManagementApiActions/WaitingPatients/OpenEMR?pId=" + pId + "&ek=" + ek + "&uId=" + uId + "&seen=" + (seen == "" || seen == undefined ? 0 : 1), function (allData) {

    });

    selectedBed.seenbyerdoctor_time(new Date());
}


// add by khalifa
function getURL() {
    return ((window.location.href.split('?')[1]).split('&')[3]).split('=')[1];
}



// add by khalifa
function getAllNurseStation(startdate, wbType, uId, hospitalid) {


    $.getJSON("BedManagementApiActions/Nursestations/GetAllNurseStationsWithAlertsER?startDate=" + startdate + "&NsType=" + wbType + "&uId=" + uId + "&hospId=" + hospitalid, function (allData) {
        var mappedNursestations = $.map(allData, function (Ns) { return new Nursestation(Ns) });
        // self.nursestations(mappedNursestations);
        vm.nursestations(mappedNursestations)
    });

}





// add b khalifa to refresh Chart Wpchart chartWPOptions

function updateWpChart() {
    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
        if (ns.sys_key() == openedNS) {
            ns.chartWPOptions
        }
    })
}
