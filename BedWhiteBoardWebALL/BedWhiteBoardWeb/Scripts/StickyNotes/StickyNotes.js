

function StickyNotes(Patient_id, Episdoe_type, episode_key, patientname, HMRN,isvedio,vedioPatientData) {
    var STickynotes = this;

    STickynotes.firsttime = ko.observable(0);

    STickynotes.count = ko.observable(0);
    STickynotes.isvedio = ko.observable(isvedio);
    STickynotes.vedioPatientData = ko.observable(vedioPatientData);

    

    
    STickynotes.HMRN = ko.observable(HMRN);
    STickynotes.Patient_id = ko.observable(Patient_id);
    STickynotes.patientname = ko.observable(patientname);
    STickynotes.Episdoe_type = ko.observable(Episdoe_type);
    STickynotes.episode_key = ko.observable(episode_key);
    STickynotes.showonly = ko.observable(false);
    STickynotes.addnew = ko.observable(false);
    STickynotes.showall = ko.observable(false);
    STickynotes.listofnotes = ko.observableArray();
    STickynotes.backtoall = function () {
        STickynotes.showonly(false);
        STickynotes.addnew(false);
        STickynotes.showall(true);
    }
    STickynotes.Pat_Notes = ko.observable('');
    STickynotes.current_sys_eky = ko.observable();
    STickynotes.FireAddNew = function () {
        STickynotes.Pat_Notes('');
        STickynotes.current_sys_eky(-1);
        STickynotes.showonly(false);
        STickynotes.addnew(true);
        STickynotes.showall(false);
    }

    

    STickynotes.rmoveSticknote = function (item) {
        //objMenuViewModel.AllStickNotes.remove(item);

        objMenuViewModel.AllStickNotes.remove(function (player) {
            return player.Patient_id== STickynotes.Patient_id();
        });


    }
    STickynotes.fireviewOnly = function (item) {
             STickynotes.Pat_Notes(item.Pat_Notes());
          STickynotes.current_sys_eky(item.sys_key());
                STickynotes.showonly(true);
                STickynotes.addnew(false);
                STickynotes.showall(false);
    }



    STickynotes.DeleteSticknote = function () {

        var url = "/MainMenuAPI/MMenuAPI/ConsWork/Dashborad_DeleteStickyNotes";
        var dataToPass = {
            "User_Id": AllPublicGeneralData.staff_key,
            "sys_key": STickynotes.current_sys_eky(),
        };
        //var taoster = FireTosterdash_success($.i18n('AddSticknotes'), Patient_ID + ' ' + PatientName);
        //AddingStrikyNoteSucesss
        //ErrorAddStickyNotes
        $.post(url, dataToPass).done(function (output) {
            //  toastr.clear(taoster);
            if (output == 'true') {
                STickynotes.Pat_Notes('');
                STickynotes.current_sys_eky(-1);

                STickynotes._loadsticknotes();
                //FireToster_successt($.i18n('AddingStrikyNoteSucesss'), PID);
            } else {
                //FireToster_Errort($.i18n('ErrorAddStickyNotes'), PID);
                console.log(output);
            }
        }).fail(function (output) {
            console.log(output);
            //FireToster_Errort($.i18n('ErrorAddStickyNotes'), PID);
            //toastr.clear(taoster);
        });



    }


    STickynotes.addSticknote = function () {

        $('.cnt').change();

        var Pat_Notes = General_ValdateText(STickynotes.Pat_Notes());
        if ($.trim(Pat_Notes) == '' | Pat_Notes==undefined) {
            return;
        }

        //-----------------------------------------------

        var url = "/MainMenuAPI/MMenuAPI/ConsWork/Dashborad_AddStickyNotes";
        var dataToPass = {
            "User_Id": AllPublicGeneralData.staff_key,
            "Pat_Notes": Pat_Notes,
            "Patient_ID": STickynotes.Patient_id(),
            "Episode_Key": STickynotes.episode_key(),
            "hospitalid": AllPublicGeneralData.Hospid
        };
        var taoster = FireTosterdash_success($.i18n('AddSticknotes'), STickynotes.HMRN() + ' ' + STickynotes.patientname());
        var PID = STickynotes.HMRN();
           $.post(url, dataToPass).done(function (output) {
            toastr.clear(taoster);
            if (output == 'true') {
                FireToster_successt($.i18n('AddingStrikyNoteSucesss'), PID);
                STickynotes._loadsticknotes();
            } else {
                FireToster_Errort($.i18n('ErrorAddStickyNotes'), PID);
                console.log(output);
            }
        }).fail(function (output) {
            console.log(output);
            FireToster_Errort($.i18n('ErrorAddStickyNotes'), PID);
            toastr.clear(taoster);
        });


    }


   
    
    STickynotes.pouppos = function () {
        $('.note').zIndex(0);
        $('#insticknotes' + STickynotes.Patient_id()).zIndex(1);

    }

    STickynotes.updateStatus = function () {

        if (STickynotes.Episdoe_type() == 1) {
            //update Inpatient List by Count
            ko.utils.arrayForEach(GeneralInPatientList.allData(), function (feature) {
                if (feature.Patient_id() == STickynotes.Patient_id()) {
                    feature.stickycount(STickynotes.count());
                    return;
                }
           });
        } else {
            //update OutPatient List by Count
            RefiePatient_Referesh(STickynotes.Patient_id(), STickynotes.count());

        }


    }
   
    STickynotes._loadsticknotes = function () {
        var url = "/MainMenuAPI/MMenuAPI/ConsWork/Dashborad_GetPatientStickyNotes?staff_key=" + AllPublicGeneralData.staff_key + "&Episdoe_type=" + STickynotes.Episdoe_type() + "&episode_key=" + STickynotes.episode_key() + "&Pateintid=" + STickynotes.Patient_id() + "&lang=" + AllPublicGeneralData.Langid;
        $.getJSON(url, function (stikeynotesall) {
            if (STickynotes.firsttime() == 1) {
                STickynotes.count(stikeynotesall.length);
                STickynotes.updateStatus();
            }
            

            STickynotes.firsttime(1);

            if (stikeynotesall.length == 0) {
                STickynotes.addnew(true);
                STickynotes.showall(false);
                STickynotes.showonly(false);
            }
            if (stikeynotesall.length >= 1) {
                STickynotes.showall(true);
                   STickynotes.addnew(false);
                  STickynotes.showonly(false);
            }

            var mappedstikeynotesall = $.map(stikeynotesall, function (Inpat) { return new stickyCls_cls(Inpat); })
            STickynotes.listofnotes(mappedstikeynotesall);
        }).fail(function (output) {
            console.log(output);
        });
    }


    ////Start Vedio 
    STickynotes.isloadingVisible = ko.observable(true);
    STickynotes.isVedioVisible = ko.observable(false);

    STickynotes.cssSize = ko.observable('video-s2');

    STickynotes.vediourl = ko.observable('');

    STickynotes._loadsticknotesVedio = function () {
        STickynotes.vediourl('');
    }
    STickynotes.YesPatientIsOnlyOpenVedio = function () {
        STickynotes.isloadingVisible(false);
        STickynotes.isVedioVisible(true);
        //Start Visit
        if (STickynotes.vedioPatientData().VSTATUS == 4 | STickynotes.vedioPatientData().VSTATUS == 5) {
            OutpatMenusActions('1', STickynotes.vedioPatientData(), '', '');
        } else {
            StartEpisod(STickynotes.vedioPatientData(), 'isonline');
        }

        //var url = "https:" + "//wvcall.medicacloudcare.com/eapp?user=Doc_" + AllPublicGeneralData.staff_key + "&password=Doc_" + AllPublicGeneralData.staff_key + "&dbcode=" + AllPublicSysparameters.Dbcode + "&hospitalid=" + AllPublicGeneralData.Hospid + "&traget=Pat_" + STickynotes.Patient_id();

        var url = "/eapp?user=Doc_" + AllPublicGeneralData.staff_key + "&password=Doc_" + AllPublicGeneralData.staff_key + "&dbcode=" + AllPublicSysparameters.Dbcode + "&hospitalid=" + AllPublicGeneralData.Hospid + "&traget=Pat_" + STickynotes.Patient_id();
        STickynotes.vediourl(url);
    }
    STickynotes.VedioSize_1 = function () {
        STickynotes.cssSize('video-s1');
        if (checkFullScreen() == false) {
            $('#sticknotes' + STickynotes.Patient_id()).attr("style", "position: relative; left: 533px; top: -540px;")
        } else {
            $('#sticknotes' + STickynotes.Patient_id()).attr("style", "position: relative; left: 534px; top: -540px;")
        }
        //ExitFullDive('#sticknotes' + STickynotes.Patient_id());
        

    }
    STickynotes.VedioSize_2 = function () {
        STickynotes.cssSize('video-s2');
        if (checkFullScreen() == false) {
            $('#sticknotes' + STickynotes.Patient_id()).attr("style", "position: relative; left: 368px; top: -573px;")
        } else {
            $('#sticknotes' + STickynotes.Patient_id()).attr("style", "position: relative; left: 419px; top: -645px;")
        }
        //ExitFullDive('#sticknotes' + STickynotes.Patient_id());
        
    }
    STickynotes.VedioSize_3 = function () {
        STickynotes.cssSize('video-s3');

        if (checkFullScreen() == false) {
            $('#sticknotes' + STickynotes.Patient_id()).attr("style", "position: relative; left: 156px; top: -631px;")
        } else {
            $('#sticknotes' + STickynotes.Patient_id()).attr("style", "position: relative; left: 146px; top: -797px;")
        }
        //ExitFullDive('#sticknotes' + STickynotes.Patient_id());
        
        
    }

    STickynotes.VedioSize_5 = function () {
        STickynotes.cssSize('video-s5');

        if (checkFullScreen() == false) {
            $('#sticknotes' + STickynotes.Patient_id()).attr("style", "position: relative; left: 543px; top: -716px;")
        } else {
            $('#sticknotes' + STickynotes.Patient_id()).attr("style", "position: relative; left: 530px; top: -806px;")
        }
        //ExitFullDive('#sticknotes' + STickynotes.Patient_id());


    }



    

    STickynotes.VedioSize_4 = function () {

        //if (ISFulldiv('#sticknotes' + STickynotes.Patient_id())) {
        //    STickynotes.cssSize('video-sfull');
        //    Fulldiv('#sticknotes' + STickynotes.Patient_id());
        //} else {
        //    STickynotes.VedioSize_1();
        //}
        STickynotes.cssSize('video-sfull');
        if (checkFullScreen() == false) {
            $('#sticknotes' + STickynotes.Patient_id()).attr("style", "position: relative; left: 1px; top: -721px;")
        } else {
            $('#sticknotes' + STickynotes.Patient_id()).attr("style", "position: relative; left: 3px; top: -855px;")
        }
        
        
    }
    STickynotes.TeleVedioMinize = function () {
        //if (ISFulldiv('#sticknotes' + STickynotes.Patient_id())) {
        //    Fulldiv('#sticknotes' + STickynotes.Patient_id());
        //}  
        $('.StickyNotesVedio').show();
        $('#insticknotes' + STickynotes.Patient_id()).hide();
    }
    STickynotes.TeleVedioRemoveMinize = function () {
        
        $('.StickyNotesVedio').hide();
        $('#insticknotes' + STickynotes.Patient_id()).show();

    }



    //end Vedio
}
function ExitFullDive(diveid) {
    element = $(diveid).get(0);
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}
function Fulldiv(diveid) {
    if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    ) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    } else {
        element = $(diveid).get(0);
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
}


