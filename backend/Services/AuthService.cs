using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Inventory.Api.Data;
using Inventory.Api.Models;
using Inventory.Api.Models.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Inventory.Api.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _db;
    private readonly IConfiguration _config;

    public AuthService(AppDbContext db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }

    public async Task<AuthResult> LoginAsync(string username, string password)
    {
        var user = await _db.Users.FirstOrDefaultAsync(x => x.Username == username);
        if (user == null || user.PasswordHash != password)
        {
            return new AuthResult { Success = false };
        }

        var token = GenerateJwt(user);
        return new AuthResult { Success = true, Token = token, User = user };
    }

    private string GenerateJwt(User user)
    {
        var jwtSection = _config.GetSection("Jwt");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSection["Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new("id", user.Id.ToString()),
            new("username", user.Username)
        };

        var token = new JwtSecurityToken(
            issuer: jwtSection["Issuer"],
            audience: jwtSection["Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
