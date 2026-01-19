using Domain.Entities.HistoryOfViewFilm;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations
{
    public class HistoryOfViewFilmConfiguration: IEntityTypeConfiguration<HistoryOfViewFilm>
    {
        public void Configure(EntityTypeBuilder<HistoryOfViewFilm> builder)
        {
            builder.ToTable("History_of_views_films");

            builder.HasKey(h => new { h.UserId, h.FilmId });

            builder.Property(h => h.UserId)
                   .HasColumnName("ID_User");

            builder.Property(h => h.FilmId)
                   .HasColumnName("ID_Film");

            builder.Property(h => h.DateView)
                   .HasColumnName("Date_view")
                   .IsRequired();

            builder.Property(h => h.Duration)
                   .IsRequired();

            builder.OwnsOne(h => h.Evaluation, e =>
            {
                e.Property(p => p.Value)
                 .HasColumnName("Evaluation");
            });
        }
    }
}
