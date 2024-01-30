using Api.Data;
using Api.Entities;
using Api.Repositories.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Api.Repositories
{
    public class UserRepository : IUsersRepository
    {
        private readonly DataContext dataContext;

        public UserRepository(DataContext dataContext)
        {
            this.dataContext = dataContext;
            
        }

        public async Task<AppUser> GetUserByEmail(string email)
        {
            AppUser appUser=await dataContext.Users.FirstOrDefaultAsync(x=>x.Email==email);

            return appUser;
        }

        public async Task<AppUser> GetUserById(int id)
        {
            AppUser appUser=await dataContext.Users.FirstOrDefaultAsync(x=>x.Id==id);

            return appUser;
        }

      
    }
}