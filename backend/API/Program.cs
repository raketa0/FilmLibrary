using Application.Film.Interfaces;
using Application.Film.Services;
using Application.Genre.Interfaces;
using Application.Genre.Services;
using Application.HistoryOfViewFilm.Interfaces;
using Application.HistoryOfViewFilm.Services;
using Application.Person.Interfaces;
using Application.Person.Services;
using Application.User.Interfaces;
using Application.User.Services;
using Domain.Repositories;
using FilmLibrary.Infrastructure.Repositories;
using Infrastructure.Data;
using Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var frontendOrigin = "http://localhost:5173";
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost", policy =>
    {
        policy.WithOrigins(frontendOrigin)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddDbContext<FilmLibraryDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddScoped<IFilmRepository, FilmRepository>();
builder.Services.AddScoped<IFilmService, FilmService>();

builder.Services.AddScoped<IFilmPersonRepository, FilmPersonRepository>();

builder.Services.AddScoped<IGenreRepository, GenreRepository>();
builder.Services.AddScoped<IGenreService, GenreService>();

builder.Services.AddScoped<IPersonRepository, PersonRepository>();
builder.Services.AddScoped<IPersonService, PersonService>();

builder.Services.AddScoped<IHistoryOfViewFilmRepository, HistoryOfViewFilmRepository>();
builder.Services.AddScoped<IHistoryOfViewFilmService, HistoryOfViewFilmService>();

builder.Services.AddScoped<ICareerRepository, CareerRepository>();
builder.Services.AddScoped<ICareerService, CareerService>();





var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        @"D:\studies\FilmLibrary\store"),
    RequestPath = "/store"
});


app.UseHttpsRedirection();

app.UseCors("AllowLocalhost");

app.UseAuthorization();

app.MapControllers();

app.Run();
