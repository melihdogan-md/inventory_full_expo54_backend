using Inventory.Api.Models.Auth;

namespace Inventory.Api.Services;

public interface IAuthService
{
    Task<AuthResult> LoginAsync(string username, string password);
}
