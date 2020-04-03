using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ImageFlashCards.Data;
using ImageFlashCards.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace ImageFlashCards.Pages
{
    public class IndexModel : PageModel
    {
        public IndexModel(ApplicationDbContext context)
        {
            _context = context;
        }
        private readonly ApplicationDbContext _context;
        //public List<Flashcard> FlashcardList{ get; set; }
        [BindProperty]
        public Lesson Lesson { get; set; }
        [BindProperty]
        public int PreviousLessonId { get; set; }
        [BindProperty]
        public int NextLessonId { get; set; }

        public async Task OnGetAsync(int lessonId)
        {
            if (lessonId > 0)
            {
                var currAndNext = await _context.Lessons
                    .Where(t => t.LessonId >= lessonId)
                     .OrderBy(t => t.LessonId)
                     .Skip(0)
                     .Take(2)
                     .ToListAsync();
                var prev = await _context.Lessons
                                 .Where(t => t.LessonId <= lessonId)
                                 .OrderByDescending(t => t.LessonId)
                                 .Skip(1)
                                 .Take(1)
                                 .ToListAsync();
                if (currAndNext != null && currAndNext.Count > 0)
                {
                    Lesson = currAndNext[0];
                    if (currAndNext.Count > 1)
                    {
                        NextLessonId = currAndNext[1].LessonId;
                    }
                }
                if (prev != null && prev.Count > 0)
                {
                    PreviousLessonId = prev[0].LessonId;
                }
                //Lesson = currAndNext[0];
                //PreviousLessonId = prev[0]
               // Lesson = await _context.Lessons
               //.Include(lesson => lesson.Image)
               //.Include(lesson => lesson.Flashcards)
               //.FirstOrDefaultAsync(l => l.LessonId == lessonId);
            }
            else
            {
                var currAndNext = await _context.Lessons
                    .Where(t => t.LessonId >= 1)
                     .OrderBy(t => t.LessonId)
                     .Skip(0)
                     .Take(2)
                     .ToListAsync();
                if (currAndNext != null && currAndNext.Count > 0)
                {
                    Lesson = currAndNext[0];
                    if (currAndNext.Count > 1)
                    {
                        NextLessonId = currAndNext[1].LessonId;
                    }
                }
                
                
                //Lesson = await _context.Lessons
                //.Include(lesson => lesson.Image)
                //.Include(lesson => lesson.Flashcards)
                //.FirstOrDefaultAsync(l => l.LessonId == 1);
            }
            
                //FlashcardList = new List<Flashcard>()
                //{
                //    new Flashcard() {
                //    NativeWord = "kochen",
                //    ForeignWord = "to cook",
                //    XCoordinate = 408,
                //    YCoordinate = 300
                //    },
                //    new Flashcard() {
                //    NativeWord = "schlafen",
                //    ForeignWord = "to sleep",
                //    XCoordinate = 50,
                //    YCoordinate = 300
                //    },
                //    new Flashcard() {
                //    NativeWord = "lernen",
                //    ForeignWord = "to study",
                //    XCoordinate = 75,
                //    YCoordinate = 120
                //    },
                //    new Flashcard() {
                //    NativeWord = "Tisch",
                //    ForeignWord = "table",
                //    XCoordinate = 250,
                //    YCoordinate = 250
                //    }
                //};
            //Flashcard = new Flashcard() {
            //    NativeWord = "kochen1",
            //    ForeignWord = "to cook1",
            //    XCoordinate = 408,
            //    YCoordinate = 300
            //};
        }
    }
}
