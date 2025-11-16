using Inventory.Api.Models.Auth;
using Inventory.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _auth;

    public AuthController(IAuthService auth)
    {
        _auth = auth;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var result = await _auth.LoginAsync(request.Username, request.Password);
        if (!result.Success)
            return Unauthorized(new { message = "Invalid username or password" });

        return Ok(new
        {
            token = result.Token,
            user = new { id = result.User.Id, username = result.User.Username }
        });
    }
}
