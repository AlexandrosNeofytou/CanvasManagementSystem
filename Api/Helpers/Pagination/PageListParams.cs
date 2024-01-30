namespace Api.Helpers.Pagination
{
    public class PageListParams
    {
        private int minPageNumber = 1;
        private int minPageSize = 1;
        private int maxPageSize = 10;

        private int pageNumber;

        private int pageSize;
        public int PageNumber
        {

            get { return pageNumber; }

            set
            {
                pageNumber=value < minPageNumber ? minPageNumber : value;

            }

        }

        public int PageSize { 

            get {return pageSize;}

            set {

                if(value > maxPageSize)
                {
                    pageSize=maxPageSize;
                }
                else if(value < minPageSize)
                {
                    pageSize=minPageNumber;

                }
                else 
                {
                    pageSize=value;
                }
            }
        }
    }
}