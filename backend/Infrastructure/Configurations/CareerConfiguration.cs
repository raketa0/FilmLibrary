using Domain.Entities.Person;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    public class CareerConfiguration : IEntityTypeConfiguration<Career>
    {
        public void Configure(EntityTypeBuilder<Career> builder)
        {
            builder.ToTable("Career");

            builder.HasKey(c => c.Id);
            builder.Property(c => c.Id).HasColumnName("ID_Career");
            builder.Property(c => c.Name).HasColumnName("Name").IsRequired();
        }
    }
}
