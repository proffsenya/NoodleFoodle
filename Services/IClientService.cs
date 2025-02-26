using NoodleFoodle.Models;

namespace NoodleFoodle.Services
{
    public interface IClientService
    {
        Task<Client> ValidateClientAsync(string email, string password);
        Task<IEnumerable<Client>> GetAllClientsAsync();
        Task<Client> CreateClientAsync(Client client);

        Task<Client> GetClientByIdAsync(int id);
        Task DeleteClientAsync(int id);
    }
}
