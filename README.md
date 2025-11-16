Full inventory system:

- backend/ (.NET 8 Web API, PostgreSQL, JWT)
- mobile/ (Expo SDK 54 React Native app)

Backend:
  cd backend
  dotnet restore
  dotnet tool install --global dotnet-ef
  dotnet ef migrations add InitialCreate
  dotnet ef database update
  dotnet run

Mobile:
  cd mobile
  npm install
  npx expo start

Update mobile/app.json -> expo.extra.apiBaseUrl to point at backend URL.
