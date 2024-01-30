using System.Text.Json;
using Api.Helpers.Pagination;

namespace Api.Extensions
{
    public static class HttpResponseExtensions
    {
        public static void AddPaginationHeader(this HttpResponse httpResponse,PageListHeader pageListHeader)
        {
            JsonSerializerOptions jsonOptions = new JsonSerializerOptions()
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            httpResponse.Headers.Add("Pagination", JsonSerializer.Serialize(pageListHeader, jsonOptions));
            httpResponse.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}