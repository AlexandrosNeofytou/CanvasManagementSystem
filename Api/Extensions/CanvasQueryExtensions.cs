using Api.Models.Canvas;

namespace Api.Extensions
{
    public static class CanvasQueryExtensions
    {
        public static IQueryable<CanvasDto> GetQueryWithSearchParams(this IQueryable<CanvasDto> query,CanvasSearchParams canvasSearchParams)
        {
            var canvasQuery=query;

            if(canvasSearchParams.CanvasTitle!=null)
            {
                canvasQuery=canvasQuery.Where(x=>x.Title.Contains(canvasSearchParams.CanvasTitle));
            }

            if(canvasSearchParams.Author!=null)
            {
                canvasQuery=canvasQuery.Where(x=>x.AuthorUsername.Contains(canvasSearchParams.Author));
            }
            
            return canvasQuery;
        } 
    }
}