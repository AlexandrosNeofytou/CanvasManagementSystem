using Api.Repositories.IRepositories;

namespace Api.Data
{
    public interface IUnitOfWork
    {
        public ICanvasRepository CanvasRepository { get; }  

        public IUsersRepository UsersRepository {get;}

        public ISectionsRepository SectionsRepository {get;}

        public IQuestionsRepository QuestionsRepository {get;}

        public ICommentRepository commentRepository {get;}
        public Task<bool> Complete();    
  
    }
}