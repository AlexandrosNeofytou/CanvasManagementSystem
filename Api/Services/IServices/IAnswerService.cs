using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Entities;

namespace Api.Services.IServices
{
    public interface IAnswerService
    {
        public bool AreAnswersValid(List<Answer> answers,List<Question> questions);

        public List<Answer> RemoveEmptyAnswers(List<Answer> answers);

    }
}