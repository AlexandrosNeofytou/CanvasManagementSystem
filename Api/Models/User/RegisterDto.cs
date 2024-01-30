using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models
{
    public class RegisterDto
    {
        [MinLength(5),MaxLength(10)]
        public string Username { get; set; } 

        [EmailAddress]
        public string Email { get; set; }

        [MinLength(6),RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$")]
        public string Password { get; set; }

    }
}