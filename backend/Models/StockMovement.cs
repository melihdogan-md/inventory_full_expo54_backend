namespace Inventory.Api.Models;

public class StockMovement
{
    public int Id { get; set; }
    public int? ProductId { get; set; }
    public Product? Product { get; set; }
    public string? Barcode { get; set; }
    public string Direction { get; set; } = "IN";
    public decimal Quantity { get; set; }
    public string? Note { get; set; }
    public DateTime PerformedAt { get; set; } = DateTime.UtcNow;
    public string? PerformedBy { get; set; }
}
