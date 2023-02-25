// Decompiled with JetBrains decompiler
// Type: BedManagement.TriageLevels
// Assembly: BedManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: B1AAAA54-FA00-409D-B762-EDD976360563
// Assembly location: C:\Users\Dell\Downloads\pharmacy\BedWhiteBoardWeb_Deploy\bin\BedManagement.dll

using System;
using System.Data;

namespace BedManagement
{
    public class TriageLevels
    {
        public int main_cod { get; set; }

        public int sub_cod { get; set; }

        public string latin_desc { get; set; }

        public string local_desc { get; set; }

        public static TriageLevels Mapping(IDataReader dr) => new TriageLevels()
        {
            main_cod = dr["main_cod"] is DBNull ? 0 : int.Parse(dr["main_cod"].ToString()),
            sub_cod = dr["sub_cod"] is DBNull ? 0 : int.Parse(dr["sub_cod"].ToString()),
            latin_desc = dr["latin_desc"] is DBNull ? "" : dr["latin_desc"].ToString(),
            local_desc = dr["local_desc"] is DBNull ? "" : dr["local_desc"].ToString()
        };
    }
}
