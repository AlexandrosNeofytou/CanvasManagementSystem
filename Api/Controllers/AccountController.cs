using Api.Models;
using Api.Models.Email;
using Api.Models.User;
using Api.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{

    public class AccountController : BaseController
    {
        private readonly IAccountService accountService;
        private readonly IJwtService jwtService;

        public AccountController(IAccountService accountService,IJwtService jwtService)
        {
            this.accountService = accountService;

            this.jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> RegisterUser(RegisterDto registerDto)
        {
            return await accountService.RegisterUser(registerDto);
        }

        [HttpPost("login")]
        public async Task<ActionResult<AppUserDto>> Login(LoginDto loginDto)
        {
            return await accountService.Login(loginDto);
        }

        [HttpPost("verify-user-email")]
        public async Task<ActionResult> VerifyUserEmail(EmailVerificationDto emailVerificationDto)
        {
            return await accountService.VerifyUserEmail(emailVerificationDto.Email,emailVerificationDto.Token);
        }

        [HttpPost("send-verification-email")]
        public async Task<ActionResult> SendVerificationEmail(EmailModel emailModel)
        {
            return await accountService.SendVerificationEmail(emailModel.Email);
        }



    }
}