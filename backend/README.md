Backend (.NET 8) for inventory system.

- Update connection string in appsettings.json
- Run:
  - dotnet restore
  - dotnet tool install --global dotnet-ef
  - dotnet ef migrations add InitialCreate
  - dotnet ef database update
  - dotnet run
