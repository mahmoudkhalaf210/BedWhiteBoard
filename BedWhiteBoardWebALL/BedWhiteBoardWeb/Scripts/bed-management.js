
var jsonRoomsAndBeds;
var isInitialReceivCalled = false;
var openedNS;
var vm;
var currDate = new Date();

var ip;
var chat;

$.getJSON("BedManagementApiActions/Nursestations/GetIP", function (allData) {
    ip = allData;
    //console.log(ip);

    //$(function myfunction() {
    //    //$.getScript("Scripts/jScript171.js").done(function () {
    //    //console.log(ip + 'DuplexCaller/NetDuplex');
    //    var connection = jQuery.hubConnection(ip + 'DuplexCaller/NetDuplex', { useDefaultPath: false });
    //    chat = connection.createHubProxy('NetDuplex');
    //    connection.logging = true;

    //    chat.on('InitialReceiveCompleted', function (e) {
    //        console.log('Initial receive Completed');
    //        //console.log(e);
    //        //console.log('MessageHeader: ' + e.Message.MessageHeader + '           MessageBody: ' + e.MessageBody + '.   OnInitialreceiveCompleted');

    //        //ko.utils.arrayForEach(vm.nursestations(), function (ns) {
    //        //    console.log('NS: ' + openedNS);
    //        //    console.log("NS length: " + ns.roomsAndBeds().length);
    //        //});

    //        $.each(e, function (indexR, valueR) {
    //            //console.log(e[indexR]);
    //            console.log(e[indexR].MessageHeader);
    //            //console.log(e[indexR].MessageBody);


    //            if (e[indexR].MessageHeader.toUpperCase() == "WB ALERTS") {
    //                //console.log(e[indexR].MessageBody);
    //                var jsonBedsAlerts = e[indexR].MessageBody;
    //                //console.log(jsonBedsAlerts);
    //                var objBedsAlerts = JSON.parse(jsonBedsAlerts);

    //                //ko.utils.arrayForEach(vm.nursestations(), function (ns) {
    //                    //console.log('NS: ' + openedNS);
    //                    //console.log("NS length: " + ns.roomsAndBeds().length);
    //                    //if (ns.sys_key() == openedNS) {
    //                        //console.log('Rooms and Beds Lenght: ' + ns.roomsAndBeds().length);
    //                        //console.log(ns.roomsAndBeds());
    //                        ko.utils.arrayForEach(vm.roomsAndBeds(), function (room) {
    //                            //console.log('Room Key: ' + room.room_key());
    //                            ko.utils.arrayForEach(room.beds(), function (bed) {
    //                                //console.log('Bed Key: ' + bed.sys_key());
    //                                //console.log('Patient_Id: ' + bed.patient_id());

    //                                //console.log(objBedsAlerts);
    //                                if ($.isEmptyObject(objBedsAlerts) == false) {
    //                                    $.each(objBedsAlerts, function (indexR, valueR) {
    //                                        //console.log(objBedsAlerts[indexR]);
    //                                        var isUpper;
    //                                        if (objBedsAlerts[indexR].patient_id == undefined)
    //                                            isUpper = true;
    //                                        else
    //                                            isUpper = false;
                                           
    //                                        if (isUpper == false) {

    //                                            if (objBedsAlerts[indexR] != undefined) {
    //                                                //console.log(bed.latin_desc() + '  ||  ' + bed.patient_id() + ' || ' + objBedsAlerts[indexR].patient_id);
    //                                                if (bed.patient_id() == objBedsAlerts[indexR].patient_id) {
    //                                                    //console.log(objBedsAlerts[indexR].patient_id);
    //                                                    //console.log(objBedsAlerts[indexR].tooltip);
    //                                                    if (objBedsAlerts[indexR].add_or_remove == "Add") {
    //                                                        //console.log(objBedsAlerts[indexR].patient_id);
    //                                                        //console.log(objBedsAlerts[indexR].tooltip);
    //                                                        var alertExist = false;
    //                                                        ko.utils.arrayForEach(bed.bedAlerts(), function (alertBed) {
    //                                                            //console.log(alertBed.alert_name().toLowerCase().trim() + '         ' + alertBed.tooltip() + '======' + objBedsAlerts[indexR].alert_name.toLowerCase().trim() + '         ' + objBedsAlerts[indexR].tooltip);
    //                                                            if (alertBed.alert_name().toLowerCase().trim() == objBedsAlerts[indexR].alert_name.toLowerCase().trim()) {

    //                                                                var tooltips = alertBed.tooltip().toLowerCase().split('\n');

    //                                                                var tooltipExists = false;
    //                                                                for (i = 0; i < tooltips.length; i++) {
    //                                                                    //console.log(tooltips[i].toLowerCase() + '      ' + objBedsAlerts[indexR].tooltip.toLowerCase());
    //                                                                    if (tooltips[i].toLowerCase() == objBedsAlerts[indexR].tooltip.toLowerCase()) {
    //                                                                        tooltipExists = true;
    //                                                                        break;
    //                                                                    }
    //                                                                }

    //                                                                if (tooltipExists == false)
    //                                                                    alertBed.tooltip(alertBed.tooltip() + '\n' + objBedsAlerts[indexR].tooltip);

    //                                                                alertExist = true;
    //                                                            }
    //                                                        });

    //                                                        if (alertExist == false)
    //                                                            bed.bedAlerts.push(new BedAlerts(objBedsAlerts[indexR]));

    //                                                    }
    //                                                    else {
    //                                                        if (alertBed.alert_name().toLowerCase() == objBedsAlerts[indexR].alert_name.toLowerCase()) {
    //                                                            bed.bedAlerts.remove(alertBed);
    //                                                        }
    //                                                    }
    //                                                }
    //                                                //console.log(bed.bedAlerts());
    //                                            }
    //                                        }
    //                                        else {
    //                                            if (objBedsAlerts[indexR] != undefined) {
    //                                                //console.log(bed.latin_desc() + '  ||  ' + bed.patient_id() + ' || ' + objBedsAlerts[indexR].PATIENT_ID);
    //                                                if (bed.patient_id() == objBedsAlerts[indexR].PATIENT_ID) {
    //                                                    //console.log(objBedsAlerts[indexR].PATIENT_ID);
    //                                                    //console.log(objBedsAlerts[indexR].TOOLTIP);
    //                                                    if (objBedsAlerts[indexR].ADD_OR_REMOVE == "Add") {
    //                                                        //console.log(objBedsAlerts[indexR].PATIENT_ID);
    //                                                        //console.log(objBedsAlerts[indexR].TOOLTIP);
    //                                                        var alertExist = false;
    //                                                        ko.utils.arrayForEach(bed.bedAlerts(), function (alertBed) {
    //                                                            //console.log(alertBed.alert_name().toLowerCase().trim() + '         ' + alertBed.tooltip() + '======' + objBedsAlerts[indexR].alert_name.toLowerCase().trim() + '         ' + objBedsAlerts[indexR].tooltip);
    //                                                            if (alertBed.alert_name().toLowerCase().trim() == objBedsAlerts[indexR].ALERT_NAME.toLowerCase().trim()) {

    //                                                                var tooltips = alertBed.tooltip().toLowerCase().split('\n');

    //                                                                var tooltipExists = false;
    //                                                                for (i = 0; i < tooltips.length; i++) {
    //                                                                    //console.log(tooltips[i].toLowerCase() + '      ' + objBedsAlerts[indexR].tooltip.toLowerCase());
    //                                                                    if (tooltips[i].toLowerCase() == objBedsAlerts[indexR].TOOLTIP.toLowerCase()) {
    //                                                                        tooltipExists = true;
    //                                                                        break;
    //                                                                    }
    //                                                                }

    //                                                                if (tooltipExists == false)
    //                                                                    alertBed.tooltip(alertBed.tooltip() + '\n' + objBedsAlerts[indexR].TOOLTIP);

    //                                                                alertExist = true;
    //                                                            }
    //                                                        });

    //                                                        if (alertExist == false)
    //                                                            bed.bedAlerts.push(new BedAlerts(objBedsAlerts[indexR]));

    //                                                    }
    //                                                    else {
    //                                                        if (alertBed.alert_name().toLowerCase() == objBedsAlerts[indexR].ALERT_NAME.toLowerCase()) {
    //                                                            bed.bedAlerts.remove(alertBed);
    //                                                        }
    //                                                    }
    //                                                }
    //                                                //console.log(bed.bedAlerts());
    //                                            }
    //                                        }

    //                                    });
    //                                }

    //                            });
    //                        });
    //                    //}
    //                //});

    //            }


    //        });
    //    });

    //    chat.on('receivingCompleted', function (e) {
    //        //console.log(e);
    //        //alert('MessageHeader: ' + e.MessageHeader + '           MessageBody: ' + e.MessageBody + '.   OnReceivingCompleted');

    //        if (e.MessageHeader.toUpperCase() == "WB ALERTS") {
    //            //alert('start');
    //            var jsonBedsAlerts = e.MessageBody;
    //            //var jsonBedsAlerts = '[{"patient_Id":600000400,"alert_name":"High Temprature","alert_type":"bed","toolTip":"High Temprature (40) Degree","icon":"bwb_hightemp.gif","color":"red"},{"patient_Id":600000725,"alert_name":"High Temprature","alert_type":"bed","toolTip":"High Temprature (40) Degree","icon":"bwb_hightemp.gif","color":"red"},{"patient_Id":600000508,"alert_name":"Systolic Blood Pressure","alert_type":"bed","toolTip":"High Blood Pressure (190/110)","icon":"bwb_highbp.gif","color":"yellow"}]';
    //            var objBedsAlerts = JSON.parse(jsonBedsAlerts);

    //            var jsonBedsAlerts = e.MessageBody;
    //            //console.log(jsonBedsAlerts);
    //            var objBedsAlerts = JSON.parse(jsonBedsAlerts);

    //            //ko.utils.arrayForEach(vm.nursestations(), function (ns) {
    //            //    if (ns.sys_key() == openedNS) {
    //            //        //console.log(ns.roomsAndBeds().length);
    //                    ko.utils.arrayForEach(vm.roomsAndBeds(), function (room) {
    //                        //console.log(room.room_key());
    //                        ko.utils.arrayForEach(room.beds(), function (bed) {
    //                            //console.log(bed.sys_key());
    //                            //console.log(bed.patient_id());

    //                            //console.log(objBedsAlerts);
    //                            if ($.isEmptyObject(objBedsAlerts) == false) {
    //                                $.each(objBedsAlerts, function (indexR, valueR) {
    //                                    //console.log(objBedsAlerts[indexR]);
    //                                    var isUpper;
    //                                    if (objBedsAlerts[indexR].patient_id == undefined)
    //                                        isUpper = true;
    //                                    else
    //                                        isUpper = false;

    //                                    if (isUpper == false) {

    //                                        if (objBedsAlerts[indexR] != undefined) {
    //                                            //console.log(bed.latin_desc() + '  ||  ' + bed.patient_id() + ' || ' + objBedsAlerts[indexR].patient_id);
    //                                            if (bed.patient_id() == objBedsAlerts[indexR].patient_id) {
    //                                                //console.log(objBedsAlerts[indexR].patient_id);
    //                                                //console.log(objBedsAlerts[indexR].tooltip);
    //                                                if (objBedsAlerts[indexR].add_or_remove == "Add") {
    //                                                    //console.log(objBedsAlerts[indexR].patient_id);
    //                                                    //console.log(objBedsAlerts[indexR].tooltip);
    //                                                    var alertExist = false;
    //                                                    ko.utils.arrayForEach(bed.bedAlerts(), function (alertBed) {
    //                                                        //console.log(alertBed.alert_name().toLowerCase().trim() + '         ' + alertBed.tooltip() + '======' + objBedsAlerts[indexR].alert_name.toLowerCase().trim() + '         ' + objBedsAlerts[indexR].tooltip);
    //                                                        if (alertBed.alert_name().toLowerCase().trim() == objBedsAlerts[indexR].alert_name.toLowerCase().trim()) {

    //                                                            var tooltips = alertBed.tooltip().toLowerCase().split('\n');

    //                                                            var tooltipExists = false;
    //                                                            for (i = 0; i < tooltips.length; i++) {
    //                                                                //console.log(tooltips[i].toLowerCase() + '      ' + objBedsAlerts[indexR].tooltip.toLowerCase());
    //                                                                if (tooltips[i].toLowerCase() == objBedsAlerts[indexR].tooltip.toLowerCase()) {
    //                                                                    tooltipExists = true;
    //                                                                    break;
    //                                                                }
    //                                                            }

    //                                                            if (tooltipExists == false)
    //                                                                alertBed.tooltip(alertBed.tooltip() + '\n' + objBedsAlerts[indexR].tooltip);

    //                                                            alertExist = true;
    //                                                        }
    //                                                    });

    //                                                    if (alertExist == false)
    //                                                        bed.bedAlerts.push(new BedAlerts(objBedsAlerts[indexR]));

    //                                                }
    //                                                else {
    //                                                    if (alertBed.alert_name().toLowerCase() == objBedsAlerts[indexR].alert_name.toLowerCase()) {
    //                                                        bed.bedAlerts.remove(alertBed);
    //                                                    }
    //                                                }
    //                                            }
    //                                            //console.log(bed.bedAlerts());
    //                                        }
    //                                    }
    //                                    else {
    //                                        if (objBedsAlerts[indexR] != undefined) {
    //                                            //console.log(bed.latin_desc() + '  ||  ' + bed.patient_id() + ' || ' + objBedsAlerts[indexR].PATIENT_ID);
    //                                            if (bed.patient_id() == objBedsAlerts[indexR].PATIENT_ID) {
    //                                                //console.log(objBedsAlerts[indexR].PATIENT_ID);
    //                                                //console.log(objBedsAlerts[indexR].TOOLTIP);
    //                                                if (objBedsAlerts[indexR].ADD_OR_REMOVE == "Add") {
    //                                                    //console.log(objBedsAlerts[indexR].PATIENT_ID);
    //                                                    //console.log(objBedsAlerts[indexR].TOOLTIP);
    //                                                    var alertExist = false;
    //                                                    ko.utils.arrayForEach(bed.bedAlerts(), function (alertBed) {
    //                                                        //console.log(alertBed.alert_name().toLowerCase().trim() + '         ' + alertBed.tooltip() + '======' + objBedsAlerts[indexR].alert_name.toLowerCase().trim() + '         ' + objBedsAlerts[indexR].tooltip);
    //                                                        if (alertBed.alert_name().toLowerCase().trim() == objBedsAlerts[indexR].ALERT_NAME.toLowerCase().trim()) {

    //                                                            var tooltips = alertBed.tooltip().toLowerCase().split('\n');

    //                                                            var tooltipExists = false;
    //                                                            for (i = 0; i < tooltips.length; i++) {
    //                                                                //console.log(tooltips[i].toLowerCase() + '      ' + objBedsAlerts[indexR].tooltip.toLowerCase());
    //                                                                if (tooltips[i].toLowerCase() == objBedsAlerts[indexR].TOOLTIP.toLowerCase()) {
    //                                                                    tooltipExists = true;
    //                                                                    break;
    //                                                                }
    //                                                            }

    //                                                            if (tooltipExists == false)
    //                                                                alertBed.tooltip(alertBed.tooltip() + '\n' + objBedsAlerts[indexR].TOOLTIP);

    //                                                            alertExist = true;
    //                                                        }
    //                                                    });

    //                                                    if (alertExist == false)
    //                                                        bed.bedAlerts.push(new BedAlerts(objBedsAlerts[indexR]));

    //                                                }
    //                                                else {
    //                                                    if (alertBed.alert_name().toLowerCase() == objBedsAlerts[indexR].ALERT_NAME.toLowerCase()) {
    //                                                        bed.bedAlerts.remove(alertBed);
    //                                                    }
    //                                                }
    //                                            }
    //                                            //console.log(bed.bedAlerts());
    //                                        }
    //                                    }

    //                                });
    //                            }

    //                        });
    //                    });
    //            //    }
    //            //});


    //        }
    //        else {

    //        }

    //    });

    //    connection.start(function myfunction() {
    //        //alert('Connected');
    //        $('#connBtnWb').text('Connected');
    //        $('#connBtnWb').attr('class', 'ConnectedBtn');
    //        chat.invoke('signIn', uId, 'WhiteBoard', 'WhiteBoard');
    //    });

    //});

});

