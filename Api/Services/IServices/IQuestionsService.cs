using Api.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api.Services.IServices
{
    public interface IQuestionsService
    {
        public Task<ActionResult<List<Question>>> GetQuestionsWithSections();

        public Task<ActionResult<List<Question>>> GetQuestionsBySectionId(int sectionId); 
    }
}