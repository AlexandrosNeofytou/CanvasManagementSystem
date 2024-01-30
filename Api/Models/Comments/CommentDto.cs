namespace Api.Models.Comments
{
    public class CommentDto
    {
        public int Id { get; set; }

        public string Text { get; set; }="";

        public int CanvasId { get; set; }

        public int AppUserId { get; set; }

        public string AuthorName { get; set; }="";

        public bool IsHidden { get; set; }

        public DateTime TimeCreated { get; set; }

    }
}