// Decompiled with JetBrains decompiler
// Type: BedManagement.NursestationsController
// Assembly: BedManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: B1AAAA54-FA00-409D-B762-EDD976360563
// Assembly location: C:\Users\Dell\Downloads\pharmacy\BedWhiteBoardWeb_Deploy\bin\BedManagement.dll

using MedicaDAL;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;

namespace BedManagement
{
  public class NursestationsController : ApiController
  {
    private DBInteraction objDB;

// paramertrize and  done by khalifa
    [ActionName("CheckForDischargeDoc")]
    [HttpGet]
    public  int CheckForDischargeDoc(string patId, string epskey, string DocCode, string orderkey)
    {
      string query = "select count(*) as cnt from  TemplatesOrders  where Patient_Id =  @patId  and Episode_Key = @epskey and Status = 1   and Signedby is not null  and def_key = @DocCode";
      if (this.objDB == null)
        this.objDB = new DBInteraction(true);
            Dictionary<string, object> allParams = new Dictionary<string, object>();
            allParams.Add("@patId", patId);
            allParams.Add("@epskey", epskey);
            allParams.Add("@DocCode", DocCode);

         
            return (int)this.objDB.ExecScalarQuery(query, allParams);
        }

// edit * by khalifa to fix reader && paramertrize  done 
    public IEnumerable<NurseStation> Get(string uId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
                // IDataReader reader = this.objDB.ExecReaderQuery("SELECT [SYS_KEY],[LATIN_DESC],[NS_Image]  FROM [NURSESTATIONSWITHBEDS] WHERE staff_key='" + uId + "'");
                Dictionary<string, object> userParam = new Dictionary<string, object>();
                userParam.Add("@uId", uId);
                 IDataReader reader =  this.objDB.ExecReaderQuery("SELECT * FROM [NURSESTATIONSWITHBEDS] WHERE staff_key=@uId", userParam);
                using (reader)
          return (IEnumerable<NurseStation>) reader.Select<NurseStation>(new Func<IDataReader, NurseStation>(NurseStation.Mapping)).ToList<NurseStation>();
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

    [ActionName("GetIP")]
    public string GetIP()
    {
      if (this.objDB == null)
        this.objDB = new DBInteraction(true);
      return this.objDB.GetWebServerPath;
    }

    [ActionName("GetServerTime")]
    public string GetServerTime() => DateTime.Now.ToString("s");


// paramertrize done by khalifa
    [ActionName("GetNurseStationsWithSummary")]
    public  IEnumerable<NurseStation> GetNurseStationsWithSummary(string uId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
                Dictionary<string, object> allParams = new Dictionary<string, object>();
                allParams.Add("@uId", uId);
        IDataReader reader = this.objDB.ExecReaderQuery("SELECT [SYS_KEY],[LATIN_DESC],[NS_Image],[occupiedPat],[PatAdmission],[PatDischarge],[DAMA],[OutOnPass],[pendingDis],[T_in],[T_Out],[emptyBeds] FROM [NURSESTATIONSWITHBEDS] WHERE staff_key=@uId",allParams);
        using (reader)
          return (IEnumerable<NurseStation>) reader.Select<NurseStation>(new Func<IDataReader, NurseStation>(NurseStation.Mapping)).ToList<NurseStation>();
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }


  // paramertrize  done by khalifa
        [ActionName("GetNurseStationWithSummary")]
    public IEnumerable<NurseStation> GetNurseStationsWithSummary(
      int ns_id,
      string uId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
                Dictionary<string, object> allParams = new Dictionary<string, object>();
                allParams.Add("@ns_id", ns_id.ToString());
                allParams.Add("@uId", uId);

                IDataReader reader =  this.objDB.ExecReaderQuery("SELECT [SYS_KEY],[LATIN_DESC],[NS_Image],[occupiedPat],[PatAdmission],[PatDischarge],[DAMA],[OutOnPass],[pendingDis],[T_in],[T_Out],[emptyBeds] FROM [NURSESTATIONSWITHBEDS] WHERE sys_key=@ns_id AND staff_key=@uId",allParams);
        using (reader)
          return (IEnumerable<NurseStation>) reader.Select<NurseStation>(new Func<IDataReader, NurseStation>(NurseStation.Mapping)).ToList<NurseStation>();
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }


  // paramertrize done by khalifa
        [ActionName("GetNurseStationsWithAlerts")]
    public  IEnumerable<NurseStation> GetNurseStationsWithAlerts(
      string startDate,
      string NsType,
      string uId,
      string hospId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
                Dictionary<string, object> DateParam = new Dictionary<string, object>();
                DateParam.Add("@startDate", startDate);
        IDataReader reader1 = this.objDB.ExecReaderQuery("select nursestationcode as NS_key,StatusName as Alert_Name, 'ns' as Alert_Type, StatusName + ' ('  + LTRIM(RTRIM(str(count(bed_key)))) + ')' as ToolTip, Icon,Color from GetBedsListEx(convert(date,@startDate)) bl  inner join hospstruct on bed_key = sys_key inner join NurseStationsRooms on room_key = parent_key group by nursestationcode,StatusName,Color,Icon UNION select [NS_Key] as NS_key,'FREE BEDS' as Alert_Name, 'ns' as Alert_Type, 'FREE BEDS('  + LTRIM(RTRIM(str(sum(BedsCount - OccupiedBeds)))) + ')' as ToolTip, 'bwb_BedFree.gif' as Icon,'#4CC417' as Color from RoomOccupancyNS group by NS_key" , DateParam);
        List<NurseStation.NurseStationAlerts> list1;
        using (reader1)
          list1 = reader1.Select<NurseStation.NurseStationAlerts>(new Func<IDataReader, NurseStation.NurseStationAlerts>(NurseStation.NurseStationAlerts.Mapping)).ToList<NurseStation.NurseStationAlerts>();
        IDataReader reader2;
                Dictionary<string, object> ParamsWithHos = new Dictionary<string, object>();
                ParamsWithHos.Add("@hospId", hospId);
                ParamsWithHos.Add("@NsType", NsType);
                ParamsWithHos.Add("@uId", uId);

                Dictionary<string, object> allParam = new Dictionary<string, object>();
                allParam.Add("@NsType", NsType);
                allParam.Add("@uId", uId);

                if (hospId == "-1")
          reader2 = this.objDB.ExecReaderQuery("SELECT [SYS_KEY],[LATIN_DESC],[NS_Image],[occupiedPat],[PatAdmission],[PatDischarge],[DAMA],[OutOnPass],[pendingDis],[T_in],[T_Out],[emptyBeds],[NSType] FROM [NURSESTATIONSWITHBEDS] WHERE NsType=@NsType AND staff_key=@uId",allParam);
        else
          reader2 = this.objDB.ExecReaderQuery("SELECT [SYS_KEY],[LATIN_DESC],[NS_Image],[occupiedPat],[PatAdmission],[PatDischarge],[DAMA],[OutOnPass],[pendingDis],[T_in],[T_Out],[emptyBeds],[NSType] FROM fn_NURSESTATIONSWITHBEDS(@hospId) WHERE NsType=@NsType AND staff_key=@uId", ParamsWithHos);
        using (reader2)
        {
          IEnumerable<NurseStation> list2 = (IEnumerable<NurseStation>) reader2.Select<NurseStation>(new Func<IDataReader, NurseStation>(NurseStation.Mapping)).ToList<NurseStation>();
          foreach (NurseStation nurseStation in list2)
          {
            NurseStation ns = nurseStation;
            ns.alerts = list1.Where<NurseStation.NurseStationAlerts>((Func<NurseStation.NurseStationAlerts, bool>) (a => (long) a.NS_key == ns.sys_key)).ToList<NurseStation.NurseStationAlerts>();
            List<NurseStation.NurseStationAlerts> list3 = list1.Where<NurseStation.NurseStationAlerts>((Func<NurseStation.NurseStationAlerts, bool>) (a => (long) a.NS_key == ns.sys_key && a.alert_name == "OCCUPIED (MALE)")).ToList<NurseStation.NurseStationAlerts>();
            List<NurseStation.NurseStationAlerts> list4 = list1.Where<NurseStation.NurseStationAlerts>((Func<NurseStation.NurseStationAlerts, bool>) (a => (long) a.NS_key == ns.sys_key && a.alert_name == "OCCUPIED (FEMALE)")).ToList<NurseStation.NurseStationAlerts>();
            ns.occupiedMale = list3.Count <= 0 ? 0L : (long) int.Parse(list3[0].toolTip.Replace("OCCUPIED (MALE)", "").Replace("(", "").Replace(")", "").Trim());
            ns.occupiedFemale = list4.Count <= 0 ? 0L : (long) int.Parse(list4[0].toolTip.Replace("OCCUPIED (FEMALE)", "").Replace("(", "").Replace(")", "").Trim());
            ns.occupiedPat = ns.occupiedMale + ns.occupiedFemale;
          }
          return list2;
        }
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }


        // paramertrize  done by khalifa
   [ActionName("GetNurseStationsWithAlertsER")]
    public  IEnumerable<NurseStation> GetNurseStationsWithAlertsER(
      string NsType,
      string uId,
      string hospId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        IDataReader reader;
                Dictionary<string, object> ParamsWithHos = new Dictionary<string, object>();
                ParamsWithHos.Add("@hospId", hospId);
                ParamsWithHos.Add("@NsType", NsType);
                ParamsWithHos.Add("@uId", uId);

                Dictionary<string, object> allParam = new Dictionary<string, object>();
                allParam.Add("@NsType", NsType);
                allParam.Add("@uId", uId);

        if (hospId == "-1")
          reader = this.objDB.ExecReaderQuery("SELECT [SYS_KEY],[LATIN_DESC],[NS_Image],[occupiedPat],[PatAdmission],[PatDischarge],[DAMA],[OutOnPass],[pendingDis],[T_in],[T_Out],[emptyBeds],[NSType],[clinic_code] FROM [NURSESTATIONSWITHBEDS_ER] WHERE NsType=@NsType AND staff_key=@uId", allParam);
        else
          reader =  this.objDB.ExecReaderQuery("SELECT [SYS_KEY],[LATIN_DESC],[NS_Image],[occupiedPat],[PatAdmission],[PatDischarge],[DAMA],[OutOnPass],[pendingDis],[T_in],[T_Out],[emptyBeds],[NSType],[clinic_code] FROM fn_NURSESTATIONSWITHBEDS_ER(@hospId) WHERE NsType=@NsType  AND staff_key=@uId", ParamsWithHos);
        using (reader)
          return  (IEnumerable<NurseStation>) reader.Select<NurseStation>(new Func<IDataReader, NurseStation>(NurseStation.Mapping)).ToList<NurseStation>();
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }


        // paramertrize  done by khalifa
  [ActionName("GetAllNurseStationsWithAlertsER")]
    public  IEnumerable<NurseStation> GetAllNurseStationsWithAlertsER(
      string startDate,
      string NsType,
      string uId,
      string hospId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);

                Dictionary<string, object> withOutHosParams = new Dictionary<string, object>();
                withOutHosParams.Add("@NsType", NsType);
                withOutHosParams.Add("@uId", uId);

                Dictionary<string, object> HosParam = new Dictionary<string, object>();
                HosParam.Add("@NsType", NsType);
                HosParam.Add("@uId", uId);
                HosParam.Add("@hospId", hospId);


                IDataReader reader;
                if (hospId == "-1")
                {
                    reader =   this.objDB.ExecReaderQuery("SELECT [SYS_KEY],[LATIN_DESC],[NS_Image],[occupiedPat],[PatAdmission],[PatDischarge],[DAMA],[OutOnPass],[pendingDis],[T_in],[T_Out],[emptyBeds],[NSType],[clinic_code] FROM [NURSESTATIONSWITHBEDS_ER] WHERE NsType=@NsType AND staff_key=@uId",withOutHosParams);
                }
                else
                {
                    reader = this.objDB.ExecReaderQuery("SELECT [SYS_KEY],[LATIN_DESC],[NS_Image],[occupiedPat],[PatAdmission],[PatDischarge],[DAMA],[OutOnPass],[pendingDis],[T_in],[T_Out],[emptyBeds],[NSType],[clinic_code] , [Ord] FROM fn_NURSESTATIONSWITHBEDS_ER(@hospId) WHERE NsType=@NsType AND staff_key=@uId order by Ord", HosParam);

                }
                using (reader)
        {
          IEnumerable<NurseStation> list = (IEnumerable<NurseStation>) reader.Select<NurseStation>(new Func<IDataReader, NurseStation>(NurseStation.Mapping)).ToList<NurseStation>();
          IEnumerable<Room> roomsWbedsWstatus = new RoomsController().GetAllErRoomsWBedsWStatus(startDate, uId);
          IEnumerable<WaitingPatient> allWpEr = new WaitingPatientsController().GetAllWpER(hospId);
          foreach (NurseStation nurseStation in list)
          {
            NurseStation ns = nurseStation;
            ns.rooms = roomsWbedsWstatus.Where<Room>((Func<Room, bool>) (room => (long) room.nursestationcode == ns.sys_key)).ToList<Room>();
            ns.waitingpatients = allWpEr.Where<WaitingPatient>((Func<WaitingPatient, bool>) (wp => wp.nstationcode == ns.sys_key)).ToList<WaitingPatient>();
          }
          return list;
        }
      }
      catch (Exception ex)
      {
        return (IEnumerable<NurseStation>) null;
      }
    }


