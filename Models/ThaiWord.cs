using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ImageFlashCards.Models
{
    public class ThaiWord
    {
        public int ThaiWordId { get; set; }
        public string Text { get; set; }
        public virtual IList<ThaiWordAlternative> TextAlternatives { get; set; }
    }
}
