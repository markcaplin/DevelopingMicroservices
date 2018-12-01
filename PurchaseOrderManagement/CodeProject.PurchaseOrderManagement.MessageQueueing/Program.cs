using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

using CodeProject.PurchaseOrderManagement.Data.EntityFramework;
using CodeProject.Shared.Common.Models;
using Microsoft.EntityFrameworkCore;
using System.Text;
using CodeProject.PurchaseOrderManagement.Interfaces;
using CodeProject.Shared.Common.Interfaces;
using CodeProject.PurchaseOrderManagement.Business.MessageService;
using CodeProject.MessageQueueing;
using System.IO;
using System.Collections.Generic;

namespace CodeProject.PurchaseOrderManagement.MessageQueueing
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

			IMessageQueueConfiguration purchaseOrderSubmittedConfiguration = new MessageQueueConfiguration(MessageQueueExchanges.PurchaseOrderSubmitted, messageQueueAppConfig, sendingQueueConnection);

			purchaseOrderSubmittedConfiguration.AddQueue(MessageQueueEndpoints.InventoryQueue);
			purchaseOrderSubmittedConfiguration.AddQueue(MessageQueueEndpoints.LoggingQueue);

			purchaseOrderSubmittedConfiguration.InitializeOutboundMessageQueueing();
			messageQueueConfigurations.Add(purchaseOrderSubmittedConfiguration);

			IPurchaseOrderManagementDataService submittedPurchaseOrderManagementDataService = new PurchaseOrderManagementDataService();
			IMessageQueueProcessing messageProcessing = new MessageProcessing(submittedPurchaseOrderManagementDataService);

			IHostedService submittedPurchaseOrderManagementMessages =
				new SendMessages(sendingQueueConnection, messageProcessing, messageQueueAppConfig,
				connectionStrings, messageQueueConfigurations, MessageQueueEndpoints.PurchaseOrderQueue);

			//
			//	set up receiving queue
			//
			IMessageQueueConnection receivingConnection = new MessageQueueConnection(messageQueueAppConfig);
			receivingConnection.CreateConnection();

			List<IMessageQueueConfiguration> inboundMessageQueueConfigurations = new List<IMessageQueueConfiguration>();
			IMessageQueueConfiguration inboundConfiguration = new MessageQueueConfiguration(messageQueueAppConfig, receivingConnection);
			inboundMessageQueueConfigurations.Add(inboundConfiguration);

			inboundConfiguration.InitializeInboundMessageQueueing(MessageQueueEndpoints.PurchaseOrderQueue);
			inboundConfiguration.InitializeLoggingExchange(MessageQueueExchanges.Logging, MessageQueueEndpoints.LoggingQueue);
			IPurchaseOrderManagementDataService inboundPurchaseOrderManagementDataService = new PurchaseOrderManagementDataService();
			IMessageQueueProcessing inboundMessageProcessing = new MessageProcessing(inboundPurchaseOrderManagementDataService);

			IHostedService receivePurchaseOrderManagementMessages = new ReceiveMessages(receivingConnection, inboundMessageProcessing, messageQueueAppConfig, connectionStrings, inboundMessageQueueConfigurations);
			//
			//	Set Up Message Processing
			//
			IPurchaseOrderManagementDataService purchaseOrderManagementProcessingDataService = new PurchaseOrderManagementDataService();
			IMessageQueueProcessing messageProcessor = new MessageProcessing(purchaseOrderManagementProcessingDataService);
			ProcessMessages processMessages = new ProcessMessages(messageProcessor, messageQueueAppConfig, connectionStrings);

			var builder = new HostBuilder().ConfigureAppConfiguration((hostingContext, config) => { })
				.ConfigureServices((hostContext, services) =>
				{
					services.AddTransient<IHostedService>(provider => processMessages);
				})
				.ConfigureServices((hostContext, services) =>
				{
					services.AddTransient<IHostedService>(provider => submittedPurchaseOrderManagementMessages);
				})
				.ConfigureServices((hostContext, services) =>
				{
					services.AddTransient<IHostedService>(provider => receivePurchaseOrderManagementMessages);
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
