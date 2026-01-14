using Domain.Entities.Genre;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Configurations
{
    public class GenreConfiguration : IEntityTypeConfiguration<Genre>
    {
        public void Configure(EntityTypeBuilder<Genre> builder)
        {
            builder.ToTable("Genre");

            builder.HasKey(g => g.Id);

            builder.Property(g => g.Id)
                   .HasColumnName("ID_Genre")
                   .ValueGeneratedOnAdd();

            builder.Property(g => g.Name)
                   .HasMaxLength(100)
                   .IsRequired();
        }
    }
}
