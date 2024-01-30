namespace Api.Helpers.Pagination
{
    public class PageListHeader
    {


        public PageListHeader(int pageNumber, int pageSize, int itemsCount, int numberOfPages)
        {
            this.PageNumber = pageNumber;
            this.PageSize = pageSize;
            this.ItemsCount = itemsCount;
            this.NumberOfPages = numberOfPages;

        }
        public int PageNumber { get; set; }

        public int PageSize { get; set; }

        public int ItemsCount { get; set; }

        public int NumberOfPages { get; set; }
    }
}