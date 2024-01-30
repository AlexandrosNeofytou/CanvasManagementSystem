using Api.Entities;
using Api.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Authorize]
    public class QuestionsController : BaseController
    {
        public IQuestionsService questionsService; 
        public QuestionsController(IQuestionsService questionsService)
        {
            this.questionsService = questionsService;
            
        }

        [HttpGet("get-questions")]
        public async Task<ActionResult<List<Question>>> GetQuestions()
        {
            return await questionsService.GetQuestionsWithSections();
        }

        [HttpGet("get-questions-by-section-id/{sectionId}")]
        public async Task<ActionResult<List<Question>>> GetQuestionsBySectionId(int sectionId)
        {
            return await  this.questionsService.GetQuestionsBySectionId(sectionId);
        } 

    }
}