var NursestationViewModel = function () {
    var self = this;

    self.wbType = ko.observable(wbType);
    
    self.triageLevels = ko.observableArray([]);

    self.nursestations = ko.observableArray([]);
    self.roomsAndBeds = ko.observableArray([]);
    self.waitingPatients = ko.observableArray([]);
    
    $.getJSON("BedManagementApiActions/Nursestations/GetAllNurseStationsWithAlerts?startDate=" + currDate.toLocaleDateString() + "&NsType=" + 1 + "&uId=" + uId + "&hospId=" + hospitalid, function (allData) {
            var mappedNursestations = $.map(allData, function (Ns) { return new Nursestation(Ns) });
            self.nursestations(mappedNursestations);
            
        });

    self.SelectedNs = ko.observable();
    self.SelectedERNs = ko.observable();

    self.selectedView = ko.observable("roomsAndBedsTmpl2");

    self.nsView = ko.observable("nsTmpl3");

    //this.toggle = function () {
    //    this.template(this.template() === "roomsAndBedsTmpl" ? "roomsAndBedsTmpl2" : "roomsAndBedsTmpl");
    //};
    
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
                $('#nsImage' ).animate({ opacity: 1.0, marginLeft: '0px', marginRight: '0px' }, 500);
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
            $('#zoomLevel').css('display', 'inline');
            $('#toolBar').css('display', 'inline');
            $('#bedSizeBar').css('display', 'none');

            $('#btnEdit').css('display', 'inline');
            $('#btnSave').css('display', 'none');
            $('#btnCancel').css('display', 'none');
            $('#uploadBackImg').css('display', 'none');

            $('div[id*="rotateArrows"]').css('display', 'none');

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
            });

            $('#layoutStyle').css('display', 'inline');
            $('#zoomLevel').css('display', 'inline');
            $('#toolBar').css('display', 'inline');
            $('#bedSizeBar').css('display', 'none');

            $('#btnEdit').css('display', 'inline');
            $('#btnSave').css('display', 'none');
            $('#btnCancel').css('display', 'none');
            $('#uploadBackImg').css('display', 'none');

            $('div[id*="rotateArrows"]').css('display', 'none');

        }

        // $.getJSON("BedManagementApiActions/Rooms/GetRoomsWBedsWStatus?NS_id=" + Ns.sys_key() + "&startDate=" + currDate.toLocaleDateString() + "&BedType=1&uId=" + uId, function (allData) {
        //var mappedRoomsAndBeds = $.map(alldata, function (roomWBeds) { return new RoomAndBeds(roomWBeds) });
        //self.roomsAndBeds(mappedRoomsAndBeds);
        self.roomsAndBeds(Ns.roomsAndBeds());
        jsonRoomsAndBeds = self.roomsAndBeds();
        //$('div#wbroomsAndBeds div.roomTabular table tbody tr td div[data-bind="foreach: beds"] div.bedTabular table thead').first().css("visibility", "visible");
        $('div#wbroomsAndBeds div.roomTabular table tbody tr td div[data-bind="foreach: beds"] div.bedTabular table thead').first().addClass("first_th");
        //$('div#wbroomsAndBeds div.roomTabular').first().css("padding-top", "30px");
        $('div#wbroomsAndBeds div.roomTabular div.div_hight').first().css("display", "block");
        $('div[data-bind="foreach: beds"] div.bedTabular table').first().css("margin-top", "-30px");

        //if (!isInitialReceivCalled) {
        //chat.invoke('GetInitialReceive', uId, "WhiteBoard | and Category = 'WB Alerts'");
        //    isInitialReceivCalled = true;
        //}

        // });

        //$.getJSON("BedManagementApiActions/WaitingPatients/Get?NS_id=" + Ns.sys_key(), function (allData) {
        //    var mappedWaitingPatients = $.map(allData, function (wPatient) { return new WaitingPatients(wPatient) });
        //    self.waitingPatients(mappedWaitingPatients);
        //});

        //setTimeout(function () {
            if (zoomValue == "zooom") {
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

            }
            else if (zoomValue == "zoom") {
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
            }
            else if (zoomValue == "zom") {
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

            }

       // }, 3000);

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
        $('#zoomLevel').css('display', 'none');
        $('#toolBar').css('display', 'none');
        $('#bedSizeBar').css('display', 'none');

        $('#btnEdit').css('display', 'inline');
        $('#btnSave').css('display', 'none');
        $('#btnCancel').css('display', 'none');
        $('#uploadBackImg').css('display', 'none');

        $('div[id*="rotateArrows"]').css('display', 'none');
    };

    self.RefreshAlerts = function () {

        $.ajax({
            timeout: 30000,
            url: "BedManagementApiActions/WaitingPatients/GetInitialReceive?CategoryName=WB ALERTS",
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
                                                ko.utils.arrayForEach(bed.bedAlerts(), function (alertBed) {
                                                    if (alertBed.alert_name().toLowerCase() == objBedsAlerts[indexR].alert_name.toLowerCase()) {
                                                        bed.bedAlerts.remove(alertBed);
                                                    }
                                                });
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
    self.alerts = ko.observableArray($.map(Ns.alerts, function (NsAlert) { return new NsAlerts(NsAlert) }));
    self.sortedWaitingPatients = ko.observableArray([]);
    self.roomsAndBeds = ko.observableArray($.map(Ns.rooms, function (roomWBeds) { return new RoomAndBeds(roomWBeds) }));
    self.erDoctors = ko.observableArray([]);
    self.waitingPatients = ko.observableArray([]);
    self.erNsAlerts = ko.observableArray([]);

    self.currentNS = ko.observable();


    self.collapseNS = function (header, event) {
    };

    self.collapseAllNS = function (Ns, event) {
    };

    self.chartWPOptions = {};
    self.chartTrtOptions = {};
    self.chartBedOptions = {};
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
   
    self.resizeDrag = function (room, event) {
        $('#roomId' + room.room_key()).resizable();
        $('#roomId' + room.room_key()).draggable();
    };

    //var degreeR = roomWBeds.rotation;
    //$('#degreeR' + self.room_key()).text(self.rotation());
    self.rotateRightClick = function (room, event) {
        self.rotation(parseInt(self.rotation()) + 5);

        $('#roomId' + room.room_key()).css({
            '-moz-transform': 'rotate(' + self.rotation() + 'deg)',
            '-webkit-transform': 'rotate(' + self.rotation() + 'deg)',
            '-o-transform': 'rotate(' + self.rotation() + 'deg)',
            '-ms-transform': 'rotate(' + self.rotation() + 'deg)',
            'transform': 'rotate(' + self.rotation() + 'deg)'
        });
        //$('#degreeR' + room.room_key()).text(self.rotation());
    };

    self.rotateLeftClick = function (room, event) {
        self.rotation(parseInt(self.rotation()) - 5);

        $('#roomId' + room.room_key()).css({
            '-moz-transform': 'rotate(' + self.rotation() + 'deg)',
            '-webkit-transform': 'rotate(' + self.rotation() + 'deg)',
            '-o-transform': 'rotate(' + self.rotation() + 'deg)',
            '-ms-transform': 'rotate(' + self.rotation() + 'deg)',
            'transform': 'rotate(' + self.rotation() + 'deg)'
        });
        //$('#degreeR' + room.room_key()).text(self.rotation());
    };

    self.rotateDRightClick = function (room, event) {
        self.rotation(parseInt(self.rotation()) + 45);

        $('#roomId' + room.room_key()).css({
            '-moz-transform': 'rotate(' + self.rotation() + 'deg)',
            '-webkit-transform': 'rotate(' + self.rotation() + 'deg)',
            '-o-transform': 'rotate(' + self.rotation() + 'deg)',
            '-ms-transform': 'rotate(' + self.rotation() + 'deg)',
            'transform': 'rotate(' + self.rotation() + 'deg)'
        });
        //$('#degreeR' + room.room_key()).text(self.rotation());
    };

    self.rotateDLeftClick = function (room, event) {
        self.rotation(parseInt(self.rotation()) - 45);

        $('#roomId' + room.room_key()).css({
            '-moz-transform': 'rotate(' + self.rotation() + 'deg)',
            '-webkit-transform': 'rotate(' + self.rotation() + 'deg)',
            '-o-transform': 'rotate(' + self.rotation() + 'deg)',
            '-ms-transform': 'rotate(' + self.rotation() + 'deg)',
            'transform': 'rotate(' + self.rotation() + 'deg)'
        });
        //$('#degreeR' + room.room_key()).text(self.rotation());
    };

    self.CancelEdit = function () {
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
    if (roomBeds.patient_sex == 1) {
        self.sexClass = ko.observable('occupiedMale');
    }
    else if (roomBeds.patient_sex == 2) {
        self.sexClass = ko.observable('occupiedFemale');
    }
    else {
        self.sexClass = ko.observable('free');
    }
    self.bed_class = ko.observable(roomBeds.bed_class);
    self.patient_id = ko.observable(roomBeds.patient_id);
    self.patient_sex = ko.observable(roomBeds.patient_sex);
    self.patengname = ko.observable(GetPatientInitials(roomBeds.patengname));
    self.patlocname = ko.observable(GetPatientInitials(roomBeds.patlocname));
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

    self.rotateRightClickB = function (bed, event) {
        self.rotation(parseInt(self.rotation()) + 5);

        $('#bedId' + bed.sys_key()).css({
            '-moz-transform': 'rotate(' + self.rotation() + 'deg)',
            '-webkit-transform': 'rotate(' + self.rotation() + 'deg)',
            '-o-transform': 'rotate(' + self.rotation() + 'deg)',
            '-ms-transform': 'rotate(' + self.rotation() + 'deg)',
            'transform': 'rotate(' + self.rotation() + 'deg)'
        });
    };

    self.rotateLeftClickB = function (bed, event) {
        self.rotation(parseInt(self.rotation()) - 5);

        $('#bedId' + bed.sys_key()).css({
            '-moz-transform': 'rotate(' + self.rotation() + 'deg)',
            '-webkit-transform': 'rotate(' + self.rotation() + 'deg)',
            '-o-transform': 'rotate(' + self.rotation() + 'deg)',
            '-ms-transform': 'rotate(' + self.rotation() + 'deg)',
            'transform': 'rotate(' + self.rotation() + 'deg)'
        });
    };

    self.rotateDRightClickB = function (bed, event) {
        self.rotation(parseInt(self.rotation()) + 45);

        $('#bedId' + bed.sys_key()).css({
            '-moz-transform': 'rotate(' + self.rotation() + 'deg)',
            '-webkit-transform': 'rotate(' + self.rotation() + 'deg)',
            '-o-transform': 'rotate(' + self.rotation() + 'deg)',
            '-ms-transform': 'rotate(' + self.rotation() + 'deg)',
            'transform': 'rotate(' + self.rotation() + 'deg)'
        });
    };

    self.rotateDLeftClickB = function (bed, event) {
        self.rotation(parseInt(self.rotation()) - 45);

        $('#bedId' + bed.sys_key()).css({
            '-moz-transform': 'rotate(' + self.rotation() + 'deg)',
            '-webkit-transform': 'rotate(' + self.rotation() + 'deg)',
            '-o-transform': 'rotate(' + self.rotation() + 'deg)',
            '-ms-transform': 'rotate(' + self.rotation() + 'deg)',
            'transform': 'rotate(' + self.rotation() + 'deg)'
        });
    };
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

    setTimeout(function () {

        vm.RefreshAlerts();
        //$.getJSON("BedManagementApiActions/WaitingPatients/GetInitialReceive?CategoryName=WB ALERTS", );

    }, 5000);

    setInterval(function () {

        vm.RefreshAlerts();
        //$.getJSON("BedManagementApiActions/WaitingPatients/GetInitialReceive?CategoryName=WB ALERTS", );

    }, 30000);

    $('#uploadBackground').click(function () {
        var data = new FormData();
        var file = $('form input[type=file]')[0].files[0];
        data.append('file', file);
        $.ajax({
            url: 'BedManagementApiActions/File/Upload?nsCode=' + openedNS,
            processData: false,
            contentType: false,
            data: data,
            type: 'POST'
        }).done(function (result) {
            console.log(result);


            ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                //console.log('NS: ' + openedNS);
                //console.log("NS length: " + ns.roomsAndBeds().length);
                //console.log(file.name);
                if (ns.sys_key() == openedNS) {
                    $('#nsImage').attr('src','/images/' + file.name);
                    ns.ns_image('/images/' + file.name);
                    //console.log(ns.ns_image());
                }
            });

        }).fail(function (a, b, c) {
            console.log(a, b, c);
        });
    });

    $('.form-control.input-sm.nrb').change(function () {
        var txtValue = $('.form-control.input-sm.nrb').val();
        if (txtValue == "")
            $('#uploadBackground').attr('disabled', 'disabled');
        else
            $('#uploadBackground').removeAttr('disabled');
    });


});


