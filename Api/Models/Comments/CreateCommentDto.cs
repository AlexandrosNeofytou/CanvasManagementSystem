namespace Api.Models.Comments
{
    public class CreateCommentDto
    {   
        public string Text { get; set; }
        public int AppUserId { get; set; }=0;
        public int CanvasId { get; set; }        
    }
}