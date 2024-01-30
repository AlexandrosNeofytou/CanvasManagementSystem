using System.Text.Json;
using Api.Models.Email;
using Api.Services.IServices;
using Microsoft.Extensions.Caching.Distributed;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace Api.Repositories
{
    public class EmailVerificationService : IEmailVerificationService
    {
        readonly IDistributedCache distributedCache;
        readonly Random random;
        readonly SendGridClient sendGridClient;
        readonly EmailSettings emailSettings;

        readonly string emailTemplatesPath="";


        public EmailVerificationService(IDistributedCache distributedCache,
        IConfiguration configuration,IWebHostEnvironment webHostEnvironment)
        {
            this.distributedCache = distributedCache;

            emailSettings=configuration.GetSection("SendGrid").Get<EmailSettings>();

            sendGridClient = new SendGridClient(emailSettings.Key);

            random = new Random();

            emailTemplatesPath=Path.Combine(webHostEnvironment.ContentRootPath,
                "Helpers","EmailTemplates");
        }

        



        public async Task<string> GenerateAndStoreEmailVerificationToken(string email)
        {
            string emailVerificationToken = GenerateValidationCode(5);

            if(await this.distributedCache.GetAsync(email)!=null)
            {
                await distributedCache.RemoveAsync(email);  
            }


            var cacheOptions = new DistributedCacheEntryOptions()
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(15)
            };

            var tokenBytes = JsonSerializer.SerializeToUtf8Bytes(emailVerificationToken);

            await this.distributedCache.SetAsync(email, tokenBytes, cacheOptions);

            return emailVerificationToken;


        }

        public async Task<bool> IsVerificationCodeValid(string email, string code)
        {

            byte[] codeBytes = JsonSerializer.SerializeToUtf8Bytes(code);

            byte[] actualCode = await distributedCache.GetAsync(email);

            if (actualCode == null || codeBytes.Length != actualCode.Length)
            {
                return false;
            }

            for (int i = 0; i < codeBytes.Length; i++)
            {
                if (codeBytes[i] != actualCode[i])
                {
                    return false;
                }
            }

            await distributedCache.RemoveAsync(email);

            return true;
        }

        public async Task<Response> SendEmail(EmailProperties emailProperties)
        {
            var from = new EmailAddress(emailSettings.Email, emailSettings.SenderName);

            var to = new EmailAddress(emailProperties.Receiver);


            var msg = MailHelper.CreateSingleEmail(
                from, 
                to, 
                emailProperties.Subject, 
                emailProperties.PlainTextContent, 
                emailProperties.HtmlContent
            );


            

            return await sendGridClient.SendEmailAsync(msg);
        }
      

        public async Task<Response> SendEmailVerification(string email, string code)
        {
            string html=File.ReadAllText(Path.Combine(emailTemplatesPath,"verification_email.html"));

            html= html.Replace("{{verificationCode}}",code);

            EmailProperties emailProperties=new EmailProperties()
            {
                Receiver=email,
                Subject="Email Verification",
                FromEmail=emailSettings.Email,
                FromName=emailSettings.SenderName,
                PlainTextContent="",
                HtmlContent=html
            };


            return await SendEmail(emailProperties);
        }

        private string GenerateValidationCode(int numberOfCharacters)
        {
            string code = "";

            for (int i = 0; i < numberOfCharacters; i++)
            {
                int randomNumber = random.Next(0,9)+1;

                code+=randomNumber.ToString();
            }

            return code;

            
        }

       
    }


}