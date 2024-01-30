using SendGrid;

namespace Api.Services.IServices
{
    public interface IEmailVerificationService
    {
        public Task<string> GenerateAndStoreEmailVerificationToken(string email);

        public Task<bool> IsVerificationCodeValid(string email,string code);

        public Task<Response> SendEmailVerification(string email,string code);

    }
}