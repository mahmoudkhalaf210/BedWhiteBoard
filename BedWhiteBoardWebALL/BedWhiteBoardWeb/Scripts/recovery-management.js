
var jsonRoomsAndBeds;
var jsonWaitingAreas;
var isInitialReceivCalled = false;
var openedNS;
var vm;
var currDate = new Date();
var pId;

var ip;
var chat;
var ruleResult;
var Enable_Alphanumric_PID = 0;

var tn = GetQueryStringParams('tn');
//console.log(tn);
var headers = {};
if (tn) {
    headers.Authorization = 'Bearer ' + tn;
    console.log(headers);
}

$.ajaxSetup({
    headers: headers,
});

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


$.getJSON("BedManagementApiActions/Nursestations/GetIP", function (allData) {
    ip = allData;
    //console.log(ip);

});


var NursestationViewModel = function () {
    var self = this;

    self.wbType = ko.observable(wbType);
    
    self.triageLevels = ko.observableArray([]);

    self.nursestations = ko.observableArray([]);
    self.roomsAndBeds = ko.observableArray([]);
    self.waitingAreas = ko.observableArray([]);
    self.waitingPatients = ko.observableArray([]);
    
    $.getJSON("BedManagementApiActions/Nursestations/GetSysParams?hospId=" + hospitalid, function (allData) {
        self.enable_alphanumric_pid = ko.observable(allData.enable_alphanumric_pid);

        Enable_Alphanumric_PID = allData.enable_alphanumric_pid;
    });

    $.getJSON("BedManagementApiActions/Nursestations/GetRBNurseStations?" + "&uId=" + uId, function (allData) {
        var mappedNursestations = $.map(allData, function (Ns) { return new Nursestation(Ns) });
        self.nursestations(mappedNursestations);

        $('#wbToolBar').css('display', 'none');

    });

    self.SelectedNs = ko.observable();
    self.SelectedERNs = ko.observable();

    self.selectedView = ko.observable("roomsAndBedsTmpl2RB");

    self.nsView = ko.observable("nsTmpl3");

 
    self.openNS = function (Ns, event) {
        if (vm.selectedView() == "roomsAndBedsTmpl") {
            //$(event.target).animate({ height: '800px' });
            self.SelectedNs(Ns);
            vm.SelectedERNs(Ns);
            openedNS = Ns.sys_key();

            //alert(self.SelectedNs().ns_image());
            $('#wbNsList').animate({ opacity: 0.0, marginLeft: '0.6in' }, 1500);
            //$('#spnNS' + Ns.sys_key()).parent().animate({ height: '200px' }, 500);
            $('#spnNS' + Ns.sys_key()).animate({ opacity: 1.0 }, 800, function () {
                $('#wbNsList').css('display', 'none');
                $('#wbroomsAndBeds').css('display', 'block');
                $('#wbroomsAndBeds').prepend('<img id=\'nsImage\' src=\'' + self.SelectedNs().ns_image() + '\' style=\'opacity: 0.0; margin-left: -100px; margin-right: 100px;\' />');
                $('#selectedNS').css('display', 'block');
                $('#selectedNS').animate({ opacity: 1.0 });
                $('#nsImage').animate({ opacity: 1.0, marginLeft: '0px', marginRight: '0px' }, 500);
                $('#wbroomsAndBeds').animate({ opacity: 1.0, marginLeft: '0px', marginRight: '0px' }, 500);

                $('#toolBar').css('display', 'block');
                $('#bedSizeBar').css('display', 'none');
                $('#nsImage').css('display', 'block');
                $('#wbRoomsBeds').css('display', 'block');

                //$('#bedsTitle').animate({ opacity: 0.0, marginLeft: '-100px', marginRight: '100px' }, 500);
                $('#bedsTitle').css('display', 'none');
                $('#bedsTitle').css('visibility', 'hidden');
            });

            $('#layoutStyle').css('display', 'inline');
            $('#toolBar').css('display', 'inline');
            $('#bedSizeBar').css('display', 'none');


        }
        else {
            //$(event.target).animate({ height: '800px' });
            self.SelectedNs(Ns);
            vm.SelectedERNs(Ns);
            openedNS = Ns.sys_key();

            //alert(self.SelectedNs().ns_image());
            $('#wbNsList').animate({ opacity: 0.0, marginLeft: '0.6in' }, 1500);
            //$('#spnNS' + Ns.sys_key()).parent().animate({ height: '200px' }, 500);
            $('#spnNS' + Ns.sys_key()).animate({ opacity: 1.0 }, 800, function () {
                $('#wbNsList').css('display', 'none');
                $('#wbroomsAndBeds').css('display', 'block');
                $('#wbroomsAndBeds').prepend('<img id=\'nsImage\' src=\'' + self.SelectedNs().ns_image() + '\' style=\'opacity: 0.0; margin-left: -100px; margin-right: 100px;\' />');
                $('#selectedNS').css('display', 'block');
                $('#selectedNS').animate({ opacity: 1.0 });
                $('#nsImage').animate({ opacity: 1.0, marginLeft: '0px', marginRight: '0px' }, 500);
                $('#wbroomsAndBeds').animate({ opacity: 1.0, marginLeft: '0px', marginRight: '0px' }, 500);

                $('#toolBar').css('display', 'none');
                $('#bedSizeBar').css('display', 'none');
                $('#nsImage').css('display', 'none');
                $('#wbRoomsBeds').css('display', 'block');

                $('#bedsTitle').css('display', 'block');
                $('#bedsTitle').css('visibility', 'visible');
                //$('#bedsTitle').animate({ opacity: 1.0, marginLeft: '0px', marginRight: '0px' }, 500);
                $(".widget-title h3").click(function () {
                    //alert("teet");
                    $(this).parent().next().slideToggle();
                    //$(this).next(".widget-controls").slideToggle();
                });
            });

            $('#layoutStyle').css('display', 'inline');
            $('#toolBar').css('display', 'inline');
            $('#bedSizeBar').css('display', 'none');

        }

        $.getJSON("BedManagementApiActions/Rooms/GetRoomsWRecoveryBeds?NS_id=" + Ns.sys_key() + "&BedType=1&uId=" + uId, function (allData) {
            //console.log(allData);
            var mappedRoomsAndBeds = $.map(allData, function (roomWBeds) { return new RoomAndBeds(roomWBeds) });
            self.roomsAndBeds(mappedRoomsAndBeds);
            //console.log(self.roomsAndBeds());
            jsonRoomsAndBeds = self.roomsAndBeds();
           
            $('#wbToolBar').css('display', 'none');
        });
       
        $.getJSON("BedManagementApiActions/Rooms/GetRoomsWRecoveryBedsWA?NS_id=" + Ns.sys_key() + "&BedType=1&uId=" + uId, function (allData) {
            //console.log(allData);
            var mappedWaitingAreas = $.map(allData, function (roomWBeds) { return new RoomAndBeds(roomWBeds) });
            self.waitingAreas(mappedWaitingAreas);
            //console.log(self.waitingAreas());
            jsonWaitingAreas = self.waitingAreas();

            $('#wbToolBar').css('display', 'none');
        });

        //$.getJSON("BedManagementApiActions/WaitingPatients/Get?NS_id=" + Ns.sys_key(), function (allData) {
        //    var mappedWaitingPatients = $.map(allData, function (wPatient) { return new WaitingPatients(wPatient) });
        //    self.waitingPatients(mappedWaitingPatients);
        //});
    };

    self.closeNS = function () {

        $('#spnNS' + self.SelectedNs().sys_key()).parent().css('height', '');
        $('#selectedNS').animate({ opacity: 0.0 }, 500);
        $('#wbroomsAndBeds').animate({ opacity: 0.0, marginLeft: '-100px', marginRight: '100px' }, 500, function () {
            $('#wbNsList').css('display', 'block');
            $('#wbNsList').css('marginLeft', '');
            $('#wbNsList').animate({ opacity: 1.0 }, 500);
            $('#spnNS' + self.SelectedNs().sys_key()).animate({ opacity: 1.0, marginLeft: '', marginTop: '' }, 800);
            $('#nsImage').remove();
            $('#wbroomsAndBeds').css('display', 'none');
            $('#selectedNS').css('display', 'none');
            $('#wbRoomsBeds').css('display', 'none');
        });


        $('#layoutStyle').css('display', 'none');
        $('#toolBar').css('display', 'none');
        $('#bedSizeBar').css('display', 'none');

    };

    self.Refresh = function () {

        ko.utils.arrayForEach(vm.nursestations(), function (ns) {
            if (ns.sys_key() == openedNS) {

                $.getJSON("BedManagementApiActions/Rooms/GetRoomsWRecoveryBeds?NS_id=" + ns.sys_key() + "&BedType=1&uId=" + uId, function (allData) {
                    //console.log(allData);
                    var mappedRoomsAndBeds = $.map(allData, function (roomWBeds) { return new RoomAndBeds(roomWBeds) });
                    vm.roomsAndBeds(mappedRoomsAndBeds);
                    //console.log(self.roomsAndBeds());
                    jsonRoomsAndBeds = vm.roomsAndBeds();

                    $('#wbToolBar').css('display', 'none');
                });

                $.getJSON("BedManagementApiActions/Rooms/GetRoomsWRecoveryBedsWA?NS_id=" + ns.sys_key() + "&BedType=1&uId=" + uId, function (allData) {
                    //console.log(allData);
                    var mappedWaitingAreas = $.map(allData, function (roomWBeds) { return new RoomAndBeds(roomWBeds) });
                    vm.waitingAreas(mappedWaitingAreas);
                    //console.log(self.waitingAreas());
                    jsonWaitingAreas = vm.waitingAreas();

                    $('#wbToolBar').css('display', 'none');
                });
            }
        });



    };

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
    self.reservedBeds = ko.observable(Ns.reservedBeds)
    self.alerts = ko.observableArray($.map(Ns.alerts, function (NsAlert) { return new NsAlerts(NsAlert) }));
    self.sortedWaitingPatients = ko.observableArray([]);
    self.roomsAndBeds = ko.observableArray([]);
    self.erDoctors = ko.observableArray([]);
    self.waitingPatients = ko.observableArray([]);
    self.erNsAlerts = ko.observableArray([]);
   
    self.currentNS = ko.observable();

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
    self.beds = ko.observableArray($.map(roomWBeds.beds, function (roomBeds) { return new RoomBeds(roomBeds) }));

    self.distictBeds = ko.dependentObservable(function () {
        return ko.utils.arrayGetDistinctValues(self.beds()).sort();
    }, self);

    self.AddtoWA = function (room, event) {
        var bedKey;
        ko.utils.arrayForEach(room.beds(), function (bed) {
            bedKey = bed.sys_key();
        });

        var url = "BedManagementApiActions/Beds/ExecuteRule?KBId=28&ruleName=ME_WHITEBOARD_RB_AddtoWA&stateVals=BedId~" + bedKey + "|RoomId~" + room.room_key() + "|NsId~" + openedNS + "|UserId~" + uId + "|param~";

        console.log(url);

        $.getJSON("BedManagementApiActions/Beds/CheckExist?bedId=" + bedKey, function (allData) { });

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: url,
            //data: JSON.stringify(jsonWp),
            success: function (data) {
                //console.log(data);
                //console.log('RecoveryBedClick Succeded');

                ruleResult = data;

                if (ruleResult != null && ruleResult.indexOf('@') >= 0) {
                    methodName = ruleResult.split('@')[0].split('^')[0];
                    userValue = ruleResult.split('@')[0].split('^')[1];
                    switch (methodName.toLowerCase()) {
                        case "getselection":
                            $("#framSelection").attr('src', './SelectionPage.aspx');
                            $('#diagSelection').modal('show');
                            break;
                        case "getinput":
                            break;
                        case "confirmationmsg":
                            break;
                        case "msg":
                            $("#spnMsg").text(userValue);
                            $('#diagMsg').modal('show');
                            break;
                        default:
                            methodName = "";
                            break;
                    }
                }
                else {
                    methodName = "";
                    userValue = "";
                    $('#diagSelection').modal('hide');
                    $('#diagMsg').modal('hide');

                    $.getJSON("BedManagementApiActions/Nursestations/GetRBNurseStations?" + "&uId=" + uId, function (allData) {
                        var mappedNursestations = $.map(allData, function (Ns) { return new Nursestation(Ns) });
                        vm.nursestations(mappedNursestations);

                        ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                            if (ns.sys_key() == openedNS) {
                                vm.SelectedERNs(ns);
                                vm.SelectedNs(ns);

                                //ns.occupiedPat(Ns.occupiedPat);
                                //ns.occupiedMale(Ns.occupiedMale);
                                //ns.occupiedFemale(Ns.occupiedFemale);
                                //ns.PatAdmission(Ns.PatAdmission);
                                //ns.PatDischarge(Ns.PatDischarge);
                                //ns.DAMA(Ns.DAMA);
                                //ns.OutOnPass(Ns.OutOnPass);
                                //ns.pendingDis(Ns.pendingDis);
                                //ns.T_in(Ns.T_in);
                                //ns.T_Out(Ns.T_Out);
                                //ns.emptyBeds(Ns.emptyBeds);
                                //ns.blockedBeds(Ns.blockedBeds);
                                //ns.reservedBeds(Ns.reservedBeds);
                            }
                        });

                        $.getJSON("BedManagementApiActions/Rooms/GetRoomsWRecoveryBeds?NS_id=" + vm.SelectedERNs().sys_key() + "&BedType=1&uId=" + uId, function (allData) {
                            //console.log(allData);
                            //console.log(ns);
                            var mappedRoomsAndBeds = $.map(allData, function (roomWBeds) { return new RoomAndBeds(roomWBeds) });
                            //console.log(ns.roomsAndBeds());
                            vm.roomsAndBeds(mappedRoomsAndBeds);
                            jsonRoomsAndBeds = vm.roomsAndBeds();

                            $('.nur_alerts').css('display', 'none');
                            $('#wbToolBar').css('display', 'none');
                        });

                        $.getJSON("BedManagementApiActions/Rooms/GetRoomsWRecoveryBedsWA?NS_id=" + vm.SelectedERNs().sys_key() + "&BedType=1&uId=" + uId, function (allData) {
                            //console.log(allData);
                            var mappedWaitingAreas = $.map(allData, function (roomWBeds) { return new RoomAndBeds(roomWBeds) });
                            vm.waitingAreas(mappedWaitingAreas);
                            //console.log(self.roomsAndBeds());
                            jsonWaitingAreas = vm.waitingAreas();

                            $('.nur_alerts').css('display', 'none');
                            $('#wbToolBar').css('display', 'none');
                        });
                    });


                }
            },
            error: function (error) {
                //jsonValue = jQuery.parseJSON(error.responseText);
                console.log(error);
                console.log('An error has occurred while processing rule: ' + error.responseText);
            }
        });
    };
  
}

