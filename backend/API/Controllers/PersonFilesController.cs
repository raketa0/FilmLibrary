using Application.Person.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/persons")]
public class PersonFilesController : ControllerBase
{
    private readonly IPersonService _personService;
    private readonly string _storePath = @"D:\studies\FilmLibrary\store";

    public PersonFilesController(IPersonService personService)
    {
        _personService = personService;
    }

    [HttpGet("{personId:int}/photo")]
    public async Task<IActionResult> GetPhoto(int personId)
    {
        var person = await _personService.GetByIdAsync(personId);
        if (person == null || string.IsNullOrEmpty(person.LinkToPhoto))
            return NotFound();

        var filePath = Path.Combine(_storePath, person.LinkToPhoto.Replace("/", "\\"));
        if (!System.IO.File.Exists(filePath))
            return NotFound();

        var ext = Path.GetExtension(filePath).ToLowerInvariant();
        var contentType = ext switch
        {
            ".jpg" or ".jpeg" => "image/jpeg",
            ".png" => "image/png",
            ".gif" => "image/gif",
            _ => "application/octet-stream"
        };

        var fileBytes = await System.IO.File.ReadAllBytesAsync(filePath);
        return File(fileBytes, contentType);
    }

    [HttpPost("{personId:int}/files")]
    public async Task<IActionResult> UploadPhoto(int personId, [FromForm] IFormFile photo)
    {
        var person = await _personService.GetByIdAsync(personId);
        if (person == null) return NotFound();

        var personFolder = Path.Combine(_storePath, "persons", personId.ToString());
        Directory.CreateDirectory(personFolder);

        var filePath = Path.Combine(personFolder, "avatar" + Path.GetExtension(photo.FileName));
        using var stream = new FileStream(filePath, FileMode.Create);
        await photo.CopyToAsync(stream);

        var relativePath = Path.Combine("persons", personId.ToString(), "avatar" + Path.GetExtension(photo.FileName)).Replace("\\", "/");
        await _personService.UpdatePhotoAsync(personId, relativePath);

        return Ok(new { path = relativePath });
    }
}
