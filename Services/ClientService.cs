using Microsoft.EntityFrameworkCore;
using NoodleFoodle.Models;

namespace NoodleFoodle.Services
{
    public class ClientService : IClientService
    {
        private readonly Test1Context _context;
        public ClientService(Test1Context context) {
            _context = context;
        }

        public Task<Client> ValidateClientAsync(string email, string password)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Client>> GetAllClientsAsync()
        {
            return await _context.Client.ToListAsync();
        }

        public async Task<Client> CreateClientAsync(Client client)
        {
            _context.Client.Add(client);
            await _context.SaveChangesAsync();
            return client;
        }

        public async Task<Client> GetClientByIdAsync(int id)
        {
            return await _context.Client.FindAsync(id);
        }

        public async Task<Client> GetClientByEmailAsync(string email)
        {
            return await _context.Clients.FirstOrDefaultAsync(c => c.Email == email);
        }

        public async Task DeleteClientAsync(int id)
        {
            var client = await _context.Client.FindAsync(id);
            if (client == null)
            {
                throw new KeyNotFoundException("Клиент не найден");

            }
            _context.Client.Remove(client);
            await _context.SaveChangesAsync();

        }
    }
}
