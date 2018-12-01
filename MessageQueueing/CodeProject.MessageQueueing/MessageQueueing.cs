using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using RabbitMQ.Client.MessagePatterns;
using CodeProject.Shared.Common.Interfaces;
using CodeProject.Shared.Common.Models;
using CodeProject.Shared.Common.Utilities;
using System.Reactive.Subjects;
using System.Collections;
using System.Threading.Tasks;

namespace CodeProject.MessageQueueing
{
	public class MessageQueueing : IMessageQueueing, IDisposable
	{
		//private string _hostName = "localhost";
		//private string _userName = "guest";
		//private string _password = "guest";

		private string _exchangeName { get; set; }
		private string _loggingExchangeName { get; set; }
		private string _routingKey { get; set; }
		private string _loggingRoutingKey { get; set; }
		private string _loggingQueueName { get; set; }
		private string _originatingQueueName { get; set; }
		private string _acknowledgementMessageExchangeSuffix { get; set; }
		private string _acknowledgementMessageQueueSuffix { get; set; }
		private string _outboundSemaphoreKey { get; set; }
		private string _inboundSemaphoreKey { get; set; }
		private ConnectionStrings _connectionStrings { get; set; }

		private Boolean _sendToLoggingQueue { get; set; }

		private IConnection _connection;
		private ConnectionFactory _connectionFactory;
		private IBasicProperties _basicProperties;
		private IModel _channel;

		private IConnection _loggingConnection;
		private ConnectionFactory _loggingConnectionFactory;
		private IBasicProperties _loggingBasicProperties;
		private IModel _loggingChannel;

		private Subscription _subscription;

		private Hashtable _receivedMessages;

		private bool _running;

		/// <summary>
		/// Message Queueing
		/// </summary>
		public MessageQueueing()
		{


		}

		/// <summary>
		/// Set Connection Strings
		/// </summary>
		/// <param name="connectionStrings"></param>
		public void SetConnectionStrings(ConnectionStrings connectionStrings)
		{
			_connectionStrings = connectionStrings;
		}

		/// <summary>
		/// Initialize Message Queueing
		/// </summary>
		/// <param name="hostName"></param>
		/// <param name="userName"></param>
		/// <param name="password"></param>
		public void InitializeMessageQueueing(string hostName, string userName, string password)
		{
			//
			//	connection to main exchange
			//
			_connectionFactory = new ConnectionFactory();

			_connectionFactory.HostName = hostName;
			_connectionFactory.UserName = userName;
			_connectionFactory.Password = password;

			_connection = _connectionFactory.CreateConnection();
			_channel = _connection.CreateModel();

			_basicProperties = _channel.CreateBasicProperties();
			_basicProperties.Persistent = true;
			//
			// connection to logging exchange
			//
			_loggingConnectionFactory = new ConnectionFactory();

			_loggingConnectionFactory.HostName = hostName;
			_loggingConnectionFactory.UserName = userName;
			_loggingConnectionFactory.Password = password;

			_loggingConnection = _loggingConnectionFactory.CreateConnection();
			_loggingChannel = _connection.CreateModel();

			_loggingBasicProperties = _loggingChannel.CreateBasicProperties();
			_loggingBasicProperties.Persistent = true;

			_receivedMessages = new Hashtable();

			_running = false;
		}
		/// <summary>
		/// 
		/// </summary>
		/// <param name="exchangeName"></param>
		public void InitializeExchange(string exchangeName, string routingKey)
		{
			_channel.ExchangeDeclare(exchangeName, "fanout", true, false);
			_exchangeName = exchangeName;
			_routingKey = routingKey;
		}

		/// <summary>
		/// Set Outbound Semaphore Key
		/// </summary>
		/// <param name="outboundSemaphoreKey"></param>
		public void SetOutboundSemaphoreKey(string outboundSemaphoreKey)
		{
			_outboundSemaphoreKey = outboundSemaphoreKey;
		}

		public void SetInboundSemaphoreKey(string inboundSemaphoreKey)
		{
			_inboundSemaphoreKey = inboundSemaphoreKey;
		}


		/// <summary>
		/// Initialize Acknowledgement Configuration
		/// </summary>
		/// <param name="acknowledgementMessageExchangeSuffix"></param>
		/// <param name="acknowledgementMessageQueueSuffix"></param>
		public void InitializeAcknowledgementConfiguration(string acknowledgementMessageExchangeSuffix, string acknowledgementMessageQueueSuffix)
		{
			_acknowledgementMessageExchangeSuffix = acknowledgementMessageExchangeSuffix;
			_acknowledgementMessageQueueSuffix = acknowledgementMessageQueueSuffix;
		}

