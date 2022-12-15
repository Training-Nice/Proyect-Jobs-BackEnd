using Jobs_BackEnd.DataAccessLayer.Data.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Jobs_BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CondominioController : Controller
    {
        private readonly IUserRepository _userRepository;
        public IConfiguration _configuration { get; set; }


        public CondominioController(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }
        [HttpGet]
        public async Task<IActionResult> getCondominios()
        {
			try
			{
                return Ok(await _userRepository.getCondominios());
            }
			catch (Exception e)
			{
                return BadRequest(e);
            }
        }
    }
}