var WaitingPatients = function (wPatient) {
    this.room_key = ko.observable(roomWBeds.room_key);
    this.room_name = ko.observable(roomWBeds.room_name);
    this.nursestationcode = ko.observable(roomWBeds.nursestationcode);
    this.location = ko.observable(roomWBeds.location);
    this.x = roomWBeds.location == null ? ko.observable() : ko.observable((parseInt(roomWBeds.location.split(',')[0]) + 5) + 'px');
    this.y = roomWBeds.location == null ? ko.observable() : ko.observable((parseInt(roomWBeds.location.split(',')[1]) + 145) + 'px');
    this.rotation = roomWBeds.rotation == null ? ko.observable(0) : ko.observable(roomWBeds.rotation);
    this.size = ko.observable(roomWBeds.size);
    this.width = roomWBeds.size == null ? ko.observable() : ko.observable((parseInt(roomWBeds.size.split(',')[0]) - 15) + 'px');
    this.height = roomWBeds.size == null ? ko.observable() : ko.observable((parseInt(roomWBeds.size.split(',')[1]) - 15) + 'px');
    this.beds = ko.observableArray($.map(roomWBeds.beds, function (roomBeds) { return new RoomBeds(roomBeds) }));
}

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

    if (roomBeds.active == 1)
        self.sexClass = ko.observable('blocked');
    else if (roomBeds.active == 2)
        self.sexClass = ko.observable('reserved');
    else {
        if (roomBeds.patient_sex == 1) {
            self.sexClass = ko.observable('occupiedMale');
        }
        else if (roomBeds.patient_sex == 2) {
            self.sexClass = ko.observable('occupiedFemale');
        }
        else {
            self.sexClass = ko.observable('free');

        }
    }

    
    self.bed_class = ko.observable(roomBeds.bed_class);
    self.patient_id = ko.observable(roomBeds.patient_id == 0 ? '' : roomBeds.patient_id);
    self.patient_id_2 = ko.observable(roomBeds.patient_id_2 == 0 ? '' : roomBeds.patient_id_2);

    if (Enable_Alphanumric_PID != 1)
        self.patient_id_2(self.patient_id());

    if (roomBeds.patient_id == 0)
        self.notEmpty = ko.observable(false);
    else
        self.notEmpty = ko.observable(true);

    self.patient_sex = ko.observable(roomBeds.patient_sex);
    self.patengname = ko.observable(roomBeds.patengname);
    self.patlocname = ko.observable(roomBeds.patlocname);
    self.status = ko.observable(roomBeds.status);
    self.pat_bithdate = ko.observable(roomBeds.pat_bithdate);
    self.start_date = ko.observable(roomBeds.start_date);
    self.systime = ko.observable(roomBeds.systime);
    self.emr_status_time = ko.observable(roomBeds.emr_status_time);
    self.emr_status = ko.observable(roomBeds.emr_status);
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
    self.admitted = ko.observable(roomBeds.admitted);
    self.statusName = ko.observable(roomBeds.statusName);
    self.icon = ko.observable('/images/' + roomBeds.icon);
    self.color = ko.observable(roomBeds.color);
    self.location = ko.observable(roomBeds.location);
    self.x = roomBeds.location == null ? ko.observable() : ko.observable((parseInt(roomBeds.location.split(',')[0]) + 5) + 'px');
    self.y = roomBeds.location == null ? ko.observable() : ko.observable((parseInt(roomBeds.location.split(',')[1]) + 145) + 'px');
    self.rotation = roomBeds.rotation == null ? ko.observable(0) : ko.observable(roomBeds.rotation);
    self.bedAlerts = ko.observableArray([]);

    var methodName = "";
    var userValue = "";
    self.RecoveryBedClick = function (bed, event) {
        //console.log('RecoveryBedClick');
        //console.log(bed);
        pId = bed.patient_id();

        var url = "";
        if ((bed.patient_id() == 0 || bed.patient_id() == '') && (bed.active() == 1))
            url = "BedManagementApiActions/Beds/ExecuteRule?KBId=28&ruleName=ME_WHITEBOARD_RB_BlockedBed&stateVals=PatientId~" + bed.patient_id() + "|EpisodeKey~" + bed.episodekey() + "|BedId~" + bed.sys_key() + "|RoomId~" + bed.parent_key() + "|NsId~" + openedNS + "|UserId~" + uId + "|param~";
        else if ((bed.patient_id() != 0 && bed.patient_id() != '') && (bed.active() == 2))
            url = "BedManagementApiActions/Beds/ExecuteRule?KBId=28&ruleName=ME_WHITEBOARD_RB_ReservedBed&stateVals=PatientId~" + bed.patient_id() + "|EpisodeKey~" + bed.episodekey() + "|BedId~" + bed.sys_key() + "|RoomId~" + bed.parent_key() + "|NsId~" + openedNS + "|UserId~" + uId + "|param~";
        else if ((bed.patient_id() == 0 || bed.patient_id() == '') && (bed.active() == 0 || bed.active() == ''))
            url = "BedManagementApiActions/Beds/ExecuteRule?KBId=28&ruleName=ME_WHITEBOARD_RB_EmptyBed&stateVals=PatientId~" + bed.patient_id() + "|EpisodeKey~" + bed.episodekey() + "|BedId~" + bed.sys_key() + "|RoomId~" + bed.parent_key() + "|NsId~" + openedNS + "|UserId~" + uId + "|param~";
        else if ((bed.patient_id() != 0 && bed.patient_id() != '') && (bed.active() == 0 || bed.active() == ''))
            url = "BedManagementApiActions/Beds/ExecuteRule?KBId=28&ruleName=ME_WHITEBOARD_RB_OccupiedBed&stateVals=PatientId~" + bed.patient_id() + "|EpisodeKey~" + bed.episodekey() + "|BedId~" + bed.sys_key() + "|RoomId~" + bed.parent_key() + "|NsId~" + openedNS + "|UserId~" + uId + "|param~";

        console.log(url);

        $.getJSON("BedManagementApiActions/Beds/CheckExist?bedId=" + bed.sys_key(), function (allData) {
            //alert(allData);
        });

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: url,
            //data: JSON.stringify(jsonWp),
            success: function (data) {
                //console.log(data);
                //console.log('RecoveryBedClick Succeded');

                ruleResult = data;
                
                if (ruleResult != null && ruleResult.indexOf('@') >= 0) {
                    methodName = ruleResult.split('@')[0].split('^')[0];
                    userValue = ruleResult.split('@')[0].split('^')[1];
                    switch (methodName.toLowerCase()) {
                        case "getselection":
                            $("#framSelection").attr('src', './SelectionPage.aspx');
                            $('#diagSelection').modal('show');
                            break;
                        case "getinput":
                            break;
                        case "confirmationmsg":
                            break;
                        case "msg":
                            $("#spnMsg").text(userValue);
                            $('#diagMsg').modal('show');
                            break;
                        default:
                            methodName = "";
                            break;
                    }
                }
                else {
                    methodName = "";
                    userValue = "";
                    $('#diagSelection').modal('hide');
                    $('#diagMsg').modal('hide');

                    $.getJSON("BedManagementApiActions/Nursestations/GetRBNurseStations?" + "&uId=" + uId, function (allData) {
                        var mappedNursestations = $.map(allData, function (Ns) { return new Nursestation(Ns) });
                        vm.nursestations(mappedNursestations);

                        ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                            if (ns.sys_key() == openedNS) {
                                vm.SelectedERNs(ns);
                                vm.SelectedNs(ns);

                                //ns.occupiedPat(Ns.occupiedPat);
                                //ns.occupiedMale(Ns.occupiedMale);
                                //ns.occupiedFemale(Ns.occupiedFemale);
                                //ns.PatAdmission(Ns.PatAdmission);
                                //ns.PatDischarge(Ns.PatDischarge);
                                //ns.DAMA(Ns.DAMA);
                                //ns.OutOnPass(Ns.OutOnPass);
                                //ns.pendingDis(Ns.pendingDis);
                                //ns.T_in(Ns.T_in);
                                //ns.T_Out(Ns.T_Out);
                                //ns.emptyBeds(Ns.emptyBeds);
                                //ns.blockedBeds(Ns.blockedBeds);
                                //ns.reservedBeds(Ns.reservedBeds);
                            }
                        });

                        $.getJSON("BedManagementApiActions/Rooms/GetRoomsWRecoveryBeds?NS_id=" + vm.SelectedERNs().sys_key() + "&BedType=1&uId=" + uId, function (allData) {
                            //console.log(allData);
                            //console.log(ns);
                            var mappedRoomsAndBeds = $.map(allData, function (roomWBeds) { return new RoomAndBeds(roomWBeds) });
                            //console.log(ns.roomsAndBeds());
                            vm.roomsAndBeds(mappedRoomsAndBeds);
                            jsonRoomsAndBeds = vm.roomsAndBeds();

                            $('.nur_alerts').css('display', 'none');
                            $('#wbToolBar').css('display', 'none');
                        });

                        $.getJSON("BedManagementApiActions/Rooms/GetRoomsWRecoveryBedsWA?NS_id=" + vm.SelectedERNs().sys_key() + "&BedType=1&uId=" + uId, function (allData) {
                            //console.log(allData);
                            var mappedWaitingAreas = $.map(allData, function (roomWBeds) { return new RoomAndBeds(roomWBeds) });
                            vm.waitingAreas(mappedWaitingAreas);
                            //console.log(self.roomsAndBeds());
                            jsonWaitingAreas = vm.waitingAreas();

                            $('.nur_alerts').css('display', 'none');
                            $('#wbToolBar').css('display', 'none');
                        });
                    });

                    
                }
            },
            error: function (error) {
                //jsonValue = jQuery.parseJSON(error.responseText);
                console.log(error);
                console.log('An error has occurred while processing rule: ' + error.responseText);
            }
        });

    };

    
    self.RecoveryBedClickWA = function (bed, event) {
        //console.log('RecoveryBedClick');
        //console.log(bed);
        pId = bed.patient_id();
        var url = "BedManagementApiActions/Beds/ExecuteRule?KBId=28&ruleName=ME_WHITEBOARD_RB_RemovefromWA&stateVals=PatientId~" + bed.patient_id() + "|EpisodeKey~" + bed.episodekey() + "|BedId~" + bed.sys_key() + "|RoomId~" + bed.parent_key() + "|NsId~" + openedNS + "|UserId~" + uId + "|param~";

        console.log(url);

        $.getJSON("BedManagementApiActions/Beds/CheckExist?bedId=" + bed.sys_key(), function (allData) { });

        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            url: url,
            //data: JSON.stringify(jsonWp),
            success: function (data) {
                //console.log(data);
                //console.log('RecoveryBedClick Succeded');

                ruleResult = data;
                
                if (ruleResult != null && ruleResult.indexOf('@') >= 0) {
                    methodName = ruleResult.split('@')[0].split('^')[0];
                    userValue = ruleResult.split('@')[0].split('^')[1];
                    switch (methodName.toLowerCase()) {
                        case "getselection":
                            $("#framSelection").attr('src', './SelectionPage.aspx');
                            $('#diagSelection').modal('show');
                            break;
                        case "getinput":
                            break;
                        case "confirmationmsg":
                            break;
                        case "msg":
                            $("#spnMsg").text(userValue);
                            $('#diagMsg').modal('show');
                            break;
                        default:
                            methodName = "";
                            break;
                    }
                }
                else {
                    //console.log(ruleResult);

                    if (ruleResult != "") {
                        var spl = ruleResult.split('|')[ruleResult.split('|').length - 1];
                        $.ajax({
                            type: "POST",
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            url: "BedManagementApiActions/WaitingPatients/CallHL7?param=" + spl,
                            //data: JSON.stringify(jsonWp),
                            success: function (data) {
                            },
                            error: function (error) {
                                //jsonValue = jQuery.parseJSON(error.responseText);
                                console.log(error);
                                console.log('An error has occurred : ' + error.responseText);
                            }
                        });
                    }

                    methodName = "";
                    userValue = "";
                    $('#diagSelection').modal('hide');
                    $('#diagMsg').modal('hide');

                    $.getJSON("BedManagementApiActions/Nursestations/GetRBNurseStations?" + "&uId=" + uId, function (allData) {
                        var mappedNursestations = $.map(allData, function (Ns) { return new Nursestation(Ns) });
                        vm.nursestations(mappedNursestations);

                        ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                            if (ns.sys_key() == openedNS) {
                                vm.SelectedERNs(ns);
                                vm.SelectedNs(ns);

                                //ns.occupiedPat(Ns.occupiedPat);
                                //ns.occupiedMale(Ns.occupiedMale);
                                //ns.occupiedFemale(Ns.occupiedFemale);
                                //ns.PatAdmission(Ns.PatAdmission);
                                //ns.PatDischarge(Ns.PatDischarge);
                                //ns.DAMA(Ns.DAMA);
                                //ns.OutOnPass(Ns.OutOnPass);
                                //ns.pendingDis(Ns.pendingDis);
                                //ns.T_in(Ns.T_in);
                                //ns.T_Out(Ns.T_Out);
                                //ns.emptyBeds(Ns.emptyBeds);
                                //ns.blockedBeds(Ns.blockedBeds);
                                //ns.reservedBeds(Ns.reservedBeds);
                            }
                        });

                        $.getJSON("BedManagementApiActions/Rooms/GetRoomsWRecoveryBeds?NS_id=" + vm.SelectedERNs().sys_key() + "&BedType=1&uId=" + uId, function (allData) {
                            //console.log(allData);
                            //console.log(ns);
                            var mappedRoomsAndBeds = $.map(allData, function (roomWBeds) { return new RoomAndBeds(roomWBeds) });
                            //console.log(ns.roomsAndBeds());
                            vm.roomsAndBeds(mappedRoomsAndBeds);
                            jsonRoomsAndBeds = vm.roomsAndBeds();

                            $('.nur_alerts').css('display', 'none');
                            $('#wbToolBar').css('display', 'none');
                        });

                        $.getJSON("BedManagementApiActions/Rooms/GetRoomsWRecoveryBedsWA?NS_id=" + vm.SelectedERNs().sys_key() + "&BedType=1&uId=" + uId, function (allData) {
                            //console.log(allData);
                            var mappedWaitingAreas = $.map(allData, function (roomWBeds) { return new RoomAndBeds(roomWBeds) });
                            vm.waitingAreas(mappedWaitingAreas);
                            //console.log(self.roomsAndBeds());
                            jsonWaitingAreas = vm.waitingAreas();

                            $('.nur_alerts').css('display', 'none');
                            $('#wbToolBar').css('display', 'none');
                        });
                    });


                }
            },
            error: function (error) {
                //jsonValue = jQuery.parseJSON(error.responseText);
                console.log(error);
                console.log('An error has occurred while processing rule: ' + error.responseText);
            }
        });

    };
}


