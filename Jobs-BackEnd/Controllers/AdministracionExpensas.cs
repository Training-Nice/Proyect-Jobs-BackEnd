using Jobs_BackEnd.DataAccessLayer.Data.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Jobs_BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdministracionExpensas : Controller
    {
        private readonly IUserRepository _userRepository;
        public IConfiguration _configuration { get; set; }


        public AdministracionExpensas(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }
        [HttpGet]
        [Route("userExpensas/{id:int}")]
        public async Task<IActionResult> getDeudasExpensaByUser(int id)
        {
            try
            {
                return Ok(await _userRepository.getDeudasExpensaByUser(id));
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
    }
}
