// Decompiled with JetBrains decompiler
// Type: BedManagement.Alert
// Assembly: BedManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: B1AAAA54-FA00-409D-B762-EDD976360563
// Assembly location: C:\Users\Dell\Downloads\pharmacy\BedWhiteBoardWeb_Deploy\bin\BedManagement.dll

using System;
using System.Data;

namespace BedManagement
{
    public class Alert
    {
        public int sys_key { get; set; }

        public string patient_id { get; set; }

        public string alert_name { get; set; }

        public string add_or_remove { get; set; }

        public string status { get; set; }

        public string alert_type { get; set; }

        public string tooltip { get; set; }

        public string icon { get; set; }

        public string color { get; set; }

        public static Alert Mapping(IDataReader dr) => new Alert()
        {
            sys_key = dr["sys_key"] is DBNull ? 0 : int.Parse(dr["sys_key"].ToString()),
            patient_id = dr["patient_id"] is DBNull ? "" : dr["patient_id"].ToString(),
            alert_name = dr["alert_name"] is DBNull ? "" : dr["alert_name"].ToString(),
            add_or_remove = dr["add_or_remove"] is DBNull ? "" : dr["add_or_remove"].ToString(),
            status = dr["status"] is DBNull ? "" : dr["status"].ToString(),
            alert_type = dr["alert_type"] is DBNull ? "" : dr["alert_type"].ToString(),
            tooltip = dr["tooltip"] is DBNull ? "" : dr["tooltip"].ToString(),
            icon = dr["icon"] is DBNull ? "" : dr["icon"].ToString(),
            color = dr["color"] is DBNull ? "" : dr["color"].ToString()
        };
    }
}
