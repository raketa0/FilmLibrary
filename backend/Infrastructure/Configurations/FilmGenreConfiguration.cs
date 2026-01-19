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

            builder.Property(fg => fg.FilmId)
                   .HasColumnName("ID_Film");

            builder.Property(fg => fg.GenreId)
                   .HasColumnName("ID_Genre");
        }
    }
}
