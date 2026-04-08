using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;

namespace WebApplicationApi.Models
{
    public class DonationDbContext(DbContextOptions<DonationDbContext> options)
        : DbContext(options)
    {
        public DbSet<DCandidate> DCandidates { get; set; }
    }

}
