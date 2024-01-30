using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Api.Entities;
using Api.Services.IServices;
using Microsoft.IdentityModel.Tokens;


namespace Api.Services
{
    public class JwtService : IJwtService
    {   
        private SymmetricSecurityKey  key;
        public JwtService(IConfiguration configuration)
        {
            string secretKey=configuration["TokenKey"];

            key=new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        }
        public string CreateJwtToken(AppUser appUser,IList<string> roles)
        {
            var claims=new List<Claim>(){
                new Claim(ClaimTypes.NameIdentifier,appUser.Id.ToString()),
                new Claim(ClaimTypes.Name,appUser.UserName),
            };

            for(int i=0; i<roles.Count; i++)
            {
                claims.Add(new Claim(ClaimTypes.Role,roles[i]));
            }

            var cred=new SigningCredentials(key,SecurityAlgorithms.Aes128CbcHmacSha256);

            var tokenDescriptor=new SecurityTokenDescriptor(){
                Subject=new ClaimsIdentity(claims),
                Expires=DateTime.Now.AddDays(7),
                SigningCredentials=cred

            };

            JwtSecurityTokenHandler tokenHandler=new JwtSecurityTokenHandler();

            var token=tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public int GetUserIdFromToken(string token)
        {
            var handler=new JwtSecurityTokenHandler();

            var jsonToken=handler.ReadToken(token) as JwtSecurityToken;

            if(jsonToken == null)
            {
                return 0;
            }

            var userId=jsonToken.Claims.FirstOrDefault(x=>x.Type==ClaimTypes.NameIdentifier)?.Value;

            if(userId==null)
            {
                return 0;
            }

            return int.Parse(userId);


        }
    }
}