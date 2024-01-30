using Api.Entities;
using Api.Helpers.Pagination;
using Api.Models.Canvas;
using Microsoft.AspNetCore.Mvc;

namespace Api.Repositories.IRepositories
{
    public interface ICanvasRepository
    {
        public void  CreateCanvas(Canvas canvas);

        public Task<PageList<CanvasDto>> GetCanvasesOfUser(int userid,PageListParams pageListParams,CanvasSearchParams canvasSearchParams);

        public Task<Canvas> GetUserCanvasWithAnswers(int canvasId,int userId);

        public Task<Canvas> GetUserCanvasById(int canvasId,int userId);

        public Task<Canvas> GetCanvasWithImage(int canvasId,int userId);

        public Task<PageList<CanvasDto>> GetPublisedCanvases(int userId,PageListParams pageListParams,CanvasSearchParams canvasSearchParams);
    }

    
}