function ISFulldiv(diveid) {
    if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    ) {
        return false;
    } else {
        return true;
    }
}



function checkFullScreen() {
    if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
        return false;
    } else {
        return true;
    }
}




function stickyCls_cls(Inpat) {
    var self = this;
    self.sys_key = ko.observable(Inpat.sys_key);
    self.note_date = ko.observable(Inpat.note_date);
    self.Pat_Notes = ko.observable(Inpat.Pat_Notes);
    self.Staffname = ko.observable(Inpat.Staffname);
}





function dishargePatient() {
    var dishargePatient = this;

    dishargePatient.Episode_Key = ko.observable();
    dishargePatient.PId = ko.observable();
    dishargePatient.PatientName = ko.observable();

    dishargePatient.clinicKey = ko.observable();

    dishargePatient.Cons_SysKey = ko.observable();

    dishargePatient.statId = ko.observable();

    dishargePatient.selected = ko.observable();

    dishargePatient.OUTPATREGSSYS = ko.observable();

    

    dishargePatient.url = ko.observable('');

    self.selectstatust = function (item) {
        
        ko.utils.arrayForEach(dishargePatient.disharegstatuslist(), function (feature) {
            if (item.status_id() == feature.status_id()) {
                feature.selected('selected')
            } else {
                feature.selected('')
            }
        });

        dishargePatient.selected(item);



        var statName = dishargePatient.selected().status_name();
        var doccode = dishargePatient.selected().doc_code();


        if (!dishargePatient.selected()) {
             dishargePatient.url("");
            return;
        }



        var url = "/WebMedicalTemplates/MedicalTemplate.html?PatId=" + dishargePatient.PId() + "&EpsKey=" + dishargePatient.Episode_Key() +
            "&UserID=" + AllPublicGeneralData.staff_key + "&lang=" + AllPublicGeneralData.Langid + "&hospitalid=" + AllPublicGeneralData.Hospid + "&orderkey=" + dishargePatient.Episode_Key() + "&tempkey=" + item.doc_code() + "&dbcode=" + AllPublicSysparameters.Dbcode + "&ReportMode=1&disstatus=" + doccode + "&disdesc=" + statName;
        dishargePatient.url(url);
        
    };

    
    dishargePatient.disharegstatuslist = ko.observableArray();
    dishargePatient.loaddata = function (Episode_Key, PId, PatientName, clinicKey, Cons_SysKey, OUTPATREGSSYS) {
        dishargePatient.url('');
        dishargePatient.selected = ko.observable();

        ko.utils.arrayForEach(dishargePatient.disharegstatuslist(), function (feature) {
            feature.selected('');
        });


        dishargePatient.Episode_Key(Episode_Key);
        dishargePatient.PId(PId);
        dishargePatient.PatientName(PatientName);
        dishargePatient.clinicKey(clinicKey);
        dishargePatient.Cons_SysKey(Cons_SysKey);
        dishargePatient.OUTPATREGSSYS(OUTPATREGSSYS);

        
        if (dishargePatient.disharegstatuslist().length > 0) {
            return ;
        }



        $.getJSON("/BedWhiteBoardWeb/BedManagementApiActions/WaitingPatients/GetDischareStatus?hospid=" + AllPublicGeneralData.Hospid, function (allData) {
        
           var allaatas = $.map(allData, function (ConsIn)
            { return new rowModel(ConsIn, ConsultationsIn); })
            dishargePatient.disharegstatuslist(allaatas);
           //console.log(  dishargePatient.disharegstatuslist());



        });
    }


    dishargePatient.DischarePatientnow = function () {
        if (!dishargePatient.selected()) {
            FireToster_Errort($.i18n('discharetstus'), '')
            return;
        }


        //this.status_id = ko.observable(row.status_id);
        //this.status_name = ko.observable(row.status_name);
        //this.status_name = ko.observable(row.status_name);
        //this.selected = ko.observable('');
        //this.doc_code = ko.observable(row.doc_code);

        var PID = dishargePatient.PId();
        var statId = dishargePatient.selected().status_id();
           
        var statName = dishargePatient.selected().status_name();
        var doccode = dishargePatient.selected().doc_code();

        var sKey = dishargePatient.clinicKey();
        var episodeKey = dishargePatient.Episode_Key();
        var pId = dishargePatient.PId();
        $.getJSON("/BedWhiteBoardWeb/BedManagementApiActions/Nursestations/CheckForDischargeDoc?patId=" + pId + "&epskey=" + episodeKey + "&DocCode=" + doccode + "&orderkey=" + episodeKey, function (allData) {
            if (allData > 0) {
                var Actiontext = $.i18n('FinalDischargeer');
                var PatientName = dishargePatient.PatientName();
                var taoster = FireTosterdash_success(Actiontext, PID + ' ' + PatientName);
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    url: "/BedWhiteBoardWeb/BedManagementApiActions/WaitingPatients/DischargePatient?ek=" + dishargePatient.Episode_Key() + "&pId=" + dishargePatient.PId() + "&sKey=" + dishargePatient.clinicKey() + "&dStatus=" + statId + "&uId=" + AllPublicGeneralData.staff_key + "&hospId=" + AllPublicGeneralData.Hospid,
                    success: function (data) {
                        if (data == "0" | data=="1") {
                            FireToster_successt($.i18n('sucessFinscharge'), PID)
                            if (dishargePatient.OUTPATREGSSYS() != undefined) {
                                Dashborad_GetNotificationToOUTPATS(dishargePatient.OUTPATREGSSYS(), Actiontext, $.i18n('sucessFinscharge') + ' ' + PID, 1);
                            }

                            if (dishargePatient.Cons_SysKey() != 0) {
                                UpdateStatus_episode(dishargePatient.Cons_SysKey());
                            } else {
                                UpdateTabStatus(PID, 'E');
                            }
                            toastr.clear(taoster);
                            $('.btnClosePip').click();
                        } else {
                            toastr.clear(taoster);
                            FireToster_Errort($.i18n('ErrorFinscharge'), PID)
                            console.log(output);
                        }
                    }
                    ,
                    error: function (output) {
                        console.log(output);
                        FireToster_Errort($.i18n('ErrorFinscharge'), PID)
                        toastr.clear(taoster);
                    }
                });
           }
            else {

                FireToster_Errort("Discharge summary must be saved and signed", '')
                //alert("Discharge summary must be saved and signed");
            }

        });	





        return;//old funcction
        if (!dishargePatient.selected()) {
            FireToster_Errort($.i18n('discharetstus'), '')
            return;
        }
        $('#Pop_up_Middle').modal('hide');
        var PID = dishargePatient.PId();
        bootbox.confirm("Are you sure you want to discharge Patient  " + PID, function (result) {
            if (result == true) {

                var Actiontext = $.i18n('FinalDischargeer');
               
                var PatientName = dishargePatient.PatientName();
                var taoster = FireTosterdash_success(Actiontext, PID + ' ' + PatientName);
                $.ajax({
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    url: "/BedWhiteBoardWeb/BedManagementApiActions/WaitingPatients/DischargePatient?ek=" + dishargePatient.Episode_Key() + "&pId=" + dishargePatient.PId() + "&sKey=" + dishargePatient.clinicKey() + "&dStatus=" + statId + "&uId=" + AllPublicGeneralData.staff_key + "&hospId=" + AllPublicGeneralData.Hospid,
                    success: function (data) {
                        if (data == "0") {
                            FireToster_successt($.i18n('sucessFinscharge'), PID)
                            if (dishargePatient.Cons_SysKey() != 0) {
                                UpdateStatus_episode(dishargePatient.Cons_SysKey());
                            } else {
                                UpdateTabStatus(PID, 'E');
                            }

                            toastr.clear(taoster);
                            $('.btnClosePip').click();

                        } else {
                            toastr.clear(taoster);
                            FireToster_Errort($.i18n('ErrorFinscharge'), PID)
                            console.log(output);
                        }
                    }
                    ,
                    error: function (output) {
                        console.log(output);
                        FireToster_Errort($.i18n('ErrorFinscharge'), PID)
                        toastr.clear(taoster);
                    }
                });


            }
            

        });


       

      
    }




   










    





}



