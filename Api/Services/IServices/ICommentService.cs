using Api.Helpers.Pagination;
using Api.Models.Comments;
using Microsoft.AspNetCore.Mvc;

namespace Api.Services.IServices
{
    public interface ICommentService
    {
        public Task<ActionResult<CommentDto>> CreateComment(CreateCommentDto comment);

        public Task<ActionResult<CommentsDto>> GetCanvasComments(int canvasId,GetCommentsParams getCommentsParams);
        
    }
}