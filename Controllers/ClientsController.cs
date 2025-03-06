using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using NoodleFoodle.Models;
using NoodleFoodle.Services;
using Microsoft.AspNetCore.Mvc.Routing;
using NoodleFoodle.Models.DTO;

[Route("api/[controller]")]
[ApiController]
public class ClientsController : ControllerBase
{
    //private readonly Test1Context _context;
    private readonly IClientService _clientService;
    private readonly IJWTService _jwtService;

    public ClientsController(IClientService clientService)
    {
        _clientService = clientService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Client>>> GetAllClients()
    {

        var clients = await _clientService.GetAllClientsAsync();
        return Ok(clients);

    }

    //// GET: Clients/Details/5
    //public async Task<IActionResult> Details(int? id)
    //{
    //    if (id == null)
    //    {
    //        return NotFound();
    //    }

    //    var client = await _context.Client
    //        .FirstOrDefaultAsync(m => m.Id == id);
    //    if (client == null)
    //    {
    //        return NotFound();
    //    }

    //    return View(client);
    //}


    // GET: api/Clients/{id}
    //[HttpGet("{id}")]
    //public async Task<ActionResult<Client>> GetClientById(int id)
    //{
    //    var client = await _clientService.GetClientByIdAsync(id);
    //    if (client == null)
    //    {
    //        return NotFound();
    //    }
    //    return Ok(client);
    //}
    [HttpGet("{id}")]
    public async Task<ActionResult<ClientDTO>> GetClientById(int id)
    {
        var client = await _clientService.GetClientByIdAsync(id);
        if (client == null)
        {
            return NotFound();
        }

        var clientDto = new ClientDTO
        {
            Name = client.Name,
            Email = client.Email,
            Password = client.Password,
            Address = client.Address
        };

        return Ok(clientDto);
    }


    //[HttpPost]
    //[ProducesResponseType(StatusCodes.Status201Created)]
    //[ProducesResponseType(StatusCodes.Status400BadRequest)]
    //public async Task<ActionResult<Client>> PostClient(Client client) {
    //    var createdClient = await _clientService.CreateClientAsync(client);
    //    return CreatedAtAction(nameof(GetClientById), new { id = createdClient.Id}, createdClient);
    //}

    [HttpPost]
    public async Task<ActionResult<Client>> PostClient(ClientDTO clientDto)
    {
        var client = new Client
        {
            Name = clientDto.Name,
            Email = clientDto.Email,
            Password = clientDto.Password,
            Address = clientDto.Address
        };

        var createdClient = await _clientService.CreateClientAsync(client);
        return CreatedAtAction(nameof(GetClientById), new { id = createdClient.Id }, createdClient);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(ClientDTO clientDto)
    {
        var existingClient = await _clientService.GetClientByEmailAsync(clientDto.Email);
        if (existingClient != null)
        {
            return BadRequest(new { message = "Пользователь с таким email уже существует." });
        }
 
        var client = new Client
        {
            Name = clientDto.Name,
            Email = clientDto.Email,
            Password = BCrypt.Net.BCrypt.HashPassword(clientDto.Password), 
            Address = clientDto.Address
        };

        var createdClient = await _clientService.CreateClientAsync(client);
        var token = _jwtService.GenerateToken(createdClient);

        return Ok(new { token });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginModel loginModel)
    {
        var client = await _clientService.GetClientByEmailAsync(loginModel.Email);
        if (client == null || !BCrypt.Net.BCrypt.Verify(loginModel.Password, client.Password))
        {
            return Unauthorized(new { message = "Неверный email или пароль." });
        }

        var token = _jwtService.GenerateToken(client);
        return Ok(new { token });
    }


    /// <summary>
    /// Deletes a specific TodoItem.
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteClient(int id)
    {
        try { 
            await _clientService.DeleteClientAsync(id);
            return NotFound();
        }
        catch (KeyNotFoundException ex){
            return NotFound(new {message = ex.Message});
        }
    }
        
    
    //// GET: Clients/Edit/5
    //public async Task<IActionResult> Edit(int? id)
    //{
    //    if (id == null)
    //    {
    //        return NotFound();
    //    }

    //    var client = await _context.Client.FindAsync(id);
    //    if (client == null)
    //    {
    //        return NotFound();
    //    }
    //    return View(client);
    //}

    //// POST: Clients/Edit/5
    //// To protect from overposting attacks, enable the specific properties you want to bind to.
    //// For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
    //[HttpPost]
    //[ValidateAntiForgeryToken]
    //public async Task<IActionResult> Edit(int id, [Bind("Id,Name,Email")] Client client)
    //{
    //    if (id != client.Id)
    //    {
    //        return NotFound();
    //    }

    //    if (ModelState.IsValid)
    //    {
    //        try
    //        {
    //            _context.Update(client);
    //            await _context.SaveChangesAsync();
    //        }
    //        catch (DbUpdateConcurrencyException)
    //        {
    //            if (!ClientExists(client.Id))
    //            {
    //                return NotFound();
    //            }
    //            else
    //            {
    //                throw;
    //            }
    //        }
    //        return RedirectToAction(nameof(Index));
    //    }
    //    return View(client);
    //}

    //// GET: Clients/Delete/5
    //public async Task<IActionResult> Delete(int? id)
    //{
    //    if (id == null)
    //    {
    //        return NotFound();
    //    }

    //    var client = await _context.Client
    //        .FirstOrDefaultAsync(m => m.Id == id);
    //    if (client == null)
    //    {
    //        return NotFound();
    //    }

    //    return View(client);
    //}

    //// POST: Clients/Delete/5
    //[HttpPost, ActionName("Delete")]
    //[ValidateAntiForgeryToken]
    //public async Task<IActionResult> DeleteConfirmed(int id)
    //{
    //    var client = await _context.Client.FindAsync(id);
    //    if (client != null)
    //    {
    //        _context.Client.Remove(client);
    //    }

    //    await _context.SaveChangesAsync();
    //    return RedirectToAction(nameof(Index));
    //}

    //private bool ClientExists(int id)
    //{
    //    return _context.Client.Any(e => e.Id == id);
    //}
}
