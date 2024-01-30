using Api.Models.Sections;
using Api.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
 
    [Authorize]
    public class SectionsController : BaseController
    {
        private readonly ISectionsService sectionsService;

        public SectionsController(ISectionsService sectionsService)
        {
            this.sectionsService = sectionsService;
        }

        [HttpGet("get-sections")]
        public async Task<ActionResult<List<SectionDto>>> GetSections()
        {
            return await sectionsService.GetSections();
        }


      
    }
}