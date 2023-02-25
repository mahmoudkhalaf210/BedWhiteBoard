// Decompiled with JetBrains decompiler
// Type: BedManagement.Operation
// Assembly: BedManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: B1AAAA54-FA00-409D-B762-EDD976360563
// Assembly location: C:\Users\Dell\Downloads\pharmacy\BedWhiteBoardWeb_Deploy\bin\BedManagement.dll

using System;
using System.Data;

namespace BedManagement
{
    public class Operation
    {
        public string sys_key { get; set; }

        public string Description { get; set; }

        public int optroom { get; set; }

        public int opttype { get; set; }

        public string OptRoomName { get; set; }

        public string patient_id { get; set; }

        public string PatEngName { get; set; }

        public string episode_key { get; set; }

        public string orderdate { get; set; }

        public string fromtime { get; set; }

        public string totime { get; set; }

        public string order_time { get; set; }

        public string OptStatus { get; set; }

        public string optStatusName { get; set; }

        public string OptStatusTime { get; set; }

        public string OptExpectedEndDate { get; set; }

        public string Icon { get; set; }

        public string staff_key { get; set; }

        public string staff_name { get; set; }

        public string category { get; set; }

        public string categoryname { get; set; }

        public string consentsigned { get; set; }

        public string bloodtransfusion { get; set; }

        public string infectious { get; set; }

        public string patientAdmissionType { get; set; }

        public int recoveryBayRequired { get; set; }

        public string className { get; set; }

        public string expectedEnds_Datetime { get; set; }

        public int anesthesiaStart { get; set; }

        public string originalfromtime { get; set; }

        public string originalendtime { get; set; }

        public static Operation Mapping(IDataReader dr) => new Operation()
        {
            sys_key = dr["sys_key"] is DBNull ? "" : dr["sys_key"].ToString(),
            Description = dr["Description"] is DBNull ? "" : dr["Description"].ToString(),
            optroom = dr["optroom"] is DBNull ? 0 : int.Parse(dr["optroom"].ToString()),
            opttype = dr["opttype"] is DBNull ? 0 : int.Parse(dr["opttype"].ToString()),
            OptRoomName = dr["OptRoomName"] is DBNull ? "" : dr["OptRoomName"].ToString(),
            patient_id = dr["patient_id"] is DBNull ? "" : dr["patient_id"].ToString(),
            PatEngName = dr["PatEngName"] is DBNull ? "" : dr["PatEngName"].ToString(),
            episode_key = dr["episode_key"] is DBNull ? "" : dr["episode_key"].ToString(),
            orderdate = dr["orderdate"] is DBNull ? "" : dr["orderdate"].ToString(),
            fromtime = dr["fromtime"] is DBNull ? "" : dr["fromtime"].ToString(),
            totime = dr["totime"] is DBNull ? "" : dr["totime"].ToString(),
            order_time = dr["order_time"] is DBNull ? "" : dr["order_time"].ToString(),
            OptStatus = dr["OptStatus"] is DBNull ? "" : dr["OptStatus"].ToString(),
            optStatusName = dr["optStatusName"] is DBNull ? "" : dr["optStatusName"].ToString(),
            OptStatusTime = dr["OptStatusTime"] is DBNull ? "" : dr["OptStatusTime"].ToString(),
            OptExpectedEndDate = dr["OptExpectedEndDate"] is DBNull ? "" : dr["OptExpectedEndDate"].ToString(),
            Icon = dr["Icon"] is DBNull ? "" : dr["Icon"].ToString(),
            staff_key = dr["staff_key"] is DBNull ? "" : dr["staff_key"].ToString(),
            staff_name = dr["staff_name"] is DBNull ? "" : dr["staff_name"].ToString(),
            category = dr["category"] is DBNull ? "" : dr["category"].ToString(),
            categoryname = dr["categoryname"] is DBNull ? "" : dr["categoryname"].ToString(),
            consentsigned = dr["consentsigned"] is DBNull ? "" : dr["consentsigned"].ToString(),
            bloodtransfusion = dr["bloodtransfusion"] is DBNull ? "" : dr["bloodtransfusion"].ToString(),
            infectious = dr["infectious"] is DBNull ? "" : dr["infectious"].ToString(),
            patientAdmissionType = dr["patientAdmissionType"] is DBNull ? "" : dr["patientAdmissionType"].ToString(),
            recoveryBayRequired = dr["recoveryBayRequired"] is DBNull ? 0 : int.Parse(dr["recoveryBayRequired"].ToString()),
            className = dr["className"] is DBNull ? "" : dr["className"].ToString(),
            expectedEnds_Datetime = dr["expectedEnds_Datetime"] is DBNull ? "" : dr["expectedEnds_Datetime"].ToString(),
            anesthesiaStart = dr["anesthesiaStart"] is DBNull ? 0 : int.Parse(dr["anesthesiaStart"].ToString()),
            originalfromtime = dr["originalfromtime"] is DBNull ? "" : dr["originalfromtime"].ToString(),
            originalendtime = dr["originalendtime"] is DBNull ? "" : dr["originalendtime"].ToString()
        };
    }
}
