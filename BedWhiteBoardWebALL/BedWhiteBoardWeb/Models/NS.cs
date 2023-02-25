// Decompiled with JetBrains decompiler
// Type: BedManagement.NS
// Assembly: BedManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: B1AAAA54-FA00-409D-B762-EDD976360563
// Assembly location: C:\Users\Dell\Downloads\pharmacy\BedWhiteBoardWeb_Deploy\bin\BedManagement.dll

using System;
using System.Data;

namespace BedManagement
{
    public class NS
    {
        public int sys_key { get; set; }

        public string tree { get; set; }

        public int hospcode { get; set; }

        public int parent_key { get; set; }

        public static NS Mapping(IDataReader dr) => new NS()
        {
            sys_key = dr["sys_key"] is DBNull ? 0 : int.Parse(dr["sys_key"].ToString()),
            tree = dr["tree"] is DBNull ? (string)null : dr["tree"].ToString(),
            hospcode = dr["hospcode"] is DBNull ? 0 : int.Parse(dr["hospcode"].ToString()),
            parent_key = dr["parent_key"] is DBNull ? 0 : int.Parse(dr["parent_key"].ToString())
        };
    }
}
