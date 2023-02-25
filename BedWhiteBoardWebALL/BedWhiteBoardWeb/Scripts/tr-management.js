/// <reference path="er-management.js" />
//var DuplexIP = "http://localhost/";
var DuplexIP = "";
var jsonRoomsAndBeds;
var openedNS;
var vm;
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
var newborn;
var infant;
var child;
var adult;
var MnuesAttached = [];
var ER_EnableFastTriage = 0;
var ER_EnableBilling = 0;
var Enable_Alphanumric_PID = 0;

//debugger;
//var str = '{"sys_key":1306,"parent_key":1305,"maintainance":0,"active":0,"inactive":0,"isolated":0,"undercleaning":0,"latin_desc":"RESUS 6","sex":"occupiedFemale","pSex":"F","bed_class":1015,"patient_id":101267441,"patient_sex":2,"patengname":"JESSA WONG      ","patlocname":"       ","status":1,"pat_bithdate":"07/08/1989 12:00:00 AM","age":26,"start_date":"06/06/2016 12:00:00 AM","systime":"","emr_status_time":"06/06/2016 1:42:39 PM","emr_status":2,"emr_status_color":"Red","iswaitingarea":0,"episodekey":44804,"physician":"DR NANTHA KUMERAN                                 ","physician_key":3537,"specialty":"Resident Medical Officer","bedclassname":"SELF-PAY","bedtype":2,"clinickey":4,"nurse":"","price":0,"nursestationcode":1016,"admissionrequested":0,"pat_location":"","location_type":"","investigation_type":"","locationIcon":"assets/images/loc/emergancy.png","locationText":"Emergency","admitted":0,"statusName":null,"icon":"/images/null","color":null,"location":null,"rotation":0,"bedAlerts":[{"sys_key":1,"patient_id":"101267441","alert_name":"High Temprature","add_or_remove":"Add","status":"","alert_type":"bed","tooltip":"High Temprature:37.50 Degrees","icon":"/images/","color":""},{"sys_key":2,"patient_id":"101267441","alert_name":"Systolic Blood Pressure","add_or_remove":"Add","status":"","alert_type":"bed","tooltip":"Systolic Blood Pressure:128.00","icon":"/images/","color":""}]}';
//var jsonStr = JSON.parse(str);
//console.log(jsonStr.sys_key);

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
        //console.log(allData);
        //console.log(serverTime);
        //console.log(localTime);
        //console.log(timeDiff);
        //console.log(serverTimeProcessed);
        //console.log(new XDate(serverTimeProcessed));
        //console.log(new XDate());
    }, 1000);
});

var ip;
var chat;

