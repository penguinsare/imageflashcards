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
        public int XCoordinate { get; set; }
        public int YCoordinate { get; set; }
    }
}
