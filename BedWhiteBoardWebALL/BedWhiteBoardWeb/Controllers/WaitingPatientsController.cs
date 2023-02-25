// Decompiled with JetBrains decompiler
// Type: BedManagement.WaitingPatientsController
// Assembly: BedManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: B1AAAA54-FA00-409D-B762-EDD976360563
// Assembly location: C:\Users\Dell\Downloads\pharmacy\BedWhiteBoardWeb_Deploy\bin\BedManagement.dll

using AddToPaymentConfirmationN;
using BillingEngineCalculation;
using HL7PHNT;
using MedicaDAL;
using MedicalSheetsEngine;
using Newtonsoft.Json;
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
    public class WaitingPatientsController : ApiController
    {
        private DBInteraction objDB;
        public string p_patid;
        public string p_clinickey;
        public string p_pattype;
        public string p_pattype2;
        public string p_comp_code;
        public string p_cont_cod;
        public string p_cat_cod;

        public IEnumerable<WaitingPatient> GetWpByNs(int NS_id)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                IDataReader reader = this.objDB.ExecReaderQuery("SELECT [STAFF_TYPE],[STAFF_KEY],[STAFF_ID],[STAFF_NAME],[EPISOD_KEY],[PATIENT_ID],[SKEY],[ACUITYLEVEL],[START_DATE],[START_TIME],[EMRBEDKEY],[EMR_STATUS],[EMR_STATUS_TIME],[ISWAITINGAREA],[PATLOCNAME],[PATENGNAME],[PATIENT_SEX],[PAT_BIRTHDATE],[NUSESTATIONTYPE],[NSTATIONCODE] FROM [dbo].[NURSESTATIONWAITINGLIST] WHERE [NSTATIONCODE]=" + NS_id.ToString());
                using (reader)
                    return (IEnumerable<WaitingPatient>)reader.Select<WaitingPatient>(new Func<IDataReader, WaitingPatient>(WaitingPatient.Mapping)).ToList<WaitingPatient>();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // edit by khalifa add Chief_Complaint
        public IEnumerable<WaitingPatient> GetWpByERNs(
          int NS_id,
          string hospId)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);

                Dictionary<string, object> keyValuePairs = new Dictionary<string, object>();
                keyValuePairs.Add("@hospId", hospId);
                keyValuePairs.Add("@NS_id", NS_id.ToString());

                IDataReader reader = !(hospId == "-1") ? this.objDB.ExecReaderQuery("SELECT [STAFF_TYPE],[STAFF_KEY],[STAFF_ID],[STAFF_NAME],[EPISOD_KEY],[PATIENT_ID],[SKEY],[ACUITYLEVEL],[START_DATE],[START_TIME],[EMRBEDKEY],[EMR_STATUS],[EMR_STATUS_TIME],[ISWAITINGAREA],[PATLOCNAME],[PATENGNAME],[PATIENT_SEX],[PAT_BIRTHDATE],[NUSESTATIONTYPE],[NSTATIONCODE],WaitingTime,[Chief_Complaint] FROM fn_NurseStationWaitingList_ER(@hospId) WHERE [NSTATIONCODE]=@NS_id", keyValuePairs) : this.objDB.ExecReaderQuery("SELECT [STAFF_TYPE],[STAFF_KEY],[STAFF_ID],[STAFF_NAME],[EPISOD_KEY],[PATIENT_ID],[SKEY],[ACUITYLEVEL],[START_DATE],[START_TIME],[EMRBEDKEY],[EMR_STATUS],[EMR_STATUS_TIME],[ISWAITINGAREA],[PATLOCNAME],[PATENGNAME],[PATIENT_SEX],[PAT_BIRTHDATE],[NUSESTATIONTYPE],[NSTATIONCODE] FROM [dbo].[NurseStationWaitingList_ER] WHERE [NSTATIONCODE]=" + NS_id.ToString());

                using (reader)
                    return (IEnumerable<WaitingPatient>)reader.Select<WaitingPatient>(new Func<IDataReader, WaitingPatient>(WaitingPatient.Mapping)).ToList<WaitingPatient>();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<WaitingPatient> GetAllWpER(string hospId)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                IDataReader reader = !(hospId == "-1") ? this.objDB.ExecReaderQuery("SELECT [STAFF_TYPE],[STAFF_KEY],[STAFF_ID],[STAFF_NAME],[EPISOD_KEY],[PATIENT_ID],[SKEY],[ACUITYLEVEL],[START_DATE],[START_TIME],[EMRBEDKEY],[EMR_STATUS],[EMR_STATUS_TIME],[ISWAITINGAREA],[PATLOCNAME],[PATENGNAME],[PATIENT_SEX],[PAT_BIRTHDATE],[NUSESTATIONTYPE],[NSTATIONCODE],WaitingTime ,[Chief_Complaint] FROM fn_NurseStationWaitingList_ER(" + hospId + ")") : this.objDB.ExecReaderQuery("SELECT [STAFF_TYPE],[STAFF_KEY],[STAFF_ID],[STAFF_NAME],[EPISOD_KEY],[PATIENT_ID],[SKEY],[ACUITYLEVEL],[START_DATE],[START_TIME],[EMRBEDKEY],[EMR_STATUS],[EMR_STATUS_TIME],[ISWAITINGAREA],[PATLOCNAME],[PATENGNAME],[PATIENT_SEX],[PAT_BIRTHDATE],[NUSESTATIONTYPE],[NSTATIONCODE] FROM [dbo].[NurseStationWaitingList_ER]");
                using (reader)
                    return (IEnumerable<WaitingPatient>)reader.Select<WaitingPatient>(new Func<IDataReader, WaitingPatient>(WaitingPatient.Mapping)).ToList<WaitingPatient>();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        public WaitingPatient GetSingleWp(long pId, string hospId)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                IDataReader reader;
                if (hospId == "-1")
                    reader = this.objDB.ExecReaderQuery("SELECT [STAFF_TYPE],[STAFF_KEY],[STAFF_ID],[STAFF_NAME],[EPISOD_KEY],[PATIENT_ID],[SKEY],[ACUITYLEVEL],[START_DATE],[START_TIME],[EMRBEDKEY],[EMR_STATUS],[EMR_STATUS_TIME],[ISWAITINGAREA],[PATLOCNAME],[PATENGNAME],[PATIENT_SEX],[PAT_BIRTHDATE],[NUSESTATIONTYPE],[NSTATIONCODE] FROM [dbo].[NurseStationWaitingList_ER] WHERE [PATIENT_ID]='" + pId.ToString() + "'");
                else
                    reader = this.objDB.ExecReaderQuery("SELECT [STAFF_TYPE],[STAFF_KEY],[STAFF_ID],[STAFF_NAME],[EPISOD_KEY],[PATIENT_ID],[SKEY],[ACUITYLEVEL],[START_DATE],[START_TIME],[EMRBEDKEY],[EMR_STATUS],[EMR_STATUS_TIME],[ISWAITINGAREA],[PATLOCNAME],[PATENGNAME],[PATIENT_SEX],[PAT_BIRTHDATE],[NUSESTATIONTYPE],[NSTATIONCODE],WaitingTime ,[Chief_Complaint] FROM fn_NurseStationWaitingList_ER(" + hospId + ") WHERE [PATIENT_ID]='" + pId.ToString() + "'");
                using (reader)
                    return reader.Select<WaitingPatient>(new Func<IDataReader, WaitingPatient>(WaitingPatient.Mapping)).FirstOrDefault<WaitingPatient>();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<WaitingPatient> GetAllER(string hospId)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                IDataReader reader = !(hospId == "-1") ? this.objDB.ExecReaderQuery("SELECT [STAFF_TYPE],[STAFF_KEY],[STAFF_ID],[STAFF_NAME],[EPISOD_KEY],[PATIENT_ID],[SKEY],[ACUITYLEVEL],[START_DATE],[START_TIME],[EMRBEDKEY],[EMR_STATUS],[EMR_STATUS_TIME],[ISWAITINGAREA],[PATLOCNAME],[PATENGNAME],[PAT_BIRTHDATE],[NUSESTATIONTYPE],[NSTATIONCODE],WaitingTime ,[Chief_Complaint] FROM fn_NurseStationWaitingList_ER(" + hospId + ")") : this.objDB.ExecReaderQuery("SELECT [STAFF_TYPE],[STAFF_KEY],[STAFF_ID],[STAFF_NAME],[EPISOD_KEY],[PATIENT_ID],[SKEY],[ACUITYLEVEL],[START_DATE],[START_TIME],[EMRBEDKEY],[EMR_STATUS],[EMR_STATUS_TIME],[ISWAITINGAREA],[PATLOCNAME],[PATENGNAME],[PAT_BIRTHDATE],[NUSESTATIONTYPE],[NSTATIONCODE] FROM [dbo].[NurseStationWaitingList_ER]");
                using (reader)
                    return (IEnumerable<WaitingPatient>)reader.Select<WaitingPatient>(new Func<IDataReader, WaitingPatient>(WaitingPatient.Mapping)).ToList<WaitingPatient>();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        public  IEnumerable<ErDoctors> GetERShiftDoctors(string hospId)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                string str = "209";

           

                object obj = !(hospId == "-1") ? this.objDB.ExecScalarQuery("select ER_SpecialityKey from GetSystemParameters(" + hospId + ")") : this.objDB.ExecScalarQuery("select ER_SpecialityKey from sysparameters");
                if (obj != null && obj.ToString() != "")
                    str = obj.ToString().Trim();
                IDataReader reader;
                if (hospId == "-1")
                    reader = this.objDB.ExecReaderQuery("SELECT  fnStaff.Staff_Key, RTRIM(fnStaff.Staff_name) + SPECIALTY.latin_name  FROM v_Doctors_Rosters inner join shifts ON shifts.shiftid = v_Doctors_Rosters.shift_id INNER JOIN Staff as fnStaff ON v_Doctors_Rosters.Staff_Key = fnStaff.Staff_Key     INNER JOIN SPECIALTY ON fnStaff.Staff_Spec = SPECIALTY.Specialty_Key        WHERE v_Doctors_Rosters.specialty_key in (" + str + ") and v_Doctors_Rosters.Date_Stamp = convert(varchar,getdate(),102) and convert(datetime,shifts.totime,108) >= convert(varchar,getdate(),108) and convert(datetime,shifts.fromtime,108) <= convert(varchar,getdate(),108)and v_Doctors_Rosters.Date_Stamp = convert(varchar,getdate(),102)");
                else
                    reader = this.objDB.ExecReaderQuery("SELECT distinct fnStaff.Staff_Key, RTRIM(fnStaff.Staff_name) + ' ( " + "'+ SPECIALTY.latin_name + ' ) " + "'  as Staff_name  FROM v_Doctors_Rosters inner join shifts ON shifts.shiftid = v_Doctors_Rosters.shift_id INNER JOIN Staff_entity(" + hospId + ") as fnStaff ON v_Doctors_Rosters.Staff_Key = fnStaff.Staff_Key     INNER JOIN SPECIALTY ON fnStaff.Staff_Spec = SPECIALTY.Specialty_Key        WHERE v_Doctors_Rosters.specialty_key in (" + str + ") and v_Doctors_Rosters.Date_Stamp = convert(varchar,getdate(),102) and convert(datetime,shifts.totime,108) >= convert(varchar,getdate(),108) and convert(datetime,shifts.fromtime,108) <= convert(varchar,getdate(),108) and v_Doctors_Rosters.Date_Stamp = convert(varchar,getdate(),102) and Shifts.hospitalid = " + hospId);
                using (reader)
                    return (IEnumerable<ErDoctors>)reader.Select<ErDoctors>(new Func<IDataReader, ErDoctors>(ErDoctors.Mapping)).ToList<ErDoctors>();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        public int CheckForEpisode(long outPatRegKey)
        {
            string str = "";
            int num;
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                IDataReader dataReader = this.objDB.ExecReaderQuery("select episode_key ,patient_id,clinic_key,patient_type,pat_type,comp_code,cont_cod,cat_cod from outpatregs where sys_key=" + outPatRegKey.ToString());
                using (dataReader)
                {
                    while (dataReader.Read())
                    {
                        str = dataReader[0] == null ? "" : dataReader[0].ToString();
                        this.p_patid = dataReader[1] == null ? "" : dataReader[1].ToString();
                        this.p_clinickey = dataReader[2] == null ? "0" : dataReader[2].ToString();
                        this.p_pattype = dataReader[3] == null ? "1" : dataReader[3].ToString();
                        this.p_pattype2 = dataReader[4] == null ? "1" : dataReader[4].ToString();
                        this.p_comp_code = dataReader[5] == null ? "0" : dataReader[5].ToString();
                        this.p_cont_cod = dataReader[6] == null ? "0" : dataReader[6].ToString();
                        this.p_cat_cod = dataReader[7] == null ? "0" : dataReader[7].ToString();
                    }
                }
                num = str == null || !(str != "") || !(str != "0") || !(str != "-1") ? -1 : int.Parse(str.ToString());
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return num;
        }

        [HttpGet]
        public int CheckForSheet(long patId, long triageSheetKey, long outPatRegKey)
        {
            if (this.objDB == null)
                this.objDB = new DBInteraction(true);
            object obj = this.objDB.ExecScalarQuery("select sys_key from msheetorder where episode_key=" + outPatRegKey.ToString() + " and patient_id = " + patId.ToString() + " and sheet_key=" + triageSheetKey.ToString() + " And Status <> -1");
            return obj == null || (uint)(int)obj <= 0U ? -1 : int.Parse(obj.ToString());
        }

        [HttpPost]
        public string PatientDblClick([FromBody] string jsonWp, string uId, string hospId)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                long triageSheetKey = 1417;
                WaitingPatient waitingPatient = JsonConvert.DeserializeObject<WaitingPatient>(jsonWp, new JsonSerializerSettings()
                {
                    NullValueHandling = NullValueHandling.Ignore
                });
                long num1 = (long)this.CheckForEpisode(waitingPatient.skey);
                string str1 = "";
                try
                {
                    str1 = this.objDB.GetAttrVal("triageTemplateKey", hospId == "-1" ? 0 : int.Parse(hospId));
                }
                catch (Exception ex)
                {

                }
                string str2;
                if (str1 == "")
                {
                    object obj = !(hospId == "-1") ? this.objDB.ExecScalarQuery("select triageSheetKey from GetSystemParameters(" + hospId + ")") : this.objDB.ExecScalarQuery("select triageSheetKey from sysparameters");
                    long num2;
                    if (obj != null)
                    {
                        if (obj.ToString().Contains("|"))
                        {
                            string[] strArray = obj.ToString().Trim().Split('|');
                            for (int index = 0; index < strArray.Length; ++index)
                            {
                                string str3 = strArray[index].Trim().Split('~')[0];
                                num2 = waitingPatient.nstationcode;
                                string str4 = num2.ToString();
                                if (str3 == str4)
                                {
                                    triageSheetKey = (long)int.Parse(strArray[index].Trim().Split('~')[1]);
                                    break;
                                }
                            }
                        }
                        else if ((uint)int.Parse(obj.ToString()) > 0U)
                            triageSheetKey = (long)int.Parse(obj.ToString());
                    }
                    long num3 = waitingPatient.skey * -1L;
                    if (num1 == -1L || num1 == 0L)
                    {
                        string[] strArray = new string[9]
                        {
              "../WebMedicalSheets/MedSheet.aspx?dk=",
              triageSheetKey.ToString(),
              "&sk=",
              num3.ToString(),
              "&ui=",
              int.Parse(uId).ToString(),
              "&pi=",
              null,
              null
                        };
                        num2 = waitingPatient.patient_id;
                        strArray[7] = num2.ToString();
                        strArray[8] = "&ek=-1&st=0&bv=0";
                        str2 = string.Concat(strArray);
                    }
                    else
                    {
                        int num4 = this.CheckForSheet(waitingPatient.patient_id, triageSheetKey, waitingPatient.skey);
                        if (num4 == -1 || num4 == 0)
                        {
                            string[] strArray = new string[11]
                            {
                "../WebMedicalSheets/MedSheet.aspx?dk=",
                triageSheetKey.ToString(),
                "&sk=",
                num3.ToString(),
                "&ui=",
                int.Parse(uId).ToString(),
                "&pi=",
                null,
                null,
                null,
                null
                            };
                            num2 = waitingPatient.patient_id;
                            strArray[7] = num2.ToString();
                            strArray[8] = "&ek=";
                            strArray[9] = num1.ToString();
                            strArray[10] = "&st=0&bv=0";
                            str2 = string.Concat(strArray);
                        }
                        else
                        {
                            string[] strArray = new string[11]
                            {
                "../WebMedicalSheets/MedSheet.aspx?dk=",
                triageSheetKey.ToString(),
                "&sk=",
                num4.ToString(),
                "&ui=",
                int.Parse(uId).ToString(),
                "&pi=",
                null,
                null,
                null,
                null
                            };
                            num2 = waitingPatient.patient_id;
                            strArray[7] = num2.ToString();
                            strArray[8] = "&ek=";
                            strArray[9] = num1.ToString();
                            strArray[10] = "&st=0&bv=0";
                            str2 = string.Concat(strArray);
                        }
                    }
                }
                else
                {
                    long num5;
                    if (str1.ToString().Contains("|"))
                    {
                        string[] strArray = str1.ToString().Trim().Split('|');
                        for (int index = 0; index < strArray.Length; ++index)
                        {
                            string str5 = strArray[index].Trim().Split('~')[0];
                            num5 = waitingPatient.nstationcode;
                            string str6 = num5.ToString();
                            if (str5 == str6)
                            {
                                triageSheetKey = (long)int.Parse(strArray[index].Trim().Split('~')[1]);
                                break;
                            }
                        }
                    }
                    else if ((uint)int.Parse(str1.ToString()) > 0U)
                        triageSheetKey = (long)int.Parse(str1.ToString());
                    long num6 = waitingPatient.skey * -1L;
                    if (num1 == -1L || num1 == 0L)
                    {
                        string[] strArray = new string[15];
                        strArray[0] = "../WebMedicalTemplates/MedicalTemplate.html?PatId=";
                        num5 = waitingPatient.patient_id;
                        strArray[1] = num5.ToString();
                        strArray[2] = "&EpsKey=-1&UserID=";
                        strArray[3] = int.Parse(uId).ToString();
                        strArray[4] = "&lang=0&hospitalid=";
                        strArray[5] = this.objDB.HospitalId;
                        strArray[6] = "&syskey=";
                        strArray[7] = num6.ToString();
                        strArray[8] = "&tempkey=";
                        strArray[9] = triageSheetKey.ToString();
                        strArray[10] = "&dbcode=";
                        strArray[11] = this.objDB.DBCode;
                        strArray[12] = "&orderkey=";
                        num5 = waitingPatient.skey;
                        strArray[13] = num5.ToString();
                        strArray[14] = "&MP=-1&IsNurse=0";
                        str2 = string.Concat(strArray);
                    }
                    else
                    {
                        int num7 = this.CheckForSheet(waitingPatient.patient_id, triageSheetKey, waitingPatient.skey);
                        if (num7 == -1 || num7 == 0)
                        {
                            string[] strArray = new string[17];
                            strArray[0] = "../WebMedicalTemplates/MedicalTemplate.html?PatId=";
                            num5 = waitingPatient.patient_id;
                            strArray[1] = num5.ToString();
                            strArray[2] = "&EpsKey=";
                            strArray[3] = num1.ToString();
                            strArray[4] = "&UserID=";
                            strArray[5] = int.Parse(uId).ToString();
                            strArray[6] = "&lang=0&hospitalid=";
                            strArray[7] = this.objDB.HospitalId;
                            strArray[8] = "&syskey=";
                            strArray[9] = num6.ToString();
                            strArray[10] = "&tempkey=";
                            strArray[11] = triageSheetKey.ToString();
                            strArray[12] = "&dbcode=";
                            strArray[13] = this.objDB.DBCode;
                            strArray[14] = "&orderkey=";
                            num5 = waitingPatient.skey;
                            strArray[15] = num5.ToString();
                            strArray[16] = "&MP=-1&IsNurse=0";
                            str2 = string.Concat(strArray);
                        }
                        else
                        {
                            string[] strArray = new string[17];
                            strArray[0] = "../WebMedicalTemplates/MedicalTemplate.html?PatId=";
                            num5 = waitingPatient.patient_id;
                            strArray[1] = num5.ToString();
                            strArray[2] = "&EpsKey=";
                            strArray[3] = num1.ToString();
                            strArray[4] = "&UserID=";
                            strArray[5] = int.Parse(uId).ToString();
                            strArray[6] = "&lang=0&hospitalid=";
                            strArray[7] = this.objDB.HospitalId;
                            strArray[8] = "&syskey=";
                            strArray[9] = num7.ToString();
                            strArray[10] = "&tempkey=";
                            strArray[11] = triageSheetKey.ToString();
                            strArray[12] = "&dbcode=";
                            strArray[13] = this.objDB.DBCode;
                            strArray[14] = "&orderkey=";
                            num5 = waitingPatient.skey;
                            strArray[15] = num5.ToString();
                            strArray[16] = "&MP=-1&IsNurse=0";
                            str2 = string.Concat(strArray);
                        }
                    }
                }
                return str2;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public string PatientDblClickWindows([FromBody] string jsonWp, string uId, string hospId)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                long triageSheetKey = 1417;
                WaitingPatient waitingPatient = JsonConvert.DeserializeObject<WaitingPatient>(jsonWp, new JsonSerializerSettings()
                {
                    NullValueHandling = NullValueHandling.Ignore
                });
                long num1 = (long)this.CheckForEpisode(waitingPatient.skey);
                object obj = !(hospId == "-1") ? this.objDB.ExecScalarQuery("select triageSheetKey from GetSystemParameters(" + hospId + ")") : this.objDB.ExecScalarQuery("select triageSheetKey from sysparameters");
                if (obj != null)
                {
                    if (obj.ToString().Contains("|"))
                    {
                        string[] strArray = obj.ToString().Trim().Split('|');
                        for (int index = 0; index < strArray.Length; ++index)
                        {
                            if (strArray[index].Trim().Split('~')[0] == waitingPatient.nstationcode.ToString())
                            {
                                triageSheetKey = (long)int.Parse(strArray[index].Trim().Split('~')[1]);
                                break;
                            }
                        }
                    }
                    else if ((uint)int.Parse(obj.ToString()) > 0U)
                        triageSheetKey = (long)int.Parse(obj.ToString());
                }
                SheetsEngine sheetsEngine = new SheetsEngine();
                long num2 = waitingPatient.skey * -1L;
                string str;
                if (num1 == -1L || num1 == 0L)
                {
                    str = triageSheetKey.ToString() + "," + num2.ToString() + "," + this.objDB.GetNetPath;
                }
                else
                {
                    int num3 = this.CheckForSheet(waitingPatient.patient_id, triageSheetKey, waitingPatient.skey);
                    if (num3 == -1 || num3 == 0)
                        str = triageSheetKey.ToString() + "," + num2.ToString() + "," + this.objDB.GetNetPath;
                    else
                        str = triageSheetKey.ToString() + "," + num3.ToString() + "," + this.objDB.GetNetPath;
                }
                return str.Replace("//", "/");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public Bed MoveWPtoBed(
          string bKey,
          string pId,
          string ek,
          string drId,
          string sKey,
          string uId)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                Bed bed = (Bed)null;
                object obj1 = this.objDB.ExecScalarQuery("select EPISODEKEY from ALLBEDSPATIENTS_ER where sys_key =" + bKey + " and iswaitingarea is null and USERKEY =" + uId);
                object obj2 = this.objDB.ExecScalarQuery("select count(*) from episode  where EMRbedKey = " + bKey + " and episode_type = 0 and isnull(IsWaitingArea ,0) = 0  and patient_id in ( select distinct patient_id  from ALLBEDSPATIENTS_ER where patient_id is not null group by patient_id)");
                if ((obj1 == null || obj1 == DBNull.Value) && obj2.ToString() == "0")
                {
                    this.objDB.ExecNonQuery("update outpatregs set staff_key =" + drId + " where sys_Key=" + sKey);
                    this.objDB.ExecNonQuery("update episode set  ER_LastTransferTOloc_TIME = getdate() ,EMRBedKey =" + bKey + " where Episod_Key =" + ek);
                    this.objDB.ExecNonQuery("exec SP_LogEmergency " + ek + ", 'LOCASSIGN', 'Re-Assign Doctor', " + uId);
                    bed =  new BedsController().GetERSingleBed(pId, uId);
                }
                return bed;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public WaitingPatient TransferWPtoWP(
          string NS_id,
          long pId,
          string sKey,
          string ek,
          string hospId)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                object obj = this.objDB.ExecScalarQuery("select location_key from ASSIGNMENTS where staff_key = '" + NS_id + "' AND ASSIGNMENTS.STAFF_TYPE = 2 and LOCATION_KEY in ( select sys_key from hospstruct where LOC_TYPE = 3)");
                if (obj == null)
                    return (WaitingPatient)null;
                int num = (int)obj;
                this.objDB.ExecNonQuery("update outpatregs set clinic_key =" + num.ToString() + " where sys_Key=" + sKey);
                this.objDB.ExecNonQuery("update episode set bed_key =" + num.ToString() + " where episod_key=" + ek);
                this.objDB.ExecNonQuery("exec SP_LogEmergency " + ek + ", 'LOCASSIGN', 'Re-Assign Doctor', 0");
                return this.GetSingleWp(pId, hospId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [HttpGet]
        public Bed MoveHPtoBed(
          string bKey,
          string pId,
          string ek,
          string drId,
          string sKey,
          string uId)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                Dictionary<string , object> CheckEmrBed = new Dictionary<string , object>();
                CheckEmrBed.Add("@bKey", bKey);
                Bed bed = (Bed)null;
                if (this.objDB.ExecScalarQuery("select count(*) from episode  where EMRbedKey = @bKey and episode_type = 0 and isnull(IsWaitingArea ,0) = 0  and patient_id in ( select distinct patient_id  from ALLBEDSPATIENTS_ER where patient_id is not null group by patient_id)" , CheckEmrBed).ToString() == "0")
                {
                    Dictionary<string, object> UpdateOutParamter = new Dictionary<string, object>();
                    UpdateOutParamter.Add("@staff_key", drId);
                    UpdateOutParamter.Add("@sys_Key", sKey);

                    Dictionary<string, object> UpdateEpisode = new Dictionary<string, object>();
                    UpdateEpisode.Add("@bKey", bKey);
                    UpdateEpisode.Add("@ek", ek);

                    Dictionary<string, object> execSP_LogEmergency = new Dictionary<string, object>();
                    execSP_LogEmergency.Add("@ek", ek);
                    execSP_LogEmergency.Add("@uId", uId);

                    this.objDB.ExecNonQuery("update outpatregs set staff_key =@staff_key  where sys_Key=@sys_Key", UpdateOutParamter);
                    this.objDB.ExecNonQuery("update episode set EMRBedKey = @bKey , IsWaitingArea=null where Episod_Key = @ek", UpdateEpisode);
                    this.objDB.ExecNonQuery("exec SP_LogEmergency @ek , 'LOCASSIGN', 'Re-Assign Doctor', @uId ", execSP_LogEmergency);
                    bed = new BedsController().GetERSingleBed(pId, uId);
                }
                return bed;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public Bed MoveWPtoHP(
          string bKey,
          string pId,
          string ek,
          string drId,
          string sKey,
          string uId)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                Bed bed = (Bed)null;
                if (!(this.objDB.ExecScalarQuery("select count(*) from episode  where EMRbedKey = " + bKey + " and episode_type = 0 and isnull(IsWaitingArea ,0) = 0").ToString() == "0") || true)
                {
                    this.objDB.ExecNonQuery("update outpatregs set staff_key =" + drId + " where sys_Key=" + sKey);
                    this.objDB.ExecNonQuery("update episode set EMRBedKey =" + bKey + ",IsWaitingArea='1', WaitingArea_Time=getdate() where Episod_Key =" + ek);
                    this.objDB.ExecNonQuery("exec SP_LogEmergency " + ek + ", 'LOCASSIGN', 'Re-Assign Doctor', " + uId);
                    bed = new BedsController().GetERSingleBed(pId, uId);
                }
                return bed;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public string MoveBedtoHP(string pId, string ek, string uId)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                this.objDB.ExecNonQuery("update episode set IsWaitingArea='1', WaitingArea_Time=getdate() where Episod_Key =" + ek);
                // create by khalifa
                if (!(this.objDB.ExecScalarQuery("select count(*) from episode  where IsWaitingArea='1'  and episod_key =" + ek).ToString() == "0") || true)
                {
                    this.objDB.ExecNonQuery("exec SP_LogEmergency " + ek + ", 'LOCASSIGN', 'Re-Assign Doctor', " + uId);
                }
                return this.objDB.GetData("select count(*) from episode where IsWaitingArea='1' and episod_key =" + ek).Rows[0][0].ToString() == "0" ? "" : "Done";
            }
            catch (Exception ex)
            {
                return "";
            }
        }

        [HttpPost]
        public string MoveBedtoBed(string pId, string ek, string bk)
        {
            try
            {
                string str = "";
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                if (this.objDB.ExecScalarQuery("select count(*) from episode with (nolock) where EMRbedKey = " + bk + " and episode_type = 0 and isnull(IsWaitingArea ,0) = 0  and patient_id in ( select distinct patient_id  from ALLBEDSPATIENTS_ER where patient_id is not null group by patient_id)").ToString() == "0")
                {
                    this.objDB.ExecNonQuery("update episode set EMRBedKey=" + bk + " where Episod_Key=" + ek).ToString();
                    str = "Done";
                    this.objDB.ExecNonQuery("exec SP_LogEmergency " + ek + ", 'LOCASSIGN', 'Re-Assign Doctor', 0");
                }
                return str;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public string DischargePatient(
            string DischargOrderDate,
          string ek,
          string pId,
          string sKey,
          string dStatus,
          string uId,
          string hospId)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                int num = (int)(!(hospId == "-1") ? this.objDB.ExecScalarQuery("select top 1 [ER_DischargeStatusOnly] from GetSystemParameters(" + hospId + ")") : this.objDB.ExecScalarQuery("select top 1 [ER_DischargeStatusOnly] from sysparameters"));
                if (num == 1)
                {
                    // add DischargOrderDate  by khalifa 
                    this.objDB.ExecNonQuery("update episode set DischargOrderDate= '"+ DischargOrderDate +"',discharge_status = " + dStatus + ",discharge_user = " + uId + ", discharge_time = (substring(CONVERT(VARCHAR,GETDATE(),22),10,8) + ' ' + SUBSTRING(CONVERT(VARCHAR,getdate(),22), 19,2)) where Episod_Key =" + ek);
                }
                else
                {
                    this.objDB.ExecNonQuery("update episode set DischargOrderDate='"+ DischargOrderDate+"'  ,episode_type = 1,discharge_status = " + dStatus + ",EMRBedKey = Null,end_date = cast(getdate() as date), discharge_user = " + uId + ", discharge_time = (substring(CONVERT(VARCHAR,GETDATE(),22),10,8) + ' ' + SUBSTRING(CONVERT(VARCHAR,getdate(),22), 19,2)) where Episod_Key =" + ek);
                    this.objDB.ExecNonQuery("update outpatregs set status = 4 where episode_Key =" + ek);
                    this.objDB.ExecNonQuery("exec Dashborad_EndVisit " + this.objDB.ExecScalarQuery("select sys_key from outpatregs where episode_key = " + ek).ToString() + "," + uId);
                }
                if (dStatus == "2")
                    this.objDB.ExecNonQuery("update patient set Deceased = 1 where patient_id ='" + pId + "'");
                return num.ToString();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        // add by khalifa
        [HttpGet]
        [ActionName("CheckDischageIfDischargeOrNot")]
        public int CheckDischageIfDischargeOrNot(string ek) {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                Dictionary<string, object> Check = new Dictionary<string, object>();
                Check.Add("@ek", ek);
                int res = int.Parse(this.objDB.ExecScalarQuery("SELECT ISNULL(discharge_status, 0 ) FROM episode where episod_key = @ek", Check).ToString());
                if (res != 0) return 0;
                else return 1;
            }
            catch (Exception ex) { throw ex; }
        }


        [HttpGet]
        [ActionName("CheckMaximumCapacity")]
        public int CheckMaximumCapacity(string uId , string Ns)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                Dictionary<string, object> Check = new Dictionary<string, object>();
                Check.Add("@uId", uId);
                Check.Add("@Ns", Ns);

                string query = "select case when (SELECT count(PATIENT_ID) from fn_GetERPatients(@uId,@Ns,'')" +
                    " where iswaitingarea = 1) <= isnull((select  dbo.GetSysAttrVal_line(1882,'ER_WB_HP_MaxCount') ),10000)then 1 else 0 End AA";

                int res = int.Parse(this.objDB.ExecScalarQuery(query, Check).ToString());
                return res;
          
            }
            catch (Exception ex) { throw ex; }
        }

