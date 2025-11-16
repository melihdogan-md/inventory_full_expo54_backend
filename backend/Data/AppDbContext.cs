using Inventory.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Inventory.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Category> Categories => Set<Category>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<StockMovement> StockMovements => Set<StockMovement>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(e =>
        {
            e.HasKey(x => x.Id);
            e.Property(x => x.Username).IsRequired().HasMaxLength(50);
            e.Property(x => x.PasswordHash).IsRequired().HasMaxLength(200);
        });

        modelBuilder.Entity<Category>(e =>
        {
            e.HasKey(x => x.Id);
            e.Property(x => x.Name).IsRequired().HasMaxLength(100);
        });

        modelBuilder.Entity<Product>(e =>
        {
            e.HasKey(x => x.Id);
            e.Property(x => x.Name).IsRequired().HasMaxLength(200);
            e.Property(x => x.Sku).HasMaxLength(100);
            e.Property(x => x.Barcode).HasMaxLength(100);
            e.Property(x => x.Unit).HasMaxLength(20);

            // ✅ Fiyat için numeric alan
            e.Property(x => x.Price).HasColumnType("numeric(18,2)");

            // ✅ CreatedAt için zaman tipi
            e.Property(x => x.CreatedAt).HasColumnType("timestamp with time zone");

            e.HasOne(x => x.Category)
                .WithMany(c => c.Products)
                .HasForeignKey(x => x.CategoryId);
        });


        modelBuilder.Entity<StockMovement>(e =>
        {
            e.HasKey(x => x.Id);
            e.Property(x => x.Direction).IsRequired().HasMaxLength(10);
            e.Property(x => x.Quantity).HasColumnType("numeric(18,3)");
            e.Property(x => x.PerformedAt).HasColumnType("timestamp with time zone");
            e.HasOne(x => x.Product)
                .WithMany()
                .HasForeignKey(x => x.ProductId);
        });
    }
}
