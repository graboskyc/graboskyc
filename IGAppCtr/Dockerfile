#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
ENV TZ="America/New_York"
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["IGApp/IGApp.csproj", "IGApp/"]
RUN dotnet restore "IGApp/IGApp.csproj"
COPY . .
WORKDIR "/src/IGApp"
RUN dotnet build "IGApp.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "IGApp.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "IGApp.dll"]
