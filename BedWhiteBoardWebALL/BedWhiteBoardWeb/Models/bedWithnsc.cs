// Decompiled with JetBrains decompiler
// Type: BedManagement.Bed
// Assembly: BedManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: B1AAAA54-FA00-409D-B762-EDD976360563
// Assembly location: C:\Users\Dell\Downloads\pharmacy\BedWhiteBoardWeb_Deploy\bin\BedManagement.dll

// remove some properties from bed to fix some error
// add by khalifa 
// properties  removed from bed (Chief_Complaint , nursestationcode , AdmissionRequested , location_type  , investigation_type ,admitted , and pat_location )


using System;
using System.Data;

namespace BedManagement
{
    public class bedWithnsc
    {
        public int sys_key { get; set; }

        public int parent_key { get; set; }

        public int maintainance { get; set; }

        public int active { get; set; }

        public int inactive { get; set; }

        public int isolated { get; set; }

        public int undercleaning { get; set; }

        public string latin_desc { get; set; }

        public int sex { get; set; }

        public int bed_class { get; set; }

        public string patient_id { get; set; }

        public string patient_id_2 { get; set; }

        public int patient_sex { get; set; }

        public string patengname { get; set; }


        public string patlocname { get; set; }

        public int status { get; set; }

        public string pat_bithdate { get; set; }

        public string start_date { get; set; }

        public string systime { get; set; }

        public string emr_status_time { get; set; }

        public int emr_status { get; set; }

        public int iswaitingarea { get; set; }

        public int episodekey { get; set; }

        public string physician { get; set; }

        public int physician_key { get; set; }

        public string specialty { get; set; }

        public string bedclassname { get; set; }

        public int bedtype { get; set; }

        public int clinickey { get; set; }

        public string nurse { get; set; }

        public int price { get; set; }

        public string seenbyerdoctor_time { get; set; }

        public string dischargorderdate { get; set; }


        public int nursestationcode { get; set; }





        public string statusName { get; set; }

        public string icon { get; set; }

        public string color { get; set; }

        public string room_Name { get; set; }

        public string location { get; set; }

        public string rotation { get; set; }

        public string score { get; set; }

        public string refwaitintime { get; set; }

        public static bedWithnsc MappingER(IDataReader dr) => new bedWithnsc()
        {
            sys_key = dr["sys_key"] is DBNull ? 0 : int.Parse(dr["sys_key"].ToString()),
            parent_key = dr["parent_key"] is DBNull ? 0 : int.Parse(dr["parent_key"].ToString()),
            maintainance = dr["maintaince"] is DBNull ? 0 : int.Parse(dr["maintaince"].ToString()),
            active = dr["active"] is DBNull ? 0 : int.Parse(dr["active"].ToString()),
            inactive = dr["inactive"] is DBNull ? 0 : int.Parse(dr["inactive"].ToString()),
            isolated = dr["isolated"] is DBNull ? 0 : int.Parse(dr["isolated"].ToString()),
            undercleaning = dr["undercleaning"] is DBNull ? 0 : int.Parse(dr["undercleaning"].ToString()),
            latin_desc = dr["latin_desc"] is DBNull ? "" : dr["latin_desc"].ToString(),
            sex = dr["sex"] is DBNull ? 0 : int.Parse(dr["sex"].ToString()),
            bed_class = dr["bed_class"] is DBNull ? 0 : int.Parse(dr["bed_class"].ToString()),
            patient_id = dr["patient_id"] is DBNull ? "" : dr["patient_id"].ToString(),
            patient_sex = dr["patient_sex"] is DBNull ? 0 : int.Parse(dr["patient_sex"].ToString()),
            patengname = dr["patengname"] is DBNull ? "" : dr["patengname"].ToString(),
            patlocname = dr["patlocname"] is DBNull ? "" : dr["patlocname"].ToString(),
            status = dr["status"] is DBNull ? 0 : int.Parse(dr["status"].ToString()),
            pat_bithdate = dr["pat_birthdate"] is DBNull ? "" : dr["pat_birthdate"].ToString(),
            start_date = dr["start_date"] is DBNull ? "" : dr["start_date"].ToString(),
            systime = dr["systime"] is DBNull ? "" : dr["systime"].ToString(),
            emr_status_time = dr["emr_status_time"] is DBNull ? "" : dr["emr_status_time"].ToString(),
            emr_status = dr["emr_status"] is DBNull ? 0 : int.Parse(dr["emr_status"].ToString()),
            iswaitingarea = dr["iswaitingarea"] is DBNull ? 0 : int.Parse(dr["iswaitingarea"].ToString()),
            episodekey = dr["episodekey"] is DBNull ? 0 : int.Parse(dr["episodekey"].ToString()),
            physician = dr["physician"] is DBNull ? "" : dr["physician"].ToString(),
            physician_key = dr["physician_key"] is DBNull ? 0 : int.Parse(dr["physician_key"].ToString()),
            specialty = dr["specialty"] is DBNull ? "" : dr["specialty"].ToString(),
            bedclassname = dr["bedclassname"] is DBNull ? "" : dr["bedclassname"].ToString(),
            bedtype = dr["bedtype"] is DBNull ? 0 : int.Parse(dr["bedtype"].ToString()),
            clinickey = dr["clinickey"] is DBNull ? 0 : int.Parse(dr["clinickey"].ToString()),
            nurse = dr["nurse"] is DBNull ? "" : dr["nurse"].ToString(),
            price = dr["price"] is DBNull || dr["price"].ToString() == "" ? 0 : int.Parse(dr["price"].ToString()),
            seenbyerdoctor_time = dr["seenbyerdoctor_time"] is DBNull ? "" : dr["seenbyerdoctor_time"].ToString(),
            dischargorderdate = dr["dischargorderdate"] is DBNull ? "" : dr["dischargorderdate"].ToString(),
            nursestationcode = dr["nursestationcode"] is DBNull ? 0 : int.Parse(dr["nursestationcode"].ToString()),
            score = dr["score"] is DBNull ? "" : dr["score"].ToString(),
            refwaitintime = dr["refwaitintime"] is DBNull ? "" : dr["refwaitintime"].ToString()
        };

