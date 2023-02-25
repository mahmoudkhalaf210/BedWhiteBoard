// Decompiled with JetBrains decompiler
// Type: BedManagement.Controllers.EmergencyController
// Assembly: BedManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: B1AAAA54-FA00-409D-B762-EDD976360563
// Assembly location: C:\Users\Dell\Downloads\pharmacy\BedWhiteBoardWeb_Deploy\bin\BedManagement.dll

using MedicaDAL;
using System;
using System.Web.Http;

namespace BedManagement.Controllers
{
  public class EmergencyController : ApiController
  {
    private DBInteraction objDB;

    [HttpGet]
    public string GetTrgeDocsType(int hospitalID)
    {
      if (this.objDB == null)
        this.objDB = new DBInteraction(true);
      try
      {
        return this.objDB.GetAttrVal("ERTrgeDocsType", hospitalID).ToString();
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

    [HttpGet]
    public string GetEMROrDyna(int hospitalID)
    {
      if (this.objDB == null)
        this.objDB = new DBInteraction(true);
      try
      {
        return this.objDB.GetAttrVal("ERDynaID", hospitalID).ToString();
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }
  }
}
