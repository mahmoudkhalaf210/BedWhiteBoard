// Decompiled with JetBrains decompiler
// Type: BedManagement.WaitingPatient
// Assembly: BedManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: B1AAAA54-FA00-409D-B762-EDD976360563
// Assembly location: C:\Users\Dell\Downloads\pharmacy\BedWhiteBoardWeb_Deploy\bin\BedManagement.dll

using System;
using System.Data;

namespace BedManagement
{
    public class WaitingPatient
    {
        public long staff_type { get; set; }

        public long staff_key { get; set; }

        public string staff_id { get; set; }

        public string staff_name { get; set; }

        public long episode_key { get; set; }

        public long patient_id { get; set; }

        public long skey { get; set; }

        public long acuitylevel { get; set; }

        public string start_date { get; set; }

        public string start_time { get; set; }

        public long emrbedkey { get; set; }

        public long emr_status { get; set; }

        public string emr_status_time { get; set; }

        public long iswaitingarea { get; set; }

        public string patlocname { get; set; }

        public string patengname { get; set; }

        public string patient_sex { get; set; }

        public string pat_birthdate { get; set; }

        public long nusestationtype { get; set; }

        public long nstationcode { get; set; }

        public long WaitingTime { get; set; }

        // add by khalifa
        public string Chief_Complaint { get; set; }

        public static WaitingPatient Mapping(IDataReader dr) => new WaitingPatient()
        {
            staff_type = dr["staff_type"] is DBNull ? 0L : long.Parse(dr["staff_type"].ToString()),
            staff_key = dr["staff_key"] is DBNull ? 0L : long.Parse(dr["staff_key"].ToString()),
            staff_id = dr["staff_id"] is DBNull ? "" : dr["staff_id"].ToString(),
            staff_name = dr["staff_name"] is DBNull ? "" : dr["staff_name"].ToString(),
            episode_key = dr["episod_key"] is DBNull ? 0L : long.Parse(dr["episod_key"].ToString()),
            patient_id = dr["patient_id"] is DBNull ? 0L : long.Parse(dr["patient_id"].ToString()),
            skey = dr["skey"] is DBNull ? 0L : long.Parse(dr["skey"].ToString()),
            acuitylevel = dr["acuitylevel"] is DBNull ? 0L : long.Parse(dr["acuitylevel"].ToString()),
            start_date = dr["start_date"] is DBNull ? "" : DateTime.Parse(dr["start_date"].ToString()).ToString("s"),
            start_time = dr["start_time"] is DBNull ? "" : DateTime.Parse(dr["start_time"].ToString()).ToString("s"),
            emrbedkey = dr["emrbedkey"] is DBNull ? 0L : long.Parse(dr["emrbedkey"].ToString()),
            emr_status = dr["emr_status"] is DBNull ? 0L : long.Parse(dr["emr_status"].ToString()),
            emr_status_time = dr["emr_status_time"] is DBNull ? "" : DateTime.Parse(dr["emr_status_time"].ToString()).ToString("s"),
            iswaitingarea = dr["iswaitingarea"] is DBNull ? 0L : long.Parse(dr["iswaitingarea"].ToString()),
            patlocname = dr["patlocname"] is DBNull ? "" : dr["patlocname"].ToString(),
            patengname = dr["patengname"] is DBNull ? "" : dr["patengname"].ToString(),
            patient_sex = dr["patient_sex"] is DBNull ? "" : dr["patient_sex"].ToString(),
            pat_birthdate = dr["pat_birthdate"] is DBNull ? "" : DateTime.Parse(dr["pat_birthdate"].ToString()).ToString("s"),
            nusestationtype = dr["nusestationtype"] is DBNull ? 0L : long.Parse(dr["nusestationtype"].ToString()),
            nstationcode = dr["nstationcode"] is DBNull ? 0L : long.Parse(dr["nstationcode"].ToString()),
            WaitingTime = dr["WaitingTime"] is DBNull ? 0L : long.Parse(dr["WaitingTime"].ToString()),
            Chief_Complaint = dr["Chief_Complaint"] is DBNull ? "" : dr["Chief_Complaint"].ToString()
        };
    }
}
