using Jobs_BackEnd.BusinessLogicLayer;
using Jobs_BackEnd.DataAccessLayer.Data.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Jobs_BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public IConfiguration _configuration { get; set; }

        public UserController(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllUser()
        {
            return Ok(await _userRepository.GetUsers());

        }
        [HttpPost]
        [Route("login")]
        public async Task<dynamic> Login([FromBody] Object opData)
        {
            var data = JsonConvert.DeserializeObject<dynamic>(opData.ToString());
            
            string user = data.usuario.ToString();
            string password = data.password.ToString();


             
            var auth = await _userRepository.GetAthUser(user, password);
            if (auth==null)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Credenciales inconrrectas",
                    result = ""
                });
            }
            var jwt = _configuration.GetSection("Jwt").Get<Jwt>();



            var claims = new[]{
                new Claim(JwtRegisteredClaimNames.Sub, jwt.Subject),
                new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat,DateTime.UtcNow.ToString()),
                new Claim("id",auth.IdUser.ToString()),
                new Claim("Nombre",auth.Nombre),
                new Claim("Username",auth.Username),
                

            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt.Key));
            var singIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                    jwt.Issuer,
                    jwt.Audience,
                    claims,
                    expires: DateTime.Now.AddMinutes(4),
                    signingCredentials: singIn
                ) ;
            return Ok(new
            {
                success = true,
                message = "Ok",
                result = new JwtSecurityTokenHandler().WriteToken(token)
            });
        }
    }
}
