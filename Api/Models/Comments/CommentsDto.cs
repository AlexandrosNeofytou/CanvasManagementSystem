namespace Api.Models.Comments
{
    public class CommentsDto
    {
        public List<CommentDto> commentsDto { get; set; }

        public int TotalCount { get; set; }
    }
}