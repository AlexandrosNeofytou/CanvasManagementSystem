using Api.Entities;

namespace Api.Services.IServices
{
    public interface IJwtService
    {
        public string CreateJwtToken(AppUser appUser,IList<string> userRoles);

        public int GetUserIdFromToken(string token);
    }
}