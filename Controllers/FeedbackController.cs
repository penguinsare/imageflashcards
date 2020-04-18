using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ImageFlashCards.Data;
using ImageFlashCards.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ImageFlashCards.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        public FeedbackController(ApplicationDbContext context)
        {
            _context = context;
        }

        private ApplicationDbContext _context;

        public async Task OnPostAsync([FromBody] IList<Feedback> feedbackList)
        {
            if (feedbackList == null || feedbackList.Count != 1)
                return;
            try
            {
                feedbackList[0].CreatedDate = DateTime.Now;
                _context.Feedbacks.Add(feedbackList[0]);
                await _context.SaveChangesAsync();

            }catch(Exception ex)
            {
                //log the exception
            }
        }
    }
}