$.getJSON("BedManagementApiActions/Nursestations/GetIP", function (allData) {
    ip = allData;
    //console.log(ip);

    $(function myfunction() {

        //$.getScript("Scripts/jScript171.js").done(function () {
        //console.log(ip + 'SignalRNetDuplex/NetDuplex');
        if (DuplexIP == "")
            DuplexIP = ip;

        var connection = jQuery.hubConnection(DuplexIP + 'DuplexCaller/NetDuplex', { useDefaultPath: false });
        chat = connection.createHubProxy('NetDuplex');
        connection.logging = true;

        chat.on('InitialReceiveCompleted', function (e) {
            console.log('Initial receive Completed');
            //console.log(e);
            //console.log('MessageHeader: ' + e.Message.MessageHeader + '           MessageBody: ' + e.MessageBody + '.   OnInitialreceiveCompleted');

            $.each(e, function (indexR, valueR) {
                //console.log(e[indexR]);
                console.log(e[indexR].MessageHeader);
                //console.log(e[indexR].MessageBody);


                if (e[indexR].MessageHeader.toUpperCase() == "ER ALERTS") {
                    var jsonBedsAlerts = e[indexR].MessageBody;
                    //console.log(jsonBedsAlerts);
                    var objBedsAlerts = JSON.parse(jsonBedsAlerts);

                    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                        if (ns.sys_key() == openedNS) {
                            //console.log(ns.roomsAndBeds().length);
                            ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
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
                                                    console.log(bed.latin_desc() + '  ||  ' + bed.patient_id() + ' || ' + objBedsAlerts[indexR].patient_id);
                                                    if (bed.patient_id() == objBedsAlerts[indexR].patient_id) {
                                                        console.log(objBedsAlerts[indexR].patient_id);
                                                        console.log(objBedsAlerts[indexR].tooltip);
                                                        if (objBedsAlerts[indexR].add_or_remove == "Add") {
                                                            console.log(objBedsAlerts[indexR].patient_id);
                                                            console.log(objBedsAlerts[indexR].tooltip);
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
                                                            if (alertBed.alert_name().toLowerCase() == objBedsAlerts[indexR].alert_name.toLowerCase()) {
                                                                bed.bedAlerts.remove(alertBed);
                                                            }
                                                        }
                                                    }
                                                    //console.log(bed.bedAlerts());
                                                }
                                            }
                                            else {
                                                if (objBedsAlerts[indexR] != undefined) {
                                                    console.log(bed.latin_desc() + '  ||  ' + bed.patient_id() + ' || ' + objBedsAlerts[indexR].PATIENT_ID);
                                                    if (bed.patient_id() == objBedsAlerts[indexR].PATIENT_ID) {
                                                        console.log(objBedsAlerts[indexR].PATIENT_ID);
                                                        console.log(objBedsAlerts[indexR].TOOLTIP);
                                                        if (objBedsAlerts[indexR].ADD_OR_REMOVE == "Add") {
                                                            console.log(objBedsAlerts[indexR].PATIENT_ID);
                                                            console.log(objBedsAlerts[indexR].TOOLTIP);
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
                        }
                    });

                }


            });
        });

        chat.on('receivingCompleted', function (e) {
            // $('#div1').append('<li><b>' + message.MessageHeader + '::' + message.MessageBody + '</b></li>');

            //alert("Teeeeeeeeeeeeeeeeeeeeeeeesttttttttttttttttttttttttt");

            console.log('receivingCompleted');
            //console.log(e);
            console.log('MessageHeader: ' + e.MessageHeader + '           MessageBody: ' + e.MessageBody + '.   OnReceivingCompleted');

            if (e.MessageHeader.toUpperCase() == "ER PATIENT ARRIVED") {
                //console.log(e.MessageBody);
                var jsonWps = e.MessageBody.replace(/"([^"]+)":/g, function ($0, $1) { return ('"' + $1.toLowerCase() + '":'); });
                var objWps = JSON.parse(jsonWps);

                if ($.isEmptyObject(objWps) == false) {
                    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                        ko.utils.arrayForEach(ns.waitingPatients(), function (Wp) {
                            $.each(objWps, function (indexR, valueR) {
                                if (Wp != undefined) {
                                    if (Wp.patient_id() == objWps[indexR].patient_id) {
                                        ns.waitingPatients.remove(Wp);
                                    }
                                }
                            });
                        });
                    });

                    try
                    {
                        var exist = false;
                        ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                            ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                                $.each(objWps, function (indexR, valueR) {
                                    ko.utils.arrayForEach(room.allBeds(), function (bed) {
                                        if (bed != undefined) {
                                            if (bed.patient_id() == objWps[indexR].patient_id) {
                                                exist = true;
                                            }
                                        }
                                    });
                                });
                            });
                        });
                    }
                    catch(err){}

                    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                        $.each(objWps, function (indexR, valueR) {
                            //console.log(objWps[indexR]);
                            //console.log(ns.sys_key() + "              " + objWps[indexR].nstationcode);
                            if (ns.sys_key() == objWps[indexR].nstationcode && exist == false) {
                                ns.waitingPatients.push(new WaitingPatient(objWps[indexR]));
                                //$('#wp' + objWps[indexR].patient_id).contextMenu(mnuWPs);

                                //if (objWps[indexR].emr_status != 0) {
                                //    //$('#wp' + objWps[indexR].patient_id).contextMenu(emptyBeds);
                                //}
                            }
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
                }
            }
            else if (e.MessageHeader.toUpperCase() == "ER PATIENT DRAGED") {
                //console.log(e.MessageBody);
                var jsonTrtms = e.MessageBody.replace(/"([^"]+)":/g, function ($0, $1) { return ('"' + $1.toLowerCase() + '":'); });
                var objTrtms = JSON.parse(jsonTrtms);

                if ($.isEmptyObject(objTrtms) == false) {
                    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                        ko.utils.arrayForEach(ns.waitingPatients(), function (Wp) {
                            $.each(objTrtms, function (indexR, valueR) {
                                if (Wp != undefined) {
                                    //console.log(trtm);
                                    if (Wp.patient_id() == objTrtms[indexR].patient_id) {
                                        ns.waitingPatients.remove(Wp);
                                    }
                                }
                            });
                        });
                        //ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                        //    ko.utils.arrayForEach(room.allBeds(), function (trtm) {
                        //        $.each(objTrtms, function (indexR, valueR) {
                        //            if (trtm != undefined) {
                        //                //console.log(trtm);
                        //                if (trtm.patient_id() == objTrtms[indexR].patient_id) {
                        //                    room.allBeds.remove(trtm);
                        //                }
                        //            }
                        //        });
                        //    });
                        //});
                    });

                    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                        ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                            $.each(objTrtms, function (indexR, valueR) {
                                var edited = false;
                                ko.utils.arrayForEach(room.allBeds(), function (bed) {
                                    if (bed != undefined) {
                                        if (bed.patient_id() == objTrtms[indexR].patient_id) {

                                            bed.sys_key(objTrtms[indexR].sys_key);
                                            bed.parent_key(objTrtms[indexR].parent_key);
                                            bed.room_name(objTrtms[indexR].room_name);
                                            //bed.maintainance(objTrtms[indexR].maintainance);
                                            //bed.active(objTrtms[indexR].active);
                                            //bed.inactive(objTrtms[indexR].inactive);
                                            //bed.isolated(objTrtms[indexR].isolated);
                                            //bed.undercleaning(objTrtms[indexR].undercleaning);
                                            bed.latin_desc(objTrtms[indexR].latin_desc);
                                            if (objTrtms[indexR].patient_sex == 1) {
                                                bed.sex('occupiedMale');
                                                bed.pSex('M');
                                            }
                                            else if (objTrtms[indexR].patient_sex == 2) {
                                                bed.sex('occupiedFemale');
                                                bed.pSex('F');
                                            }
                                            else {
                                                bed.sex('free');
                                                bed.pSex('');
                                            }
                                            //bed.bed_class(objTrtms[indexR].bed_class);
                                            bed.patient_id(objTrtms[indexR].patient_id);
                                            bed.patient_sex(objTrtms[indexR].patient_sex);
                                            bed.patengname(objTrtms[indexR].patengname);
                                            bed.patlocname(objTrtms[indexR].patlocname);
                                            bed.status(objTrtms[indexR].status);
                                            bed.pat_bithdate(objTrtms[indexR].pat_bithdate);
                                            var diffMs = new Date() - new Date(objTrtms[indexR].pat_bithdate);
                                            //var diffFs = diffMs / 1000; var diffMs = diffFs / 60; var diffHs = diffMs / 60; var diffDs = diffHs / 24; var diffMos = diffDs / 30; var diffYs = Math.floor(diffMos / 12);
                                            var diffYs = Math.floor(diffMs / 31536000000);
                                            if (isNaN(diffYs))
                                                bed.age();
                                            else
                                                bed.age(diffYs);

                                            bed.start_date(objTrtms[indexR].start_date);
                                            bed.systime(objTrtms[indexR].systime);
                                            bed.emr_status_time(objTrtms[indexR].emr_status_time);
                                            bed.emr_status(objTrtms[indexR].emr_status);

                                            if (IsNumeric(objTrtms[indexR].emr_status) && objTrtms[indexR].emr_status != 0 && objTrtms[indexR].emr_status != 10)
                                                bed.emr_status_color = ko.observable(GetColorByStatus(objTrtms[indexR].emr_status));
                                            else {
                                                bed.emr_status_color = ko.observable('lightgray');
                                                bed.emr_status = ko.observable('0');
                                            }

                                            bed.iswaitingarea(objTrtms[indexR].iswaitingarea);
                                            bed.episodekey(objTrtms[indexR].episodekey);
                                            bed.physician(objTrtms[indexR].physician);
                                            bed.physician_key(objTrtms[indexR].physician_key);
                                            bed.specialty(objTrtms[indexR].specialty);
                                            //bed.bedclassname(objTrtms[indexR].bedclassname);
                                            bed.bedtype(objTrtms[indexR].bedtype);
                                            bed.clinickey(objTrtms[indexR].clinickey);
                                            bed.nurse(objTrtms[indexR].nurse);
                                            //bed.price(objTrtms[indexR].price);
                                            bed.nursestationcode(objTrtms[indexR].nursestationcode);
                                            bed.statusName(objTrtms[indexR].statusName);
                                            bed.icon('/images/' + objTrtms[indexR].icon);
                                            bed.color(objTrtms[indexR].color);
                                            bed.location(objTrtms[indexR].location);
                                            //bed.x = objTrtms[indexR].location == null ? ko.observable() : ko.observable((parseInt(objTrtms[indexR].location.split(',')[0]) + 5) + 'px');
                                            //bed.y = objTrtms[indexR].location == null ? ko.observable() : ko.observable((parseInt(objTrtms[indexR].location.split(',')[1]) + 145) + 'px');
                                            //bed.rotation = objTrtms[indexR].rotation == null ? ko.observable(0) : ko.observable(objTrtms[indexR].rotation);

                                            //console.log('Edited');
                                            //console.log(bed);
                                            edited = true;
                                        }
                                    }
                                });

                                if (!edited) {
                                    if (room.room_key() == objTrtms[indexR].parent_key) {
                                        var addBed = new RoomBeds(objTrtms[indexR]);
                                        //console.log('Added');
                                        //console.log(addBed);
                                        room.allBeds.push(addBed);
                                    }
                                }
                            });

                            //console.log(room.allBeds());
                            //room.buildBeds();

                            if (ns.sys_key() == openedNS) {
                                UpdateMnuWps(ns);

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
                            }
                        });
                    });


                }

            }
            else if (e.MessageHeader.toUpperCase() == "ER BEDS") {
                //console.log(e.MessageBody);
                var jsonTrtms = e.MessageBody.replace(/"([^"]+)":/g, function ($0, $1) { return ('"' + $1.toLowerCase() + '":'); });
                var objTrtms = JSON.parse(jsonTrtms);

                if ($.isEmptyObject(objTrtms) == false) {

                    // check if he was in waiting patients to remove it
                    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                        ko.utils.arrayForEach(ns.waitingPatients(), function (Wp) {
                            $.each(objTrtms, function (indexR, valueR) {
                                if (Wp != undefined) {
                                    //console.log(trtm);
                                    if (Wp.patient_id() == objTrtms[indexR].patient_id) {
                                        ns.waitingPatients.remove(Wp);
                                    }
                                }
                            });
                        });

                        // check if he was in notOnBeds to remove it
                        ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                            ko.utils.arrayForEach(room.notOnBeds(), function (notOnBed) {
                                $.each(objTrtms, function (indexR, valueR) {
                                    if (notOnBed != undefined) {
                                        //console.log(trtm);
                                        if (notOnBed.patient_id() == objTrtms[indexR].patient_id) {
                                            room.allBeds.remove(notOnBed);
                                        }
                                    }
                                });
                            });

                            // edit the data of row in beds observable
                            $.each(objTrtms, function (indexR, valueR) {
                                ko.utils.arrayForEach(room.beds(), function (bed) {
                                    if (bed != undefined) {
                                        if (bed.sys_key() == objTrtms[indexR].sys_key) {

                                            bed.latin_desc(objTrtms[indexR].latin_desc);
                                            if (objTrtms[indexR].patient_sex == 1) {
                                                bed.sex('occupiedMale');
                                                bed.pSex('M');
                                            }
                                            else if (objTrtms[indexR].patient_sex == 2) {
                                                bed.sex('occupiedFemale');
                                                bed.pSex('F');
                                            }
                                            else {
                                                bed.sex('free');
                                                bed.pSex('');
                                            }
                                            //bed.bed_class(objTrtms[indexR].bed_class);
                                            bed.patient_id(objTrtms[indexR].patient_id);
                                            bed.patient_sex(objTrtms[indexR].patient_sex);
                                            bed.patengname(objTrtms[indexR].patengname);
                                            bed.patlocname(objTrtms[indexR].patlocname);
                                            bed.status(objTrtms[indexR].status);
                                            bed.pat_bithdate(objTrtms[indexR].pat_bithdate);
                                            var diffMs = new Date() - new Date(objTrtms[indexR].pat_bithdate);
                                            //var diffFs = diffMs / 1000; var diffMs = diffFs / 60; var diffHs = diffMs / 60; var diffDs = diffHs / 24; var diffMos = diffDs / 30; var diffYs = Math.floor(diffMos / 12);
                                            var diffYs = Math.floor(diffMs / 31536000000);
                                            if (isNaN(diffYs))
                                                bed.age();
                                            else
                                                bed.age(diffYs);

                                            bed.start_date(objTrtms[indexR].start_date);
                                            bed.systime(objTrtms[indexR].systime);
                                            bed.emr_status_time(objTrtms[indexR].emr_status_time);
                                            bed.emr_status(objTrtms[indexR].emr_status);

                                            if (IsNumeric(objTrtms[indexR].emr_status) && objTrtms[indexR].emr_status != 0 && objTrtms[indexR].emr_status != 10)
                                                bed.emr_status_color = ko.observable(GetColorByStatus(objTrtms[indexR].emr_status));
                                            else {
                                                bed.emr_status_color = ko.observable('lightgray');
                                                bed.emr_status = ko.observable('0');
                                            }

                                            bed.iswaitingarea(objTrtms[indexR].iswaitingarea);
                                            bed.episodekey(objTrtms[indexR].episodekey);
                                            bed.physician(objTrtms[indexR].physician);
                                            bed.physician_key(objTrtms[indexR].physician_key);
                                            bed.specialty(objTrtms[indexR].specialty);
                                            //bed.bedclassname(objTrtms[indexR].bedclassname);
                                            bed.bedtype(objTrtms[indexR].bedtype);
                                            bed.clinickey(objTrtms[indexR].clinickey);
                                            bed.nurse(objTrtms[indexR].nurse);
                                            //bed.price(objTrtms[indexR].price);
                                            bed.nursestationcode(objTrtms[indexR].nursestationcode);
                                            //bed.statusName(objTrtms[indexR].statusName);
                                            bed.icon('/images/' + objTrtms[indexR].icon);
                                            bed.color(objTrtms[indexR].color);
                                            bed.location(objTrtms[indexR].location);
                                            //bed.x = objTrtms[indexR].location == null ? ko.observable() : ko.observable((parseInt(objTrtms[indexR].location.split(',')[0]) + 5) + 'px');
                                            //bed.y = objTrtms[indexR].location == null ? ko.observable() : ko.observable((parseInt(objTrtms[indexR].location.split(',')[1]) + 145) + 'px');
                                            //bed.rotation = objTrtms[indexR].rotation == null ? ko.observable(0) : ko.observable(objTrtms[indexR].rotation);

                                            //console.log('Edited');
                                            //console.log(bed);
                                            edited = true;
                                        }
                                    }
                                });

                                //if (!edited) {
                                //    if (room.room_key() == objTrtms[indexR].parent_key) {
                                //        var addBed = new RoomBeds(objTrtms[indexR]);
                                //        console.log('Added');
                                //        console.log(addBed);
                                //        room.allBeds.push(addBed);
                                //    }
                                //}
                            });

                            //console.log(room.allBeds());
                            //room.buildBeds();
                        });

                        ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                            if (ns.sys_key() == openedNS) {
                                UpdateMnuWps(ns);

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
                            }
                        });
                    });


                }

            }
            else if (e.MessageHeader.toUpperCase() == "ER NOTONBEDS") {
                //console.log(e.MessageBody);
                var jsonTrtms = e.MessageBody.replace(/"([^"]+)":/g, function ($0, $1) { return ('"' + $1.toLowerCase() + '":'); });
                var objTrtms = JSON.parse(jsonTrtms);

                if ($.isEmptyObject(objTrtms) == false) {

                    //if he is not exist in notOnBeds add it
                    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                        ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {

                            $.each(objTrtms, function (indexR, valueR) {
                                if (room.room_key() == objTrtms[indexR].parent_key) {
                                    //if he was on bed delete his data from this bed
                                    ko.utils.arrayForEach(room.beds(), function (bed) {
                                        if (bed != undefined) {
                                            if (bed.sys_key() == objTrtms[indexR].sys_key) {

                                                bed.sex('free');
                                                bed.pSex('');
                                                bed.patient_id('');
                                                bed.patient_sex("");
                                                bed.patengname("");
                                                bed.patlocname("");
                                                bed.pat_bithdate("");
                                                bed.age("");
                                                bed.start_date("");
                                                bed.emr_status_time("");
                                                bed.emr_status("");

                                                bed.emr_status_color('lightgray');
                                                bed.emr_status('0');

                                                bed.episodekey("");
                                                bed.physician("");
                                                bed.physician_key("");
                                                bed.specialty("");
                                                bed.bedclassname("");
                                                bed.clinickey("");
                                                bed.nurse("");

                                                //console.log('Edited');
                                                //console.log(bed);
                                            }
                                        }
                                    });


                                    var exist = false;
                                    ko.utils.arrayForEach(room.notOnBeds(), function (notOnBed) {
                                        if (notOnBed != undefined) {
                                            if (notOnBed.patient_id() == objTrtms[indexR].patient_id) {
                                                exist = true;
                                            }
                                        }
                                    });
                                    if (exist == false) {
                                        var addNotOnBed = new RoomBeds(objTrtms[indexR]);
                                        //console.log('Added');
                                        room.allBeds.push(addNotOnBed);
                                    }
                                }
                            });
                        });

                        UpdateMnuWps(ns);

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

                    });
                }

                

            }
            else if (e.MessageHeader.toUpperCase() == "ER DISCHARGEDTODAY") {
                //console.log(e.MessageBody);
                var jsonTrtms = e.MessageBody.replace(/"([^"]+)":/g, function ($0, $1) { return ('"' + $1.toLowerCase() + '":'); });
                var objTrtms = JSON.parse(jsonTrtms);

                if ($.isEmptyObject(objTrtms) == false) {

                    //check to remove from waiting patients
                    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                        ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                            $.each(objTrtms, function (indexR, valueR) {
                                //if he was on bed delete his data from this bed
                                ko.utils.arrayForEach(room.beds(), function (bed) {
                                    if (bed != undefined) {
                                        if (bed.patient_id() == objTrtms[indexR].patient_id) {

                                            bed.sex('free');
                                            bed.pSex('');
                                            bed.patient_id('');
                                            bed.patient_sex("");
                                            bed.patengname("");
                                            bed.patlocname("");
                                            bed.pat_bithdate("");
                                            bed.age("");
                                            bed.start_date("");
                                            bed.emr_status_time("");

                                            bed.emr_status_color('lightgray');
                                            bed.emr_status('0');

                                            bed.episodekey("");
                                            bed.physician("");
                                            bed.physician_key("");
                                            bed.specialty("");
                                            bed.bedclassname("");
                                            bed.clinickey("");
                                            bed.nurse("");

                                            //console.log('Edited');
                                            //console.log(bed);
                                        }
                                    }
                                });
                            });

                            $.each(objTrtms, function (indexR, valueR) {
                                ko.utils.arrayForEach(room.notOnBeds(), function (notOnBed) {
                                    if (notOnBed != undefined) {
                                        //console.log(trtm);
                                        if (notOnBed.patient_id() == objTrtms[indexR].patient_id) {
                                            room.allBeds.remove(notOnBed);
                                        }
                                    }
                                });

                            });
                        });


                        UpdateMnuWps(ns);

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

                    });

                }
            }
            else if (e.MessageHeader.toUpperCase() == "ER ALERTS") {
                var jsonBedsAlerts = e.MessageBody;
                console.log(jsonBedsAlerts);
                var objBedsAlerts = JSON.parse(jsonBedsAlerts);

                ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                    if (ns.sys_key() == openedNS) {
                        //console.log(ns.roomsAndBeds().length);
                        ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
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
                                                console.log(bed.latin_desc() + '  ||  ' + bed.patient_id() + ' || ' + objBedsAlerts[indexR].patient_id);
                                                if (bed.patient_id() == objBedsAlerts[indexR].patient_id) {
                                                    console.log(objBedsAlerts[indexR].patient_id);
                                                    console.log(objBedsAlerts[indexR].tooltip);
                                                    if (objBedsAlerts[indexR].add_or_remove == "Add") {
                                                        console.log(objBedsAlerts[indexR].patient_id);
                                                        console.log(objBedsAlerts[indexR].tooltip);
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
                                                        if (alertBed.alert_name().toLowerCase() == objBedsAlerts[indexR].alert_name.toLowerCase()) {
                                                            bed.bedAlerts.remove(alertBed);
                                                        }
                                                    }
                                                }
                                                //console.log(bed.bedAlerts());
                                            }
                                        }
                                        else {
                                            if (objBedsAlerts[indexR] != undefined) {
                                                console.log(bed.latin_desc() + '  ||  ' + bed.patient_id() + ' || ' + objBedsAlerts[indexR].PATIENT_ID);
                                                if (bed.patient_id() == objBedsAlerts[indexR].PATIENT_ID) {
                                                    console.log(objBedsAlerts[indexR].PATIENT_ID);
                                                    console.log(objBedsAlerts[indexR].TOOLTIP);
                                                    if (objBedsAlerts[indexR].ADD_OR_REMOVE == "Add") {
                                                        console.log(objBedsAlerts[indexR].PATIENT_ID);
                                                        console.log(objBedsAlerts[indexR].TOOLTIP);
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
                    }
                });

            }
            else if (e.MessageHeader == "msgAdmissionRequest") {
                //alert("msgAdmissionRequest");
                if (fromWindows == 1) {
                    AfterAdmissionClose();
                    //console.log(e);
                }
            }
            else if (e.MessageHeader == "msgSheetLoader") {
                //alert("msgSheetLoader");
                if (fromWindows == 1) {
                    AfterSheetClose();
                    //console.log(e);
                }
                
            }
            //else {
            //    //console.log('start');
            //    var jsonBedsAlerts = e.MessageBody;
            //    //var jsonBedsAlerts = '[{"patient_Id":600000400,"alert_name":"High Temprature","alert_type":"bed","toolTip":"High Temprature (40) Degree","icon":"bwb_hightemp.gif","color":"red"},{"patient_Id":600000725,"alert_name":"High Temprature","alert_type":"bed","toolTip":"High Temprature (40) Degree","icon":"bwb_hightemp.gif","color":"red"},{"patient_Id":600000508,"alert_name":"Systolic Blood Pressure","alert_type":"bed","toolTip":"High Blood Pressure (190/110)","icon":"bwb_highbp.gif","color":"yellow"}]';
            //    var objBedsAlerts = JSON.parse(jsonBedsAlerts);

            //    //console.log(vm.roomsAndBeds().length);
            //    ko.utils.arrayForEach(vm.roomsAndBeds(), function (room) {
            //        //console.log(room.room_key());
            //        ko.utils.arrayForEach(room.beds(), function (bed) {
            //            //console.log(bed.sys_key());
            //            //console.log(bed.patient_id());
            //            ko.utils.arrayForEach(bed.bedAlerts(), function (alertBed) {
            //                //console.log(bed.bedAlerts().length);
            //                if (alertBed.alert_name() == e.MessageHeader) {
            //                    bed.bedAlerts.remove(alertBed);
            //                }
            //                //console.log(bed.bedAlerts().length);
            //            });

            //            if ($.isEmptyObject(objBedsAlerts) == false) {
            //                $.each(objBedsAlerts, function (indexR, valueR) {
            //                    if (bed.patient_id() == objBedsAlerts[indexR].patient_id) {
            //                        //console.log(objBedsAlerts[indexR].patient_Id);
            //                        bed.bedAlerts.push(new BedAlerts(objBedsAlerts[indexR]));

            //                        //console.log(bed.bedAlerts().length);
            //                    }
            //                });
            //            }
            //        });
            //    });
            //    //console.log('finish');
            //}

        });

        connection.start(function myfunction() {
            //console.log('Connected');
            $('#connBtnEr').text('Connected');
            $('#connBtnEr').attr('class', 'ConnectedBtn');
            chat.invoke('signIn', uId, 'WhiteBoard', 'WhiteBoard');
            //chat.invoke('signIn', uId , 'UserMessages', 'UserMessages');

            chat.invoke('signIn', "msgAdmissionRequest", 'Notifications', 'Notifications');
            chat.invoke('signIn', "msgSheetLoader", 'Notifications', 'Notifications');
        });

    });

});

