using Api.Data;
using Api.Services;
using Api.Services.IServices;
using Microsoft.EntityFrameworkCore;

namespace Api.Extensions
{
    public static class ApplicationServicesExtension
    {
    
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,IConfiguration configuration)
        {
            services.AddDbContext<DataContext>(opt=>{
                opt.UseSqlite(configuration.GetConnectionString("DefualtConnection"));
            });

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddScoped<IUnitOfWork,UnitOfWork>();
            services.AddScoped<IAccountService,AccountService>();
            services.AddScoped<ICanvasService,CanvasService>();
            services.AddScoped<IQuestionsService,QuestionsService>();
            services.AddScoped<IAnswerService,AnswersService>();
            services.AddScoped<ISectionsService,SectionsService>();
            services.AddScoped<ICommentService,CommentService>();
            services.AddScoped<ICloudinaryService,CloudinaryService>();

            return services;
        }
    }
}