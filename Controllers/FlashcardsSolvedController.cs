using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ImageFlashCards.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Policy = "AdminPolicy")]
    [ApiController]
    public class FlashcardsSolvedController : ControllerBase
    {
        [HttpGet]
        public async Task<string> OnGet ()
        {
            return "asd";
        }

        [HttpPost("{id}/{status}")]
        public async Task<IActionResult> OnPost(int id, string status)
        {

            return Ok();
        }
    }
}