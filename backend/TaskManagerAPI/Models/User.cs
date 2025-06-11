using System.ComponentModel.DataAnnotations;

namespace TaskManagerAPI.Models
{
    /// <summary>
    /// Represents a user account in the task management system.
    /// Contains authentication information and personal details.
    /// </summary>
    public class User
    {
        /// <summary>
        /// Gets or sets the unique identifier for the user.
        /// </summary>
        public int Id { get; set; }
        
        /// <summary>
        /// Gets or sets the user's first name. Maximum 100 characters.
        /// </summary>
        [Required]
        [StringLength(100)]
        public string FirstName { get; set; } = string.Empty;
        
        /// <summary>
        /// Gets or sets the user's last name. Maximum 100 characters.
        /// </summary>
        [Required]
        [StringLength(100)]
        public string LastName { get; set; } = string.Empty;
        
        /// <summary>
        /// Gets or sets the user's email address. Must be unique and valid email format.
        /// </summary>
        [Required]
        [EmailAddress]
        [StringLength(255)]
        public string Email { get; set; } = string.Empty;
        
        /// <summary>
        /// Gets or sets the BCrypt hashed password for authentication.
        /// </summary>
        [Required]
        [StringLength(255)]
        public string PasswordHash { get; set; } = string.Empty;
        
        /// <summary>
        /// Gets or sets the timestamp when the user account was created.
        /// </summary>
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        /// <summary>
        /// Gets or sets the collection of tasks belonging to this user.
        /// Navigation property for Entity Framework relationships.
        /// </summary>
        public virtual ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
    }
}