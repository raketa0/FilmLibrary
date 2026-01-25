using Domain.Entities.Film;
using Domain.Entities.Person;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    public class FilmPersonConfiguration : IEntityTypeConfiguration<FilmPerson>
    {
        public void Configure(EntityTypeBuilder<FilmPerson> builder)
        {
            builder.ToTable("Film_Person");

            builder.HasKey(fp => new { fp.FilmId, fp.PersonId, fp.CareerId });
            builder.Property(fp => fp.FilmId).HasColumnName("ID_Film");
            builder.Property(fp => fp.PersonId).HasColumnName("ID_Person");
            builder.Property(fp => fp.CareerId).HasColumnName("ID_Career");

            builder.HasOne<Film>().WithMany().HasForeignKey(fp => fp.FilmId).OnDelete(DeleteBehavior.Cascade);
            builder.HasOne<Person>().WithMany().HasForeignKey(fp => fp.PersonId).OnDelete(DeleteBehavior.Cascade);
            builder.HasOne<Career>().WithMany().HasForeignKey(fp => fp.CareerId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}