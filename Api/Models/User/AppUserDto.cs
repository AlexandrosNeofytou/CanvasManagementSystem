namespace Api.Models
{
    public class AppUserDto
    {
        public int Id { get; set; }

        public string Username { get; set; }

        public string Token { get; set; }

        public IList<string> Roles { get; set; }
    }
}