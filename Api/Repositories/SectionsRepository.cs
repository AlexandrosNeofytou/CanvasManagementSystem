using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Api.Entities;
using Api.Models.Sections;
using Api.Repositories.IRepositories;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace Api.Repositories
{
    public class SectionsRepository : ISectionsRepository
    {
        private readonly DataContext dataContext;
        private readonly IMapper mapper;

        public SectionsRepository(DataContext dataContext,IMapper mapper)
        {
            this.dataContext = dataContext;
            this.mapper = mapper;
        }

        public void AddSections(List<Section> sections)
        {
            dataContext.AddRange(sections);
        }

        public async Task<List<SectionDto>> GetSections()
        {
            List<SectionDto> sections = await 
                dataContext.Sections.ProjectTo<SectionDto>(mapper.ConfigurationProvider)
                .OrderBy(x=>x.DisplayOrder).ToListAsync();


            return sections;
        }
    }
}