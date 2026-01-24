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

            builder.Property(p => p.Id).HasColumnName("ID_Person");
            builder.Property(p => p.Name).HasColumnName("Name").IsRequired();
            builder.Property(p => p.CareerId).HasColumnName("ID_Career");
            builder.Property(p => p.DateOfBirth).HasColumnName("DateOfBirth");
            builder.Property(p => p.LinkToPhoto).HasColumnName("LinkToPhoto");

            builder.HasOne(p => p.Career)
                   .WithMany()
                   .HasForeignKey(p => p.CareerId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
