using ImageFlashCards.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ImageFlashCards.Services
{   
    public interface ISavedImageHandler
    {
        //Task<SavedImage> RetrieveSavedImage(string pathToImage);
        Task<LessonImage> SaveImage(IFormFile image);
        //void DeleteDocument(string pathToImage);
       
}
}
