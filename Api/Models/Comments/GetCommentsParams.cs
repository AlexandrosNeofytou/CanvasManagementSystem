namespace Api.Models.Comments
{
    public class GetCommentsParams
    {
        public int NumberOfCommentsToSkip { get; set; }=0;

        public int NumberOfCommentsToTake { get; set; }=1;

    }
}