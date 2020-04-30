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
using Serilog;

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
        public string AuthorUrl { get; set; }

        [BindProperty]
        public Lesson Lesson { get; set; }

        [BindProperty]
        public string NativeWord {get;set;}
        [BindProperty]
        public string ForeignWord { get; set; }
        [BindProperty]
        public double XCoordinate { get; set; }
        [BindProperty]
        public double YCoordinate { get; set; }
        [BindProperty]
        public int FlashcardId { get; set; }

        public void OnGet()
        {

        }

        public void OnGetLoadLesson(int lessonId)
        {
            if (lessonId > 0)
            {
                //Lesson = _context.Lessons.Include(lesson => lesson.Image).Include(lesson => lesson.Flashcards).FirstOrDefault(lesson => lesson.LessonId == lessonId);
                Lesson = _context.Lessons.FirstOrDefault(lesson => lesson.LessonId == lessonId);

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
                    newImage.AuthorUrl = AuthorUrl;
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
                //Lesson = await _context.Lessons
                //    .Include(lesson => lesson.Image)
                //    .Include(lesson => lesson.Flashcards)
                //    .FirstOrDefaultAsync(lesson => lesson.LessonId == lessonId);
                Lesson = await _context.Lessons
                    .Include(l => l.Flashcards)
                    .ThenInclude(fc => fc.WordPair)
                    
                    .FirstOrDefaultAsync(lesson => lesson.LessonId == lessonId);
                if (Lesson != null && Lesson.Flashcards?.Count <= 5)
                {
                    string language = "";
                    var newFlashcard = new Flashcard();
                    if (Request.Cookies.TryGetValue("lang", out language))
                    {
                        newFlashcard.SetLanguagePair(language);
                    }
                    
                    Lesson.Flashcards.Add(newFlashcard);
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
                    if (IsNewFlashcardAvailable() && lessonId > 0)
                    {
                        var lesson = await _context.Lessons.FirstOrDefaultAsync(l => l.LessonId == lessonId);
                        if (lesson == null)
                            return RedirectToPage("CreateLessons", "LoadLesson", new { LessonId = Lesson.LessonId });

                        var wordPair = await _context.WordPairs.FirstOrDefaultAsync(wp => wp.EnglishWord.Text == NativeWord);
                        if (wordPair == null)
                            return RedirectToPage("CreateLessons", "LoadLesson", new { LessonId = Lesson.LessonId });

                        if (FlashcardId <= 0 && lesson.Flashcards.Count >= 5)
                            return RedirectToPage("CreateLessons", "LoadLesson", new { LessonId = Lesson.LessonId });

                        if (FlashcardId > 0)
                        {
                            var flashcard = lesson.Flashcards.FirstOrDefault(fc => fc.FlashcardId == FlashcardId);
                            flashcard.WordPair = wordPair;
                            //flashcardForEdit.WordPair.NativeWordId = NativeWord;
                            flashcard.XCoordinate = XCoordinate;
                            flashcard.YCoordinate = YCoordinate;
                            _context.Entry(flashcard).State = EntityState.Modified;
                        }
                        else if (FlashcardId <= 0 && lesson.Flashcards.Count < 5)
                        {
                            var flashcard = new Flashcard()
                            {
                                WordPair = wordPair,
                                XCoordinate = XCoordinate,
                                YCoordinate = YCoordinate
                            };
                            _context.Flashcards.Add(flashcard);                        
                            lesson.Flashcards.Add(flashcard);
                        }
                        await _context.SaveChangesAsync();
                    }
                    return RedirectToPage("CreateLessons", "LoadLesson", new { LessonId = Lesson.LessonId });
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

        [ValidateAntiForgeryToken]
        public async Task<IActionResult> OnGetDeleteFlashcardAsync(int flashcardId, int lessonId)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    if (flashcardId > 0 && lessonId > 0)
                    {
                        Lesson = await _context.Lessons.FirstOrDefaultAsync(l => l.LessonId == lessonId);
                        if (Lesson == null)
                            return RedirectToPage("CreateLessons");
                        var flashcard = await _context.Flashcards.FirstOrDefaultAsync(fc => fc.FlashcardId == flashcardId);
                        if (flashcard != null)
                        {
                            _context.Flashcards.Remove(flashcard);
                            await _context.SaveChangesAsync();
                        }
                    }                   
                    return RedirectToPage("CreateLessons", "LoadLesson", new { LessonId = Lesson.LessonId });

                }
                catch (Exception ex)
                {
                    Log.Fatal(ex, "Exception");
                    return RedirectToPage("CreateLessons");
                }
            }
            else
            {
                return RedirectToPage("CreateLessons");
            }


        }

        public bool IsNewFlashcardAvailable()
        {
            if (!String.IsNullOrEmpty(NativeWord) &&
                XCoordinate >= 0 &&
                YCoordinate >= 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}