var mnuWPs = [
      { id: '0', text: 'Transfer to another Emergency Area', iconSrc: 'images/transfare.png', items: subMnuNSs, visible: true },
      { id: '0', text: '         ___________________________' },
      { id: '0', text: 'Move to Holding bay', iconSrc: 'images/moveto.png' },
];

var mnuWPsToTriaged;
//console.log(ER_EnableFastTriage);
if (ER_EnableFastTriage != 1) {
    mnuWPsToTriaged = [
      { id: '0', text: 'Triage Patient Assessment', iconSrc: 'images/list_accept.png' },
      //{ id: '0', text: 'Cancel Registration', iconSrc: 'images/list_accept.png' },
    ];
}
else {
    mnuWPsToTriaged = [
      { id: '0', text: 'Triage Patient Assessment', iconSrc: 'images/list_accept.png' },
      //{ id: '0', text: 'Cancel Registration', iconSrc: 'images/list_accept.png' },
      { id: '0', text: '         ___________________________' },
      { id: '0', text: 'Fast Triage & Move to Holding bay', iconSrc: 'images/moveto.png' },
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


];

var mnuTrtmsNotOnBed = [
      { id: '0', text: 'Patient Medical Record', iconSrc: 'images/Patient-Medical-Record.png' },
      { id: '0', text: 'Request for Admission', iconSrc: 'images/Request-for-Admission.png', visible: true },
      { id: '0', text: 'Cancel admission request', iconSrc: 'images/Request-for-Admission.png', visible: false },
      { id: '0', text: 'Discharge Order', iconSrc: 'images/Discharge-Order.png' },
      { id: '0', text: 'Reassign Doctor', iconSrc: 'images/reassign.png' },
      { id: '0', text: 'Transfer to another Emergency Area', iconSrc: 'images/transfare.png', items: subMnuNSs, visible: true },
      { id: '0', text: '         ___________________________' },
];


var mnuWPsItemClicked = function (e) {
    //console.log(e.itemData.text + " item clicked");
    //DevExpress.ui.notify("The \"" + e.itemData.text  + "\" item is clicked on ID " + selectedWP.patient_id(), "success", 1500);
    //console.log(e.itemData);

    var pId = selectedWP.patient_id();
    var ek = selectedWP.episode_key();
    var sKey = selectedWP.skey();

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

        moveInfo = "WPtoHP";
        //console.log(bedKey);

        $("#doctorsList tbody").empty();
        $.each(jsonErDoctors, function (indexR, valueR) {
            //console.log(jsonErDoctors[indexR]);
            $("#doctorsList tbody").append("<tr data-dismiss='modal' style='cursor:pointer;' bedKey='" + bedKey + "' sKey='" + sKey + "' patientId='" + pId + "' episodeKey='" + ek + "' onclick='selectDoctor(this,\"" + jsonErDoctors[indexR].doctor_id + "," + jsonErDoctors[indexR].doctor_name + "\");'>" + "<td>" + jsonErDoctors[indexR].doctor_name + "</td>" + "</tr>");
        })

    }
    else {

        if (e.itemData.text.startsWith("Move")) {
            moveInfo = "WPtoBed";

            $("#doctorsList tbody").empty();
            $.each(jsonErDoctors, function (indexR, valueR) {
                //console.log(jsonErDoctors[indexR]);
                $("#doctorsList tbody").append("<tr data-dismiss='modal' style='cursor:pointer;' bedKey='" + e.itemData.id + "' sKey='" + sKey + "' patientId='" + pId + "' episodeKey='" + ek + "' onclick='selectDoctor(this,\"" + jsonErDoctors[indexR].doctor_id + "," + jsonErDoctors[indexR].doctor_name + "\");'>" + "<td>" + jsonErDoctors[indexR].doctor_name + "</td>" + "</tr>");
            })
        }
        else {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: "BedManagementApiActions/WaitingPatients/TransferWPtoWP?NS_id=" + e.itemData.id + "&pId=" + pId + "&sKey=" + sKey + "&ek=" + ek,
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
                                    //position: { of: $(this).next() },
                                    //visible: mnuWPsVisible,
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
        }

    }

};