var rowModel = function (row) {
    this.status_id = ko.observable(row.status_id);
    this.status_name = ko.observable(row.status_name);
    this.status_name = ko.observable(row.status_name);
    this.selected = ko.observable('');
    this.doc_code = ko.observable(row.doc_code);
};


ko.bindingHandlers.modifyOnFocusOut = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        $(element).blur(function () {
            //Do your work
        });
    }
}



var GeneralLogoutSesionViewModel;

function LogoutSesionViewModel() {
    LogoutSesion = this;
    GeneralLogoutSesionViewModel = LogoutSesion;

    LogoutSesion.logoutone = function (item) {
        $('#tablesessionout').hide();
        $('#Pop_up_Middle').modal('hide');



        bootbox.prompt($.i18n('Requestpincode'), function (result) {
            $('#tablesessionout').show();
            if (result == null) { return; }

            if (result.trim() == AllPublicSysparameters.PinCode) {
                
                var Staff_Connectionid = item.Staff_Connectionid();
                var allid = [];
                allid.push(Staff_Connectionid);
                PublicMainMenuWebChat.server.sendChatMessage_logout(allid);
                LogoutSesion.AllSession.remove(item);
            } else {
                
                FireToster_Errort($.i18n('errorpincode'), '');

            } 
        }).addClass('');;
        $('.bootbox-input').attr('type', 'password');


    }

    //--------------------------------------------------
    LogoutSesion.LogoutAll = function () {
        $('#Pop_up_Middle').modal('hide');

        $('#tablesessionout').hide();
        bootbox.prompt($.i18n('Requestpincode'), function (result) {
           

            $('#tablesessionout').show();
            if (result == null) { return; }
            if (result.trim() == AllPublicSysparameters.PinCode) {
                var allid = [];
                ko.utils.arrayForEach(LogoutSesion.AllSession(), function (feature) {
                    allid.push(feature.Staff_Connectionid());
                });
                PublicMainMenuWebChat.server.sendChatMessage_logout(allid);
                LogoutSesion.AllSession.removeAll();
            } else {
                FireToster_Errort($.i18n('errorpincode'), '');
            }
        }).addClass('  ');

        $('.bootbox-input').attr('type', 'password');


       
    }

    //--------------------------------------------------


    LogoutSesion.AllSession = ko.observableArray();
    LogoutSesion.loaddata = function (data) {
        var mappedstikeynotesall = $.map(data, function (Inpat) { return new Logoutts_cls(Inpat); })
        LogoutSesion.AllSession(mappedstikeynotesall);
    }

}


function Logoutts_cls(Inpat) {
    var self = this;
    self.Staff_Connectionid = ko.observable(Inpat.Staff_Connectionid);
    self.staff_IP = ko.observable(Inpat.staff_IP);
    self.logondate = ko.observable(Inpat.logondate);

    var patient = "";
    for (i = 0; i < Inpat.OpenedPatients.length; i++) {
        if (i == 0) {
            patient += Inpat.OpenedPatients[i].PatientIds;
        } else {
            patient +=","+ Inpat.OpenedPatients[i].PatientIds;
        }
    }
    self.Patients = ko.observable(patient);
}




//////////////////////////////////////////////////////////////////////


