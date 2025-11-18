using Domain.Entities.User;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("User");
            builder.HasKey(u => u.Id);
            builder.Property(u => u.Id).HasColumnName("ID_USER").ValueGeneratedNever();

            builder.Property(u => u.Name).HasMaxLength(40).IsRequired();
            builder.OwnsOne(u => u.Email).Property(e => e.Value).HasColumnName("Email").HasMaxLength(150).IsRequired();
            builder.OwnsOne(u => u.Password).Property(p => p.HashedValue).HasColumnName("Password").IsRequired();
            builder.Property(u => u.DateOfBirth).IsRequired();
            builder.Property(u => u.RegistrationDate).IsRequired();
            builder.Property(u => u.LinkToAvatar).HasColumnName("LinkToAvatar");
        }
    }
}
