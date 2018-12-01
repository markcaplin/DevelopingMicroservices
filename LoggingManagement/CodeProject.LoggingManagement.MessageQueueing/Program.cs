using System;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using CodeProject.LoggingManagement.Data.EntityFramework;
using CodeProject.Shared.Common.Models;
using Microsoft.EntityFrameworkCore;
using CodeProject.LoggingManagement.Interfaces;
using CodeProject.Shared.Common.Interfaces;
using CodeProject.LoggingManagement.Business.MessageService;
using CodeProject.MessageQueueing;
using System.IO;
using System.Collections.Generic;

namespace CodeProject.LoggingManagement.MessageQueueing
{
	class Program
	{
		public static async Task Main(string[] args)
		{

			//
			//	get configuration information
			//
			MessageQueueAppConfig messageQueueAppConfig = new MessageQueueAppConfig();
			ConnectionStrings connectionStrings = new ConnectionStrings();

			string environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
			string jsonFile = $"appsettings.{environment}.json";

			var configBuilder = new ConfigurationBuilder()
			  .SetBasePath(Directory.GetCurrentDirectory())
			  .AddJsonFile(jsonFile, optional: true, reloadOnChange: true);

			IConfigurationRoot configuration = configBuilder.Build();

			configuration.GetSection("MessageQueueAppConfig").Bind(messageQueueAppConfig);
			configuration.GetSection("ConnectionStrings").Bind(connectionStrings);

			//
			//	set up sending queue
			//
			IMessageQueueConnection sendingQueueConnection = new MessageQueueConnection(messageQueueAppConfig);
			sendingQueueConnection.CreateConnection();

			List<IMessageQueueConfiguration> messageQueueConfigurations = new List<IMessageQueueConfiguration>();

			IMessageQueueConfiguration loggingConfiguration = new MessageQueueConfiguration(MessageQueueExchanges.Logging, messageQueueAppConfig, sendingQueueConnection);

			loggingConfiguration.InitializeOutboundMessageQueueing();
			messageQueueConfigurations.Add(loggingConfiguration);

			ILoggingManagementDataService loggingManagementDataService = new LoggingManagementDataService();
			IMessageQueueProcessing messageProcessing = new MessageProcessing(loggingManagementDataService);

			IHostedService sendLoggingManagementMessages = new SendMessages(sendingQueueConnection, messageProcessing, messageQueueAppConfig, connectionStrings, messageQueueConfigurations, string.Empty);
			
			//
			//	set up receiving queue
			//
			IMessageQueueConnection receivingConnection = new MessageQueueConnection(messageQueueAppConfig);
			receivingConnection.CreateConnection();

			List<IMessageQueueConfiguration> inboundMessageQueueConfigurations = new List<IMessageQueueConfiguration>();
			IMessageQueueConfiguration inboundConfiguration = new MessageQueueConfiguration(messageQueueAppConfig, receivingConnection);
			inboundMessageQueueConfigurations.Add(inboundConfiguration);

			inboundConfiguration.InitializeInboundMessageQueueing(MessageQueueEndpoints.LoggingQueue);
			inboundConfiguration.InitializeLoggingExchange(MessageQueueExchanges.Logging, MessageQueueEndpoints.LoggingQueue);
			ILoggingManagementDataService inboundLoggingManagementDataService = new LoggingManagementDataService();
			IMessageQueueProcessing inboundMessageProcessing = new MessageProcessing(inboundLoggingManagementDataService);

			IHostedService receiveLoggingManagementMessages = new ReceiveMessages(receivingConnection, inboundMessageProcessing, messageQueueAppConfig, connectionStrings, inboundMessageQueueConfigurations);

			var builder = new HostBuilder()
				.ConfigureServices((hostContext, services) =>
				{
					services.AddTransient<IHostedService>(provider => sendLoggingManagementMessages);
				})
				.ConfigureServices((hostContext, services) =>
				{
					services.AddTransient<IHostedService>(provider => receiveLoggingManagementMessages);
				})
				.ConfigureLogging((hostingContext, logging) =>
				{
					logging.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
					logging.AddConsole();
				});

			await builder.RunConsoleAsync();
		}
	}
}