function btnEdit_click() {
    $('#btnEdit').css('display', 'none');
    $('#btnSave').css('display', 'inline');
    $('#btnCancel').css('display', 'inline');
    $('#uploadBackImg').css('display', 'block');
    
    $('div[id*="rotateArrows"]').css('display', 'block');
    ResizeAllRooms();
}

function btnSave_click() {
    $('#btnEdit').css('display', 'inline');
    $('#btnSave').css('display', 'none');
    $('#btnCancel').css('display', 'none');
    $('#uploadBackImg').css('display', 'none');

    $('div[id*="rotateArrows"]').css('display', 'none');

    var jsonData = ko.toJSON(jsonRoomsAndBeds);
    var jsonRooms = JSON.parse(jsonData);
    //delete jsonRooms['room_name'];
    //delete jsonRooms['nursestationcode'];
    //delete jsonRooms['x'];
    //delete jsonRooms['y'];
    //delete jsonRooms['width'];
    //delete jsonRooms['height'];

    $.each(jsonRooms, function (indexR, valueR) {

        var elemet = $('#roomId' + jsonRooms[indexR].room_key);
        var left = elemet.css('left').replace('px', '');
        var top = elemet.css('top').replace('px', '');
        var width = elemet.css('width').replace('px', '');
        var height = elemet.css('height').replace('px', '');
        var degreeR = $('#degreeR' + jsonRooms[indexR].room_key).text();

        jsonRooms[indexR].location = (parseInt(left) - 5) + ',' + (parseInt(top) - 145);
        jsonRooms[indexR].size = (parseInt(width) + 15) + ',' + (parseInt(height) + 15);
        jsonRooms[indexR].rotation = degreeR;

        var jsonBeds = jsonRooms[indexR].beds;
        $.each(jsonBeds, function (indexB, valueB) {

            var elemet = $('#bedId' + jsonBeds[indexB].sys_key);
            var left = elemet.css('left').replace('px', '');
            var top = elemet.css('top').replace('px', '');
            var degreeB = $('#degreeB' + jsonBeds[indexB].sys_key).text();

            jsonBeds[indexB].location = (parseInt(left) - 5) + ',' + (parseInt(top) - 145);
            jsonBeds[indexB].rotation = degreeB;
        });

    });

    var jsonToSend = JSON.stringify(jsonRooms);
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        url: "BedManagementApiActions/Rooms/UpdateRoomsWBedsWStatus",
        data: JSON.stringify(jsonToSend),
        success: function (data) {
            console.log("Saved successfully");
            DevExpress.ui.notify("Saved successfully.", "success", 1500);
        },
        error: function (error) {
            jsonValue = jQuery.parseJSON(error.responseText);
            console.log('An error has occurred while saving: ' + jsonValue.Message);
        }
    });

    DisableResizeAllRooms();
}

