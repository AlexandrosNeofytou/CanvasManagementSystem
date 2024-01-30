using Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace Api.Services.IServices
{
    public interface IAccountService
    {
        public Task<ActionResult> RegisterUser(RegisterDto registerDto);

        public Task<ActionResult<AppUserDto>> Login(LoginDto loginDto);

        public Task<ActionResult> VerifyUserEmail(string email,string token);


        public Task<ActionResult> SendVerificationEmail(string email);


    }
}