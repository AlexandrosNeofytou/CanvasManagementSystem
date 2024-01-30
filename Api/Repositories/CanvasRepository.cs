using Api.Data;
using Api.Entities;
using Api.Extensions;
using Api.Helpers.Pagination;
using Api.Models.Canvas;
using Api.Repositories.IRepositories;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace Api.Repositories
{
    public class CanvasRepository : ICanvasRepository
    {
        private readonly DataContext dataContext;
        private readonly IMapper mapper;

        public CanvasRepository(DataContext dataContext,IMapper mapper)
        {
            this.mapper = mapper;
            this.dataContext = dataContext;

        }
        public async void CreateCanvas(Canvas canvas)
        {
           dataContext.Add(canvas);

        }

        public async Task<PageList<CanvasDto>> GetCanvasesOfUser(int userid,PageListParams pageListParams,CanvasSearchParams canvasSearchParams)
        {
            var canvasesQuery
            =dataContext.Canvases.Where(x=>x.AppUserId==userid)
            .ProjectTo<CanvasDto>(mapper.ConfigurationProvider);

            canvasesQuery=canvasesQuery.GetQueryWithSearchParams(canvasSearchParams);

            PageList<CanvasDto> canvasPageList
                =await PageList<CanvasDto>.CreatePageList(canvasesQuery,pageListParams.PageNumber,pageListParams.PageSize);

         

            return canvasPageList;
        }

        public async Task<Canvas> GetCanvasWithImage(int canvasId, int userId)
        {
            Canvas canvas=await dataContext.Canvases 
            .Include(x=>x.Image)
            .FirstOrDefaultAsync(x=>x.Id==canvasId && x.AppUserId==userId);


            return canvas;
           
        }

        public async Task<PageList<CanvasDto>> GetPublisedCanvases(int userId,PageListParams pageListParams,CanvasSearchParams canvasSearchParams)
        {
            IQueryable<CanvasDto> canvasQuery=dataContext.Canvases
                .Where(x=>x.AppUserId!=userId && x.IsPublished==true)
                .ProjectTo<CanvasDto>(mapper.ConfigurationProvider);

            canvasQuery=canvasQuery.GetQueryWithSearchParams(canvasSearchParams);

            PageList<CanvasDto> canvasPageList
                =await PageList<CanvasDto>.CreatePageList(canvasQuery,pageListParams.PageNumber,pageListParams.PageSize);

            return canvasPageList;
        }

        public async Task<Canvas> GetUserCanvasById(int canvasId, int userId)
        {
            Canvas canvas=await dataContext.Canvases
            .Include(x=>x.AppUser)
            .Include(x=>x.Image)
            .FirstOrDefaultAsync(x=>x.Id==canvasId && x.AppUserId==userId);

            return canvas;
        }

    

        public async Task<Canvas> GetUserCanvasWithAnswers(int canvasId, int userId)
        {
            Canvas canvas=await dataContext.Canvases
            .Include(x=>x.Answers)
            .ThenInclude(x=>x.Question)
            .FirstOrDefaultAsync(x=>x.Id==canvasId && x.AppUserId==userId);

            return canvas;
        }

      
    }
}