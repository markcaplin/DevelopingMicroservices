using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace CodeProject.Shared.Common
{
    public static class TokenManagement
    {
		/// <summary>
		/// Create Token
		/// </summary>
		/// <param name="userId"></param>
		/// <param name="firstName"></param>
		/// <param name="lastName"></param>
		/// <param name="emailAddress"></param>
		/// <param name="companyName"></param>
		/// <returns></returns>
		public static string CreateToken(int userId, string firstName, string lastName, string emailAddress, int accountId, string companyName)
		{
			var sharedKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("CodeProject.Shared.Common.TokenManagement"));

			List<Claim> claims = new List<Claim>
			{
				new Claim(ClaimTypes.Email, emailAddress),
				new Claim(ClaimTypes.NameIdentifier, lastName),
				new Claim(ClaimTypes.GivenName, firstName),
				new Claim(ClaimTypes.Name, companyName),
				new Claim(ClaimTypes.PrimarySid, userId.ToString()),
				new Claim(ClaimTypes.PrimaryGroupSid, accountId.ToString())
			};

			var signinCredentials = new SigningCredentials(sharedKey, SecurityAlgorithms.HmacSha512Signature);

			var tokenDescription = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity(claims),
				NotBefore = DateTime.Now,
				Expires = DateTime.Now.AddMinutes(60),
				SigningCredentials = signinCredentials
			};

			var tokenHandler = new JwtSecurityTokenHandler();
			var token = tokenHandler.CreateToken(tokenDescription);
			string tokenString = tokenHandler.WriteToken(token);

			return tokenString;

		}
	}
}
