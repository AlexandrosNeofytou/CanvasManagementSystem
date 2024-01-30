using Api.Extensions;
using Api.Helpers.Pagination;
using Api.Models;
using Api.Models.Answers;
using Api.Models.Canvas;
using Api.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Authorize]
    public class CanvasController :BaseController
    {
        private readonly ICanvasService canvasService;
        private readonly ICloudinaryService cloudinaryService;
        public CanvasController(ICanvasService canvasService,ICloudinaryService cloudinaryService)
        {
            this.cloudinaryService = cloudinaryService;
            this.canvasService = canvasService;
            
        }


        [HttpPost("create-canvas")]
        public async Task<ActionResult<CanvasDto>> CreateCanvas(CreateCanvasDto createCanvasDto)
        {
            createCanvasDto.UserId=User.GetUserId();

            return await canvasService.CreateCanvas(createCanvasDto);
        }

        [HttpGet("get-user-canvases")]
        public async Task<ActionResult<PageList<CanvasDto>>> GetUserCanvases([FromQuery] PageListParams pageListParams,[FromQuery] CanvasSearchParams canvasSearchParams)
        {
            int userId=User.GetUserId();

        
            
            return await canvasService.GetUserCanvases(userId,pageListParams,Response,canvasSearchParams);
        }


        [HttpPost("add-answers-to-canvas")]
        public async Task<ActionResult<List<AnswerDto>>> AddAnswersToCanvas(CreateAnswersDto createAnswersDto)
        {
            createAnswersDto.UserId=User.GetUserId();
            return await canvasService.AddAnswersToCanvas(createAnswersDto,-1);
        }

        [HttpPost("add-section-answers-to-canvas")]
        public async Task<ActionResult<List<AnswerDto>>> AddSectionAnswersToCanvas(CreateSectionAnswersDto createSectionAnswersDto)
        {
            createSectionAnswersDto.UserId=User.GetUserId();

            return await canvasService.AddAnswersToCanvas(createSectionAnswersDto,createSectionAnswersDto.SectionId);


        }

        [HttpGet("get-own-canvas-answers/{canvasId}")]
        public async Task<ActionResult<List<AnswerDto>>> GetOwnCanvasAnswers(int canvasId)
        {
            int userId=User.GetUserId();

            return await canvasService.GetOwnCanvasAnswers(canvasId,userId);
        }

        [HttpGet("get-published-canvases")]
        public async Task<ActionResult<PageList<CanvasDto>>> GetPublishedCanvases([FromQuery] PageListParams pageListParams,[FromQuery] CanvasSearchParams canvasSearchParams)
        {
            int userId=User.GetUserId();

            return await canvasService.GetPublishedCanvases(userId,pageListParams,Response,canvasSearchParams);
        }

        [HttpPut("set-canvas-publicity/{canvasId}")]
        public async Task<ActionResult<bool>> SetCanvasPublicity(int canvasId, [FromBody] UpdateCanvasPublishStatusDto updateCanvasPublishStatusDto)
        {
            int userId=User.GetUserId();
            
            updateCanvasPublishStatusDto.UserId=userId;


            return await canvasService.SetCanvasPublicityStatus(canvasId,updateCanvasPublishStatusDto);
        }

        [HttpPut("add-image-to-canvas/{canvasId}")]
        public async Task<ActionResult<CanvasDto>> AddImageToCanvas(IFormFile image,int canvasId)
        {
            int userId=User.GetUserId();

            return await canvasService.UploadImageToCanvas(image,canvasId,userId); 
        }

        [HttpGet("get-canvas-by-id/{canvasId}")]
        public async Task<ActionResult<CanvasDto>> GetCanavsById(int canvasId)
        {
            int userId=User.GetUserId();

            return await canvasService.GetCanvasDtoWithImage(userId,canvasId);
        }

        [HttpPut("update-canvas")] 
        public async Task<ActionResult<CanvasDto>> UpdateCanvas(UpdateCanvasDto updateCanvasDto)
        {
            int userId=User.GetUserId();

            return await canvasService.UpdateCanvas(updateCanvasDto,userId);
        }
    }
}