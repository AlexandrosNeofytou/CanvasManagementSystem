using Api.Helpers.Pagination;
using Api.Models;
using Api.Models.Answers;
using Api.Models.Canvas;
using Microsoft.AspNetCore.Mvc;

namespace Api.Services.IServices
{
    public interface ICanvasService
    {
        public Task<ActionResult<CanvasDto>> CreateCanvas(CreateCanvasDto createCanvasDto);

        public Task<ActionResult<PageList<CanvasDto>>> GetUserCanvases(int userId,PageListParams pageListParams,HttpResponse response,CanvasSearchParams canvasSearchParams);

        public Task<ActionResult<List<AnswerDto>>> AddAnswersToCanvas(CreateAnswersDto createAnswersDto,int sectionId);

        public Task<ActionResult<List<AnswerDto>>> GetOwnCanvasAnswers(int canvasId,int userId);

        public Task<ActionResult<PageList<CanvasDto>>> GetPublishedCanvases(int userId,PageListParams pageListParams,HttpResponse httpResponse,CanvasSearchParams canvasSearchParams);

        public Task<ActionResult<bool>> SetCanvasPublicityStatus(int canvasId,UpdateCanvasPublishStatusDto updateCanvasPublishStatusDto);

        public Task<ActionResult<CanvasDto>> GetCanvasDtoWithImage(int userId,int canvasId);
        public Task<ActionResult<CanvasDto>> UploadImageToCanvas(IFormFile image,int canvasId,int userId);

        public Task<ActionResult<CanvasDto>> UpdateCanvas(UpdateCanvasDto updateCanvasDto,int userId);
    }   

}