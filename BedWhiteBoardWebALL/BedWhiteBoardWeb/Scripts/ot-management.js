
var jsonRoomsAndBeds;
var optheatresRooms;
var operations;
var jsonOPTs;
var jsonOPs;
var currjsonOPs;
var nsOPTs = {};
var currentDate = new Date();
var currentHoure = currentDate.getHours();
var opLastIndex = -1;
var timerNotification;
var nofityPeriod = '5000';
var openedNS;

var isPName = true;
var isSurgeonName = true;
var isOPTRoomName = true;
var isOPName = true;
var isStartEnd = true;
var lastDate = new Date();
var Enable_Alphanumric_PID = 0;
//var leastDate = new Date();

$.fn.exists = function () {
    return this.length !== 0;
}

var ip;
$.getJSON("BedManagementApiActions/Nursestations/GetIP", function (allData) {
    ip = allData;
    //console.log(ip);
    
    
    $(function myfunction() {
        //$.getScript("Scripts/jScript171.js").done(function () {
        //console.log(ip + 'DuplexCaller/NetDuplex');
        var connection = jQuery.hubConnection(ip + 'DuplexCaller/NetDuplex', { useDefaultPath: false });
        chat = connection.createHubProxy('NetDuplex');
        connection.logging = true;

        chat.on('receivingCompleted', function (e) {
            //alert('MessageHeader: ' + e.MessageHeader + '           MessageBody: ' + e.MessageBody + '.   OnReceivingCompleted');

            var jsonAlerts = e.MessageBody;
            //var jsonBedsAlerts = '[{"patient_Id":600000400,"alert_name":"High Temprature","alert_type":"bed","toolTip":"High Temprature (40) Degree","icon":"bwb_hightemp.gif","color":"red"},{"patient_Id":600000725,"alert_name":"High Temprature","alert_type":"bed","toolTip":"High Temprature (40) Degree","icon":"bwb_hightemp.gif","color":"red"},{"patient_Id":600000508,"alert_name":"Systolic Blood Pressure","alert_type":"bed","toolTip":"High Blood Pressure (190/110)","icon":"bwb_highbp.gif","color":"yellow"}]';
            var objAlerts = JSON.parse(jsonAlerts);

            console.log(objAlerts);
            //console.log(jsonOPs);

            if (e.MessageHeader == "OT Operations") {
                var newOperation = true;
                $.each(objAlerts, function (indexA, valueA) {
                    newOperation = true;
                    errorOccured = false;

                    $.each(jsonOPs, function (indexO, valueO) {
                        //alert(jsonOPs[indexO].sys_key + ' ' + objAlerts[indexA].sys_key);
                        if (jsonOPs[indexO].sys_key == objAlerts[indexA].sys_key) {
                            //alert(jsonOPs[indexO].sys_key + ' ' + objAlerts[indexA].sys_key + ' FOUND');
                            //console.log(objAlerts[indexA]);

                            try {
                                jsonOPs[indexO].optStatus = objAlerts[indexA].optStatus;
                                jsonOPs[indexO].optStatusName = objAlerts[indexA].optStatusName;
                                jsonOPs[indexO].optStatusTime = objAlerts[indexA].OptStatusTime;
                                jsonOPs[indexO].className = 'OP ' + objAlerts[indexA].className;
                                //jsonOPs[indexO].start = (new XDate(objAlerts[indexA].orderdate).toString("MM-dd-yyyy") + " " + objAlerts[indexA].fromtime);
                                //jsonOPs[indexO].end = (new XDate(objAlerts[indexA].orderdate).toString("MM-dd-yyyy") + " " + objAlerts[indexA].totime);
                                jsonOPs[indexO].start = (new XDate(objAlerts[indexA].fromtime));
                                jsonOPs[indexO].end = (new XDate(objAlerts[indexA].totime));
                                jsonOPs[indexO].optRoomName = objAlerts[indexA].optroomname;
                                //console.log(jsonOPs[indexO]);
                            } catch (err) { console.log(err); errorOccured = true;}

                            newOperation = false;
                        }
                    });


                    try{
                        if (newOperation == true) {
                            var pInitials = GetPatientInitials(objAlerts[indexA].PatEngName);
                            var newEvent = new Object();
                            newEvent.sys_key = objAlerts[indexA].sys_key;
                            newEvent.title = "<input id=\'" + objAlerts[indexA].sys_key + "\' type='hidden' value='" + objAlerts[indexA].sys_key + "' /><span id=\'pid\'>" + (objAlerts[indexA].patientAdmissionType == "1" ? "DC" : "IP") + ": <b>" + pInitials + " | </b>" + objAlerts[indexA].categoryname + ": <b>" + $.trim(objAlerts[indexA].Staff_name.toString()) + "</b></span><br/><span id=\'op\'>" + objAlerts[indexA].description + "</span>";
                            //newEvent.start = (new XDate(objAlerts[indexA].orderdate).toString("MM-dd-yyyy") + " " + objAlerts[indexA].fromtime);
                            //newEvent.end = (new XDate(objAlerts[indexA].orderdate).toString("MM-dd-yyyy") + " " + objAlerts[indexA].totime);
                            newEvent.start = (new XDate(objAlerts[indexA].fromtime));
                            newEvent.end = (new XDate(objAlerts[indexA].totime));
                            newEvent.allDay = false;
                            newEvent.className = 'OP ' + objAlerts[indexA].className;
                            newEvent.description = objAlerts[indexA].description;
                            newEvent.toolTip = "<span><b>" + objAlerts[indexA].PatEngName + "</b></span><br/><span style='color:silver;'><b>" + objAlerts[indexA].description + "</b></span><br/><br/><span>";
                            newEvent.consentsigned = "\"" + objAlerts[indexA].consentsigned + "\"";
                            newEvent.bloodtransfusion = "\"" + objAlerts[indexA].bloodtransfusion + "\"";
                            newEvent.infectious = "\"" + objAlerts[indexA].infectious + "\"";
                            newEvent.optStatus = objAlerts[indexA].optStatus;
                            newEvent.optStatusName = objAlerts[indexA].optStatusName;
                            newEvent.optStatusTime = "\"" + objAlerts[indexA].OptStatusTime;
                            newEvent.patientAdmissionType = "\"" + objAlerts[indexA].patientAdmissionType + "\"";
                            newEvent.surgeonName = objAlerts[indexA].surgeonName;
                            newEvent.patientName = objAlerts[indexA].PatEngName;
                            newEvent.patientInitials = pInitials;
                            newEvent.optRoomName = objAlerts[indexA].optroomname;
                            newEvent.opName = objAlerts[indexA].description;
                            newEvent.opStuff = "<span style=\'color:#e1e1e1;text-shadow: 1px 1px 1px #A3A3A3;\'>" + objAlerts[indexA].categoryname + ": </span><span style=\'font-size:1.2em;font-weight:bold;text-shadow: 2px 2px 2px #000;\'>" + $.trim(objAlerts[indexA].Staff_name.toString()) + "</span>";
                            newEvent.resource = parseInt(objAlerts[indexA].optroom);

                            //console.log(jsonOPs);
                            jsonOPs.push(newEvent);
                            //console.log(jsonOPs);
                        }
                    } catch (err) { console.log(err); errorOccured = true; }

                });

                if (errorOccured) {
                    $.getJSON("BedManagementApiActions/Beds/GetOperationsAdaptedRealTime?scheduledDate=" + new XDate().toString("yyyy/MM/dd"), function (allData2) {
                        jsonOPs = allData2;

                        $('#calendar' + openedNS).fullCalendar('removeEvents');
                        $('#calendar' + openedNS).fullCalendar('addEventSource', jsonOPs);
                        $('#calendar' + openedNS).fullCalendar('refetshEvents');
                        $('#calendar' + openedNS).fullCalendar('rerenderEvents');
                        
                    }).fail(function (jqxhr) {
                        console.log(jqxhr.responseText);
                        var error = $.parseJSON(jqxhr.responseText);
                        console.log(error.Message);
                    });
                }
                else {
                    $('#calendar' + openedNS).fullCalendar('removeEvents');
                    $('#calendar' + openedNS).fullCalendar('addEventSource', jsonOPs);
                    $('#calendar' + openedNS).fullCalendar('refetshEvents');
                    $('#calendar' + openedNS).fullCalendar('rerenderEvents');
                    
                }
            }
            else if (e.MessageHeader == "OT Deleted Operations") {
                console.log(e);

                $.each(objAlerts, function (indexA, valueA) {
                    errorOccured = false;

                    try {
                        $.each(jsonOPs, function (indexO, valueO) {
                            if (jsonOPs[indexO].sys_key == objAlerts[indexA].sys_key) {
                                jsonOPs.splice(indexO, 1);
                            }
                        });
                    } catch (err) { console.log(err); errorOccured = true; }

                    if (errorOccured) {
                        $.getJSON("BedManagementApiActions/Beds/GetOperationsAdaptedRealTime?scheduledDate=" + new XDate().toString("yyyy/MM/dd"), function (allData2) {
                            jsonOPs = allData2;

                            $('#calendar' + openedNS).fullCalendar('removeEvents');
                            $('#calendar' + openedNS).fullCalendar('addEventSource', jsonOPs);
                            $('#calendar' + openedNS).fullCalendar('refetshEvents');
                            $('#calendar' + openedNS).fullCalendar('rerenderEvents');
                            
                        }).fail(function (jqxhr) {
                            console.log(jqxhr.responseText);
                            var error = $.parseJSON(jqxhr.responseText);
                            console.log(error.Message);
                        });
                    }
                    else {
                        $('#calendar' + openedNS).fullCalendar('removeEvents');
                        $('#calendar' + openedNS).fullCalendar('addEventSource', jsonOPs);
                        $('#calendar' + openedNS).fullCalendar('refetshEvents');
                        $('#calendar' + openedNS).fullCalendar('rerenderEvents');
                        
                    }

                });
                
            }

        });



        connection.start(function myfunction() {
            //alert('Connected');
            $('#connBtnOp').text('Connected');
            $('#connBtnOp').attr('class', 'ConnectedBtn');
            chat.invoke('signIn', '616', 'WhiteBoard', 'WhiteBoard');
        });

    });

});


