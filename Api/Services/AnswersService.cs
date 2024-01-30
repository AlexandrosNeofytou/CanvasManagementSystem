using Api.Entities;
using Api.Services.IServices;

namespace Api.Services
{
    public class AnswersService : IAnswerService
    {
        public bool AreAnswersValid(List<Answer> answers, List<Question> questions)
        {
            foreach(Question question in questions)
            {
                int answerOfQuestionCount=answers.Where(x=>x.QuestionId==question.Id).Count();

                if(answerOfQuestionCount > question.MaxNumberOfAnswers)
                {
                    return false;
                }
            }

            return true;
        }

        public List<Answer> RemoveEmptyAnswers(List<Answer> answers)
        {
            List<Answer> nonEmptyAnswers=new List<Answer>();

            for(int i=0; i<answers.Count; i++)
            {
                if(answers[i].AnswerText.Trim()!="")
                {
                    nonEmptyAnswers.Add(answers[i]);
                }
            }

            return nonEmptyAnswers;

            
        }
    }
}