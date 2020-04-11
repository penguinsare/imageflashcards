using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ImageFlashCards.Models
{
    public class SpanishWord
    {
        public int SpanishWordId { get; set; }
        public string Text { get; set; }
        public virtual List<SpanishWordAlternative> TextAlternatives { get; set; }
    }
}
