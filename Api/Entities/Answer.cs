using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Entities
{
    public class Answer
    {
        public int Id { get; set; }

        public string AnswerText { get; set; }

        public Question Question { get; set; }

        public int QuestionId { get; set; }

        public Canvas Canvas { get; set; }

        public int CanvasId { get; set; }
    }
}