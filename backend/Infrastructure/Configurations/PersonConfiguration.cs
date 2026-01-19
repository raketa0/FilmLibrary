
using Domain.Entities.Person;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    public class PersonConfiguration : IEntityTypeConfiguration<Person>
    {
        public void Configure(EntityTypeBuilder<Person> builder)
        {
            builder.ToTable("Person");

            builder.HasKey(p => p.Id);

            builder.Property(p => p.Id)
                   .HasColumnName("ID_Person")
                   .ValueGeneratedOnAdd();

            builder.Property(p => p.Name)
                   .HasMaxLength(200)
                   .IsRequired();

            builder.Property(p => p.Career)
                   .HasConversion<int>()
                   .IsRequired();

            builder.Property(p => p.DateOfBirth)
                   .IsRequired();

            builder.Property(p => p.LinkToPhoto)
                   .HasMaxLength(500);
        }
    }
}
