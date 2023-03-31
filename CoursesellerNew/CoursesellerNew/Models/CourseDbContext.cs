using Microsoft.EntityFrameworkCore;

namespace Onlinecourseseller.Models
{
    public class CourseDbContext: DbContext
    {
        public CourseDbContext(DbContextOptions<CourseDbContext> options) : base(options)
        {
        }

        public DbSet<Course> Courses{ get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<Order> Orders { get; set; }
    }
}