var GeneralMessagesViewModel;
var MessageToaster;
function MessagesViewModel() {
    var MessagesView = this;

    MessagesView.hospid = ko.observable(AllPublicGeneralData.Hospid);
    MessagesView.staff_key = ko.observable(AllPublicGeneralData.staff_key);
    MessagesView.staff_Name = ko.observable(AllPublicGeneralData.StaffEname);


    MessagesView.Signature = ko.observable('');
    MessagesView.inboxCount = ko.observable();
    

    

    
    
    MessagesView.isnewMessage = ko.observable(true);
    MessagesView.ISviewMessage = ko.observable(false);
    MessagesView.allowReplay = ko.observable(false);

    MessagesView.allowReplayALL = ko.observable(false);
    MessagesView.allowAddingSignure = ko.observable(false);




    MessagesView.trurnNew0View1 = function (trunrtype) {
        if (trunrtype == 0) {
            MessagesView.isnewMessage(true);
            MessagesView.ISviewMessage(false);
            MessagesView.allowReplay(false);
            MessagesView.allowReplayALL(false);
            MessagesView.allowAddingSignure(false);
        } else {
            MessagesView.isnewMessage(false);
            MessagesView.ISviewMessage(true);
            MessagesView.allowAddingSignure(false);
        }
        

    }

    MessagesView.CallFirstTime = ko.observable(false);

    MessagesView.composeMessage=function(){
        MessagesView.trurnNew0View1(0);
        MessagesView.clearselection();
        MessagesView.clearAfterAdd();
        var txt = "<br />" + MessagesView.Signature();
        txt = txt.split("<br />").join("\n");
        MessagesView.NewBody(txt);


    }
    MessagesView.RefreshAll = function () {
        MessagesView.clearAfterAdd();
        MessagesView.composeMessage();
        MessagesView.loadAll();
        
    }
    GeneralMessagesViewModel = MessagesView;
    MessagesView.ShowInbox = ko.observable(true);
    MessagesView.ShowSent = ko.observable(false);
    MessagesView.ShowTrash = ko.observable(false);
    MessagesView.searchType = ko.observable('4');
    MessagesView.searchType.subscribe(function (newValue) {
        MessagesView.searchtolist([]);
        if (MessagesView.searchtoText() != '') {
            MessagesView.searchEnter();
        }
    });
    MessagesView.searchtoText = ko.observable('');
    MessagesView.searchtoText.subscribe(function (newValue) {
        
            MessagesView.searchtolist([]);
            $('.reslist').hide();
        


    })

    MessagesView.searchtolist = ko.observableArray();
    MessagesView.selectList = ko.observableArray();
    MessagesView.selectAdd = function (item) {
        MessagesView.searchtolist.remove(item);
        $('.reslist').hide();
        var stype = MessagesView.searchType();
        var txt = "";
        if (stype == 1) {
            txt = "Rol";
        } else if (stype == 2) {
            txt = "Specialty";
        } else if (stype == 3) {
            txt = "Job description";
        } else if (stype == 4) {
            txt = "Staff";
        }
        txt = "(" + txt + ")";
        item.Latindesc = item.Latindesc + " " + txt;
        item.LocalDesc = item.LocalDesc + " " + txt;
        var found=0
        ko.utils.arrayForEach(MessagesView.selectList(), function (feature) {
            if (feature.codeKey == item.codeKey) {
                found = 1;
            }
            
        });
        if (found == 0) {
            MessagesView.selectList.push(item);
        }
        
    }

    MessagesView.selectRemove = function (item) {
        MessagesView.selectList.remove(item);

    }

    


    
    
    

    MessagesView.txtSearchclick = function () {
        if (MessagesView.searchtolist().length > 0) {
            $('.reslist').show();
        } else {
            $('.reslist').hide();
        }

    }

   

   
    


    MessagesView.searchEnter = function () {
        
        if (MessagesView.searchtoText() == '') {
            MessagesView.searchtolist([]);
            return;
        }
        var searchtxt = General_ValdateText(MessagesView.searchtoText());

        
        searchtxt = encodeURI(searchtxt);
             

        
        var taoster = FireTosterdash_success($.i18n('searchfor'), MessagesView.searchtoText());
        var Newurl = "/MainMenuOthersAPI/api/Messages/Dashborad_MessagesGetTo?type=" + MessagesView.searchType() + "&searchtxt=" + searchtxt + "&hospitalid=" + MessagesView.hospid() + "&currentstaff=" + MessagesView.staff_key();

        $.getJSON(Newurl, function (alldata) {
            toastr.clear(taoster);
            MessagesView.searchtolist(alldata);
            if (MessagesView.searchtolist().length > 0) {
                $('.reslist').show();
            } else {
                $('.reslist').hide();
            }
            

        }).fail(function (output) {
            console.log(output);
            toastr.clear(taoster);
        });



    }


  

    MessagesView.Clear = function (type) {
        $('li[keydata="1"]').removeClass("active");
        $('li[keydata="2"]').removeClass("active");
        $('li[keydata="3"]').removeClass("active");
        $('li[keydata="4"]').removeClass("active");
        $('li[keydata="' + type + '"]').addClass("active");
        MessagesView.ShowInbox(false);
        MessagesView.ShowSent(false);
        MessagesView.ShowTrash(false);
        if (type == 1) {
            //for back
        } else if (type == 2) {
            MessagesView.ShowInbox(true);
            MessagesView.listAll(MessagesView.listInbox());
        } else if (type == 3) {
            MessagesView.ShowSent(true);
            MessagesView.listAll(MessagesView.listSent());
        } else if (type == 4) {
            MessagesView.ShowTrash(true);
            MessagesView.listAll(MessagesView.listTrash());
        }
    }
   
    MessagesView.sending = function () {
        MessagesView.Clear(3);
    }
    MessagesView.Inboxing = function () {
        MessagesView.Clear(2);
    }
    MessagesView.trashing = function () {
        MessagesView.Clear(4);
    }
    MessagesView.backing = function () {
        MessagesView.Clear(1);
    }

    MessagesView.loadSignure = function (pa) {

        var url = "/MainMenuOthersAPI/api/Messages/Dashborad_MessagesGetSignature?MsgHospitalId=" + MessagesView.hospid() + "&Staff_key=" + MessagesView.staff_key();
        $.getJSON(url, function (data) {
            MessagesView.Signature(data, pa);
            if (pa == 1) {
                MessagesView.composeMessage();
            }

        });
    }
    MessagesView.PrepairSignature = function () {
        MessagesView.composeMessage();
        MessagesView.allowAddingSignure(true);
        MessagesView.isnewMessage(false);
        var txt =MessagesView.Signature();
        txt = txt.split("<br />").join("\n");
        MessagesView.NewBody(txt);


   }

    MessagesView.AddSignature = function () {
        var body = General_ValdateText(MessagesView.NewBody());
        body = body.replace(/(?:\r\n|\r|\n)/g, '<br />');

        var taoster = FireTosterdash_success($.i18n('addSignure'), '');
        var MsgSignature = body;
        var url = "/MainMenuOthersAPI/api/Messages/Dashborad_MessagesAddSignature?MsgSignature=" + MsgSignature + "&MsgHospitalId=" + MessagesView.hospid() + "&Staff_key=" + MessagesView.staff_key();
        $.getJSON(url, function (data) {
            FireToster_successt($.i18n('generalsavd'), '');
            toastr.clear(taoster);
            MessagesView.loadSignure(1);
        }).fail(function (output) {
            FireToster_Errort($.i18n('errorinsave'), '');
            console.log(output);
            toastr.clear(taoster);
        });
    }


    

    MessagesView.searchlist = function () {

        if (MessagesView.ShowInbox() == true) {
            loadtype = 2;
            MessagesView.loadMsg(2);
        } else if (MessagesView.ShowSent() == true) {
            loadtype = 3;
            MessagesView.loadMsg(3);
        } else if (MessagesView.ShowTrash() == true) {
            loadtype = 4;
            MessagesView.loadMsg(4);
        }


    }

    MessagesView.searchText = ko.observable('');//peding
    MessagesView.searchText.subscribe(function (newValue) {
        if (newValue == "") {
            MessagesView.searchlist();
        }
       
    });

    

    MessagesView.IdKey = ko.observable();
    MessagesView.FireID = function () {
        var id =-Math.floor(Math.random() * 10000);
        MessagesView.IdKey(id);
    }
    MessagesView.removeAttach = function (item) {
        var url = "/MainMenuOthersAPI/api/Messages/Dashborad_MessagesDelAttachments?Sys_key=" + item.codeKey;
        $.getJSON(url, function (alldata) {
            MessagesView.OfflineAttachs.remove(item);
        }).fail(function (output) {
        });
    }
    MessagesView.OfflineAttachs =ko.observableArray()
    MessagesView.LoadOffileAttachs = function () {
        var url = "/MainMenuOthersAPI/api/Messages/Dashborad_GetAttachments?SMG_key=" + MessagesView.IdKey() + "&Staff_Key=" + MessagesView.staff_key();
        $.getJSON(url, function (alldata) {
            MessagesView.OfflineAttachs(alldata);
        }).fail(function (output) {
        });
    }
    MessagesView.downloadFile = function (item) {
        downloadURI(item.url, item.name);
    }
    




    //notificationList
    MessagesView.MessageNotificationList = ko.observableArray();
    MessagesView.AddtoNotifiction = function (data) {
        var lists = data.split("~");
        var date = new Date().toLocaleTimeString();

        
        //message = "MSG~" + MsgKey + "~" + title + "~" + body.substring(0, 50) + "~" + toostext.substring(0, 50);
        var fromTxt = lists[4];
        var MsgTitle = lists[2];
        var MsgBody = lists[3];
        var MsgKey = lists[1];
       var Newtofiviation = new MsgListTop(date, fromTxt, MsgTitle, MsgBody, MsgKey, 1);
        MessagesView.MessageNotificationList.splice(0, 0, Newtofiviation);
        FireToster_infoNoClose(fromTxt + '...' + MsgBody, MsgTitle);
        Genral_alertsound(1);
    }
    MessagesView.RemoveNotificationMessage = function (item) {
        MessagesView.MessageNotificationList.remove(item);
        MessagesView.MessagesActions(item.sys_key(), 3);
    }
    MessagesView.LoadNotificationsFromInBox = function () {
        MessagesView.MessageNotificationList([]);
        ko.utils.arrayForEach(MessagesView.listInbox(), function (feature) {
         

            var Newtofiviation = new MsgListTop(feature.MsgAddDate(), feature.data1(), feature.data2() , feature.data3(), feature.sys_key(), feature.MsgStatus());
            MessagesView.MessageNotificationList.push(Newtofiviation);
        });
    }
    //notificationList
    MessagesView.listAll = ko.observableArray();
    MessagesView.listInbox = ko.observableArray();
    MessagesView.listSent = ko.observableArray();
    MessagesView.listTrash = ko.observableArray();

    MessagesView.firecountsOnly = function () {
        var url = "/MainMenuOthersAPI/api/Messages/Dashborad_MessagesGetCounts?HospitalID=" + MessagesView.hospid() + "&currentStaff=" + MessagesView.staff_key();
        $.getJSON(url, function (AllMessages) {
            objMenuViewModel.Messagecounts(AllMessages.InboxCount);
            if (AllMessages.InboxCount > 0) {
                MessagesView.inboxCount(AllMessages.InboxCount);
            } else {
                MessagesView.inboxCount('');
            }
        }).fail(function (output) {
            console.log(output);
        });
    }

    MessagesView.loadAll = function () {
        if (MessagesView.CallFirstTime() == false) {
            MessagesView.loadSignure();
            MessagesView.FireID();
            MessagesView.CallFirstTime(true);
        }
        MessagesView.loadMsg(2);
        MessagesView.loadMsg(3);
        MessagesView.loadMsg(4);
        MessagesView.firecountsOnly();
    }
    //var taoster_1=null ;

    MessagesView.loadMsg = function (loadtype) {
        var url = "";
        if (loadtype == 4) {//trashing
            url = "/MainMenuOthersAPI/api/Messages/Dashborad_MessagesGetListInbox?searchtxt=" + MessagesView.searchText() + "&HospitalID=" + MessagesView.hospid() + "&MsgTo=" + MessagesView.staff_key() + '&istrash=1';
        } else if (loadtype == 2) {//Inboxing  int MsgTo, int HospitalID, string searchtxt,int  istrash
            url = "/MainMenuOthersAPI/api/Messages/Dashborad_MessagesGetListInbox?searchtxt=" + MessagesView.searchText() + "&HospitalID=" + MessagesView.hospid() + "&MsgTo=" + MessagesView.staff_key() + '&istrash=0';
        } else if (loadtype == 3) {//sending int MsgFrom, int MsgHospitlaid, string searchtxt
            url = "/MainMenuOthersAPI/api/Messages/Dashborad_MessagesGetListSent?searchtxt=" + MessagesView.searchText() + "&MsgHospitlaid=" + MessagesView.hospid() + "&MsgFrom=" + MessagesView.staff_key();
        }
        //if (taoster_1 == null) {
        //    taoster_1 = FireTosterdash_success($.i18n('Messages'), '');
        //}
        $.getJSON(url, function (AllMessages) {
            //toastr.clear(taoster_1);
            var AllMappedMessages;
            if (loadtype == 4) {
                AllMappedMessages = $.map(AllMessages, function (msg) { return new Msglisttemp(msg, loadtype); })
                MessagesView.listTrash(AllMappedMessages);
            } else if (loadtype == 2) {
                AllMappedMessages = $.map(AllMessages, function (msg) { return new Msglisttemp(msg, loadtype); })
                MessagesView.listInbox(AllMappedMessages);
                MessagesView.LoadNotificationsFromInBox();

            } else if (loadtype == 3) {
                AllMappedMessages = $.map(AllMessages, function (msg) { return new Msglisttemp(msg, loadtype); })
                MessagesView.listSent(AllMappedMessages);

            }
            //------------------------
            if (MessagesView.ShowInbox() == true) {
                if (loadtype == 2) {
                    MessagesView.listAll(AllMappedMessages);
                }
            } else if (MessagesView.ShowSent() == true) {
                if (loadtype == 3) {
                    MessagesView.listAll(AllMappedMessages);
                }
            } else if (MessagesView.ShowTrash() == true) {
                if (loadtype == 4) {
                    MessagesView.listAll(AllMappedMessages);
                }
            }
            //------------------------
        }).fail(function (output) {
            console.log(output);
            //toastr.clear(taoster_1);
        });
    }
    MessagesView.Csys_key = ko.observable();
    MessagesView.CMsgType = ko.observable();
    MessagesView.CMsgTitle = ko.observable();
    MessagesView.CMsgBody = ko.observable();
    MessagesView.CMsgStatus = ko.observable();
    MessagesView.CMsgAddDate = ko.observable();
    MessagesView.CMsgFrom = ko.observable();
    MessagesView.CMsgText = ko.observable();
    MessagesView.CMsgFromtxt = ko.observable();
    MessagesView.CMessageType = ko.observable();
    MessagesView.CMessageStatus = ko.observable();
    MessagesView.CRevieverKey = ko.observable();
    MessagesView.CType = ko.observable();
    MessagesView.CMessageReplies = ko.observableArray();
    MessagesView.CMessageRFils = ko.observableArray();


    MessagesView.NewTitle = ko.observable('');
    MessagesView.NewMsgType = ko.observable();
  
    MessagesView.NewBody = ko.observable('');
    MessagesView.NewToos = ko.observableArray();
    MessagesView.Newtotext = ko.observable();

    MessagesView.ReplyMessages = ko.observable();

    
    MessagesView.clearselection = function () {
        ko.utils.arrayForEach(MessagesView.listInbox(), function (feature) {
            feature.selectCss('');
        });
        ko.utils.arrayForEach(MessagesView.listSent(), function (feature) {
            feature.selectCss('');
        });

        ko.utils.arrayForEach(MessagesView.listTrash(), function (feature) {
            feature.selectCss('');
        });
    }
    MessagesView.listclick = function (item) {
        MessagesView.clearselection();
        ko.utils.arrayForEach(MessagesView.listAll(), function (feature) {
            if (item.sys_key() == feature.sys_key()) {
                feature.selectCss('selected');
                if (feature.MsgStatus() == 1) {
                    var ob = objMenuViewModel.Messagecounts();
                    ob -= 1;
                    if (ob < 0) {
                        ob = 0;
                    }
                    objMenuViewModel.Messagecounts(ob);
                }
                feature.MsgStatus(2);
            } else {
                feature.selectCss('');
            }
        });
        //----------------------------------------
        ko.utils.arrayForEach(MessagesView.MessageNotificationList(), function (feature) {
            if (item.sys_key() == feature.Mskey()) {
                feature.MsgStatus(2);
            } 
        });
        //----------------------------------------

        if (MessagesView.ShowInbox() == true) {
            MessagesView.allowReplay(true);
            MessagesView.allowReplayALL(true);
            MessagesView.CRevieverKey(item.RevieverKey());
        } else if (MessagesView.ShowSent() == true) {
            MessagesView.allowReplay(true);
            MessagesView.allowReplayALL(false);
            MessagesView.CRevieverKey('-1');
        } else if (MessagesView.ShowTrash() == true) {
            MessagesView.allowReplay(false);
            MessagesView.allowReplayALL(false);
            MessagesView.CRevieverKey('-1');
        }
        MessagesView.displayMessages(item.sys_key());
    }

    MessagesView.listclickNot = function (item) {
        // self.Mskey = ko.observable(Mskey);

        MessagesView.Inboxing();
        MessagesView.clearselection();
        ko.utils.arrayForEach(MessagesView.listAll(), function (feature) {
            if (item.Mskey() == feature.sys_key()) {
                feature.selectCss('selected');
                if (feature.MsgStatus() == 1) {
                    var ob = objMenuViewModel.Messagecounts();
                    ob -= 1;
                    if (ob < 0) {
                        ob = 0;
                    }
                    objMenuViewModel.Messagecounts(ob);
                }
                feature.MsgStatus(2);
            } else {
                feature.selectCss('');
            }
        });
        //----------------------------------------
        ko.utils.arrayForEach(MessagesView.MessageNotificationList(), function (feature) {
            if (item.Mskey() == feature.Mskey()) {
                feature.MsgStatus(2);
            }
        });
        //----------------------------------------
     
        MessagesView.allowReplay(true);
        MessagesView.allowReplayALL(true);
        MessagesView.CRevieverKey('-1');
        MessagesView.displayMessages(item.Mskey());



    }

   MessagesView.displayMessages = function (msgKey) {
       var url = "";
       url = "/MainMenuOthersAPI/api/Messages/Dashborad_MessagesGetAnyMessages?MsgKey=" + msgKey + "&staff_key=" + MessagesView.staff_key();
       $.getJSON(url, function (CurrentMessage) {
           MessagesView.trurnNew0View1(1);
           MessagesView.Csys_key ( CurrentMessage.sys_key);
           MessagesView.CMsgType ( CurrentMessage.MsgType);
           MessagesView.CMsgTitle ( CurrentMessage.MsgTitle);
           MessagesView.CMsgBody ( CurrentMessage.MsgBody);
           MessagesView.CMsgStatus (CurrentMessage.MsgStatus);
           MessagesView.CMsgAddDate ( CurrentMessage.MsgAddDate);
           MessagesView.CMsgFrom ( CurrentMessage.MsgFrom);
           MessagesView.CMsgText ( CurrentMessage.MsgText);
           MessagesView.CMsgFromtxt ( CurrentMessage.MsgFromtxt);
           MessagesView.CMessageType ( CurrentMessage.MessageType);
           MessagesView.CMessageStatus (CurrentMessage.MessageStatus);
           MessagesView.CMessageReplies(CurrentMessage.MessageReplies);
           if (CurrentMessage.allFiles == "") {
               MessagesView.CMessageRFils([]);
           } else {
               var files = []
               var allFiles = CurrentMessage.allFiles.split('|');
               for (var i = 0; i < allFiles.length; i++) {
                   var ounfile = allFiles[i];
                   var ounfile2 = ounfile.split("~");
                   if (ounfile2.length > 1) {
                       var theNewFile = {}
                       theNewFile.url = "\\Images\\emailfiles\\" + ounfile2[1];
                       theNewFile.name = ounfile2[0];
                       files.push(theNewFile);
                   }
                   
               }
               MessagesView.CMessageRFils(files);
               //console.log(files);s
          }
           

           

           var loadtype;
           if (MessagesView.ShowInbox() == true) {
               loadtype = 2;
           } else if (MessagesView.ShowSent() == true) {
               loadtype = 3;
           } else if (MessagesView.ShowTrash() == true) {
               loadtype = 4;
           }
           MessagesView.CType(loadtype);

           var txt = "<br />" + MessagesView.Signature() + "<br />----------------------------------------------------------------<br />";
           txt += "From:" + CurrentMessage.MsgFromtxt + "<br />";
           txt += "Sent:" + CurrentMessage.MsgAddDate + "<br />";
           txt += "To:" + CurrentMessage.MsgText + "<br />";
           txt += "Subject:" + CurrentMessage.MsgTitle + "<br />";
           txt += "<br />" + CurrentMessage.MsgBody + "<br />";
           txt = txt.split("<br />").join("\n");
           MessagesView.NewBody(txt);
           //$('#DebugContainer').scrollTop($('#DebugContainer')[0].scrollHeight - $('#DebugContainer')[0].clientHeight);


       });
    }
   MessagesView.sentMessage = function () {

       url = "/MainMenuOthersAPI/api/Messages/Dashborad_MessagesSent";
       var title = General_ValdateText(MessagesView.NewTitle());
       var body = General_ValdateText(MessagesView.NewBody());
      

       body = body.replace(/(?:\r\n|\r|\n)/g, '<br />');

     


       if (body.trim().length < 5 | title.length < 5 | MessagesView.selectList().length == 0) {
           if (body.trim().length < 5 | body == "undefined" | body == undefined) {
               FireToster_Errort($.i18n('missingmsgbody'), '');
               return;
           }
           if (title.trim().length < 5 | title=="undefined" | title ==undefined) {
               FireToster_Errort($.i18n('missingmsgtitle'), '');
               return;
           }
           if (MessagesView.selectList().length == 0) {
               FireToster_Errort($.i18n('missingmsglists'), '');
               return;
           }

        
           return;
       }

       var toos = "";
       var toostext = "";
       var data = MessagesView.selectList()
       for (var i = 0; i < data.length; ++i) {
           if (toos == "") {
               toos = data[i].codeKey;
               toostext = data[i].Latindesc;
           } else {
               toos = toos + "," + data[i].codeKey;
               toostext = toostext + "," + data[i].Latindesc;
           }
       }
      var dataToPass = {
          "MsgType": 1,
          "MsgTitle": title,
          "MsgBody": body,
          "MsgFrom": MessagesView.staff_key(),
          "MsgTo": toos,
          "MsgText": toostext,
          "MsgHospitlaid": MessagesView.hospid(),
          "attachKey": MessagesView.IdKey()
      };
      var taoster = FireTosterdash_success($.i18n('sendmessages'), title);
      $.post(url, dataToPass).done(function (output) {
          toastr.clear(taoster);
          MessagesView.LoadOffileAttachs([]);
          if (output == 'error') {
               FireToster_Errort($.i18n('errorsendmsg'), title);
           } else {
               FireToster_successt($.i18n('donesendmsg'), title);
               var message = "";
               var MsgKey = output.split(",")[0].replace("-", "");
               output=output.replace("-"+MsgKey + ",", "")
               message = "MSG~" + MsgKey + "~" + title + "~" + body.substring(0, 50) + "~" + AllPublicGeneralData.StaffEname;
               General_MmenuChat_ToList(output, message)
               MessagesView.RefreshAll();
            }
       }).fail(function (output) {
           FireToster_Errort($.i18n('errorsendmsg'), title);
           toastr.clear(taoster);
           console.log(output);
           
       });


   }
   MessagesView.fileuplchange  = function (obj, elem) {
       if ($(elem.currentTarget).get(0).files.length > 0) {
           var myFile = $(elem.currentTarget).get(0).files[0];
           var fileName = myFile.name.replace(/ /g, '_');
           var myType = myFile.type;
           var size = myFile.size;
           if (myType.toLowerCase() == "") {
               alert("Wrong file, please select right one. \n" +
               "Supported types: [xlx, pdf, doc, image] Supported Size <1.5 MB ");
               var input = $("#upliadFile");
               input = input.val('').clone(true);
               $('#label_fileup').text('');
               return;
           }
           if (myType.toLowerCase() != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' & myType.toLowerCase() != 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' & myType.toLowerCase() != 'application/pdf' & myType.toLowerCase() != 'text/plain' & myType.toLowerCase().substring(0, 6) != 'image/' & size > 1500) {//text/plain
               $(elem.currentTarget).val('');
               alert("Wrong file, please select right one. \n" +
                   "Supported types: [xlx, pdf, doc, image] Supported Size <1.5 MB ");
               var input = $("#upliadFile");
               input = input.val('').clone(true);
               $('#label_fileup').text('');
               return;
           }
           else {
               var formdata = new FormData();
               formdata.append("fileup", myFile);
               var ajax = new XMLHttpRequest();
               ajax.upload.addEventListener("progress", function (oEvent) {
                   progressHandler(oEvent, 'prgrsBar_fileup', 'label_fileup')
               }, false);
               ajax.addEventListener("load", function (oEvent) {
                   completeHandler(oEvent, 'prgrsBar_fileup', 'label_fileup')
                   MessagesView.LoadOffileAttachs();
                   var input = $("#upliadFile");
                   input = input.val('').clone(true);
                   $('#label_fileup').text('');

               }, false);
               ajax.addEventListener("error", function (oEvent) {
                   errorHandler(oEvent, 'label_fileup')
               }, false);
               ajax.addEventListener("abort", function (oEvent) {
                   abortHandler(oEvent, 'label_fileup')
               }, false);
               var Newmakeid = makeid();
               var methodPath = "/MainMenuOthersAPI/api/Messages/postFile?hospID="
                   + MessagesView.hospid() + "&dbCode=" + AllPublicGeneralData.Dbcode + "&ExtendFilesNames=" + Newmakeid + "&CurrentStaff=" + MessagesView.staff_key() + "&IdKey=" + MessagesView.IdKey();
               ajax.open("POST", methodPath);
               try {
                   $('#prgrsBar_fileup').show();
                   ajax.send(formdata);
                   
               } catch (e) {
                   alert(e.message);
               }
           }
       }
       else {
           $(elem.currentTarget).val('');
           
           //loader('remove');
       }
   };
   
   MessagesView.ReplayMessageOne = function () {
       MessagesView.ReplayMessage(-2);
   }
   MessagesView.ReplayMessageALL = function () {
       MessagesView.ReplayMessage(-3);
   }



   MessagesView.ReplayMessage = function (type) {
       //type (-2)--Reply Only
       //type (-3)--Rely To All
       //type (-1) -- will be chat  and CRevieverKey >0
       url = "/MainMenuOthersAPI/api/Messages/Dashborad_MessagesReplayToMessage";
       var body = General_ValdateText(MessagesView.NewBody());
       body = body.replace(/(?:\r\n|\r|\n)/g, '<br />');
    if (body.trim().length < 5 ) {
           FireToster_Errort($.i18n('missingdata'), '');
           return;
       }
       var dataToPass = {
           "reciverKey": MessagesView.CRevieverKey(),
           "MSGReplyText": body,
           "MSGFrom": MessagesView.staff_key(),
           "MSGTo": type,// is it will be the type of Messages
           "hospitalid": MessagesView.hospid(),
           "Msgkey": MessagesView.Csys_key()
       };
       var newtitle = "RE:"+MessagesView.CMsgTitle();
       var taoster = FireTosterdash_success($.i18n('sendmessages'), newtitle);
       $.post(url, dataToPass).done(function (output) {
           toastr.clear(taoster);
           console.log(output);
           MessagesView.LoadOffileAttachs([]);
               if (output == 'error') {
                   FireToster_Errort($.i18n('errorsendmsg'), newtitle);
               } else {

                   var MsgKey = output.split(",")[0].replace("-", "");
                   output = output.replace("-"+MsgKey + ",", "")
                   //alert(MsgKey);
                   FireToster_successt($.i18n('donesendmsg'), newtitle);
                   if (MessagesView.CRevieverKey() != -1) {
                       MessagesView.displayMessages(MessagesView.Csys_key());
                       MessagesView.NewBody('');
                   } else if (output.split(',').length > 0) {
                       MessagesView.RefreshAll();
                   }
                   var message = "";
                   message = "MSG~" + MsgKey + "~" + 'RE:' + MessagesView.CMsgTitle() + "~" + body.substring(0, 50) + "~" + MessagesView.CMsgFromtxt().substring(0, 50);
                   General_MmenuChat_ToList(output, message)
                   MessagesView.RefreshAll();
               }
       }).fail(function (output) {
           FireToster_Errort($.i18n('errorsendmsg'), newtitle);
           toastr.clear(taoster);
           console.log(output);
       });
   }

   MessagesView.clearAfterAdd = function () {

       MessagesView.NewTitle('');
       MessagesView.NewMsgType(1);
       MessagesView.NewBody('');
       MessagesView.NewToos('');
       MessagesView.Newtotext('');
       MessagesView.searchtoText('');
       MessagesView.searchType('4');
       MessagesView.searchtolist([]);
       MessagesView.selectList([]);
   
   }

   MessagesView.MessagesActions = function (msgKey, action_type) {
       var url = "";
       url = "/MainMenuOthersAPI/api/Messages/Dashborad_MessagesActions?msgkey=" + msgKey + "&staff_key=" + MessagesView.staff_key() + "&action_type=" + action_type;
       $.getJSON(url, function (output) {
           FireToster_successt($.i18n('generalsavd'), '');
           if (output == 'true') {
               if (action_type == 3 | action_type == 4) {
                   MessagesView.DeletMSGAfter();
               }
           } else {

           }

       }).fail(function (output) {
           FireToster_Errort($.i18n('errorinsave'), '');
           
           console.log(output);
       });
   }
   MessagesView.DeletMSG = function () {
       var loadtype=MessagesView.CType();
       if (loadtype == 4) {
           MessagesView.MessagesActions(MessagesView.Csys_key(), 4);
       } else {
           MessagesView.MessagesActions(MessagesView.Csys_key(), 3);
       }

   }
   MessagesView.DeletMSGAfter = function () {
      var loadtype = MessagesView.CType();
       var test = null;
       ko.utils.arrayForEach(MessagesView.listInbox(), function (feature) {
           if (feature.sys_key() == MessagesView.Csys_key()) {
               test = feature;
               
               return;
           }
       });
       if (test != null) {
           MessagesView.listTrash.push(test);
           MessagesView.listInbox.remove(test);
       }
       test = null;
       ko.utils.arrayForEach(MessagesView.listAll(), function (feature) {
           if (feature.sys_key() == MessagesView.Csys_key()) {
               test = feature;
               return;
           }
       });
       if (test != null) {
           MessagesView.listInbox.remove(test);
       }
       test = null;
       ko.utils.arrayForEach(MessagesView.listSent(), function (feature) {
           if (feature.sys_key() == MessagesView.Csys_key()) {
               test = feature;
               return;
           }
       });
       if (test != null) {
           MessagesView.listSent.remove(test);
       }
       

       test = null;
       ko.utils.arrayForEach(MessagesView.listTrash(), function (feature) {
           if (feature.sys_key() == MessagesView.Csys_key()) {
               test = feature;
               
               return;
           }
       });
       if (test != null & loadtype!=2) {
           MessagesView.listTrash.remove(test);
       }
       
    
       if (loadtype == 2) {
           MessagesView.Inboxing();
       

       } else if (loadtype == 3) {
           MessagesView.sending();
       } else if (loadtype == 4) {
           MessagesView.trashing();
       }


       MessagesView.composeMessage();

   }
   MessagesView.MarkUnRead = function () {
       MessagesView.MessagesActions(MessagesView.Csys_key(), 1);
       ko.utils.arrayForEach(MessagesView.listInbox(), function (feature) {
           if (feature.sys_key() == MessagesView.Csys_key()) {
               feature.MsgStatus(1);
           }
           
       });
       ko.utils.arrayForEach(MessagesView.listAll(), function (feature) {
           if (feature.sys_key() == MessagesView.Csys_key()) {
               feature.MsgStatus(1);
           }
       });



   }
}


