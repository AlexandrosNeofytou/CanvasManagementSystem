using Microsoft.AspNetCore.Identity;

namespace Api.Entities
{
    public class AppUser : IdentityUser<int> 
    {
        public List<AppUserRole> UserRoles { get; set; }

        public List<Canvas> Canvases;
    }
}