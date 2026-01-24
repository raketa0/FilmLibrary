using Application.Film.DTOs;
using Application.Film.Interfaces;
using Application.User.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/films/{filmId:int}/files")]
public class FilmFilesController : ControllerBase
{
    private readonly IFilmService _filmService;
    private readonly IUserService _userService;
    private readonly string _storePath = @"D:\studies\FilmLibrary\store";

    public FilmFilesController(IFilmService filmService, IUserService userService)
    {
        _filmService = filmService;
        _userService = userService;
    }

    [HttpPost]
    public async Task<IActionResult> Upload(int filmId, [FromForm] IFormFile? poster, [FromForm] IFormFile? film)
    {
        var filmDto = await _filmService.GetByIdAsync(filmId);
        if (filmDto == null) return NotFound();

        var user = await _userService.GetByIdAsync(filmDto.CreatorId);
        if (user == null) return NotFound();

        var filmFolder = Path.Combine(_storePath, user.Email, "film", filmId.ToString());
        Directory.CreateDirectory(filmFolder);

        string? relativePoster = filmDto.LinkToPoster;
        string? relativeFilm = filmDto.LinkToFilm;

        if (poster != null)
        {
            var posterPath = Path.Combine(filmFolder, "poster" + Path.GetExtension(poster.FileName));
            using var stream = new FileStream(posterPath, FileMode.Create);
            await poster.CopyToAsync(stream);
            relativePoster = Path.Combine(user.Email, "film", filmId.ToString(), "poster" + Path.GetExtension(poster.FileName)).Replace("\\", "/");
        }

        if (film != null)
        {
            var filmPath = Path.Combine(filmFolder, "film" + Path.GetExtension(film.FileName));
            using var stream = new FileStream(filmPath, FileMode.Create);
            await film.CopyToAsync(stream);
            relativeFilm = Path.Combine(user.Email, "film", filmId.ToString(), "film" + Path.GetExtension(film.FileName)).Replace("\\", "/");
        }

        var updatedFilm = new UpdateFilmDto
        {
            Name = filmDto.Name,
            Description = filmDto.Description,
            YearOfRelease = filmDto.YearOfRelease,
            Duration = filmDto.Duration,
            Country = filmDto.Country,
            AgeRestriction = filmDto.AgeRestriction,
            GenreIds = filmDto.GenreIds,
            LinkToPoster = relativePoster,
            LinkToFilm = relativeFilm
        };

        var saved = await _filmService.UpdateAsync(filmId, updatedFilm);
        return Ok(saved);
    }
}
