// Decompiled with JetBrains decompiler
// Type: BedManagement.SysParams
// Assembly: BedManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: B1AAAA54-FA00-409D-B762-EDD976360563
// Assembly location: C:\Users\Dell\Downloads\pharmacy\BedWhiteBoardWeb_Deploy\bin\BedManagement.dll

using System;
using System.Data;

namespace BedManagement
{
    public class SysParams
    {
        public int alertSize { get; set; }

        public string er_maxtime { get; set; }

        public string er_maxtriagetime { get; set; }

        public string er_maxwaitingareatime { get; set; }

        public string patient_age_icon { get; set; }

        public int er_enablefasttriage { get; set; }

        public int er_enablebilling { get; set; }

        public int enable_alphanumric_pid { get; set; }

        public static SysParams Mapping(IDataReader dr) => new SysParams()
        {
            alertSize = dr["alertsize"] is DBNull ? 0 : int.Parse(dr["alertsize"].ToString()),
            er_maxtime = dr["er_maxtime"] is DBNull ? "" : dr["er_maxtime"].ToString(),
            er_maxtriagetime = dr["er_maxtriagetime"] is DBNull ? "" : dr["er_maxtriagetime"].ToString(),
            er_maxwaitingareatime = dr["er_maxwaitingareatime"] is DBNull ? "" : dr["er_maxwaitingareatime"].ToString(),
            patient_age_icon = dr["patient_age_icon"] is DBNull ? "" : dr["patient_age_icon"].ToString(),
            er_enablefasttriage = dr["er_enablefasttriage"] is DBNull ? 0 : int.Parse(dr["er_enablefasttriage"].ToString()),
            er_enablebilling = dr["er_enablebilling"] is DBNull ? 0 : int.Parse(dr["er_enablebilling"].ToString()),
            enable_alphanumric_pid = dr["enable_alphanumric_pid"] is DBNull ? 0 : int.Parse(dr["enable_alphanumric_pid"].ToString())
        };
    }
}
