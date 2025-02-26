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
    }
}
