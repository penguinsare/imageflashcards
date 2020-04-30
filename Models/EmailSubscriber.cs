using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ImageFlashCards.Models
{
    public class EmailSubscriber
    {
        public int EmailSubscriberId { get; set; }
        public string Email { get; set; }
        public DateTime SubscribedAtDate { get; set; }
    }
}
