using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace Api.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static int GetUserId(this ClaimsPrincipal user)
        {
            string userId=user.FindFirst(ClaimTypes.NameIdentifier).Value;

            return int.Parse(userId);
        }
    }
}