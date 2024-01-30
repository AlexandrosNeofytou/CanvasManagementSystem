namespace Api.Models.User
{
    public class EmailVerificationDto
    {
        public string Email { get; set; }

        public string Token { get; set; }
    }
}