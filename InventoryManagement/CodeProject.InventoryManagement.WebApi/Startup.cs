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

			CorsPolicyBuilder corsBuilder = new CorsPolicyBuilder();

			corsBuilder.AllowAnyHeader();
			corsBuilder.AllowAnyMethod();
			corsBuilder.AllowAnyOrigin();
			corsBuilder.AllowCredentials();

			services.AddCors(options =>
			{
				options.AddPolicy("SiteCorsPolicy", corsBuilder.Build());
			});

		
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

			services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

			services.AddSignalR();

		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
        
			app.UseCors("SiteCorsPolicy");
			app.UseAuthentication();

			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}
			else
			{
				app.UseHsts();
			}

			app.UseHttpsRedirection();

			app.UseMvc();

			app.UseSignalR(routes =>
			{
				routes.MapHub<MessageQueueHub>("/messageQueueHub");
			});

		}
    }
}