        public static bedWithnsc Mapping(IDataReader dr) => new bedWithnsc()
        {
            sys_key = dr["sys_key"] is DBNull ? 0 : int.Parse(dr["sys_key"].ToString()),
            parent_key = dr["parent_key"] is DBNull ? 0 : int.Parse(dr["parent_key"].ToString()),
            maintainance = dr["maintaince"] is DBNull ? 0 : int.Parse(dr["maintaince"].ToString()),
            active = dr["active"] is DBNull ? 0 : int.Parse(dr["active"].ToString()),
            inactive = dr["inactive"] is DBNull ? 0 : int.Parse(dr["inactive"].ToString()),
            isolated = dr["isolated"] is DBNull ? 0 : int.Parse(dr["isolated"].ToString()),
            undercleaning = dr["undercleaning"] is DBNull ? 0 : int.Parse(dr["undercleaning"].ToString()),
            latin_desc = dr["latin_desc"] is DBNull ? "" : dr["latin_desc"].ToString(),
            sex = dr["sex"] is DBNull ? 0 : int.Parse(dr["sex"].ToString()),
            bed_class = dr["bed_class"] is DBNull ? 0 : int.Parse(dr["bed_class"].ToString()),
            patient_id = dr["patient_id"] is DBNull ? "" : dr["patient_id"].ToString(),
            patient_sex = dr["patient_sex"] is DBNull ? 0 : int.Parse(dr["patient_sex"].ToString()),
            patengname = dr["patengname"] is DBNull ? "" : dr["patengname"].ToString(),
            patlocname = dr["patlocname"] is DBNull ? "" : dr["patlocname"].ToString(),
            status = dr["status"] is DBNull ? 0 : int.Parse(dr["status"].ToString()),
            pat_bithdate = dr["pat_birthdate"] is DBNull ? "" : dr["pat_birthdate"].ToString(),
            start_date = dr["start_date"] is DBNull ? "" : dr["start_date"].ToString(),
            systime = dr["systime"] is DBNull ? "" : dr["systime"].ToString(),
            emr_status_time = dr["emr_status_time"] is DBNull ? "" : dr["emr_status_time"].ToString(),
            emr_status = dr["emr_status"] is DBNull ? 0 : int.Parse(dr["emr_status"].ToString()),
            iswaitingarea = dr["iswaitingarea"] is DBNull ? 0 : int.Parse(dr["iswaitingarea"].ToString()),
            episodekey = dr["episodekey"] is DBNull ? 0 : int.Parse(dr["episodekey"].ToString()),
            physician = dr["physician"] is DBNull ? "" : dr["physician"].ToString(),
            physician_key = dr["physician_key"] is DBNull ? 0 : int.Parse(dr["physician_key"].ToString()),
            specialty = dr["specialty"] is DBNull ? "" : dr["specialty"].ToString(),
            bedclassname = dr["bedclassname"] is DBNull ? "" : dr["bedclassname"].ToString(),
            bedtype = dr["bedtype"] is DBNull ? 0 : int.Parse(dr["bedtype"].ToString()),
            clinickey = dr["clinickey"] is DBNull ? 0 : int.Parse(dr["clinickey"].ToString()),
            nurse = dr["nurse"] is DBNull ? "" : dr["nurse"].ToString(),
            price = dr["price"] is DBNull || dr["price"].ToString() == "" ? 0 : int.Parse(dr["price"].ToString()),
            nursestationcode = dr["nursestationcode"] is DBNull ? 0 : int.Parse(dr["nursestationcode"].ToString()),
        };

