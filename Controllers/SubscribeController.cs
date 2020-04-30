using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ImageFlashCards.Data;
using ImageFlashCards.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace ImageFlashCards.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscribeController : ControllerBase
    {
        public SubscribeController(ApplicationDbContext context)
        {
            _context = context;
        }

        private ApplicationDbContext _context;

        public async Task<IActionResult> OnPost([FromBody] BindEmailSubscriber bindSubscriber)
        {
            if (bindSubscriber == null)
            {
                Log.Information("Failed to serialize EmailSubscriber.");
                return BadRequest();
            }
            else
            {
                var subscriber = new EmailSubscriber() {
                    Email = bindSubscriber.Email,
                    SubscribedAtDate = DateTime.UtcNow
                };
                if (_context.EmailSubscribers.Any(sub => sub.Email == subscriber.Email))
                {
                    return BadRequest();
                }
                else
                {
                    _context.EmailSubscribers.Add(subscriber);
                    await _context.SaveChangesAsync();
                    return Ok();
                }
            }
        }
    }

    public class BindEmailSubscriber
    {
        public string Email { get; set; }
    }
}