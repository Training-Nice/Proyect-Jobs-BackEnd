using Jobs_BackEnd.DataAccessLayer.Data.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Jobs_BackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CopropietarioController : Controller
    {
        private readonly IUserRepository _userRepository;
        public IConfiguration _configuration { get; set; }
        public CopropietarioController(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        [HttpGet]
        [Route("infoComplete")]
        public async Task<IActionResult> getCopropietariosInfoDetail()
        {
            try
            {
                return Ok(await _userRepository.getCopropietariosInfoDetailDuedas());
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
        [HttpGet]
        [Route("infoComplete/condominio/{id:int}")]
        public async Task<IActionResult> getCopropietariosInfoDetailByCondominio(int id)
        {
            return Ok(await _userRepository.getCopropietariosInfoDetailDuedasByCondominio(id));
        }
    }
}
