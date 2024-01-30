using System.Text;
using Api.Data;
using Api.Entities;
using Api.Repositories;
using Api.Services;
using Api.Services.IServices;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace Api.Extensions
{
    public static class  IdentityServicesExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services,IConfiguration configuration)
        {

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(opt=>{
                opt.TokenValidationParameters=new TokenValidationParameters(){
                    ValidateIssuerSigningKey=true,
                    IssuerSigningKey=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["TokenKey"])),
                    ValidateIssuer=false,
                    ValidateAudience=false

                };
            });

            services.AddIdentityCore<AppUser>(opt=>{
            })

            .AddRoles<AppRole>()
            .AddRoleManager<RoleManager<AppRole>>()
            .AddEntityFrameworkStores<DataContext>()
            .AddDefaultTokenProviders();
            
            services.AddDistributedMemoryCache(); 
            services.AddScoped<IJwtService,JwtService>();
            services.AddScoped<IEmailVerificationService,EmailVerificationService>();
          
            return services;
        }
    }
}