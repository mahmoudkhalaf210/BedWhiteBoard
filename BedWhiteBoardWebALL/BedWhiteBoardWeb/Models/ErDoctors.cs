// Decompiled with JetBrains decompiler
// Type: BedManagement.ErDoctors
// Assembly: BedManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: B1AAAA54-FA00-409D-B762-EDD976360563
// Assembly location: C:\Users\Dell\Downloads\pharmacy\BedWhiteBoardWeb_Deploy\bin\BedManagement.dll

using System;
using System.Data;

namespace BedManagement
{
    public class ErDoctors
    {
        public int doctor_id { get; set; }

        public string doctor_name { get; set; }

        public static ErDoctors Mapping(IDataReader dr) => new ErDoctors()
        {
            doctor_id = dr["Staff_Key"] is DBNull ? 0 : int.Parse(dr["Staff_Key"].ToString()),
            doctor_name = dr["Staff_name"] is DBNull ? "" : dr["Staff_name"].ToString()
        };
    }
}
