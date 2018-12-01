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

using CodeProject.SalesOrderManagement.Data.EntityFramework;
using CodeProject.Shared.Common.Models;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using CodeProject.SalesOrderManagement.WebApi.ActionFilters;
using CodeProject.SalesOrderManagement.Interfaces;
using CodeProject.SalesOrderManagement.BusinessServices;
using CodeProject.SalesOrderManagement.WebApi.SignalRHub;

namespace CodeProject.SalesOrderManagement.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
			CorsPolicyBuilder corsBuilder = new CorsPolicyBuilder();

			corsBuilder.AllowAnyHeader();
			corsBuilder.AllowAnyMethod();
			corsBuilder.AllowAnyOrigin();
			corsBuilder.AllowCredentials();

			services.AddCors(options =>
			{
				options.AddPolicy("SiteCorsPolicy", corsBuilder.Build());
			});

			//AppSettings appSettings = new AppSettings();
			//Configuration.GetSection("AppSettings").Bind(appSettings);

			ConnectionStrings connectionStrings = new ConnectionStrings();
			Configuration.GetSection("ConnectionStrings").Bind(connectionStrings);

			services.AddDbContext<SalesOrderManagementDatabase>(options => options.UseSqlServer(Configuration.GetConnectionString("PrimaryDatabaseConnectionString")));

			services.AddTransient<ISalesOrderManagementDataService, SalesOrderManagementDataService>();

			services.AddTransient<ISalesOrderManagementBusinessService>(provider =>
			new SalesOrderManagementBusinessService(provider.GetRequiredService<ISalesOrderManagementDataService>(),connectionStrings));

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
