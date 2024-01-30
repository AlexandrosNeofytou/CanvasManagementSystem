using Api.Entities;
using Api.Models.Sections;

namespace Api.Repositories.IRepositories
{
    public interface ISectionsRepository
    {
        public void AddSections(List<Section> sections);
        
        public Task<List<SectionDto>> GetSections();
    }
}