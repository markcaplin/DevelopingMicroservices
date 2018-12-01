using System;
using System.Collections.Generic;
using System.Text;

namespace CodeProject.Shared.Common.Models.MessageQueuePayloads
{
    public class ProductUpdatePayload
    {
		public int AccountId { get; set; }
		public int ProductId { get; set; }
		public string ProductNumber { get; set; }
		public string Description { get; set; }
		public string BinLocation { get; set; }
		public double UnitPrice { get; set; }
	}
}
