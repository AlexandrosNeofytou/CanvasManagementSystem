using Api.Entities;
using Api.Helpers.Pagination;
using Api.Models.Comments;

namespace Api.Repositories.IRepositories
{
    public interface ICommentRepository
    {
        public Task<Comment> CreateComment(Comment comment);

        public Task<CommentsDto> GetCanvasComments(int canvasId,GetCommentsParams getCommentsParams);
    }
}