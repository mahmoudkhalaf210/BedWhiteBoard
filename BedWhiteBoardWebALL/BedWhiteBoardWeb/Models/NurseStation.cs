// Decompiled with JetBrains decompiler
// Type: BedManagement.NurseStation
// Assembly: BedManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: B1AAAA54-FA00-409D-B762-EDD976360563
// Assembly location: C:\Users\Dell\Downloads\pharmacy\BedWhiteBoardWeb_Deploy\bin\BedManagement.dll

using System;
using System.Collections.Generic;
using System.Data;

namespace BedManagement
{
    public class NurseStation
    {
        public List<NurseStation.NurseStationAlerts> alerts = new List<NurseStation.NurseStationAlerts>();
        public List<Room> rooms = new List<Room>();
        public List<WaitingPatient> waitingpatients = new List<WaitingPatient>();

        public long sys_key { get; set; }

        public string latin_desc { get; set; }

        public string ns_image { get; set; }

        public long occupiedPat { get; set; }

        public long occupiedMale { get; set; }

        public long occupiedFemale { get; set; }

        public long PatAdmission { get; set; }

        public long PatDischarge { get; set; }

        public long DAMA { get; set; }

        public long OutOnPass { get; set; }

        public long pendingDis { get; set; }

        public long T_in { get; set; }

        public long T_Out { get; set; }

        public long emptyBeds { get; set; }

        public long blockedBeds { get; set; }

        public long reservedBeds { get; set; }

        public long clinic_code { get; set; }

        public static NurseStation Mapping(IDataReader dr) => new NurseStation()
        {
            sys_key = dr["sys_key"] is DBNull ? 0L : (long)int.Parse(dr["sys_key"].ToString()),
            latin_desc = dr["latin_desc"] is DBNull ? (string)null : dr["latin_desc"].ToString(),
            ns_image = dr["ns_image"] is DBNull ? (string)null : dr["ns_image"].ToString(),
            occupiedPat = dr["occupiedPat"] is DBNull ? 0L : (long)int.Parse(dr["occupiedPat"].ToString()),
            PatAdmission = dr["PatAdmission"] is DBNull ? 0L : (long)int.Parse(dr["PatAdmission"].ToString()),
            PatDischarge = dr["PatDischarge"] is DBNull ? 0L : (long)int.Parse(dr["PatDischarge"].ToString()),
            DAMA = dr["DAMA"] is DBNull ? 0L : (long)int.Parse(dr["DAMA"].ToString()),
            OutOnPass = dr["OutOnPass"] is DBNull ? 0L : (long)int.Parse(dr["OutOnPass"].ToString()),
            pendingDis = dr["pendingDis"] is DBNull ? 0L : (long)int.Parse(dr["pendingDis"].ToString()),
            T_in = dr["T_in"] is DBNull ? 0L : (long)int.Parse(dr["T_in"].ToString()),
            T_Out = dr["T_Out"] is DBNull ? 0L : (long)int.Parse(dr["T_Out"].ToString()),
            emptyBeds = dr["emptyBeds"] is DBNull ? 0L : (long)int.Parse(dr["emptyBeds"].ToString()),
            blockedBeds = dr.HasColumn("blockedBeds") ? (dr["blockedBeds"] is DBNull ? 0L : (long)int.Parse(dr["reservedBeds"].ToString())) : 0L,
            reservedBeds = dr.HasColumn("reservedBeds") ? (dr["reservedBeds"] is DBNull ? 0L : (long)int.Parse(dr["reservedBeds"].ToString())) : 0L,
            clinic_code = dr.HasColumn("clinic_code") ? (dr["clinic_code"] is DBNull ? 0L : (long)int.Parse(dr["clinic_code"].ToString())) : 0L
        };

        public static NurseStation MappingOP(IDataReader dr) => new NurseStation()
        {
            sys_key = dr["sys_key"] is DBNull ? 0L : (long)int.Parse(dr["sys_key"].ToString()),
            latin_desc = dr["latin_desc"] is DBNull ? (string)null : dr["latin_desc"].ToString()
        };

        public class NurseStationAlerts
        {
            public int NS_key { get; set; }

            public string alert_name { get; set; }

            public string alert_type { get; set; }

            public string toolTip { get; set; }

            public string icon { get; set; }

            public string color { get; set; }

            public static NurseStation.NurseStationAlerts Mapping(IDataReader dr) => new NurseStation.NurseStationAlerts()
            {
                NS_key = dr["ns_key"] is DBNull ? 0 : int.Parse(dr["ns_key"].ToString()),
                alert_name = dr["alert_name"] is DBNull ? "" : dr["alert_name"].ToString(),
                alert_type = dr["Alert_Type"] is DBNull ? "" : dr["Alert_Type"].ToString(),
                toolTip = dr["ToolTip"] is DBNull ? "" : dr["ToolTip"].ToString(),
                icon = dr["icon"] is DBNull ? "" : dr["icon"].ToString(),
                color = dr["color"] is DBNull ? "" : dr["color"].ToString()
            };
        }
    }
}
