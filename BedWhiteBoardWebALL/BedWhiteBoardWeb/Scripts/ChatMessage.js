////Sent Meesage to All Current Module 
//ChatMessage('tomodule', 'Module id', 'your Message Format As you like,  you will recieve this message again');
////test --->ChatMessage('tomodule', GetCurrentModuleID(), 'your Message Format As you like');


////notification types (1,2,3,4) 

////1- alert-info 
////2- alert-warning 
////3- alert-danger 
////4- alert-success


////===============================================================================
////Send notification to specific  staff . 
//ChatMessage('tostaff', 'staffkey', 'Messages');
////test --->  ChatMessage('tostaff', 681, 'type~Title~Body');
////===============================================================================
////Send notification to list of   staffs . 
//ChatMessage('tostaffs', 'staffkey sperated by "," ', 'Messages');
////test ---> ChatMessage('tostaffs','681,1222,98777', 'type~Title~Body');
////===============================================================================
////Send notification to specific  specialty , this will send notification to all staff have this specialty in current hospital . 
//ChatMessage('tospec', 'SPECkey ', 'message');
//////test ---> ChatMessage('tospec',2, 'type~Title~Body'); 2 is specialty  Cardiology
////===============================================================================
////Send notification to specific  Degree_Key , this will send notification to all staff have this Degree in current hospital. 
//ChatMessage('todegreekey', 'Degree Key', 'message');
//////test ---> ChatMessage('todegreekey',3, 'type~Title~Body'); 3 is Degree  CONSULTANT
////===============================================================================
////Send notification to specific  staffFk , this will send notification to all staff have this Job description in current hospital . 
//ChatMessage('tostafffk', 'to  staffFk', 'message');
//////test ---> ChatMessage('tostafffk',5, 'type~Title~Body'); 3 is Job description  Radiology
////===============================================================================
////Send notification to All Staff in current hospital 
//ChatMessage('allstaff', '', 'message');
////test ---> ChatMessage('type~Title~Body'); 




