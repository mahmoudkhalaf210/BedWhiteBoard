// Decompiled with JetBrains decompiler
// Type: BedManagement.DischareStatus
// Assembly: BedManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: B1AAAA54-FA00-409D-B762-EDD976360563
// Assembly location: C:\Users\Dell\Downloads\pharmacy\BedWhiteBoardWeb_Deploy\bin\BedManagement.dll

using System;
using System.Data;

namespace BedManagement
{
    public class DischareStatus
    {
        public int status_id { get; set; }

        public string status_name { get; set; }

        public string doc_code { get; set; }

        public static DischareStatus Mapping(IDataReader dr) => new DischareStatus()
        {
            status_id = dr["sub_cod"] is DBNull ? 0 : int.Parse(dr["sub_cod"].ToString()),
            status_name = dr["latin_desc"] is DBNull ? "" : dr["latin_desc"].ToString(),
            doc_code = dr["DocCode"] is DBNull ? "" : dr["DocCode"].ToString()
        };
    }
}
