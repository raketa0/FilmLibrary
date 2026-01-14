using Domain.Entities;  
using Domain.Entities.Film;
using Domain.Entities.Genre;
using Domain.Entities.User;
using Infrastructure.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class FilmLibraryDbContext : DbContext 
    {
        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Film> Films { get; set; } = null!;
        public DbSet<Genre> Genres { get; set; } = null!;
        public DbSet<FilmGenre> FilmGenres { get; set; } = null!;

        public FilmLibraryDbContext(DbContextOptions<FilmLibraryDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new FilmConfiguration());
            modelBuilder.ApplyConfiguration(new GenreConfiguration());
            modelBuilder.ApplyConfiguration(new FilmGenreConfiguration());

            base.OnModelCreating(modelBuilder);
        }
    }
}