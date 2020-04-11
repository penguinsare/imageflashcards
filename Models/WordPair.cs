using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ImageFlashCards.Models
{
    public class WordPair
    {
        public int WordPairId { get; set; }
        //public string LanguagePairId { get; set; }
        //public virtual LanguagePair LanguagePair{ get; set; }

        //public string NativeWordId { get; set; }

        //public string ForeignWordId { get; set; }

        //public virtual Word NativeWord { get; set; }
        //public virtual Word ForeignWord { get; set; }
        public int? EnglishWordId { get; set; }
        public int? SpanishWordId { get; set; }
        public int? ThaiWordId { get; set; }
        public virtual EnglishWord EnglishWord { get; set; }
        public virtual SpanishWord SpanishWord { get; set; }
        public virtual ThaiWord ThaiWord { get; set; }
    }   
}
