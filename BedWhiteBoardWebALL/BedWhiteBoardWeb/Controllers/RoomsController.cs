// Decompiled with JetBrains decompiler
// Type: BedManagement.RoomsController
// Assembly: BedManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: B1AAAA54-FA00-409D-B762-EDD976360563
// Assembly location: C:\Users\Dell\Downloads\pharmacy\BedWhiteBoardWeb_Deploy\bin\BedManagement.dll

using MedicaDAL;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace BedManagement
{
  public class RoomsController : ApiController
  {
    private DBInteraction objDB;


// paramertrize done by khalifa
    public IEnumerable<Room> Get(int NS_id)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
                Dictionary<string, object> roomParm = new Dictionary<string, object>();
                roomParm.Add("@NS_id", NS_id.ToString());
        IDataReader reader = this.objDB.ExecReaderQuery("SELECT [Room_key], [room_name], [nursestationcode], location, rotation, size FROM [dbo].[NurseStationsRooms] left outer join WB_Rooms on NURSESTATIONSROOMS.ROOM_KEY = WB_Rooms.Room_Id WHERE [nursestationcode]=@NS_id",roomParm);
        using (reader)
          return (IEnumerable<Room>) reader.Select<Room>(new Func<IDataReader, Room>(Room.Mapping)).ToList<Room>();
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

    public IEnumerable<Room> GetAll()
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        IDataReader reader = this.objDB.ExecReaderQuery("SELECT [Room_key], [room_name], [nursestationcode], location, rotation, size FROM [dbo].[NurseStationsRooms] left outer join WB_Rooms on NURSESTATIONSROOMS.ROOM_KEY = WB_Rooms.Room_Id");
        using (reader)
          return (IEnumerable<Room>) reader.Select<Room>(new Func<IDataReader, Room>(Room.Mapping)).ToList<Room>();
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

    public IEnumerable<Room> GetAllER()
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        IDataReader reader = this.objDB.ExecReaderQuery("SELECT [Room_key], [room_name], [nursestationcode] FROM [dbo].[NurseStationsRooms] left outer join WB_Rooms on NURSESTATIONSROOMS.ROOM_KEY = WB_Rooms.Room_Id");
        using (reader)
          return (IEnumerable<Room>) reader.Select<Room>(new Func<IDataReader, Room>(Room.MappingER)).ToList<Room>();
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

        // paramertrize done by khalifa 
        // error in condition and (NurseStationsRooms.loc_code is null or NurseStationsRooms.loc_code <> 'WA' but i don't know
        public IEnumerable<Room> GetRB(int NS_id)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
                Dictionary<string, object> roomParm = new Dictionary<string, object>();
                roomParm.Add("@NS_id", NS_id.ToString());
        IDataReader reader = this.objDB.ExecReaderQuery("SELECT [Room_key], [room_name], [nursestationcode], location, rotation, size FROM [dbo].[NurseStationsRooms] left outer join WB_Rooms on NURSESTATIONSROOMS.ROOM_KEY = WB_Rooms.Room_Id WHERE [nursestationcode]=@NS_id and (NurseStationsRooms.loc_code is null or NurseStationsRooms.loc_code <> 'WA')",roomParm);
        using (reader)
          return (IEnumerable<Room>) reader.Select<Room>(new Func<IDataReader, Room>(Room.Mapping)).ToList<Room>();
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }
        // paramertrize done by khalifa 
        // same error GetRB
        public IEnumerable<Room> GetWA(int NS_id)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
                Dictionary<string, object> roomParm = new Dictionary<string, object>();
                roomParm.Add("@NS_id", NS_id.ToString());
        IDataReader reader = this.objDB.ExecReaderQuery("SELECT [Room_key], [room_name], [nursestationcode], location, rotation, size FROM [dbo].[NurseStationsRooms] left outer join WB_Rooms on NURSESTATIONSROOMS.ROOM_KEY = WB_Rooms.Room_Id WHERE [nursestationcode]=@NS_id and (NurseStationsRooms.loc_code = 'WA')", roomParm);
        using (reader)
          return (IEnumerable<Room>) reader.Select<Room>(new Func<IDataReader, Room>(Room.Mapping)).ToList<Room>();
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

//  done by khalifa
    [HttpGet]
    public  IEnumerable<Room> GetRoomsWBedsWStatus(
      int NS_id,
      string startDate,
      string bedType,
      string uId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        IEnumerable<Bed> bedsWithStatus =  new BedsController().GetBedsWithStatus(NS_id, startDate, bedType, uId);
        IEnumerable<Room> roomsWbedsWstatus = this.Get(NS_id);
        foreach (Room room1 in roomsWbedsWstatus)
        {
          Room room = room1;
          room.beds = bedsWithStatus.Where<Bed>((Func<Bed, bool>) (a => a.parent_key == room.room_key)).ToList<Bed>();
        }
        return roomsWbedsWstatus;
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }


//  done by khalifa
    [HttpGet]
    public  IEnumerable<Room> GetErRoomsWBeds(int NS_id, string uId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        IEnumerable<Bed> erBeds = new BedsController().GetERBeds(NS_id, uId);
        List<Room> erRoomsWbeds = this.Get(NS_id).ToList<Room>();
        if (erRoomsWbeds == null)
        {
          erRoomsWbeds = new List<Room>();
          erRoomsWbeds.Add(new Room()
          {
            room_key = NS_id,
            nursestationcode = NS_id
          });
        }
        foreach (Room room in erRoomsWbeds)
          room.beds = erBeds.ToList<Bed>();
        return (IEnumerable<Room>) erRoomsWbeds;
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

        //  done by khalifa
    [HttpGet]
    public  IEnumerable<Room> GetErRoomsWBedsWStatus(
      int NS_id,
      string startDate,
      string uId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        IEnumerable<Bed> erBedsWstatus =  new BedsController().GetERBedsWStatus(NS_id, startDate, uId);
        List<Room> roomsWbedsWstatus = this.Get(NS_id).ToList<Room>();
        if (roomsWbedsWstatus == null)
        {
          roomsWbedsWstatus = new List<Room>();
          roomsWbedsWstatus.Add(new Room()
          {
            room_key = NS_id,
            nursestationcode = NS_id
          });
        }
        foreach (Room room1 in roomsWbedsWstatus)
        {
          Room room = room1;
          room.beds = erBedsWstatus.Where<Bed>((Func<Bed, bool>) (a => a.parent_key == room.room_key)).ToList<Bed>();
        }
        return (IEnumerable<Room>) roomsWbedsWstatus;
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }


        // can't make   room.beds   some functions depend on
        [HttpGet]
    public  IEnumerable<Room> GetAllErRoomsWBedsWStatus(string startDate, string uId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        IEnumerable<Bed> allErBedsWstatus =  new BedsController().GetAllERBedsWStatus(startDate, uId);
        List<Room> list =this.GetAllER().ToList<Room>();
        foreach (Room room1 in list)
        {
          Room room = room1;
          room.beds =  allErBedsWstatus.Where<Bed>((Func<Bed, bool>) (a => a.parent_key == room.room_key)).ToList<Bed>();
        }
        return (IEnumerable<Room>) list;
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

        // can't make   room.beds   some functions depend on
        [HttpGet]
    public IEnumerable<Room> GetAllRoomsWBedsWStatus(string startDate, string uId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        IEnumerable<Bed> allBedsWstatus =  new BedsController().GetAllBedsWStatus(startDate, uId);
        List<Room> list =  this.GetAll().ToList<Room>();
        foreach (Room room1 in list)
        {
          Room room = room1;
          room.beds = allBedsWstatus.Where<Bed>((Func<Bed, bool>) (a => a.parent_key == room.room_key)).ToList<Bed>();
        }
        list.RemoveAll((Predicate<Room>) (r => r.beds.Count == 0));
        return (IEnumerable<Room>) list;
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }



//  done by khalifa
    [HttpGet]
    public  IEnumerable<Room> GetRoomsWOperatingTheatres(int NS_id, string uId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        IEnumerable<Bed> operatingTheatres = new BedsController().GetOperatingTheatres(NS_id, uId);
        List<Room> woperatingTheatres = new List<Room>();
        woperatingTheatres.Add(new Room()
        {
          room_key = NS_id,
          nursestationcode = NS_id
        });
        foreach (Room room1 in woperatingTheatres)
        {
          Room room = room1;
          room.beds = operatingTheatres.Where<Bed>((Func<Bed, bool>) (a => a.parent_key == room.room_key)).ToList<Bed>();
        }
        return (IEnumerable<Room>) woperatingTheatres;
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

        //  done by khalifa  // error in loc code in GetRecoveryBeds
        [HttpGet]
    public  IEnumerable<Room> GetRoomsWRecoveryBeds(int NS_id, string uId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        IEnumerable<Bed> recoveryBeds =  new BedsController().GetRecoveryBeds(NS_id, uId);
        IEnumerable<Room> rb = this.GetRB(NS_id);
        foreach (Room room1 in rb)
        {
          Room room = room1;
          room.beds = recoveryBeds.Where<Bed>((Func<Bed, bool>) (a => a.parent_key == room.room_key)).GroupBy<Bed, int>((Func<Bed, int>) (c => c.sys_key)).Select<IGrouping<int, Bed>, Bed>((Func<IGrouping<int, Bed>, Bed>) (group => group.OrderByDescending<Bed, string>((Func<Bed, string>) (pat => pat.patient_id)).First<Bed>())).ToList<Bed>();
        }
        return rb;
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }



        //  done by khalifa  // error in loc code in GetRecoveryBeds
        [HttpGet]
    public  IEnumerable<Room> GetRoomsWRecoveryBedsWA(int NS_id, string uId)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        IEnumerable<Bed> recoveryBeds = new BedsController().GetRecoveryBeds(NS_id, uId);
        IEnumerable<Room> wa = this.GetWA(NS_id);
        foreach (Room room1 in wa)
        {
          Room room = room1;
          room.beds = recoveryBeds.Where<Bed>((Func<Bed, bool>) (a => a.parent_key == room.room_key)).ToList<Bed>();
        }
        return wa;
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }



        //  done but doen't check
    [HttpPost]
    public  void UpdateRoomsWBedsWStatus([FromBody] string jsonRooms)
    {
      try
      {
        if (this.objDB == null)
          this.objDB = new DBInteraction(true);
        IDataReader reader1 = this.objDB.ExecReaderQuery("select [Room_Id],[Location],[Rotation],[size] from [WB_Rooms]");
        List<Room> list1;
        using (reader1)
        {
          list1 = reader1.Select<Room>(new Func<IDataReader, Room>(Room.MappingLocation)).ToList<Room>();
          reader1.Close();
        }
        IDataReader reader2 =  this.objDB.ExecReaderQuery("select [Bed_Id],[Location],[Rotation] from [WB_Beds]");
        List<Bed> list2;
        using (reader2)
        {
          list2 = reader2.Select<Bed>(new Func<IDataReader, Bed>(Bed.MappingLocation)).ToList<Bed>();
          reader2.Close();
        }
        string query = "";
        foreach (Room room1 in JsonConvert.DeserializeObject<IEnumerable<Room>>(jsonRooms))
        {
          Room room = room1;
          List<Room> list3 = list1.Where<Room>((Func<Room, bool>) (r => r.room_key == room.room_key)).ToList<Room>();
          if (list3 != null && list3.Count > 0)
            query = query + "UPDATE wb_rooms SET location='" + room.location + "', size='" + room.size + "', rotation='" + (room.rotation == "NaN" ? "0" : room.rotation) + "' WHERE Room_Id='" + room.room_key.ToString() + "'; ";
          else
            query = query + "INSERT INTO wb_rooms (Room_Id,location,size,rotation) VALUES ('" + room.room_key.ToString() + "','" + (room.rotation == "NaN" ? "0" : room.rotation) + "','" + room.size + "','" + room.rotation + "');";
          foreach (Bed bed1 in room.beds)
          {
            Bed bed = bed1;
            List<Bed> list4 = list2.Where<Bed>((Func<Bed, bool>) (b => b.sys_key == bed.sys_key)).ToList<Bed>();
            if (list4 != null && list4.Count > 0)
              query = query + "UPDATE wb_beds SET location='" + bed.location + "', rotation='" + (bed.rotation == "NaN" ? "0" : bed.rotation) + "' WHERE Bed_Id='" + bed.sys_key.ToString() + "'; ";
            else
              query = query + "INSERT INTO wb_beds (Bed_Id,location,rotation) VALUES ('" + bed.sys_key.ToString() + "','" + (bed.rotation == "NaN" ? "0" : bed.rotation) + "','" + bed.rotation + "');";
          }
        }
         this.objDB.ExecNonQuery(query);
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }
  }
}
