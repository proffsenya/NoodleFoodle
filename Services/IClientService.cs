using NoodleFoodle.Models;

namespace NoodleFoodle.Services
{
    public interface IClientService
    {
        Task<Client> ValidateClientAsync(string email, string password);
        Task<IEnumerable<Client>> GetAllClientsAsync();
        Task<Client> CreateClientAsyncc(Client client);
    }
}
