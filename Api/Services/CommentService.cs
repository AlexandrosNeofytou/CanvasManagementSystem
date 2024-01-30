using Api.Data;
using Api.Entities;
using Api.Extensions;
using Api.Helpers.Pagination;
using Api.Models.Comments;
using Api.Services.IServices;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace Api.Services
{
    public class CommentService : ICommentService
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper mapper;

        public CommentService(IUnitOfWork unitOfWork,IMapper mapper)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }
        public async Task<ActionResult<CommentDto>> CreateComment(CreateCommentDto createCommentDto)
        {
            AppUser appUser=await unitOfWork.UsersRepository.GetUserById(createCommentDto.AppUserId);

            Canvas canvas;

            if(appUser==null)
            {
                return new NotFoundObjectResult(new {user="user not found"});
            }

            canvas=await unitOfWork.CanvasRepository.GetUserCanvasById(createCommentDto.CanvasId,createCommentDto.AppUserId);

            if(canvas==null)
            {
                return new NotFoundObjectResult(new {canvas="canvas not found"});

            }

            Comment comment=mapper.Map<Comment>(createCommentDto);

            if(comment==null)
            {
                return new BadRequestObjectResult(new {comment=" couldnt create comment"});
            }

            await unitOfWork.commentRepository.CreateComment(comment);

            
            if(await unitOfWork.Complete())
            {   
                CommentDto createdComment=mapper.Map<CommentDto>(comment);

                return new OkObjectResult(createdComment);

            }
            else
            {
                return new BadRequestObjectResult(new {comment="comment couldnt be created"});
            }


        }

        public async Task<ActionResult<CommentsDto>> GetCanvasComments(int canvasId,GetCommentsParams getCommentsParams)
        {
            CommentsDto commentDtos= await unitOfWork.commentRepository.GetCanvasComments(canvasId,getCommentsParams);

            return new OkObjectResult(commentDtos);
        }
    }
}