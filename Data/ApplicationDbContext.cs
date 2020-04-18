using System;
using System.Collections.Generic;
using System.Text;
using ImageFlashCards.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ImageFlashCards.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        public DbSet<Feedback> Feedbacks { get; set; }

        public DbSet<Lesson> Lessons { get; set; }
        public DbSet<Flashcard> Flashcards { get; set; }
        public DbSet<LessonImage> LessonImages { get; set; }
        //public DbSet<Word> Words { get; set; }
        public DbSet<EnglishWord> EnglishWords { get; set; }
        public DbSet<EnglishWordAlternative> EnglishWordAlternatives { get; set; }

        public DbSet<SpanishWord> SpanishWords { get; set; }
        public DbSet<SpanishWordAlternative> SpanishWordAlternatives { get; set; }
        public DbSet<ThaiWord> ThaiWords { get; set; }
        public DbSet<ThaiWordAlternative> ThaiWordAlternatives { get; set; }

        public DbSet<WordPair> WordPairs{ get; set; }
        public DbSet<LanguagePair> LanguagePairs { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationUser>(b =>
            {
                // Each User can have many UserClaims
                b.HasMany(e => e.Claims)    
                    .WithOne()
                    .HasForeignKey(uc => uc.UserId)
                    .IsRequired()
                    .OnDelete(DeleteBehavior.SetNull);
            });

            modelBuilder.Entity<Lesson>(b =>
            {
                b.HasOne(lesson => lesson.Image)
                .WithMany()
                .HasForeignKey(image => image.LessonImageId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<LessonImage>(b =>
            {

            });

            //modelBuilder.Entity<LanguagePair>()
            //    .HasData(
            //        new LanguagePair() { LanguagePairId = DefinedLanguagePairs.ENES },
            //        new LanguagePair() { LanguagePairId = DefinedLanguagePairs.ESEN },
            //        new LanguagePair() { LanguagePairId = DefinedLanguagePairs.ENTH }
            //    );

            modelBuilder.Entity<EnglishWord>(b =>
            {
                b.ToTable("words-english")
                .HasMany(we => we.TextAlternatives)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<EnglishWordAlternative>(b =>
            {
                b.ToTable("words-english-alternative");
            });

            modelBuilder.Entity<SpanishWord>(b =>
            {
                b.ToTable("words-spanish")
                .HasMany(ws => ws.TextAlternatives)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<SpanishWordAlternative>(b =>
            {
                b.ToTable("words-spanish-alternative");
            });

            modelBuilder.Entity<ThaiWord>(b =>
            {
                b.ToTable("words-thai")
                .HasMany(w => w.TextAlternatives)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<ThaiWordAlternative>(b =>
            {
                b.ToTable("words-thai-alternative");
            });

            modelBuilder.Entity<WordPair>(b => {
                //b.HasOne(wp => wp.LanguagePair)
                //.WithMany()
                //.IsRequired()
                //.HasForeignKey(wp => wp.LanguagePairId)
                //.OnDelete(DeleteBehavior.SetNull);

                b.HasOne(wp => wp.EnglishWord)
                .WithOne()
                //.IsRequired()
                .HasForeignKey<WordPair>(wp => wp.EnglishWordId)
                .OnDelete(DeleteBehavior.SetNull);

                b.HasOne(wp => wp.SpanishWord)
                .WithOne()
                //.IsRequired()
                .HasForeignKey<WordPair>(wp => wp.SpanishWordId)
                .OnDelete(DeleteBehavior.SetNull);

                b.HasOne(wp => wp.ThaiWord)
                .WithOne()
                //.IsRequired()
                .HasForeignKey<WordPair>(wp => wp.ThaiWordId)
                .OnDelete(DeleteBehavior.SetNull);
            });

            //modelBuilder.Entity<>
        }
    }
}