function MsgListTop(date, fromTxt, MsgTitle, MsgBody, Mskey, MsgStatus) {
    var self = this;
    self.date = ko.observable(date);
    //self.title = ko.observable(title);
    //self.body = ko.observable(body);
    self.Mskey = ko.observable(Mskey);

    self.data1= ko.observable(fromTxt)
    self.data2= ko.observable(MsgTitle)
    self.data3= ko.observable(MsgBody)


    self.MsgStatus = ko.observable(MsgStatus);
    self.StatClass = ko.computed(function () {
        if (self.MsgStatus() == 1) {
            return "unread";
        } else {
            return "thumb";
        }
    })
}
function Msglisttemp(msglist,type) {
        var self = this;
        self.sys_key = ko.observable(msglist.sys_key);
        self.MsgType = ko.observable(msglist.MsgType);
        self.MsgStatus = ko.observable(msglist.MsgStatus);
        self.MsgTitle = ko.observable(msglist.MsgTitle);
        self.MsgBody = ko.observable(msglist.MsgBody);
        self.MsgAddDate = ko.observable(msglist.MsgAddDate);
        self.MsgText = ko.observable(msglist.MsgText);
        self.RepayCount = ko.observable(msglist.RepayCount);
        self.fromTxt = ko.observable(msglist.fromTxt);
        self.RevieverKey = ko.observable(msglist.RevieverKey);
        self.StatClass = ko.computed(function () {
            if (self.MsgStatus() == 1) {
                return "unread";
            } else {
                return "thumb";
            }
        })
        self.selectCss = ko.observable('');
        self.data1 = ko.observable('');
        self.data2 = ko.observable('');
        self.data3 = ko.observable('');
        if (type == 2 | type == 4) {//ShowInbox,trash
            self.data1(msglist.fromTxt);
            self.data2(msglist.MsgTitle);
            self.data3(msglist.MsgBody);
        }
        if (type == 3) {//ShowSent
            self.data1(msglist.MsgTitle);
            self.data2(msglist.MsgText);
            self.data3(msglist.MsgBody);
            self.MsgStatus(2);
        }
}

