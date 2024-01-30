using System.Drawing;
using Api.Data;
using Api.Entities;
using Api.Enums;
using Api.Models;
using Api.Services.IServices;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace Api.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<AppUser> userManager;
        private readonly IJwtService jwtService;
        private readonly IEmailVerificationService emailVerificationService;
        private readonly IUnitOfWork unitOfWork;

        public AccountService(UserManager<AppUser> userManager,
        IJwtService jwtService,
        IEmailVerificationService emailVerificationService,
        IUnitOfWork unitOfWork)
        {
            this.userManager = userManager;
            this.jwtService = jwtService;
            this.emailVerificationService = emailVerificationService;
            this.unitOfWork = unitOfWork;
        }

        public async Task<ActionResult<AppUserDto>> Login(LoginDto loginDto)
        {
            loginDto.Email = loginDto.Email.Trim().ToLower();

            AppUser appUser = await userManager.Users.Include(x => x.UserRoles).FirstOrDefaultAsync(x => x.Email == loginDto.Email);

            if (appUser == null) return new NotFoundObjectResult(new { error = "User not found" });

            bool isPasswordCorrect = await userManager.CheckPasswordAsync(appUser, loginDto.Password);

            if (isPasswordCorrect == false) return new BadRequestObjectResult("Password is wrong");

            if (appUser.EmailConfirmed == false) return new BadRequestObjectResult(new { verification = "email is not verified" });

            IList<string> roles = await userManager.GetRolesAsync(appUser);

            string token = jwtService.CreateJwtToken(appUser, roles);


            return new AppUserDto()
            {
                Id = appUser.Id,
                Username = appUser.UserName,
                Token = token,
                Roles = roles
            };

        }

        public async Task<ActionResult> RegisterUser(RegisterDto registerDto)
        {

            registerDto.Email = registerDto.Email.Trim().ToLower();

            registerDto.Username = registerDto.Username.Trim().ToLower().Replace(" ", "");

            if (!await IsEmailUnique(registerDto.Email))
            {
                return new BadRequestObjectResult(new
                {
                    Email = "Email exists"
                });
            }
            else if (!await IsUsernameUnique(registerDto.Username))
            {
                return new BadRequestObjectResult(new
                {
                    Username = "Username exists"
                });

            }


            AppUser appUser = new AppUser()
            {
                UserName = registerDto.Username,
                Email = registerDto.Email,
            };

            var result = await userManager.CreateAsync(appUser, registerDto.Password);

            if (!result.Succeeded)
            {
                return new BadRequestObjectResult(result.Errors);
            }

            result = await userManager.AddToRoleAsync(appUser, Roles.Member.ToString());

            result = await userManager.AddToRoleAsync(appUser, Roles.Admin.ToString());

            if (!result.Succeeded)
            {
                return new BadRequestObjectResult(result.Errors);
            }

            string emailVerificationToken = await emailVerificationService.GenerateAndStoreEmailVerificationToken(appUser.Email);

            var emailResponse=await emailVerificationService.SendEmailVerification(registerDto.Email,emailVerificationToken);

            if(!emailResponse.IsSuccessStatusCode)
            {
                return new BadRequestObjectResult(new {email="error sending email"});
            }

            return new OkObjectResult(emailVerificationToken);
        }

        public async Task<ActionResult> SendVerificationEmail(string email)
        {
            AppUser appUser=await unitOfWork.UsersRepository.GetUserByEmail(email); 

            if(appUser==null)
            {
                return new NotFoundObjectResult(new {user="not found"});
            }
            
            string emailVerificationToken=await emailVerificationService.GenerateAndStoreEmailVerificationToken(email);

            var emailResponse=await emailVerificationService.SendEmailVerification(email,emailVerificationToken);


            if(!emailResponse.IsSuccessStatusCode)
            {
                return new BadRequestObjectResult(new {email="error sending email"});
            }

            return new OkObjectResult("");
        }

        public async Task<ActionResult> VerifyUserEmail(string email, string token)
        {

            AppUser appUser = await unitOfWork.UsersRepository.GetUserByEmail(email);

            if (appUser == null)
            {
                return new NotFoundObjectResult(new { user = "not found" });
            }

            bool isVerificationCodeValid = await emailVerificationService.IsVerificationCodeValid(email, token);


            if (appUser.EmailConfirmed)
            {
                return new BadRequestObjectResult("account is already verified");

            }

            else if(!isVerificationCodeValid)
            {
                return new BadRequestObjectResult("invalid verification code");
            }

            appUser.EmailConfirmed = true;

            if (!await unitOfWork.Complete())
            {
                
                return new BadRequestObjectResult("error verifying email1");


            }

            return new OkObjectResult(new {email="verified"});




        }

        async Task<bool> IsEmailUnique(string email)
        {
            AppUser appUser = await userManager.FindByEmailAsync(email);

            return appUser == null;
        }

        async Task<bool> IsUsernameUnique(string username)
        {
            AppUser appUser = await userManager.FindByNameAsync(username);

            return appUser == null;
        }


    }


}