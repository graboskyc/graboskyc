using GSKYBlogServer.Components;
using GSKYBlogServer.DataModels;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
//builder.Services.AddServerSideBlazor();
builder.Services.AddRazorComponents().AddInteractiveServerComponents();

static void ConfigureMDBServices(IServiceCollection services)
{
    
    string MDBCONNSTR = Environment.GetEnvironmentVariable("MDBCONNSTR").Trim();
    var settings = MongoClientSettings.FromConnectionString(MDBCONNSTR);
    settings.ServerApi = new ServerApi(ServerApiVersion.V1);

    services.AddSingleton<IMongoClient>(new MongoClient(settings));
    services.AddSingleton<IMongoDatabase>(x => x.GetRequiredService<IMongoClient>().GetDatabase("ig"));
    services.AddSingleton<IMongoCollection<Blog>>(x => x.GetRequiredService<IMongoDatabase>().GetCollection<Blog>("blog"));
    services.AddSingleton<IMongoCollection<Flight>>(x => x.GetRequiredService<IMongoDatabase>().GetCollection<Flight>("v_globe"));
    services.AddSingleton<IMongoCollection<IG>>(x => x.GetRequiredService<IMongoDatabase>().GetCollection<IG>("media"));
}

ConfigureMDBServices(builder.Services);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseAntiforgery();

app.MapRazorComponents<App>().AddInteractiveServerRenderMode();

app.Run();