        // paramertrize  done by khalifa
   [ActionName("GetNurseStationsWithAlertsERWithoutAssign")]
    public  IEnumerable<NurseStation> GetNurseStationsWithAlertsERWithoutAssign(
      string startDate,
      string NsType,
      string hospId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);

                Dictionary<string, object> NsParam = new Dictionary<string, object>();
                NsParam.Add("@NsType", NsType);

                Dictionary<string, object> GetNsParams = new Dictionary<string, object>();
                GetNsParams.Add("@NsType", NsType);
                GetNsParams.Add("@hospId", hospId);
                IDataReader reader;
                if (hospId != "-1")
                {
                    reader =  this.objDB.ExecReaderQuery("SELECT distinct [ord], [SYS_KEY],[LATIN_DESC],[NS_Image],[occupiedPat],[PatAdmission],[PatDischarge],[DAMA],[OutOnPass],[pendingDis],[T_in],[T_Out],[emptyBeds],[NSType],[clinic_code] FROM fn_NURSESTATIONSWITHBEDS_ER_WithoutAssign(@hospId) WHERE NsType=@NsType order by ord", GetNsParams);
                }
                else {
                     reader =   this.objDB.ExecReaderQuery("SELECT distinct [ord], [SYS_KEY],[LATIN_DESC],[NS_Image],[occupiedPat],[PatAdmission],[PatDischarge],[DAMA],[OutOnPass],[pendingDis],[T_in],[T_Out],[emptyBeds],[NSType] FROM [NURSESTATIONSWITHBEDS_ER_WithoutAssign] WHERE NsType=@NsType order by ord", NsParam);
                }
                 using (reader)
                 return (IEnumerable<NurseStation>) reader.Select<NurseStation>(new Func<IDataReader, NurseStation>(NurseStation.Mapping)).ToList<NurseStation>();
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

