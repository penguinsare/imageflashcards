using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ImageFlashCards.Models
{
    public class LessonImage
    {
        public int LessonImageId { get; set; }
        public string ImagePhysicalPath { get; set; }
        public string ImageUrlPath { get; set; }

        public string FileName{ get; set; }
        public string FileNameAndExtension { get; set; }
        public string ImageTitle { get; set; }

    }
}
