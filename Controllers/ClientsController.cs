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

        //// GET: Clients
        //[HttpGet]
        //public async Task<IActionResult> Index()
        //{
        //    //return View(await _context.Client.ToListAsync());
        //}


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
        [HttpGet]
        public async Task<ActionResult<Client>> GetClientById(int id)
        {
            var client = await _clientService.GetClientByIdAsync(id);
            if (client == null)
            {
                return NotFound();
            }
            return Ok(client);
        }

        // POST: Clients/Create
        [HttpPost]
        public async Task<ActionResult<Client>> PostClient(Client client) {
            var createdClient = await _clientService.CreateClientAsync(client);
            return CreatedAtAction(nameof(GetClientById), new { id = createdClient.Id}, createdClient);
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
