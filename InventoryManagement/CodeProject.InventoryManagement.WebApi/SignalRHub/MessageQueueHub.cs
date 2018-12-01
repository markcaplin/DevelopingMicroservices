using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace CodeProject.InventoryManagement.WebApi.SignalRHub
{
    public class MessageQueueHub : Hub
    {
		//public async Task SendMessage(string user, string message)
		//{
		//	await Clients.All.SendAsync("SendMessage", user, message);
		//}
	}
}
