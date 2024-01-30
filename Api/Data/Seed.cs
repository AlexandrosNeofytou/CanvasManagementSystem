using System.Net.Http.Json;
using System.Text.Json;
using System.Text.Json.Serialization;
using Api.Entities;
using Api.Enums;
using Api.Models.Questions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Api.Data
{

    public static class Seed
    {

        static string dataSeedFolder = Path.Combine(
            new string[] { "Data", "DataToSeed" }
            );


        public static async Task SeedData(RoleManager<AppRole> roleManager, DataContext dataContext)
        {



            await SeedRoles(roleManager, dataContext);

            await SeedSections(dataContext);

            await SeedQuestions(dataContext);

        }

        static async Task SeedRoles(RoleManager<AppRole> roleManager, DataContext dataContext)
        {


            int rolesCount = dataContext.Roles.Count();

            if (rolesCount == 0)
            {
                foreach (string role in Enum.GetNames(typeof(Roles)))
                {
                    AppRole appRole = new AppRole() { Name = role };

                    await roleManager.CreateAsync(appRole);
                }
            }
        }

        static async Task SeedSections(DataContext dataContext)
        {


            int sectionsCount = dataContext.Sections.Count();

            if (sectionsCount == 0)
            {
                string seedFile = Path.Combine(dataSeedFolder, "sections.json");

                string data = await File.ReadAllTextAsync(seedFile);

                List<Section> sections = JsonSerializer.Deserialize<List<Section>>(data);

                if (sections != null)
                {
                    for (int i = 0; i < sections.Count; i++)
                    {

                        sections[i].DisplayOrder = i;

                    }

                    await dataContext.Sections.AddRangeAsync(sections);

                    await dataContext.SaveChangesAsync();
                }




            }
        }

        static async Task SeedQuestions(DataContext dataContext)
        {
            int questionsCount = dataContext.Questions.Count();



            if (questionsCount == 0)
            {

                int sectionId = 0;

                string sectionName = "";

                string filePath=Path.Combine(dataSeedFolder, "questions.json");

                string questionsText = await File.ReadAllTextAsync(filePath);

                List<Section> sections = await dataContext.Sections.ToListAsync();

                List<QuestionJson> questionJsons = JsonSerializer.Deserialize<List<QuestionJson>>(questionsText);

                List<Question> questions = new List<Question>();

                for (int i = 0; i < questionJsons.Count; i++)
                {
                    if (sectionName != questionJsons[i].SectionName)
                    {
                        sectionId = sections.FirstOrDefault(x => x.Name == questionJsons[i].SectionName).Id;

                        sectionName = questionJsons[i].SectionName;
                    }

                    Question question = new Question()
                    {
                        QuestionName = questionJsons[i].QuestionName,
                        DisplayOrder = i,
                        SectionId = sectionId,
                        MaxNumberOfAnswers=questionJsons[i].MaxNumberOfAnswers


                    };

                    questions.Add(question);
                }

                await dataContext.Questions.AddRangeAsync(questions);

                await dataContext.SaveChangesAsync();
            }
        }



    }
}