/*        [HttpGet]
        [ActionName("CheckMaximumCapacityWithEK")]
        public int CheckMaximumCapacityWithEpisode(string uId, string ek)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);

                Dictionary<string, object> getbkey = new Dictionary<string, object>();
                getbkey.Add("@ek", ek);
                int bkey = int.Parse(this.objDB.ExecScalarQuery("select EMRbedKey from episode where episod_key =@ek", getbkey).ToString());


                Dictionary<string, object> Check = new Dictionary<string, object>();
                Check.Add("@uId", uId);
                Check.Add("@bkey", bkey);

                string query = "select case when (SELECT count(PATIENT_ID) from fn_GetERPatients(@uId,@bKey,'')" +
                    " where iswaitingarea = 1) <= isnull((select  dbo.GetSysAttrVal_line(1882,'ER_WB_HP_MaxCount') ),10000)then 1 else 0 End AA";

                int res = int.Parse(this.objDB.ExecScalarQuery(query, Check).ToString());
                return res;

            }
            catch (Exception ex) { throw ex; }
        }
*/






        [HttpGet]
        public IEnumerable<DischareStatus> GetDischareStatus(string hospid)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                IDataReader reader = this.objDB.ExecReaderQuery("select * from fn_ER_DischargeStatus (" + hospid + ")");
                using (reader)
                    return (IEnumerable<DischareStatus>)reader.Select<DischareStatus>(new Func<IDataReader, DischareStatus>(DischareStatus.Mapping)).ToList<DischareStatus>();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        public  int CheckDischarge(string episodkey)
        {
            if (this.objDB == null)
                this.objDB = new DBInteraction(true);

            Dictionary<string, object> EpiParam = new Dictionary<string, object>();
            EpiParam.Add("@episodkey", episodkey);

            DataTable data = this.objDB.GetData("select isnull(discharge_status,0) discharge_status from episode where episod_key = (@episodkey)", EpiParam);
            return data.Rows.Count > 0 ? (int)data.Rows[0][0] : 0;
        }

        [HttpGet]
        public string GetUserKey(string uId)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                string userKey = "";
                object obj = this.objDB.ExecScalarQuery("select staff_id  from staff where  staff_key=" + uId);
                if (obj != null)
                    userKey = (string)obj;
                return userKey;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public Bed TransferTrttoHP(string NS_id, string pId, string ek, string sKey, string uId)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                string bk = "";
                object obj1 = this.objDB.ExecScalarQuery("SELECT top 1 [SYS_KEY] FROM [dbo].[ALLBEDSPATIENTS_ER_WithoutAssign] INNER JOIN [dbo].[NurseStationsRooms] on [dbo].[ALLBEDSPATIENTS_ER_WithoutAssign].PARENT_KEY = [dbo].[NurseStationsRooms].Room_key WHERE [nursestationcode]=" + NS_id + " order by SYS_KEY,ISWAITINGAREA");
                if (obj1 != null)
                    bk = ((int)obj1).ToString();
                object obj2 = this.objDB.ExecScalarQuery("select location_key from ASSIGNMENTS where staff_key = '" + NS_id + "' AND ASSIGNMENTS.STAFF_TYPE = 2 and LOCATION_KEY in ( select sys_key from hospstruct where LOC_TYPE = 3)");
                if (obj2 != null)
                {
                    int num = (int)obj2;
                    this.objDB.ExecNonQuery("update outpatregs set clinic_key =" + num.ToString() + " where sys_Key=" + sKey);
                    this.objDB.ExecNonQuery("update episode set  ER_LastTransferTOloc_TIME = getdate() , bed_key =" + num.ToString() + " where episod_key=" + ek);
                    //this.objDB.ExecNonQuery("exec SP_LogEmergency " + ek + ", 'DOCASSIGN', 'Re-Assign Doctor', " + uId);
                }
                return this.TransferAnotherArea(pId, ek, bk, uId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Bed TransferAnotherArea(string pId, string ek, string bk, string uId)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                this.objDB.ExecNonQuery("update episode set EMRBedKey=" + bk + ",IsWaitingArea='1', WaitingArea_Time=getdate() where Episod_Key=" + ek).ToString();
                // this.objDB.ExecNonQuery("exec SP_LogEmergency " + ek + ", 'DOCASSIGN', 'Re-Assign Doctor', " + uId);
                this.objDB.ExecNonQuery("exec SP_LogEmergency " + ek + ", 'AREA_ASSIGN', 'Transfer to another Area ', " + uId);

                return new BedsController().GetERSingleBed(pId, uId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        // edit by khalifa
        [HttpPost]
        public Bed ReassignDoctor(string drId,string ek , string sKey, string pId, string uId)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                Dictionary<string, object> UpdateOutParamter = new Dictionary<string, object>();
                UpdateOutParamter.Add("@drId", drId);
                UpdateOutParamter.Add("@uId", uId);
                UpdateOutParamter.Add("@sKey", sKey);

                Dictionary<string, object> ExecLogParam = new Dictionary<string, object>();
                ExecLogParam.Add("@ek", ek);
                ExecLogParam.Add("@uId", uId);


                this.objDB.ExecNonQuery("update outpatregs set staff_key =@drId  ,ReAssignERDrBy = @uId , ReAssignERDrTime = getdate() where sys_Key=@sKey", UpdateOutParamter).ToString();
                this.objDB.ExecNonQuery("exec SP_LogEmergency @ek , 'DOCASSIGN', 'Re-Assign Doctor', @uId", ExecLogParam);
                return new BedsController().GetERSingleBed(pId, uId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public Bed FastMoveWPtoBed(
          int tCode,
          string bKey,
          string pId,
          string ek,
          string drId,
          string sKey,
          string uId,
          int cBll,
          string hospId)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                bool inserted;
                int episode = this.CreateEpisode(tCode, sKey, pId, uId, cBll, hospId, out inserted);
                Bed bed = (Bed)null;
                if (episode != -1 && inserted)
                {
                    object obj = this.objDB.ExecScalarQuery("SELECT [EPISODEKEY] FROM [dbo].[ALLBEDSPATIENTS_ER] INNER JOIN [dbo].[NurseStationsRooms] on [dbo].[ALLBEDSPATIENTS_ER].PARENT_KEY = [dbo].[NurseStationsRooms].Room_key WHERE [ALLBEDSPATIENTS_ER].PATIENT_ID='" + pId + "' AND userkey='" + uId + "' and (ISWAITINGAREA <> 1 or ISWAITINGAREA is null) order by SYS_KEY,ISWAITINGAREA");
                    if (obj == null || obj == DBNull.Value)
                    {
                        this.objDB.ExecNonQuery("update outpatregs set staff_key =" + drId + " where sys_Key=" + sKey);
                        this.objDB.ExecNonQuery("update episode set  ER_LastTransferTOloc_TIME = getdate() , EMRBedKey =" + bKey + ",userid = " + uId + " where Episod_Key =" + episode.ToString());
                        bed = new BedsController().GetERSingleBed(pId, uId);
                    }
                }
                else if (episode != -1 && !inserted)
                {
                    object obj = this.objDB.ExecScalarQuery("SELECT [EPISODEKEY] FROM [dbo].[ALLBEDSPATIENTS_ER] INNER JOIN [dbo].[NurseStationsRooms] on [dbo].[ALLBEDSPATIENTS_ER].PARENT_KEY = [dbo].[NurseStationsRooms].Room_key WHERE [ALLBEDSPATIENTS_ER].PATIENT_ID='" + pId + "' AND userkey='" + uId + "' and (ISWAITINGAREA <> 1 or ISWAITINGAREA is null) order by SYS_KEY,ISWAITINGAREA");
                    if (obj == null || obj == DBNull.Value)
                    {
                        this.objDB.ExecNonQuery("update outpatregs set staff_key =" + drId + " where sys_Key=" + sKey);
                        this.objDB.ExecNonQuery("update episode set   ER_LastTransferTOloc_TIME = getdate() , EMRBedKey =" + bKey + ",emr_status=" + tCode.ToString() + ",emr_status_time=getdate() where Episod_Key =" + episode.ToString());
                        bed = new BedsController().GetERSingleBed(pId, uId);
                    }
                }
                this.objDB.ExecNonQuery("exec SP_LogEmergency " + sKey + ", 'FASTTRIAG', 'Fast Triag', " + uId);
                return bed;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public string FastMoveWPtoArea(
          int tCode,
          string aKey,
          string pId,
          string ek,
          string drId,
          string sKey,
          string uId,
          int cBll,
          string hospId)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                DataTable dataTable1 = new DataTable("fields");
                dataTable1.Columns.Add("FieldName", Type.GetType("System.String"));
                dataTable1.Columns.Add("FieldValue", Type.GetType("System.String"));
                dataTable1.Columns.Add("FieldType", Type.GetType("System.Int64"));
                dataTable1.Columns.Add("info", Type.GetType("System.String"));
                DataRow row1 = dataTable1.NewRow();
                row1["FieldName"] = (object)"triagcode";
                row1["FieldValue"] = (object)tCode.ToString();
                row1["FieldType"] = (object)"1";
                row1["info"] = (object)"";
                dataTable1.Rows.Add(row1);
                DataRow row2 = dataTable1.NewRow();
                row2["FieldName"] = (object)"AreaKey";
                row2["FieldValue"] = (object)aKey;
                row2["FieldType"] = (object)"1";
                row2["info"] = (object)"";
                dataTable1.Rows.Add(row2);
                DataTable dataTable2 = this.objDB.ExecStoredProcedure("SP_ERManage", new Dictionary<string, object>()
        {
          {
            "@cmd",
            (object) "FTMoveToArea"
          },
          {
            "@records",
            (object) dataTable1
          },
          {
            "@key",
            (object) sKey
          },
          {
            "@UserKey",
            (object) uId
          },
          {
            "@hospid",
            (object) hospId
          }
        });
                if (dataTable2.Rows.Count > 0)
                {
                    if (dataTable2.Rows[0]["PatientType"].ToString() != "1")
                    {
                        try
                        {
                            Interfacee interfacee = new Interfacee();
                            interfacee.EpisodeKey = (long)int.Parse(dataTable2.Rows[0]["EpisodeKey"].ToString());
                            interfacee.PatientID = dataTable2.Rows[0]["PatientID"].ToString();
                            interfacee.MainService = 11L;
                            long num;
                            if (this.SetSubService(hospId) == 1)
                            {
                                DataTable data = this.objDB.GetData("select * from SPECIALTYCLINICSLIST where clinic_key = 0 ");
                                num = data.Rows.Count <= 0 ? long.Parse(this.p_clinickey) : long.Parse(data.Rows[0]["Specialty_key"].ToString());
                            }
                            else
                                num = long.Parse(this.p_clinickey);
                            interfacee.VisitType = 1;
                            interfacee.AddItem(num);
                            interfacee.OriginalKey = sKey;
                            interfacee.Stat = 0;
                            interfacee.AddedBy = long.Parse(uId);
                            interfacee.Refresh();
                        }
                        catch (Exception ex)
                        {
                        }
                    }
                    try
                    {
                        if (cBll == 1)
                            this.CallBilling(dataTable2.Rows[0]["PatientID"].ToString(), int.Parse(dataTable2.Rows[0]["EpisodeKey"].ToString()), int.Parse(dataTable2.Rows[0]["CompCode"].ToString()), int.Parse(dataTable2.Rows[0]["ContCode"].ToString()), int.Parse(dataTable2.Rows[0]["PatType"].ToString()), int.Parse(uId), hospId, int.Parse(sKey));
                    }
                    catch (Exception ex)
                    {
                    }
                }
                return "";
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public Bed FastMoveWPtoHP(
          int tCode,
          string bKey,
          string pId,
          string ek,
          string drId,
          string sKey,
          string uId,
          int cBll,
          string hospId)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                bool inserted;
                int episode = this.CreateEpisode(tCode, sKey, pId, uId, cBll, hospId, out inserted);
                Bed bed = (Bed)null;
                if (episode != -1 && inserted)
                {
                    this.objDB.ExecNonQuery("update outpatregs set staff_key =" + drId + " where sys_Key=" + sKey);
                    this.objDB.ExecNonQuery("update episode set EMRBedKey =" + bKey + ",IsWaitingArea='1', WaitingArea_Time=getdate() where Episod_Key =" + episode.ToString());
                    bed = new BedsController().GetERSingleBed(pId, uId);
                }
                else if (episode != -1 && !inserted)
                {
                    this.objDB.ExecNonQuery("update outpatregs set staff_key =" + drId + " where sys_Key=" + sKey);
                    this.objDB.ExecNonQuery("update episode set EMRBedKey =" + bKey + ",emr_status=" + tCode.ToString() + ",emr_status_time=getdate(),IsWaitingArea='1', WaitingArea_Time=getdate() where Episod_Key =" + episode.ToString());
                    bed = new BedsController().GetERSingleBed(pId, uId);
                }
                this.objDB.ExecNonQuery("exec SP_LogEmergency " + sKey + ", 'FASTTRIAG', 'Fast Triag', " + uId);
                return bed;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int CreateEpisode(
          int triageCode,
          string sKey,
          string pId,
          string uId,
          int cBll,
          string hospId,
          out bool inserted)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                DataTable dataTable = new DataTable();
                if (sKey.StartsWith("-"))
                    sKey = sKey.Replace("-", "");
                int num1 = this.CheckForEpisode((long)int.Parse(sKey));
                int episodeKey;
                if (num1 == -1)
                {
                    this.objDB.ExecNonQuery("insert into episode(patient_id,pat_episode_typ ,episode_type,status,start_date,end_date,bed_key,pat_type,pattype,company_code,cont_cod,cat_cod,systime,emr_status,emr_status_time,hospitalid,userid) values ('" + pId + "',2,0,0,cast(getdate() as date),null," + this.p_clinickey + "," + this.p_pattype + "," + this.p_pattype2 + "," + this.p_comp_code + "," + this.p_cont_cod + "," + this.p_cat_cod + ",getdate()," + triageCode.ToString() + ",getdate()," + hospId + "," + uId + ")");
                    DataTable data1 = this.objDB.GetData("select max(episod_key) from episode where patient_id='" + pId + "' and pat_episode_typ= 2 and bed_key=" + this.p_clinickey);
                    inserted = true;
                    if (data1.Rows.Count > 0)
                    {
                        episodeKey = int.Parse(data1.Rows[0][0].ToString());
                        this.objDB.ExecNonQuery("update outpatregs set episode_key= " + episodeKey.ToString() + " ,status = 5 ,startby =" + uId + ",starttime=getdate() where sys_key=" + sKey);
                        if (int.Parse(this.p_pattype) != 1)
                        {
                            try
                            {
                                Interfacee interfacee = new Interfacee();
                                interfacee.EpisodeKey = (long)episodeKey;
                                interfacee.PatientID = this.p_patid;
                                interfacee.MainService = 11L;
                                long num2;
                                if (this.SetSubService(hospId) == 1)
                                {
                                    DataTable data2 = this.objDB.GetData("select * from SPECIALTYCLINICSLIST where clinic_key = 0 ");
                                    num2 = data2.Rows.Count <= 0 ? long.Parse(this.p_clinickey) : long.Parse(data2.Rows[0]["Specialty_key"].ToString());
                                }
                                else
                                    num2 = long.Parse(this.p_clinickey);
                                interfacee.VisitType = 1;
                                interfacee.AddItem(num2);
                                interfacee.OriginalKey = sKey;
                                interfacee.Stat = 0;
                                interfacee.AddedBy = long.Parse(uId);
                                interfacee.Refresh();
                            }
                            catch (Exception ex)
                            {
                            }
                        }
                        try
                        {
                            if (cBll == 1)
                                this.CallBilling(this.p_patid, episodeKey, int.Parse(this.p_comp_code), int.Parse(this.p_cont_cod), int.Parse(this.p_pattype), int.Parse(uId), hospId, int.Parse(sKey));
                        }
                        catch (Exception ex)
                        {
                        }
                    }
                    else
                        episodeKey = -1;
                }
                else
                {
                    inserted = false;
                    episodeKey = num1;
                    Dictionary<string, Object> CheckBillingParam = new Dictionary<string, object>();
                    CheckBillingParam.Add("@sys_key", sKey);
                    int checkBilling = int.Parse(  this.objDB.ExecScalarQuery("select ISNULL(SRVTAKENTR, 0 ) from OUTPATREGS where sys_key = @sys_key", CheckBillingParam).ToString());

                    if (checkBilling == 0)
                        this.CallBilling(this.p_patid, episodeKey, int.Parse(this.p_comp_code), int.Parse(this.p_cont_cod), int.Parse(this.p_pattype), int.Parse(uId), hospId, int.Parse(sKey));

                }
                return episodeKey;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void CallBilling(
          string pId,
          int episodeKey,
          int companyCode,
          int contCode,
          int patType,
          int uId,
          string hospId,
          int outPatRegKey)
        {
            if (this.objDB == null)
                this.objDB = new DBInteraction(true);
            BillingCalculations billingCalculations = new BillingCalculations();
            billingCalculations.NoRegister = false;
            billingCalculations.IsExternalValue = false;
            billingCalculations.MainServ = 11;
            long num;
            if (this.SetSubService(hospId) == 1)
            {
                DataTable data = this.objDB.GetData("select * from SPECIALTYCLINICSLIST where clinic_key = 0 ");
                num = data.Rows.Count <= 0 ? long.Parse(this.p_clinickey) : long.Parse(data.Rows[0]["Specialty_key"].ToString());
            }
            else
            {
               //                num = long.Parse(this.p_clinickey);
           
                Dictionary<string, Object> CheckBillingParam = new Dictionary<string, object>();
                CheckBillingParam.Add("@sys_key", outPatRegKey);
                num = long.Parse(this.objDB.ExecScalarQuery("select ISNULL(clinic_key, 0 ) from OUTPATREGS where sys_key = @sys_key", CheckBillingParam).ToString());// clinic key from outpatregs 
            }
            
            billingCalculations.SubServ = (int)num;
            billingCalculations.PatientID = pId;
            billingCalculations.EpisodeKey = episodeKey;
            billingCalculations.ServDate = DateTime.Today;
            billingCalculations.CompanyCode = companyCode;
            billingCalculations.ContCode = contCode;
            billingCalculations.Patienttype = patType;
            billingCalculations.VisitType = 1;
            billingCalculations.StaffKey = (int)num;
            billingCalculations.UserID = uId;

            billingCalculations.Calc_Val();
            this.objDB.ExecNonQuery("update episode set status = 1 where episod_key= " + episodeKey.ToString());
            this.objDB.ExecNonQuery("update outpatregs set SRVTAKENTR = " + billingCalculations.TransactionKey.ToString() + " Where Sys_Key = " + outPatRegKey.ToString());
        }

        public int SetSubService(string hospId)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                object obj = !(hospId == "-1") ? this.objDB.ExecScalarQuery("select USESPECIALTYASEXAMSERVICE from GetSystemParameters(" + hospId + ")") : this.objDB.ExecScalarQuery("select USESPECIALTYASEXAMSERVICE from sysparameters");
                return obj != null || obj != DBNull.Value || (string)obj != "" ? (int)obj : 0;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        public IEnumerable<Message> GetAlerts()
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                List<Message> alerts = new List<Message>();
                HttpSessionState session = HttpContext.Current.Session;
                if (session != null)
                {
                    IEnumerable<DuplexNotification> list;
                    if (session["AlertsDefinition"] != null)
                    {
                        list = (IEnumerable<DuplexNotification>)session["AlertsDefinition"];
                    }
                    else
                    {
                        IDataReader reader = this.objDB.ExecReaderQuery("select NotificationName,Category,Sql_Statement from DuplexNotifications where active=1 and notificationname like 'ER %'");
                        using (reader)
                            list = (IEnumerable<DuplexNotification>)reader.Select<DuplexNotification>(new Func<IDataReader, DuplexNotification>(DuplexNotification.Mapping)).ToList<DuplexNotification>();
                    }
                    foreach (DuplexNotification duplexNotification in list)
                    {
                        Message message = new Message();
                        message.MessageHeader = duplexNotification.category;
                        DataTable data = this.objDB.GetData(duplexNotification.sql_statement);
                        message.MessageBody.Add((object)JsonConvert.SerializeObject((object)data));
                        alerts.Add(message);
                    }
                }
                return (IEnumerable<Message>)alerts;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public string CallHL7(string param)
        {
            string str = "";
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                if (param != "" && param.Contains("~"))
                {
                    clsPHNT clsPhnt = new clsPHNT();
                    string[] strArray = param.Split('~');
                    if ((uint)strArray.Length > 0U && strArray[0].Trim().ToLower() == nameof(param))
                    {
                        switch (strArray[1].ToLower())
                        {
                            case "addpatient":
                                str = clsPhnt.HL7_AddPatient(strArray[2].Trim(), strArray[3].Trim(), strArray[4].Trim(), strArray[5].Trim(), strArray[6].Trim());
                                break;
                            case "block":
                                str = clsPhnt.HL7_ChangeBedStatus(strArray[2].Trim(), strArray[3].Trim(), strArray[4].Trim(), strArray[5].Trim(), strArray[6].Trim(), strArray[7].Trim());
                                break;
                            case "cancelreservation":
                                str = clsPhnt.HL7_ChangeBedStatus(strArray[2].Trim(), strArray[3].Trim(), strArray[4].Trim(), strArray[5].Trim(), strArray[6].Trim(), strArray[7].Trim());
                                break;
                            case "reserve":
                                str = clsPhnt.HL7_ChangeBedStatus(strArray[2].Trim(), strArray[3].Trim(), strArray[4].Trim(), strArray[5].Trim(), strArray[6].Trim(), strArray[7].Trim());
                                break;
                            case "transferpatient":
                                str = clsPhnt.HL7_TransferPatient(strArray[2].Trim(), strArray[3].Trim(), strArray[4].Trim(), strArray[5].Trim(), strArray[6].Trim(), strArray[7].Trim(), strArray[8].Trim());
                                break;
                            case "trasnfertoward":
                                str = clsPhnt.HL7_TransferPatientToWard(strArray[2].Trim(), strArray[3].Trim(), strArray[4].Trim(), strArray[5].Trim(), strArray[6].Trim());
                                break;
                            case "unblock":
                                str = clsPhnt.HL7_ChangeBedStatus(strArray[2].Trim(), strArray[3].Trim(), strArray[4].Trim(), strArray[5].Trim(), strArray[6].Trim(), strArray[7].Trim());
                                break;
                        }
                    }
                }
                return str;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        public string GetOPTOrderEpisode(string pId)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                object obj = this.objDB.ExecScalarQuery("SELECT top 1 EPISODE_KEY FROM OPTORDERS WHERE [PATIENT_ID] ='" + pId + "' and (cast(orderdate as date) = cast(getdate() as date) or cast(orderdate as date) = cast(DATEADD(day, -1, getdate()) as date))");
                return obj == null ? "0" : ((int)obj).ToString();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        public string OpenEMR(string pId, string ek, string uId, int seen)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                if (seen == 0)
                    this.objDB.ExecNonQuery("update episode set seenbyerdoctor_time=getdate() where  ISNULL(SEENBYERDOCTOR_TIME,0) = 0 AND episod_key=" + ek);
                this.objDB.ExecStoredProcedure("AppointmentsBookingTrackerAccessEMRSP", new Dictionary<string, object>()
        {
          {
            "@MRN",
            (object) pId
          },
          {
            "@EpiID",
            (object) ek
          },
          {
            "@StaffID",
            (object) uId
          },
          {
            "@Cancelreason",
            (object) DBNull.Value
          },
          {
            "@CancelreasonCode",
            (object) DBNull.Value
          },
          {
            "@ComputerName",
            (object) DBNull.Value
          },
          {
            "@MachAdress",
            (object) DBNull.Value
          },
          {
            "@Flag",
            (object) 5
          }
        });
                return "";
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet]
        public IEnumerable<Alert> GetInitialReceive(string CategoryName)
        {
            try
            {
                if (this.objDB == null)
                    this.objDB = new DBInteraction(true);
                List<Alert> initialReceive = new List<Alert>();
                foreach (DataRow row in (InternalDataCollectionBase)this.objDB.GetData(string.Format("Select Sql_Statement from DuplexNotifications where active=1 and Category like '%{0}%'", (object)CategoryName)).Rows)
                {
                    IDataReader reader = this.objDB.ExecReaderQuery(row["Sql_Statement"].ToString());
                    using (reader)
                    {
                        IEnumerable<Alert> list = (IEnumerable<Alert>)reader.Select<Alert>(new Func<IDataReader, Alert>(Alert.Mapping)).ToList<Alert>();
                        initialReceive.AddRange(list);
                    }
                }
                return (IEnumerable<Alert>)initialReceive;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
