using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CodeProject.Shared.Common.Models;
using CodeProject.Shared.Common.Utilties;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.SignalR;
using CodeProject.InventoryManagement.WebApi.SignalRHub;

namespace CodeProject.InventoryManagement.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
		private MessageQueueAppConfig _messageQueueAppConfig;

		private IHubContext<MessageQueueHub> _messageQueueContext;

		/// <summary>
		/// Constructor
		/// </summary>
		/// <param name="messageQueueAppConfig"></param>
		/// <param name="messageQueueContext"></param>
		public ValuesController(IOptions<MessageQueueAppConfig> messageQueueAppConfig, IHubContext<MessageQueueHub> messageQueueContext)
		{
			_messageQueueAppConfig = messageQueueAppConfig.Value;
			_messageQueueContext = messageQueueContext;
		}

		// GET api/values
		[HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            
			ConnectionStrings connectionStrings = ConfigurationUtility.GetConnectionStrings();

			string databaseConnectionString = connectionStrings.PrimaryDatabaseConnectionString;
		
			_messageQueueContext.Clients.All.SendAsync("SendMessage", string.Empty);
		
			return new string[] { databaseConnectionString };
		}

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
