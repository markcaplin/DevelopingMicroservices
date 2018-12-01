using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace CodeProject.Shared.Common.Utilties
{
    public static class Hasher
    {
		/// <summary>
		/// Generate Hash
		/// </summary>
		/// <param name="text"></param>
		/// <returns></returns>
		public static string GenerateHash(string text)
		{
			// SHA512 is disposable by inheritance.  
			using (var sha256 = SHA256.Create())
			{
				// Send a sample text to hash.  
				var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(text));
				// Get the hashed string.  
				return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
			}
		}
		/// <summary>
		/// Get Salt
		/// </summary>
		/// <returns></returns>
		public static string GetSalt()
		{
			byte[] bytes = new byte[128 / 8];
			using (var keyGenerator = RandomNumberGenerator.Create())
			{
				keyGenerator.GetBytes(bytes);
				return BitConverter.ToString(bytes).Replace("-", "").ToLower();
			}
		}

	}
}
