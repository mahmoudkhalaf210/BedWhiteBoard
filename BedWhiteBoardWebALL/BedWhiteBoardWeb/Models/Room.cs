// Decompiled with JetBrains decompiler
// Type: BedManagement.Room
// Assembly: BedManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: B1AAAA54-FA00-409D-B762-EDD976360563
// Assembly location: C:\Users\Dell\Downloads\pharmacy\BedWhiteBoardWeb_Deploy\bin\BedManagement.dll

using System;
using System.Collections.Generic;
using System.Data;

namespace BedManagement
{
    public class Room
    {
        public List<Bed> beds = new List<Bed>();

        public int room_key { get; set; }

        public string room_name { get; set; }

        public int nursestationcode { get; set; }

        public string location { get; set; }

        public string rotation { get; set; }

        public string size { get; set; }

        public static Room Mapping(IDataReader dr) => new Room()
        {
            room_key = dr["Room_key"] is DBNull ? 0 : int.Parse(dr["Room_key"].ToString()),
            room_name = dr["room_name"] is DBNull ? "" : dr["room_name"].ToString(),
            nursestationcode = dr["nursestationcode"] is DBNull ? 0 : int.Parse(dr["nursestationcode"].ToString()),
            location = dr["location"] is DBNull ? "" : dr["location"].ToString(),
            rotation = dr["rotation"] is DBNull ? "" : dr["rotation"].ToString(),
            size = dr["size"] is DBNull ? "" : dr["size"].ToString()
        };

        public static Room MappingLocation(IDataReader dr) => new Room()
        {
            room_key = dr["Room_Id"] is DBNull ? 0 : int.Parse(dr["Room_Id"].ToString()),
            location = dr["location"] is DBNull ? "" : dr["location"].ToString(),
            rotation = dr["rotation"] is DBNull ? "" : dr["rotation"].ToString(),
            size = dr["size"] is DBNull ? "" : dr["size"].ToString()
        };

        public static Room MappingER(IDataReader dr) => new Room()
        {
            room_key = dr["Room_key"] is DBNull ? 0 : int.Parse(dr["Room_key"].ToString()),
            room_name = dr["room_name"] is DBNull ? "" : dr["room_name"].ToString(),
            nursestationcode = dr["nursestationcode"] is DBNull ? 0 : int.Parse(dr["nursestationcode"].ToString())
        };
    }
}
