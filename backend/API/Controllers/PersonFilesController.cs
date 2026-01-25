using Application.Person.Interfaces;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/persons")]
public class PersonFilesController : ControllerBase
{
    private readonly IPersonService _personService;
    private readonly string _storePath = @"D:\studies\FilmLibrary\store";
    private readonly string __storePath = @"D:\studies\FilmLibrary\store\persons";

    public PersonFilesController(IPersonService personService)
    {
        _personService = personService;
    }

    [HttpGet("{id}/photo")]
    public IActionResult GetPhoto(int id)
    {
        var folder = Path.Combine(_storePath, id.ToString());
        var filePath = Path.Combine(folder, "avatar.png");


        if (!System.IO.File.Exists(filePath))
            return NotFound();


        var bytes = System.IO.File.ReadAllBytes(filePath);
        return File(bytes, "image/png");
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

