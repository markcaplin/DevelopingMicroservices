using System;
using CodeProject.Shared.Common.Models;
using Microsoft.Extensions.Configuration;
using System.IO;

namespace CodeProject.Shared.Common.Utilties
{
    public static class ConfigurationUtility
    {
		public static ConnectionStrings GetConnectionStrings()
		{
			string environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

			string jsonFile = $"appsettings.{environment}.json";

			var builder = new ConfigurationBuilder()
			.SetBasePath(Directory.GetCurrentDirectory())
			.AddJsonFile(jsonFile, optional: false, reloadOnChange: true)
			.AddEnvironmentVariables();

			IConfigurationRoot configuration = builder.Build();

			ConnectionStrings connectionStrings = new ConnectionStrings();
			configuration.GetSection("ConnectionStrings").Bind(connectionStrings);

			return connectionStrings;
		}
		/// <summary>
		/// Get App Settings
		/// </summary>
		/// <returns></returns>
		/*public static AppSettings GetAppSettings()
		{

			string environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

			string jsonFile = $"appsettings.{environment}.json";

			var builder = new ConfigurationBuilder()
			.SetBasePath(Directory.GetCurrentDirectory())
			.AddJsonFile(jsonFile, optional: false, reloadOnChange: true)
			.AddEnvironmentVariables();

			IConfigurationRoot configuration = builder.Build();

			AppSettings appSettings = new AppSettings();
			configuration.GetSection("AppSettings").Bind(appSettings);

			return appSettings;
		}*/
	}
}
