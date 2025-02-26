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
    }
}
