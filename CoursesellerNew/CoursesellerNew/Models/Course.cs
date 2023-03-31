
using System.ComponentModel.DataAnnotations;

namespace Onlinecourseseller.Models
{
    public class Course
    {
        [Key]
        public int CourseId { get; set; }
        public string CourseName { get; set; }
        public int Price { get; set; }
    }
}
