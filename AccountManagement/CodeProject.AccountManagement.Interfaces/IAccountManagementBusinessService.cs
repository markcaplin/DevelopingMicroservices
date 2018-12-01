using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using CodeProject.Shared.Common.Models;
using CodeProject.AccountManagement.Data.Entities;
using CodeProject.AccountManagement.Data.Transformations;

namespace CodeProject.AccountManagement.Interfaces
{
    public interface IAccountManagementBusinessService
	{ 
		Task<ResponseModel<AccountDataTransformation>> Register(AccountDataTransformation accountDataTransformation);
		Task<ResponseModel<AccountDataTransformation>> Login(AccountDataTransformation accountDataTransformation);
		Task<ResponseModel<AccountDataTransformation>> UpdateUser(AccountDataTransformation accountDataTransformation);
		Task<ResponseModel<User>> UpdateUser(int userId);
		

	}
}
