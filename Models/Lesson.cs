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
        public virtual IList<Flashcard> Flashcards { get; set; } = new List<Flashcard>();
        public int LessonImageId { get; set; }
        public virtual LessonImage Image { get; set; }
    }
}
