using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ImageFlashCards.Models
{
    public class Flashcard
    {
        public int FlashcardId { get; set; }
        public string NativeWord { get; set; }
        public string ForeignWord{ get; set; }
        public float XCoordinate { get; set; }
        public float YCoordinate { get; set; }
    }
}
