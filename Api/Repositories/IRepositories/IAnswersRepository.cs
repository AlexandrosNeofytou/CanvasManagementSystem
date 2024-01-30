using Api.Entities;

namespace Api.Repositories.IRepositories
{
    public interface IAnswersRepository
    {
        public Task CreateAnswers(List<Answer> answers);
       
    }
}