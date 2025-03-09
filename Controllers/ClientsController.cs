using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NoodleFoodle.Models;
using NoodleFoodle.Services;
using Microsoft.AspNetCore.Mvc.Routing;
using NoodleFoodle.Models.DTO;
using NoodleFoodle;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class ClientsController : ControllerBase
{
    private readonly Test1Context _context;
    private readonly IClientService _clientService;
    private readonly IJWTService _jwtService;

    public ClientsController(IClientService clientService, IJWTService jwtService, Test1Context context)
    {
        _clientService = clientService;
        _context = context;
        _jwtService = jwtService;
    }

    /// <summary>
    /// Get all clients
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Client>>> GetAllClients()
    {

        var clients = await _clientService.GetAllClientsAsync();
        return Ok(clients);

    }

    /// <summary>
    /// Get Client By Id
    /// </summary>
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

    /// <summary>
    /// Create Client
    /// </summary>
    /// 
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
    /// Delete Client
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

}
