// Decompiled with JetBrains decompiler
// Type: BedManagement.BedsController
// Assembly: BedManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: B1AAAA54-FA00-409D-B762-EDD976360563
// Assembly location: C:\Users\Dell\Downloads\pharmacy\BedWhiteBoardWeb_Deploy\bin\BedManagement.dll

using MedicaDAL;
using NHapi.Model.V25.Segment;
using RuleProcessor;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.SessionState;

namespace BedManagement
{
  public class BedsController : ApiController
  {
    private DBInteraction objDB;

   // paramterize Done  by khalifa   -- add by khalifa bedNotdetail

   [ActionName("GetBedsByRoomId")]
    public  IEnumerable<bedNotdetail> GetBedsByRoomId(int room_id, string uId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
                Dictionary<string, object> bedParmas = new Dictionary<string, object>();
                bedParmas.Add("@room_id", room_id.ToString());
                bedParmas.Add("@uId", uId);

                IDataReader reader = this.objDB.ExecReaderQuery("SELECT * FROM [dbo].[AllBedsPatients] WHERE [PARENT_KEY]=@room_id AND userkey=@uId", bedParmas);
        using (reader)
        {
                    IEnumerable<bedNotdetail> list = (IEnumerable<bedNotdetail>)reader.Select<bedNotdetail>(new Func<IDataReader, bedNotdetail>(bedNotdetail.Mapping)).ToList<bedNotdetail>();
          reader.Close();
          return list;
        }
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

  // add bedWithnsc by khalifa to fix error in here in reader 
  // paramertrize done by khalifa
     public IEnumerable<bedWithnsc> Get(int NS_id, string uId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
                Dictionary<string, object> bedParms = new Dictionary<string, object>();
                bedParms.Add("@NS_id", NS_id.ToString());
                bedParms.Add("@uId", uId);
        IDataReader reader =  this.objDB.ExecReaderQuery("SELECT [SYS_KEY],[PARENT_KEY],[MAINTAINCE],[ACTIVE],[INACTIVE],[ISOLATED],[UNDERCLEANING],[LATIN_DESC],[SEX],[BED_CLASS],[PATIENT_ID],[PATIENT_SEX],[PATENGNAME],[PATLOCNAME],[STATUS],[PAT_BIRTHDATE],[START_DATE],[SYSTIME],[EMR_STATUS_TIME],[EMR_STATUS],[ISWAITINGAREA],[EPISODEKEY],[PHYSICIAN],[PHYSICIAN_KEY],[SPECIALTY],[BEDCLASSNAME],[BEDTYPE],[CLINICKEY],[NURSE],[PRICE],[nursestationcode],(SELECT  count(*) cnt from REGISTRATION where bookingKey = [CLINICKEY]) as AdmissionRequested FROM [dbo].[ALLBEDSPATIENTS] INNER JOIN [dbo].[NurseStationsRooms] on [dbo].[ALLBEDSPATIENTS].PARENT_KEY = [dbo].[NurseStationsRooms].Room_key WHERE [nursestationcode]=@NS_id  AND userkey=@uId",bedParms);
        using (reader)
        {
          IEnumerable<bedWithnsc> list = (IEnumerable<bedWithnsc>) reader.Select<bedWithnsc>(new Func<IDataReader, bedWithnsc>(bedWithnsc.Mapping)).ToList<bedWithnsc>();
          reader.Close();
          return list;
        }
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }


        // add null as [Chief_Complaint] in select to fix proplem reader
        // paramterize  Done  by khalifa 
        // not async now because some function depends on 
   public IEnumerable<Bed> GetBedsWithStatus(
      int NS_id,
      string startDate,
      string bedType,
      string uId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
                Dictionary<string, object> startDParm = new Dictionary<string, object>();
                startDParm.Add("@startDate", startDate);
        IDataReader reader1 =  this.objDB.ExecReaderQuery("select bed_key as sys_key,StatusName, Icon, Color  from GetBedsListEx(convert(date, @startDate )) bl", startDParm);
        List<Bed> list1;
        using (reader1)
        {
          list1 = reader1.Select<Bed>(new Func<IDataReader, Bed>(Bed.MappingStatus)).ToList<Bed>();
          reader1.Close();
        }
        IDataReader reader2 = this.objDB.ExecReaderQuery("select [Bed_Id],[Location],[Rotation] from [WB_Beds]");
        List<Bed> list2;
        using (reader2)
        {
          list2 = reader2.Select<Bed>(new Func<IDataReader, Bed>(Bed.MappingLocation)).ToList<Bed>();
          reader2.Close();
        }
                Dictionary<string, object> allParams = new Dictionary<string, object>();
                allParams.Add("@NS_id", NS_id.ToString());
                allParams.Add("@bedType", bedType);
                allParams.Add("@uId", uId);
        IDataReader reader3 =  this.objDB.ExecReaderQuery("SELECT DISTINCT [SYS_KEY],[PARENT_KEY],null as [Chief_Complaint],[MAINTAINCE],[ACTIVE],[INACTIVE],[ISOLATED],[UNDERCLEANING],[LATIN_DESC],[SEX],[BED_CLASS],[PATIENT_ID],[PATIENT_SEX],[PATENGNAME],[PATLOCNAME],[STATUS],[PAT_BIRTHDATE],[START_DATE],[SYSTIME],[EMR_STATUS_TIME],[EMR_STATUS],[ISWAITINGAREA],[EPISODEKEY],[PHYSICIAN],[PHYSICIAN_KEY],[SPECIALTY],[BEDCLASSNAME],[BEDTYPE],[CLINICKEY],[NURSE],[PRICE],[nursestationcode],(SELECT  count(*) cnt from REGISTRATION where bookingKey = [CLINICKEY]) as AdmissionRequested,(select top 1 HOSPSTRUCT.LATIN_DESC from PatientLocations left outer join HOSPSTRUCT on PatientLocations.Bed_Key = HOSPSTRUCT.SYS_KEY left outer join staff on PatientLocations.Added_By = staff.Staff_Key where PatientLocations.patient_id = [ALLBEDSPATIENTS].PATIENT_ID order by PatientLocations.Sys_Key desc) AS pat_location,(select top 1 PatientLocations.LOC_TYPE from PatientLocations left outer join HOSPSTRUCT on PatientLocations.Bed_Key = HOSPSTRUCT.SYS_KEY left outer join staff on PatientLocations.Added_By = staff.Staff_Key where PatientLocations.patient_id = [ALLBEDSPATIENTS].PATIENT_ID order by PatientLocations.Sys_Key desc) AS location_Type,(select top 1 case when HOSPSTRUCT.SYS_KEY in (Select distinct TESTSTOLOC.parent_key from TESTSTOLOC,hospstruct,INVESTIGATION where TESTSTOLOC.parent_key=hospstruct.SYS_KEY and INVESTIGATION.sys_key=TESTSTOLOC.inv_key and INVESTIGATION.Group_Type=1) then 1 when HOSPSTRUCT.SYS_KEY in (Select distinct TESTSTOLOC.parent_key from TESTSTOLOC,hospstruct,INVESTIGATION where TESTSTOLOC.parent_key=hospstruct.SYS_KEY and INVESTIGATION.sys_key=TESTSTOLOC.inv_key and hospstruct.SYS_KEY = HOSPSTRUCT.SYS_KEY and INVESTIGATION.Group_Type=2) then 2 else 0 end from PatientLocations left outer join HOSPSTRUCT on PatientLocations.Bed_Key = HOSPSTRUCT.SYS_KEY left outer join staff on PatientLocations.Added_By = staff.Staff_Key where PatientLocations.patient_id = [ALLBEDSPATIENTS].PATIENT_ID order by PatientLocations.Sys_Key desc) AS Investigation_Type,(select (case episod_key when null then 0 else 1 end) from EPISODE where pat_episode_typ = 1 and episode_type = 0 and episode.PATIENT_ID = [ALLBEDSPATIENTS].PATIENT_ID) AS Admitted FROM [dbo].[ALLBEDSPATIENTS] INNER JOIN [dbo].[NurseStationsRooms] on [dbo].[ALLBEDSPATIENTS].PARENT_KEY = [dbo].[NurseStationsRooms].Room_key WHERE [nursestationcode]=@NS_id AND BEDTYPE=@bedType AND userkey=@uId",allParams);
        using (reader3)
        {
          IEnumerable<Bed> list3 = (IEnumerable<Bed>) reader3.Select<Bed>(new Func<IDataReader, Bed>(Bed.Mapping)).ToList<Bed>();
          foreach (Bed bed1 in list3)
          {
            Bed bed = bed1;
            Bed bed2 = list1.Where<Bed>((Func<Bed, bool>) (a => a.sys_key == bed.sys_key)).FirstOrDefault<Bed>();
            if (bed2 != null)
            {
              bed.statusName = bed2.statusName;
              bed.color = bed2.color;
              bed.icon = bed2.icon;
            }
            Bed bed3 = list2.Where<Bed>((Func<Bed, bool>) (a => a.sys_key == bed.sys_key)).FirstOrDefault<Bed>();
            if (bed3 != null)
            {
              bed.location = bed3.location;
              bed.rotation = bed3.rotation;
            }
          }
          reader3.Close();
          return list3;
        }
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }


        // add null as [score],null as [refwaitintime]  by khalifa to fix proplem reader 
        // paramertrize  done by khalifa
        // not async now because some function depends on 
        public IEnumerable<Bed> GetERBeds(int NS_id, string uId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
                Dictionary<string, object> bedParams = new Dictionary<string, object>();
                bedParams.Add("@NS_id", NS_id.ToString());
                bedParams.Add("@uId", uId);
        IDataReader reader =   this.objDB.ExecReaderQuery("SELECT [SYS_KEY],[PARENT_KEY], null as [score],null as [refwaitintime] , [MAINTAINCE],[ACTIVE],[INACTIVE],[ISOLATED],[UNDERCLEANING],[LATIN_DESC],[SEX],[BED_CLASS],[PATIENT_ID],[PATIENT_SEX],[PATENGNAME],[PATLOCNAME],[Chief_Complaint],[STATUS],[PAT_BIRTHDATE],[START_DATE],[SYSTIME],[EMR_STATUS_TIME],[EMR_STATUS],[ISWAITINGAREA],[EPISODEKEY],[PHYSICIAN],[PHYSICIAN_KEY],[SPECIALTY],[BEDCLASSNAME],[BEDTYPE],[CLINICKEY],[NURSE],[PRICE],[SEENBYERDOCTOR_TIME],[DischargOrderDate],[nursestationcode],(SELECT  count(*) cnt from REGISTRATION where bookingKey = [CLINICKEY]) as AdmissionRequested,(select top 1 HOSPSTRUCT.LATIN_DESC from PatientLocations left outer join HOSPSTRUCT on PatientLocations.Bed_Key = HOSPSTRUCT.SYS_KEY left outer join staff on PatientLocations.Added_By = staff.Staff_Key where PatientLocations.patient_id = [ALLBEDSPATIENTS_ER].PATIENT_ID order by PatientLocations.Sys_Key desc) AS pat_location,(select top 1 PatientLocations.LOC_TYPE from PatientLocations left outer join HOSPSTRUCT on PatientLocations.Bed_Key = HOSPSTRUCT.SYS_KEY left outer join staff on PatientLocations.Added_By = staff.Staff_Key where PatientLocations.patient_id = [ALLBEDSPATIENTS_ER].PATIENT_ID order by PatientLocations.Sys_Key desc) AS location_Type,(select top 1 case when HOSPSTRUCT.SYS_KEY in (Select distinct TESTSTOLOC.parent_key from TESTSTOLOC,hospstruct,INVESTIGATION where TESTSTOLOC.parent_key=hospstruct.SYS_KEY and INVESTIGATION.sys_key=TESTSTOLOC.inv_key and INVESTIGATION.Group_Type=1) then 1 when HOSPSTRUCT.SYS_KEY in (Select distinct TESTSTOLOC.parent_key from TESTSTOLOC,hospstruct,INVESTIGATION where TESTSTOLOC.parent_key=hospstruct.SYS_KEY and INVESTIGATION.sys_key=TESTSTOLOC.inv_key and hospstruct.SYS_KEY = HOSPSTRUCT.SYS_KEY and INVESTIGATION.Group_Type=2) then 2 else 0 end from PatientLocations left outer join HOSPSTRUCT on PatientLocations.Bed_Key = HOSPSTRUCT.SYS_KEY left outer join staff on PatientLocations.Added_By = staff.Staff_Key where PatientLocations.patient_id = [ALLBEDSPATIENTS_ER].PATIENT_ID order by PatientLocations.Sys_Key desc) AS Investigation_Type,(select (case episod_key when null then 0 else 1 end) from EPISODE where pat_episode_typ = 1 and episode_type = 0 and episode.PATIENT_ID = [ALLBEDSPATIENTS_ER].PATIENT_ID) AS Admitted FROM [dbo].[ALLBEDSPATIENTS_ER] INNER JOIN [dbo].[NurseStationsRooms] on [dbo].[ALLBEDSPATIENTS_ER].PARENT_KEY = [dbo].[NurseStationsRooms].Room_key WHERE [nursestationcode]=@NS_id AND userkey=@uId order by ORD,ISWAITINGAREA",bedParams);
        using (reader)
        {
          IEnumerable<Bed> list = (IEnumerable<Bed>) reader.Select<Bed>(new Func<IDataReader, Bed>(Bed.MappingER)).ToList<Bed>();
          reader.Close();
          return list;
        }
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }



        // paramertrize  done by khalifa
        // not async now because some function depends on 
   public IEnumerable<Bed> GetERBedsWStatus(int NS_id, string startDate, string uId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
                Dictionary<string, object> bedParams = new Dictionary<string, object>();
                bedParams.Add("@uId", uId);
                bedParams.Add("@NS_id", NS_id.ToString());
                IDataReader reader = this.objDB.ExecReaderQuery("SELECT * from fn_GetERPatients(@uId,@NS_id,'')",bedParams);
        using (reader)
        {
          IEnumerable<Bed> list = (IEnumerable<Bed>) reader.Select<Bed>(new Func<IDataReader, Bed>(Bed.MappingER)).ToList<Bed>();
          reader.Close();
          return list;
        }
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

        // paramertrize  done by khalifa
        // not async now because some function depends on 

 public IEnumerable<Bed> GetAllERBedsWStatus(string startDate, string uId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
                Dictionary<string, object> bedParams = new Dictionary<string, object>();
                bedParams.Add("@uId", uId);
        IDataReader reader = this.objDB.ExecReaderQuery("select * from fn_GetERPatients(@uId,0,'')",bedParams);
        using (reader)
        {
          IEnumerable<Bed> list = (IEnumerable<Bed>) reader.Select<Bed>(new Func<IDataReader, Bed>(Bed.MappingER)).ToList<Bed>();
          reader.Close();
          return list;
        }
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

        // add null as [Chief_Complaint] to fix proplem reader
        // paramertrize  done by khalifa
        // not async now because some function depends on 
        public IEnumerable<Bed> GetAllBedsWStatus(string startDate, string uId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        IDataReader reader1 = this.objDB.ExecReaderQuery("select [Bed_Id],[Location],[Rotation] from [WB_Beds]");
        List<Bed> list1;
        using (reader1)
        {
          list1 = reader1.Select<Bed>(new Func<IDataReader, Bed>(Bed.MappingLocation)).ToList<Bed>();
          reader1.Close();
        }
                Dictionary<string, object> bedParams = new Dictionary<string, object>();
                bedParams.Add("@uId", uId);
        IDataReader reader2 = this.objDB.ExecReaderQuery("SELECT DISTINCT [SYS_KEY],[PARENT_KEY],[MAINTAINCE],[ACTIVE],null as [Chief_Complaint], [INACTIVE],[ISOLATED],[UNDERCLEANING],[LATIN_DESC],[SEX],[BED_CLASS],[PATIENT_ID],[PATIENT_SEX],[PATENGNAME],[PATLOCNAME],[STATUS],[PAT_BIRTHDATE],[START_DATE],[SYSTIME],[EMR_STATUS_TIME],[EMR_STATUS],[ISWAITINGAREA],[EPISODEKEY],[PHYSICIAN],[PHYSICIAN_KEY],[SPECIALTY],[BEDCLASSNAME],[BEDTYPE],[CLINICKEY],[NURSE],[PRICE],[nursestationcode],(SELECT  count(*) cnt from REGISTRATION where bookingKey = [CLINICKEY]) as AdmissionRequested,(select top 1 HOSPSTRUCT.LATIN_DESC from PatientLocations left outer join HOSPSTRUCT on PatientLocations.Bed_Key = HOSPSTRUCT.SYS_KEY left outer join staff on PatientLocations.Added_By = staff.Staff_Key where PatientLocations.patient_id = [ALLBEDSPATIENTS].PATIENT_ID order by PatientLocations.Sys_Key desc) AS pat_location,(select top 1 PatientLocations.LOC_TYPE from PatientLocations left outer join HOSPSTRUCT on PatientLocations.Bed_Key = HOSPSTRUCT.SYS_KEY left outer join staff on PatientLocations.Added_By = staff.Staff_Key where PatientLocations.patient_id = [ALLBEDSPATIENTS].PATIENT_ID order by PatientLocations.Sys_Key desc) AS location_Type,(select top 1 case when HOSPSTRUCT.SYS_KEY in (Select distinct TESTSTOLOC.parent_key from TESTSTOLOC,hospstruct,INVESTIGATION where TESTSTOLOC.parent_key=hospstruct.SYS_KEY and INVESTIGATION.sys_key=TESTSTOLOC.inv_key and INVESTIGATION.Group_Type=1) then 1 when HOSPSTRUCT.SYS_KEY in (Select distinct TESTSTOLOC.parent_key from TESTSTOLOC,hospstruct,INVESTIGATION where TESTSTOLOC.parent_key=hospstruct.SYS_KEY and INVESTIGATION.sys_key=TESTSTOLOC.inv_key and hospstruct.SYS_KEY = HOSPSTRUCT.SYS_KEY and INVESTIGATION.Group_Type=2) then 2 else 0 end from PatientLocations left outer join HOSPSTRUCT on PatientLocations.Bed_Key = HOSPSTRUCT.SYS_KEY left outer join staff on PatientLocations.Added_By = staff.Staff_Key where PatientLocations.patient_id = [ALLBEDSPATIENTS].PATIENT_ID order by PatientLocations.Sys_Key desc) AS Investigation_Type,1 AS Admitted FROM [dbo].[ALLBEDSPATIENTS] INNER JOIN [dbo].[NurseStationsRooms] on [dbo].[ALLBEDSPATIENTS].PARENT_KEY = [dbo].[NurseStationsRooms].Room_key WHERE BEDTYPE='1' AND userkey=@uId", bedParams);
        using (reader2)
        {
          IEnumerable<Bed> list2 = (IEnumerable<Bed>) reader2.Select<Bed>(new Func<IDataReader, Bed>(Bed.Mapping)).ToList<Bed>();
          foreach (Bed bed1 in list2)
          {
            Bed bed = bed1;
            Bed bed2 = list1.Where<Bed>((Func<Bed, bool>) (a => a.sys_key == bed.sys_key)).FirstOrDefault<Bed>();
            if (bed2 != null)
            {
              bed.location = bed2.location;
              bed.rotation = bed2.rotation;
            }
          }
          reader2.Close();
          return list2;
        }
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }


        // paramertrize  done by khalifa
        // not async now because some function depends on 
        [HttpGet]
    public Bed GetERSingleBed(string pId, string uId)
    {
      try
      {
        if (this.objDB == null && this.objDB == null)
          this.objDB = new DBInteraction(true);

                Dictionary<string, object> getPatient = new Dictionary<string, object>();
                getPatient.Add("@uId", uId);
                getPatient.Add("@pId", pId);


                IDataReader reader =this.objDB.ExecReaderQuery("SELECT * from fn_GetERPatients(@uId,0,@pId)", getPatient);
        using (reader)
        {
          Bed erSingleBed = reader.Select<Bed>(new Func<IDataReader, Bed>(Bed.MappingER)).FirstOrDefault<Bed>();
          reader.Close();
          return erSingleBed;
        }
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }


        ////add by khalifa get emplty beds in nursestation         // paramertrize  done by khalifa
        [HttpGet]
   public IEnumerable<Bed> GetEREmptyBedsInNS(string uId, string NsCode)
        {

            try
            {
                if (this.objDB == null && this.objDB == null)
                    this.objDB = new DBInteraction(true);
                Dictionary<string, object> QueryParam = new Dictionary<string, object>();
                QueryParam.Add("@uId", uId);
                QueryParam.Add("@NsCode", NsCode);

                IDataReader reader = this.objDB.ExecReaderQuery("select * from fn_GetERPatients(@uId,0,'') where nursestationcode = @NsCode and  PATIENT_ID is null and ISWAITINGAREA is null", QueryParam);
                using (reader)
                {
                    IEnumerable<Bed> list = (IEnumerable<Bed>)reader.Select<Bed>(new Func<IDataReader, Bed>(Bed.MappingER)).ToList<Bed>();
                    reader.Close();
                    return list;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }


         }


        // add  null as [score],null as [refwaitintime] to fix reader 
        // paramertrize   done by khalifa
   public Bed GetERSingleBedWStatus(int pId, string startDate, string uId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
                Dictionary<string, object> dateParam = new Dictionary<string, object>();
                dateParam.Add("@startDate", startDate);
        IDataReader reader1 =  this.objDB.ExecReaderQuery("select bed_key as sys_key,StatusName, Icon, Color  from GetBedsListEx(convert(date, @startDate)) bl", dateParam);
        List<Bed> list;
        using (reader1)
        {
          list = reader1.Select<Bed>(new Func<IDataReader, Bed>(Bed.MappingStatus)).ToList<Bed>();
          reader1.Close();
        }
                Dictionary<string, object> allParams = new Dictionary<string, object>();
                allParams.Add("@pId", pId.ToString());
                allParams.Add("@uId", uId);

                IDataReader reader2 =  this.objDB.ExecReaderQuery("SELECT [SYS_KEY],[PARENT_KEY],[MAINTAINCE],[ACTIVE], null as [score],null as [refwaitintime], [INACTIVE],[ISOLATED],[UNDERCLEANING],[LATIN_DESC],[SEX],[BED_CLASS],[PATIENT_ID],[PATIENT_SEX],[PATENGNAME],[PATLOCNAME],[Chief_Complaint],[STATUS],[PAT_BIRTHDATE],[START_DATE],[SYSTIME],[EMR_STATUS_TIME],[EMR_STATUS],[ISWAITINGAREA],[EPISODEKEY],[PHYSICIAN],[PHYSICIAN_KEY],[SPECIALTY],[BEDCLASSNAME],[BEDTYPE],[CLINICKEY],[NURSE],[PRICE],[SEENBYERDOCTOR_TIME],[DischargOrderDate],[nursestationcode],(SELECT  count(*) cnt from REGISTRATION where bookingKey = [CLINICKEY]) as AdmissionRequested,(select top 1 HOSPSTRUCT.LATIN_DESC from PatientLocations left outer join HOSPSTRUCT on PatientLocations.Bed_Key = HOSPSTRUCT.SYS_KEY left outer join staff on PatientLocations.Added_By = staff.Staff_Key where PatientLocations.patient_id = [ALLBEDSPATIENTS_ER].PATIENT_ID order by PatientLocations.Sys_Key desc) AS pat_location,(select top 1 PatientLocations.LOC_TYPE from PatientLocations left outer join HOSPSTRUCT on PatientLocations.Bed_Key = HOSPSTRUCT.SYS_KEY left outer join staff on PatientLocations.Added_By = staff.Staff_Key where PatientLocations.patient_id = [ALLBEDSPATIENTS_ER].PATIENT_ID order by PatientLocations.Sys_Key desc) AS location_Type,(select top 1 case when HOSPSTRUCT.SYS_KEY in (Select distinct TESTSTOLOC.parent_key from TESTSTOLOC,hospstruct,INVESTIGATION where TESTSTOLOC.parent_key=hospstruct.SYS_KEY and INVESTIGATION.sys_key=TESTSTOLOC.inv_key and INVESTIGATION.Group_Type=1) then 1 when HOSPSTRUCT.SYS_KEY in (Select distinct TESTSTOLOC.parent_key from TESTSTOLOC,hospstruct,INVESTIGATION where TESTSTOLOC.parent_key=hospstruct.SYS_KEY and INVESTIGATION.sys_key=TESTSTOLOC.inv_key and hospstruct.SYS_KEY = HOSPSTRUCT.SYS_KEY and INVESTIGATION.Group_Type=2) then 2 else 0 end from PatientLocations left outer join HOSPSTRUCT on PatientLocations.Bed_Key = HOSPSTRUCT.SYS_KEY left outer join staff on PatientLocations.Added_By = staff.Staff_Key where PatientLocations.patient_id = [ALLBEDSPATIENTS_ER].PATIENT_ID order by PatientLocations.Sys_Key desc) AS Investigation_Type,(select (case episod_key when null then 0 else 1 end) from EPISODE where pat_episode_typ = 1 and episode_type = 0 and episode.PATIENT_ID = [ALLBEDSPATIENTS_ER].PATIENT_ID) AS Admitted FROM [dbo].[ALLBEDSPATIENTS_ER] INNER JOIN [dbo].[NurseStationsRooms] on [dbo].[ALLBEDSPATIENTS_ER].PARENT_KEY = [dbo].[NurseStationsRooms].Room_key WHERE [ALLBEDSPATIENTS_ER].PATIENT_ID=@pId AND userkey=@uId order by ORD,ISWAITINGAREA", allParams);
        using (reader2)
        {
          Bed bed = reader2.Select<Bed>(new Func<IDataReader, Bed>(Bed.MappingER)).FirstOrDefault<Bed>();
          Bed bed1 = list.Where<Bed>((Func<Bed, bool>) (a => a.sys_key == bed.sys_key)).FirstOrDefault<Bed>();
          if (bed1 != null)
          {
            bed.statusName = bed1.statusName;
            bed.color = bed1.color;
            bed.icon = bed1.icon;
          }
          reader2.Close();
          return bed;
        }
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

        // add null as [PHYSICIAN_KEY], null as [PHYSICIAN_NAME] by khalifa to fix reader 
        // paramertrize done and async
        // not async now because some function depends on 
   public IEnumerable<Bed> GetRecoveryBeds(int NS_id, string uId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
                Dictionary<string, object> bedParams = new Dictionary<string, object>();
                bedParams.Add("@NS_id", NS_id.ToString());
                bedParams.Add("@uId", uId);

                IDataReader reader = this.objDB.ExecReaderQuery("SELECT distinct [patient_id],[patient_id],[SYS_KEY],[PARENT_KEY],[ACTIVE],[LATIN_DESC],[SEX],[patient_sex],[PatEngName],[PatLocName],[pat_birthdate],[start_date],[systime],[EPISODEKEY],null as [PHYSICIAN_KEY],null as [PHYSICIAN_NAME],[ALLBEDSPATIENTS_RB].LOC_CODE, [ALLBEDSPATIENTS_RB].LATIN_DESC FROM [dbo].[ALLBEDSPATIENTS_RB] INNER JOIN [dbo].[NurseStationsRooms] on [dbo].[ALLBEDSPATIENTS_RB].PARENT_KEY = [dbo].[NurseStationsRooms].Room_key WHERE [nursestationcode]=@NS_id AND userkey=@uId order by [ALLBEDSPATIENTS_RB].LOC_CODE, [ALLBEDSPATIENTS_RB].LATIN_DESC",bedParams);
        using (reader)
        {
          IEnumerable<Bed> list = (IEnumerable<Bed>) reader.Select<Bed>(new Func<IDataReader, Bed>(Bed.MappingRB)).ToList<Bed>();
          reader.Close();
          return list;
        }
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }


        // add by khalifa to fix reader1 null as parent_key ,null as maintaince,null as active ,null as isolated ,null as undercleaning , null as inactive, null as latin_desc , null as sex , bed_key as sys_key,StatusName,null as bed_class ,null as patient_id,null as patient_sex , null as patengname ,null as Chief_Complaint ,null as patlocname ,null as status ,null as pat_birthdate ,null as start_date ,null as systime,null as emr_status_time,null as emr_status ,null as iswaitingarea ,null as episodekey,null as physician,null as physician_key ,null as specialty,null as bedclassname,null as bedtype,null as clinickey,null as nurse,null as price,null as nursestationcode, null as admissionrequested,null as pat_location,null as location_type,null as investigation_type,null as admitted  fix reader1
        // add by khalifa to fix reader2 null as [Chief_Complaint],null as [pat_location],null as [location_type],null as [investigation_type],null as [admitted
        // paramertrize done and async by khalifa

        public  IEnumerable<Bed> GetBedsWStatusWRoomName(
      int NS_id,
      string startDate,
      string bedType,
      string uId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
                Dictionary<string, object> dateParam = new Dictionary<string, object>();
                dateParam.Add("@startDate", startDate);
        IDataReader reader1 =  this.objDB.ExecReaderQuery("select null as parent_key ,null as maintaince,null as active ,null as isolated ,null as undercleaning , null as inactive, null as latin_desc , null as sex , bed_key as sys_key,StatusName,null as bed_class ,null as patient_id,null as patient_sex , null as patengname ,null as Chief_Complaint ,null as patlocname ,null as status ,null as pat_birthdate ,null as start_date ,null as systime,null as emr_status_time,null as emr_status ,null as iswaitingarea ,null as episodekey,null as physician,null as physician_key ,null as specialty,null as bedclassname,null as bedtype,null as clinickey,null as nurse,null as price,null as nursestationcode, null as admissionrequested,null as pat_location,null as location_type,null as investigation_type,null as admitted, Icon, Color  from GetBedsListEx(convert(date,@startDate)) bl", dateParam);
        List<Bed> list1;
        using (reader1)
        {
          list1 = reader1.Select<Bed>(new Func<IDataReader, Bed>(Bed.Mapping)).ToList<Bed>();
          reader1.Close();
        }
                Dictionary<string, object> allParms = new Dictionary<string, object>();
                allParms.Add("@NS_id", NS_id.ToString());
                allParms.Add("@bedType", bedType);
                allParms.Add("@uId", uId);

                IDataReader reader2 =  this.objDB.ExecReaderQuery("SELECT DISTINCT [SYS_KEY],[PARENT_KEY],null as [Chief_Complaint],null as [pat_location],null as [location_type],null as [investigation_type],null as [admitted],[MAINTAINCE],[ACTIVE],[INACTIVE],[ISOLATED],[UNDERCLEANING],[LATIN_DESC],[SEX],[BED_CLASS],[PATIENT_ID],[PATIENT_SEX],[PATENGNAME],[PATLOCNAME],[STATUS],[PAT_BIRTHDATE],[START_DATE],[SYSTIME],[EMR_STATUS_TIME],[EMR_STATUS],[ISWAITINGAREA],[EPISODEKEY],[PHYSICIAN],[PHYSICIAN_KEY],[SPECIALTY],[BEDCLASSNAME],[BEDTYPE],[CLINICKEY],[NURSE],[PRICE],[nursestationcode],(SELECT  count(*) cnt from REGISTRATION where bookingKey = [CLINICKEY]) as AdmissionRequested FROM [dbo].[ALLBEDSPATIENTS] INNER JOIN [dbo].[NurseStationsRooms] on [dbo].[ALLBEDSPATIENTS].PARENT_KEY = [dbo].[NurseStationsRooms].Room_key WHERE [nursestationcode]=@NS_id AND BEDTYPE=@bedType AND userkey=@uId", allParms);
        using (reader2)
        {
          IEnumerable<Bed> list2 = (IEnumerable<Bed>) reader2.Select<Bed>(new Func<IDataReader, Bed>(Bed.Mapping)).ToList<Bed>();
          foreach (Bed bed1 in list2)
          {
            Bed bed = bed1;
            Bed bed2 = list1.Where<Bed>((Func<Bed, bool>) (a => a.sys_key == bed.sys_key)).FirstOrDefault<Bed>();
            if (bed2 != null)
            {
              bed.statusName = bed2.statusName;
              bed.color = bed2.color;
              bed.icon = bed2.icon;
            }
          }
          IEnumerable<Room> source = new RoomsController().Get(NS_id);
          foreach (Bed bed3 in list2)
          {
            Bed bed = bed3;
            Room room = source.Where<Room>((Func<Room, bool>) (a => a.room_key == bed.parent_key)).FirstOrDefault<Room>();
            if (room != null)
              bed.room_Name = room.room_name;
          }
          reader2.Close();
          return list2;
        }
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }



        // paramertrize done  by khalifa
        // not async now because some function depends on 

        public  IEnumerable<Bed> GetOperatingTheatres(int NS_id, string uId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
                Dictionary<string, object> bedsparam = new Dictionary<string, object>();
                bedsparam.Add("@NS_id", NS_id.ToString());
                bedsparam.Add("@uId", uId);

                IDataReader reader = this.objDB.ExecReaderQuery("SELECT DISTINCT [SYS_KEY],[NURSESTATIONCODE],[LATIN_DESC],[LOC_CODE],[ORD] FROM [dbo].[ALLBEDSPATIENTS_OP] WHERE [NURSESTATIONCODE]=@NS_id and userkey=@uId order by ORD,LOC_CODE, LATIN_DESC", bedsparam);
        using (reader)
          return (IEnumerable<Bed>) reader.Select<Bed>(new Func<IDataReader, Bed>(Bed.MappingOP)).ToList<Bed>();
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

        // paramertrize done  by khalifa
        // not async now because some function depends on 
        public IEnumerable<Operation> GetOperations(string scheduledDate)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
                Dictionary<string, object> bedParm = new Dictionary<string, object>();
                bedParm.Add("@scheduledDate", scheduledDate);
        IDataReader reader = this.objDB.ExecReaderQuery("select OPTORDERS.sys_key,OPERATIONS.Description, OPTORDERS.patient_id, patient.patient_id_2, patient.PatEngName, episode_key,orderdate\r\n\t\t\t\t, case when (OPTORDERS.AnesthesiaStart = 0 and OPTORDERS.PatientinOR = 0) then CONVERT(VARCHAR(5), fromtime, 108) + ' ' + RIGHT(CONVERT(VARCHAR(30), fromtime, 9),2) \r\n\t\t\t\t\t\twhen (OPTORDERS.AnesthesiaStart = 0 and OPTORDERS.PatientinOR = 1) then STUFF(RIGHT('0' + CONVERT(VarChar(7), cast(PatientinOR_DateTime as time), 0), 7), 6, 0, ' ') \r\n\t\t\t\t\t\twhen (OPTORDERS.AnesthesiaStart = 1) then STUFF(RIGHT('0' + CONVERT(VarChar(7), cast(AnesthesiaStart_DateTime as time), 0), 7), 6, 0, ' ') end as fromtime\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t--, case when (OPTORDERS.PatientinOR_DateTime is null and ExpectedEnds_Datetime is null) and ((OPTORDERS.AnesthesiaStart = 0 and OPTORDERS.SurgeryEnd_DateTime is null) or (OPTORDERS.AnesthesiaStart = 1 and OPTORDERS.InductionEnd_DateTime is null)) then CONVERT(VARCHAR(5), totime, 108) + ' ' + RIGHT(CONVERT(VARCHAR(30), totime, 9),2)\r\n\t\t\t\t--\t   when (OPTORDERS.PatientinOR_DateTime is not null and ExpectedEnds_Datetime is null) and ((OPTORDERS.AnesthesiaStart = 0 and OPTORDERS.SurgeryEnd_DateTime is null) or (OPTORDERS.AnesthesiaStart = 1 and OPTORDERS.InductionEnd_DateTime is null)) then CONVERT(VARCHAR(5), totime, 108) + ' ' + RIGHT(CONVERT(VARCHAR(30), totime, 9),2)\r\n\t\t\t\t--\t   when (OPTORDERS.PatientinOR_DateTime is null and ExpectedEnds_Datetime is not null) and ((OPTORDERS.AnesthesiaStart = 0 and OPTORDERS.SurgeryEnd_DateTime is null) or (OPTORDERS.AnesthesiaStart = 1 and OPTORDERS.InductionEnd_DateTime is null)) then CONVERT(VARCHAR(5), totime, 108) + ' ' + RIGHT(CONVERT(VARCHAR(30), totime, 9),2)\r\n\t\t\t\t--\t   when (OPTORDERS.PatientinOR_DateTime is not null and ExpectedEnds_Datetime is not null) and ((OPTORDERS.AnesthesiaStart = 0 and OPTORDERS.SurgeryEnd_DateTime is null) or (OPTORDERS.AnesthesiaStart = 1 and OPTORDERS.InductionEnd_DateTime is null)) then CONVERT(VARCHAR(5), ExpectedEnds_Datetime, 108) + ' ' + RIGHT(CONVERT(VARCHAR(30), ExpectedEnds_Datetime, 9),2)\r\n\t\t\t\t--\t   when ((OPTORDERS.AnesthesiaStart = 0 and OPTORDERS.SurgeryEnd_DateTime is not null) or (OPTORDERS.AnesthesiaStart = 1 and OPTORDERS.InductionEnd_DateTime is not null)) then CONVERT(VARCHAR(5), SurgeryEnd_DateTime, 108) + ' ' + RIGHT(CONVERT(VARCHAR(30), SurgeryEnd_DateTime, 9),2)\r\n\t\t\t\t--\t   when (OPTORDERS.AnesthesiaStart = 0 and OPTORDERS.SurgeryEnd_DateTime is not null) then CONVERT(VARCHAR(5), SurgeryEnd_DateTime, 108) + ' ' + RIGHT(CONVERT(VARCHAR(30), SurgeryEnd_DateTime, 9),2)\r\n\t\t\t\t--\t   when (OPTORDERS.AnesthesiaStart = 1 and OPTORDERS.InductionEnd_DateTime is not null) then CONVERT(VARCHAR(5), InductionEnd_DateTime, 108) + ' ' + RIGHT(CONVERT(VARCHAR(30), InductionEnd_DateTime, 9),2) end as totime\r\n\t\t\t\t\r\n\t\t\t\t, case when ((OPTORDERS.AnesthesiaStart = 1 OR OPTORDERS.PatientinOR = 1) and OPTORDERS.PatientOutofOR = 0 and ExpectedEnds_AddedBy > 0 and ExpectedEnds_Datetime is not null) then STUFF(RIGHT('0' + CONVERT(VarChar(7), cast(ExpectedEnds_Datetime as time), 0), 7), 6, 0, ' ')\r\n\t\t\t\t\t   when OPTORDERS.PatientOutofOR = 1 then STUFF(RIGHT('0' + CONVERT(VarChar(7), cast(PatientOutofOR_DateTime as time), 0), 7), 6, 0, ' ')\r\n\t\t\t\t\t   else CONVERT(VARCHAR(5), totime, 108) + ' ' + RIGHT(CONVERT(VARCHAR(30), totime, 9),2) end as totime\r\n\t\t\t\r\n\t\t\t\t\r\n\t\t\t\t, optroom,opttype,HOSPSTRUCT.LATIN_DESC as optroomname,order_time,consentsigned,bloodtransfusion,infectious,patientAdmissionType,RecoveryBayRequired\r\n\t\t\t\t\r\n\t\t\t\t, case when PatientLeaftOT = 1 then 'patientLeftOT'   when InICUOrWard = 1 then 'InICUOrWard' when InRecovery = 1 then 'inRecovery' when PatientOutofOR = 1 then 'patientOutOfOR' when InductionEnd = 1 then 'inductionEnd' when SurgeryEnd = 1 then 'surgeryEnd'    when KnifetoSkin = 1 then 'knifeToSkin'    when SurgeryStart = 1 then 'surgeryStart' when AnesthesiaStart = 1 then 'ansStart' when PatientinOR = 1 then 'patientInOR' when PatTransfered = 1 then 'patTransfered'   when SendtoOT = 1 then 'sendToOT' else 'scheduled' END  as className\r\n                \r\n\t\t\t\t, case when PatientLeaftOT = 1 then '13'  when InICUOrWard = 1 then '12'  when InRecovery = 1 then '11' when PatientOutofOR = 1 then '10'  when InductionEnd = 1 then '9' when SurgeryEnd = 1 then '8'   when KnifetoSkin = 1 then '7' when SurgeryStart = 1 then '6' when AnesthesiaStart = 1 then '5' when PatientinOR = 1 then '4'   when PatTransfered = 1 then '3'   when SendtoOT = 1 then '2' else '1' END  as OptStatus\r\n                \r\n\t\t\t\t, case when PatientLeaftOT = 1 then 'Patient Left OT'   when InICUOrWard = 1 then 'Out of Recovery' when InRecovery = 1 then 'In Recovery' when PatientOutofOR = 1 then 'Patient Out of OR' when InductionEnd = 1 then 'Anaesthesia End' when SurgeryEnd = 1 then 'Surgery End' when KnifetoSkin = 1 then 'Knife to Skin' when SurgeryStart = 1 then 'Surgery Start' when AnesthesiaStart = 1 then 'Anaesthesia Start' when PatientinOR = 1 then 'Patient in OR'  when PatTransfered = 1 then 'Patient Arrived'   when SendtoOT = 1 then 'Send to OT' else 'Scheduled' END  as optStatusName\r\n                \r\n\t\t\t\t, case when PatientLeaftOT = 1 then convert (varchar(50),PatientLeaftOT_Datetime )  when InICUOrWard = 1 then convert(varchar(50),InICUOrWard_DateTime )  when InRecovery = 1 then convert(varchar(50),InRecovery_DateTime ) when PatientOutofOR = 1 then convert(varchar(50),PatientOutofOR_DateTime  ) when InductionEnd = 1 then convert(varchar(50),InductionEnd_DateTime ) when SurgeryEnd = 1 then convert(varchar(50),SurgeryEnd_DateTime  )  when KnifetoSkin = 1 then convert(varchar(50),KnifetoSkin_DateTime  )  when SurgeryStart = 1 then convert(varchar(50),SurgeryStart_DateTime ) when AnesthesiaStart = 1 then convert(varchar(50),AnesthesiaStart_DateTime ) when PatientinOR = 1 then convert(varchar(50),PatientinOR_DateTime  )  when PatTransfered = 1 then convert(varchar(50),TransDate )  when SendtoOT = 1 then convert(varchar(50),SendtoOT_DateTime )  else  convert(varchar(50),   convert (varchar(12), orderdate,107) + ' ' + left(convert(varchar(10),order_time,108),5) + ' ' + right(Order_Time ,2)    ) END as OptStatusTime\r\n                \r\n\t\t\t\t\r\n\t\t\t\t\r\n\t\t\t\t\r\n\t\t\t\t, case when PatTransfered = 1 then convert(varchar(50), DATEADD(hour,cast(left(InitialDuration,1) as Int),TransDate)) else convert(varchar(50), DATEADD(hour,cast(left(InitialDuration,1) as int),      convert (varchar(12), orderdate,107) + ' ' + left(convert(varchar(10),order_time,108),5) + ' ' + right(Order_Time ,2)   )) end as OptExpectedEndDate\r\n                \r\n\t\t\t\t\r\n\t\t\t\t\r\n\t\t\t\t\r\n\t\t\t\t, case when PatientLeaftOT = 1 then 'bwb_Patient left OT.jpg'   when InICUOrWard = 1 then 'bwb_Patient out of recovery.jpg'    when InRecovery = 1 then 'bwb_patient in recovery.jpg'    when PatientOutofOR = 1 then 'bwb_patient out of OR.jpg'    when InductionEnd = 1 then 'bwb_ANS end.jpg'    when SurgeryEnd = 1 then 'bwb_Surgery End.jpg'    when KnifetoSkin = 1 then 'bwb_Knife to Skin.jpg'    when SurgeryStart = 1 then 'bwb_Surgery Start.jpg'    when AnesthesiaStart = 1 then 'bwb_ANS start.jpg'    when PatientinOR = 1 then 'bwb_Patient in OR.jpg'    when PatTransfered = 1 then 'bwb_Patient Arrive.jpg'   when SendtoOT = 1 then 'Sent to OT' else 'bwb_Scheduled.jpg' END  as Icon\r\n                , st.Staff_key ,st.Staff_name, OPTSurgeonAssistants.Category, case when OPTSurgeonAssistants.Category = 1 then 'Surgeon' when OPTSurgeonAssistants.Category = 2 then 'Assistant' when OPTSurgeonAssistants.Category = 3 then 'ANS' when OPTSurgeonAssistants.Category = 4 then 'Nurse' END as categoryname\r\n\t\t\t\t\r\n\t\t\t\t, case when (OPTORDERS.AnesthesiaStart = 0 and OPTORDERS.PatientinOR = 0) then null when (OPTORDERS.AnesthesiaStart = 1 OR OPTORDERS.PatientinOR = 1) and ExpectedEnds_AddedBy > 0 and ExpectedEnds_Datetime is not null then ExpectedEnds_Datetime else null end as ExpectedEnds_Datetime,OPTORDERS.AnesthesiaStart\r\n\t\t\t\t,CONVERT(VARCHAR(5), fromtime, 108) + ' ' + RIGHT(CONVERT(VARCHAR(30), fromtime, 9),2) as originalfromtime\r\n                ,CONVERT(VARCHAR(5), totime, 108) + ' ' + RIGHT(CONVERT(VARCHAR(30), totime, 9),2) as originalendtime\r\n                \r\n\t\t\t\tfrom OPTORDERS \r\n                INNER JOIN OPTSurgeonAssistants ON OPTORDERS.sys_key = OPTSurgeonAssistants.OrderKey\r\n                INNER JOIN Staff st ON OPTSurgeonAssistants.SurgeonAssistant = st.Staff_Key\r\n                inner join HOSPSTRUCT on HOSPSTRUCT.SYS_KEY = OPTORDERS.optroom\r\n                inner join OPERATIONS on OPTORDERS.optcode = OPERATIONS.sys_key  \r\n                inner join Staff on Staff.Staff_Key = OPTORDERS.Surgeon  \r\n                inner join staff orderuser on  orderuser.Staff_Key = OPTORDERS.doctorkey  \r\n                inner join PATIENT on PATIENT.patient_id = OPTORDERS.patient_id \r\n                where optroom > 0 and OptResult = 0 and OPTORDERS.satus = 0 and orderdate  >= CONVERT(date,@scheduledDate)\r\n                order by orderdate,optroom,cast(CONVERT(VARCHAR(5), fromtime, 108) + ' ' + RIGHT(CONVERT(VARCHAR(30), fromtime, 9),2) as time),category,optorders.sys_key\r\n\t\t\t\t--order by orderdate,optroom,CONVERT(VARCHAR(5), fromtime, 108) + ' ' + RIGHT(CONVERT(VARCHAR(30), fromtime, 9),2),category,optorders.sys_key\r\n                ", bedParm);
        using (reader)
          return (IEnumerable<Operation>) reader.Select<Operation>(new Func<IDataReader, Operation>(Operation.Mapping)).ToList<Operation>();
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }



    public IEnumerable<AdaptedOperation> GetOperationsAdapted(
      string scheduledDate)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        IEnumerable<Operation> operations = this.GetOperations(scheduledDate);
        List<AdaptedOperation> operationsAdapted = new List<AdaptedOperation>();
        string str1 = "";
        AdaptedOperation adaptedOperation1 = (AdaptedOperation) null;
        foreach (Operation operation in operations)
        {
          if (operation.sys_key != str1)
          {
            string patientInitials = this.GetPatientInitials(operation.PatEngName);
            adaptedOperation1 = new AdaptedOperation();
            adaptedOperation1.sys_key = operation.sys_key;
            adaptedOperation1.title = "<input id='" + operation.sys_key + "' type='hidden' value='" + operation.sys_key + "' /><span id='pid'>" + (operation.patientAdmissionType == "1" ? "DC" : "IP") + ": <b>" + patientInitials + " | </b>" + operation.categoryname + ": <b>" + operation.staff_name.Trim() + "</b></span><br/><span id='op'>" + operation.Description + "</span>";
            AdaptedOperation adaptedOperation2 = adaptedOperation1;
            DateTime date = DateTime.Parse(operation.orderdate);
            date = date.Date;
            string shortDateString1 = date.ToShortDateString();
            date = DateTime.Parse(operation.fromtime);
            string shortTimeString1 = date.ToShortTimeString();
            date = DateTime.Parse(shortDateString1 + " " + shortTimeString1);
            string str2 = date.ToString("s");
            adaptedOperation2.start = str2;
            AdaptedOperation adaptedOperation3 = adaptedOperation1;
            date = DateTime.Parse(operation.orderdate);
            date = date.Date;
            string shortDateString2 = date.ToShortDateString();
            date = DateTime.Parse(operation.totime);
            string shortTimeString2 = date.ToShortTimeString();
            date = DateTime.Parse(shortDateString2 + " " + shortTimeString2);
            string str3 = date.ToString("s");
            adaptedOperation3.end = str3;
            adaptedOperation1.resource = operation.optroom;
            adaptedOperation1.allDay = false;
            adaptedOperation1.className = "OP " + operation.className;
            adaptedOperation1.description = operation.categoryname + ": " + operation.staff_name.Trim();
            AdaptedOperation adaptedOperation4 = adaptedOperation1;
            string[] strArray = new string[19];
            strArray[0] = "<span>Expected start: <b>";
            date = DateTime.Parse(operation.fromtime);
            strArray[1] = date.ToShortTimeString();
            strArray[2] = "</b></span><span>                   Expected end: <b>";
            date = DateTime.Parse(operation.totime);
            strArray[3] = date.ToShortTimeString();
            strArray[4] = "</b></span><br/><span>";
            strArray[5] = operation.patientAdmissionType == "1" ? "DC" : "IP";
            strArray[6] = ": <b>";
            strArray[7] = operation.PatEngName;
            strArray[8] = "</b></span><br/><span style='color:'#e2e2e2';'>Operation: <b>";
            strArray[9] = operation.Description;
            strArray[10] = "</b></span><br/><span>Status: <b>";
            strArray[11] = operation.optStatusName;
            strArray[12] = "</b>              at   <b>";
            date = DateTime.Parse(operation.OptStatusTime);
            strArray[13] = date.ToShortTimeString();
            strArray[14] = "</b></span><br/><span>";
            strArray[15] = operation.categoryname;
            strArray[16] = ": </span><span style='font-size:1.2em;font-weight:bold;'>";
            strArray[17] = operation.staff_name.Trim();
            strArray[18] = "</span>";
            string str4 = string.Concat(strArray);
            adaptedOperation4.toolTip = str4;
            adaptedOperation1.consentsigned = operation.consentsigned;
            adaptedOperation1.bloodtransfusion = operation.bloodtransfusion;
            adaptedOperation1.infectious = operation.infectious;
            adaptedOperation1.optStatus = operation.OptStatus;
            adaptedOperation1.optStatusName = operation.optStatusName;
            adaptedOperation1.optStatusTime = operation.OptStatusTime;
            adaptedOperation1.patientAdmissionType = operation.patientAdmissionType;
            adaptedOperation1.recoveryBayRequired = operation.recoveryBayRequired;
            adaptedOperation1.surgeonName = operation.staff_name;
            adaptedOperation1.patientName = operation.PatEngName;
            adaptedOperation1.patientInitials = patientInitials;
            adaptedOperation1.optExpectedEndDate = operation.OptExpectedEndDate;
            adaptedOperation1.opStuff = "<span style='color:#e1e1e1;text-shadow: 1px 1px 1px #A3A3A3;'>" + operation.categoryname + ": </span><span style='font-size:1.2em;font-weight:bold;text-shadow: 2px 2px 2px #000;'>" + operation.staff_name.Trim() + "</span>";
            adaptedOperation1.optRoomName = operation.OptRoomName;
            adaptedOperation1.opName = operation.Description;
            adaptedOperation1.episodeKey = operation.episode_key;
            adaptedOperation1.expectedEnds_Datetime = operation.expectedEnds_Datetime;
            adaptedOperation1.anesthesiaStart = operation.anesthesiaStart;
            AdaptedOperation adaptedOperation5 = adaptedOperation1;
            date = DateTime.Parse(operation.orderdate);
            date = date.Date;
            string shortDateString3 = date.ToShortDateString();
            date = DateTime.Parse(operation.originalfromtime);
            string shortTimeString3 = date.ToShortTimeString();
            date = DateTime.Parse(shortDateString3 + " " + shortTimeString3);
            string str5 = date.ToString("s");
            adaptedOperation5.originalfromtime = str5;
            AdaptedOperation adaptedOperation6 = adaptedOperation1;
            date = DateTime.Parse(operation.orderdate);
            date = date.Date;
            string shortDateString4 = date.ToShortDateString();
            date = DateTime.Parse(operation.originalendtime);
            string shortTimeString4 = date.ToShortTimeString();
            date = DateTime.Parse(shortDateString4 + " " + shortTimeString4);
            string str6 = date.ToString("s");
            adaptedOperation6.originalendtime = str6;
            operationsAdapted.Add(adaptedOperation1);
          }
          else
          {
            AdaptedOperation adaptedOperation7 = adaptedOperation1;
            adaptedOperation7.description = adaptedOperation7.description + Environment.NewLine + operation.categoryname + ": " + operation.staff_name.Trim();
            AdaptedOperation adaptedOperation8 = adaptedOperation1;
            adaptedOperation8.toolTip = adaptedOperation8.toolTip + "<br/><span>" + operation.categoryname + ": </span><span style='font-size:1em;font-weight:bold;'>" + operation.staff_name.Trim() + "</span>";
            AdaptedOperation adaptedOperation9 = adaptedOperation1;
            adaptedOperation9.opStuff = adaptedOperation9.opStuff + "<br/><span style='color:#e1e1e1;text-shadow: 1px 1px 1px #A3A3A3;'>" + operation.categoryname + ": </span><span style='font-size:1em;font-weight:bold;text-shadow: 2px 2px 2px #000;'>" + operation.staff_name.Trim() + "</span>";
          }
          str1 = operation.sys_key;
        }
        return (IEnumerable<AdaptedOperation>) operationsAdapted;
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

    public IEnumerable<AdaptedOperation> GetOperationsAdaptedRealTime(
      string scheduledDate)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        bool flag = false;
        string str1 = "";
        int num1 = 0;
        int num2 = 0;
        IEnumerable<AdaptedOperation> operationsAdapted = this.GetOperationsAdapted(scheduledDate);
        DateTime dateTime1 = new DateTime();
        DateTime dateTime2 = new DateTime();
        DateTime dateTime3 = new DateTime();
        DateTime dateTime4 = new DateTime();
        string str2 = "";
        int num3 = -1;
        foreach (AdaptedOperation adaptedOperation1 in operationsAdapted)
        {
          if (adaptedOperation1.optRoomName != str2 && str2 != "")
          {
            flag = false;
            str1 = "";
            num2 = 0;
          }
          DateTime dateTime5 = DateTime.Parse(adaptedOperation1.start);
          DateTime dateTime6 = DateTime.Parse(adaptedOperation1.end);
          DateTime dateTime7 = DateTime.Parse(adaptedOperation1.originalfromtime);
          DateTime dateTime8 = DateTime.Parse(adaptedOperation1.originalendtime);
          DateTime dateTime9 = !(adaptedOperation1.expectedEnds_Datetime != "") ? new DateTime() : DateTime.Parse(adaptedOperation1.expectedEnds_Datetime);
          int result = 0;
          int.TryParse(adaptedOperation1.optStatus, out result);
          DateTime dateTime10;
          if (result < 4 || adaptedOperation1.anesthesiaStart == 0 && result < 6)
          {
            if (flag)
            {
              int totalMinutes = (int) dateTime5.Subtract(dateTime4).TotalMinutes;
              if (num1 >= totalMinutes)
                num1 -= totalMinutes;
              if (adaptedOperation1.optRoomName == str1)
              {
                AdaptedOperation adaptedOperation2 = adaptedOperation1;
                dateTime10 = dateTime5.AddMinutes((double) num1);
                dateTime10 = dateTime10.Date;
                string shortDateString1 = dateTime10.ToShortDateString();
                dateTime10 = dateTime5.AddMinutes((double) num1);
                string shortTimeString1 = dateTime10.ToShortTimeString();
                dateTime10 = DateTime.Parse(shortDateString1 + " " + shortTimeString1);
                string str3 = dateTime10.ToString("s");
                adaptedOperation2.start = str3;
                if (adaptedOperation1.expectedEnds_Datetime == "")
                {
                  AdaptedOperation adaptedOperation3 = adaptedOperation1;
                  dateTime10 = dateTime6.AddMinutes((double) num1);
                  dateTime10 = dateTime10.Date;
                  string shortDateString2 = dateTime10.ToShortDateString();
                  dateTime10 = dateTime6.AddMinutes((double) num1);
                  string shortTimeString2 = dateTime10.ToShortTimeString();
                  dateTime10 = DateTime.Parse(shortDateString2 + " " + shortTimeString2);
                  string str4 = dateTime10.ToString("s");
                  adaptedOperation3.end = str4;
                  AdaptedOperation adaptedOperation4 = adaptedOperation1;
                  string[] strArray = new string[15];
                  strArray[0] = "<span>Expected start: <b>";
                  dateTime10 = dateTime5.AddMinutes((double) num1);
                  strArray[1] = dateTime10.ToShortTimeString();
                  strArray[2] = "</b></span><span>                   Expected end: <b>";
                  dateTime10 = dateTime6.AddMinutes((double) num1);
                  strArray[3] = dateTime10.ToShortTimeString();
                  strArray[4] = "</b></span><br/><span>";
                  strArray[5] = adaptedOperation1.patientAdmissionType == "1" ? "DC" : "IP";
                  strArray[6] = ": <b>";
                  strArray[7] = adaptedOperation1.patientName;
                  strArray[8] = "</b></span><br/><span style='color:'#e2e2e2';'>Operation: <b>";
                  strArray[9] = adaptedOperation1.description;
                  strArray[10] = "</b></span><br/><span>Status: <b>";
                  strArray[11] = adaptedOperation1.optStatusName;
                  strArray[12] = "</b>              at   <b>";
                  dateTime10 = DateTime.Parse(adaptedOperation1.optStatusTime);
                  strArray[13] = dateTime10.ToShortTimeString();
                  strArray[14] = "</b></span>";
                  string str5 = string.Concat(strArray);
                  adaptedOperation4.toolTip = str5;
                }
                else
                {
                  AdaptedOperation adaptedOperation5 = adaptedOperation1;
                  string[] strArray = new string[15];
                  strArray[0] = "<span>Expected start: <b>";
                  dateTime10 = dateTime5.AddMinutes((double) num1);
                  strArray[1] = dateTime10.ToShortTimeString();
                  strArray[2] = "</b></span><span>                   Expected end: <b>";
                  strArray[3] = dateTime6.ToShortTimeString();
                  strArray[4] = "</b></span><br/><span>";
                  strArray[5] = adaptedOperation1.patientAdmissionType == "1" ? "DC" : "IP";
                  strArray[6] = ": <b>";
                  strArray[7] = adaptedOperation1.patientName;
                  strArray[8] = "</b></span><br/><span style='color:'#e2e2e2';'>Operation: <b>";
                  strArray[9] = adaptedOperation1.description;
                  strArray[10] = "</b></span><br/><span>Status: <b>";
                  strArray[11] = adaptedOperation1.optStatusName;
                  strArray[12] = "</b>              at   <b>";
                  dateTime10 = DateTime.Parse(adaptedOperation1.optStatusTime);
                  strArray[13] = dateTime10.ToShortTimeString();
                  strArray[14] = "</b></span>";
                  string str6 = string.Concat(strArray);
                  adaptedOperation5.toolTip = str6;
                }
              }
            }
          }
          else if ((adaptedOperation1.anesthesiaStart == 1 && result >= 4 || adaptedOperation1.anesthesiaStart == 0 && result >= 6) && result < 11)
          {
            if (dateTime5 > dateTime7)
            {
              TimeSpan timeSpan1 = dateTime5.Subtract(dateTime7);
              if (adaptedOperation1.expectedEnds_Datetime != "" && dateTime9 > dateTime8)
              {
                TimeSpan timeSpan2 = dateTime9.Subtract(dateTime8);
                num1 += (int) timeSpan2.TotalMinutes;
              }
              else
                num1 += (int) timeSpan1.TotalMinutes;
              flag = true;
              str1 = adaptedOperation1.optRoomName;
              if (adaptedOperation1.expectedEnds_Datetime == "")
              {
                AdaptedOperation adaptedOperation6 = adaptedOperation1;
                dateTime10 = dateTime6.AddMinutes((double) (int) timeSpan1.TotalMinutes);
                dateTime10 = dateTime10.Date;
                string shortDateString = dateTime10.ToShortDateString();
                dateTime10 = dateTime6.AddMinutes((double) (int) timeSpan1.TotalMinutes);
                string shortTimeString = dateTime10.ToShortTimeString();
                dateTime10 = DateTime.Parse(shortDateString + " " + shortTimeString);
                string str7 = dateTime10.ToString("s");
                adaptedOperation6.end = str7;
                AdaptedOperation adaptedOperation7 = adaptedOperation1;
                string[] strArray = new string[15];
                strArray[0] = "<span>Expected start: <b>";
                strArray[1] = dateTime5.ToShortTimeString();
                strArray[2] = "</b></span><span>                   Expected end: <b>";
                dateTime10 = dateTime6.AddMinutes((double) (int) timeSpan1.TotalMinutes);
                strArray[3] = dateTime10.ToShortTimeString();
                strArray[4] = "</b></span><br/><span>";
                strArray[5] = adaptedOperation1.patientAdmissionType == "1" ? "DC" : "IP";
                strArray[6] = ": <b>";
                strArray[7] = adaptedOperation1.patientName;
                strArray[8] = "</b></span><br/><span style='color:'#e2e2e2';'>Operation: <b>";
                strArray[9] = adaptedOperation1.description;
                strArray[10] = "</b></span><br/><span>Status: <b>";
                strArray[11] = adaptedOperation1.optStatusName;
                strArray[12] = "</b>              at   <b>";
                dateTime10 = DateTime.Parse(adaptedOperation1.optStatusTime);
                strArray[13] = dateTime10.ToShortTimeString();
                strArray[14] = "</b></span>";
                string str8 = string.Concat(strArray);
                adaptedOperation7.toolTip = str8;
              }
              else
              {
                AdaptedOperation adaptedOperation8 = adaptedOperation1;
                string[] strArray = new string[15]
                {
                  "<span>Expected start: <b>",
                  dateTime5.ToShortTimeString(),
                  "</b></span><span>                   Expected end: <b>",
                  dateTime6.ToShortTimeString(),
                  "</b></span><br/><span>",
                  adaptedOperation1.patientAdmissionType == "1" ? "DC" : "IP",
                  ": <b>",
                  adaptedOperation1.patientName,
                  "</b></span><br/><span style='color:'#e2e2e2';'>Operation: <b>",
                  adaptedOperation1.description,
                  "</b></span><br/><span>Status: <b>",
                  adaptedOperation1.optStatusName,
                  "</b>              at   <b>",
                  null,
                  null
                };
                dateTime10 = DateTime.Parse(adaptedOperation1.optStatusTime);
                strArray[13] = dateTime10.ToShortTimeString();
                strArray[14] = "</b></span>";
                string str9 = string.Concat(strArray);
                adaptedOperation8.toolTip = str9;
              }
            }
          }
          else if ((adaptedOperation1.anesthesiaStart == 1 && result >= 4 || adaptedOperation1.anesthesiaStart == 0 && result >= 6) && result >= 11 && dateTime6 > dateTime8)
          {
            if (dateTime5 > dateTime7)
            {
              TimeSpan timeSpan = dateTime5.Subtract(dateTime7);
              num1 -= (int) timeSpan.TotalMinutes;
            }
            TimeSpan timeSpan3 = dateTime6.Subtract(dateTime8);
            num1 += (int) timeSpan3.TotalMinutes;
            flag = true;
            str1 = adaptedOperation1.optRoomName;
          }
          dateTime3 = dateTime5;
          dateTime4 = dateTime6;
          dateTime1 = DateTime.Parse(adaptedOperation1.start);
          dateTime2 = DateTime.Parse(adaptedOperation1.end);
          str2 = adaptedOperation1.optRoomName;
          num3 = result;
        }
        return operationsAdapted;
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

    public IEnumerable<AdaptedOperation> GetOperationsAdaptedRealTimeOld(
      string scheduledDate)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        bool flag = false;
        string str1 = "";
        int num1 = 0;
        int num2 = 0;
        IEnumerable<AdaptedOperation> operationsAdapted = this.GetOperationsAdapted(scheduledDate);
        DateTime dateTime1 = new DateTime();
        DateTime dateTime2 = new DateTime();
        DateTime dateTime3 = new DateTime();
        DateTime dateTime4 = new DateTime();
        string str2 = "";
        int num3 = -1;
        foreach (AdaptedOperation adaptedOperation1 in operationsAdapted)
        {
          if (adaptedOperation1.optRoomName != str2 && str2 != "")
          {
            flag = false;
            str1 = "";
            num2 = 0;
          }
          DateTime dateTime5 = DateTime.Parse(adaptedOperation1.start);
          DateTime dateTime6 = DateTime.Parse(adaptedOperation1.end);
          int result = 0;
          int.TryParse(adaptedOperation1.optStatus, out result);
          DateTime dateTime7;
          if (result < 4)
          {
            if (flag)
            {
              int totalMinutes = (int) dateTime5.Subtract(dateTime4).TotalMinutes;
              if (num1 >= totalMinutes)
                num1 -= totalMinutes;
            }
            if (adaptedOperation1.optRoomName == str1)
            {
              AdaptedOperation adaptedOperation2 = adaptedOperation1;
              dateTime7 = dateTime5.AddMinutes((double) num1);
              dateTime7 = dateTime7.Date;
              string shortDateString1 = dateTime7.ToShortDateString();
              dateTime7 = dateTime5.AddMinutes((double) num1);
              string shortTimeString1 = dateTime7.ToShortTimeString();
              dateTime7 = DateTime.Parse(shortDateString1 + " " + shortTimeString1);
              string str3 = dateTime7.ToString("s");
              adaptedOperation2.start = str3;
              if (adaptedOperation1.expectedEnds_Datetime == "")
              {
                AdaptedOperation adaptedOperation3 = adaptedOperation1;
                dateTime7 = dateTime6.AddMinutes((double) num1);
                dateTime7 = dateTime7.Date;
                string shortDateString2 = dateTime7.ToShortDateString();
                dateTime7 = dateTime6.AddMinutes((double) num1);
                string shortTimeString2 = dateTime7.ToShortTimeString();
                dateTime7 = DateTime.Parse(shortDateString2 + " " + shortTimeString2);
                string str4 = dateTime7.ToString("s");
                adaptedOperation3.end = str4;
                AdaptedOperation adaptedOperation4 = adaptedOperation1;
                string[] strArray = new string[15];
                strArray[0] = "<span>Expected start: <b>";
                dateTime7 = dateTime5.AddMinutes((double) num1);
                strArray[1] = dateTime7.ToShortTimeString();
                strArray[2] = "</b></span><span>                   Expected end: <b>";
                dateTime7 = dateTime6.AddMinutes((double) num1);
                strArray[3] = dateTime7.ToShortTimeString();
                strArray[4] = "</b></span><br/><span>";
                strArray[5] = adaptedOperation1.patientAdmissionType == "1" ? "DC" : "IP";
                strArray[6] = ": <b>";
                strArray[7] = adaptedOperation1.patientName;
                strArray[8] = "</b></span><br/><span style='color:'#e2e2e2';'>Operation: <b>";
                strArray[9] = adaptedOperation1.description;
                strArray[10] = "</b></span><br/><span>Status: <b>";
                strArray[11] = adaptedOperation1.optStatusName;
                strArray[12] = "</b>              at   <b>";
                dateTime7 = DateTime.Parse(adaptedOperation1.optStatusTime);
                strArray[13] = dateTime7.ToShortTimeString();
                strArray[14] = "</b></span>";
                string str5 = string.Concat(strArray);
                adaptedOperation4.toolTip = str5;
              }
              else
              {
                AdaptedOperation adaptedOperation5 = adaptedOperation1;
                string[] strArray = new string[15];
                strArray[0] = "<span>Expected start: <b>";
                dateTime7 = dateTime5.AddMinutes((double) num1);
                strArray[1] = dateTime7.ToShortTimeString();
                strArray[2] = "</b></span><span>                   Expected end: <b>";
                strArray[3] = dateTime6.ToShortTimeString();
                strArray[4] = "</b></span><br/><span>";
                strArray[5] = adaptedOperation1.patientAdmissionType == "1" ? "DC" : "IP";
                strArray[6] = ": <b>";
                strArray[7] = adaptedOperation1.patientName;
                strArray[8] = "</b></span><br/><span style='color:'#e2e2e2';'>Operation: <b>";
                strArray[9] = adaptedOperation1.description;
                strArray[10] = "</b></span><br/><span>Status: <b>";
                strArray[11] = adaptedOperation1.optStatusName;
                strArray[12] = "</b>              at   <b>";
                dateTime7 = DateTime.Parse(adaptedOperation1.optStatusTime);
                strArray[13] = dateTime7.ToShortTimeString();
                strArray[14] = "</b></span>";
                string str6 = string.Concat(strArray);
                adaptedOperation5.toolTip = str6;
              }
            }
          }
          else if (((adaptedOperation1.anesthesiaStart != 1 || result < 4) && (adaptedOperation1.anesthesiaStart != 0 || result < 6) || result >= 11) && (adaptedOperation1.anesthesiaStart == 1 && result >= 4 || adaptedOperation1.anesthesiaStart == 0 && result >= 6) && result >= 11)
          {
            AdaptedOperation adaptedOperation6 = adaptedOperation1;
            string[] strArray = new string[15];
            strArray[0] = "<span>Started: <b>";
            dateTime7 = DateTime.Parse(adaptedOperation1.start);
            strArray[1] = dateTime7.ToShortTimeString();
            strArray[2] = "</b></span><span>                   Ended: <b>";
            strArray[3] = dateTime6.ToShortTimeString();
            strArray[4] = "</b></span><br/><span>";
            strArray[5] = adaptedOperation1.patientAdmissionType == "1" ? "DC" : "IP";
            strArray[6] = ": <b>";
            strArray[7] = adaptedOperation1.patientName;
            strArray[8] = "</b></span><br/><span style='color:'#e2e2e2';'>Operation: <b>";
            strArray[9] = adaptedOperation1.description;
            strArray[10] = "</b></span><br/><span>Status: <b>";
            strArray[11] = adaptedOperation1.optStatusName;
            strArray[12] = "</b>              at   <b>";
            dateTime7 = DateTime.Parse(adaptedOperation1.optStatusTime);
            strArray[13] = dateTime7.ToShortTimeString();
            strArray[14] = "</b></span>";
            string str7 = string.Concat(strArray);
            adaptedOperation6.toolTip = str7;
          }
          dateTime3 = dateTime5;
          dateTime4 = dateTime6;
          dateTime1 = DateTime.Parse(adaptedOperation1.start);
          dateTime2 = DateTime.Parse(adaptedOperation1.end);
          str2 = adaptedOperation1.optRoomName;
          num3 = result;
        }
        string str8 = "";
        DateTime dateTime8 = new DateTime();
        foreach (AdaptedOperation adaptedOperation7 in operationsAdapted)
        {
          DateTime.Parse(adaptedOperation7.start);
          DateTime.Parse(adaptedOperation7.end);
          int result = 0;
          int.TryParse(adaptedOperation7.optStatus, out result);
          if (result < 4 || adaptedOperation7.anesthesiaStart == 0 && result < 6)
          {
            DateTime dateTime9;
            int num4;
            if (str8 == adaptedOperation7.optRoomName)
            {
              DateTime date1 = dateTime8.Date;
              dateTime9 = DateTime.Parse(adaptedOperation7.start);
              DateTime date2 = dateTime9.Date;
              if (date1 == date2)
              {
                num4 = dateTime8 >= DateTime.Parse(adaptedOperation7.start) ? 1 : 0;
                goto label_31;
              }
            }
            num4 = 0;
label_31:
            if (num4 != 0)
            {
              int num5 = (int) dateTime8.Subtract(DateTime.Parse(adaptedOperation7.start)).TotalMinutes + 1;
              AdaptedOperation adaptedOperation8 = adaptedOperation7;
              dateTime9 = DateTime.Parse(adaptedOperation7.start);
              dateTime9 = dateTime9.AddMinutes((double) num5);
              dateTime9 = dateTime9.Date;
              string shortDateString3 = dateTime9.ToShortDateString();
              dateTime9 = DateTime.Parse(adaptedOperation7.start);
              dateTime9 = dateTime9.AddMinutes((double) num5);
              string shortTimeString3 = dateTime9.ToShortTimeString();
              dateTime9 = DateTime.Parse(shortDateString3 + " " + shortTimeString3);
              string str9 = dateTime9.ToString("s");
              adaptedOperation8.start = str9;
              if (adaptedOperation7.expectedEnds_Datetime == "")
              {
                AdaptedOperation adaptedOperation9 = adaptedOperation7;
                dateTime9 = DateTime.Parse(adaptedOperation7.end);
                dateTime9 = dateTime9.AddMinutes((double) num5);
                dateTime9 = dateTime9.Date;
                string shortDateString4 = dateTime9.ToShortDateString();
                dateTime9 = DateTime.Parse(adaptedOperation7.end);
                dateTime9 = dateTime9.AddMinutes((double) num5);
                string shortTimeString4 = dateTime9.ToShortTimeString();
                dateTime9 = DateTime.Parse(shortDateString4 + " " + shortTimeString4);
                string str10 = dateTime9.ToString("s");
                adaptedOperation9.end = str10;
                AdaptedOperation adaptedOperation10 = adaptedOperation7;
                string[] strArray = new string[15];
                strArray[0] = "<span>Expected start: <b>";
                dateTime9 = DateTime.Parse(adaptedOperation7.start);
                dateTime9 = dateTime9.AddMinutes((double) num5);
                strArray[1] = dateTime9.ToShortTimeString();
                strArray[2] = "</b></span><span>                   Expected end: <b>";
                dateTime9 = DateTime.Parse(adaptedOperation7.end);
                dateTime9 = dateTime9.AddMinutes((double) num5);
                strArray[3] = dateTime9.ToShortTimeString();
                strArray[4] = "</b></span><br/><span>";
                strArray[5] = adaptedOperation7.patientAdmissionType == "1" ? "DC" : "IP";
                strArray[6] = ": <b>";
                strArray[7] = adaptedOperation7.patientName;
                strArray[8] = "</b></span><br/><span style='color:'#e2e2e2';'>Operation: <b>";
                strArray[9] = adaptedOperation7.description;
                strArray[10] = "</b></span><br/><span>Status: <b>";
                strArray[11] = adaptedOperation7.optStatusName;
                strArray[12] = "</b>              at   <b>";
                dateTime9 = DateTime.Parse(adaptedOperation7.optStatusTime);
                strArray[13] = dateTime9.ToShortTimeString();
                strArray[14] = "</b></span>";
                string str11 = string.Concat(strArray);
                adaptedOperation10.toolTip = str11;
              }
              else
              {
                AdaptedOperation adaptedOperation11 = adaptedOperation7;
                string[] strArray = new string[15];
                strArray[0] = "<span>Expected start: <b>";
                dateTime9 = DateTime.Parse(adaptedOperation7.start);
                dateTime9 = dateTime9.AddMinutes((double) num5);
                strArray[1] = dateTime9.ToShortTimeString();
                strArray[2] = "</b></span><span>                   Expected end: <b>";
                dateTime9 = DateTime.Parse(adaptedOperation7.end);
                strArray[3] = dateTime9.ToShortTimeString();
                strArray[4] = "</b></span><br/><span>";
                strArray[5] = adaptedOperation7.patientAdmissionType == "1" ? "DC" : "IP";
                strArray[6] = ": <b>";
                strArray[7] = adaptedOperation7.patientName;
                strArray[8] = "</b></span><br/><span style='color:'#e2e2e2';'>Operation: <b>";
                strArray[9] = adaptedOperation7.description;
                strArray[10] = "</b></span><br/><span>Status: <b>";
                strArray[11] = adaptedOperation7.optStatusName;
                strArray[12] = "</b>              at   <b>";
                dateTime9 = DateTime.Parse(adaptedOperation7.optStatusTime);
                strArray[13] = dateTime9.ToShortTimeString();
                strArray[14] = "</b></span>";
                string str12 = string.Concat(strArray);
                adaptedOperation11.toolTip = str12;
              }
            }
          }
          dateTime1 = DateTime.Parse(adaptedOperation7.start);
          dateTime8 = DateTime.Parse(adaptedOperation7.end);
          str8 = adaptedOperation7.optRoomName;
        }
        return operationsAdapted;
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

    private string GetPatientInitials(string fullName)
    {
      string[] strArray = fullName.Split(new string[2]
      {
        " ",
        ","
      }, StringSplitOptions.RemoveEmptyEntries);
      string patientInitials = "";
      char ch;
      if ((uint) strArray.Length > 0U)
      {
        string str1 = patientInitials;
        ch = strArray[0][0];
        string str2 = ch.ToString();
        patientInitials = str1 + str2 + ".";
      }
      if (strArray.Length > 1)
      {
        string str3 = patientInitials;
        ch = strArray[1][0];
        string str4 = ch.ToString();
        patientInitials = str3 + str4 + ".";
      }
      if (strArray.Length > 2)
      {
        string str5 = patientInitials;
        ch = strArray[2][0];
        string str6 = ch.ToString();
        patientInitials = str5 + str6 + ".";
      }
      if (strArray.Length > 3)
      {
        string str7 = patientInitials;
        ch = strArray[3][0];
        string str8 = ch.ToString();
        patientInitials = str7 + str8 + ".";
      }
      return patientInitials;
    }

    [HttpPost]
    public string ExecuteRule(int KBId, string ruleName, string stateVals)
    {
      if (this.objDB == null)
        this.objDB = new DBInteraction(true);
      Processor processor = new Processor("html5");
      processor.KnowladgeID = KBId;
      processor.RuleName = ruleName;
      string[] strArray = stateVals.Split(new string[1]
      {
        "|"
      }, StringSplitOptions.None);
      for (int index = 0; index < strArray.Length; ++index)
        processor.SetState(strArray[index].Split(new string[1]
        {
          "~"
        }, StringSplitOptions.None)[0], (object) strArray[index].Split(new string[1]
        {
          "~"
        }, StringSplitOptions.None)[1]);
      string str1 = processor.ProcessRule();
      HttpSessionState session = HttpContext.Current.Session;
      string str2;
      if (session["ProcessName"] != null)
      {
        string mvarLastResult = processor.mvarLastResult;
        str2 = (string) session["ProcessName"] + "^" + mvarLastResult + "@" + str1;
        session["ProcessName"] = (object) null;
      }
      else
        str2 = "Session Timeout";
      return str2;
    }

    [HttpGet]
    public string ContinueRule()
    {
      Processor processor = (Processor) null;
      short LinID = 0;
      string str = "";
      HttpSessionState session = HttpContext.Current.Session;
      if (session != null)
      {
        if (session["RuleProcessor"] != null)
          processor = (Processor) session["RuleProcessor"];
        if (processor != null)
        {
          if (session["LineID"] != null)
            LinID = (short) session["LineID"];
          string mvarLastResult1 = processor.mvarLastResult;
          str = processor.ProcessRule((int) LinID, mvarLastResult1);
          if (session["ProcessName"] != null)
          {
            string mvarLastResult2 = processor.mvarLastResult;
            str = (string) session["ProcessName"] + "^" + mvarLastResult2 + "@" + str;
            session["ProcessName"] = (object) null;
          }
        }
        else
          str = "Session Timeout";
      }
      return str;
    }

        // paramertrize done by khalifa
    [HttpGet]
    public string CheckExist(string bedId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
                Dictionary<string, object> bedParam = new Dictionary<string, object>();
                bedParam.Add("@bedId", bedId);
        object obj = this.objDB.ExecScalarQuery("select count(*) as rcount from RecoveryBayPatients where recoveryBed_ID =@bedId", bedParam);
        if (obj == null || obj == DBNull.Value || (int) obj == 0)
          this.objDB.ExecScalarQuery("insert into RecoveryBayPatients (recoveryBed_ID) values (@bedId)", bedParam);
        return "true";
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }
  }
}