		/// <summary>
		/// Initialize Queue
		/// </summary>
		/// <param name="queueName"></param>
		public void InitializeQueue(string queueName)
		{
			_channel.QueueDeclare(queueName, true, false, false);
			_channel.QueueBind(queueName, _exchangeName, _routingKey);
		}
		/// <summary>
		/// Initialize Logging Exchange
		/// </summary>
		/// <param name="exchangeName"></param>
		/// <param name="routingKey"></param>
		public void InitializeLoggingExchange(string exchangeName, string routingKey)
		{
			_loggingChannel.ExchangeDeclare(exchangeName, "fanout", true, false);
			_loggingExchangeName = exchangeName;
			_loggingRoutingKey = routingKey;

			_loggingChannel.QueueDeclare(_loggingQueueName, true, false, false);
			_loggingChannel.QueueBind(_loggingQueueName, _loggingExchangeName, _loggingRoutingKey);

			_loggingRoutingKey = routingKey;

		}
		/// <summary>
		/// Initialize Logging
		/// </summary>
		/// <param name="originatingQueueName"></param>
		/// <param name="loggingQueueName"></param>
		/// <param name="sendToLoggingQueue"></param>
		public void InitializeLogging(string originatingQueueName, string loggingQueueName, Boolean sendToLoggingQueue)
		{
			_loggingQueueName = loggingQueueName;
			_originatingQueueName = originatingQueueName;
			_sendToLoggingQueue = sendToLoggingQueue;
		}

		/// <summary>
		/// Initialize Queue
		/// </summary>
		/// <param name="queueName"></param>
		/// <param name="routingKey"></param>
		public void InitializeQueue(string queueName, string routingKey)
		{
			_channel.QueueDeclare(queueName, true, false, false);
			_routingKey = routingKey;
		}

