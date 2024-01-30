namespace Api.Models.Canvas
{
    public class CanvasDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string AuthorUsername { get; set; }

        public bool IsPublished { get; set; }

        public string ImageUrl { get; set; }

        public DateTime DateModified { get; set; }

    }
}