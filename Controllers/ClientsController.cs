using Microsoft.AspNetCore.Mvc;
using NoodleFoodle.Services;
using NoodleFoodle.Models;

[ApiController]
[Route("api/[controller]")]
public class ClientsController : ControllerBase
{
    private readonly ClientService _clientService;

    public ClientsController(ClientService clientService)
    {
        _clientService = clientService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Client>>> GetClients()
    {
        return Ok(await _clientService.GetClientsAsync());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Client>> GetClient(int id)
    {
        var client = await _clientService.GetClientByIdAsync(id);
        if (client == null)
            return NotFound();
        return Ok(client);
    }

    [HttpPost]
    public async Task<ActionResult> CreateClient(Client client)
    {
        await _clientService.CreateClientAsync(client);
        return CreatedAtAction(nameof(GetClient), new { id = client.Id }, client);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateClient(int id, Client client)
    {
        if (id != client.Id)
            return BadRequest();

        var updatedClient = await _clientService.UpdateClientAsync(id, client);
        if (updatedClient == null)
            return NotFound();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteClient(int id)
    {
        var deleted = await _clientService.DeleteClientAsync(id);
        if (!deleted)
            return NotFound();

        return NoContent();
    }
}
