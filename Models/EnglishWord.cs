using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ImageFlashCards.Models
{
    public class EnglishWord
    {
        public int EnglishWordId { get; set; }
        public string Text { get; set; }
        public virtual IList<EnglishWordAlternative> TextAlternatives { get; set; }
    }
}
