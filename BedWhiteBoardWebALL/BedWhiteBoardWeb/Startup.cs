using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(BedManagement.Startup))]

namespace BedManagement
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            MedicaDAL.DBInteraction objDB = new MedicaDAL.DBInteraction(true);
            string strRedisIP = objDB.GetSetting("mplus.ini", "General", "RedisIP");
            string strRedisPort = objDB.GetSetting("mplus.ini", "General", "RedisPort");

            if (strRedisIP != "")
            {
                GlobalHost.DependencyResolver.UseRedis(strRedisIP, int.Parse(strRedisPort), string.Empty, "MedicaPlus");
            }

            app.MapSignalR();
        }
    }
}
