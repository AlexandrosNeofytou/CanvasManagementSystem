using Api.Entities;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;

namespace Api.Services.IServices
{
    public interface ICloudinaryService
    {
        public Task<UploadResult> UploadImage(IFormFile file);

        public Task<DelResResult> DeleteImage(Image image);

    }
}