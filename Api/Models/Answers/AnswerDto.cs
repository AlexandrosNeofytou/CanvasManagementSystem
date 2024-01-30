using Api.Models.Questions;

namespace Api.Models.Answers
{
    public class AnswerDto
    {
        public int Id { get; set; }

        public string AnswerText { get; set; }

        public int QuestionId {get; set;}

        public int SectionId { get; set; }


    }
}