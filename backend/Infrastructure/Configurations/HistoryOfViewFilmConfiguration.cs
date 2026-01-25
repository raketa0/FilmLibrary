using Domain.Entities.Film;
using Domain.Entities.HistoryOfViewFilm;
using Domain.Entities.User;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    public class HistoryOfViewFilmConfiguration : IEntityTypeConfiguration<HistoryOfViewFilm>
    {
        public void Configure(EntityTypeBuilder<HistoryOfViewFilm> builder)
        {
            builder.ToTable("History_of_views_films");

            builder.HasKey(h => h.ID_History);

            builder.Property(h => h.ID_History)
                .HasColumnName("Id_History")
                .ValueGeneratedOnAdd();

            builder.Property(h => h.UserId)
                .HasColumnName("ID_User")
                .IsRequired();

            builder.Property(h => h.FilmId)
                .HasColumnName("ID_Film")
                .IsRequired();

            builder.Property(h => h.DateView)
                .HasColumnName("Date_view")
                .IsRequired();

            builder.Property(h => h.Duration)
                .IsRequired();

            builder.OwnsOne(h => h.Evaluation, e =>
            {
                e.Property(p => p.Value).HasColumnName("Evaluation");
            });

            builder.HasOne(h => h.User)
                .WithMany(u => u.HistoryOfViews)
                .HasForeignKey(h => h.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(h => h.Film)
                .WithMany(f => f.HistoryOfViews)
                .HasForeignKey(h => h.FilmId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}