function _(el) {
    return document.getElementById(el);
}

function progressHandler(event, barName, labelName) {
    var percent = (event.loaded / event.total) * 100;
    _(barName).value = Math.round(percent);
    _(labelName).innerHTML = Math.round(percent) + "% uploaded... please wait";
}
function completeHandler(event, barName, labelName) {
    _(labelName).innerHTML = (event.target.responseText).replace(/"/g, '');
    _(barName).value = 0;
    $('#' + barName).hide();
    //loader('remove');
}
function errorHandler(event, labelName) {
    _(labelName).innerHTML = "Upload Failed";
    //loader('remove');
}
function abortHandler(event, labelName) {
    _(labelName).innerHTML = "Upload Aborted";
    //loader('remove');
}


function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

console.log(makeid());

function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    link.click();
}

/////////////////////////////////////////////////////////////////////////////////

var GeneralMenusRelvant;
function MenusRelvantViewModel() {
    var MenusRelvant = this;
    GeneralMenusRelvant = MenusRelvant;
    MenusRelvant.MenusId = ko.observable();

    MenusRelvant.MyRelvants = ko.observableArray();
    MenusRelvant.AllMenus = ko.observableArray();

    MenusRelvant.filterEdit = ko.observable('');
    MenusRelvant.FilterShow = ko.observable('');

    MenusRelvant.FilterMyRelvants = ko.computed(function () {
        var filter = MenusRelvant.FilterShow().toLowerCase();
        var usfilter;
        if (!filter) {
            usfilter = false;
        } else {
            usfilter = true;
        }

        if (!filter ) {
            return MenusRelvant.MyRelvants();
        } else {
            return ko.utils.arrayFilter(MenusRelvant.MyRelvants(), function (item) {
                return ((item.txt().toLowerCase().indexOf(filter) !== -1));
            });
        }
    });

    MenusRelvant.FilterAllMenus = ko.computed(function () {
        var filter = MenusRelvant.filterEdit().toLowerCase();
        var usfilter;
        if (!filter) {
            usfilter = false;
        } else {
            usfilter = true;
        }

        if (!filter) {
            return MenusRelvant.AllMenus();
        } else {
            return ko.utils.arrayFilter(MenusRelvant.AllMenus(), function (item) {
                return ((item.txt().toLowerCase().indexOf(filter) !== -1));
            });
        }
    });



    MenusRelvant.firstLoad = ko.observable(false);


    MenusRelvant.AllowOpen = ko.observable(true);
    MenusRelvant.AllowEdit = ko.observable(false);
    MenusRelvant.AllowClose = ko.observable(false);
    MenusRelvant.AllowShow = ko.observable(false);


    MenusRelvant.Showing = ko.observable('listbox-showItem');
    MenusRelvant.Hiding = ko.observable('listbox-hideItem');
    MenusRelvant.EditClass = ko.observable('');
    MenusRelvant.ShowClass = ko.observable('');


    MenusRelvant.setMenusId = function (MenuId) {
        MenusRelvant.MenusId(MenuId);
    }
    MenusRelvant.disableDetails = function () {
        MenusRelvant.AllowShow(false);
        MenusRelvant.AllowOpen(true);
        MenusRelvant.AllowEdit(false);
        MenusRelvant.AllowClose(false);
        MenusRelvant.EditClass(MenusRelvant.Hiding());
        MenusRelvant.ShowClass(MenusRelvant.Hiding());
        MenusRelvant.AllMenus([]);
    }
    MenusRelvant.Openfirst = function () {
        MenusRelvant.AllowShow(true);
        MenusRelvant.AllowOpen(false);
        MenusRelvant.AllowEdit(true);
        MenusRelvant.AllowClose(false);
        MenusRelvant.EditClass(MenusRelvant.Hiding());
        MenusRelvant.ShowClass(MenusRelvant.Showing());
        if (MenusRelvant.firstLoad() == false) {
            MenusRelvant.loadRelvants();
            MenusRelvant.firstLoad(true);
        }
    }
    MenusRelvant.oldMenus = ko.observable();

    MenusRelvant.OpenEdit = function () {
        MenusRelvant.filterEdit('');
        var AllMenus = [];
        for (i = 0; i < objMenuViewModel.AllmenusItems().length; i++) {
            var item = objMenuViewModel.AllmenusItems()[i];

            if (item.ParentKey > 0 & item.OreginalURL != '' & item.sys_key != MenusRelvant.MenusId()) {
                var isExist = false;
                var Sort = 1;
                for (h = 0; h < MenusRelvant.MyRelvants().length;h++) {
                    var item2 = MenusRelvant.MyRelvants()[h];
                    if (item2.RevanetMenusId() == item.sys_key) {
                        isExist = true;
                        Sort = 0;
                      }
                }
                AllMenus.push(new ONERelvant_clsAll(item.sys_key, item.Description, item.IconFile, isExist, Sort, item.path));
             }
         }
        MenusRelvant.AllMenus(AllMenus);
        MenusRelvant.AllMenus.sort(function (left, right) { return left.sort() == right.sort() ? 0 : (left.sort() < right.sort() ? -1 : 1) })
        MenusRelvant.oldMenus("");
        var AllRevanetMenusId = "";
        for (i = 0; i < MenusRelvant.AllMenus().length; i++) {
            var item = MenusRelvant.AllMenus()[i];
            if (item.isExist() == true) {
                if (AllRevanetMenusId == "") {
                    AllRevanetMenusId = item.sys_key();
                } else {
                    AllRevanetMenusId = AllRevanetMenusId + "," + item.sys_key();
                }
            }

        }
        MenusRelvant.oldMenus(AllRevanetMenusId);

        MenusRelvant.EditClass(MenusRelvant.Showing());
        MenusRelvant.ShowClass(MenusRelvant.Hiding());
        MenusRelvant.AllowEdit(false);
        MenusRelvant.AllowClose(true);
    }
    MenusRelvant.CloseEdit = function () {
        var AllRevanetMenusId = "";
        for (i = 0; i < MenusRelvant.AllMenus().length; i++) {
            var item = MenusRelvant.AllMenus()[i];
            if (item.isExist() == true) {
                if (AllRevanetMenusId == "") {
                    AllRevanetMenusId = item.sys_key();
                } else {
                    AllRevanetMenusId =AllRevanetMenusId+","+ item.sys_key();
                }
            }
        }
        if (MenusRelvant.oldMenus() == AllRevanetMenusId) {
            MenusRelvant.Openfirst();
        } else {
            var url = "";
            url = "/MainMenuOthersAPI/api/OtherMenusActions/Dashborad_Relevant_AddRelevantMenu?AllRevanetMenusId=" + AllRevanetMenusId + "&Staff_key=" + AllPublicGeneralData.staff_key + "&HospId=" + AllPublicGeneralData.Hospid + "&MenusID=" + MenusRelvant.MenusId();
            $.getJSON(url, function (CurrentMessage) {
               
                MenusRelvant.loadRelvants();
                    MenusRelvant.Openfirst();
               
            });

        }

       
    }


    MenusRelvant.OpenModule = function (item) {
        General_OpenModule_Code(item.RevanetMenusId());
    }




    MenusRelvant.RemoveRelvant = function (item) {
        var url = "";
        url = "/MainMenuOthersAPI/api/OtherMenusActions/Dashborad_Relevant_RemoveRelevantMenu?sys_key=" + item.sys_key();
        $.getJSON(url, function (CurrentMessage) {
            if (CurrentMessage == "true") {
                MenusRelvant.MyRelvants.remove(item);
            }
        });
    }
    MenusRelvant.loadRelvants = function () {
        var url = "";
        url = "/MainMenuOthersAPI/api/OtherMenusActions/Dashborad_Relevant_GetRelevantMenu?Staff_key=" + AllPublicGeneralData.staff_key + "&HospId=" + AllPublicGeneralData.Hospid+"&MenusID="+MenusRelvant.MenusId();
        $.getJSON(url, function (CurrentMessage) {
            var mappedstikeynotesall = $.map(CurrentMessage, function (Inpat) {
                var Id = Inpat.RevanetMenusId;
                var CItme = null;
                for (i = 0; i < objMenuViewModel.AllmenusItems().length; i++) {
                    var item = objMenuViewModel.AllmenusItems()[i];
                    if (Id == item.sys_key) {
                        CItme =new  ONERelvant_cls(Inpat, item.Description, item.IconFile);
                    }
                }
                if (CItme != null) {
                    return CItme;
                }


            });
            MenusRelvant.MyRelvants(mappedstikeynotesall);
       });
    }
    MenusRelvant.AddRelvant = function (item) {
        var url = "";
        url = "/MainMenuOthersAPI/api/OtherMenusActions/Dashborad_Relevant_AddRelevantMenu?RevanetMenusId=" + item.RevanetMenusId ()+ "&Staff_key=" + AllPublicGeneralData.staff_key + "&HospId=" + AllPublicGeneralData.Hospid + "&MenusID=" + MenusRelvant.MenusId();
        $.getJSON(url, function (CurrentMessage) {
            if (CurrentMessage == "true") {
                MenusRelvant.loadRelvants
            }
        });
    }
}
function ONERelvant_cls(Relvant,txt,Icons) {
    var self = this;
    self.sys_key = ko.observable(Relvant.sys_key);
    self.RevanetMenusId = ko.observable(Relvant.RevanetMenusId);
    self.txt = ko.observable(txt);
    self.Icons = ko.observable(Icons);
}

function ONERelvant_clsAll(sys_key, txt, Icons, isExist, Sort, path) {
    var self = this;
    self.sys_key = ko.observable(sys_key);

    self.sort = ko.observable(Sort);

    self.txt = ko.observable(txt);
    self.path = ko.observable(path);
    
    self.Icons = ko.observable('');
    self.isExist = ko.observable(isExist);
    if (isExist == true) {
        self.Icons(Icons);
        }
    


    self.checkedClass = ko.computed(function () {
        if (self.isExist() == true) {
            return "select-checked";
        } else {
            return "";
        }
    });
    self.itemClick = function () {
        if (self.isExist() == true) {
            self.isExist(false);
        } else {
            self.isExist(true);
        }
    }

}