var NursestationViewModel = function () {
    var self = this;

    self.wbType = ko.observable(wbType);

    self.nursestations = ko.observableArray([]);
    self.sysParams = ko.observableArray([]);
    self.currSources = [];


    $.getJSON("BedManagementApiActions/Nursestations/GetSysParams?hospId=" + hospitalid, function (allData) {
        self.enable_alphanumric_pid = ko.observable(allData.enable_alphanumric_pid);

        Enable_Alphanumric_PID = allData.enable_alphanumric_pid;


        $.getJSON("BedManagementApiActions/Nursestations/GetOPNurseStations?uId=" + uId, function (allDataNS) {

            var mappedNursestations = $.map(allDataNS, function (Ns) { return new Nursestation(Ns) });
            self.nursestations(mappedNursestations);

            var calls = [];
            $.each(allDataNS, function (indexN, valueN) {
                calls.push(
                    $.getJSON("BedManagementApiActions/Rooms/GetRoomsWOperatingTheatres?NS_id=" + allDataNS[indexN].sys_key + "&uId=" + uId,
                        (function (indexN) {
                            return function (allData) {

                                optheatresRooms = allData;

                                jsonOPTs = [];
                                $.each(optheatresRooms, function (indexR, valueR) {

                                    var optheatres = optheatresRooms[indexR].beds;
                                    $.each(optheatres, function (indexB, valueB) {

                                        jsonOPTs.push({
                                            'id': optheatres[indexB].sys_key,
                                            'name': optheatres[indexB].latin_desc
                                        });

                                        //alert(JSON.stringify(jsonOPTs));
                                    });

                                });

                                self.currSources = jsonOPTs;
                                nsOPTs[allDataNS[indexN].sys_key] = jsonOPTs;

                                //alert(nsOPTs[indexN].length);

                                var date = new Date();
                                var d = date.getDate();
                                var m = date.getMonth();
                                var y = date.getFullYear();

                                //jsonOPTs = [{ "name": "Resource 2", "id": "resource2" }, { "name": "Resource 1", "id": "resource1" }];
                                //jsonOPs = [{ title: 'Operation 12.15-14.45', start: new Date(y, m, d, 12, 15), end: new Date(y, m, d, 14, 45), allDay: false, resource: [318, 320] },{ title: 'Meeting from this day to this +4', start: new Date(y, m, d, 10, 30), end: new Date(y, m, d + 4, 11, 00), allDay: false, resource: 321 }, { title: 'Meeting 11.00', start: new Date(y, m - 2, d, 11, 00), allDay: true, resource: 322 }, { title: 'Lunch 12-14', start: new Date(y, m, d, 12, 0), end: new Date(y, m, d, 14, 0), allDay: false, resource: 322 } ];

                                //alert('inside' + JSON.stringify(jsonOPTs));
                                //alert(JSON.stringify(jsonOPs));

                                //alert('outside' + JSON.stringify(jsonOPTs));

                                var calendar = $('#calendar' + allDataNS[indexN].sys_key).fullCalendar({
                                    header: {
                                        left: '',
                                        center: 'title',
                                        right: ''
                                    },
                                    defaultView: 'resourceDay',
                                    firstDay: 0,
                                    editable: false,
                                    selectable: true,
                                    //minTime: currentDate.getHours() - 3,
                                    //maxTime: currentDate.getHours() + 4,
                                    minTime: 0,
                                    maxTime:24,
                                    slotMinutes: 15,
                                    selectHelper: true,
                                    resources: jsonOPTs,
                                    events: jsonOPs,
                                    timeFormat: 'HH:mm',
                                    //slotEventOverlap: false,
                                    select: function (start, end, allDay, jsEvent, view, resource) {
                                        //var title = prompt('event title:');

                                        //if (title) {
                                        //    calendar.fullCalendar('renderEvent',
                                        //        {
                                        //            sys_key: sys_key,
                                        //            title: title,
                                        //            start: start,
                                        //            end: end,
                                        //            allDay: allDay,
                                        //            className: className,
                                        //            description: description,
                                        //            toolTip: toolTip,
                                        //            consentsigned: consentsigned,
                                        //            bloodtransfusion: bloodtransfusion,
                                        //            infectious: infectious,
                                        //            patientAdmissionType: patientAdmissionType,
                                        //            resource: resource.id
                                        //        },
                                        //        true // make the event "stick"
                                        //    );
                                        //}
                                        //calendar.fullCalendar('unselect');
                                    },
                                    resourceRender: function (resource, element, view) {
                                        // this is triggered when the resource is rendered, just like eventRender
                                    },
                                    eventDrop: function (event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
                                        //alert('event moved to ' + event.start + ' to ' + event.resource);
                                    },
                                    eventResize: function (event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view) {
                                        //alert('event was resized, new endtime: ' + event.end);
                                    },
                                    eventClick: function (event, jsEvent, view) {
                                        //alert('event ' + event.title + ' was left clicked');
                                    },
                                    eventRender: function (event, element, view) {
                                        //console.log(event);
                                        //console.log($(element));
                                        //$(element).css('width', $(element).width() + parseInt(11) + "px");

                                        element.find('.fc-event-title').html(event.title);

                                        var iconsHTML = "";
                                        //alert(element.consentsigned);
                                        if (event.consentsigned == "1")
                                            iconsHTML += "<img src=\"images/list_accept.png\" style=\"width:16px;height:16px;\" />";

                                        if (event.bloodtransfusion == "1")
                                            iconsHTML += "<img src=\"images/blood.png\" style=\"width:16px;height:16px;\" />";

                                        if (event.infectious == "1")
                                            iconsHTML += "<img src=\"images/bug.png\" style=\"width:16px;height:16px;\" />";

                                        if (event.episodekey != "0")
                                            iconsHTML += "<img src=\"images/admitted patient.png\" style=\"width:16px;height:16px;\" />";

                                        if (event.recoveryBayRequired != "1")
                                            iconsHTML += "<img src=\"images/door_in.png\" style=\"width:16px;height:16px;\" />";

                                        element.find(".fc-event-time").before($("<span class=\"fc-event-icons\"></span>").html(iconsHTML));

                                        //element.qtip({
                                        //    content: {
                                        //        text: event.toolTip
                                        //    },
                                        //    style: 'qtip-jtools',
                                        //    position: {
                                        //        target: 'mouse'
                                        //    }
                                        //});

                                    },
                                    eventAfterAllRender: function (view) {
                                        //console.log($(element).css('width'));

                                        
                                        //$('.fc-event.fc-event-hori.fc-event-start.fc-event-end').css('width', function () {
                                        //    console.log($(this).width() + 11)
                                        //    return $(this).width() + 11;
                                        //});

                                        //var wd = $('.fc-event.fc-event-hori.fc-event-start.fc-event-end').css('width');
                                        //if (wd != null && wd != undefined)
                                        //$('.fc-event.fc-event-hori.fc-event-start.fc-event-end').css('width', $(this).width() + 11);

                                        //$.each(jsonOPs, function (indexO, valueO) {
                                        //    $('form').append("<div class='modal' id='modal" + jsonOPs[indexO].sys_key + "' >modal " + jsonOPs[indexO].sys_key + "</div>");
                                        //});
                                    },
                                    windowResize: function (view) {
                                        //calendar.fullCalendar('option', 'height', $(window).height() - 40);
                                    },
                                    //dayRender: function () { alert('complete'); },
                                });

                            };
                        }(indexN))
                    ).fail(function (jqxhr) {
                        console.log(jqxhr.responseText);
                        var error = $.parseJSON(jqxhr.responseText);
                        console.log(error.Message);
                    })
                );
            });

            $.when.apply($, calls).then(function () {

                var today = new XDate().toString("yyyy/MM/dd")

                $.getJSON("BedManagementApiActions/Beds/GetOperationsAdaptedRealTime?scheduledDate=" + today, function (allData2) {
                    jsonOPs = allData2;

                    //console.log(jsonOPs);

                    $('[id^="calendar"]').fullCalendar('removeEvents');
                    $('[id^="calendar"]').fullCalendar('addEventSource', jsonOPs);
                    $('[id^="calendar"]').fullCalendar('refetshEvents');
                    $('[id^="calendar"]').fullCalendar('rerenderEvents');

                    var even = $('[id^="calendar"]').fullCalendar('clientEvents');

                    //console.log(even);
                    //$.each(jsonOPs, function (indexO, valueO) {
                    //    $('form').append("<div class='modal' id='modal" + jsonOPs[indexO].sys_key + "' >modal " + jsonOPs[indexO].sys_key + "</div>");
                    //});

                    var dte = new Date();
                    $('#calDate').datepicker({
                        inline: true,
                        autoSize: true,
                        firstDay: 0,
                        dateFormat: 'dd/mm/yy',
                        altField: '#calDateAlt',
                        altFormat: 'mm/dd/yy',
                        onSelect: function (dateText, inst) {
                            //$('#calendar' + openedNS + ' div:first-child').animate({ scrollLeft: 0 }, 500, function () { });

                            //setTimeout(function () {
                            //    dateText = $('#calDateAlt').val();
                            //    var d = new Date(dateText);
                            //    var xd = new XDate(dateText);

                            //    $.getJSON("BedManagementApiActions/Beds/GetOperationsAdaptedRealTime?scheduledDate=" + xd.toString("yyyy/MM/dd"), function (allData3) {
                            //        jsonOPs = allData3;

                            //        $('[id^="calendar"]').fullCalendar('removeEvents');
                            //        $('[id^="calendar"]').fullCalendar('addEventSource', jsonOPs);
                            //        $('[id^="calendar"]').fullCalendar('refetshEvents');
                            //        $('[id^="calendar"]').fullCalendar('rerenderEvents');

                            //        $('[id^="calendar"]').fullCalendar('gotoDate', d);
                            //    }).fail(function (jqxhr) {
                            //        console.log(jqxhr.responseText);
                            //        var error = $.parseJSON(jqxhr.responseText);
                            //        console.log(error.Message);
                            //    });
                            //}, 1000);

                            //$('#calendar' + openedNS + ' div:first-child').animate({ scrollLeft: (($('#calendar' + openedNS + ' div:first-child tr th:contains(\'' + currentDate.getHours() + ':00\')').offset().left - 16)) });
                        }
                    });

                    $('#calDate').datepicker("setDate", new Date());
                    $('#calDate').datepicker('disable');

                    startHourTimer();

                    //$('[id^="imgNSColl"]').attr('src', 'images/expand_arrow_alt.png');
                    $('.accContent').slideUp("slow");

                    //$.unblockUI();
                }).fail(function (jqxhr) {
                    console.log(jqxhr.responseText);
                    var error = $.parseJSON(jqxhr.responseText);
                    console.log(error.Message);
                });
                
            });

            $('.fc-event').on('click', 'img', function (event) {
                alert($(this).attr('src'));
            });

        }).fail(function (jqxhr) {
            console.log(jqxhr.responseText);
            var error = $.parseJSON(jqxhr.responseText);
            console.log(error.Message);
        });

    });


    

    self.SelectedNs = ko.observable();
    self.SelectedERNs = ko.observable();

    //this.toggle = function () {
    //    this.template(this.template() === "roomsAndBedsTmpl" ? "roomsAndBedsTmpl2" : "roomsAndBedsTmpl");
    //};
    
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

    self.currentNS = ko.observable();
    //alert(i + ' ' + nsOPTs[i]);
    //self.currResources = nsOPTs[i];

    this.collapseNS = function (header, event) {
        self.currentNS(self.sys_key());
        openedNS = self.sys_key();

        if ($('#calendar' + self.sys_key()).parent().css("display") == "block") {
            //$('#imgNSColl' + self.sys_key()).attr('src', 'images/expand_arrow_alt.png');
            $('#calendar' + self.sys_key()).parent().slideUp();
            stopTimer();
        }
        else {
            //$.blockUI({
            //    css: {
            //        border: 'none',
            //        padding: '15px',
            //        backgroundColor: '#000',
            //        '-webkit-border-radius': '10px',
            //        '-moz-border-radius': '10px',
            //        opacity: .5,
            //        color: '#fff'
            //    },
            //    showOverlay: false
            //});

            //$('[id^="imgNSColl"]').attr('src', 'images/expand_arrow_alt.png');
            $('.accContent').slideUp("slow");
            stopTimer();

            //$('#imgNSColl' + self.sys_key()).attr('src', 'images/collapse_arrow_alt.png');
            $('#calendar' + self.sys_key()).parent().slideDown();

            //$('#calendar' + openedNS + '  div:first-child').animate({ scrollLeft: 0 });
            var dateText = $('#calDateAlt').val();
            var d = new Date(dateText);
            $('#calendar' + self.sys_key()).fullCalendar('gotoDate', d);
            //$('#calendar' + self.sys_key() + ' div:first-child').animate({ scrollLeft: (($('#calendar' + self.sys_key() + ' div:first-child tr th:contains(\'' + currentDate.getHours() + ':00\')').offset().left - 16)) });

            RefreshCalendar();

            var elementToAppend = null;
            elementToAppend = $('#testo' + openedNS).next('.fc.fc-ltr').children('.fc-content').children('.fc-view.fc-view-resourceDay.fc-grid').children('table').clone();
            if ($('#testo' + openedNS).children().length == 0) {
                $('#testo' + openedNS).append(elementToAppend);
            }
            //$.unblockUI();

            //$('#calendar' + self.sys_key() + ' div:first-child').animate({ scrollLeft: (($('#calendar' + self.sys_key() + ' div:first-child tr th:contains(\'' + currentDate.getHours() + ':00\')').offset().left - 16)) });
        }


    };

    this.collapseAllNS = function (Ns, event) {

        //if ($('#imgAllNSPsColl' + self.sys_key()).attr('src') == 'images/collapse_arrow_alt.png') {
        //    $('#imgAllNSPsColl' + self.sys_key()).attr('src', 'images/expand_arrow_alt.png');
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

    self.chartWPOptions = {};
    self.chartTrtOptions = {};
    self.chartBedOptions = {};
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


var Operations = function (operation) {
    var self = this;
    self.sys_key = ko.observable(operation.sys_key);
    self.Description = ko.observable(operation.Description);
    self.optroom = ko.observable(operation.optroom);
    self.opttype = ko.observable(operation.opttype);
    self.OptRoomName = ko.observable(operation.OptRoomName);
    self.patient_id = ko.observable(operation.patient_id);
    self.patient_id_2 = ko.observable(operation.patient_id_2 == 0 ? '' : operation.patient_id_2);
    if (Enable_Alphanumric_PID != 1)
        self.patient_id_2(self.patient_id());

    self.PatEngName = ko.observable(operation.PatEngName);
    self.orderdate = ko.observable(operation.orderdate);
    self.fromtime = ko.observable(operation.fromtime);
    self.totime = ko.observable(operation.totime);
    self.order_time = ko.observable(operation.order_time);
    self.OptStatus = ko.observable(operation.OptStatus);
    self.OptStatusTime = ko.observable(operation.OptStatusTime);
    self.OptExpectedEndDate = ko.observable(operation.OptExpectedEndDate);
    self.Icon = ko.observable('/images/' + operation.Icon);
    self.consentsigned = ko.observable(operation.consentsigned);
    self.bloodtransfusion = ko.observable(operation.bloodtransfusion);
    self.infectious = ko.observable(operation.infectious);
    self.episodekey = ko.observable(operation.episodeKey);
    self.recoveryBayRequired = ko.observable(operation.recoveryBayRequired);
   
}

var vm;
$(document).ready(function () {

    vm = new NursestationViewModel();
    ko.applyBindings(vm);

    $('#opToolBar').css('display', 'inline');
    $('#opView').css('display', 'block');

    //$('divNotification').css('display','none');
    $('divSetup').css('display', 'none');
    $('divView').css('display', 'none');

    $('#txtNotyInterval').keyup(function () {
        //var textValue = $(this).val();
        //nofityPeriod = parseInt(textValue) * 1000;

        //notyTimeout = nofityPeriod - 1000;
        //toastr.clear();
        //toastr.options = {
        //    "closeButton": false,
        //    "debug": false,
        //    "positionClass": "toast-top-center",
        //    "onclick": null,
        //    "showDuration": "300",
        //    "hideDuration": "1000",
        //    "timeOut": notyTimeout,
        //    "extendedTimeOut": notyTimeout,
        //    "showEasing": "swing",
        //    "hideEasing": "linear",
        //    "showMethod": "fadeIn",
        //    "hideMethod": "fadeOut"
        //};

        if ($("#rdoNotification").prop('checked') == true) {
            stopTimer();
            startTimer(openedNS);
        }
    });

    $('#chkPName').change(function () {
        isPName =  $(this).is(':checked');
    });
    $('#chkSurgeonName').change(function () {
        isSurgeonName = $(this).is(':checked');
    });
    $('#chkOPTRoomName').change(function () {
        isOPTRoomName = $(this).is(':checked');
    });
    $('#chkOPName').change(function () {
        isOPName = $(this).is(':checked');
    });
    $('#chkStartEnd').change(function () {
        isStartEnd = $(this).is(':checked');
    });
 
});



function GetPatientInitials(fullName) {
    var patName = "";
    try {
        var patEngName = fullName.replace(',', ' ').split(' ');
        if (patEngName.length > 0)
            patName += patEngName[0][0].toString() + ".";

        if (patEngName.length > 1)
            patName += patEngName[1][0].toString() + ".";

        if (patEngName.length > 2)
            patName += patEngName[2][0].toString() + ".";

        if (patEngName.length > 3)
            patName += patEngName[3][0].toString() + ".";

    } catch (err) { console.log(err); return fullName; }
    return patName;
}

function startTimer(nsKey) {  // use a one-off timer
    //console.log('Timer Start: NS:' + nsKey);
    opLastIndex = -1;

        var textValue = $('#txtNotyInterval').val();
        nofityPeriod = parseInt(textValue) * 1000;

        notyTimeout = nofityPeriod - 1000;
        toastr.clear();
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "positionClass": "toast-top-center",
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": notyTimeout,
            "extendedTimeOut": notyTimeout,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        };

    timerNotification = setInterval(function () { GeneratingToast(nsKey); }, nofityPeriod);
};

var intrvl = 1 * 60 * 1000;
//var intrvl = 5000;

function startHourTimer() {  // use a one-off timer
    try {
        clearInterval(timerHourScroll);
    } catch (err) { }
    timerHourScroll = setInterval(function () {
        console.log("every 2 minute");
        lastDate = $('#calDateAlt').val();
        lastDate = new XDate(lastDate);
        $('#calDate').datepicker("setDate", $('#calendar' + openedNS).fullCalendar('getDate'));
        var xd = new XDate($('#calendar' + openedNS).fullCalendar('getDate'));

        $.getJSON("BedManagementApiActions/Beds/GetOperationsAdaptedRealTime?scheduledDate=" + xd.toString("yyyy/MM/dd"), function (allData2) {
            jsonOPs = allData2;

            RefreshCalendar();
        });
        
    }, intrvl);
};

function RefreshCalendar()
{
    $('#calendar' + openedNS).fullCalendar('destroy');
    currentDate = new Date();
    try {
        if ($("#rdoView").prop('checked') == true) {
            rdoView_Changed();
        }
        else if ($("#rdoNotification").prop('checked') == true) {
            rdoNotification_Changed();
        }
        else if ($("#rdoSetup").prop('checked') == true) {
            rdoSetup_Changed();
        }

        //$('#calendar' + openedNS + ' div:first-child').animate({ scrollLeft: (($('#calendar' + openedNS + ' div:first-child tr th:contains(\'' + currentDate.getHours() + ':00\')').offset().left - 16)) });
    } catch (err) { console.log(err); }
}

function stopTimer() {
    //console.log('Timer Stop');
    clearInterval(timerNotification);
    try {
        toastr.clear();
    }
    catch (ex) { console.log(ex);}
};

function GeneratingToast(nsKey) {
    var foundPrev = false;

    var d = new Date();
    var currHour = d.getHours();
    //var currHour = 13;
    var isSameNS = false;

    currjsonOPs = [];

    try {

        $.each(jsonOPs, function (indexO, valueO) {
            var opDate = new Date(jsonOPs[indexO].start);
            var opDateEnd = new Date(jsonOPs[indexO].end);
            var opHoure = opDate.getHours();
            var opHoureEnd = opDateEnd.getHours();

            if (opDate.toLocaleDateString() != opDateEnd.toLocaleDateString())
                opHoureEnd = 24;

            //console.log('start: ' + opDate.toLocaleDateString() + '| end: ' + opDateEnd.toLocaleDateString() + '| houre start: ' + opHoure + '| houre end: ' + opHoureEnd);

            isSameNS = false;
            $.each(nsOPTs[nsKey], function (indexE, valueE) {
                if (valueE.id == jsonOPs[indexO].resource) {
                    isSameNS = true;
                    return false;
                }
            });

            if ($('#' + jsonOPs[indexO].sys_key).exists() && (currHour >= opHoure && currHour <= opHoureEnd) && isSameNS && opDate.toLocaleDateString() == d.toLocaleDateString())
                currjsonOPs.push(jsonOPs[indexO]);
        });

        //console.log(jsonOPs);

        $.each(currjsonOPs, function (indexO, valueO) {

            //console.log('before1: ' + indexO + "   PrevIndex:" + opLastIndex + "   length:" + currjsonOPs.length);
            if ($('#' + currjsonOPs[indexO].sys_key).exists() && (indexO > opLastIndex)) {
                $('.fc-event.fc-event-hori.fc-event-start.fc-event-end.OP').css('box-shadow', '');
                $('.fc-event.fc-event-hori.fc-event-end.OP').css('box-shadow', '');
                $('#' + currjsonOPs[indexO].sys_key).parents().eq(2).css('box-shadow', '0px 0px 20px #00E5FF');

                var toastText = "";
                if (isStartEnd) {
                    if (currjsonOPs[indexO].optStatus < 4 || (currjsonOPs[indexO].anesthesiaStart == 0 && currjsonOPs[indexO].optStatus < 6))
                        toastText += "<span style=\'text-shadow: 2px 2px 2px #000;\'><span style=\'color:#e1e1e1;text-shadow: 1px 1px 1px #A3A3A3;\' !important\'>Expected start: </span><b>" + (new XDate(currjsonOPs[indexO].start).toString("HH:mm")) + "</b></span><span style=\'text-shadow: 2px 2px 2px #000;\'><span style=\'color:#e1e1e1;text-shadow: 1px 1px 1px #A3A3A3;\'>                   Expected end: </span><b>" + (new XDate(currjsonOPs[indexO].end).toString("HH:mm")) + "</b></span><br/>";
                    else if (((currjsonOPs[indexO].optStatus >= 4 && currjsonOPs[indexO].anesthesiaStart == 1) || (currjsonOPs[indexO].optStatus >= 6 && currjsonOPs[indexO].anesthesiaStart == 0)) && currjsonOPs[indexO].optStatus < 11)
                        toastText += "<span style=\'text-shadow: 2px 2px 2px #000;\'><span style=\'color:#e1e1e1;text-shadow: 1px 1px 1px #A3A3A3;\' !important\'>Started: </span><b>" + (new XDate(currjsonOPs[indexO].start).toString("HH:mm")) + "</b></span><span style=\'text-shadow: 2px 2px 2px #000;\'><span style=\'color:#e1e1e1;text-shadow: 1px 1px 1px #A3A3A3;\'>                   Expected end: </span><b>" + (new XDate(currjsonOPs[indexO].end).toString("HH:mm")) + "</b></span><br/>";
                    else if (((currjsonOPs[indexO].optStatus >= 4 && currjsonOPs[indexO].anesthesiaStart == 1) || (currjsonOPs[indexO].optStatus >= 6 && currjsonOPs[indexO].anesthesiaStart == 0)) && currjsonOPs[indexO].optStatus >= 11)
                        toastText += "<span style=\'text-shadow: 2px 2px 2px #000;\'><span style=\'color:#e1e1e1;text-shadow: 1px 1px 1px #A3A3A3;\' !important\'>Started: </span><b>" + (new XDate(currjsonOPs[indexO].start).toString("HH:mm")) + "</b></span><span style=\'text-shadow: 2px 2px 2px #000;\'><span style=\'color:#e1e1e1;text-shadow: 1px 1px 1px #A3A3A3;\'>                   Ended: </span><b>" + (new XDate(currjsonOPs[indexO].end).toString("HH:mm")) + "</b></span><br/>";

                    //console.log(currjsonOPs[indexO].start + "       " + currjsonOPs[indexO].end);
                }
                if (isPName)
                    toastText += "<span style=\'text-shadow: 2px 2px 2px #000;\'><span style=\'color:#e1e1e1;text-shadow: 1px 1px 1px #A3A3A3;\' !important\'>" + (currjsonOPs[indexO].patientAdmissionType == "1" ? "DC" : "IP") + ": </span><b>" + currjsonOPs[indexO].patientName + "</b></span><br/>";
                if (isOPTRoomName)
                    toastText += "<span style=\'text-shadow: 2px 2px 2px #000;\'><span style=\'color:#e1e1e1;text-shadow: 1px 1px 1px #A3A3A3;\' !important\'>Operation Theatre: </span><b>" + currjsonOPs[indexO].optRoomName + "</b></span><br/>";
                if (isOPName)
                    toastText += "<span style=\'text-shadow: 2px 2px 2px #000;\'><span style=\'color:#e1e1e1;text-shadow: 1px 1px 1px #A3A3A3;\' !important\'>Operation: </span><b>" + currjsonOPs[indexO].opName + "</b></span><br/>";

                toastText += "<span style=\'text-shadow: 2px 2px 2px #000;\'><span style=\'color:#e1e1e1;text-shadow: 1px 1px 1px #A3A3A3;\'>Status: </span><b>" + currjsonOPs[indexO].optStatusName + "</b><span style=\'color:#e1e1e1;text-shadow: 1px 1px 1px #A3A3A3;\'>              On   </span><b>" + currjsonOPs[indexO].optStatusTime + "</b></span><br/>";

                if (isSurgeonName)
                    toastText += currjsonOPs[indexO].opStuff;

                toastr.info('<div class=\'toastDiv ' + currjsonOPs[indexO].className[1] + '\'><h2 align=\'center\' style=\'text-shadow: 2px 2px 2px #000;\'>' + currjsonOPs[indexO].optStatusName + '</h2>' + toastText + '</div>');

                //console.log(indexO);

                if (indexO < currjsonOPs.length - 1)
                    opLastIndex = indexO;
                else
                    opLastIndex = -1;

                return false;
            }
        });

    }
    catch (err) { console.log(err); }
}

var add = 0;
function rdoView_Changed() {

    if ($("#rdoView").prop('checked') == true) {
        $('divNotification').css('display', 'none');
        $('divSetup').css('display', 'none');

        $('divView').css('display', 'inline-block');

        $('#calDate').datepicker('disable');
        stopTimer();
        $('.fc-event.fc-event-hori.fc-event-start.fc-event-end.OP').css('box-shadow', '');

        $('#calendar' + openedNS).fullCalendar('destroy');
        $('#calendar' + openedNS).fullCalendar({
            header: {
                left: '',
                center: 'title',
                right: ''
            },
            defaultView: 'resourceDay',
            firstDay: 0,
            editable: false,
            selectable: true,
            //minTime: currentDate.getHours() + add - 3,
            //maxTime: currentDate.getHours() + add + 4,
            minTime: 0,
            maxTime: 24,
            slotMinutes: 15,
            selectHelper: true,
            resources: nsOPTs[openedNS],
            events: jsonOPs,
            timeFormat: 'HH:mm',
            //slotEventOverlap: false,
            select: function (start, end, allDay, jsEvent, view, resource) {
                //var title = prompt('event title:');

                //if (title) {
                //    calendar.fullCalendar('renderEvent',
                //        {
                //            sys_key: sys_key,
                //            title: title,
                //            start: start,
                //            end: end,
                //            allDay: allDay,
                //            className: className,
                //            description: description,
                //            toolTip: toolTip,
                //            consentsigned: consentsigned,
                //            bloodtransfusion: bloodtransfusion,
                //            infectious: infectious,
                //            patientAdmissionType: patientAdmissionType,
                //            resource: resource.id
                //        },
                //        true // make the event "stick"
                //    );
                //}
                //calendar.fullCalendar('unselect');
            },
            resourceRender: function (resource, element, view) {
                // this is triggered when the resource is rendered, just like eventRender
            },
            eventDrop: function (event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
                //alert('event moved to ' + event.start + ' to ' + event.resource);
            },
            eventResize: function (event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view) {
                //alert('event was resized, new endtime: ' + event.end);
            },
            eventClick: function (event, jsEvent, view) {
                //alert('event ' + event.title + ' was left clicked');
            },
            eventRender: function (event, element, view) {
                element.find('.fc-event-title').html(event.title);

                var iconsHTML = "";
                //alert(element.consentsigned);
                if (event.consentsigned == "1")
                    iconsHTML += "<img src=\"images/list_accept.png\" style=\"width:16px;height:16px;\" />";

                if (event.bloodtransfusion == "1")
                    iconsHTML += "<img src=\"images/blood.png\" style=\"width:16px;height:16px;\" />";

                if (event.infectious == "1")
                    iconsHTML += "<img src=\"images/bug.png\" style=\"width:16px;height:16px;\" />";

                if (event.episodekey != "0")
                    iconsHTML += "<img src=\"images/admitted patient.png\" style=\"width:16px;height:16px;\" />";

                if (event.recoveryBayRequired != "1")
                    iconsHTML += "<img src=\"images/door_in.png\" style=\"width:16px;height:16px;\" />";

                element.find(".fc-event-time").before($("<span class=\"fc-event-icons\"></span>").html(iconsHTML));
                element.qtip({
                    content: {
                        text: event.toolTip
                    },
                    style: 'qtip-jtools',
                    position: {
                        target: 'mouse'
                    }
                });

            },
            eventAfterAllRender: function (view) {

                //$('.fc-event.fc-event-hori.fc-event-start.fc-event-end').css('width', function () {
                //    console.log($(this).width() + 11)
                //    return $(this).width() + 11;
                //});

                //var wd = $('.fc-event.fc-event-hori.fc-event-start.fc-event-end').css('width');
                //if (wd != null && wd != undefined)
                //$('.fc-event.fc-event-hori.fc-event-start.fc-event-end').css('width', $(this).width() + 11);
            },
            windowResize: function (view) {
                //calendar.fullCalendar('option', 'height', $(window).height() - 40);
            },
            //dayRender: function () { alert('complete'); },
        });

        //$('#calendar' + openedNS + ' div:first-child').animate({ scrollLeft: 0 });
        $('#calDate').datepicker("setDate", new Date());
        dateText = $('#calDateAlt').val();
        var d = new Date(dateText);
        $('#calendar' + openedNS).fullCalendar('gotoDate', d);
        //$('#calendar' + openedNS + ' div:first-child').animate({ scrollLeft: (($('#calendar' + openedNS + ' div:first-child tr th:contains(\'' + currentDate.getHours() + ':00\')').offset().left - 16)) });

        $('#calendar' + openedNS + '  div:first-child tr th:contains(\':00\')').css({ 'font-size': '1.1em', 'font-weight': '500', 'color': '#000000' });
        $('#calendar' + openedNS + '  div:first-child tr th:contains(\':15\')').css({ 'font-size': '.8em', 'font-weight': '200', 'color': '#B5B5B5' });
        $('#calendar' + openedNS + '  div:first-child tr th:contains(\':30\')').css({ 'font-size': '.9em', 'font-weight': '300', 'color': '#787878' });
        $('#calendar' + openedNS + '  div:first-child tr th:contains(\':45\')').css({ 'font-size': '.8em', 'font-weight': '200', 'color': '#B5B5B5' });

        try {
            var currClass = $('#calendar' + openedNS + '  div:first-child tr th:contains(\'' + currentDate.getHours() + ':00\')').attr('class').split(' ')[0];
            $('.' + currClass).css('background-color', '#fff');
            currClass = $('#calendar' + openedNS + '  div:first-child tr th:contains(\'' + currentDate.getHours() + ':15\')').attr('class').split(' ')[0];
            $('.' + currClass).css('background-color', '#fff');
            currClass = $('#calendar' + openedNS + '  div:first-child tr th:contains(\'' + currentDate.getHours() + ':30\')').attr('class').split(' ')[0];
            $('.' + currClass).css('background-color', '#fff');
            currClass = $('#calendar' + openedNS + '  div:first-child tr th:contains(\'' + currentDate.getHours() + ':45\')').attr('class').split(' ')[0];
            $('.' + currClass).css('background-color', '#fff');
        }
        catch (err) { console.log(err); }

        try {
            var curDate = new Date();
            var curHoure = curDate.getHours();
            var curMin = curDate.getMinutes();
            var selector = "";

            //console.log(curHoure);
            //console.log(curMin);

            if (parseInt(curMin) <= 15)
                selector = curHoure.toString() + ":" + "00";
            else if ((parseInt(curMin) > 15) && (parseInt(curMin) <= 30))
                selector = curHoure.toString() + ":" + "15";
            else if ((parseInt(curMin) > 30) && (parseInt(curMin) <= 45))
                selector = curHoure.toString() + ":" + "30";
            else if ((parseInt(curMin) > 45))
                selector = curHoure.toString() + ":" + "45";

            //setTimeout(function () {
            //console.log($('.fc-view.fc-view-resourceDay.fc-grid table thead tr th:contains("14:00")').attr("class"));
            var dd = $('.fc-view.fc-view-resourceDay.fc-grid table thead tr th:contains("' + selector + '")').attr("class");
            //console.log('.' + dd.split(" ")[0] + "." + dd.split(" ")[1]);
            //console.log($('.' + dd.split(" ")[0] + " ." + dd.split(" ")[1]));
            //console.log(dd.split(" ")[0]);
            $('.' + dd.split(" ")[0]).css('border-right', '1px solid red');

        }
        catch (err) { console.log(err); }

        try {
            var moveHoure = 0;
            if (curHoure > 4) { moveHoure = curHoure - 4; };
            //console.log(curHoure);
            //console.log('#calendar' + openedNS + ' .fc-view.fc-view-resourceDay.fc-grid table thead tr th:contains("' + parseInt(moveHoure).toString() + ":" + "00" + '")');
            var scrollToElm = $('#calendar' + openedNS + ' .fc-view.fc-view-resourceDay.fc-grid table thead tr th:contains("' + parseInt(moveHoure).toString() + ":" + "00" + '")');
            if (scrollToElm != undefined) {
                //console.log($(scrollToElm));
                $('#calendar' + openedNS + ' .fc-view.fc-view-resourceDay.fc-grid').animate({ scrollLeft: $(scrollToElm).position().left }, 500);
            }
            //}, 1000);
        }
        catch (err) { console.log(err); }
    }

    //$.unblockUI();
}

function rdoNotification_Changed() {
    //$.blockUI({
    //    css: {
    //        border: 'none',
    //        padding: '15px',
    //        backgroundColor: '#000',
    //        '-webkit-border-radius': '10px',
    //        '-moz-border-radius': '10px',
    //        opacity: .5,
    //        color: '#fff'
    //    },
    //    showOverlay: false
    //});
    if ($("#rdoNotification").prop('checked') == true) {
        $('divView').css('display', 'none');
        $('divSetup').css('display', 'none');

        $('divNotification').css('display', 'inline-block');

        $('#calDate').datepicker('disable');
        stopTimer();
        $('.fc-event.fc-event-hori.fc-event-start.fc-event-end.OP').css('box-shadow', '');
        startTimer(openedNS);

        $('#calendar' + openedNS).fullCalendar('destroy');
        $('#calendar' + openedNS).fullCalendar({
            header: {
                left: '',
                center: 'title',
                right: ''
            },
            defaultView: 'resourceDay',
            firstDay: 0,
            editable: false,
            selectable: true,
            minTime: 0,
            maxTime: 24,
            slotMinutes: 15,
            selectHelper: true,
            resources: nsOPTs[openedNS],
            events: jsonOPs,
            timeFormat: 'HH:mm',
            //slotEventOverlap: false,
            select: function (start, end, allDay, jsEvent, view, resource) {
                //var title = prompt('event title:');

                //if (title) {
                //    calendar.fullCalendar('renderEvent',
                //        {
                //            sys_key: sys_key,
                //            title: title,
                //            start: start,
                //            end: end,
                //            allDay: allDay,
                //            className: className,
                //            description: description,
                //            toolTip: toolTip,
                //            consentsigned: consentsigned,
                //            bloodtransfusion: bloodtransfusion,
                //            infectious: infectious,
                //            patientAdmissionType: patientAdmissionType,
                //            resource: resource.id
                //        },
                //        true // make the event "stick"
                //    );
                //}
                //calendar.fullCalendar('unselect');
            },
            resourceRender: function (resource, element, view) {
                // this is triggered when the resource is rendered, just like eventRender
            },
            eventDrop: function (event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
                //alert('event moved to ' + event.start + ' to ' + event.resource);
            },
            eventResize: function (event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view) {
                //alert('event was resized, new endtime: ' + event.end);
            },
            eventClick: function (event, jsEvent, view) {
                //alert('event ' + event.title + ' was left clicked');
            },
            eventRender: function (event, element, view) {
                element.find('.fc-event-title').html(event.title);

                var iconsHTML = "";
                //alert(element.consentsigned);
                if (event.consentsigned == "1")
                    iconsHTML += "<img src=\"images/list_accept.png\" style=\"width:16px;height:16px;\" />";

                if (event.bloodtransfusion == "1")
                    iconsHTML += "<img src=\"images/blood.png\" style=\"width:16px;height:16px;\" />";

                if (event.infectious == "1")
                    iconsHTML += "<img src=\"images/bug.png\" style=\"width:16px;height:16px;\" />";

                if (event.episodekey != "0")
                    iconsHTML += "<img src=\"images/admitted patient.png\" style=\"width:16px;height:16px;\" />";

                if (event.recoveryBayRequired != "1")
                    iconsHTML += "<img src=\"images/door_in.png\" style=\"width:16px;height:16px;\" />";

                element.find(".fc-event-time").before($("<span class=\"fc-event-icons\"></span>").html(iconsHTML));
                //element.qtip({
                //    content: {
                //        text: event.toolTip
                //    },
                //    style: 'qtip-jtools',
                //    position: {
                //        target: 'mouse'
                //    }
                //});

            },
            eventAfterAllRender: function (view) {

                //$('.fc-event.fc-event-hori.fc-event-start.fc-event-end').css('width', function () {
                //    console.log($(this).width() + 11)
                //    return $(this).width() + 11;
                //});

                //var wd = $('.fc-event.fc-event-hori.fc-event-start.fc-event-end').css('width');
                //if (wd != null && wd != undefined)
                //    $('.fc-event.fc-event-hori.fc-event-start.fc-event-end').css('width', parseInt(wd.replace('px', '')) + parseInt(10) + "px");
            },
            windowResize: function (view) {
                //calendar.fullCalendar('option', 'height', $(window).height() - 40);
            },
            //dayRender: function () { alert('complete'); },
        });

        //$('#calendar' + openedNS + '  div:first-child').animate({ scrollLeft: 0 });
        $('#calDate').datepicker("setDate", new Date());
        dateText = $('#calDateAlt').val();
        var d = new Date(dateText);
        $('#calendar' + openedNS).fullCalendar('gotoDate', d);
        //$('#calendar' + openedNS + '  div:first-child').animate({ scrollLeft: (($('#calendar' + openedNS + '  div:first-child tr th:contains(\'' + currentDate.getHours() + ':00\')').offset().left - 16)) });

        $('#calendar' + openedNS + '  div:first-child tr th:contains(\':00\')').css({ 'font-size': '1.1em', 'font-weight': '500', 'color': '#000000' });
        $('#calendar' + openedNS + '  div:first-child tr th:contains(\':15\')').css({ 'font-size': '.8em', 'font-weight': '200', 'color': '#B5B5B5' });
        $('#calendar' + openedNS + '  div:first-child tr th:contains(\':30\')').css({ 'font-size': '.9em', 'font-weight': '300', 'color': '#787878' });
        $('#calendar' + openedNS + '  div:first-child tr th:contains(\':45\')').css({ 'font-size': '.8em', 'font-weight': '200', 'color': '#B5B5B5' });

        try {
            var currClass = $('#calendar' + openedNS + '  div:first-child tr th:contains(\'' + currentDate.getHours() + ':00\')').attr('class').split(' ')[0];
            $('.' + currClass).css('background-color', '#fff');
            currClass = $('#calendar' + openedNS + '  div:first-child tr th:contains(\'' + currentDate.getHours() + ':15\')').attr('class').split(' ')[0];
            $('.' + currClass).css('background-color', '#fff');
            currClass = $('#calendar' + openedNS + '  div:first-child tr th:contains(\'' + currentDate.getHours() + ':30\')').attr('class').split(' ')[0];
            $('.' + currClass).css('background-color', '#fff');
            currClass = $('#calendar' + openedNS + '  div:first-child tr th:contains(\'' + currentDate.getHours() + ':45\')').attr('class').split(' ')[0];
            $('.' + currClass).css('background-color', '#fff');
        }
        catch (err) { console.log(err); }

        try {
            var curDate = new Date();
            var curHoure = curDate.getHours();
            var curMin = curDate.getMinutes();
            var selector = "";

            //console.log(curHoure);
            //console.log(curMin);

            if (parseInt(curMin) <= 15)
                selector = curHoure.toString() + ":" + "00";
            else if ((parseInt(curMin) > 15) && (parseInt(curMin) <= 30))
                selector = curHoure.toString() + ":" + "15";
            else if ((parseInt(curMin) > 30) && (parseInt(curMin) <= 45))
                selector = curHoure.toString() + ":" + "30";
            else if ((parseInt(curMin) > 45))
                selector = curHoure.toString() + ":" + "45";

            //setTimeout(function () {
            //console.log($('.fc-view.fc-view-resourceDay.fc-grid table thead tr th:contains("14:00")').attr("class"));
            var dd = $('.fc-view.fc-view-resourceDay.fc-grid table thead tr th:contains("' + selector + '")').attr("class");
            //console.log('.' + dd.split(" ")[0] + "." + dd.split(" ")[1]);
            //console.log($('.' + dd.split(" ")[0] + " ." + dd.split(" ")[1]));
            //console.log(dd.split(" ")[0]);
            $('.' + dd.split(" ")[0]).css('border-right', '1px solid red');

        }
        catch (err) { console.log(err); }

        try {
            var moveHoure = 0;
            if (curHoure > 4) { moveHoure = curHoure - 4; };
            //console.log(curHoure);
            //console.log('#calendar' + openedNS + ' .fc-view.fc-view-resourceDay.fc-grid table thead tr th:contains("' + parseInt(moveHoure).toString() + ":" + "00" + '")');
            var scrollToElm = $('#calendar' + openedNS + ' .fc-view.fc-view-resourceDay.fc-grid table thead tr th:contains("' + parseInt(moveHoure).toString() + ":" + "00" + '")');
            if (scrollToElm != undefined) {
                //console.log($(scrollToElm));
                $('#calendar' + openedNS + ' .fc-view.fc-view-resourceDay.fc-grid').animate({ scrollLeft: $(scrollToElm).position().left }, 500);
            }
            //}, 1000);
        }
        catch (err) { console.log(err); }

    }

    //$.unblockUI();
}

function rdoSetup_Changed() {

    if ($("#rdoSetup").prop('checked') == true) {
        $('divNotification').css('display', 'none');
        $('divView').css('display', 'none');

        $('divSetup').css('display', 'inline-block');

        $('#calDate').datepicker('enable');
        stopTimer();
        $('.fc-event.fc-event-hori.fc-event-start.fc-event-end.OP').css('box-shadow', '');

        $('#calendar' + openedNS).fullCalendar('destroy');
        $('#calendar' + openedNS).fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'resourceDay,resourceWeek,resourceNextWeeks,resourceMonth'
            },
            buttonText: {
                resourceDay: 'Day',
                resourceWeek: 'Week',
                resourceNextWeeks: 'Next Weeks',
                resourceMonth: 'Month',
                today: 'Today'
            },
            defaultView: 'resourceDay',
            firstDay: 0,
            editable: true,
            selectable: true,
            minTime: 0,
            maxTime: 24,
            slotMinutes: 15,
            selectHelper: true,
            resources: nsOPTs[openedNS],
            events: jsonOPs,
            timeFormat: 'HH:mm',
            //slotEventOverlap: false,
            select: function (start, end, allDay, jsEvent, view, resource) {
                //var title = prompt('event title:');

                //if (title) {
                //    calendar.fullCalendar('renderEvent',
                //        {
                //            sys_key: sys_key,
                //            title: title,
                //            start: start,
                //            end: end,
                //            allDay: allDay,
                //            className: className,
                //            description: description,
                //            toolTip: toolTip,
                //            consentsigned: consentsigned,
                //            bloodtransfusion: bloodtransfusion,
                //            infectious: infectious,
                //            patientAdmissionType: patientAdmissionType,
                //            resource: resource.id
                //        },
                //        true // make the event "stick"
                //    );
                //}
                //calendar.fullCalendar('unselect');
            },
            resourceRender: function (resource, element, view) {
                // this is triggered when the resource is rendered, just like eventRender
            },
            eventDrop: function (event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view) {
                //alert('event moved to ' + event.start + ' to ' + event.resource);
            },
            eventResize: function (event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view) {
                //alert('event was resized, new endtime: ' + event.end);
            },
            eventClick: function (event, jsEvent, view) {
                //alert('event ' + event.title + ' was left clicked');
            },
            eventRender: function (event, element, view) {
                element.find('.fc-event-title').html(event.title);

                var iconsHTML = "";
                //alert(element.consentsigned);
                if (event.consentsigned == "1")
                    iconsHTML += "<img src=\"images/list_accept.png\" style=\"width:16px;height:16px;\" />";

                if (event.bloodtransfusion == "1")
                    iconsHTML += "<img src=\"images/blood.png\" style=\"width:16px;height:16px;\" />";

                if (event.infectious == "1")
                    iconsHTML += "<img src=\"images/bug.png\" style=\"width:16px;height:16px;\" />";

                if (event.episodekey != "0")
                    iconsHTML += "<img src=\"images/admitted patient.png\" style=\"width:16px;height:16px;\" />";

                if (event.recoveryBayRequired != "1")
                    iconsHTML += "<img src=\"images/door_in.png\" style=\"width:16px;height:16px;\" />";

                element.find(".fc-event-time").before($("<span class=\"fc-event-icons\"></span>").html(iconsHTML));
                //element.qtip({
                //    content: {
                //        text: event.toolTip
                //    },
                //    style: 'qtip-jtools',
                //    position: {
                //        target: 'mouse'
                //    }
                //});

            },
            eventAfterAllRender: function (view) {

                //$('.fc-event.fc-event-hori.fc-event-start.fc-event-end').css('width', function () {
                //    console.log($(this).width() + 11)
                //    return $(this).width() + 11;
                //});

                //var wd = $('.fc-event.fc-event-hori.fc-event-start.fc-event-end').css('width');
                //if (wd != null && wd != undefined)
                //    $('.fc-event.fc-event-hori.fc-event-start.fc-event-end').css('width', parseInt(wd.replace('px', '')) + parseInt(10) + "px");
            },
            windowResize: function (view) {
                //calendar.fullCalendar('option', 'height', $(window).height() - 40);
            },
            //dayRender: function () { alert('complete'); },
        });

        $('#calendar' + openedNS + '  div:first-child tr th:contains(\':00\')').css({ 'font-size': '1.1em', 'font-weight': '500', 'color': '#000000' });
        $('#calendar' + openedNS + '  div:first-child tr th:contains(\':15\')').css({ 'font-size': '.8em', 'font-weight': '200', 'color': '#B5B5B5' });
        $('#calendar' + openedNS + '  div:first-child tr th:contains(\':30\')').css({ 'font-size': '.9em', 'font-weight': '300', 'color': '#787878' });
        $('#calendar' + openedNS + '  div:first-child tr th:contains(\':45\')').css({ 'font-size': '.8em', 'font-weight': '200', 'color': '#B5B5B5' });

        try {
            var currClass = $('#calendar' + openedNS + '  div:first-child tr th:contains(\'' + currentDate.getHours() + ':00\')').attr('class').split(' ')[0];
            $('.' + currClass).css('background-color', '#fff');
            currClass = $('#calendar' + openedNS + '  div:first-child tr th:contains(\'' + currentDate.getHours() + ':15\')').attr('class').split(' ')[0];
            $('.' + currClass).css('background-color', '#fff');
            currClass = $('#calendar' + openedNS + '  div:first-child tr th:contains(\'' + currentDate.getHours() + ':30\')').attr('class').split(' ')[0];
            $('.' + currClass).css('background-color', '#fff');
            currClass = $('#calendar' + openedNS + '  div:first-child tr th:contains(\'' + currentDate.getHours() + ':45\')').attr('class').split(' ')[0];
            $('.' + currClass).css('background-color', '#fff');
        }
        catch (err) { console.log(err); }

        try {
            var curDate = new Date();
            var curHoure = curDate.getHours();
            var curMin = curDate.getMinutes();
            var selector = "";

            //console.log(curHoure);
            //console.log(curMin);

            if (parseInt(curMin) <= 15)
                selector = curHoure.toString() + ":" + "00";
            else if ((parseInt(curMin) > 15) && (parseInt(curMin) <= 30))
                selector = curHoure.toString() + ":" + "15";
            else if ((parseInt(curMin) > 30) && (parseInt(curMin) <= 45))
                selector = curHoure.toString() + ":" + "30";
            else if ((parseInt(curMin) > 45))
                selector = curHoure.toString() + ":" + "45";

            //setTimeout(function () {
            //console.log($('.fc-view.fc-view-resourceDay.fc-grid table thead tr th:contains("14:00")').attr("class"));
            var dd = $('.fc-view.fc-view-resourceDay.fc-grid table thead tr th:contains("' + selector + '")').attr("class");
            //console.log('.' + dd.split(" ")[0] + "." + dd.split(" ")[1]);
            //console.log($('.' + dd.split(" ")[0] + " ." + dd.split(" ")[1]));
            //console.log(dd.split(" ")[0]);
            $('.' + dd.split(" ")[0]).css('border-right', '1px solid red');

        }
        catch (err) { console.log(err); }

        try {
            var moveHoure = 0;
            if (parseInt(curHoure) > 4) { moveHoure = curHoure - 4; };
            var scrollToElm = $('.fc-view.fc-view-resourceDay.fc-grid table thead tr th:contains("' + parseInt(moveHoure).toString() + ":" + "00" + '")');
            if (scrollToElm != undefined) {
                $('.fc-view.fc-view-resourceDay.fc-grid').animate({ scrollLeft: $(scrollToElm).position().left }, 500);
            }
            //}, 1000);
        }
        catch (err) { console.log(err); }

        $('.fc-button.fc-button-prev.fc-state-default.fc-corner-left').click(function () {
            $('#calendar' + openedNS + ' div:first-child').animate({ scrollLeft: 0 }, 500, function () { });

            //if (xd < lastDate) {
            setTimeout(function () {

                lastDate = $('#calDateAlt').val();
                lastDate = new XDate(lastDate);
                $('#calDate').datepicker("setDate", $('#calendar' + openedNS).fullCalendar('getDate'));
                var xd = new XDate($('#calendar' + openedNS).fullCalendar('getDate'));

                //console.log('true');
                $.getJSON("BedManagementApiActions/Beds/GetOperationsAdaptedRealTime?scheduledDate=" + xd.toString("yyyy/MM/dd"), function (allData2) {
                    jsonOPs = allData2;

                    //console.log(jsonOPs);

                    $('[id^="calendar"]').fullCalendar('removeEvents');
                    $('[id^="calendar"]').fullCalendar('addEventSource', jsonOPs);
                    $('[id^="calendar"]').fullCalendar('refetshEvents');
                    $('[id^="calendar"]').fullCalendar('rerenderEvents');

                }).fail(function (jqxhr) {
                    console.log(jqxhr.responseText);
                    var error = $.parseJSON(jqxhr.responseText);
                    console.log(error.Message);
                });


            }, 1000);
            //}

        });

        $('.fc-button.fc-button-next.fc-state-default.fc-corner-right').click(function () {
            $('#calendar' + openedNS + ' div:first-child').animate({ scrollLeft: 0 }, 500, function () { });
            //if (xd < lastDate) {
            setTimeout(function () {
                $('#calDate').datepicker("setDate", $('#calendar' + openedNS).fullCalendar('getDate'));
                var xd = new XDate($('#calendar' + openedNS).fullCalendar('getDate'));

                //console.log('true');
                $.getJSON("BedManagementApiActions/Beds/GetOperationsAdaptedRealTime?scheduledDate=" + xd.toString("yyyy/MM/dd"), function (allData2) {
                    jsonOPs = allData2;

                    //console.log(jsonOPs);

                    $('[id^="calendar"]').fullCalendar('removeEvents');
                    $('[id^="calendar"]').fullCalendar('addEventSource', jsonOPs);
                    $('[id^="calendar"]').fullCalendar('refetshEvents');
                    $('[id^="calendar"]').fullCalendar('rerenderEvents');

                }).fail(function (jqxhr) {
                    console.log(jqxhr.responseText);
                    var error = $.parseJSON(jqxhr.responseText);
                    console.log(error.Message);
                });
            }, 1000);
            //}


        });
    }

}

