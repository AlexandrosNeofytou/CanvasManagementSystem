namespace Api.Entities
{
    public class Comment
    {
        public int Id { get; set; }

        public string Text { get; set; }="";

        public Canvas Canvas { get; set; }
        public int CanvasId { get; set; }

        public AppUser AppUser { get; set; }

        public DateTime TimeCreated { get; set; }=DateTime.UtcNow;

        public int AppUserId { get; set; }

        public bool IsHidden { get; set; }
    }
}