        public static bedWithnsc MappingRB(IDataReader dr) => new bedWithnsc()
        {
            sys_key = dr["sys_key"] is DBNull ? 0 : int.Parse(dr["sys_key"].ToString()),
            parent_key = dr["parent_key"] is DBNull ? 0 : int.Parse(dr["parent_key"].ToString()),
            active = dr["active"] is DBNull ? 0 : int.Parse(dr["active"].ToString()),
            latin_desc = dr["latin_desc"] is DBNull ? "" : dr["latin_desc"].ToString(),
            sex = dr["sex"] is DBNull ? 0 : int.Parse(dr["sex"].ToString()),
            patient_id = dr["patient_id"] is DBNull ? "" : dr["patient_id"].ToString(),
            patient_id_2 = dr["patient_id_2"] is DBNull ? "" : dr["patient_id_2"].ToString(),
            patient_sex = dr["patient_sex"] is DBNull ? 0 : int.Parse(dr["patient_sex"].ToString()),
            patengname = dr["patengname"] is DBNull ? "" : dr["patengname"].ToString(),
            patlocname = dr["patlocname"] is DBNull ? "" : dr["patlocname"].ToString(),
            pat_bithdate = dr["pat_birthdate"] is DBNull ? "" : dr["pat_birthdate"].ToString(),
            start_date = dr["start_date"] is DBNull ? "" : dr["start_date"].ToString(),
            systime = dr["systime"] is DBNull ? "" : dr["systime"].ToString(),
            episodekey = dr["episodekey"] is DBNull ? 0 : int.Parse(dr["episodekey"].ToString()),
            physician_key = dr["physician_key"] is DBNull ? 0 : int.Parse(dr["physician_key"].ToString()),
            physician = dr["physician_name"] is DBNull ? "" : dr["physician_name"].ToString()
        };

        public static bedWithnsc MappingOP(IDataReader dr) => new bedWithnsc()
        {
            sys_key = dr["sys_key"] is DBNull ? 0 : int.Parse(dr["sys_key"].ToString()),
            parent_key = dr["NURSESTATIONCODE"] is DBNull ? 0 : int.Parse(dr["NURSESTATIONCODE"].ToString()),
            latin_desc = dr["latin_desc"] is DBNull ? "" : dr["latin_desc"].ToString()
        };

        public static bedWithnsc MappingStatus(IDataReader dr) => new bedWithnsc()
        {
            sys_key = dr["sys_key"] is DBNull ? 0 : int.Parse(dr["sys_key"].ToString()),
            statusName = dr["statusName"] is DBNull ? "" : dr["statusName"].ToString(),
            icon = dr["icon"] is DBNull ? "" : dr["icon"].ToString(),
            color = dr["color"] is DBNull ? "" : dr["color"].ToString()
        };

        public static bedWithnsc MappingLocation(IDataReader dr) => new bedWithnsc()
        {
            sys_key = dr["bed_id"] is DBNull ? 0 : int.Parse(dr["bed_id"].ToString()),
            location = dr["location"] is DBNull ? "" : dr["location"].ToString(),
            rotation = dr["rotation"] is DBNull ? "" : dr["rotation"].ToString()
        };
    }
}
