using Microsoft.AspNetCore.Identity;

namespace Api.Entities
{
    public class AppRole : IdentityRole<int>
    {
        public List<AppUserRole> UserRoles { get; set; }
    }   
}