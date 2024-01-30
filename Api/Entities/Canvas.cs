namespace Api.Entities
{
    public class Canvas
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public DateTime DateModified { get; set; } = DateTime.UtcNow;

        public bool IsPublished { get; set; } = false;
        public int AppUserId { get; set; }

        public int? ImageId { get; set; }

        public AppUser AppUser { get; set; }

        public List<Answer> Answers { get; set; }

        public List<Comment> Comments { get; set; }

        public Image Image { get; set; }


    }
}