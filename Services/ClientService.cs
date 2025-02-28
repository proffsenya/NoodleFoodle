using Microsoft.EntityFrameworkCore;
using NoodleFoodle.Models;
using NoodleFoodle.Services.Interfaces;
using System;

namespace NoodleFoodle.Services
{
    public class ClientService : IClientService
    {
        private readonly AppDbContext _context;

        public ClientService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Client>> GetClientsAsync()
        {
            return await _context.Clients.ToListAsync();
        }

        public async Task<Client?> GetClientByIdAsync(int id)
        {
            return await _context.Clients.FindAsync(id);
        }

        public async Task<Client> CreateClientAsync(Client client)
        {
            _context.Clients.Add(client);
            await _context.SaveChangesAsync();
            return client;
        }

        public async Task<Client?> UpdateClientAsync(int id, Client client)
        {
            var existingClient = await _context.Clients.FindAsync(id);
            if (existingClient == null) return null;

            existingClient.Name = client.Name;
            existingClient.Email = client.Email;
            existingClient.PhoneNumber = client.PhoneNumber;
            existingClient.Address = client.Address;

            await _context.SaveChangesAsync();
            return existingClient;
        }

        public async Task<bool> DeleteClientAsync(int id)
        {
            var client = await _context.Clients.FindAsync(id);
            if (client == null) return false;

            _context.Clients.Remove(client);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
