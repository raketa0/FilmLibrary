using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
