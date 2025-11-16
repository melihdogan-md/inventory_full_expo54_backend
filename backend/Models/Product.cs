namespace Inventory.Api.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Sku { get; set; }
    public string? Barcode { get; set; }
    public int? CategoryId { get; set; }
    public Category? Category { get; set; }
    public decimal CurrentQuantity { get; set; }
    public string? Unit { get; set; }
    public decimal? Price { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