        // paramertrize done by khalifa
 [ActionName("GetAllNurseStationsWithAlerts")]
    public  IEnumerable<NurseStation> GetAllNurseStationsWithAlerts(
      string startDate,
      string NsType,
      string uId,
      string hospId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
                Dictionary<string, object> DateParam = new Dictionary<string, object>();
                DateParam.Add("@startDate", startDate);
        IDataReader reader1 =this.objDB.ExecReaderQuery("select nursestationcode as NS_key,StatusName as Alert_Name, 'ns' as Alert_Type, StatusName + ' ('  + LTRIM(RTRIM(str(count(bed_key)))) + ')' as ToolTip, Icon,Color from GetBedsListEx(convert(date,@startDate)) bl  inner join hospstruct on bed_key = sys_key inner join NurseStationsRooms on room_key = parent_key group by nursestationcode,StatusName,Color,Icon UNION select [NS_Key] as NS_key,'FREE BEDS' as Alert_Name, 'ns' as Alert_Type, 'FREE BEDS('  + LTRIM(RTRIM(str(sum(BedsCount - OccupiedBeds)))) + ')' as ToolTip, 'bwb_BedFree.gif' as Icon,'#4CC417' as Color from RoomOccupancyNS group by NS_key", DateParam);
        List<NurseStation.NurseStationAlerts> list1;
        using (reader1)
          list1 = reader1.Select<NurseStation.NurseStationAlerts>(new Func<IDataReader, NurseStation.NurseStationAlerts>(NurseStation.NurseStationAlerts.Mapping)).ToList<NurseStation.NurseStationAlerts>();
        IDataReader reader2;
                Dictionary<string, object> withOutHosParams = new Dictionary<string, object>();
                withOutHosParams.Add("@NsType", NsType);
                withOutHosParams.Add("@uId", uId);

                Dictionary<string, object> HosParam = new Dictionary<string, object>();
                HosParam.Add("@NsType", NsType);
                HosParam.Add("@uId", uId);
                HosParam.Add("@hospId", hospId);
        if (hospId == "-1")
          reader2 =this.objDB.ExecReaderQuery("SELECT [SYS_KEY],[LATIN_DESC],[NS_Image],[occupiedPat],[PatAdmission],[PatDischarge],[DAMA],[OutOnPass],[pendingDis],[T_in],[T_Out],[emptyBeds],[NSType] FROM [NURSESTATIONSWITHBEDS] WHERE NsType=@NsType AND staff_key=@uId", withOutHosParams);
        else
          reader2 =this.objDB.ExecReaderQuery("SELECT [SYS_KEY],[LATIN_DESC],[NS_Image],[occupiedPat],[PatAdmission],[PatDischarge],[DAMA],[OutOnPass],[pendingDis],[T_in],[T_Out],[emptyBeds],[NSType] FROM fn_NURSESTATIONSWITHBEDS(@hospId) WHERE NsType=@NsType AND staff_key=@uId", HosParam);
        using (reader2)
        {
          IEnumerable<NurseStation> list2 =  (IEnumerable<NurseStation>) reader2.Select<NurseStation>(new Func<IDataReader, NurseStation>(NurseStation.Mapping)).ToList<NurseStation>();
          IEnumerable<Room> roomsWbedsWstatus = new RoomsController().GetAllRoomsWBedsWStatus(startDate, uId);
          foreach (NurseStation nurseStation in list2)
          {
            NurseStation ns = nurseStation;
            ns.rooms = roomsWbedsWstatus.Where<Room>((Func<Room, bool>) (room => (long) room.nursestationcode == ns.sys_key)).ToList<Room>();
            foreach (Room room in ns.rooms)
            room.beds.RemoveAll((Predicate<Bed>) (b => (long) b.nursestationcode != ns.sys_key));
            ns.alerts = list1.Where<NurseStation.NurseStationAlerts>((Func<NurseStation.NurseStationAlerts, bool>) (a => (long) a.NS_key == ns.sys_key)).ToList<NurseStation.NurseStationAlerts>();
            List<NurseStation.NurseStationAlerts> list3 = list1.Where<NurseStation.NurseStationAlerts>((Func<NurseStation.NurseStationAlerts, bool>) (a => (long) a.NS_key == ns.sys_key && a.alert_name == "OCCUPIED (MALE)")).ToList<NurseStation.NurseStationAlerts>();
            List<NurseStation.NurseStationAlerts> list4 =  list1.Where<NurseStation.NurseStationAlerts>((Func<NurseStation.NurseStationAlerts, bool>) (a => (long) a.NS_key == ns.sys_key && a.alert_name == "OCCUPIED (FEMALE)")).ToList<NurseStation.NurseStationAlerts>();
            ns.occupiedMale = list3.Count <= 0 ? 0L : (long) int.Parse(list3[0].toolTip.Replace("OCCUPIED (MALE)", "").Replace("(", "").Replace(")", "").Trim());
            ns.occupiedFemale = list4.Count <= 0 ? 0L : (long) int.Parse(list4[0].toolTip.Replace("OCCUPIED (FEMALE)", "").Replace("(", "").Replace(")", "").Trim());
            ns.occupiedPat = ns.occupiedMale + ns.occupiedFemale;
          }
          return list2;
        }
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }


        // paramertrize  done by khalifa
   [ActionName("GetOPNurseStations")]
    public IEnumerable<NurseStation> GetOPNurseStations(string uId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
                Dictionary<string, object> UserParam = new Dictionary<string, object>();
                UserParam.Add("@uId", uId);
        IDataReader reader =  this.objDB.ExecReaderQuery("SELECT [SYS_KEY],[LATIN_DESC] FROM [NurseStationsWithBeds_OP] WHERE staff_key=@uId order by LOC_CODE, LATIN_DESC", UserParam);
        using (reader)
          return  (IEnumerable<NurseStation>) reader.Select<NurseStation>(new Func<IDataReader, NurseStation>(NurseStation.MappingOP)).ToList<NurseStation>();
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }



