using System.ComponentModel.DataAnnotations;

namespace Api.Models
{
    public class CreateCanvasDto
    {
        public int UserId { get; set; }

        public string Title { get; set; }="";

        public string Description { get; set; }="";

    }
}