using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ImageFlashCards.Data;
using ImageFlashCards.Models;
using ImageFlashCards.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ImageFlashCards.Pages
{
    [Authorize(Policy = "AdminPolicy")]
    public class CreateLessonsModel : PageModel
    {
        public CreateLessonsModel(
            ISavedImageHandler imageHandler,
            ApplicationDbContext context)
        {
            _imageHandler = imageHandler;
            _context = context;
        }

        private readonly ISavedImageHandler _imageHandler;
        private readonly ApplicationDbContext _context;



        [BindProperty]
        public IFormFile Upload { get; set; }
        [BindProperty]
        public string ImageUrl {get;set;}
        [BindProperty]
        public Lesson Lesson { get; set; }




        public void OnGet()
        {

        }

        public async Task<PageResult> OnPostUploadImage()
        {
            var newImage = await _imageHandler.SaveImage(Upload);
            _context.LessonImages.Add(newImage);
            await _context.SaveChangesAsync();
            ImageUrl = newImage.ImageUrlPath;
            return Page();
        }
    }
}