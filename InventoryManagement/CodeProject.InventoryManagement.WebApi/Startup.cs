using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using CodeProject.InventoryManagement.Data.EntityFramework;
using CodeProject.Shared.Common.Models;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using CodeProject.InventoryManagement.WebApi.ActionFilters;
using CodeProject.InventoryManagement.Interfaces;
using CodeProject.InventoryManagement.BusinessServices;
using CodeProject.Shared.Common.Interfaces;
using CodeProject.InventoryManagement.WebApi.SignalRHub;
using Microsoft.Extensions.Hosting;

namespace CodeProject.InventoryManagement.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            //Configuration = configuration;

			string environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
			string jsonFile = $"appsettings.{environment}.json";

			var builder = new ConfigurationBuilder().AddJsonFile(jsonFile, optional: true).AddEnvironmentVariables();
			Configuration = builder.Build();
		}

        public IConfiguration Configuration { get; }

		/// <summary>
		/// This method gets called by the runtime. Use this method to add services to the container.
		/// </summary>
		/// <param name="services"></param>
		public void ConfigureServices(IServiceCollection services)
        {

			services.Configure<MessageQueueAppConfig>(Configuration.GetSection("MessageQueueAppConfig"));

			services.AddCors(options =>
			{
				options.AddPolicy("SiteCorsPolicy",
					builder =>
					{
						builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
					});
			});

			services.AddControllers().AddNewtonsoftJson();

			ConnectionStrings connectionStrings = new ConnectionStrings();
			Configuration.GetSection("ConnectionStrings").Bind(connectionStrings);

			services.AddDbContext<InventoryManagementDatabase>(options => options.UseSqlServer(Configuration.GetConnectionString("PrimaryDatabaseConnectionString")));

			services.AddTransient<IInventoryManagementDataService, InventoryManagementDataService>();
			
			services.AddTransient<IInventoryManagementBusinessService>(provider =>
			new InventoryManagementBusinessService(provider.GetRequiredService<IInventoryManagementDataService>(), connectionStrings));

			services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
			{
				options.TokenValidationParameters = new TokenValidationParameters
				{
					ValidateIssuer = false,
					ValidateAudience = false,
					ValidateLifetime = true,
					ValidateIssuerSigningKey = true,
					ValidIssuer = "https://codeproject.microservices.com",
					ValidAudience = "https://codeproject.microservices.com",
					IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("CodeProject.Shared.Common.TokenManagement"))
				};
			});

			services.AddScoped<SecurityFilter>();

			services.AddSignalR();

		}

		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			app.Use(async (ctx, next) =>
			{
				await next();
				if (ctx.Response.StatusCode == 204)
				{
					ctx.Response.ContentLength = 0;
				}
			});

			app.UseAuthentication();

			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseHttpsRedirection();

			app.UseRouting();

			app.UseCors("SiteCorsPolicy");

			app.UseAuthorization();

			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
				endpoints.MapHub<MessageQueueHub>("/messageQueueHub");
			});

		}
	}
}
