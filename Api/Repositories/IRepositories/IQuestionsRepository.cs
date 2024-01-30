using Api.Entities;

namespace Api.Repositories.IRepositories
{
    public interface IQuestionsRepository
    {
        public Task<List<Question>> GetQuestionsWithSections();

        public Task<List<Question>> GetQuestions();

        public  Task<List<Question>> GetQuestionsWithSectionsBySectionId(int sectionId);

    }
}