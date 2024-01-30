namespace Api.Models.Answers
{
    public class CreateAnswersDto
    {
        public List<CreateAnswerDto> Answers { get; set; }

        public int CanvasId { get; set; }

        public int UserId { get; set; }
    }
}