using Api.Repositories;
using Api.Repositories.IRepositories;
using AutoMapper;

namespace Api.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext dataContext;
        private readonly IMapper mapper;

        public UnitOfWork(DataContext dataContext,IMapper mapper)
        {
            this.mapper = mapper;
            this.dataContext = dataContext;
            
        }
        public ICanvasRepository CanvasRepository => new CanvasRepository(dataContext,mapper);

        public IUsersRepository UsersRepository => new UserRepository(dataContext);

        public ISectionsRepository SectionsRepository => new SectionsRepository(dataContext,mapper);

        public IQuestionsRepository QuestionsRepository => new QuestionsRepository(dataContext);

        public ICommentRepository commentRepository => new CommentRepository(dataContext,mapper);

        public async Task<bool> Complete()
        {
            return await dataContext.SaveChangesAsync()>0;
        }
    }
}