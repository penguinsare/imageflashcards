using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ImageFlashCards.Models
{
    public class Lesson
    {
        public int LessonId { get; set; }
        public string Title { get; set; }
        public IList<Flashcard> Flashcards { get; set; } = new List<Flashcard>();

        public int LessonImageId { get; set; }
        public LessonImage Image { get; set; }
    }
}
