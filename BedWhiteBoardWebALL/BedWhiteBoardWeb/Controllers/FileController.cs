// Decompiled with JetBrains decompiler
// Type: BedManagement.Controllers.FileController
// Assembly: BedManagement, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
// MVID: B1AAAA54-FA00-409D-B762-EDD976360563
// Assembly location: C:\Users\Dell\Downloads\pharmacy\BedWhiteBoardWeb_Deploy\bin\BedManagement.dll

using MedicaDAL;
using System;
using System.Collections.Specialized;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace BedManagement.Controllers
{
  public class FileController : ApiController
  {
    private DBInteraction objDB;

    [HttpPost]
    public HttpResponseMessage Upload(string nsCode)
    {
      HttpRequest request = HttpContext.Current.Request;
      HttpResponseMessage response;
      if (request.Files.Count > 0)
      {
        string filename = "";
        foreach (string file1 in (NameObjectCollectionBase) request.Files)
        {
          HttpPostedFile file2 = request.Files[file1];
          filename = HttpContext.Current.Server.MapPath("/images/" + file2.FileName);
          file2.SaveAs(filename);
          try
          {
            if (this.objDB == null)
              this.objDB = new DBInteraction(true);
            this.objDB.ExecScalarQuery("update hospstruct set ns_image='" + file2.FileName + "' where sys_key=" + nsCode);
          }
          catch (Exception ex)
          {
            throw ex;
          }
        }
        response = this.Request.CreateResponse<string>(HttpStatusCode.Created, filename);
      }
      else
        response = this.Request.CreateResponse(HttpStatusCode.BadRequest);
      return response;
    }
  }
}
