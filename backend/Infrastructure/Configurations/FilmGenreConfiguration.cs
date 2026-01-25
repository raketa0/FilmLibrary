using Domain.Entities.Film;
using Domain.Entities.Genre;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    public class FilmGenreConfiguration : IEntityTypeConfiguration<FilmGenre>
    {
        public void Configure(EntityTypeBuilder<FilmGenre> builder)
        {
            builder.ToTable("Film_genre");

            builder.HasKey(fg => new { fg.FilmId, fg.GenreId });
            builder.Property(fg => fg.FilmId).HasColumnName("ID_Film");
            builder.Property(fg => fg.GenreId).HasColumnName("ID_Genre");

            builder.HasOne<Film>().
                WithMany().HasForeignKey(fg => fg.FilmId).
                OnDelete(DeleteBehavior.Cascade);

            builder.HasOne<Genre>().WithMany().
                HasForeignKey(fg => fg.GenreId).
                OnDelete(DeleteBehavior.Cascade);
        }
    }
}