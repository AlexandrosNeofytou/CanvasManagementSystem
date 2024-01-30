using Api.Data;
using Api.Entities;
using Api.Models.Comments;
using Api.Repositories.IRepositories;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace Api.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private readonly DataContext dataContext;
        private readonly IMapper mapper;

        public CommentRepository(DataContext dataContext,IMapper mapper)
        {
            this.dataContext = dataContext;
            this.mapper = mapper;
        }
        public async Task<Comment> CreateComment(Comment comment)
        {
           await this.dataContext.Comments.AddAsync(comment);

           return comment;
        }

        public async Task<CommentsDto> GetCanvasComments(int canvasId,GetCommentsParams getCommentsParams)
        {
            CommentsDto commentsDto=new CommentsDto();

            IQueryable<CommentDto> comments=dataContext.Comments
            .Where(x=>x.CanvasId==canvasId)
            .OrderByDescending(x=>x.TimeCreated)
            .ProjectTo<CommentDto>(mapper.ConfigurationProvider);

            commentsDto.TotalCount=comments.Count();
            
            comments=comments
                .Skip(getCommentsParams.NumberOfCommentsToSkip)
                .Take(getCommentsParams.NumberOfCommentsToTake);

            commentsDto.commentsDto=await comments.ToListAsync();

            return commentsDto; 

           
        }
    }
}