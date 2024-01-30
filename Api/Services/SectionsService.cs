using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Api.Models.Sections;
using Api.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace Api.Services
{
    public class SectionsService : ISectionsService
    {
        private readonly IUnitOfWork unitOfWork;

        public SectionsService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }


        public async Task<ActionResult<List<SectionDto>>> GetSections()
        {
            List<SectionDto> sectionDtos=await unitOfWork.SectionsRepository.GetSections(); 
            
            return new OkObjectResult(sectionDtos);
        }
    }
}