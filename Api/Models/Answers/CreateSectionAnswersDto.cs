using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Models.Answers
{
    public class CreateSectionAnswersDto:CreateAnswersDto
    {
        public int SectionId {get; set;} 
    }
}