var mnuWPsToTriageItemClicked = function (e) {

    var pId = selectedWP.patient_id();
    var ek = selectedWP.episode_key();
    var sKey = selectedWP.skey();

    //console.log(e.itemData);
    //console.log(selectedWP);
    if (e.itemData.id == "0") {
        if (selectedWP.emr_status() == "0" || selectedWP.emr_status() == "10" || selectedWP.emr_status() == null) {
            if (e.itemData.text.startsWith("Triage")) {
                var jsonWp = ko.toJSON(selectedWP);
                //console.log(jsonWp);

                if (fromWindows != 1) {
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        url: "BedManagementApiActions/WaitingPatients/PatientDblClick?uId=" + uId,
                        data: JSON.stringify(jsonWp),
                        success: function (data) {
                            //console.log(data);
                            url = data;
                            //console.log($('.aWp' + wp.patient_id()));
                            //$('.aWp' + wp.patient_id()).attr('href', url);
                            if (fromWindows != 1) {
                                childwindow = window.open(url, "mywindow", "location=1,status=1,scrollbars=1,menubar=1,directories=1,resizable=1,scrollbars=1,width=1200,height=800");
                                childwindow.moveTo(0, 0);

                                timer = setInterval(checkChild, 500);
                            }

                            //window.location = url;
                            //var win = window.open(url, '_blank');
                            //win.focus();

                        },
                        error: function (error) {
                            //jsonValue = jQuery.parseJSON(error.responseText);
                            console.log(error);
                            console.log('An error has occurred while processing rule: ' + error.responseText);
                        }
                    });

                }
                else {
                    //console.log(uId);
                    //console.log(jsonWp);
                    //console.log(JSON.stringify(jsonWp));
                    $.ajax({
                        type: "POST",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        url: "BedManagementApiActions/WaitingPatients/PatientDblClickWindows?uId=" + uId,
                        data: JSON.stringify(jsonWp),
                        success: function (data) {
                            //console.log(data);
                            //url = data;
                            //console.log($('.aWp' + wp.patient_id()));
                            //$('.aWp' + wp.patient_id()).attr('href', url);

                            //childwindow = window.open(url, "mywindow", "location=1,status=1,scrollbars=1,menubar=1,directories=1,resizable=1,scrollbars=1,width=1200,height=800");

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
            
                            //AfterSheetClose();

                            //window.location = url;
                            //var win = window.open(url, '_blank');
                            //win.focus();

                        },
                        error: function (error) {
                            //jsonValue = jQuery.parseJSON(error.responseText);
                            console.log(error);
                            console.log('An error has occurred while processing rule: ' + error.responseText);
                        }
                    });
                }
            }
            else if (e.itemData.text.startsWith("Fast")) {

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

                $("#diagTriagePriority tbody").empty();

                //console.log(triageLevels);
                $.each(triageLevels, function (indexR, valueR) {
                    //console.log(triageLevels[indexR]);
                    $("#triagePriorityList tbody").append("<tr data-dismiss='modal' style='cursor:pointer;' bedKey='" + bedKey + "' sKey='" + sKey + "' patientId='" + pId + "' episodeKey='" + ek + "' onclick='selectTriagePriority(this,\"" + triageLevels[indexR].sub_cod + "," + triageLevels[indexR].latin_desc + "\");'>" + "<td data-toggle='modal' data-target='#diagDoctors' >   <div style='float: left;'>" + triageLevels[indexR].latin_desc + "</div><div class='triage1' style='float: right; background-color:" + GetColorByStatus(triageLevels[indexR].sub_cod) + ";' >" + triageLevels[indexR].sub_cod + "</div></td>" + "</tr>");
                })
            }


        }
    }
    else {
        if (e.itemData.text.startsWith("Fast")) {
            $("#diagTriagePriority tbody").empty();

            //console.log(dischareStatus);
            $.each(triageLevels, function (indexR, valueR) {
                //console.log(dischareStatus[indexR]);
                $("#triagePriorityList tbody").append("<tr data-dismiss='modal' style='cursor:pointer;' bedKey='" + e.itemData.id + "' sKey='" + sKey + "' patientId='" + pId + "' episodeKey='" + ek + "' onclick='selectTriagePriority(this,\"" + triageLevels[indexR].sub_cod + "," + triageLevels[indexR].latin_desc + "\");'>" + "<td data-toggle='modal' data-target='#diagDoctors' >   <div style='float: left;'>" + triageLevels[indexR].latin_desc + "</div><div class='triage1' style='float: right; background-color:" + GetColorByStatus(triageLevels[indexR].sub_cod) + ";' >" + triageLevels[indexR].sub_cod + "</div></td>" + "</tr>");
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
    var bk = e.itemData.id;

    if (e.itemData.id != "0") {
        if (e.itemData.text.startsWith("Move")) {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: "BedManagementApiActions/WaitingPatients/MoveBedtoBed?pId=" + pId + "&ek=" + ek + "&bk=" + bk,
                success: function (data) {
                    //console.log(data);
                    url = data;

                    DevExpress.ui.notify("Patient moved successfully.", "success", 1500);

                    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                        if (ns.sys_key() == openedNS) {

                            var fromBed = null;
                            ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {

                                //console.log(frombk, bk, pId);
                                ko.utils.arrayForEach(room.beds(), function (bed) {
                                    if (bed.sys_key() == frombk && bed.patient_id() == pId) {
                                        //debugger;
                                        fromBed = ko.toJSON(bed);
                                        //console.log(' Found : ', frombk, bk, pId);
                                        //console.log(fromBed);

                                        // Empty the fromBed
                                        bed.sex('free');
                                        bed.pSex('');
                                        bed.patient_id(null);
                                        bed.patient_sex('');
                                        bed.patengname('');
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
                                        //debugger;
                                        var jsonFromBed = null;
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

                                UpdateMnuWps(ns);

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

                            });
                        }
                    });

                },
                error: function (error) {
                    //jsonValue = jQuery.parseJSON(error.responseText);
                    console.log(error.responseText);
                }
            });
        }
        else {
            //console.log(e.itemData.id);
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: "BedManagementApiActions/WaitingPatients/TransferTrttoHP?NS_id=" + e.itemData.id + "&pId=" + pId + "&ek=" + ek + "&uId=" + uId,
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
                                        bed.patient_id(null);
                                        bed.patient_sex('');
                                        bed.patengname('');
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

                            $('#try_extb' + ns.sys_key() + ' .cnxMnuTrtNotOnBed').each(function () {
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

                        }
                    });
                },
                error: function (error) {
                    //jsonValue = jQuery.parseJSON(error.responseText);
                    console.log(error.responseText);
                }
            });
        }

    }
    else if (e.itemData.text.startsWith("Move")) {

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "BedManagementApiActions/WaitingPatients/MoveBedtoHP?pId=" + pId + "&ek=" + ek,
            success: function (data) {
                //console.log(data);
                url = data;

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

                //$.getJSON("BedManagementApiActions/WaitingPatients/GetWpByERNs?NS_id=" + openedNS, function (allData) {
                //    var mappedWaitingPatients = $.map(allData, function (Wp) { return new WaitingPatient(Wp) });

                //    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                //        if (ns.sys_key() == openedNS) {
                //            ns.waitingPatients(mappedWaitingPatients);
                //        }
                //    });
                //});

                //ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                //    if (ns.sys_key() == openedNS) {
                //        ns.RefreshAllTrt();
                //    }
                //});

                //$.getJSON("BedManagementApiActions/Rooms/GetErRoomsWBedsWStatus?NS_id=" + openedNS + "&startDate=" + currDate.toLocaleDateString() + "&uId=" + uId, function (allData) {
                //    var mappedRoomsAndBeds = $.map(allData, function (roomWBeds) { return new RoomAndBeds(roomWBeds) });

                //    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                //        if (ns.sys_key() == openedNS) {
                //            ns.roomsAndBeds(mappedRoomsAndBeds);
                //            jsonRoomsAndBeds = ns.roomsAndBeds();

                //            UpdateMnuWps(ns);
                //        }
                //    });

                //});

            },
            error: function (error) {
                //jsonValue = jQuery.parseJSON(error.responseText);
                console.log(error.responseText);
            }
        });


    }
    else if (e.itemData.text.startsWith("Discharge")) {
        //var obsRow = ko.dataFor(this);
        //console.log(obsRow);

        $.getJSON("BedManagementApiActions/WaitingPatients/GetDischareStatus", function (allData) {
            dischareStatus = allData;

            $("#statusList tbody").empty();

            //console.log(dischareStatus);
            $.each(dischareStatus, function (indexR, valueR) {
                //console.log(dischareStatus[indexR]);
                $("#statusList tbody").append("<tr data-dismiss='modal' style='cursor:pointer;' episodeKey='" + ek + "' sKey='" + sKey + "' pId='" + pId + "' onclick='selectStatus(this,\"" + dischareStatus[indexR].status_id + "," + dischareStatus[indexR].status_name + "\");'>" + "<td>" + dischareStatus[indexR].status_name + "</td>" + "</tr>");
            })

            //diagStatus = $("#diagStatus").dialog({
            //    autoOpen: false,
            //    height: 300,
            //    width: 350,
            //    modal: true,
            //    buttons: {
            //        "Ok": selectStatus,
            //        Cancel: function () {
            //            diagStatus.dialog("close");
            //        }
            //    },
            //    close: function () {
            //        //allFields.removeClass("ui-state-error");
            //    }
            //});

            //form = diagStatus.find("form").on("submit", function (event) {
            //    event.preventDefault();
            //    selectStatus();
            //});

            //diagStatus.dialog("open");
            //diagStatus.parent().css("backgroundColor", "White");
            //diagStatus.parent().css("zIndex", "99999");

        });

    }
    else if (e.itemData.text.startsWith("Request")) {
        url = ip + "site-medicaweb/AdmissionRequest.aspx|AdmissionRequest.exe|" + uKey + ",0,0,IsEr~1|PatientID~" + pId + "|BookingNum~" + sKey + "|DocID~" + docId;
        //console.log(url);
        //url = ip + "site-medicaweb/AdmissionRequest.aspx";

        window.location.href = url;
        //childwindowAdmission = window.open(url, "mywindow", "location=0,status=0,scrollbars=0,menubar=0,directories=0,resizable=1,scrollbars=1,width=1200,height=800");

        //if (window.focus) { childwindowAdmission.focus() }
        ////childwindowAdmission.moveTo(0, 0);
        
        //timerAdmission = setInterval(checkChildAdmission, 500);
    }
    else if (e.itemData.text.startsWith("Cancel")) {
        $.getJSON("BedManagementApiActions/Nursestations/CancelAdmissionRequest?bookingKey=" + sKey, function (allData) {
            if (allData == true) {
                DevExpress.ui.notify("Admission request canceled.", "success", 1500);
                e.model.admissionrequested(0);

            }
        });
    }
    else if (e.itemData.text.startsWith("Patient Medical")) {
        //url = ip + "site-medicaweb/emr.aspx|EMRLauncher.exe |,,0,0,1" + pId + "," + ek + ",616,0,0,0";
        url = ip + "site-medicaweb/emr.aspx|FreeEMRCaller.exe|" + pId + "," + ek + "," + uId + ",0,0,0";
        //url = ip + "site-medicaweb/AdmissionRequest.aspx";

        window.location.href = url;

        //childwindowEMR = window.open(url, "mywindow", "location=0,status=0,scrollbars=0,menubar=0,directories=0,resizable=1,scrollbars=1,width=1200,height=800");

        //if (window.focus) { childwindowEMR.focus() }
        ////childwindowAdmission.moveTo(0, 0);

        //timerEMR = setInterval(checkChildEMR, 500);
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

function checkChildAdmission() {
    if (childwindowAdmission.closed) {
        clearInterval(timerAdmission);

        AfterAdmissionClose();
    }
}

function AfterAdmissionClose() {

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

        //setTimeout(function () {
        //    $('#try_extb'+ openedNS +' .cnxMnuTrtOnBed').each(function () {
        //        $(this).dxContextMenu({
        //            items: mnuTrtmsOnBed,
        //            target: $(this).next(),
        //            //position: { of: $(this).next() },
        //            //visible: mnuTrtOnBedVisible,
        //            itemClickAction: mnuTrtmsOnBedItemClicked,
        //            //invokeOnlyFromCode: true,
        //        });

        //    });

        //    $('#try_extb'+ openedNS +' .cnxMnuTrtNotOnBed').each(function () {
        //        $(this).dxContextMenu({
        //            items: mnuTrtmsNotOnBed,
        //            target: $(this).next(),
        //            //position: { of: $(this).next() },
        //            //visible: mnuTrtNotOnBedVisible,
        //            itemClickAction: mnuTrtmsNotOnBedItemClicked,
        //            //invokeOnlyFromCode: true,
        //        });

        //    });
        //}, 1000)
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

    if (e.itemData.id != "0") {

        if (e.itemData.text.startsWith("Move")) {

            moveInfo = "HPtoBed";

            $("#doctorsList tbody").empty();
            $.each(jsonErDoctors, function (indexR, valueR) {
                //console.log(jsonErDoctors[indexR]);
                $("#doctorsList tbody").append("<tr data-dismiss='modal' style='cursor:pointer;' bedKey='" + e.itemData.id + "' sKey='" + sKey + "' patientId='" + pId + "' episodeKey='" + ek + "' onclick='selectDoctor(this,\"" + jsonErDoctors[indexR].doctor_id + "," + jsonErDoctors[indexR].doctor_name + "\");'>" + "<td>" + jsonErDoctors[indexR].doctor_name + "</td>" + "</tr>");
            })

            //diagDoctors = $("#diagDoctors").dialog({
            //    autoOpen: false,
            //    height: 300,
            //    width: 350,
            //    modal: true,
            //    buttons: {
            //        "Ok": selectDoctor,
            //        Cancel: function () {
            //            diagDoctors.dialog("close");
            //        }
            //    },
            //    close: function () {
            //        //allFields.removeClass("ui-state-error");
            //    }
            //});

            //form = diagDoctors.find("form").on("submit", function (event) {
            //    event.preventDefault();
            //    selectDoctor();
            //});

            //diagDoctors.dialog("open");
            //diagDoctors.parent().css("backgroundColor", "White");
            //diagDoctors.parent().css("zIndex", "99999");
        }
        else {
            //console.log(e.itemData.id);
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: "BedManagementApiActions/WaitingPatients/TransferTrttoHP?NS_id=" + e.itemData.id + "&pId=" + pId + "&ek=" + ek + "&uId=" + uId,
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

                            $('#try_extb' + ns.sys_key() + ' .cnxMnuTrtNotOnBed').each(function () {
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

                        }
                    });
                },
                error: function (error) {
                    //jsonValue = jQuery.parseJSON(error.responseText);
                    console.log(error.responseText);
                }
            });
        }

    }
    else if (e.itemData.text.startsWith("Discharge")) {
        //console.log('discharge');
        $.getJSON("BedManagementApiActions/WaitingPatients/GetDischareStatus", function (allData) {
            dischareStatus = allData;

            $("#statusList tbody").empty();

            $.each(dischareStatus, function (indexR, valueR) {
                //console.log("<tr data-dismiss='modal' style='cursor:pointer;' episodeKey='" + ek + "' sKey='" + sKey + "' onclick='selectStatus(this,\"" + dischareStatus[indexR].status_id + "," + dischareStatus[indexR].status_name + "\");'>" + "<td>" + dischareStatus[indexR].status_name + "</td>" + "</tr>");
                $("#statusList tbody").append("<tr data-dismiss='modal' style='cursor:pointer;' episodeKey='" + ek + "' sKey='" + sKey + "' pId='" + pId + "' onclick='selectStatus(this,\"" + dischareStatus[indexR].status_id + "," + dischareStatus[indexR].status_name + "\");'>" + "<td>" + dischareStatus[indexR].status_name + "</td>" + "</tr>");
            })

            //diagStatus = $("#diagStatus").dialog({
            //    autoOpen: false,
            //    height: 300,
            //    width: 350,
            //    modal: true,
            //    buttons: {
            //        "Ok": selectStatus,
            //        Cancel: function () {
            //            diagStatus.dialog("close");
            //        }
            //    },
            //    close: function () {
            //        //allFields.removeClass("ui-state-error");
            //    }
            //});

            //form = diagStatus.find("form").on("submit", function (event) {
            //    event.preventDefault();
            //    selectStatus();
            //});

            //diagStatus.dialog("open");
            //diagStatus.parent().css("backgroundColor", "White");
            //diagStatus.parent().css("zIndex", "99999");


        });

    }
    else if (e.itemData.text.startsWith("Request")) {
        //console.log(e);
        url = ip + "site-medicaweb/AdmissionRequest.aspx|AdmissionRequest.exe|" + uKey + ",0,0,IsEr~1|PatientID~" + pId + "|BookingNum~" + sKey + "|DocID~" + docId;
        //url = ip + "site-medicaweb/AdmissionRequest.aspx";

        window.location.href = url;
        //childwindowAdmission = window.open(url, "mywindow", "location=0,status=0,scrollbars=0,menubar=0,directories=0,resizable=1,scrollbars=1,width=1200,height=800");

        //if (window.focus) { childwindowAdmission.focus() }
        ////childwindowAdmission.moveTo(0, 0);

        //timerAdmission = setInterval(checkChildAdmission, 500);
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
        //url = ip + "site-medicaweb/emr.aspx|EMRLauncher.exe |,,0,0,1" + pId + "," + ek + ",616,0,0,0";
        url = ip + "site-medicaweb/emr.aspx|FreeEMRCaller.exe|" + pId + "," + ek + "," + uId + ",0,0,0";
        //url = ip + "site-medicaweb/AdmissionRequest.aspx";

        window.location.href = url;

        //childwindowEMR = window.open(url, "mywindow", "location=0,status=0,scrollbars=0,menubar=0,directories=0,resizable=1,scrollbars=1,width=1200,height=800");

        //if (window.focus) { childwindowEMR.focus() }
        ////childwindowAdmission.moveTo(0, 0);

        //timerEMR = setInterval(checkChildEMR, 500);
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

function GetColorByStatus(triageStatus)
{
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

var NursestationViewModel = function () {
    var self = this;

    self.wbType = ko.observable(wbType);

    self.triageLevels = ko.observableArray([]);

    self.triageSheetKey = ko.observable();

    self.nursestations = ko.observableArray([]);
    self.roomsAndBeds = ko.observableArray([]);
    
    self.alertSize = ko.observable();
    self.er_maxtime = ko.observable();
    self.er_maxtriagetime = ko.observable();
    self.er_maxwaitingareatime = ko.observable();

    self.obsWAstartTime = ko.observable();
    self.obsWAavgTime = ko.observable();
    self.obsWAmaxTime = ko.observable();

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

            $.getJSON("BedManagementApiActions/Nursestations/GetTriageLevels", function (allData) {
                var mappedTriageLevels = $.map(allData, function (tLevel) { return new TriageLevels(tLevel) });
                self.triageLevels(mappedTriageLevels);
                triageLevelsCount = self.triageLevels().length;
                triageLevels = allData;

                //console.log(self.triageLevels().length);
                //console.log(self.triageLevels());

                //alert(currDate.toISOString());
                //alert(currDate.toDateString());
                //alert(currDate.toLocaleDateString());

                $.getJSON("BedManagementApiActions/Nursestations/GetNurseStationsWithAlertsER?startDate=" + currDate.toISOString() + "&NsType=" + wbType + "&uId=" + uId + "&hospId=" + hospitalid, function (allData) {
                    var mappedNursestations = $.map(allData, function (Ns) { return new Nursestation(Ns) });
                    self.nursestations(mappedNursestations);

                    $.each(allData, function (i, val) {
                        if (val != undefined) {
                            subMnuNSs.push({ id: val.sys_key, text: val.latin_desc, iconSrc: 'images/beacon_light.png', visible: true });
                        }
                    });


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
        //if (triageLevelsCount == 3) {
        //    if (status == 3)
        //        return ko.observable('#00FF00');
        //    else if (status == 2)
        //        return ko.observable('yellow');
        //    else if (status == 1)
        //        return ko.observable('red');
        //    else {
        //        return ko.observable('lightgray');
        //        //return ko.observable('0');
        //    }
        //}
        //else {
        //    if (status == 5)
        //        return ko.observable('blue');
        //    else if (status == 4)
        //        return ko.observable('#00FF00');
        //    else if (status == 3)
        //        return ko.observable('yellow');
        //    else if (status == 2)
        //        return ko.observable('orange');
        //    else if (status == 1)
        //        return ko.observable('red');
        //    else {
        //        return ko.observable('lightgray');
        //        //return ko.observable('0');
        //    }
        //}
        return ko.observable(GetColorByStatus(status));
    }
  
}

var TriageLevels = function (tLevel) {
    var self = this;
    this.main_cod = ko.observable(tLevel.main_cod);
    this.sub_cod = ko.observable(tLevel.sub_cod);
    this.latin_desc = ko.observable(tLevel.latin_desc);
    this.local_desc = ko.observable(tLevel.local_desc);
    //console.log(this.local_desc());
}

var ErDoctors = function (dr) {
    var self = this;
    this.doctor_id = ko.observable(dr.doctor_id);
    this.doctor_name = ko.observable(dr.doctor_name);
}

function UpdateMnuWps(Ns) {
    mnuWPs = [
      { id: '0', text: 'Transfer to another Emergency Area', iconSrc: 'images/transfare.png', items: subMnuNSs, visible: true },
      { id: '0', text: '         ___________________________' },
      { id: '0', text: 'Move to Holding bay', iconSrc: 'images/moveto.png' },

      //{ id: '0', text: '_________________________________________' },
    ];

    if (ER_EnableFastTriage != 1) {
        mnuWPsToTriaged = [
          { id: '0', text: 'Triage Patient Assessment', iconSrc: 'images/list_accept.png' },
          //{ id: '0', text: 'Cancel Registration', iconSrc: 'images/list_accept.png' },
        ];
    }
    else {
        mnuWPsToTriaged = [
          { id: '0', text: 'Triage Patient Assessment', iconSrc: 'images/list_accept.png' },
          //{ id: '0', text: 'Cancel Registration', iconSrc: 'images/list_accept.png' },
          { id: '0', text: '         ___________________________' },
          { id: '0', text: 'Fast Triage & Move to Holding bay', iconSrc: 'images/moveto.png' },
        ];
    }

    mnuTrtmsOnBed = [
      { id: '0', text: 'Patient Medical Record', iconSrc: 'images/Patient-Medical-Record.png' },
      { id: '0', text: 'Request for Admission', iconSrc: 'images/Request-for-Admission.png', visible: true },
      { id: '0', text: 'Cancel admission request', iconSrc: 'images/Request-for-Admission.png', visible: false },
      { id: '0', text: 'Discharge Order', iconSrc: 'images/Discharge-Order.png' },
      { id: '0', text: 'Reassign Doctor', iconSrc: 'images/reassign.png' },
      { id: '0', text: 'Transfer to another Emergency Area', iconSrc: 'images/transfare.png', items: subMnuNSs, visible: true },
      { id: '0', text: '         ___________________________' },
      { id: '0', text: 'Move to Holding bay', iconSrc: 'images/moveto.png' },

    ];

    mnuTrtmsNotOnBed = [
      { id: '0', text: 'Patient Medical Record', iconSrc: 'images/Patient-Medical-Record.png' },
      { id: '0', text: 'Request for Admission', iconSrc: 'images/Request-for-Admission.png', visible: true },
      { id: '0', text: 'Cancel admission request', iconSrc: 'images/Request-for-Admission.png', visible: false },
      { id: '0', text: 'Discharge Order', iconSrc: 'images/Discharge-Order.png' },
      { id: '0', text: 'Reassign Doctor', iconSrc: 'images/reassign.png' },
      { id: '0', text: 'Transfer to another Emergency Area', iconSrc: 'images/transfare.png', items: subMnuNSs, visible: true },
      { id: '0', text: '         ___________________________' },

    ];

    //$.each(mnuWPs, function (i, val) {
    //    if (val != undefined) {
    //        if (val.id != "0") // delete index
    //        {
    //            delete mnuWPs[i];
    //        }
    //    }
    //});

    ////console.log(mnuTrtmsNotOnBed);
    //$.each(mnuTrtmsNotOnBed, function (i, val) {
    //    if (val != undefined) {
    //        if (val.id != "0") // delete index
    //        {
    //            delete mnuTrtmsNotOnBed[i];
    //        }
    //    }
    //});  

    //console.log(Ns.sys_key());
    ko.utils.arrayForEach(Ns.roomsAndBeds(), function (room) {
        ko.utils.arrayForEach(room.beds(), function (bed) {
            if (bed.patient_id() == 0 || bed.patient_id() == null) {
                mnuWPs.push({ id: bed.sys_key(), text: 'Move to "' + bed.latin_desc() + '"', iconSrc: 'images/Bed.png' });
                if (ER_EnableFastTriage == 1) {
                    mnuWPsToTriaged.push({ id: bed.sys_key(), text: 'Fast Triage & Move to "' + bed.latin_desc() + '"', iconSrc: 'images/Bed.png' });
                }
                mnuTrtmsNotOnBed.push({ id: bed.sys_key(), text: 'Move to "' + bed.latin_desc() + '"', iconSrc: 'images/Bed.png' });
                mnuTrtmsOnBed.push({ id: bed.sys_key(), text: 'Move to "' + bed.latin_desc() + '"', iconSrc: 'images/Bed.png' });
            }
        });
    });

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
    self.alerts = ko.observableArray([]);
    self.waitingPatients = ko.observableArray([]);
    self.sortedWaitingPatients = ko.observableArray([]);
    self.roomsAndBeds = ko.observableArray([]);
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


    $.getJSON("BedManagementApiActions/WaitingPatients/GetWpByERNs?NS_id=" + self.sys_key(), function (allData) {
        //console.log("GetWpByERNs Succeded");

        //console.log(allData);

        //allData = [{
            


        //}];

        var mappedWaitingPatients = $.map(allData, function (Wp) { return new WaitingPatient(Wp) });
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

    });

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

    $.getJSON("BedManagementApiActions/Rooms/GetErRoomsWBedsWStatus?NS_id=" + self.sys_key() + "&startDate=" + currDate.toISOString() + "&uId=" + uId, function (allData) {
        //console.log("GetErRoomsWBedsWStatus Succeded");
        var mappedRoomsAndBeds = $.map(allData, function (roomWBeds) { return new RoomAndBeds(roomWBeds) });
        //console.log("GetErRoomsWBedsWStatus After Mapping");
        self.roomsAndBeds(mappedRoomsAndBeds);
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

        MnuesAttached.push({opened: false, nsId: self.sys_key() });

        //setTimeout(function () {

        //    $('#try_extb' + self.sys_key() + ' .cnxMnuTrtOnBed').each(function () {
        //        //console.log(mnuTrtmsOnBed);
        //        $(this).dxContextMenu({
        //            items: mnuTrtmsOnBed,
        //            target: $(this).next(),
        //            //position: { of: $(this).next() },
        //            //visible: mnuTrtOnBedVisible,
        //            itemClickAction: mnuTrtmsOnBedItemClicked,
        //            //invokeOnlyFromCode: true,
        //        });

        //    });

        //    $('#try_extb' + self.sys_key() + ' .cnxMnuTrtNotOnBed').each(function () {
        //        //console.log(mnuTrtmsNotOnBed);
        //        $(this).dxContextMenu({
        //            items: mnuTrtmsNotOnBed,
        //            target: $(this).next(),
        //            //position: { of: $(this).next() },
        //            //visible: mnuTrtNotOnBedVisible,
        //            itemClickAction: mnuTrtmsNotOnBedItemClicked,
        //            //invokeOnlyFromCode: true,
        //        });

        //    });
        //}, 3000);

    });

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

            $('#try_extb' + self.sys_key() + ' .cnxMnuTrtOnBed').each(function () {
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

            $('#try_extb' + self.sys_key() + ' .cnxMnuTrtNotOnBed').each(function () {
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


        });

    };

    self.RefreshWP = function () {

        $.getJSON("BedManagementApiActions/WaitingPatients/GetWpByERNs?NS_id=" + openedNS, function (allData) {
            var mappedWaitingPatients = $.map(allData, function (Wp) { return new WaitingPatient(Wp) });

            ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                if (ns.sys_key() == openedNS) {
                    ns.waitingPatients(mappedWaitingPatients);
                }
            });

            UpdateMnuWps(self);

            $('#try_exta' + self.sys_key() + ' .cnxMnuWp').each(function () {
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

            $('#try_exta' + self.sys_key() + ' .cnxMnuWpToTriage').each(function () {
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

        });


    };

    self.currentNS = ko.observable();
    //console.log(i + ' ' + nsOPTs[i]);
    //self.currResources = nsOPTs[i];

    this.collapseNS = function (Ns, event) {

        
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

            $.getJSON("BedManagementApiActions/WaitingPatients/GetERShiftDoctors", function (allData) {
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

            for (i = 0; i < MnuesAttached.length; i++) {
                if (MnuesAttached[i].nsId == openedNS && MnuesAttached[i].opened == false) {

                    $('#try_exta'+ openedNS +' .cnxMnuWp').each(function () {
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

                    $('#try_exta'+ openedNS +' .cnxMnuWpToTriage').each(function () {
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
                        //console.log(mnuTrtmsNotOnBed);
                        $(this).dxContextMenu({
                            items: mnuTrtmsNotOnBed,
                            target: $(this).next(),
                            //position: { of: $(this).next() },
                            //visible: mnuTrtNotOnBedVisible,
                            itemClickAction: mnuTrtmsNotOnBedItemClicked,
                            //invokeOnlyFromCode: true,
                        });

                    });

                    MnuesAttached[i].opened = true;
                    break;
                }
            }

            $("#txtWpSearch" + openedNS).keyup(function () {
                if ($(this).val() != "") {
                    var rows = $("#tblWP"+ openedNS + " tbody").find("tr").hide();
                    var data = $(this).val().split(" ");
                    $.each(data, function (i, v) {
                        rows.find("td:nth-child(4)").filter(":containsIN('" + v + "')").parent().show();
                        rows.find("td:nth-child(4)").filter(":containsIN('" + v + "')").parent().prev().show();
                        rows.find("td:nth-child(5)").filter(":containsIN('" + v + "')").parent().show();
                        rows.find("td:nth-child(5)").filter(":containsIN('" + v + "')").parent().prev().show();
                    });
                }
                else
                    var rows = $("#tblWP" + openedNS + " tbody").find("tr").show();

                //$('#try_exta'+ openedNS +' .cnxMnuWp').each(function () {
                //    //console.log(mnuWPs);
                //    $(this).dxContextMenu({
                //        items: mnuWPs,
                //        target: $(this).next(),
                //        //position: { of: $(this).next() },
                //        //visible: mnuWPsVisible,
                //        itemClickAction: mnuWPsItemClicked,
                //        //invokeOnlyFromCode: true,
                //    });

                //});

                //$('#try_exta'+ openedNS +' .cnxMnuWpToTriage').each(function () {
                //    //console.log(mnuWPs);
                //    $(this).dxContextMenu({
                //        items: mnuWPsToTriaged,
                //        target: $(this).next(),
                //        //position: { of: $(this).next() },
                //        //visible: mnuWPsVisible,
                //        itemClickAction: mnuWPsToTriageItemClicked,
                //        //invokeOnlyFromCode: true,
                //    });

                //});
            });

            $("#txtTrtSearch" + openedNS).keyup(function () {
                //console.log(.parents(2).next().children().first().find("tbody tr"));
                if ($(this).val() != "") {
                    var rows = $(this).parents(2).next().children().first().find("tbody tr").hide();
                    var data = $(this).val().split(" ");
                    $.each(data, function (i, v) {
                        rows.find("td:nth-child(3)").filter(":containsIN('" + v + "')").parent().show();
                        rows.find("td:nth-child(3)").filter(":containsIN('" + v + "')").parent().prev().show();
                        rows.find("td:nth-child(4)").filter(":containsIN('" + v + "')").parent().show();
                        rows.find("td:nth-child(4)").filter(":containsIN('" + v + "')").parent().prev().show();
                    });
                }
                else
                    var rows = $(this).parents(2).next().children().first().find("tbody tr").show();

                //$('#try_extb'+ openedNS +' .cnxMnuTrtNotOnBed').each(function () {
                //    //console.log(mnuTrtmsNotOnBed);
                //    $(this).dxContextMenu({
                //        items: mnuTrtmsNotOnBed,
                //        target: $(this).next(),
                //        //position: { of: $(this).next() },
                //        //visible: mnuTrtNotOnBedVisible,
                //        itemClickAction: mnuTrtmsNotOnBedItemClicked,
                //        //invokeOnlyFromCode: true,
                //    });

                //});
            });

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

            if (!isInitialReceivCalled) {
                chat.invoke('GetInitialReceive', uId, "WhiteBoard | and Category = 'ER Alerts'");
                isInitialReceivCalled = true;
            }

        }
    };

    this.collapseAllNS = function (Ns, event) {

        //if ($('#imgAllNSPsColl' + self.sys_key()).attr('src') == 'images/collapse_arrow_alt.png') {
        //    //$('#imgAllNSPsColl' + self.sys_key()).attr('src', 'images/expand_arrow_alt.png');
        //    $($('#nsAllPs' + self.sys_key()).parent()[0]).slideUp();

        //    $($('#nsAllPs' + self.sys_key()).parents(3)[2]).attr("class", "panelfullwidthS");

        //}
        //else {

        //    //$('[id^="imgNSColl"]').attr('src', 'images/expand_arrow_alt.png');
        //    //$('.accContent').slideUp("slow");
        //    $('.panelfullwidthSel').attr("class", "panelfullwidthS");

        //    $('#imgAllNSPsColl' + self.sys_key()).attr('src', 'images/collapse_arrow_alt.png');
        //    $($('#nsAllPs' + self.sys_key()).parent()[0]).slideDown();
        //    //console.log($('#nsWp' + self.sys_key()).parents(3));
        //    $($('#nsAllPs' + self.sys_key()).parents(3)[2]).attr("class", "panelfullwidthSel");

        //}
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
    /*******************************************************************************************************/
    /*******************************************************************************************************/
    /*******************************************************************************************************/
    /*******************************************************************************************************/
    /*******************************************************************************************************/
    /*******************************************************************************************************/
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
    /***************************END-END-END-END-END-END-END-END-END-END*************************************/
    /*******************************************************************************************************/
    /*******************************************************************************************************/
    /*******************************************************************************************************/
    /*******************************************************************************************************/
    /*******************************************************************************************************/
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
    else
    {
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
    /***************************END-END-END-END-END-END-END-END-END-END*************************************/
    /*******************************************************************************************************/
    /*******************************************************************************************************/
    /*******************************************************************************************************/
    /*******************************************************************************************************/
    /*******************************************************************************************************/
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
    /***************************END-END-END-END-END-END-END-END-END-END*************************************/
    /*******************************************************************************************************/
    /*******************************************************************************************************/
    /*******************************************************************************************************/
    /*******************************************************************************************************/
    /*******************************************************************************************************/
    self.FilterByAlerts = function (alertName)
    { 
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

//function UpdateChartWPSource() {
//    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
//        if (ns.sys_key() == openedNS) {
//            chartWPSource = [{ triage: 'Not', st: ns.notTrgMinTime(), nd: ns.notTrgAvgMinTime(), rd: ns.notTrgAvgMaxTime(), th: ns.notTrgMaxTime() }];
//            var counter = 0;
//            ko.utils.arrayForEach(vm.triageLevels(), function (tl) {
//                counter++;
//                switch (counter) {
//                    case 1:
//                        chartWPSource.push({ triage: tl.latin_desc(), st: ns.trg1MinTime(), nd: ns.trg1AvgMinTime(), rd: ns.trg1AvgMaxTime(), th: ns.trg1MaxTime() });
//                        break;
//                    case 2:
//                        chartWPSource.push({ triage: tl.latin_desc(), st: ns.trg2MinTime(), nd: ns.trg2AvgMinTime(), rd: ns.trg2AvgMaxTime(), th: ns.trg2MaxTime() });
//                        break;
//                    case 3:
//                        chartWPSource.push({ triage: tl.latin_desc(), st: ns.trg3MinTime(), nd: ns.trg3AvgMinTime(), rd: ns.trg3AvgMaxTime(), th: ns.trg3MaxTime() });
//                        break;
//                    case 4:
//                        chartWPSource.push({ triage: tl.latin_desc(), st: ns.trg4MinTime(), nd: ns.trg4AvgMinTime(), rd: ns.trg4AvgMaxTime(), th: ns.trg4MaxTime() });
//                        break;
//                    case 5:
//                        chartWPSource.push({ triage: tl.latin_desc(), st: ns.trg5MinTime(), nd: ns.trg5AvgMinTime(), rd: ns.trg5AvgMaxTime(), th: ns.trg5MaxTime() });
//                        break;
//                }
//            });
//            //console.log(chartWPSource);
//            return false;
//        }
//    });
//}


//$(function () {

//    var chartWPOptions = {
//        dataSource: [{ triage: 'C1', st: 4, nd: 3, rd: 2, th: 5 }],
//        title: {
//            font: {
//                //color: 'steelblue',
//                //family: 'Zapf-Chancery, cursive',
//                opacity: 1,
//                size: 10,
//                //weight: 400
//            },
//            text: 'Waiting Patients',
//        },
//        size: {
//            height: 250,
//            width: 150
//        },
//        commonSeriesSettings: {
//            type: 'stackedBar',
//            argumentField: 'triage',
//            label: {
//                position: 'inside',
//                visible: true,
//                showForZeroValues: false,
//                backgroundColor: 'transparent',
//                font: {
//                    //color: 'steelblue',
//                    //family: 'Zapf-Chancery, cursive',
//                    //opacity: 1,
//                    //size: 10,
//                    //weight: 400
//                },
//            },
//            border: {
//                visible: true,
//                width: 2,
//                color: 'white',
//            },
//        },
//        customizeLabel: function (bar) {
//            //if (bar.value == 0) {
//            //    return { visible: false }
//            //}
//        },
//        equalBarWidth: {
//            width: 10,
//            spacing: 5
//        },
//        series: [{
//            name: '00-' + ERstartTime,
//            valueField: 'st',
//            color: '#00DD2F',
//        }, {
//            name: ERstartTime + '-' + ERavgTime,
//            valueField: 'nd',
//            color: '#FFDC08',
//        }, {
//            name: ERavgTime + '-' + ERmaxTime,
//            valueField: 'rd',
//            color: '#FF0000',
//        }, {
//            name: '+' + ERmaxTime,
//            valueField: 'th',
//            color: '#C90707',
//        }],
//        valueAxis: {
//            visible: false,
//            opacity: .5
//        },
//        argumentAxis: {
//            visible: false,
//            opacity: .5
//        },
//        legend: {
//            //verticalAlignment: 'bottom',
//            //horizontalAlignment: 'center'
//        },

//    };

//});


function dxMnuWP_Showing(WP) {
    if (!(WP.emr_status() == "0" || WP.emr_status() == "10" || WP.emr_status() == null)) {
        $.each(mnuWPs, function (i, val) {
            if (val.text.startsWith("Transfer")) {
                if (vm.nursestations().length == 1) {
                    val.visible = false;
                }
                else {
                    $.each(val.items, function (j, v) {
                        if (v.id == openedNS)
                            v.visible = false;
                        else
                            v.visible = true;
                    });
                }
            }
        });

        if (WP != null && WP.patient_id() != null && WP.patient_id() != 0) {
            //console.log('#cxWPToTriage' + WP.patient_id());
            dxMnuWP = $('#cxWP' + WP.patient_id()).dxContextMenu("instance");
            dxMnuWP.repaint();
        }
    }
}

function dxMnuTrtOnBed_Showing(bed) {
    //console.log(bed.admissionrequested());
    //console.log(bed.admitted());

    if (bed.admitted() == 1) {
        $.each(mnuTrtmsOnBed, function (key, value) {
            if (value != undefined) {
                //console.log(mnuTrtmsNotOnBed[key]);
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
            if (vm.nursestations().length == 1) {
                val.visible = false;
            }
            else {
                $.each(val.items, function (j, v) {
                    if (v.id == openedNS)
                        v.visible = false;
                    else
                        v.visible = true;
                });
            }
        }
    });
   
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
            if (vm.nursestations().length == 1) {
                val.visible = false;
            }
            else {
                $.each(val.items, function (j, v) {
                    if (v.id == openedNS)
                        v.visible = false;
                    else
                        v.visible = true;
                });
            }
        }
    });

    dxMnuTrtNotOnBed = $('#cxNotOnBed' + notOnBed.patient_id()).dxContextMenu("instance");
    dxMnuTrtNotOnBed.repaint();
}

function selectDoctor(elm, arg) {
    //console.log(elm);
    if (arg != undefined) {
        //console.log(arg);
        var docId = arg.split(',')[0];
        var docName = arg.split(',')[1];

        console.log($(elm).attr("bedKey"));
        var bedKey = $(elm).attr("bedKey");
        var sKey = $(elm).attr("sKey");
        var patientId = $(elm).attr("patientId");
        var episodeKey = $(elm).attr("episodeKey");
        var tCode = $(elm).attr("tCode");

        if (moveInfo == "WPtoBed") {
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
        }
        else if (moveInfo == "HPtoBed")
        {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: "BedManagementApiActions/WaitingPatients/MoveHPtoBed?bKey=" + bedKey + "&pId=" + patientId + "&ek=" + episodeKey + "&drId=" + docId + "&sKey=" + sKey + "&uId=" + uId,
                success: function (data) {
                    //console.log(data);
                    var updatedBed = data;

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

                                UpdateMnuWps(ns);

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


                            });
                        }
                    });

                    //$.getJSON("BedManagementApiActions/WaitingPatients/GetWpByERNs?NS_id=" + openedNS, function (allData) {
                    //    var mappedWaitingPatients = $.map(allData, function (Wp) { return new WaitingPatient(Wp) });

                    //    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                    //        if (ns.sys_key() == openedNS) {
                    //            ns.waitingPatients(mappedWaitingPatients);
                    //        }
                    //    });
                    //});

                    //DevExpress.ui.notify("Patient moved successfully.", "success", 1500);

                    //ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                    //    if (ns.sys_key() == openedNS) {
                    //        ns.RefreshAllTrt();
                    //    }
                    //});

                    //$.getJSON("BedManagementApiActions/Rooms/GetErRoomsWBedsWStatus?NS_id=" + openedNS + "&startDate=" + currDate.toLocaleDateString() + "&uId=" + uId, function (allData) {
                    //    var mappedRoomsAndBeds = $.map(allData, function (roomWBeds) { return new RoomAndBeds(roomWBeds) });

                    //    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                    //        if (ns.sys_key() == openedNS) {
                    //            ns.roomsAndBeds(mappedRoomsAndBeds);
                    //            jsonRoomsAndBeds = ns.roomsAndBeds();

                    //            UpdateMnuWps(ns);
                    //        }
                    //    });

                    //});


                },
                error: function (error) {
                    //jsonValue = jQuery.parseJSON(error.responseText);
                    console.log(error.responseText);
                }
            });
        }
        else if (moveInfo == "WPtoHP") {
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
        else if (moveInfo == "ReassignDoctor") {

            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: "BedManagementApiActions/WaitingPatients/ReassignDoctor?drId=" + docId + "&sKey=" + sKey + "&pId=" + patientId + "&uId=" + uId,
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

        }
        else if (moveInfo == "WPtoBedFast")
        {
            alert("BedManagementApiActions/WaitingPatients/FastMoveWPtoBed?&tCode=" + tCode + "&bKey=" + bedKey + "&pId=" + patientId + "&ek=" + episodeKey + "&drId=" + docId + "&sKey=" + sKey + "&uId=" + uId + "&cBll=" + ER_EnableBilling);
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: "BedManagementApiActions/WaitingPatients/FastMoveWPtoBed?&tCode=" + tCode + "&bKey=" + bedKey + "&pId=" + patientId + "&ek=" + episodeKey + "&drId=" + docId + "&sKey=" + sKey + "&uId=" + uId + "&cBll=" + ER_EnableBilling,
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
                    }
                    else
                        DevExpress.ui.notify("There is a patient on this bed.", "warning", 1500);

                },
                error: function (error) {
                    //jsonValue = jQuery.parseJSON(error.responseText);
                    console.log(error.responseText);
                }
            });
        }
        else if (moveInfo == "WPtoHPFast")
        {
            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                url: "BedManagementApiActions/WaitingPatients/FastMoveWPtoHP?&tCode=" + tCode + "&bKey=" + bedKey + "&pId=" + patientId + "&ek=" + episodeKey + "&drId=" + docId + "&sKey=" + sKey + "&uId=" + uId + "&cBll=" + ER_EnableBilling,
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


                },
                error: function (error) {
                    //jsonValue = jQuery.parseJSON(error.responseText);
                    console.log(error.responseText);
                }
            });
        }

    }

    //diagDoctors.dialog("close");
}

