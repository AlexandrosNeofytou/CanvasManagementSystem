using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.Email
{
    public class EmailProperties
    {
        public string Receiver { get; set; }

        public string Subject { get; set; }

        public string FromEmail { get; set; }

        public string FromName { get; set; }

        public string PlainTextContent { get; set; }

        public string HtmlContent { get; set; }

        
    }
}