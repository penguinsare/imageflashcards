using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ImageFlashCards.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace ImageFlashCards.Pages
{
    public class IndexModel : PageModel
    {
        public List<Flashcard> FlashcardList{ get; set; }
        public void OnGet()
        {
            
            FlashcardList = new List<Flashcard>()
            {
                new Flashcard() {
                NativeWord = "kochen",
                ForeignWord = "to cook",
                XCoordinate = 408,
                YCoordinate = 300
                },
                new Flashcard() {
                NativeWord = "schlafen",
                ForeignWord = "to sleep",
                XCoordinate = 50,
                YCoordinate = 300
                },
                new Flashcard() {
                NativeWord = "lernen",
                ForeignWord = "to study",
                XCoordinate = 75,
                YCoordinate = 120
                },
                new Flashcard() {
                NativeWord = "Tisch",
                ForeignWord = "table",
                XCoordinate = 250,
                YCoordinate = 250
                }
            };
            //Flashcard = new Flashcard() {
            //    NativeWord = "kochen1",
            //    ForeignWord = "to cook1",
            //    XCoordinate = 408,
            //    YCoordinate = 300
            //};
        }
    }
}
