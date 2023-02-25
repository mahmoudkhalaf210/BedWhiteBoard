// Decompiled with JetBrains decompiler
// Type: BedManagement.DuplexNotification
// Assembly: BedManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: B1AAAA54-FA00-409D-B762-EDD976360563
// Assembly location: C:\Users\Dell\Downloads\pharmacy\BedWhiteBoardWeb_Deploy\bin\BedManagement.dll

using System;
using System.Data;

namespace BedManagement
{
    public class DuplexNotification
    {
        public string notificationname { get; set; }

        public string category { get; set; }

        public string sql_statement { get; set; }

        public static DuplexNotification Mapping(IDataReader dr) => new DuplexNotification()
        {
            notificationname = dr["notificationname"] is DBNull ? "" : dr["notificationname"].ToString(),
            category = dr["category"] is DBNull ? "" : dr["category"].ToString(),
            sql_statement = dr["sql_statement"] is DBNull ? "" : dr["sql_statement"].ToString()
        };
    }
}
