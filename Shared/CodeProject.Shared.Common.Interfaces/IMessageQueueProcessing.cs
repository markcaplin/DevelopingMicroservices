using CodeProject.Shared.Common.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CodeProject.Shared.Common.Interfaces
{
    public interface IMessageQueueProcessing
    {
		Task<ResponseModel<MessageQueue>> CommitInboundMessage(MessageQueue messageQueue, ConnectionStrings connectionStrings);
		Task<ResponseModel<List<MessageQueue>>> SendQueueMessages(List<IMessageQueueConfiguration> messageQueueConfigurations, string outboundSemaphoreKey, ConnectionStrings connectionStrings);
		Task<ResponseModel<List<MessageQueue>>> ProcessMessages(string inboundSemaphoreKey, ConnectionStrings connectionStrings);

	}
}
