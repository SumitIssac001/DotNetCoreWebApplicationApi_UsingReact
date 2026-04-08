using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplicationApi.Models;

namespace WebApplicationApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DCandidatesController(DonationDbContext context) : ControllerBase
    {
        private readonly DonationDbContext _context = context;

        [HttpGet]
        public IActionResult GetAll() => Ok(_context.DCandidates.ToList());

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var candidate = _context.DCandidates.Find(id);
            return candidate == null ? NotFound() : Ok(candidate);
        }

        [HttpPost]
        public IActionResult Create(DCandidate candidate)
        {
            _context.DCandidates.Add(candidate);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = candidate.Id }, candidate);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, DCandidate candidate)
        {
            if (id != candidate.Id) return BadRequest();
            _context.Entry(candidate).State = EntityState.Modified;
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var candidate = _context.DCandidates.Find(id);
            if (candidate == null) return NotFound();
            _context.DCandidates.Remove(candidate);
            _context.SaveChanges();
            return NoContent();

        }
    }
}