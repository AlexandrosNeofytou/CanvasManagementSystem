using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Entities;
using Api.Helpers.Cloudinary;
using Api.Services.IServices;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Mvc;

namespace Api.Services
{
    public class CloudinaryService:ICloudinaryService
    {
        private Cloudinary cloudinary;
        public CloudinaryService(IConfiguration configuration)
        {
            CloudinaryUser cloudinaryUser=configuration.GetSection("Cloudinary").Get<CloudinaryUser>();

            Account account =new Account(
                cloudinaryUser.CloundName,
                cloudinaryUser.Key,
                cloudinaryUser.SecretKey
            );
            
            cloudinary=new Cloudinary(account);
        }

        public async Task<DelResResult> DeleteImage(Image image)
        {
            return await cloudinary.DeleteResourcesAsync(image.PublicUrl);
        }

        public async Task<UploadResult> UploadImage(IFormFile file)
        {
          

            using(var stream=file.OpenReadStream())
            {
                var uploadParams=new ImageUploadParams()
                {
                    File=new FileDescription(file.FileName,stream),
                    Transformation = new Transformation().Width(500).Height(500).Crop("fill"),

                };

                var uploadResult=await cloudinary.UploadAsync(uploadParams);

                return uploadResult;
                
            }
          

        }
    }
}