using Google.Cloud.Firestore;
using Ecommerce.DataAccess;
using Ecommerce.Business;
using Ecommerce.Entities;

var builder = WebApplication.CreateBuilder(args);



// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddOpenApi();



// Firestore & Dependency Injection
builder.Services.AddSingleton(provider => 
{
    var config = provider.GetRequiredService<IConfiguration>();
    var projectId = config["Firestore:ProjectId"];

    // Auto-detect credentials file
    string credentialPath = Path.Combine(Directory.GetCurrentDirectory(), "firebase-credentials.json");
    if (File.Exists(credentialPath))
    {
        Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", credentialPath);
    }

    // Fallback or throw if null. Ideally use local emulator or real project.
    if (string.IsNullOrEmpty(projectId) || projectId == "YOUR_PROJECT_ID_HERE")
        return FirestoreDb.Create("maqueta-ecommerce-default"); 
        
    return FirestoreDb.Create(projectId);
});

builder.Services.AddScoped(typeof(IFirestoreRepository<>), typeof(FirestoreRepository<>));
builder.Services.AddScoped<IProductService, ProductService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        builder => builder.WithOrigins("http://localhost:5173") // Vite default
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("AllowLocalhost");
app.MapControllers();  

app.Run();


