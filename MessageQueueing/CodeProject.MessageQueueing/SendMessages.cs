using CodeProject.Shared.Common.Interfaces;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Text;
using System.Reactive.Subjects;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using CodeProject.Shared.Common.Models;
using CodeProject.MessageQueueing;
using Microsoft.AspNetCore.SignalR.Client;
using RabbitMQ.Client;

namespace CodeProject.MessageQueueing
{
    public class SendMessages : IHostedService, IDisposable
	{
		private readonly List<IMessageQueueConfiguration> _messageQueueConfigurations;
		private readonly IMessageQueueConnection _messageQueueConnection;
		private readonly IMessageQueueProcessing _messageProcessor;
		private readonly MessageQueueAppConfig _appConfig;
		private readonly ConnectionStrings _connectionStrings;
		private readonly string _signalRQueue;
	
		// private IBasicProperties basicProperties;
		// private IModel_channel;

		HubConnection _signalRHubConnection;
		private Timer _timer;

		/// <summary>
		/// Send Messages
		/// </summary>
		/// <param name="messageQueueConnection"></param>
		/// <param name="messageProcessor"></param>
		/// <param name="appConfig"></param>
		/// <param name="connectionStrings"></param>
		/// <param name="messageQueueConfigurations"></param>
		public SendMessages(IMessageQueueConnection messageQueueConnection, IMessageQueueProcessing messageProcessor, MessageQueueAppConfig appConfig, ConnectionStrings connectionStrings, List<IMessageQueueConfiguration> messageQueueConfigurations, string signalRQueue)
		{
			_messageQueueConnection = messageQueueConnection;
			_messageQueueConfigurations = messageQueueConfigurations;
			_connectionStrings = connectionStrings;
			_messageProcessor = messageProcessor;
			_appConfig = appConfig;
			_signalRQueue = signalRQueue;
		}

		/// <summary>
		/// Start Process Interval
		/// </summary>
		/// <param name="cancellationToken"></param>
		/// <returns></returns>
		public Task StartAsync(CancellationToken cancellationToken)
		{

			StartSignalRConnection();

			_timer = new Timer(GetMessagesInQueue, null, TimeSpan.Zero, TimeSpan.FromSeconds(_appConfig.SendingIntervalSeconds));

			return Task.CompletedTask;
		}

		/// <summary>
		/// Start SignalR Connection
		/// </summary>
		private async void StartSignalRConnection()
		{
			if (string.IsNullOrEmpty(_appConfig.SignalRHubUrl))
			{
				return;
			}

			string url = _appConfig.SignalRHubUrl;

			Console.WriteLine("CONNECTING TO SIGNAL R  " + url);

			Boolean connected = false;
			while (connected == false)
			{
				try
				{
					_signalRHubConnection = new HubConnectionBuilder().WithUrl(url).Build();
					connected = true;
				}
				catch (Exception ex)
				{
					Console.WriteLine(ex.Message);
					await Task.Delay(5000);
				}

			}
			
			_signalRHubConnection.On<string>(_signalRQueue, (message) =>
			{
				this.GetMessagesInQueue(null);

			});

			_signalRHubConnection.Closed += async (error) =>
			{
				Console.WriteLine("SignalR Connection Closed");
				await Task.Delay(10000);
				await _signalRHubConnection.StartAsync();
				Console.WriteLine("Restart SignalR");
			};

			connected = false;
			while (connected == false)
			{
				try
				{
					Console.WriteLine("CONNECTING TO SIGNARL R");
					await _signalRHubConnection.StartAsync();
					Console.WriteLine("CONNECTED TO SIGNAL R " + url);
					connected = true;

				}
				catch (Exception ex)
				{
					Console.WriteLine("ERROR CONNECTING TO SIGNAL R " + ex.Message);
					await Task.Delay(10000);
				}
			}
		

		}
		/// <summary>

		/// <summary>
		/// Get Messages In Queue
		/// </summary>
		/// <param name="state"></param>
		private async void GetMessagesInQueue(object state)
		{
			ResponseModel<List<MessageQueue>> messages = await _messageProcessor.SendQueueMessages(_messageQueueConfigurations, _appConfig.OutboundSemaphoreKey, _connectionStrings);
			Console.WriteLine("total messages " + messages.Entity.Count.ToString() + " sent at " + DateTime.Now);

		}

		public Task StopAsync(CancellationToken cancellationToken)
		{
			_timer?.Change(Timeout.Infinite, 0);

			return Task.CompletedTask;
		}

		public void Dispose()
		{
			_timer?.Dispose();
		}

	}

}
