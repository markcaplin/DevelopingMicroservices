using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using CodeProject.SalesOrderManagement.Data.EntityFramework;
using CodeProject.Shared.Common.Models;
using Microsoft.EntityFrameworkCore;
using CodeProject.SalesOrderManagement.Interfaces;
using CodeProject.Shared.Common.Interfaces;
using CodeProject.SalesOrderManagement.Business.MessageService;
using CodeProject.MessageQueueing;
using System.IO;
using System.Collections.Generic;

namespace CodeProject.SalesOrderManagement.MessageQueueing
{
	class Program
	{
		public static async Task Main(string[] args)
		{

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

			IMessageQueueConfiguration salesOrderSubmittedConfiguration = new MessageQueueConfiguration(MessageQueueExchanges.SalesOrderSubmitted, messageQueueAppConfig, sendingQueueConnection);

			salesOrderSubmittedConfiguration.AddQueue(MessageQueueEndpoints.InventoryQueue);
			salesOrderSubmittedConfiguration.AddQueue(MessageQueueEndpoints.LoggingQueue);

			salesOrderSubmittedConfiguration.InitializeOutboundMessageQueueing();
			messageQueueConfigurations.Add(salesOrderSubmittedConfiguration);

			ISalesOrderManagementDataService salesOrderManagementDataService = new SalesOrderManagementDataService();
			IMessageQueueProcessing messageProcessing = new MessageProcessing(salesOrderManagementDataService);

			IHostedService sendSalesOrderManagementMessages =
				new SendMessages(sendingQueueConnection, messageProcessing, messageQueueAppConfig,
				connectionStrings, messageQueueConfigurations, MessageQueueEndpoints.SalesOrderQueue);


			//
			//	set up receiving queue
			//
			IMessageQueueConnection receivingConnection = new MessageQueueConnection(messageQueueAppConfig);
			receivingConnection.CreateConnection();

			List<IMessageQueueConfiguration> inboundMessageQueueConfigurations = new List<IMessageQueueConfiguration>();
			IMessageQueueConfiguration inboundConfiguration = new MessageQueueConfiguration(messageQueueAppConfig, receivingConnection);
			inboundMessageQueueConfigurations.Add(inboundConfiguration);

			inboundConfiguration.InitializeInboundMessageQueueing(MessageQueueEndpoints.SalesOrderQueue);
			inboundConfiguration.InitializeLoggingExchange(MessageQueueExchanges.Logging, MessageQueueEndpoints.LoggingQueue);
			ISalesOrderManagementDataService inboundSalesOrderManagementDataService = new SalesOrderManagementDataService();
			IMessageQueueProcessing inboundMessageProcessing = new MessageProcessing(inboundSalesOrderManagementDataService);

			IHostedService receiveSalesOrderManagementMessages = new ReceiveMessages(receivingConnection, inboundMessageProcessing, messageQueueAppConfig, connectionStrings, inboundMessageQueueConfigurations);
	
			//
			//	Set Up Message Processing
			//
			ISalesOrderManagementDataService salesOrderManagementProcessingDataService = new SalesOrderManagementDataService();
			IMessageQueueProcessing messageProcessor = new MessageProcessing(salesOrderManagementProcessingDataService);
			ProcessMessages processMessages = new ProcessMessages(messageProcessor, messageQueueAppConfig, connectionStrings);

			var builder = new HostBuilder().ConfigureAppConfiguration((hostingContext, config) =>
			{
				
			})
			.ConfigureServices((hostContext, services) =>
			{
				services.AddTransient<IHostedService>(provider => sendSalesOrderManagementMessages);
			})
			.ConfigureServices((hostContext, services) =>
			{
				services.AddTransient<IHostedService>(provider => processMessages);
			})
			.ConfigureServices((hostContext, services) =>
			{
				services.AddTransient<IHostedService>(provider => receiveSalesOrderManagementMessages);
			});

			await builder.RunConsoleAsync();
		}
	}
}
