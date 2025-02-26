using Microsoft.IdentityModel.Tokens;
using NoodleFoodle.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace NoodleFoodle.Services
{
    public class JWTService : IJWTService
    {
        private readonly IConfiguration _configuration;
        private readonly IClientService _clientService; // Сервис для работы с пользователями

        public JWTService(IConfiguration configuration, IClientService clientService)
        {
            _configuration = configuration;
            _clientService = clientService;  // Инициализируем сервис работы с пользователями
        }

        public async Task<string> Authenticate(LoginModel loginModel)
        {
            // Проверяем пользователя по email и паролю
            var user = await _clientService.ValidateClientAsync(loginModel.Email, loginModel.Password);

            if (user == null)
            {
                // Если пользователь не найден, возвращаем null
                return null;
            }

            // Если пользователь найден, генерируем для него JWT-токен
            return GenerateToken(user);
        }

        public string GenerateToken(Client client)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                new Claim(ClaimTypes.NameIdentifier, client.Id.ToString()),
                new Claim(ClaimTypes.Email, client.Email),
                //new Claim(ClaimTypes.Role, user.Role),
                new Claim(JwtRegisteredClaimNames.Aud, _configuration["Jwt:Audience"]),
                new Claim(JwtRegisteredClaimNames.Iss, _configuration["Jwt:Issuer"])
                }),
                Expires = DateTime.UtcNow.AddHours(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public bool ValidateToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]);

            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidIssuer = _configuration["Jwt:Issuer"], // Издатель должен совпадать с тем, что указано в конфигурации
                ValidAudience = _configuration["Jwt:Audience"], // Аудитория должна совпадать с тем, что указано в конфигурации
                ValidateLifetime = true
            }, out SecurityToken validatedToken);

            return validatedToken != null;
        }
    }
}