		/// <summary>
		/// Send Message
		/// </summary>
		/// <param name="entity"></param>
		public ResponseModel<MessageQueue> SendMessage(object entity)
		{
			ResponseModel<MessageQueue> response = new ResponseModel<MessageQueue>();
			response.Entity = new MessageQueue();

			try
			{
				string output = JsonConvert.SerializeObject(entity);

				byte[] payload = Encoding.UTF8.GetBytes(output);

				PublicationAddress address = new PublicationAddress(ExchangeType.Fanout, _exchangeName, _routingKey);

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

			IModel channel = null;

			try
			{
				channel = _connection.CreateModel();

				string exchangeName = messageQueue.ExchangeName + _acknowledgementMessageExchangeSuffix;
				string queueName = messageQueue.ExchangeName + _acknowledgementMessageQueueSuffix;

				channel.ExchangeDeclare(exchangeName, "fanout", true, false);
				channel.QueueDeclare(queueName, true, false, false);
				channel.QueueBind(queueName, exchangeName, _routingKey);

				string output = JsonConvert.SerializeObject(messageQueue);

				byte[] payload = Encoding.UTF8.GetBytes(output);

				PublicationAddress address = new PublicationAddress(ExchangeType.Fanout, exchangeName, _routingKey);

				channel.BasicPublish(address, _basicProperties, payload);

				response.Entity.Payload = output;

				response.ReturnStatus = true;
			}
			catch (Exception ex)
			{
				response.ReturnStatus = false;
				response.ReturnMessage.Add(ex.Message);
			}
			finally
			{

				if (channel != null)
				{
					channel.Close();
					channel.Dispose();
				}

			}

			return response;

		}

		/// <summary>
		/// Send Received Message To Logging Queue
		/// </summary>
		/// <param name="messageQueue"></param>
		/// <returns></returns>
		public ResponseModel<MessageQueue> SendReceivedMessageToLoggingQueue(MessageQueue messageQueue)
		{
			ResponseModel<MessageQueue> response = new ResponseModel<MessageQueue>();
			response.Entity = new MessageQueue();

			try
			{
				string output = JsonConvert.SerializeObject(messageQueue);

				byte[] payload = Encoding.UTF8.GetBytes(output);

				PublicationAddress address = new PublicationAddress(ExchangeType.Fanout, _loggingExchangeName, _loggingRoutingKey);

				_loggingChannel.BasicPublish(address, _loggingBasicProperties, payload);

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
		/// Receive Messages
		/// </summary>
		/// <param name="queueName"></param>
		/// <param name="subject"></param>
		public async Task ReceiveMessages(string queueName, Subject<MessageQueue> subject, IMessageQueueProcessing _messageProcessor)
		{

			Console.WriteLine("Receiving Messages at " + DateTime.Now);

			if (_running == true)
			{
				return;
			}

			_running = true;

			var response = _channel.QueueDeclarePassive(queueName);

			_channel.QueueDeclare(queue: queueName, durable: true, exclusive: false, autoDelete: false, arguments: null);

			_subscription = new Subscription(_channel, queueName, false);

			foreach (BasicDeliverEventArgs e in _subscription)
			{
				string message = Encoding.UTF8.GetString(e.Body);

				MessageQueue messageQueue = JsonConvert.DeserializeObject<MessageQueue>(message);
				messageQueue.MessageGuid = Guid.NewGuid();

				if (messageQueue.QueueName == string.Empty || messageQueue.QueueName == null)
				{
					messageQueue.QueueName = _originatingQueueName;
				}


				Console.WriteLine("Receiving Message id " + messageQueue.TransactionQueueId);

				ResponseModel<MessageQueue> responseMessage = await _messageProcessor.CommitInboundMessage(messageQueue, _connectionStrings);
				if (responseMessage.ReturnStatus == true)
				{
					if (_sendToLoggingQueue == true)
					{
						responseMessage = SendReceivedMessageToLoggingQueue(messageQueue);
					}

					if (responseMessage.ReturnStatus == true)
					{
						Console.WriteLine($"Message Committed: {messageQueue.TransactionQueueId}");
						_subscription.Ack(e);
					}

					await _messageProcessor.ProcessMessages(_inboundSemaphoreKey, _connectionStrings);

				}


			}

		}

		/// <summary>
		/// Broadcast Transaction
		/// </summary>
		/// <param name="messageQueueAppConfig"></param>
		public ResponseModel<MessageQueue> BroadcastTransaction(MessageQueueAppConfig messageQueueAppConfig)
		{
			ResponseModel<MessageQueue> response = new ResponseModel<MessageQueue>();
			response.Entity = new MessageQueue();

			IModel channel = null;

			try
			{
				channel = _connection.CreateModel();

				string exchangeName = messageQueueAppConfig.TriggerExchangeName;
				string queueName = messageQueueAppConfig.TriggerQueueName;
				string routingKey = messageQueueAppConfig.RoutingKey;

				channel.ExchangeDeclare(exchangeName, "fanout", true, false);
				channel.QueueDeclare(queueName, true, false, false);
				channel.QueueBind(queueName, exchangeName, routingKey);

				MessageQueue messageQueue = new MessageQueue();
				messageQueue.TransactionCode = TransactionQueueTypes.TriggerImmediately;

				string output = JsonConvert.SerializeObject(messageQueue);

				byte[] payload = Encoding.UTF8.GetBytes(output);

				PublicationAddress address = new PublicationAddress(ExchangeType.Fanout, exchangeName, routingKey);

				channel.BasicPublish(address, _basicProperties, payload);

				response.Entity.Payload = output;

				response.ReturnStatus = true;
			}
			catch (Exception ex)
			{
				response.ReturnStatus = false;
				response.ReturnMessage.Add(ex.Message);
			}
			finally
			{
				if (channel != null)
				{
					channel.Close();
					channel.Dispose();
				}

			}

			return response;
		}

		/// <summary>
		/// Send Acknowledgement
		/// </summary>
		/// <param name="messageGuid"></param>
		public void SendAcknowledgement(Guid messageGuid)
		{

			if (_receivedMessages.ContainsKey(messageGuid))
			{
				BasicDeliverEventArgs eventArgs = (BasicDeliverEventArgs)_receivedMessages[messageGuid];
				_subscription.Ack(eventArgs);
				Console.WriteLine($"Message acknowledged: {messageGuid}");
			}

		}

		#region IDisposable Support
		private bool disposedValue = false; // To detect redundant calls

		protected virtual void Dispose(bool disposing)
		{
			if (!disposedValue)
			{
				if (disposing)
				{
					// TODO: dispose managed state (managed objects).
				}

				// TODO: free unmanaged resources (unmanaged objects) and override a finalizer below.
				// TODO: set large fields to null.

				disposedValue = true;

				if (_connection != null)
				{
					_connection.Close();
					_connection.Dispose();
				}

				if (_subscription != null)
				{
					_subscription.Close();
					_subscription = null;
				}

				if (_channel != null)
				{
					_channel.Close();
					_channel.Dispose();
				}

				_connection = null;
				_connectionFactory = null;
				_channel = null;
				_subscription = null;

			}
		}

		// TODO: override a finalizer only if Dispose(bool disposing) above has code to free unmanaged resources.
		// ~MessageQueueing() {
		//   // Do not change this code. Put cleanup code in Dispose(bool disposing) above.
		//   Dispose(false);
		// }

		// This code added to correctly implement the disposable pattern.
		public void Dispose()
		{
			// Do not change this code. Put cleanup code in Dispose(bool disposing) above.
			Dispose(true);
			// TODO: uncomment the following line if the finalizer is overridden above.
			// GC.SuppressFinalize(this);
		}
		#endregion
	}
}
