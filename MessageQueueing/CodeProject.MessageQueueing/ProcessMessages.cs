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

namespace CodeProject.MessageQueueing
{

	public class ProcessMessages : IHostedService, IDisposable
	{
	
		private readonly IMessageQueueProcessing _messageProcessor;
		private readonly MessageQueueAppConfig _appConfig;
		private readonly ConnectionStrings _connectionStrings;

		private Timer _timer;
		private int _counter;

		/// <summary>
		/// Constructor
		/// </summary>
		/// <param name="messageProcessor"></param>
		/// <param name="appConfig"></param>
		/// <param name="connectionStrings"></param>
		public ProcessMessages(IMessageQueueProcessing messageProcessor, MessageQueueAppConfig appConfig, ConnectionStrings connectionStrings)
		{
			
			_appConfig = appConfig;
			_messageProcessor = messageProcessor;
			_connectionStrings = connectionStrings;

			Console.WriteLine("Process Messages Constructor ");
		}

		/// <summary>
		/// Start Processing Interval
		/// </summary>
		/// <param name="cancellationToken"></param>
		/// <returns></returns>
		public Task StartAsync(CancellationToken cancellationToken)
		{
			Console.WriteLine("Starting Processing Messages");

			_counter = 0;

			_timer = new Timer(ProcessMessagesInQueue, null, TimeSpan.Zero, TimeSpan.FromSeconds(_appConfig.ProcessingIntervalSeconds));

			return Task.CompletedTask;
		}

		/// <summary>
		/// Get Messages In Queue
		/// </summary>
		/// <param name="state"></param>
		private async void ProcessMessagesInQueue(object state)
		{

			_counter++;

			ResponseModel<List<MessageQueue>> messages = await _messageProcessor.ProcessMessages(_appConfig.InboundSemaphoreKey, _connectionStrings);

			Console.WriteLine("total messages processed " + messages.Entity.Count.ToString() + " sent at " + DateTime.Now);

		}

		/// <summary>
		/// Stop Processing
		/// </summary>
		/// <param name="cancellationToken"></param>
		/// <returns></returns>
		public Task StopAsync(CancellationToken cancellationToken)
		{
			Console.WriteLine("Stopping.");

			_timer?.Change(Timeout.Infinite, 0);

			return Task.CompletedTask;
		}

		/// <summary>
		/// Dispose Timer
		/// </summary>
		public void Dispose()
		{
			_timer?.Dispose();
		}
	}
}
