using NoodleFoodle.Models;

namespace NoodleFoodle.Services
{
    public interface IClientService
    {
        Task<Client> ValidateClientAsync(string email, string password);
        Task<IEnumerable<Client>> GetAllClientsAsync();
        Task<Client> CreateClientAsync(Client client);

        Task<Client> GetClientByIdAsync(int id);
        public Task<Client> GetClientByEmailAsync(string email);
        Task DeleteClientAsync(int id);
    }
}
