using Microsoft.EntityFrameworkCore;

namespace Api.Helpers.Pagination
{
    public class PageList<T> : List<T>
    {
        public PageList(List<T> items,int itemsCount,int pageNumber,int itemsPerPage,int numberOfPages)
        {
            AddRange(items);

            ItemCount=itemsCount;

            PageNumber=pageNumber;

            ItemsPerPage=itemsPerPage;

            NumberOfPages=numberOfPages;
        }
        
        public int ItemCount { get; set; }

        public int PageNumber { get; set; }

        public int ItemsPerPage { get; set; }

        public int NumberOfPages { get; set; }

        public static async Task<PageList<T>> CreatePageList(IQueryable<T> data,int pageNumber,int pageSize)
        {
            int itemsCount=data.Count();

            int itemsToSkip=(pageNumber-1)*pageSize;

            int numberOfPages=(int)MathF.Ceiling(itemsCount/(float)pageSize);

            List<T> items=await data.Skip(itemsToSkip).Take(pageSize).ToListAsync();

            return new PageList<T>(items,itemsCount,pageNumber,pageSize,numberOfPages);


        }
    }
}