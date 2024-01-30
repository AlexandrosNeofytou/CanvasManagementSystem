
using Api.Data;
using Api.Entities;
using Api.Extensions;
using Api.Helpers.Pagination;
using Api.Models;
using Api.Models.Answers;
using Api.Models.Canvas;
using Api.Services.IServices;
using AutoMapper;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Api.Services
{
    public class CanvasService : ICanvasService
    {
        private readonly IMapper mapper;
        private readonly IUnitOfWork unitOfWork;
        private readonly IAnswerService answerService;
        private readonly ICloudinaryService cloudinaryService;

        public CanvasService(IUnitOfWork unitOfWork, IMapper mapper
        ,IAnswerService answerService,ICloudinaryService cloudinaryService)
        {
            this.cloudinaryService = cloudinaryService;
            this.answerService = answerService;
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }

        public async Task<ActionResult<List<AnswerDto>>> AddAnswersToCanvas(CreateAnswersDto createAnswersDto,int sectionId)
        {
            Canvas canvas=await unitOfWork.CanvasRepository
            .GetUserCanvasWithAnswers(createAnswersDto.CanvasId,createAnswersDto.UserId);

            List<Answer> canvasAnswers=new List<Answer>();


            if(canvas==null)
            {
                return new NotFoundObjectResult(new {canvas="canvas not found"});
            }

            List<Answer> answers=mapper.Map<List<Answer>>(createAnswersDto.Answers);
            
            List<Question> questions=await unitOfWork.QuestionsRepository.GetQuestions();

            List<int> questionIds=questions.Select(x=>x.Id).ToList();
            List<int> questionIdsToCheck=answers.Select(x=>x.QuestionId).ToList();

            if(!questionIds.HasElements(questionIdsToCheck))
            {
                return new BadRequestObjectResult(new {questions="invalid question id"});
            }
            else if(!answerService.AreAnswersValid(answers,questions))
            {
                return new BadRequestObjectResult(new {answers="invalid number of answers"});

            }

            answers=answerService.RemoveEmptyAnswers(answers);

            if(sectionId==-1)
            {
                canvasAnswers=canvas.Answers;
            }
            else
            {
                canvasAnswers=canvas.Answers.Where(x=>x.Question.SectionId==sectionId).ToList();
            }
            
            if(canvasAnswers.Count>0) 
            {
                List<Answer> answersToRemove
                    =canvasAnswers.Where(x=>!answers.Contains(x)).ToList();

                List<Answer> answersToAdd=new List<Answer>();

                foreach(Answer answer in answersToRemove) 
                {
                    canvas.Answers.Remove(answer);
                }

                foreach(Answer answer in answers) 
                {
                    Answer existingAnswer=canvasAnswers.FirstOrDefault(x=>x.Id==answer.Id);

                    if(existingAnswer!=null)
                    {
                        existingAnswer.AnswerText=answer.AnswerText;
                    }
                    else 
                    {
                        answersToAdd.Add(answer);
                    }
                }

                answers=answersToAdd;
                
            }

            if(answers.Count>0)
            {
                canvas.Answers.AddRange(answers);

            }

            if(!await unitOfWork.Complete())
            {
                return new BadRequestObjectResult("error creating answers");
            }

            List<AnswerDto> canvasAnswersDto=mapper.Map<List<AnswerDto>>(canvas.Answers.ToList());

            return new OkObjectResult(canvasAnswersDto);
          

        }   

        public async Task<ActionResult<CanvasDto>> CreateCanvas(CreateCanvasDto createCanvasDto)
        {
            AppUser appUser = await unitOfWork.UsersRepository.GetUserById(createCanvasDto.UserId);

            if (appUser == null)
            {
                return new NotFoundObjectResult(new { user = "User not found" });
            }


            Canvas canvas = mapper.Map<Canvas>(createCanvasDto);


            canvas.AppUser = appUser;

            unitOfWork.CanvasRepository.CreateCanvas(canvas);



            if (!await unitOfWork.Complete())
            {
                return new BadRequestObjectResult(new { canvas = "Canvas couldnt be created" });
            }

            CanvasDto canvasDto = mapper.Map<CanvasDto>(canvas);

            return new OkObjectResult(canvasDto);


        }

        public async Task<ActionResult<CanvasDto>> GetCanvasDtoWithImage(int userId, int canvasId)
        {
            Canvas canvas=await unitOfWork.CanvasRepository.GetCanvasWithImage(canvasId,userId);

            if(canvas!=null)
            {
                CanvasDto canvasDto=mapper.Map<CanvasDto>(canvas);

                return new OkObjectResult(canvasDto);
            }

            return new NotFoundObjectResult(new {canvas="canavs not found"});
          
        }

        public async Task<ActionResult<List<AnswerDto>>> GetOwnCanvasAnswers(int canvasId, int userId)
        {
            Canvas canvas=await unitOfWork.CanvasRepository.GetUserCanvasWithAnswers(canvasId,userId);


            if(canvas==null)
            {
                return new NotFoundObjectResult(new {canvas="canvas not found"});
            }
            
            List<Answer> answers=canvas.Answers;


            List<AnswerDto> answerDtos = mapper.Map<List<AnswerDto>>(answers);

            return new OkObjectResult(answerDtos);
        }

        public async Task<ActionResult<PageList<CanvasDto>>> GetPublishedCanvases(int userId, PageListParams pageListParams,HttpResponse httpResponse,CanvasSearchParams canvasSearchParams)
        {
            PageList<CanvasDto> canvasDtos=await unitOfWork.CanvasRepository.GetPublisedCanvases(userId,pageListParams,canvasSearchParams);

            PageListHeader pageListHeader=
                new PageListHeader(canvasDtos.PageNumber,
                canvasDtos.ItemsPerPage,
                canvasDtos.ItemCount,
                canvasDtos.NumberOfPages);

            httpResponse.AddPaginationHeader(pageListHeader);


            return new OkObjectResult(canvasDtos);

        }

        public async Task<ActionResult<PageList<CanvasDto>>> GetUserCanvases(int userId, PageListParams pageListParams, HttpResponse response,CanvasSearchParams canvasSearchParams)
        {

            PageList<CanvasDto> canvases = await unitOfWork.CanvasRepository.GetCanvasesOfUser(userId, pageListParams,canvasSearchParams);

            PageListHeader pageListHeader = new PageListHeader(canvases.PageNumber,
                canvases.ItemsPerPage, canvases.ItemCount, canvases.NumberOfPages);

            response.AddPaginationHeader(pageListHeader);

            return canvases;
        }

        public async Task<ActionResult<bool>> SetCanvasPublicityStatus(int canvasId, UpdateCanvasPublishStatusDto updateCanvasPublishStatusDto)
        {
            Canvas canvas=await unitOfWork.CanvasRepository.GetUserCanvasById(canvasId,updateCanvasPublishStatusDto.UserId);

            if(canvas==null)
            {
                return new NotFoundObjectResult(new {canvas="not found"});
            }

            if(canvas.IsPublished==updateCanvasPublishStatusDto.PublishedStatus)
            {
                return new OkObjectResult(canvas.IsPublished);

            }
            else 
            {
                canvas.IsPublished=updateCanvasPublishStatusDto.PublishedStatus;

            }


            if(await unitOfWork.Complete())
            {
                return new OkObjectResult(canvas.IsPublished);
            }
            else 
            {
                return new BadRequestObjectResult(new {canvas="publish status couldnt be changed"});

            }

        }

        public async Task<ActionResult<CanvasDto>> UpdateCanvas(UpdateCanvasDto updateCanvasDto,int userId)
        {
            Canvas canvas=await unitOfWork.CanvasRepository.GetUserCanvasById(updateCanvasDto.Id,userId);
            
            if(canvas==null)
            {
                return new NotFoundObjectResult(new {canvas="not found"});
            }

            canvas.Title=updateCanvasDto.Title;
            canvas.Description=updateCanvasDto.Description;
            canvas.DateModified=DateTime.UtcNow;

            if(await unitOfWork.Complete())
            {
                return new OkObjectResult(mapper.Map<CanvasDto>(canvas));
            }

            return new BadRequestObjectResult(new {canvas="canvas couldnt be updated"});
        }

        public async Task<ActionResult<CanvasDto>> UploadImageToCanvas(IFormFile image, int canvasId, int userId)
        {
            Canvas canvas=await unitOfWork.CanvasRepository.GetCanvasWithImage(canvasId,userId);

            if(canvas==null)
            {
                return new NotFoundObjectResult(new {canvas="canvas not found"});
            }

        

            UploadResult uploadResult=await cloudinaryService.UploadImage(image);

            if(uploadResult.Error!=null)
            {
                return new BadRequestObjectResult(new {image="image couldnt be uploaded"});
            }

            Image imageUploaded=new Image(){
                PublicUrl=uploadResult.Uri.AbsoluteUri,
                PrivateUrl=uploadResult.SecureUri.AbsoluteUri

            };

            if(canvas.Image!=null)
            {
                await cloudinaryService.DeleteImage(canvas.Image);

                canvas.Image.PublicUrl=imageUploaded.PublicUrl;
                canvas.Image.PrivateUrl=imageUploaded.PrivateUrl;


            }
            else 
            {
                canvas.Image=imageUploaded;

            }


            if(await unitOfWork.Complete())
            {
                CanvasDto canvasDto=mapper.Map<CanvasDto>(canvas);

                return new OkObjectResult(canvasDto);
            }

            return new BadRequestObjectResult(new {image="image couldnt be uploaded"});





        }
    }


}