function btnCancel_click() {
    $('#btnEdit').css('display', 'inline');
    $('#btnSave').css('display', 'none');
    $('#btnCancel').css('display', 'none');
    $('#uploadBackImg').css('display', 'none');

    $('div[id*="rotateArrows"]').css('display', 'none');

    var jsonData = ko.toJSON(jsonRoomsAndBeds);
    var jsonRooms = JSON.parse(jsonData);

    $.each(jsonRooms, function (indexR, valueR) {

        var leftR = (parseInt(jsonRooms[indexR].location.split(',')[0]) + 5) + 'px';
        var topR = (parseInt(jsonRooms[indexR].location.split(',')[1]) + 145) + 'px';
        var widthR = (parseInt(jsonRooms[indexR].size.split(',')[0]) - 15) + 'px';
        var heightR = (parseInt(jsonRooms[indexR].size.split(',')[1]) - 15) + 'px';
        var degreeR = jsonRooms[indexR].rotation + 'deg';

        var elemet = $('#roomId' + jsonRooms[indexR].room_key);
        elemet.css('left', leftR);
        elemet.css('top', topR);
        elemet.css('width', widthR);
        elemet.css('height', heightR);
        elemet.css('transform', 'rotate(' + degreeR + ')');
        elemet.css('-moz-transform', 'rotate(' + degreeR + ')');
        elemet.css('-webkit-transform', 'rotate(' + degreeR + ')');
        elemet.css('-o-transform', 'rotate(' + degreeR + ')');
        elemet.css('-ms-transform', 'rotate(' + degreeR + ')');
        $('#degreeR' + jsonRooms[indexR].room_key).text(jsonRooms[indexR].rotation);

        var jsonBeds = jsonRooms[indexR].beds;

        $.each(jsonBeds, function (indexB, valueB) {

            var leftB = (parseInt(jsonBeds[indexB].location.split(',')[0]) + 5) + 'px';
            var topB = (parseInt(jsonBeds[indexB].location.split(',')[1]) + 145) + 'px';
            var degreeB = jsonBeds[indexB].rotation + 'deg';

            var elemet = $('#bedId' + jsonBeds[indexB].sys_key);
            elemet.css('left', leftB);
            elemet.css('top', topB);
            elemet.css('transform', 'rotate(' + degreeB + ')');
            elemet.css('-moz-transform', 'rotate(' + degreeB + ')');
            elemet.css('-webkit-transform', 'rotate(' + degreeB + ')');
            elemet.css('-o-transform', 'rotate(' + degreeB + ')');
            elemet.css('-ms-transform', 'rotate(' + degreeB + ')');
            $('#degreeB' + jsonBeds[indexB].sys_key).text(jsonBeds[indexB].rotation);
        });

    });

    DisableResizeAllRooms();
}