function UpdateFromDialog(result) {
    //console.log('UpdateFromDialog');
    //console.log(result);

    if ($('#diagSelection').is(':visible'))
        $('#diagSelection').modal('hide');

    if ($('#diagMsg').is(':visible'))
        $('#diagMsg').modal('hide');

    //console.log('hide');

    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "BedManagementApiActions/Beds/ContinueRule",
        //data: JSON.stringify(jsonWp),
        success: function (data) {
            //console.log(data);
            //console.log('UpdateFromDialog Succeded');

            ruleResult = data;
            
            if (ruleResult != null && ruleResult.indexOf('@') >= 0) {
                methodName = ruleResult.split('@')[0].split('^')[0];
                userValue = ruleResult.split('@')[0].split('^')[1];
                switch (methodName.toLowerCase()) {
                    case "getselection":
                        $("#framSelection").attr('src', './SelectionPage.aspx');
                        $('#diagSelection').modal('show');
                        break;
                    case "getinput":
                        break;
                    case "confirmationmsg":
                        break;
                    case "msg":
                        $("#spnMsg").text(userValue);
                        $('#diagMsg').modal('show');
                        break;
                    default:
                        methodName = "";
                        break;
                }
                //console.log('show');
            }
            else {
                methodName = "";
                userValue = "";

                //console.log(ruleResult);
                if (ruleResult != "")
                {
                    var spl = ruleResult.split('|')[ruleResult.split('|').length - 1];
                    if (spl.indexOf("~") >= 0)
                    {
                        console.log(spl);
                        if (spl.split('~')[0] == "trans") {
                            if (spl.split('~')[1] == "1")
                            {
                                $.getJSON("BedManagementApiActions/WaitingPatients/GetOPTOrderEpisode?" + "&pId=" + pId, function (allData) {

                                    var ek = allData;
                                    var emrUrl = ip + "site-medicaweb/emr.aspx|FreeEMRCaller.exe|" + pId + "," + ek + "," + uId + ",0,0,0";
                                    //url = ip + "site-medicaweb/AdmissionRequest.aspx";

                                    console.log(emrUrl);

                                    window.location.href = emrUrl;
                                });
                            }
                        }
                        else
                        {
                            $.ajax({
                                type: "POST",
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                url: "BedManagementApiActions/WaitingPatients/CallHL7?param=" + spl,
                                //data: JSON.stringify(jsonWp),
                                success: function (data) {
                                },
                                error: function (error) {
                                    //jsonValue = jQuery.parseJSON(error.responseText);
                                    console.log(error);
                                    console.log('An error has occurred : ' + error.responseText);
                                }
                            });
                        }
                    }
                    
                }


                if ($('#diagSelection').is(':visible'))
                    $('#diagSelection').modal('hide');

                if ($('#diagMsg').is(':visible'))
                    $('#diagMsg').modal('hide');

                $.getJSON("BedManagementApiActions/Nursestations/GetRBNurseStations?" + "&uId=" + uId, function (allData) {
                    var mappedNursestations = $.map(allData, function (Ns) { return new Nursestation(Ns) });
                    vm.nursestations(mappedNursestations);

                    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                        if (ns.sys_key() == openedNS) {
                            vm.SelectedERNs(ns);
                            vm.SelectedNs(ns);

                            //ns.occupiedPat(ns.occupiedPat);
                            //ns.occupiedMale(ns.occupiedMale);
                            //ns.occupiedFemale(ns.occupiedFemale);
                            //ns.PatAdmission(ns.PatAdmission);
                            //ns.PatDischarge(ns.PatDischarge);
                            //ns.DAMA(ns.DAMA);
                            //ns.OutOnPass(ns.OutOnPass);
                            //ns.pendingDis(ns.pendingDis);
                            //ns.T_in(ns.T_in);
                            //ns.T_Out(ns.T_Out);
                            //ns.emptyBeds(ns.emptyBeds);
                            //ns.blockedBeds(ns.blockedBeds);
                            //ns.reservedBeds(ns.reservedBeds);
                        }
                    });

                    $.getJSON("BedManagementApiActions/Rooms/GetRoomsWRecoveryBeds?NS_id=" + openedNS + "&BedType=1&uId=" + uId, function (allData) {
                        //console.log(allData);
                        //console.log(ns);
                        var mappedRoomsAndBeds = $.map(allData, function (roomWBeds) { return new RoomAndBeds(roomWBeds) });
                        //console.log(ns.roomsAndBeds());
                        vm.roomsAndBeds(mappedRoomsAndBeds);
                        jsonRoomsAndBeds = vm.roomsAndBeds();

                        $('.nur_alerts').css('display', 'none');
                        $('#wbToolBar').css('display', 'none');
                    });

                    $.getJSON("BedManagementApiActions/Rooms/GetRoomsWRecoveryBedsWA?NS_id=" + openedNS + "&BedType=1&uId=" + uId, function (allData) {
                        //console.log(allData);
                        var mappedWaitingAreas = $.map(allData, function (roomWBeds) { return new RoomAndBeds(roomWBeds) });
                        vm.waitingAreas(mappedWaitingAreas);
                        //console.log(self.roomsAndBeds());
                        jsonWaitingAreas = vm.waitingAreas();

                        $('.nur_alerts').css('display', 'none');
                        $('#wbToolBar').css('display', 'none');
                    });

                });
                //console.log('hide');
            }

            //$("#framRules").css('src','selectionform.aspx');

            //var jsonRules = [{ Key: '1', Name: 'Name 1' }, { Key: '2', Name: 'Name 2' }];
            //$("#RulesList tbody").empty();
            //$.each(jsonRules, function (indexR, valueR) {
            //    //console.log(jsonErDoctors[indexR]);
            //    $("#RulesList tbody").append("<tr data-dismiss='modal' style='cursor:pointer;' Key='" + jsonRules[indexR].Key + "' Name='" + jsonRules[indexR].Name + "' onclick='selectFromRWList(this,\"" + jsonRules[indexR].Key + "," + jsonRules[indexR].Name + "\");'>" + "<td>" + jsonRules[indexR].Name + "</td>" + "</tr>");
            //})

        },
        error: function (error) {
            //jsonValue = jQuery.parseJSON(error.responseText);
            console.log(error);
            console.log('An error has occurred while processing rule: ' + error.responseText);
        }
    });
}

function CloseSelectionDialog()
{
    //console.log('CloseSelectionDialog');
    if ($('#diagSelection').is(':visible'))
        $('#diagSelection').modal('hide');
}

var BedAlerts = function(BedAlert) {
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
    vm.templateToUse = function (item) { return this.selectedView(); }.bind(vm);
    vm.templateToUse2 = function (item) { return this.nsView(); }.bind(vm);
    ko.applyBindings(vm);
    //$("#radio-jquery-ui").buttonset();

    $('#wbToolBar').css('display', 'inline');
    $('#wbView').css('display', 'block');

    $("#bedSize").slider({
        range: "max",
        min: 1,
        max: 10,
        value: 4,
        slide: function (event, ui) {
            $("#bedSizeAmount").val(ui.value);
        }
    });

    $("#bedSizeAmount").val($("#bedSize").slider("value"));

    $("#bedSizeAmount").keyup(function () {
        $("#bedSize").slider("value", $(this).val())
    });

    $('#connBtnWb').css('display', 'none');
    

});

function selectFromRWList(elm, arg) {
    
};




