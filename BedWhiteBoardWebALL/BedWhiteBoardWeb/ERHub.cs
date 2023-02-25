using Microsoft.AspNet.SignalR;

namespace BedManagement
{
    public class ERHub : Hub
    {

        public void Send(string MessageHeader, string MessageBody)
        {
            Clients.All.broadcastMessage(MessageHeader, MessageBody);
        }
    }
}

