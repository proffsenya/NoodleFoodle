using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using NoodleFoodle.Models;
using NoodleFoodle.Services;


namespace NoodleFoodle.Controllers
{
    public class ClientsController : ControllerBase
    {
        //private readonly Test1Context _context;
        private readonly IClientService _clientService;

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


        // GET: api/Comics/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Client>> GetClientById(int id)
        {
            var client = await _clientService.GetClientByIdAsync(id);
            if (client == null)
            {
                return NotFound();
            }
            return Ok(client);
        }

        
        /// <summary>
        /// Creates a client
        /// </summary>
        /// <param name="client"></param>
        /// <returns>A newly created client</returns>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /Clients
        ///     {
        ///        {
        ///             "id": 0,
        ///             "name": "string",
        ///             "email": "string",
        ///             "phone_number": "string",
        ///             "address": "string",
        ///             "password": "string"                    
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Returns the newly created client</response>
        /// <response code="400">If the client is null</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Client>> PostClient(Client client) {
            var createdClient = await _clientService.CreateClientAsync(client);
            return CreatedAtAction(nameof(GetClientById), new { id = createdClient.Id}, createdClient);
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
}
