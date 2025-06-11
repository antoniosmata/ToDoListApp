# Use the official ASP.NET Core runtime as base image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

# Install curl for health checks
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Use the SDK image to build the application
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY TaskManagerAPI.csproj ./
RUN dotnet restore TaskManagerAPI.csproj

# Copy everything else and build
COPY . ./
RUN dotnet build TaskManagerAPI.csproj -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish TaskManagerAPI.csproj -c Release -o /app/publish /p:UseAppHost=false

# Final stage/image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TaskManagerAPI.dll"]