        // paramertrize  done by khalifa
  [ActionName("GetRBNurseStations")]
    public IEnumerable<NurseStation> GetRBNurseStations(string uId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
                Dictionary<string, object> Userparam = new Dictionary<string, object>();
                Userparam.Add("@uId", uId);
        IDataReader reader1 = this.objDB.ExecReaderQuery("select nursestationcode as NS_key,'FREE BEDS' as Alert_Name, 'ns' as Alert_Type, 'FREE BEDS ('  + LTRIM(RTRIM(str(count(*)))) + ')' as ToolTip, 'bwb_BedFree.gif' as Icon,'#4CC417' as Color from [ALLBEDSPATIENTS_RB]\r\n                                                                                    INNER JOIN [NurseStationsRooms] on [ALLBEDSPATIENTS_RB].PARENT_KEY = [NurseStationsRooms].Room_key\r\n                                                                                    where PATIENT_ID is null and (active is null or active = 0) and [ALLBEDSPATIENTS_RB].USERKEY=@uId group by nursestationcode\r\n                                                                                    UNION\r\n                                                                                    select nursestationcode as NS_key,'OCCUPIED (FEMALE)' as Alert_Name, 'ns' as Alert_Type, 'OCCUPIED (FEMALE) ('  + LTRIM(RTRIM(str(count(*)))) + ')' as ToolTip, 'BWB_BEDAVAILABLE.GIF' as Icon,'PINK' as Color from [ALLBEDSPATIENTS_RB]\r\n                                                                                    INNER JOIN [NurseStationsRooms] on [ALLBEDSPATIENTS_RB].PARENT_KEY = [NurseStationsRooms].Room_key\r\n                                                                                    where PATIENT_ID is not null and (active is null or active = 0) and patient_sex = 2 and [ALLBEDSPATIENTS_RB].USERKEY=@uId  group by nursestationcode\r\n                                                                                    UNION\r\n                                                                                    select nursestationcode as NS_key,'OCCUPIED (MALE)' as Alert_Name, 'ns' as Alert_Type, 'OCCUPIED (MALE) ('  + LTRIM(RTRIM(str(count(*)))) + ')' as ToolTip, 'BWB_BEDAVAILABLE.GIF' as Icon,'LIGHTBLUE' as Color from [ALLBEDSPATIENTS_RB]\r\n                                                                                    INNER JOIN [NurseStationsRooms] on [ALLBEDSPATIENTS_RB].PARENT_KEY = [NurseStationsRooms].Room_key\r\n                                                                                    where PATIENT_ID is not null and (active is null or active = 0) and patient_sex = 1 and [ALLBEDSPATIENTS_RB].USERKEY=@uId  group by nursestationcode\r\n                                                                                    UNION\r\n                                                                                    select nursestationcode as NS_key,'BLOCKED BEDS' as Alert_Name, 'ns' as Alert_Type, 'BLOCKED BEDS ('  + LTRIM(RTRIM(str(count(*)))) + ')' as ToolTip, 'bwb_BedFree.gif' as Icon,'#4CC417' as Color from [ALLBEDSPATIENTS_RB]\r\n                                                                                    INNER JOIN [NurseStationsRooms] on [ALLBEDSPATIENTS_RB].PARENT_KEY = [NurseStationsRooms].Room_key\r\n                                                                                    where active = 1 and [ALLBEDSPATIENTS_RB].USERKEY=@uId group by nursestationcode\r\n                                                                                    UNION\r\n                                                                                    select nursestationcode as NS_key,'RESERVED BEDS' as Alert_Name, 'ns' as Alert_Type, 'RESERVED BEDS ('  + LTRIM(RTRIM(str(count(*)))) + ')' as ToolTip, 'bwb_BedFree.gif' as Icon,'#4CC417' as Color from [ALLBEDSPATIENTS_RB]\r\n                                                                                    INNER JOIN [NurseStationsRooms] on [ALLBEDSPATIENTS_RB].PARENT_KEY = [NurseStationsRooms].Room_key\r\n                                                                                    where PATIENT_ID is not null and active = 2 and [ALLBEDSPATIENTS_RB].USERKEY=@uId group by nursestationcode\r\n                ", Userparam);
        List<NurseStation.NurseStationAlerts> list1;
        using (reader1)
          list1 = reader1.Select<NurseStation.NurseStationAlerts>(new Func<IDataReader, NurseStation.NurseStationAlerts>(NurseStation.NurseStationAlerts.Mapping)).ToList<NurseStation.NurseStationAlerts>();
        IDataReader reader2 = this.objDB.ExecReaderQuery("SELECT [SYS_KEY],[LATIN_DESC],[NS_Image],[occupiedPat],[PatAdmission],[PatDischarge],[DAMA],[OutOnPass],[pendingDis],[T_in],[T_Out],[emptyBeds],[NSType],0 as blockedBeds,0 as reservedBeds FROM [NurseStationsWithBeds_RB] WHERE staff_key=@uId order by LOC_CODE, LATIN_DESC", Userparam);
        using (reader2)
        {
          IEnumerable<NurseStation> list2 = (IEnumerable<NurseStation>) reader2.Select<NurseStation>(new Func<IDataReader, NurseStation>(NurseStation.Mapping)).ToList<NurseStation>();
          foreach (NurseStation nurseStation in list2)
          {
            NurseStation ns = nurseStation;
            List<NurseStation.NurseStationAlerts> list3 = list1.Where<NurseStation.NurseStationAlerts>((Func<NurseStation.NurseStationAlerts, bool>) (a => (long) a.NS_key == ns.sys_key && a.alert_name == "FREE BEDS")).ToList<NurseStation.NurseStationAlerts>();
            List<NurseStation.NurseStationAlerts> list4 =  list1.Where<NurseStation.NurseStationAlerts>((Func<NurseStation.NurseStationAlerts, bool>) (a => (long) a.NS_key == ns.sys_key && a.alert_name == "OCCUPIED (MALE)")).ToList<NurseStation.NurseStationAlerts>();
            List<NurseStation.NurseStationAlerts> list5 =  list1.Where<NurseStation.NurseStationAlerts>((Func<NurseStation.NurseStationAlerts, bool>) (a => (long) a.NS_key == ns.sys_key && a.alert_name == "OCCUPIED (FEMALE)")).ToList<NurseStation.NurseStationAlerts>();
            List<NurseStation.NurseStationAlerts> list6 =  list1.Where<NurseStation.NurseStationAlerts>((Func<NurseStation.NurseStationAlerts, bool>) (a => (long) a.NS_key == ns.sys_key && a.alert_name == "BLOCKED BEDS")).ToList<NurseStation.NurseStationAlerts>();
            List<NurseStation.NurseStationAlerts> list7 =  list1.Where<NurseStation.NurseStationAlerts>((Func<NurseStation.NurseStationAlerts, bool>) (a => (long) a.NS_key == ns.sys_key && a.alert_name == "RESERVED BEDS")).ToList<NurseStation.NurseStationAlerts>();
            ns.occupiedMale = list4.Count <= 0 ? 0L : (long) int.Parse(list4[0].toolTip.Replace("OCCUPIED (MALE)", "").Replace("(", "").Replace(")", "").Trim());
            ns.occupiedFemale = list5.Count <= 0 ? 0L : (long) int.Parse(list5[0].toolTip.Replace("OCCUPIED (FEMALE)", "").Replace("(", "").Replace(")", "").Trim());
            ns.occupiedPat = ns.occupiedMale + ns.occupiedFemale;
            if (list6.Count > 0)
              ns.blockedBeds = (long) int.Parse(list6[0].toolTip.Replace("BLOCKED BEDS", "").Replace("(", "").Replace(")", "").Trim());
            if (list7.Count > 0)
              ns.reservedBeds = (long) int.Parse(list7[0].toolTip.Replace("RESERVED BEDS", "").Replace("(", "").Replace(")", "").Trim());
            if (list3.Count > 0)
              ns.emptyBeds = (long) int.Parse(list3[0].toolTip.Replace("FREE BEDS", "").Replace("(", "").Replace(")", "").Trim()) - (ns.reservedBeds - ns.blockedBeds);
          }
          return list2;
        }
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }
        // error in view ALLBEDSPATIENTS_RB don't get nursestationcode and active
        // paramertrize  by khalifa
    [ActionName("GetRBNurseStations")]
    public  IEnumerable<NurseStation> GetRBNurseStationById(
      string uId,
      string NSId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
                Dictionary<string, object> allParams = new Dictionary<string, object>();
                allParams.Add("@NSId", NSId);
                allParams.Add("@uId", uId);

                Dictionary<string, object> UserParam = new Dictionary<string, object>();
                UserParam.Add("@uId", uId);

        IDataReader reader1 = this.objDB.ExecReaderQuery("select nursestationcode as NS_key,'FREE BEDS' as Alert_Name, 'ns' as Alert_Type, 'FREE BEDS ('  + LTRIM(RTRIM(str(count(*))))) + ')' as ToolTip, 'bwb_BedFree.gif' as Icon,'#4CC417' as Color from [ALLBEDSPATIENTS_RB]\r\n                                                                                    INNER JOIN [NurseStationsRooms] on [ALLBEDSPATIENTS_RB].PARENT_KEY = [NurseStationsRooms].Room_key\r\n                                                                                    where PATIENT_ID is null and (active is null or active = 0) and [ALLBEDSPATIENTS_RB].USERKEY=@uId and nursestationcode = @NSId group by nursestationcode\r\n                                                                                    UNION\r\n                                                                                    select nursestationcode as NS_key,'OCCUPIED (FEMALE)' as Alert_Name, 'ns' as Alert_Type, 'OCCUPIED (FEMALE) ('  + LTRIM(RTRIM(str(count(*)))) + ')' as ToolTip, 'BWB_BEDAVAILABLE.GIF' as Icon,'PINK' as Color from [ALLBEDSPATIENTS_RB]\r\n                                                                                    INNER JOIN [NurseStationsRooms] on [ALLBEDSPATIENTS_RB].PARENT_KEY = [NurseStationsRooms].Room_key\r\n                                                                                    where PATIENT_ID is not null and (active is null or active = 0) and patient_sex = 2 and [ALLBEDSPATIENTS_RB].USERKEY=@uId and nursestationcode =@NSId  group by nursestationcode\r\n                                                                                    UNION\r\n                                                                                    select nursestationcode as NS_key,'OCCUPIED (MALE)' as Alert_Name, 'ns' as Alert_Type, 'OCCUPIED (MALE) ('  + LTRIM(RTRIM(str(count(*)))) + ')' as ToolTip, 'BWB_BEDAVAILABLE.GIF' as Icon,'LIGHTBLUE' as Color from [ALLBEDSPATIENTS_RB]\r\n                                                                                    INNER JOIN [NurseStationsRooms] on [ALLBEDSPATIENTS_RB].PARENT_KEY = [NurseStationsRooms].Room_key\r\n                                                                                    where PATIENT_ID is not null and (active is null or active = 0) and patient_sex = 1 and [ALLBEDSPATIENTS_RB].USERKEY=@uId and nursestationcode =@NSId group by nursestationcode\r\n                                                                                    UNION\r\n                                                                                    select nursestationcode as NS_key,'BLOCKED BEDS' as Alert_Name, 'ns' as Alert_Type, 'BLOCKED BEDS ('  + LTRIM(RTRIM(str(count(*)))) + ')' as ToolTip, 'bwb_BedFree.gif' as Icon,'#4CC417' as Color from [ALLBEDSPATIENTS_RB]\r\n                                                                                    INNER JOIN [NurseStationsRooms] on [ALLBEDSPATIENTS_RB].PARENT_KEY = [NurseStationsRooms].Room_key\r\n                                                                                    where active = 1 and [ALLBEDSPATIENTS_RB].USERKEY=@uId and nursestationcode = @NSId group by nursestationcode\r\n                                                                                    UNION\r\n                                                                                    select nursestationcode as NS_key,'RESERVED BEDS' as Alert_Name, 'ns' as Alert_Type, 'RESERVED BEDS ('  + LTRIM(RTRIM(str(count(*)))) + ')' as ToolTip, 'bwb_BedFree.gif' as Icon,'#4CC417' as Color from [ALLBEDSPATIENTS_RB]\r\n                                                                                    INNER JOIN [NurseStationsRooms] on [ALLBEDSPATIENTS_RB].PARENT_KEY = [NurseStationsRooms].Room_key\r\n                                                                                    where PATIENT_ID is not null and active = 2 and [ALLBEDSPATIENTS_RB].USERKEY=@uId and nursestationcode =@NSId group by nursestationcode\r\n                ", allParams);
        List<NurseStation.NurseStationAlerts> list1;
        using (reader1)
          list1 = reader1.Select<NurseStation.NurseStationAlerts>(new Func<IDataReader, NurseStation.NurseStationAlerts>(NurseStation.NurseStationAlerts.Mapping)).ToList<NurseStation.NurseStationAlerts>();
        IDataReader reader2 = this.objDB.ExecReaderQuery("SELECT [SYS_KEY],[LATIN_DESC],[NS_Image],[occupiedPat],[PatAdmission],[PatDischarge],[DAMA],[OutOnPass],[pendingDis],[T_in],[T_Out],[emptyBeds],[NSType],0 as blockedBeds,0 as reservedBeds FROM [NurseStationsWithBeds_RB] WHERE staff_key=@uId  order by LOC_CODE, LATIN_DESC", UserParam);
        using (reader2)
        {
          IEnumerable<NurseStation> list2 =  (IEnumerable<NurseStation>) reader2.Select<NurseStation>(new Func<IDataReader, NurseStation>(NurseStation.Mapping)).ToList<NurseStation>();
          foreach (NurseStation nurseStation in list2)
          {
            NurseStation ns = nurseStation;
            List<NurseStation.NurseStationAlerts> list3 = list1.Where<NurseStation.NurseStationAlerts>((Func<NurseStation.NurseStationAlerts, bool>) (a => (long) a.NS_key == ns.sys_key && a.alert_name == "FREE BEDS")).ToList<NurseStation.NurseStationAlerts>();
            List<NurseStation.NurseStationAlerts> list4 = list1.Where<NurseStation.NurseStationAlerts>((Func<NurseStation.NurseStationAlerts, bool>) (a => (long) a.NS_key == ns.sys_key && a.alert_name == "OCCUPIED (MALE)")).ToList<NurseStation.NurseStationAlerts>();
            List<NurseStation.NurseStationAlerts> list5 =list1.Where<NurseStation.NurseStationAlerts>((Func<NurseStation.NurseStationAlerts, bool>) (a => (long) a.NS_key == ns.sys_key && a.alert_name == "OCCUPIED (FEMALE)")).ToList<NurseStation.NurseStationAlerts>();
            List<NurseStation.NurseStationAlerts> list6 = list1.Where<NurseStation.NurseStationAlerts>((Func<NurseStation.NurseStationAlerts, bool>) (a => (long) a.NS_key == ns.sys_key && a.alert_name == "BLOCKED BEDS")).ToList<NurseStation.NurseStationAlerts>();
            List<NurseStation.NurseStationAlerts> list7 =  list1.Where<NurseStation.NurseStationAlerts>((Func<NurseStation.NurseStationAlerts, bool>) (a => (long) a.NS_key == ns.sys_key && a.alert_name == "RESERVED BEDS")).ToList<NurseStation.NurseStationAlerts>();
            ns.occupiedMale = list4.Count <= 0 ? 0L : (long) int.Parse(list4[0].toolTip.Replace("OCCUPIED (MALE)", "").Replace("(", "").Replace(")", "").Trim());
            ns.occupiedFemale = list5.Count <= 0 ? 0L : (long) int.Parse(list5[0].toolTip.Replace("OCCUPIED (FEMALE)", "").Replace("(", "").Replace(")", "").Trim());
            ns.occupiedPat = ns.occupiedMale + ns.occupiedFemale;
            if (list6.Count > 0)
              ns.blockedBeds = (long) int.Parse(list6[0].toolTip.Replace("BLOCKED BEDS", "").Replace("(", "").Replace(")", "").Trim());
            if (list7.Count > 0)
              ns.reservedBeds = (long) int.Parse(list7[0].toolTip.Replace("RESERVED BEDS", "").Replace("(", "").Replace(")", "").Trim());
            if (list3.Count > 0)
              ns.emptyBeds = (long) int.Parse(list3[0].toolTip.Replace("FREE BEDS", "").Replace("(", "").Replace(")", "").Trim()) - (ns.reservedBeds - ns.blockedBeds);
          }
          return list2;
        }
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }
        // Edit in code replace group by nursestationcode,StatusName,Color,Icon  after where 
        // paramertrize  by khalifa
        [ActionName("GetNurseStationWithAlerts")]
    public IEnumerable<NurseStation> GetNurseStationWithAlerts(
      string startDate,
      int ns_id,
      string uId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
                Dictionary<string, object> nsParams = new Dictionary<string, object>();
                nsParams.Add("@startDate", startDate);
                nsParams.Add("@ns_id", ns_id.ToString());

                Dictionary<string, object> nswithUser = new Dictionary<string, object>();
                nswithUser.Add("@ns_id", ns_id.ToString());
                nswithUser.Add("@uId", uId);


                IDataReader reader1 =this.objDB.ExecReaderQuery("select nursestationcode as NS_key,StatusName as Alert_Name, 'ns' as Alert_Type, StatusName + ' ('  + LTRIM(RTRIM(str(count(bed_key)))) + ')' as ToolTip, Icon,Color from GetBedsListEx(convert(date, @startDate)) bl  inner join hospstruct on bed_key = sys_key inner join NurseStationsRooms on room_key = parent_key WHERE nursestationcode=@ns_id group by nursestationcode,StatusName,Color,Icon  UNION select [NS_Key] as NS_key,'FREE BEDS' as Alert_Name, 'ns' as Alert_Type, 'FREE BEDS('  + LTRIM(RTRIM(str(sum(BedsCount - OccupiedBeds)))) + ')' as ToolTip, 'bwb_BedFree.gif' as Icon,'#4CC417' as Color from RoomOccupancyNS WHERE ns_key=@ns_id group by NS_key", nsParams);
        List<NurseStation.NurseStationAlerts> list1;
        using (reader1)
          list1 = reader1.Select<NurseStation.NurseStationAlerts>(new Func<IDataReader, NurseStation.NurseStationAlerts>(NurseStation.NurseStationAlerts.Mapping)).ToList<NurseStation.NurseStationAlerts>();
        IDataReader reader2 =  this.objDB.ExecReaderQuery("SELECT [SYS_KEY],[LATIN_DESC],[NS_Image],[occupiedPat],[PatAdmission],[PatDischarge],[DAMA],[OutOnPass],[pendingDis],[T_in],[T_Out],[emptyBeds] FROM [NURSESTATIONSWITHBEDS] WHERE sys_key=@ns_id AND staff_key=@uId", nswithUser);
        using (reader2)
        {
          IEnumerable<NurseStation> list2 = (IEnumerable<NurseStation>) reader2.Select<NurseStation>(new Func<IDataReader, NurseStation>(NurseStation.Mapping)).ToList<NurseStation>();
          foreach (NurseStation nurseStation in list2)
          {
            NurseStation ns = nurseStation;
            ns.alerts =  list1.Where<NurseStation.NurseStationAlerts>((Func<NurseStation.NurseStationAlerts, bool>) (a => (long) a.NS_key == ns.sys_key)).ToList<NurseStation.NurseStationAlerts>();
          }
          return list2;
        }
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

        // paramertrize  by khalifa

  public NurseStation Get(int id, string uId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
                Dictionary<string, object> nsParams = new Dictionary<string, object>();
                nsParams.Add("@id", id.ToString());
                nsParams.Add("@uId", uId);

                IDataReader reader = this.objDB.ExecReaderQuery("SELECT [SYS_KEY],[LATIN_DESC],[NS_Image],[occupiedPat],[PatAdmission],[PatDischarge],[DAMA],[OutOnPass],[pendingDis],[T_in],[T_Out],[emptyBeds] FROM [NURSESTATIONSWITHBEDS] WHERE [sys_key]=@id AND staff_key=@uId", nsParams);
        using (reader)
          return  ((IEnumerable<NurseStation>) reader.Select<NurseStation>(new Func<IDataReader, NurseStation>(NurseStation.Mapping)).ToList<NurseStation>() ?? throw new HttpResponseException(HttpStatusCode.NotFound)).FirstOrDefault<NurseStation>();
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

        // paramertrize  done by khalifa

  [ActionName("GetSysParamsRB")]
    public SysParams GetSysParamsRB()
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        IDataReader reader = this.objDB.ExecReaderQuery("SELECT ALERTSIZE,ER_MAXTIME,ER_MAXTRIAGETIME,ER_MAXWAITINGAREATIME,Patient_Age_Icon,ER_EnableFastTriage,ER_EnableBilling,Enable_Alphanumric_PID FROM SYSPARAMETERS");
        using (reader)
          return  ((IEnumerable<SysParams>) reader.Select<SysParams>(new Func<IDataReader, SysParams>(SysParams.Mapping)).ToList<SysParams>() ?? throw new HttpResponseException(HttpStatusCode.NotFound)).FirstOrDefault<SysParams>();
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

        // paramertrize done by khalifa
  [ActionName("GetSysParams")]
    public SysParams GetSysParams(string hospId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);

                Dictionary<string, object> HosParam = new Dictionary<string, object>();
                HosParam.Add("@hospId", hospId);

        IDataReader reader = !(hospId == "-1") ?  this.objDB.ExecReaderQuery("SELECT ALERTSIZE,ER_MAXTIME,ER_MAXTRIAGETIME,ER_MAXWAITINGAREATIME,Patient_Age_Icon,ER_EnableFastTriage,ER_EnableBilling,Enable_Alphanumric_PID FROM GetSystemParameters(@hospId)", HosParam) : this.objDB.ExecReaderQuery("SELECT ALERTSIZE,ER_MAXTIME,ER_MAXTRIAGETIME,ER_MAXWAITINGAREATIME,Patient_Age_Icon,ER_EnableFastTriage,ER_EnableBilling,Enable_Alphanumric_PID FROM SYSPARAMETERS");
        using (reader)
          return  ((IEnumerable<SysParams>) reader.Select<SysParams>(new Func<IDataReader, SysParams>(SysParams.Mapping)).ToList<SysParams>() ?? throw new HttpResponseException(HttpStatusCode.NotFound)).FirstOrDefault<SysParams>();
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

        // paramertrize done by khalifa
  [ActionName("GetDoctorAss")]
    public string GetDoctorAss(string hospId)
    {
      if (this.objDB == null)
        this.objDB = new DBInteraction(true);

            Dictionary<string, object> HosParam = new Dictionary<string, object>();
            HosParam.Add("@hospId", hospId);

      DataTable data =  this.objDB.GetData("select * from dbo.GetERAssessmentList(@hospId)",HosParam);
      return data.Rows.Count > 0 ? JsonConvert.SerializeObject((object) data) : "";
    }


        // send hospital id  
        //edit by khalifa paramertrize and  done by khalifa

    [ActionName("GetTriageLevels")]
    public IEnumerable<TriageLevels> GetTriageLevels(string hospId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);

                Dictionary<string, object> HosParam = new Dictionary<string, object>();
                HosParam.Add("@hospId", hospId);

        IDataReader reader =  this.objDB.ExecReaderQuery("SELECT main_cod,sub_cod,latin_desc,local_desc FROM [dbo].[GENERAL_COD] WHERE main_cod = 20000 and hospitalid in (0 ,@hospId)", HosParam);
        using (reader)
          return (IEnumerable<TriageLevels>) reader.Select<TriageLevels>(new Func<IDataReader, TriageLevels>(TriageLevels.Mapping)).ToList<TriageLevels>();
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

    [ActionName("GetAgeIcons")]
    public IEnumerable<TriageLevels> GetAgeIcons(string hospId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        IDataReader reader = !(hospId == "-1") ? this.objDB.ExecReaderQuery("select  Patient_Age_Icon from GetSystemParameters(" + hospId + ")") : this.objDB.ExecReaderQuery("select  Patient_Age_Icon from SYSPARAMETERS");
        using (reader)
          return (IEnumerable<TriageLevels>) reader.Select<TriageLevels>(new Func<IDataReader, TriageLevels>(TriageLevels.Mapping)).ToList<TriageLevels>();
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

    [ActionName("CancelAdmissionRequest")]
    [HttpGet]
    public bool CancelAdmissionRequest(string bookingKey)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        this.objDB.ExecNonQuery("update REGISTRATION set reg_type = -1,typeofreg =8 where bookingKey ='" + bookingKey + "'");
        return true;
      }
      catch (Exception ex)
      {
        return false;
      }
    }

    [HttpPost]
    public int AddBed(string enName, string arName, int parentKey, int order, string locCode)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        IDataReader reader = this.objDB.ExecReaderQuery("select sys_key,tree,hospkey,parent_key where sys_key = " + parentKey.ToString());
        using (reader)
        {
          NS ns = reader.Select<NS>(new Func<IDataReader, NS>(NS.Mapping)).FirstOrDefault<NS>();
          if (ns != null)
          {
            DBInteraction objDb1 = this.objDB;
            string[] strArray1 = new string[15]
            {
              "declare @p1 int;set @p1=1;exec sp_prepexec @p1 output,N'@P1 nvarchar(50),@P2 nvarchar(50),@P3 int,@P4 smallint,@P5 smallint,@P6 nvarchar(50),@P7 int,@P8 varchar(50),@P9 int',N'insert into HospStruct (LATIN_DESC, LOCAL_DESC, PARENT_KEY, ORD, LOC_TYPE, TREE, HOSPCODE, LOC_CODE,Room_Sex , Status) values (@P1, @P2, @P3, @P4, @P5, @P6, @P7, @P8, @P9)',N'",
              enName,
              "',N'",
              arName,
              "',",
              parentKey.ToString(),
              ",",
              order.ToString(),
              ",1,N'",
              ns.tree,
              "',",
              null,
              null,
              null,
              null
            };
            int num1 = ns.hospcode;
            strArray1[11] = num1.ToString();
            strArray1[12] = ",'";
            strArray1[13] = locCode;
            strArray1[14] = "',3, 1;select @p1";
            string query1 = string.Concat(strArray1);
            object obj = objDb1.ExecScalarQuery(query1);
            DBInteraction objDb2 = this.objDB;
            string[] strArray2 = new string[9];
            strArray2[0] = "INSERT\t INTO dbo.BEDS_SETUP ( BED_KEY ,LATIN_NAME ,LOCAL_NAME ,PRICE ,COSTPRICE ,SEX ,PARENT_KEY ,REG_TYPE ,BED_CLASS ) VALUES  ( ";
            num1 = (int) obj;
            strArray2[1] = num1.ToString();
            strArray2[2] = " , ";
            strArray2[3] = enName;
            strArray2[4] = " , ";
            strArray2[5] = arName;
            strArray2[6] = " ,'0' ,'0' ,3 , ";
            strArray2[7] = ((int) obj).ToString();
            strArray2[8] = ",1 ,1 )";
            string query2 = string.Concat(strArray2);
            objDb2.ExecNonQuery(query2);
            DBInteraction objDb3 = this.objDB;
            string[] strArray3 = new string[5]
            {
              "Insert into Assignments  (Staff_key, Location_key, staff_Type)  Values (",
              null,
              null,
              null,
              null
            };
            int num2 = ns.parent_key;
            strArray3[1] = num2.ToString();
            strArray3[2] = ", ";
            num2 = (int) obj;
            strArray3[3] = num2.ToString();
            strArray3[4] = ",2)";
            string query3 = string.Concat(strArray3);
            objDb3.ExecScalarQuery(query3);
            if (obj != null && obj != DBNull.Value)
              return (int) obj;
          }
        }
        return 0;
      }
      catch (Exception ex)
      {
        return 0;
      }
    }

    [HttpPost]
    public bool UpdateBed(int bedKey, string enName, string arName, int status)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        this.objDB.ExecNonQuery("update hospstruct set LATIN_DESC='" + enName + "', LOCAL_DESC='" + arName + "', STATUS=" + status.ToString() + " where sys_key =" + bedKey.ToString());
        return true;
      }
      catch (Exception ex)
      {
        return false;
      }
    }

    [HttpPost]
    public bool DeleteBed(int bedKey)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        this.objDB.ExecNonQuery("Delete from hospstruct where sys_key =" + bedKey.ToString());
        return true;
      }
      catch (Exception ex)
      {
        return false;
      }
    }

    [HttpPost]
    public int AddBay(string enName, string arName, int parentKey, int order)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        IDataReader reader = this.objDB.ExecReaderQuery("select sys_key,tree,hospcode where sys_key = " + parentKey.ToString());
        using (reader)
        {
          NS ns = reader.Select<NS>(new Func<IDataReader, NS>(NS.Mapping)).FirstOrDefault<NS>();
          if (ns != null)
          {
            object obj = this.objDB.ExecScalarQuery("declare @p1 int;set @p1=1;exec sp_prepexec @p1 output,N'@P1 nvarchar(50),@P2 nvarchar(50),@P3 int,@P4 smallint,@P5 smallint,@P6 nvarchar(50),@P7 int,@P8 varchar(50)',N'insert into HospStruct (LATIN_DESC, LOCAL_DESC, PARENT_KEY, ORD, LOC_TYPE, TREE, HOSPCODE, LOC_CODE) values (@P1, @P2, @P3, @P4, @P5, @P6, @P7, @P8)',N'" + enName + "',N'" + arName + "'," + parentKey.ToString() + "," + order.ToString() + ",7,N'" + ns.tree + "," + ns.sys_key.ToString() + "',1,'RB';select @p1");
            if (obj != null && obj != DBNull.Value)
              return (int) obj;
          }
        }
        return 0;
      }
      catch (Exception ex)
      {
        return 0;
      }
    }

    [HttpPost]
    public bool UpdateBay(int bayKey, string enName, string arName, int status)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        this.objDB.ExecNonQuery("update hospstruct set LATIN_DESC='" + enName + "', LOCAL_DESC='" + arName + "', STATUS=" + status.ToString() + " where sys_key =" + bayKey.ToString());
        return true;
      }
      catch (Exception ex)
      {
        return false;
      }
    }

    [HttpPost]
    public bool DeleteBay(int bayKey)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        this.objDB.ExecNonQuery("Delete from hospstruct where sys_key =" + bayKey.ToString());
        return true;
      }
      catch (Exception ex)
      {
        return false;
      }
    }

    [HttpPost]
    public int AddWaitingArea(
      string enName,
      string arName,
      int parentKey,
      int order,
      string locCode)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        IDataReader reader = this.objDB.ExecReaderQuery("select sys_key,tree,hospcode where sys_key = " + parentKey.ToString());
        using (reader)
        {
          NS ns = reader.Select<NS>(new Func<IDataReader, NS>(NS.Mapping)).FirstOrDefault<NS>();
          if (ns != null)
          {
            object parentKey1 = this.objDB.ExecScalarQuery("declare @p1 int;set @p1=1;exec sp_prepexec @p1 output,N'@P1 nvarchar(50),@P2 nvarchar(50),@P3 int,@P4 smallint,@P5 smallint,@P6 nvarchar(50),@P7 int,@P8 varchar(50)',N'insert into HospStruct (LATIN_DESC, LOCAL_DESC, PARENT_KEY, ORD, LOC_TYPE, TREE, HOSPCODE, LOC_CODE) values (@P1, @P2, @P3, @P4, @P5, @P6, @P7, @P8)',N'" + enName + "',N'" + arName + "'," + parentKey.ToString() + "," + order.ToString() + ",7,N'" + ns.tree + "," + ns.sys_key.ToString() + "',1,'WA';select @p1");
            if (parentKey1 != null && parentKey1 != DBNull.Value)
            {
              this.AddBed("WaitingAreaBed" + parentKey1?.ToString(), "WaitingAreaBed" + parentKey1?.ToString(), (int) parentKey1, 0, "WABed");
              return (int) parentKey1;
            }
          }
        }
        return 0;
      }
      catch (Exception ex)
      {
        return 0;
      }
    }

    [HttpPost]
    public bool UpdateWaitingArea(int waKey, string enName, string arName, int status)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        this.objDB.ExecNonQuery("update hospstruct set LATIN_DESC='" + enName + "', LOCAL_DESC='" + arName + "', STATUS=" + status.ToString() + " where sys_key =" + waKey.ToString());
        return true;
      }
      catch (Exception ex)
      {
        return false;
      }
    }

    [HttpPost]
    public bool DeleteWaitingArea(int waKey)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        this.objDB.ExecNonQuery("Delete from hospstruct where sys_key =" + waKey.ToString());
        return true;
      }
      catch (Exception ex)
      {
        return false;
      }
    }

    [HttpPost]
    public bool UpdateBedStatus(int bedKey, int status)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        this.objDB.ExecNonQuery("update [RECOVERYBAYPATIENTS] set isblocked=" + status.ToString() + " where [RECOVERYBED_ID]=" + bedKey.ToString());
        return true;
      }
      catch (Exception ex)
      {
        return false;
      }
    }

    [HttpPost]
    public bool TransferFromBedToBed(string bookingKey)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        this.objDB.ExecNonQuery("Delete from REGISTRATION where bookingKey ='" + bookingKey + "'");
        return true;
      }
      catch (Exception ex)
      {
        return false;
      }
    }

    [HttpPost]
    public bool TransferFromBedToWA(string bookingKey)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        this.objDB.ExecNonQuery("Delete from REGISTRATION where bookingKey ='" + bookingKey + "'");
        return true;
      }
      catch (Exception ex)
      {
        return false;
      }
    }

    [HttpPost]
    public bool TransferFromWAToWA(string bookingKey)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        this.objDB.ExecNonQuery("Delete from REGISTRATION where bookingKey ='" + bookingKey + "'");
        return true;
      }
      catch (Exception ex)
      {
        return false;
      }
    }

    [HttpPost]
    public bool TransferFromWAToBed(string bookingKey)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        this.objDB.ExecNonQuery("Delete from REGISTRATION where bookingKey ='" + bookingKey + "'");
        return true;
      }
      catch (Exception ex)
      {
        return false;
      }
    }
  }
}
