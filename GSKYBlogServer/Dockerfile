FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /App
ENV TZ="America/New_York"
ENV DOTNET_EnableWriteXorExecute=0


# Copy everything
COPY ./ ./
RUN rm -rf ./bin
RUN rm -rf ./obj
# Restore as distinct layers
# RUN dotnet restore
# Build and publish a release
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /App
COPY --from=build-env /App/out .
EXPOSE 8080
ENV ASPNETCORE_URLS=http://*:8080
ENTRYPOINT ["dotnet", "GSKYBlogServer.dll"]