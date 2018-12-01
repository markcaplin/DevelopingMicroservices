using CodeProject.Shared.Common.Interfaces;
using CodeProject.Shared.Common.Models;
using Newtonsoft.Json;
using RabbitMQ.Client;
using System;
using System.Collections.Generic;
using System.Text;
using RabbitMQ.Client.Events;
using RabbitMQ.Client.MessagePatterns;

namespace CodeProject.MessageQueueing
{
    public class MessageQueueConfiguration : IMessageQueueConfiguration
    {
		
		private string _exchangeName;
		private List<string> _boundedQueues;
		private MessageQueueAppConfig _messageQueueAppConfig;
		private readonly IMessageQueueConnection _messageQueueConnection;
		private Subscription _subscription;
		private IBasicProperties _basicProperties;
		private IModel _channel;
		private string _originatingQueueName;

		public string TransactionCode { get; set; }

		/// <summary>
		/// Constructor
		/// </summary>
		/// <param name="exchangeName"></param>
		/// <param name="messageQueueAppConfig"></param>
		/// <param name="messageQueueConnection"></param>
		public MessageQueueConfiguration(string exchangeName, MessageQueueAppConfig messageQueueAppConfig, IMessageQueueConnection messageQueueConnection)
		{
			TransactionCode = exchangeName;

			_messageQueueAppConfig = messageQueueAppConfig;
			_messageQueueConnection = messageQueueConnection;
			_exchangeName = exchangeName;
			_boundedQueues = new List<string>();
		}

		/// <summary>
		/// 
		/// </summary>
		/// <param name="messageQueueAppConfig"></param>
		/// <param name="messageQueueConnection"></param>
		public MessageQueueConfiguration(MessageQueueAppConfig messageQueueAppConfig, IMessageQueueConnection messageQueueConnection)
		{
			_messageQueueAppConfig = messageQueueAppConfig;
			_messageQueueConnection = messageQueueConnection;
		}
		/// <summary>
		/// Initialize Inbound Message Queueing
		/// </summary>
		/// <param name="queueName"></param>
		public void InitializeInboundMessageQueueing(string queueName)
		{
			_channel = _messageQueueConnection.GetConnection().CreateModel();

			string queue = queueName + "_" + _messageQueueAppConfig.MessageQueueEnvironment;

			_channel.QueueDeclare(queue, true, false, false);

			var response = _channel.QueueDeclarePassive(queue);

			_channel.QueueDeclare(queue: queue, durable: true, exclusive: false, autoDelete: false, arguments: null);

			_subscription = new Subscription(_channel, queue, false);

			_originatingQueueName = queueName;

		}
		/// <summary>
		/// Get Originating QueueName
		/// </summary>
		/// <returns></returns>
		public string GetOriginatingQueueName()
		{
			return _originatingQueueName;
		}
		
		/// <summary>
		/// Initialize Message Queueing
		/// </summary>
		public void InitializeOutboundMessageQueueing()
		{
			_channel = _messageQueueConnection.GetConnection().CreateModel();

			_basicProperties = _channel.CreateBasicProperties();
			_basicProperties.Persistent = true;

			string exchangeName = _exchangeName + "_" + _messageQueueAppConfig.MessageQueueEnvironment;

			_channel.ExchangeDeclare(exchangeName, "fanout", true, false);
			
			foreach (string queueName in _boundedQueues)
			{
				string queue = queueName + "_" + _messageQueueAppConfig.MessageQueueEnvironment;

				_channel.QueueDeclare(queue, true, false, false);
				_channel.QueueBind(queue, exchangeName, _messageQueueAppConfig.RoutingKey);
			}
		}
		/// <summary>
		/// Initialize Logging Exchange
		/// </summary>
		/// <param name="loggingExchangeName"></param>
		/// <param name="loggingQueueName"></param>
		public void InitializeLoggingExchange(string loggingExchangeName, string loggingQueueName)
		{
			string exchangeName = loggingExchangeName + "_" + _messageQueueAppConfig.MessageQueueEnvironment;

			string queue = loggingQueueName + "_" + _messageQueueAppConfig.MessageQueueEnvironment;

			_channel.ExchangeDeclare(exchangeName, "fanout", true, false);
			_channel.QueueDeclare(queue, true, false, false);
			_channel.QueueBind(queue, exchangeName, _messageQueueAppConfig.RoutingKey);

		}

