using Jobs_BackEnd.DataAccessLayer.Data.Repositories;
using Jobs_BackEnd.DataAccessLayer.Data.Repositories.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MySql.Data.MySqlClient;
using System.Security.Claims;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS
builder.Services.AddCors(c =>
{
    c.AddPolicy("AllowOrigin", options => { options.AllowAnyOrigin(); options.AllowAnyMethod(); options.AllowAnyHeader(); });
});


// Configure DBA
var mySQLConfiguration = new MySQLConfiguration(builder.Configuration.GetConnectionString("MySqlConnection"));
builder.Services.AddSingleton(mySQLConfiguration);
builder.Services.AddScoped<MySqlConnection>();

// Add Repository
builder.Services.AddScoped<IUserRepository, UserRepository>();


//Autenticacion

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(jwtBearerOptions =>
{
    //https://tools.ietf.org/html/rfc7519#page-9

    jwtBearerOptions.TokenValidationParameters = new TokenValidationParameters()
    {
        //SaveSigninToken = true,
        //ValidateActor = true,
        ValidateIssuer = true, //Issuer: Emisor
        ValidateAudience = true, //Audience: Son los destinatarios del token
        ValidateLifetime = true, //Lifetime: Tiempo de vida del token
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Aucience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
    /*jwtBearerOprtions.Events = new JwtBearerEvents()
    {
        OnTokenValidated = context =>
        {
            List<Claim> cl = new List<Claim>(((ClaimsIdentity)context.Principal.Identity).Claims);
            string strUsuario = cl.Where(c => c.Type == JWT_CLAIM_USUARIO).First().Value;

            if (string.IsNullOrWhiteSpace(strUsuario))
            {
                context.Fail("Unauthorized");
            }

            return Task.CompletedTask;
        }
    }*/


});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