function selectStatus(elm, arg) {
    //console.log(elm);
    //console.log(arg);

    if (arg != undefined) {//console.log(arg);

        var statId = arg.split(',')[0];
        var statName = arg.split(',')[1];

        var sKey = $(elm).attr("sKey");
        var episodeKey = $(elm).attr("episodeKey");
        var pId = $(elm).attr("pId");

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: "BedManagementApiActions/WaitingPatients/DischargePatient?ek=" + episodeKey + "&pId=" + pId + "&sKey=" + sKey + "&dStatus=" + statId + "&uId=" + uId,
            success: function (data) {
                //console.log(data);
                if (data == "0") {

                    DevExpress.ui.notify("Patient discharged successfully", "success", 1500);

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

                        }
                    });

                }
                
            }
        });
    }

    //diagStatus.dialog("close");
}

function selectTriagePriority(elm, arg) {
    //console.log(elm);
    //console.log(arg);

    if (arg != undefined) {//console.log(arg);

        var triageSub_code = arg.split(',')[0];
        var triageLatin_desc = arg.split(',')[1];

        console.log($(elm).attr("bedKey"));
        var bedKey = $(elm).attr("bedKey");
        var sKey = $(elm).attr("sKey");
        var patientId = $(elm).attr("patientId");
        var episodeKey = $(elm).attr("episodeKey");

        if (bedKey != 0)
        {
            moveInfo = "WPtoBedFast";

            $("#doctorsList tbody").empty();
            $.each(jsonErDoctors, function (indexR, valueR) {
                //console.log(jsonErDoctors[indexR]);
                $("#doctorsList tbody").append("<tr data-dismiss='modal' style='cursor:pointer;' tCode=" + triageSub_code + " bedKey='" + bedKey + "' sKey='" + sKey + "' patientId='" + patientId + "' episodeKey='" + episodeKey + "' onclick='selectDoctor(this,\"" + jsonErDoctors[indexR].doctor_id + "," + jsonErDoctors[indexR].doctor_name + "\");'>" + "<td>" + jsonErDoctors[indexR].doctor_name + "</td>" + "</tr>");
            })
        }
        else
        {
            moveInfo = "WPtoHPFast";

            $("#doctorsList tbody").empty();
            $.each(jsonErDoctors, function (indexR, valueR) {
                //console.log(jsonErDoctors[indexR]);
                $("#doctorsList tbody").append("<tr data-dismiss='modal' style='cursor:pointer;' tCode=" + triageSub_code + " bedKey='" + bedKey + "' sKey='" + sKey + "' patientId='" + patientId + "' episodeKey='" + episodeKey + "' onclick='selectDoctor(this,\"" + jsonErDoctors[indexR].doctor_id + "," + jsonErDoctors[indexR].doctor_name + "\");'>" + "<td>" + jsonErDoctors[indexR].doctor_name + "</td>" + "</tr>");
            })
        }
    }

    //diagStatus.dialog("close");
}

