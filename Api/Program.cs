using Api.Data;
using Api.Entities;
using Api.Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

builder.Services.AddControllers();

var app = builder.Build();

using var scope = app.Services.CreateScope();

var services = scope.ServiceProvider;

try
{
  DataContext dataContext=services.GetRequiredService<DataContext>();

  RoleManager<AppRole> roleManager=services.GetRequiredService<RoleManager<AppRole>>();

  await dataContext.Database.MigrateAsync();

  await Seed.SeedData(roleManager,dataContext);
}
catch (Exception e)
{

}
builder.Services.AddCors(); 

app.UseCors(opt=>{
  opt.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod();
});

app.UseHttpsRedirection();

app.UseAuthorization();



app.MapControllers();

app.Run();
