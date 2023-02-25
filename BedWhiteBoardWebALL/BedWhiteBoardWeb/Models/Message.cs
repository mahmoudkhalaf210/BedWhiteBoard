// Decompiled with JetBrains decompiler
// Type: BedManagement.Message
// Assembly: BedManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: B1AAAA54-FA00-409D-B762-EDD976360563
// Assembly location: C:\Users\Dell\Downloads\pharmacy\BedWhiteBoardWeb_Deploy\bin\BedManagement.dll

using System;
using System.Collections.Generic;
using System.Data;

namespace BedManagement
{
    public class Message
    {
        public List<object> MessageBody = new List<object>();

        public string MessageHeader { get; set; }

        public static Message Mapping(IDataReader dr) => new Message()
        {
            MessageHeader = dr["MessageHeader"] is DBNull ? "" : dr["MessageHeader"].ToString()
        };
    }
}
