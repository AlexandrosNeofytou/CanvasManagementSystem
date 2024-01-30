using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Api.Entities;
using Api.Services.IServices;
using Microsoft.AspNetCore.Mvc;

namespace Api.Services
{
    public class QuestionsService : IQuestionsService
    {
        private readonly IUnitOfWork unitOfWork;

        public QuestionsService(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task<ActionResult<List<Question>>> GetQuestionsBySectionId(int sectionId)
        {
            List<Question> questions=await unitOfWork.QuestionsRepository
                .GetQuestionsWithSectionsBySectionId(sectionId);

            return questions;
        }

        public async Task<ActionResult<List<Question>>> GetQuestionsWithSections()
        {
            List<Question> questions=await unitOfWork.QuestionsRepository.GetQuestionsWithSections();

            return new OkObjectResult(questions);
        }
    }
}