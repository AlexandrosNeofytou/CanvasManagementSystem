using Api.Entities;
using Api.Models.Sections;
using Microsoft.AspNetCore.Mvc;

namespace Api.Services.IServices
{
    public interface ISectionsService
    {
        public Task<ActionResult<List<SectionDto>>> GetSections();

    }
}