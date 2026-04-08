using Microsoft.EntityFrameworkCore;
using System;
using WebApplicationApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// ? Register AppDbContext
//builder.Services.AddDbContext<AppDbContext>(options =>
    //options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
// ? Register AppDbContext
builder.Services.AddDbContext<DonationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add controllers


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
         policy => policy.WithOrigins(
             "http://localhost:3000",
             "http://localhost:3001",
             "http://localhost:3002",
             "http://localhost:3003",
             "http://localhost:3004",
             "http://localhost:3005",
             "http://localhost:3006",
             "http://localhost:3007" // add this
         )
         .AllowAnyHeader()
         .AllowAnyMethod());

});

var app = builder.Build();

app.UseCors("AllowReactApp");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
// ?? Add these lines here
app.UseDefaultFiles();   // Looks for index.html by default
app.UseStaticFiles();    // Serves files from wwwroot

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
