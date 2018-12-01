using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CodeProject.Shared.Common.Interfaces
{
  
	/// <summary>
	/// IDataRepository
	/// </summary>
	public interface IDataRepository
	{

		void CommitTransaction();
		Task UpdateDatabase();
		void BeginTransaction(int isolationLevel);
		void BeginTransaction();
		void RollbackTransaction();
		Object OpenConnection();
		void CloseConnection();
		void OpenConnection(Object dbConnection);
		void OpenConnection(string connectionString);

	}
}
