using Api.Entities;
using Api.Models;
using Api.Models.Answers;
using Api.Models.Canvas;
using Api.Models.Comments;
using Api.Models.Sections;
using AutoMapper;

namespace Api.Helpers
{
    public class Profiles:Profile
    {
        public Profiles()
        {
            CreateMap<CreateCanvasDto,Canvas>();

            CreateMap<Canvas,CanvasDto>()
                .ForMember(x=>x.AuthorUsername,
                opt=>opt.MapFrom(x=>x.AppUser.UserName))
                .ForMember(x=>x.ImageUrl,
                opt=>opt.MapFrom(x=>x.Image.PublicUrl!=null ? x.Image.PublicUrl : ""));
            
            CreateMap<CreateAnswerDto,Answer>();

            CreateMap<Answer,AnswerDto>()
            .ForMember(x=>x.SectionId,opt=>opt.MapFrom(x=>x.Question.SectionId));

            CreateMap<Section,SectionDto>();

            CreateMap<CreateCommentDto,Comment>();

            CreateMap<Comment,CommentDto>()
                .ForMember(x=>x.AuthorName,opt=>opt.MapFrom(x=>x.AppUser.UserName));

        }
    }
}