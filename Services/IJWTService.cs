using NoodleFoodle.Models;

namespace NoodleFoodle.Services
{
    public interface IJWTService
    {
        string GenerateToken(Client client);
        bool ValidateToken(string token);
        Task<string> Authenticate(LoginModel loginModel);
    }
}
