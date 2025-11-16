using Inventory.Api.Data;
using Inventory.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Inventory.Api.Controllers;

[ApiController]
[Route("api/stock-movements")]
[Authorize]
public class StockMovementsController : ControllerBase
{
    private readonly AppDbContext _db;

    public StockMovementsController(AppDbContext db)
    {
        _db = db;
    }

    public class StockMovementRequest
    {
        public int? ProductId { get; set; }
        public string? Barcode { get; set; }
        public string Direction { get; set; } = "IN";
        public decimal Quantity { get; set; }
        public string? Note { get; set; }
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] StockMovementRequest request)
    {
        var movement = new StockMovement
        {
            ProductId = request.ProductId,
            Barcode = request.Barcode,
            Direction = request.Direction,
            Quantity = request.Quantity,
            Note = request.Note,
            PerformedAt = DateTime.UtcNow,
            PerformedBy = User.Identity?.Name ?? "mobile"
        };

        _db.StockMovements.Add(movement);

        if (request.ProductId.HasValue)
        {
            var product = await _db.Products.FindAsync(request.ProductId.Value);
            if (product != null)
            {
                if (request.Direction == "IN")
                    product.CurrentQuantity += request.Quantity;
                else
                    product.CurrentQuantity -= request.Quantity;
            }
        }

        await _db.SaveChangesAsync();
        return Ok(new { movement.Id });
    }

    [HttpGet]
    public async Task<IActionResult> GetRecent([FromQuery] int limit = 50)
    {
        var rows = await _db.StockMovements
            .Include(m => m.Product)
            .OrderByDescending(m => m.PerformedAt)
            .Take(limit)
            .Select(m => new
            {
                m.Id,
                m.Barcode,
                m.Direction,
                m.Quantity,
                m.Note,
                m.PerformedAt,
                m.PerformedBy,
                ProductName = m.Product != null ? m.Product.Name : null
            })
            .ToListAsync();

        return Ok(rows);
    }
}
