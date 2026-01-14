
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain.Entities.Film;

namespace Infrastructure.Configurations
{
    public class FilmConfiguration : IEntityTypeConfiguration<Film>
    {
        public void Configure(EntityTypeBuilder<Film> builder)
        {
            builder.ToTable("Film");

            builder.HasKey(f => f.Id);
            builder.Property(f => f.Id)
                   .HasColumnName("ID_Film")
                   .ValueGeneratedOnAdd();

            builder.Property(f => f.CreatorId)
                   .IsRequired();

            builder.Property(f => f.Name)
                   .HasMaxLength(200)
                   .IsRequired();

            builder.Property(f => f.Description)
                   .HasColumnType("text");

            builder.Property(f => f.Country)
                   .HasMaxLength(100);

            builder.OwnsOne(f => f.Rating, r =>
            {
                r.Property(p => p.Value)
                 .HasColumnName("Rating")
                 .IsRequired();
            });

            builder.OwnsOne(f => f.AgeRestriction, a =>
            {
                a.Property(p => p.Value)
                 .HasColumnName("AgeRestriction")
                 .IsRequired();
            });
        }
    }
}