var trtMin = true;
function TrtMaxMin() {
    if (trtMin)
    {
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
    else
    {
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

var NsAlerts = function(NsAlert) {
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
    self.allBeds = ko.observableArray($.map(roomWBeds.beds, function (roomBeds) { return new RoomBeds(roomBeds) }));
   
    //console.log(self.allBeds());

    self.notOnBeds = ko.computed(function () {
        return ko.utils.arrayFilter(self.allBeds(), function (bed) {
            //console.log(bed);
            return bed.iswaitingarea() == 1;
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
            if (bed.sys_key() != prevBedId) {
                bedsArray.push(bed);
            }
            prevBedId = bed.sys_key();
        });

        var jsonBed;
        ko.utils.arrayForEach(bedsArray(), function (bed) {         
            if (bed.iswaitingarea() == 1) {
                var strBed = ko.toJSON(bed);
                jsonBed = JSON.parse(strBed);

                self.allBeds.push(new RoomBeds(jsonBed));

                bed.sex('free');
                bed.patient_id('');
                bed.patient_sex('');
                bed.patengname('');
                bed.patlocname('');
                bed.status('');
                
                bed.pat_bithdate('');
                bed.age('');
                bed.start_date('');
                bed.systime('');
                bed.emr_status_time('');
                bed.emr_status_color = ko.observable('lightgray');
                bed.emr_status = ko.observable('0');
                bed.iswaitingarea('');
                bed.episodekey('');
                bed.physician('');
                bed.physician_key('');
                bed.specialty('');
                bed.clinickey('');
                bed.nurse('');
                bed.price('');
                bed.nursestationcode('');
                bed.statusName('');
            }
        });

        return bedsArray.sort(function (l, r) {
            return l.sys_key - r.sys_key;
        });

        //self.beds([]);
        //ko.utils.arrayForEach(bedsArray(), function (bed) {
        //    self.beds.push(bed);
        //});
        
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
    
    if (IsNumeric(Wp.emr_status) && Wp.emr_status != 0 && Wp.emr_status != 10)
        self.emr_status_color = ko.observable(GetColorByStatus(Wp.emr_status));
    else {
        self.emr_status_color = ko.observable('lightgray');
        self.emr_status = ko.observable('0');
    }


    self.emr_status_time = ko.observable(Wp.emr_status_time);
    self.iswaitingarea = ko.observable(Wp.iswaitingarea);
    self.patlocname = ko.observable(Wp.patlocname);
    self.patengname = ko.observable(Wp.patengname);

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

            //console.log(Wp.start_time + '|' + m + '|' + new XDate(Wp.start_time) + '|' + new XDate(serverTimeProcessed));
            //=========================================================

            // set er triage time notifications =======================
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

            //=========================================================
            //// set waiting area time notifications =======================
            //var wa = 0;
            //if (Wp.waitareatime != '')
            //    var t = Math.floor(new XDate(Wp.waitareatime).diffMinutes(new XDate(serverTimeProcessed)));

            //switch (Wp.emr_status) {
            //    case 1:
            //        intWAstartTime = WAstartTime[0];
            //        intWAavgTime = WAavgTime[0];
            //        intWAmaxTime = WAmaxTime[0];
            //        break;
            //    case 2:
            //        intWAstartTime = WAstartTime[1];
            //        intWAavgTime = WAavgTime[1];
            //        intWAmaxTime = WAmaxTime[1];
            //        break;
            //    case 3:
            //        intWAstartTime = WAstartTime[2];
            //        intWAavgTime = WAavgTime[2];
            //        intWAmaxTime = WAmaxTime[2];
            //        break;
            //    default:
            //        intWAstartTime = 30;
            //        intWAavgTime = 45;
            //        intWAmaxTime = 60;
            //        break;
            //}

            //    if (t > intTRGmaxTime)
            //        self.tMinutes("+" + intTRGmaxTime);
            //    else
            //        self.tMinutes(t);

            //    if (t < intTRGstartTime) {
            //        self.tMinutesColor('#00FF00');
            //    }
            //    else if (t >= intTRGstartTime && t < intTRGavgTime) {
            //        self.tMinutesColor('yellow');
            //    }
            //    else if (t >= intTRGavgTime && t < intTRGmaxTime) {
            //        self.tMinutesColor('red');
            //    }
            //    else if (t >= intTRGmaxTime) {
            //        self.tMinutesColor('red');
            //        // flicker alert
            //    }

            //    if (timeToDisplay > intWAmaxTime)
            //        lblWaitingAreaTime.Text = "+" + intWAmaxTime;
            //    else
            //        lblWaitingAreaTime.Text = timeToDisplay.ToString();

            //    if (timeToDisplay < intWAstartTime) {
            //        lblWaitingAreaTime.BackColor = Color.SpringGreen;
            //    }
            //    else if (timeToDisplay >= intWAstartTime && timeToDisplay < intWAavgTime) {
            //        lblWaitingAreaTime.BackColor = Color.Yellow;
            //    }
            //    else if (timeToDisplay >= intWAavgTime && timeToDisplay < intWAmaxTime) {
            //        lblWaitingAreaTime.BackColor = Color.Red;
            //    }
            //    else if (timeToDisplay >= intWAmaxTime) {
            //        lblWaitingAreaTime.BackColor = Color.Red;
            //        tmrWaitingArea.Enabled = true;
            //    }
            ////=========================================================
        }
    };

    self.tick2 = function () {
        
    };

    setInterval(self.tick, 4000);

    //setInterval(self.tick2,5000);

    self.wpClick = function (wp, e) {
        //console.log(wp);
        $("tr[id^='wp']").removeClass('selected_row_em');
        $("tr[id^='bedId']").removeClass('selected_row_em');
        $("tr[id^='pId']").removeClass('selected_row_em');

        var displayValue = $(".Patient-Banner").css("display");

        if (displayValue == "none") {
            $(".Patient-Banner").slideToggle();
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
        catch (ex)
        { }
        if (wp.patient_sex() == 1)
            $('#pbGender').text("Male");
        else if (wp.patient_sex() == 2)
            $('#pbGender').text("Female");

        $('#pbName').text(wp.patengname());
        $('#pbMRN').text(wp.patient_id());


        clickedWP = wp;
        lastBedClick = "WP";
    };

    self.WpRightClick = function (wp, e) {
        //console.log(wp);
        selectedWP = wp;

        //alert(selectedWP);

        dxMnuWP_Showing(wp);

        if (selectedWP.emr_status() == "0" || selectedWP.emr_status() == "10" || selectedWP.emr_status() == null) {
            $("#tblWP" + openedNS + " .dx-menu-item-text").filter(":containsIN('Fast')").parent().parent().attr("data-toggle", "modal");
            $("#tblWP" + openedNS + " .dx-menu-item-text").filter(":containsIN('Fast')").parent().parent().attr("data-target", "#diagTriagePriority");
        }
        else {
            $("#tblWP" + openedNS + " .dx-menu-item-text").filter(":containsIN('Move to')").parent().parent().attr("data-toggle", "modal");
            $("#tblWP" + openedNS + " .dx-menu-item-text").filter(":containsIN('Move to')").parent().parent().attr("data-target", "#diagDoctors");
        }
    };

    //self.mnuWPsVisible = ko.observable(mnuWPs);
    //self.mnuWPsToTriageVisible = ko.observable(mnuWPsToTriaged);
    ////self.mnuTrtOnBedVisible = ko.observable();
    ////self.mnuTrtNotOnBedVisible = ko.observable();

    //<!-- ko switch: emr_status -->
    //                                                <!-- ko case: ['0','10'] -->
    //                                                <tr class="cnxMnuWpToTriage" data-bind="dxContextMenu: { items: mnuWPsVisible, target: '#' + 'wp' + patient_id() }"></tr>
    //                                                <!-- /ko -->
    //                                                <!-- ko case: $default -->
    //                                                <tr class="cnxMnuWp" data-bind="dxContextMenu: { items: mnuWPsToTriageVisible, target: '#' + 'wp' + patient_id() }"></tr>
    //                                                <!-- /ko -->
    //                                                <!-- /ko -->

}

function checkChild() {
    if (childwindow.closed) {
        clearInterval(timer);

        AfterSheetClose();
    }
}

function AfterSheetClose() {

    //alert("after sheet close");
    //To Be Tested
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

                            $.getJSON("BedManagementApiActions/WaitingPatients/GetSingleWp?pId=" + Wp.patient_id(), function (allData) {
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
    self.sys_key = ko.observable(roomBeds.sys_key);
    self.parent_key = ko.observable(roomBeds.parent_key);
    self.room_name = ko.observable(roomBeds.room_name);
    self.maintainance = ko.observable(roomBeds.maintainance);
    self.active = ko.observable(roomBeds.active);
    self.inactive = ko.observable(roomBeds.inactive);
    self.isolated = ko.observable(roomBeds.isolated);
    self.undercleaning = ko.observable(roomBeds.undercleaning);
    self.latin_desc = ko.observable(roomBeds.latin_desc);
    if (roomBeds.patient_sex == 1) {
        self.sex = ko.observable('occupiedMale');
        self.pSex = ko.observable('M');
    }
    else if (roomBeds.patient_sex == 2) {
        self.sex = ko.observable('occupiedFemale');
        self.pSex = ko.observable('F');
    }
    else {
        self.sex = ko.observable('free');
        self.pSex = ko.observable('');
    }
    self.bed_class = ko.observable(roomBeds.bed_class);
    self.patient_id = ko.observable(roomBeds.patient_id);
    self.patient_sex = ko.observable(roomBeds.patient_sex);
    self.patengname = ko.observable(roomBeds.patengname);
    self.patlocname = ko.observable(roomBeds.patlocname);
    self.status = ko.observable(roomBeds.status);
    self.pat_bithdate = ko.observable(roomBeds.pat_bithdate);

    self.age = ko.observable();
    try{
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
    catch(ex){

    }

    self.start_date = ko.observable(roomBeds.start_date);
    self.systime = ko.observable(roomBeds.systime);
    self.emr_status_time = ko.observable(roomBeds.emr_status_time);
    self.emr_status = ko.observable(roomBeds.emr_status);

    //console.log(triageLevelsCount);

    //if (triageLevelsCount == 3) {
    //    if (roomBeds.emr_status == 3)
    //        self.emr_status_color = ko.observable('#00FF00');
    //    else if (roomBeds.emr_status == 2)
    //        self.emr_status_color = ko.observable('yellow');
    //    else if (roomBeds.emr_status == 1)
    //        self.emr_status_color = ko.observable('red');
    //    else {
    //        self.emr_status_color = ko.observable('lightgray');
    //        self.emr_status = ko.observable('0');
    //    }
    //}
    //else {
    //    if (roomBeds.emr_status == 5)
    //        self.emr_status_color = ko.observable('blue');
    //    else if (roomBeds.emr_status == 4)
    //        self.emr_status_color = ko.observable('#00FF00');
    //    else if (roomBeds.emr_status == 3)
    //        self.emr_status_color = ko.observable('yellow');
    //    else if (roomBeds.emr_status == 2)
    //        self.emr_status_color = ko.observable('orange');
    //    else if (roomBeds.emr_status == 1)
    //        self.emr_status_color = ko.observable('red');
    //    else {
    //        self.emr_status_color = ko.observable('lightgray');
    //        self.emr_status = ko.observable('0');
    //    }
    //}

    //console.log(IsNumeric(roomBeds.emr_status));
    //console.log(roomBeds.emr_status);
    //console.log(GetColorByStatus(roomBeds.emr_status));
    if (IsNumeric(roomBeds.emr_status) && roomBeds.emr_status != 0 && roomBeds.emr_status != 10)
        self.emr_status_color = ko.observable(GetColorByStatus(roomBeds.emr_status));
    else {
        self.emr_status_color = ko.observable('lightgray');
        self.emr_status = ko.observable('0');
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
    self.nursestationcode = ko.observable(roomBeds.nursestationcode);
    self.admissionrequested = ko.observable(roomBeds.admissionrequested);
    self.pat_location = ko.observable(roomBeds.pat_location);
    self.location_type = ko.observable(roomBeds.location_type);
    self.investigation_type = ko.observable(roomBeds.investigation_type);

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
                self.locationIcon = ko.observable('assets/images/loc/emergancy.png');
                self.locationText = ko.observable('Emergency');
            }
        }
        else {
            self.locationIcon = ko.observable('assets/images/loc/emergancy.png');
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

    self.bedRightClick = function (bed, event) {
        //mnuTrtOnBedVisible(true);
        selectedNotOnBed = null;
        selectedBed = bed;

        dxMnuTrtOnBed_Showing(bed);
        $(".dx-menu-item-text").filter(":containsIN('Discharge Order')").parent().parent().attr("data-toggle", "modal");
        $(".dx-menu-item-text").filter(":containsIN('Discharge Order')").parent().parent().attr("data-target", "#diagStatus");

        $("#erroomsAndBeds .dx-menu-item-text").filter(":containsIN('Reassign')").parent().parent().attr("data-toggle", "modal");
        $("#erroomsAndBeds .dx-menu-item-text").filter(":containsIN('Reassign')").parent().parent().attr("data-target", "#diagDoctors");

    };

    self.notOnBedRightClick = function (bed, event) {
        //mnuTrtNotOnBedVisible(true);
        selectedBed = null;
        selectedNotOnBed = bed;

        dxMnuTrtNotOnBed_Showing(bed);
        $(".dx-menu-item-text").filter(":containsIN('Discharge Order')").parent().parent().attr("data-toggle", "modal");
        $(".dx-menu-item-text").filter(":containsIN('Discharge Order')").parent().parent().attr("data-target", "#diagStatus");

        $("#erNotOnBeds .dx-menu-item-text").filter(":containsIN('Move to')").parent().parent().attr("data-toggle", "modal");
        $("#erNotOnBeds .dx-menu-item-text").filter(":containsIN('Move to')").parent().parent().attr("data-target", "#diagDoctors");

        $("#erNotOnBeds .dx-menu-item-text").filter(":containsIN('Reassign')").parent().parent().attr("data-toggle", "modal");
        $("#erNotOnBeds .dx-menu-item-text").filter(":containsIN('Reassign')").parent().parent().attr("data-target", "#diagDoctors");

    };

    self.OnBedClick = function (OnBed, e) {
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

    self.NotOnBedClick = function (NotOnBed, e) {
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
    vm = new NursestationViewModel();
    vm.erWpList = function (item) { return this.nsErWpView(); }.bind(vm);
    vm.erInTrView = function (item) { return this.selectedViewInTrSmall(); }.bind(vm);
    vm.erViews = function (item) { return this.selectedErView(); }.bind(vm);
    
    ko.applyBindings(vm);

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

    //$.contextMenu.theme = 'vista';
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

function rdoTrSmall_Changed(){
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
    $('.panel1').css({ 'backgroundImage': '-webkit-linear-gradient(left, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.0) 51%, rgba(255, 255, 255, 0.2) 100%)' , position: 'relative'});
    $('.panel1').children().hide();
    $('#wpLbl').show();
    $('#wpLbl').css({whiteSpace: 'nowrap',position: 'absolute',top: '50%',transform: 'rotate(-90deg)',left: '0','background-image': 'none', border: 'none'});
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

