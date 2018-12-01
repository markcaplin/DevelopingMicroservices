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
using CodeProject.MessageQueueing;
using Microsoft.AspNetCore.SignalR.Client;

namespace CodeProject.MessageQueueing
{
    
	public class OldSendMessages : IHostedService, IDisposable
	{
		private readonly IMessageQueueProcessing _messageProcessor;
		private readonly IMessageQueueing _messageQueueing;
		private readonly ILogger _logger;
		private readonly IOptions<MessageQueueAppConfig> _appConfig;
		private readonly IOptions<ConnectionStrings> _connectionStrings;

		HubConnection _signalRHubConnection;

		private Timer _timer;
	
		public OldSendMessages(ILogger<SendMessages> logger, IOptions<ConnectionStrings> connectionStrings, IOptions<MessageQueueAppConfig> appConfig, IMessageQueueing messageQueueing, IMessageQueueProcessing messageProcessor)
		{
			_logger = logger;
			_appConfig = appConfig;
			_messageProcessor = messageProcessor;
			_messageQueueing = messageQueueing;
			_connectionStrings = connectionStrings;

			_messageQueueing.SetConnectionStrings(_connectionStrings.Value);
			_messageQueueing.InitializeMessageQueueing(appConfig.Value.MessageQueueHostName, appConfig.Value.MessageQueueUserName, appConfig.Value.MessageQueuePassword);
			_messageQueueing.SetInboundSemaphoreKey(appConfig.Value.InboundSemaphoreKey);
			_messageQueueing.SetOutboundSemaphoreKey(appConfig.Value.OutboundSemaphoreKey);

			_messageQueueing.InitializeExchange(appConfig.Value.ExchangeName, appConfig.Value.RoutingKey);
			_messageQueueing.InitializeAcknowledgementConfiguration(appConfig.Value.AcknowledgementMessageExchangeSuffix, appConfig.Value.AcknowledgementMessageQueueSuffix);

			string[] outboundQueues = appConfig.Value.OutboundMessageQueues.Split(",");

			foreach(string outboundQueue in outboundQueues)
			{
				_messageQueueing.InitializeQueue(outboundQueue);
			}

			_logger.LogInformation("Send Messages Constructor " + appConfig.Value.ExchangeName);
		}

		/// <summary>
		/// Start Process Interval
		/// </summary>
		/// <param name="cancellationToken"></param>
		/// <returns></returns>
		public Task StartAsync(CancellationToken cancellationToken)
		{
			_logger.LogInformation("Starting Send Messages");

			StartSignalRConnection();

			_timer = new Timer(GetMessagesInQueue, null, TimeSpan.Zero, TimeSpan.FromSeconds(_appConfig.Value.SendingIntervalSeconds));

			return Task.CompletedTask;
		}

		/// <summary>
		/// Start SignalR Connection
		/// </summary>
		private async void StartSignalRConnection()
		{
			if (string.IsNullOrEmpty(_appConfig.Value.SignalRHubUrl))
			{
				return;
			}

			string url = _appConfig.Value.SignalRHubUrl;

			_signalRHubConnection = new HubConnectionBuilder().WithUrl(url).Build();

			_signalRHubConnection.On<string>("SendMessage", (message) =>
			{
				this.GetMessagesInQueue(null);

			});

			_signalRHubConnection.Closed += async (error) =>
			{
				Console.WriteLine("SignalR Connection Closed");
				await Task.Delay(new Random().Next(0, 5) * 1000);
				await _signalRHubConnection.StartAsync();
				Console.WriteLine("Restart SignalR");
			};

			try
			{
				Console.WriteLine("Connecting to SignalR");
				await _signalRHubConnection.StartAsync();
				Console.WriteLine("Connected");

			}
			catch (Exception ex)
			{
				Console.WriteLine("Error connecting to SignalR " + ex.Message);
			}

		}
		/// <summary>
		/// Get Messages In Queue
		/// </summary>
		/// <param name="state"></param>
		private async void GetMessagesInQueue(object state)
		{
			//ResponseModel<List<MessageQueue>> messages = await _messageProcessor.SendQueueMessages(_messageQueueing, _appConfig.Value.OutboundSemaphoreKey, _connectionStrings.Value);
			//_logger.LogInformation("total messages " + messages.Entity.Count.ToString() + " sent at " + DateTime.Now);

		}

		public Task StopAsync(CancellationToken cancellationToken)
		{
			_logger.LogInformation("Stopping.");

			_timer?.Change(Timeout.Infinite, 0);

			return Task.CompletedTask;
		}

		public void Dispose()
		{
			_timer?.Dispose();
		}
	}
}
