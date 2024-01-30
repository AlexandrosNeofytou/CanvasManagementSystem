using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Api.Entities;
using Api.Repositories.IRepositories;

namespace Api.Repositories
{
    public class AnswersRepository : IAnswersRepository
    {
        private readonly DataContext dataContext;

        public AnswersRepository(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }
        public async Task CreateAnswers(List<Answer> answers)
        {
            await this.dataContext.Answers.AddRangeAsync(answers);
        }
    }
}