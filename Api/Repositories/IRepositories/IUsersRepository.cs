using Api.Entities;

namespace Api.Repositories.IRepositories
{
    public interface IUsersRepository
    {
        public Task<AppUser> GetUserById(int id);

        public Task<AppUser> GetUserByEmail(string email);

    }
}