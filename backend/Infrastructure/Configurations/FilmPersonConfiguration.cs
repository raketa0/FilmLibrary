
using Domain.Entities.Film;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    public class FilmPersonConfiguration : IEntityTypeConfiguration<FilmPerson>
    {
        public void Configure(EntityTypeBuilder<FilmPerson> builder)
        {
            builder.ToTable("Film_Person");

            builder.HasKey(fp => new 
            { 
                fp.FilmId, 
                fp.PersonId,
                fp.Career 
            });

            builder.Property(fp => fp.FilmId)
                .HasColumnName("ID_Film");

            builder.Property(fp => fp.PersonId)
                .HasColumnName("ID_Person");

            builder.Property(fp => fp.Career)
                .HasConversion<int>();

        }
    }
}
