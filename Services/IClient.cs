using NoodleFoodle.Models;

namespace NoodleFoodle.Services.Interfaces
{
    public interface IClientService
    {
        Task<IEnumerable<Client>> GetClientsAsync();
        Task<Client?> GetClientByIdAsync(int id);
        Task<Client> CreateClientAsync(Client client);
        Task<Client?> UpdateClientAsync(int id, Client client);
        Task<bool> DeleteClientAsync(int id);
    }
}
