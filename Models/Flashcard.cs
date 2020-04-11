using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ImageFlashCards.Models
{
    public class Flashcard
    {
        public int FlashcardId { get; set; }
        //public string NativeWord { get; set; }
        public string LanguagePairId { get; set; }
        public virtual LanguagePair LanguagePair { get; set; }
        public virtual WordPair WordPair { get; set; }
        public double XCoordinate { get; set; }
        public double YCoordinate { get; set; }

        public string GetNativeWord()
        {
            switch (LanguagePairId)
            {
                case DefinedLanguagePairs.ENES:
                    return WordPair.EnglishWord.Text;
                case DefinedLanguagePairs.ESEN:
                    return WordPair.SpanishWord.Text;
                case DefinedLanguagePairs.ENTH:
                    return WordPair.EnglishWord.Text;
                default:
                    return "";
            }
        }
        public IList<string> GetNativeWordAlternatives()
        {
            switch (LanguagePairId)
            {
                case DefinedLanguagePairs.ENES:
                    return WordPair.EnglishWord.TextAlternatives.Select(ta => ta.Text).ToList();
                case DefinedLanguagePairs.ESEN:
                    return WordPair.SpanishWord.TextAlternatives.Select(ta => ta.Text).ToList();
                case DefinedLanguagePairs.ENTH:
                    return WordPair.EnglishWord.TextAlternatives.Select(ta => ta.Text).ToList();
                default:
                    return null;
            }
        }

        public string GetForeignWord()
        {
            switch (LanguagePairId)
            {
                case DefinedLanguagePairs.ENES:
                    return WordPair.SpanishWord.Text;
                case DefinedLanguagePairs.ESEN:
                    return WordPair.EnglishWord.Text;
                case DefinedLanguagePairs.ENTH:
                    return WordPair.ThaiWord.Text;
                default:
                    return "";
            }
        }
        public IList<string> GetForeignWordAlternatives()
        {
            switch (LanguagePairId)
            {
                case DefinedLanguagePairs.ENES:
                    return WordPair.SpanishWord.TextAlternatives.Select(ta => ta.Text).ToList();
                case DefinedLanguagePairs.ESEN:
                    return WordPair.EnglishWord.TextAlternatives.Select(ta => ta.Text).ToList();
                case DefinedLanguagePairs.ENTH:
                    return WordPair.ThaiWord.TextAlternatives.Select(ta => ta.Text).ToList();
                default:
                    return null;
            }
        }

        public void SetLanguagePair(string language)
        {
            switch (language)
            {
                case DefinedLanguagePairs.ENES:
                    LanguagePairId = DefinedLanguagePairs.ENES;
                    break;
                case DefinedLanguagePairs.ESEN:
                    LanguagePairId = DefinedLanguagePairs.ESEN;
                    break;
                case DefinedLanguagePairs.ENTH:
                    LanguagePairId = DefinedLanguagePairs.ENTH;
                    break;
                default:
                    LanguagePairId = null;
                    break;
             }
        }
    }
}
