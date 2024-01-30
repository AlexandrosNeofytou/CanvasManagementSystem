namespace Api.Entities
{
    public class Question
    {
        public int Id { get; set; }

        public string QuestionName { get; set; }="";

        public int DisplayOrder { get; set; }

        public Section Section { get; set; }

        public int SectionId { get; set; }

        public int MaxNumberOfAnswers {get; set;}
    }
}