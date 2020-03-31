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
using Microsoft.EntityFrameworkCore;

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
        public Lesson Lesson { get; set; }

        [BindProperty]
        public Flashcard Flashcard {get;set;}



        public void OnGet()
        {

        }

        public void OnGetLoadLesson(int lessonId)
        {
            if (lessonId > 0)
            {
                Lesson = _context.Lessons.Include(lesson => lesson.Image).Include(lesson => lesson.Flashcards).FirstOrDefault(lesson => lesson.LessonId == lessonId);
            }
        }


        [ValidateAntiForgeryToken]
        public async Task<IActionResult> OnPostUploadImage()
        {
            if (ModelState.IsValid)
            {
                try
                {
                    
                    var newImage = await _imageHandler.SaveImage(Upload);
                    _context.LessonImages.Add(newImage);
                    await _context.SaveChangesAsync();
                    Lesson = new Lesson() { Image = newImage };
                    _context.Lessons.Add(Lesson);
                    await _context.SaveChangesAsync();
                    return RedirectToPage("CreateLessons", "LoadLesson", new { LessonId = Lesson.LessonId });
                    
                }
                catch (Exception ex)
                {
                    //put log
                    return RedirectToPage("CreateLessons");
                }
            }
            else
            {
                return RedirectToPage("CreateLessons");
            }


        }

        public async Task OnGetAddFlashcardAsync(int lessonId)
        {
            if (lessonId > 0)
            {
                Lesson = await _context.Lessons
                    .Include(lesson => lesson.Image)
                    .Include(lesson => lesson.Flashcards)
                    .FirstOrDefaultAsync(lesson => lesson.LessonId == lessonId);
                if (Lesson != null && Lesson.Flashcards?.Count <= 5)
                {
                    Lesson.Flashcards.Add(new Flashcard());
                }
            }
            
            //return RedirectToPage("CreateLessons", "LoadLesson", new { LessonId = Lesson.LessonId });
        }

      


        [ValidateAntiForgeryToken]
        public async Task<IActionResult> OnPostSubmitFlashcardsAsync(int lessonId)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if (Flashcard != null )
                    {
                        //foreach (var fc in Flashcards)
                        //{
                            //if (fc.FlashcardId > 0)
                            //{
                            //    var currentFlashcard = _context.Flashcards.FirstOrDefault(f => f.FlashcardId == fc.FlashcardId);
                            //    currentFlashcard.ForeignWord = fc.ForeignWord;
                            //    currentFlashcard.NativeWord = fc.NativeWord;
                            //    currentFlashcard.XCoordinate = fc.XCoordinate;
                            //    currentFlashcard.YCoordinate = fc.YCoordinate;
                            //    _context.Entry<Flashcard>(currentFlashcard).State = EntityState.Modified;
                            //}
                            //else
                            //{
                                
                        var lesson = await _context.Lessons.Include(l => l.Flashcards).FirstOrDefaultAsync(l => l.LessonId == lessonId);

                        if (lesson != null)
                        {
                            if (Flashcard.FlashcardId > 0)
                            {
                                var flashcardForEdit = lesson.Flashcards.FirstOrDefault(fc => fc.FlashcardId == Flashcard.FlashcardId);
                                flashcardForEdit.ForeignWord = Flashcard.ForeignWord;
                                flashcardForEdit.NativeWord = Flashcard.NativeWord;
                                flashcardForEdit.XCoordinate = Flashcard.XCoordinate;
                                flashcardForEdit.YCoordinate = Flashcard.YCoordinate;
                               
                            }
                            else if (Flashcard.FlashcardId == 0)
                            {                                
                                lesson.Flashcards.Add(Flashcard);
                            }                                                            
                        }
                    }
                                
                            //}
                            
                        //}
                    await _context.SaveChangesAsync();
                    
                   

                    return RedirectToPage("CreateLessons", "LoadLesson", new { LessonId = Lesson.LessonId });
                    //return Page();
                }
                catch (Exception ex)
                {
                    //put log
                    return RedirectToPage("CreateLessons", "LoadLesson", new { LessonId = Lesson.LessonId });
                }
            }
            else
            {
                return RedirectToPage("CreateLessons", "LoadLesson", new { LessonId = Lesson.LessonId });
            }


        }
    }
}