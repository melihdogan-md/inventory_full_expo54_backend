using Inventory.Api.Models;

namespace Inventory.Api.Models.Auth;

public class AuthResult
{
    public bool Success { get; set; }
    public string Token { get; set; } = string.Empty;
    public User User { get; set; } = null!;
}
