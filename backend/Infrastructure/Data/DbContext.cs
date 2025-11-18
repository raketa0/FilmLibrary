using Domain.Entities.User;
using Domain.Entities;  
using Infrastructure.Configurations;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class FilmLibraryDbContext : DbContext 
    {
        public DbSet<User> Users { get; set; } = null!;

        public FilmLibraryDbContext(DbContextOptions<FilmLibraryDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            base.OnModelCreating(modelBuilder);
        }
    }
}