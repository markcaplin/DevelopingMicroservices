using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CodeProject.AccountManagement.Data.EntityFramework;
using CodeProject.Shared.Common.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using CodeProject.AccountManagement.WebApi.ActionFilters;
using CodeProject.AccountManagement.Interfaces;
using CodeProject.AccountManagement.BusinessServices;

namespace CodeProject.AccountManagement.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

		/// <summary>
		/// This method gets called by the runtime. Use this method to add services to the container.
		/// </summary>
		/// <param name="services"></param>
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

			ConnectionStrings connectionStrings = new ConnectionStrings();
			Configuration.GetSection("ConnectionStrings").Bind(connectionStrings);

			services.AddDbContext<AccountManagementDatabase>(options => options.UseSqlServer(Configuration.GetConnectionString("PrimaryDatabaseConnectionString")));
			
			//
			//	Built-In Dependency Injection
			//
			services.AddTransient<IAccountManagementDataService, AccountManagementDataService>();
			services.AddTransient<IAccountManagementBusinessService>(provider =>
			new AccountManagementBusinessService(provider.GetRequiredService<IAccountManagementDataService>(), connectionStrings));

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
		}
    }
}
