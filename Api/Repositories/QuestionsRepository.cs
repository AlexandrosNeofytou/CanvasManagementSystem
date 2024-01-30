using Api.Data;
using Api.Entities;
using Api.Repositories.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace Api.Repositories
{
    public class QuestionsRepository : IQuestionsRepository
    {
        private readonly DataContext dataContext;

        public QuestionsRepository(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        public async Task<List<Question>> GetQuestions()
        {
            return  await this.dataContext.Questions.ToListAsync();
        }

        public async Task<List<Question>> GetQuestionsWithSections()
        {
            IQueryable<Question> questionsQuery=dataContext.Questions.Include(x=>x.Section);

            questionsQuery=questionsQuery
            .OrderBy(x=> x.Section.DisplayOrder)
            .ThenBy(x=>x.DisplayOrder);

            return await questionsQuery.ToListAsync();
        }


        public async Task<List<Question>> GetQuestionsWithSectionsBySectionId(int sectionId)
        {
            IQueryable<Question> questions=dataContext.Questions.Include(x=>x.Section)
                .Where(x=>x.SectionId==sectionId);

            questions=questions.OrderBy(x=>x.Section.DisplayOrder)
            .ThenBy(x=>x.DisplayOrder);


            return questions.ToList();
        }
    }
}