		/// <summary>
		/// Get Subscription
		/// </summary>
		/// <returns></returns>
		public Subscription GetSubscription()
		{
			return _subscription;
		}

		/// <summary>
		/// Send Message
		/// </summary>
		/// <param name="entity"></param>
		public ResponseModel<MessageQueue> SendMessage(MessageQueue entity)
		{
			ResponseModel<MessageQueue> response = new ResponseModel<MessageQueue>();
			response.Entity = new MessageQueue();

			try
			{
				string output = JsonConvert.SerializeObject(entity);

				byte[] payload = Encoding.UTF8.GetBytes(output);

				string exchangeName = _exchangeName + "_" + _messageQueueAppConfig.MessageQueueEnvironment;

				PublicationAddress address = new PublicationAddress(ExchangeType.Fanout, exchangeName, _messageQueueAppConfig.RoutingKey);

				_channel.BasicPublish(address, _basicProperties, payload);

				response.Entity.Payload = output;

				response.ReturnStatus = true;
			}
			catch (Exception ex)
			{
				response.ReturnStatus = false;
				response.ReturnMessage.Add(ex.Message);
			}

			return response;

		}

		/// <summary>
		/// Send Acknowledgement Message
		/// </summary>
		/// <param name="entity"></param>
		/// <returns></returns>
		public ResponseModel<MessageQueue> SendAcknowledgementMessage(MessageQueue messageQueue)
		{
			ResponseModel<MessageQueue> response = new ResponseModel<MessageQueue>();
			response.Entity = new MessageQueue();

			try
			{

				//string exchangeName = messageQueue.ExchangeName + "_" + _messageQueueAppConfig.MessageQueueEnvironment;

				string exchangeName = messageQueue.QueueName + "_" + _messageQueueAppConfig.AcknowledgementMessageExchangeSuffix + "_" + _messageQueueAppConfig.MessageQueueEnvironment;
				string queueName = messageQueue.QueueName + "_" + _messageQueueAppConfig.MessageQueueEnvironment;

				_channel.ExchangeDeclare(exchangeName, "fanout", true, false);
				_channel.QueueDeclare(queueName, true, false, false);
				_channel.QueueBind(queueName, exchangeName, _messageQueueAppConfig.RoutingKey);

				string output = JsonConvert.SerializeObject(messageQueue);

				byte[] payload = Encoding.UTF8.GetBytes(output);

				PublicationAddress address = new PublicationAddress(ExchangeType.Fanout, exchangeName, _messageQueueAppConfig.RoutingKey);

				_channel.BasicPublish(address, _basicProperties, payload);

				response.Entity.Payload = output;

				response.ReturnStatus = true;
			}
			catch (Exception ex)
			{
				response.ReturnStatus = false;
				response.ReturnMessage.Add(ex.Message);
			}
		
			return response;

		}
		/// <summary>
		/// Send Received Message To Logging Queue
		/// </summary>
		/// <param name="messageQueue"></param>
		/// <returns></returns>
		public ResponseModel<MessageQueue> SendReceivedMessageToLoggingQueue(MessageQueue messageQueue, string loggingExchangeName)
		{
			ResponseModel<MessageQueue> response = new ResponseModel<MessageQueue>();
			response.Entity = new MessageQueue();

			try
			{
				string exchangeName = loggingExchangeName + "_" + _messageQueueAppConfig.MessageQueueEnvironment;

				string output = JsonConvert.SerializeObject(messageQueue);

				byte[] payload = Encoding.UTF8.GetBytes(output);

				PublicationAddress address = new PublicationAddress(ExchangeType.Fanout, exchangeName, _messageQueueAppConfig.RoutingKey);

				_channel.BasicPublish(address, _basicProperties, payload);

				response.Entity.Payload = output;

				response.ReturnStatus = true;
			}
			catch (Exception ex)
			{
				response.ReturnStatus = false;
				response.ReturnMessage.Add(ex.Message);
			}

			return response;

		}


		/// <summary>
		/// Add Queue
		/// </summary>
		/// <param name="queueName"></param>
		public void AddQueue(string queueName)
		{
			_boundedQueues.Add(queueName);
		}
	
	}

}
