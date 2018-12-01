using System;
using System.Collections.Generic;
using System.Text;
using System.Reactive.Subjects;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using CodeProject.Shared.Common.Models;
using CodeProject.Shared.Common.Interfaces;
using CodeProject.Shared.Common.Models.MessageQueuePayloads;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using RabbitMQ.Client.MessagePatterns;

namespace CodeProject.MessageQueueing
{

	public class ReceiveMessages : IHostedService, IDisposable
	{

		private readonly List<IMessageQueueConfiguration> _messageQueueConfigurations;
		private readonly IMessageQueueConnection _messageQueueConnection;
		private readonly IMessageQueueProcessing _messageProcessor;
		private readonly MessageQueueAppConfig _appConfig;
		private readonly ConnectionStrings _connectionStrings;

		private Timer _timer;
		private Boolean _running = false;

		public ReceiveMessages(IMessageQueueConnection messageQueueConnection, IMessageQueueProcessing messageProcessor, MessageQueueAppConfig appConfig, ConnectionStrings connectionStrings, List<IMessageQueueConfiguration> messageQueueConfigurations)
		{
			_messageQueueConnection = messageQueueConnection;
			_messageQueueConfigurations = messageQueueConfigurations;
			_connectionStrings = connectionStrings;
			_messageProcessor = messageProcessor;
			_appConfig = appConfig;
		}

		/// <summary>
		/// Start
		/// </summary>
		/// <param name="cancellationToken"></param>
		/// <returns></returns>
		public Task StartAsync(CancellationToken cancellationToken)
		{
			Console.WriteLine("Starting Receiving Messages");

			//_subject = new Subject<MessageQueue>();
			//_subject.Subscribe(MessageReceived);

			_timer = new Timer(GetMessagesInQueue, null, TimeSpan.Zero, TimeSpan.FromSeconds(_appConfig.ReceivingIntervalSeconds));

			return Task.CompletedTask;
		}

		/// <summary>
		/// Get Messages In Queue
		/// </summary>
		/// <param name="state"></param>
		private async void GetMessagesInQueue(object state)
		{
	
			if (_running == true)
			{
				return;
			}

			_running = true;

			Console.WriteLine("Receiving Messages at " + DateTime.Now);

			Subscription subscription = _messageQueueConfigurations[0].GetSubscription();

			foreach (BasicDeliverEventArgs e in subscription)
			{
				string message = Encoding.UTF8.GetString(e.Body);

				MessageQueue messageQueue = JsonConvert.DeserializeObject<MessageQueue>(message);

				if (messageQueue.QueueName == string.Empty || messageQueue.QueueName == null)
				{
					string originatingQueue = _messageQueueConfigurations[0].GetOriginatingQueueName();
					if (originatingQueue != MessageQueueEndpoints.LoggingQueue)
					{
						messageQueue.QueueName = originatingQueue;
					}
				}

				Console.WriteLine("Receiving Message id " + messageQueue.TransactionQueueId);

				ResponseModel<MessageQueue> responseMessage = await _messageProcessor.CommitInboundMessage(messageQueue, _connectionStrings);
				if (responseMessage.ReturnStatus == true)
				{
					if (_appConfig.SendToLoggingQueue == true && messageQueue.TransactionCode != TransactionQueueTypes.Acknowledgement)
					{
						responseMessage = _messageQueueConfigurations[0].SendReceivedMessageToLoggingQueue(messageQueue, MessageQueueExchanges.Logging);
					}

					if (responseMessage.ReturnStatus == true)
					{
						Console.WriteLine($"Message Committed: {messageQueue.TransactionQueueId}");
						subscription.Ack(e);
					}

					await _messageProcessor.ProcessMessages(_appConfig.InboundSemaphoreKey, _connectionStrings);

				}

			}

		}
		
		/// <summary>
		/// Stop Async
		/// </summary>
		/// <param name="cancellationToken"></param>
		/// <returns></returns>
		public Task StopAsync(CancellationToken cancellationToken)
		{
			Console.WriteLine("Stopping.");

			return Task.CompletedTask;
		}

		public void Dispose()
		{

		}
	}
}