function ResizeAllRooms() {
    $('div[id*="roomId"]').resizable();
    $('div[id*="roomId"]').draggable();

    $('div[id*="bedId"]').draggable();
}

function DisableResizeAllRooms() {
    try { $('div[id*="room"]').resizable("destroy") } catch (err) { };
    try { $('div[id*="room"]').draggable("destroy") } catch (err) { };

    try { $('div[id*="bedId"]').draggable("destroy") } catch (err) { };
}

function rdoGraphical_Changed() {
    //alert('rdoGraphical_Changed');
    vm.selectedView('roomsAndBedsTmpl');

    $('#toolBar').css('display', 'block');
    $('#bedSizeBar').css('display', 'none');
    $('#nsImage').css('display', 'block');

    //$('#bedsTitle').animate({ opacity: 0.0, marginLeft: '-100px', marginRight: '100px' }, 500);
    $('#bedsTitle').css('display', 'none');
    $('#bedsTitle').css('visibility', 'hidden');
}

function rdoTabular_Changed() {
    //alert('rdoTabular_Changed');

    vm.selectedView('roomsAndBedsTmpl2');

    $('#toolBar').css('display', 'none');
    $('#bedSizeBar').css('display', 'none');
    $('#nsImage').css('display', 'none');

    $('#bedsTitle').css('display', 'block');
    $('#bedsTitle').css('visibility', 'visible');


    $('#btnEdit').css('display', 'inline');
    $('#btnSave').css('display', 'none');
    $('#btnCancel').css('display', 'none');
    $('#uploadBackImg').css('display', 'none');

    $('div[id*="rotateArrows"]').css('display', 'none');

    //$('div#wbroomsAndBeds div.roomTabular table tbody tr td div[data-bind="foreach: beds"] div.bedTabular table thead').first().css("visibility", "visible");
    $('div#wbroomsAndBeds div.roomTabular table tbody tr td div[data-bind="foreach: beds"] div.bedTabular table thead').first().addClass("first_th");
    //$('div#wbroomsAndBeds div.roomTabular').first().css("padding-top", "30px");
    $('div#wbroomsAndBeds div.roomTabular div.div_hight').first().css("display", "block");
    $('div[data-bind="foreach: beds"] div.bedTabular table').first().css("margin-top", "-30px");
    //$('#bedsTitle').animate({ opacity: 1.0, marginLeft: '0px', marginRight: '0px' }, 500);

    if (zoomValue == "zooom") {
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

    }
    else if (zoomValue == "zoom") {
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
    }
    else if (zoomValue == "zom") {
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

    }
}

function GetPatientInitials(fullName) {
    var patName = "";
    try {
        var patEngName = fullName.replace(',', ' ').split(' ');
        if (patEngName.length > 0)
            patName += patEngName[0][0]+ ".";

        if (patEngName.length > 1)
            patName += patEngName[1][0] + ".";

        if (patEngName.length > 2)
            patName += patEngName[2][0] + ".";

        if (patEngName.length > 3)
            patName += patEngName[3][0]+ ".";

    } catch (err) { console.log(err); return fullName; }
    return patName;
}
