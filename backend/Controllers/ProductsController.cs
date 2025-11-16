using Inventory.Api.Data;
using Inventory.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Inventory.Api.Controllers;

[ApiController]
[Route("api/products")]
[Authorize]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _db;

    public ProductsController(AppDbContext db)
    {
        _db = db;
    }

    // DTO’lar
    public class ProductCreateRequest
    {
        public string Name { get; set; } = string.Empty;
        public string? Sku { get; set; }
        public string? Barcode { get; set; }
        public int? CategoryId { get; set; }
        public string? Unit { get; set; }
        public decimal? Price { get; set; }
    }

    // orderBy: name | category | createdAt
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? orderBy = "createdAt")
    {
        var query = _db.Products
            .Include(p => p.Category)
            .AsQueryable();

        query = orderBy?.ToLower() switch
        {
            "name" => query.OrderBy(p => p.Name),
            "category" => query
                .OrderBy(p => p.Category!.Name)
                .ThenBy(p => p.Name),
            _ => query.OrderByDescending(p => p.CreatedAt)
        };

        var products = await query
            .Select(p => new
            {
                p.Id,
                p.Name,
                p.Sku,
                p.Barcode,
                p.CurrentQuantity,
                p.Unit,
                p.Price,
                p.CreatedAt,
                CategoryId = p.CategoryId,
                CategoryName = p.Category != null ? p.Category.Name : null
            })
            .ToListAsync();

        return Ok(products);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] ProductCreateRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest(new { message = "Name is required." });

        var product = new Product
        {
            Name = request.Name.Trim(),
            Sku = request.Sku?.Trim(),
            Barcode = request.Barcode?.Trim(),
            CategoryId = request.CategoryId,
            Unit = request.Unit?.Trim(),
            Price = request.Price,
            CreatedAt = DateTime.UtcNow,
            CurrentQuantity = 0
        };

        _db.Products.Add(product);
        await _db.SaveChangesAsync();

        return CreatedAtAction(nameof(GetAll), new { id = product.Id }, new
        {
            product.Id,
            product.Name,
            product.Sku,
            product.Barcode,
            product.Price,
            product.Unit,
            product.CreatedAt,
            product.CategoryId
        });
    }
}
