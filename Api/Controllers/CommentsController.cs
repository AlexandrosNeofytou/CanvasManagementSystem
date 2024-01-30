using Api.Extensions;
using Api.Helpers.Pagination;
using Api.Models.Comments;
using Api.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    public class CommentsController : BaseController
    {
        private readonly ICommentService commentService;

        public CommentsController(ICommentService commentService)
        {
            this.commentService = commentService;
        }

        [HttpPost("create-comment")]
        public async Task<ActionResult<CommentDto>> CreateComment(CreateCommentDto createCommentDto)
        {   
            int userId=User.GetUserId();

            createCommentDto.AppUserId=userId;
            
            return await commentService.CreateComment(createCommentDto);
        }

        [HttpGet("get-canvas-comments/{canvasId}")]
        public async Task<ActionResult<CommentsDto>> GetCanvasComments(int canvasId,[FromQuery] GetCommentsParams getCommentsParams)
        {   

            return await commentService.GetCanvasComments(canvasId,getCommentsParams);

            
        }
    }
}