//receive Messages
window.addEventListener('message', function (event) {


    if (event.origin != getdomainName()) {
        return;

        try {
            console.log(event.data, event); //module receive Messages here

            //var jsonWps = event.data.replace(/"([^"]+)":/g, function ($0, $1) { return ('"' + $1.toLowerCase() + '":'); });
            var jsonWps = event.data;
            var objWps = JSON.parse(jsonWps);

            //console.log(jsonWps);
            console.log(objWps);
            console.log("message header" + objWps.MessageHeader);


            //ChatMessage('tomodule', '3177', '[{"MessageHeader":"ER PATIENT ARRIVED", "MessageBody":[{episode_key:0,iswaitingarea:0,nstationcode:762,nusestationtype:2,pat_birthdate:"1984-06-11T00:00:00",patengname:"ERPATIENT57 ERPATIENT57 ERPATIENT57 ERPATIENT57",patient_id:371773,patient_sex:"1",patlocname:"ERPATIENT57 ERPATIENT57 ERPATIENT57 ERPATIENT57",skey:2061408,staff_id:"ER1",staff_key:623,staff_name:"ER1,                                               ",staff_type:0,start_date:"2017-06-11T00:00:00",start_time:"2017-06-11T13:24:31"}]}]');
            //{"MessageHeader":"ER PATIENT ARRIVED","MessageBody":{"episode_key":0,"iswaitingarea":0,"nstationcode":752,"pat_birthdate":"","patengname":"Patient Father Grandpa Family","patient_id":"100101","patient_sex":0,"patlocname":"Patient Father Grandpa Family","skey":2061455,"staff_id":"","staff_key":623,"staff_name":"","start_date":"","start_time":""}} 
            //{"MessageHeader":"ER PATIENT CANCELLED","MessageBody":{"episode_key":0,"iswaitingarea":0,"nstationcode":752,"pat_birthdate":"","patengname":"Patient Father Grandpa Family","patient_id":"100101","patient_sex":0,"patlocname":"Patient Father Grandpa Family","skey":2061455,"staff_id":"","staff_key":623,"staff_name":"","start_date":"","start_time":""}} 
            //console.log('MessageHeader: ' + objWps.MessageHeader);

            if (objWps.MessageHeader.toUpperCase() == "ER PATIENT ARRIVED") {
                if ($.isEmptyObject(objWps.MessageBody) == false) {
                    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                        ko.utils.arrayForEach(ns.waitingPatients(), function (Wp) {
                            //$.each(objWps, function (indexR, valueR) {
                            if (Wp != undefined) {
                                if (Wp.patient_id() == objWps.MessageBody.patient_id) {
                                    ns.waitingPatients.remove(Wp);
                                }
                            }
                            //});
                        });
                    });

                    try {
                        var exist = false;
                        ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                            ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                                //$.each(objWps, function (indexR, valueR) {
                                ko.utils.arrayForEach(room.allBeds(), function (bed) {
                                    if (bed != undefined) {
                                        if (bed.patient_id() == objWps.MessageBody.patient_id) {
                                            exist = true;
                                        }
                                    }
                                });
                                //});
                            });
                        });
                    }
                    catch (err) { }

                    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                        //$.each(objWps, function (indexR, valueR) {
                        //console.log(objWps.MessageBody);
                        //console.log(ns.sys_key() + "              " + objWps.MessageBody.nstationcode);
                        if (ns.clinic_code() == objWps.MessageBody.nstationcode && exist == false) {
                            objWps.MessageBody.nstationcode = ns.sys_key();
                            ns.waitingPatients.push(new WaitingPatient(objWps.MessageBody));
                        }
                        // });
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
            else if (objWps.MessageHeader.toUpperCase() == "ER PATIENT CANCELLED") {

                if ($.isEmptyObject(objWps.MessageBody) == false) {
                    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                        ko.utils.arrayForEach(ns.waitingPatients(), function (Wp) {
                            //$.each(objWps, function (indexR, valueR) {
                            if (Wp != undefined) {
                                //console.log(Wp.patient_id() + "   Before     " + objWps.MessageBody.patient_id);
                                if (Wp.patient_id() == objWps.MessageBody.patient_id) {
                                    console.log(ns.waitingPatients());
                                    ns.waitingPatients.remove(Wp);
                                    console.log(ns.waitingPatients());
                                    console.log(Wp.patient_id() + "   After     " + objWps.MessageBody.patient_id);
                                }
                            }
                            //});
                        });
                    });
                }
            }
            else if (objWps.MessageHeader.toUpperCase() == "ER PATIENT DRAGED") {
                //console.log(e.MessageBody);
                //var jsonTrtms = e.MessageBody.replace(/"([^"]+)":/g, function ($0, $1) { return ('"' + $1.toLowerCase() + '":'); });
                //var objTrtms = JSON.parse(jsonTrtms);

                if ($.isEmptyObject(objWps.MessageBody) == false) {
                    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                        ko.utils.arrayForEach(ns.waitingPatients(), function (Wp) {
                            //$.each(objTrtms, function (indexR, valueR) {
                            if (Wp != undefined) {
                                //console.log(trtm);
                                if (Wp.patient_id() == objWps.MessageBody.patient_id) {
                                    ns.waitingPatients.remove(Wp);
                                }
                            }
                            //});
                        });
                        //ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                        //    ko.utils.arrayForEach(room.allBeds(), function (trtm) {
                        //        $.each(objTrtms, function (indexR, valueR) {
                        //            if (trtm != undefined) {
                        //                //console.log(trtm);
                        //                if (trtm.patient_id() == objWps.MessageBody.patient_id) {
                        //                    room.allBeds.remove(trtm);
                        //                }
                        //            }
                        //        });
                        //    });
                        //});
                    });

                    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                        ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                            //$.each(objTrtms, function (indexR, valueR) {
                            var edited = false;
                            ko.utils.arrayForEach(room.allBeds(), function (bed) {
                                if (bed != undefined) {
                                    if (bed.patient_id() == objWps.MessageBody.patient_id) {

                                        bed.sys_key(objWps.MessageBody.sys_key);
                                        bed.parent_key(objWps.MessageBody.parent_key);
                                        bed.room_name(objWps.MessageBody.room_name);
                                        //bed.maintainance(objWps.MessageBody.maintainance);
                                        //bed.active(objWps.MessageBody.active);
                                        //bed.inactive(objWps.MessageBody.inactive);
                                        //bed.isolated(objWps.MessageBody.isolated);
                                        //bed.undercleaning(objWps.MessageBody.undercleaning);
                                        bed.latin_desc(objWps.MessageBody.latin_desc);
                                        if (objWps.MessageBody.patient_sex == 1) {
                                            bed.sex('occupiedMale');
                                            bed.pSex('M');
                                        }
                                        else if (objWps.MessageBody.patient_sex == 2) {
                                            bed.sex('occupiedFemale');
                                            bed.pSex('F');
                                        }
                                        else {
                                            bed.sex('free');
                                            bed.pSex('');
                                        }
                                        //bed.bed_class(objWps.MessageBody.bed_class);
                                        bed.patient_id(objWps.MessageBody.patient_id);
                                        bed.patient_sex(objWps.MessageBody.patient_sex);
                                        bed.patengname(objWps.MessageBody.patengname);
                                        bed.patlocname(objWps.MessageBody.patlocname);
                                        bed.status(objWps.MessageBody.status);
                                        bed.pat_bithdate(objWps.MessageBody.pat_bithdate);
                                        var diffMs = new Date() - new Date(objWps.MessageBody.pat_bithdate);
                                        //var diffFs = diffMs / 1000; var diffMs = diffFs / 60; var diffHs = diffMs / 60; var diffDs = diffHs / 24; var diffMos = diffDs / 30; var diffYs = Math.floor(diffMos / 12);
                                        var diffYs = Math.floor(diffMs / 31536000000);
                                        if (isNaN(diffYs))
                                            bed.age();
                                        else
                                            bed.age(diffYs);

                                        bed.start_date(objWps.MessageBody.start_date);
                                        bed.systime(objWps.MessageBody.systime);
                                        bed.emr_status_time(objWps.MessageBody.emr_status_time);
                                        bed.emr_status(objWps.MessageBody.emr_status);

                                        if (IsNumeric(objWps.MessageBody.emr_status) && objWps.MessageBody.emr_status != 0 && objWps.MessageBody.emr_status != 10)
                                            bed.emr_status_color = ko.observable(GetColorByStatus(objWps.MessageBody.emr_status));
                                        else {
                                            bed.emr_status_color = ko.observable('lightgray');
                                            bed.emr_status = ko.observable('0');
                                        }

                                        bed.iswaitingarea(objWps.MessageBody.iswaitingarea);
                                        bed.episodekey(objWps.MessageBody.episodekey);
                                        bed.physician(objWps.MessageBody.physician);
                                        bed.physician_key(objWps.MessageBody.physician_key);
                                        bed.specialty(objWps.MessageBody.specialty);
                                        //bed.bedclassname(objWps.MessageBody.bedclassname);
                                        bed.bedtype(objWps.MessageBody.bedtype);
                                        bed.clinickey(objWps.MessageBody.clinickey);
                                        bed.nurse(objWps.MessageBody.nurse);
                                        //bed.price(objWps.MessageBody.price);
                                        bed.nursestationcode(objWps.MessageBody.nursestationcode);
                                        bed.statusName(objWps.MessageBody.statusName);
                                        bed.icon('/images/' + objWps.MessageBody.icon);
                                        bed.color(objWps.MessageBody.color);
                                        bed.location(objWps.MessageBody.location);
                                        //bed.x = objWps.MessageBody.location == null ? ko.observable() : ko.observable((parseInt(objWps.MessageBody.location.split(',')[0]) + 5) + 'px');
                                        //bed.y = objWps.MessageBody.location == null ? ko.observable() : ko.observable((parseInt(objWps.MessageBody.location.split(',')[1]) + 145) + 'px');
                                        //bed.rotation = objWps.MessageBody.rotation == null ? ko.observable(0) : ko.observable(objWps.MessageBody.rotation);

                                        //console.log('Edited');
                                        //console.log(bed);
                                        edited = true;
                                    }
                                }
                            });

                            if (!edited) {
                                if (room.room_key() == objWps.MessageBody.parent_key) {
                                    var addBed = new RoomBeds(objWps.MessageBody);
                                    //console.log('Added');
                                    //console.log(addBed);
                                    room.allBeds.push(addBed);
                                }
                            }
                            //});

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
            else if (objWps.MessageHeader.toUpperCase() == "ER BEDS") {
                //console.log(e.MessageBody);
                //var jsonTrtms = e.MessageBody.replace(/"([^"]+)":/g, function ($0, $1) { return ('"' + $1.toLowerCase() + '":'); });
                //var objTrtms = JSON.parse(jsonTrtms);

                if ($.isEmptyObject(objWps.MessageBody) == false) {

                    // check if he was in waiting patients to remove it
                    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                        ko.utils.arrayForEach(ns.waitingPatients(), function (Wp) {
                            //$.each(objTrtms, function (indexR, valueR) {
                            if (Wp != undefined) {
                                //console.log(trtm);
                                if (Wp.patient_id() == objWps.MessageBody.patient_id) {
                                    ns.waitingPatients.remove(Wp);
                                }
                            }
                            //});
                        });

                        // check if he was in notOnBeds to remove it
                        ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                            ko.utils.arrayForEach(room.notOnBeds(), function (notOnBed) {
                                //$.each(objTrtms, function (indexR, valueR) {
                                if (notOnBed != undefined) {
                                    //console.log(trtm);
                                    if (notOnBed.patient_id() == objWps.MessageBody.patient_id) {
                                        room.allBeds.remove(notOnBed);
                                    }
                                }
                                //});
                            });

                            // edit the data of row in beds observable
                            //$.each(objTrtms, function (indexR, valueR) {
                            ko.utils.arrayForEach(room.beds(), function (bed) {
                                // first
                                // delete old bed from other screen 
                                if (bed.patient_id() == objWps.MessageBody.patient_id) {

                                    //room.beds().remove(bed);

                                    bed.sex('free');
                                    bed.pSex('');
                                    bed.patient_id(null);
                                    bed.patient_sex('');
                                    bed.patengname('');
                                    // add by khalifa Chief_Complaint;
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
                                    bed.ntasksicon('');
                                    //$('.free .triage_new').css('display','Hidden');

                                    // $("#bedId" + bed.sys_key() + ".triage").text('0').css("background-color", "lightgray");


                                }







                                if (bed != undefined) {
                                    if (bed.sys_key() == objWps.MessageBody.sys_key) {

                                        bed.latin_desc(objWps.MessageBody.latin_desc);
                                        if (objWps.MessageBody.patient_sex == 1) {
                                            bed.sex('occupiedMale');
                                            bed.pSex('M');
                                        }
                                        else if (objWps.MessageBody.patient_sex == 2) {
                                            bed.sex('occupiedFemale');
                                            bed.pSex('F');
                                        }
                                        else {
                                            bed.sex('free');
                                            bed.pSex('');
                                        }
                                        //bed.bed_class(objWps.MessageBody.bed_class);
                                        bed.patient_id(objWps.MessageBody.patient_id);
                                        bed.patient_sex(objWps.MessageBody.patient_sex);
                                        bed.patengname(objWps.MessageBody.patengname);
                                        // add by khalifa
                                        bed.Chief_Complaint(objWps.MessageBody.Chief_Complaint)
                                        bed.patlocname(objWps.MessageBody.patlocname);
                                        bed.status(objWps.MessageBody.status);
                                        bed.pat_bithdate(objWps.MessageBody.pat_bithdate);
                                        var diffMs = new Date() - new Date(objWps.MessageBody.pat_bithdate);
                                        //var diffFs = diffMs / 1000; var diffMs = diffFs / 60; var diffHs = diffMs / 60; var diffDs = diffHs / 24; var diffMos = diffDs / 30; var diffYs = Math.floor(diffMos / 12);
                                        var diffYs = Math.floor(diffMs / 31536000000);
                                        if (isNaN(diffYs))
                                            bed.age();
                                        else
                                            bed.age(diffYs);

                                        bed.start_date(objWps.MessageBody.start_date);
                                        bed.systime(objWps.MessageBody.systime);
                                        bed.emr_status_time(objWps.MessageBody.emr_status_time);
                                        bed.emr_status(objWps.MessageBody.emr_status);

                                        if (IsNumeric(objWps.MessageBody.emr_status) && objWps.MessageBody.emr_status != 0 && objWps.MessageBody.emr_status != 10)
                                            bed.emr_status_color = ko.observable(GetColorByStatus(objWps.MessageBody.emr_status));
                                        else {
                                            bed.emr_status_color = ko.observable('lightgray');
                                            bed.emr_status = ko.observable('0');
                                        }

                                        bed.iswaitingarea(objWps.MessageBody.iswaitingarea);
                                        bed.episodekey(objWps.MessageBody.episodekey);
                                        bed.physician(objWps.MessageBody.physician);
                                        bed.physician_key(objWps.MessageBody.physician_key);
                                        bed.specialty(objWps.MessageBody.specialty);
                                        //bed.bedclassname(objWps.MessageBody.bedclassname);
                                        bed.bedtype(objWps.MessageBody.bedtype);
                                        bed.clinickey(objWps.MessageBody.clinickey);
                                        bed.nurse(objWps.MessageBody.nurse);
                                        //bed.price(objWps.MessageBody.price);
                                        bed.nursestationcode(objWps.MessageBody.nursestationcode);
                                        //bed.statusName(objWps.MessageBody.statusName);
                                        bed.icon('/images/' + objWps.MessageBody.icon);
                                        bed.color(objWps.MessageBody.color);
                                        bed.location(objWps.MessageBody.location);
                                        bed.ntasksicon(objWps.MessageBody.ntasksicon)
                                        //bed.x = objWps.MessageBody.location == null ? ko.observable() : ko.observable((parseInt(objWps.MessageBody.location.split(',')[0]) + 5) + 'px');
                                        //bed.y = objWps.MessageBody.location == null ? ko.observable() : ko.observable((parseInt(objWps.MessageBody.location.split(',')[1]) + 145) + 'px');
                                        //bed.rotation = objWps.MessageBody.rotation == null ? ko.observable(0) : ko.observable(objWps.MessageBody.rotation);

                                        //console.log('Edited');
                                        //console.log(bed);
                                        edited = true;
                                    }
                                }
                            });


                            //$('.free .triage_new img').css('display','none');

                            //if (!edited) {
                            //    if (room.room_key() == objWps.MessageBody.parent_key) {
                            //        var addBed = new RoomBeds(objWps.MessageBody);
                            //        console.log('Added');
                            //        console.log(addBed);
                            //        room.allBeds.push(addBed);
                            //    }
                            //}
                            //});

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
            else if (objWps.MessageHeader.toUpperCase() == "ER NOTONBEDS") {
                //console.log(e.MessageBody);
                //var jsonTrtms = e.MessageBody.replace(/"([^"]+)":/g, function ($0, $1) { return ('"' + $1.toLowerCase() + '":'); });
                //var objTrtms = JSON.parse(jsonTrtms);

                if ($.isEmptyObject(objWps.MessageBody) == false) {



                    //if he is not exist in notOnBeds add it
                    ko.utils.arrayForEach(vm.nursestations(), function (ns) {

                        // check if he was in waiting patients to remove it
                        ko.utils.arrayForEach(ns.waitingPatients(), function (Wp) {
                            //$.each(objTrtms, function (indexR, valueR) {
                            if (Wp != undefined) {
                                //console.log(trtm);
                                if (Wp.patient_id() == objWps.MessageBody.patient_id) {
                                    ns.waitingPatients.remove(Wp);
                                }
                            }
                            //});
                        });


                        ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {

                            //$.each(objTrtms, function (indexR, valueR) {
                            if (room.room_key() == objWps.MessageBody.parent_key) {
                                //if he was on bed delete his data from this bed
                                ko.utils.arrayForEach(room.beds(), function (bed) {
                                    if (bed != undefined) {
                                        if (bed.patient_id() == objWps.MessageBody.patient_id) {

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
                                        if (notOnBed.patient_id() == objWps.MessageBody.patient_id) {
                                            exist = true;
                                        }
                                    }
                                });
                                if (exist == false) {
                                    var addNotOnBed = new RoomBeds(objWps.MessageBody);
                                    //console.log('Added');
                                    room.allBeds.push(addNotOnBed);
                                }
                            }
                            //});
                        });

                        //  UpdateMnuWps(ns);

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


                //alert(openedNS)
                //	$('#refreshid').click();

            }
            else if (objWps.MessageHeader.toUpperCase() == "ER DISCHARGEDTODAY") {
                //console.log(e.MessageBody);
                //var jsonTrtms = e.MessageBody.replace(/"([^"]+)":/g, function ($0, $1) { return ('"' + $1.toLowerCase() + '":'); });
                //var objTrtms = JSON.parse(jsonTrtms);

                if ($.isEmptyObject(objWps.MessageBody) == false) {

                    //check to remove from waiting patients
                    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
                        ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
                            //$.each(objTrtms, function (indexR, valueR) {
                            //if he was on bed delete his data from this bed
                            ko.utils.arrayForEach(room.beds(), function (bed) {
                                if (bed != undefined) {
                                    if (bed.patient_id() == objWps.MessageBody.patient_id) {

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
                            //});

                            //$.each(objTrtms, function (indexR, valueR) {
                            ko.utils.arrayForEach(room.notOnBeds(), function (notOnBed) {
                                if (notOnBed != undefined) {
                                    //console.log(trtm);
                                    if (notOnBed.patient_id() == objWps.MessageBody.patient_id) {
                                        room.allBeds.remove(notOnBed);
                                    }
                                }
                            });

                            //});
                        });

                        // fix error bed when update
                        //  UpdateMnuWps(ns);

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
            //else if (objWps.MessageHeader.toUpperCase() == "ER ALERTS" || objWps.MessageHeader.toUpperCase() == "WB ALERTS") {
            //    //var jsonBedsAlerts = e.MessageBody;
            //    //console.log(jsonBedsAlerts);
            //    //var objBedsAlerts = JSON.parse(jsonBedsAlerts);

            //    ko.utils.arrayForEach(vm.nursestations(), function (ns) {
            //        if (ns.sys_key() == openedNS) {
            //            //console.log(ns.roomsAndBeds().length);
            //            ko.utils.arrayForEach(ns.roomsAndBeds(), function (room) {
            //                //console.log(room.room_key());
            //                ko.utils.arrayForEach(room.beds(), function (bed) {
            //                    //console.log(bed.sys_key());
            //                    //console.log(bed.patient_id());

            //                    if ($.isEmptyObject(jsonWps.MessageBody) == false) {
            //                        $.each(objBedsAlerts, function (indexR, valueR) {
            //                            //console.log(objBedsAlerts[indexR]);
            //                            var isUpper;
            //                            if (objBedsAlerts[indexR].patient_id == undefined)
            //                                isUpper = true;
            //                            else
            //                                isUpper = false;

            //                            if (isUpper == false) {

            //                                if (objBedsAlerts[indexR] != undefined) {
            //                                    //console.log(bed.latin_desc() + '  ||  ' + bed.patient_id() + ' || ' + objBedsAlerts[indexR].patient_id);
            //                                    if (bed.patient_id() == objBedsAlerts[indexR].patient_id) {
            //                                        //console.log(objBedsAlerts[indexR].patient_id);
            //                                        //console.log(objBedsAlerts[indexR].tooltip);
            //                                        if (objBedsAlerts[indexR].add_or_remove == "Add") {
            //                                            //console.log(objBedsAlerts[indexR].patient_id);
            //                                            //console.log(objBedsAlerts[indexR].tooltip);
            //                                            var alertExist = false;
            //                                            ko.utils.arrayForEach(bed.bedAlerts(), function (alertBed) {
            //                                                //console.log(alertBed.alert_name().toLowerCase().trim() + '         ' + alertBed.tooltip() + '======' + objBedsAlerts[indexR].alert_name.toLowerCase().trim() + '         ' + objBedsAlerts[indexR].tooltip);
            //                                                if (alertBed.alert_name().toLowerCase().trim() == objBedsAlerts[indexR].alert_name.toLowerCase().trim()) {

            //                                                    var tooltips = alertBed.tooltip().toLowerCase().split('\n');

            //                                                    var tooltipExists = false;
            //                                                    for (i = 0; i < tooltips.length; i++) {
            //                                                        //console.log(tooltips[i].toLowerCase() + '      ' + objBedsAlerts[indexR].tooltip.toLowerCase());
            //                                                        if (tooltips[i].toLowerCase() == objBedsAlerts[indexR].tooltip.toLowerCase()) {
            //                                                            tooltipExists = true;
            //                                                            break;
            //                                                        }
            //                                                    }

            //                                                    if (tooltipExists == false)
            //                                                        alertBed.tooltip(alertBed.tooltip() + '\n' + objBedsAlerts[indexR].tooltip);

            //                                                    alertExist = true;
            //                                                }
            //                                            });

            //                                            if (alertExist == false)
            //                                                bed.bedAlerts.push(new BedAlerts(objBedsAlerts[indexR]));

            //                                        }
            //                                        else {
            //                                            if (alertBed.alert_name().toLowerCase() == objBedsAlerts[indexR].alert_name.toLowerCase()) {
            //                                                bed.bedAlerts.remove(alertBed);
            //                                            }
            //                                        }
            //                                    }
            //                                    //console.log(bed.bedAlerts());
            //                                }
            //                            }
            //                            else {
            //                                if (objBedsAlerts[indexR] != undefined) {
            //                                    //console.log(bed.latin_desc() + '  ||  ' + bed.patient_id() + ' || ' + objBedsAlerts[indexR].PATIENT_ID);
            //                                    if (bed.patient_id() == objBedsAlerts[indexR].PATIENT_ID) {
            //                                        //console.log(objBedsAlerts[indexR].PATIENT_ID);
            //                                        //console.log(objBedsAlerts[indexR].TOOLTIP);
            //                                        if (objBedsAlerts[indexR].ADD_OR_REMOVE == "Add") {
            //                                            //console.log(objBedsAlerts[indexR].PATIENT_ID);
            //                                            //console.log(objBedsAlerts[indexR].TOOLTIP);
            //                                            var alertExist = false;
            //                                            ko.utils.arrayForEach(bed.bedAlerts(), function (alertBed) {
            //                                                //console.log(alertBed.alert_name().toLowerCase().trim() + '         ' + alertBed.tooltip() + '======' + objBedsAlerts[indexR].alert_name.toLowerCase().trim() + '         ' + objBedsAlerts[indexR].tooltip);
            //                                                if (alertBed.alert_name().toLowerCase().trim() == objBedsAlerts[indexR].ALERT_NAME.toLowerCase().trim()) {

            //                                                    var tooltips = alertBed.tooltip().toLowerCase().split('\n');

            //                                                    var tooltipExists = false;
            //                                                    for (i = 0; i < tooltips.length; i++) {
            //                                                        //console.log(tooltips[i].toLowerCase() + '      ' + objBedsAlerts[indexR].tooltip.toLowerCase());
            //                                                        if (tooltips[i].toLowerCase() == objBedsAlerts[indexR].TOOLTIP.toLowerCase()) {
            //                                                            tooltipExists = true;
            //                                                            break;
            //                                                        }
            //                                                    }

            //                                                    if (tooltipExists == false)
            //                                                        alertBed.tooltip(alertBed.tooltip() + '\n' + objBedsAlerts[indexR].TOOLTIP);

            //                                                    alertExist = true;
            //                                                }
            //                                            });

            //                                            if (alertExist == false)
            //                                                bed.bedAlerts.push(new BedAlerts(objBedsAlerts[indexR]));

            //                                        }
            //                                        else {
            //                                            if (alertBed.alert_name().toLowerCase() == objBedsAlerts[indexR].ALERT_NAME.toLowerCase()) {
            //                                                bed.bedAlerts.remove(alertBed);
            //                                            }
            //                                        }
            //                                    }
            //                                    //console.log(bed.bedAlerts());
            //                                }
            //                            }

            //                        });
            //                    }

            //                });
            //            });
            //        }
            //    });

            //}

        }


        catch (err) {
            console.log(err);

        }
    }

}, false);


function ChatMessage(directingtype, to, messagebody) {
    try {
        var allmessage = { directingtype: directingtype, to: to, messagebody: messagebody };
        window.parent.postMessage(allmessage, getdomainName());
    }
    catch (err) {
        console.log(err);
    }

}

function getdomainName() {
    var domainname = getParameterByName('maind');
    domainname = domainname.split('_').join('.');
    domainname = domainname.replace('domains', 'https://');
    domainname = domainname.replace('domain', 'http://');
    return domainname;
}


function GetCurrentModuleID() {
    var moduleid = getParameterByName('moduleid');
    return moduleid;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}



