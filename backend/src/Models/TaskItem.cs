using System.ComponentModel.DataAnnotations;

namespace TaskManagerAPI.Models
{
    /// <summary>
    /// Represents a task item in the task management system.
    /// Contains task details, categorization, and ownership information.
    /// </summary>
    public class TaskItem
    {
        /// <summary>
        /// Gets or sets the unique identifier for the task.
        /// </summary>
        public int Id { get; set; }
        
        /// <summary>
        /// Gets or sets the ID of the user who owns this task.
        /// </summary>
        public int UserId { get; set; }
        
        /// <summary>
        /// Gets or sets the task title. Required field with maximum 255 characters.
        /// </summary>
        [Required]
        [StringLength(255)]
        public string Title { get; set; } = string.Empty;
        
        /// <summary>
        /// Gets or sets the optional task description. Maximum 1000 characters.
        /// </summary>
        [StringLength(1000)]
        public string? Description { get; set; }
        
        /// <summary>
        /// Gets or sets the task category (Work, Personal, Other). Defaults to "Other".
        /// </summary>
        [StringLength(100)]
        public string Category { get; set; } = "Other";
        
        /// <summary>
        /// Gets or sets whether the task has been completed. Defaults to false.
        /// </summary>
        public bool Completed { get; set; } = false;
        
        /// <summary>
        /// Gets or sets the timestamp when the task was created.
        /// </summary>
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        
        /// <summary>
        /// Gets or sets the timestamp when the task was last updated.
        /// </summary>
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        
        /// <summary>
        /// Gets or sets the user who owns this task.
        /// Navigation property for Entity Framework relationships.
        /// </summary>
        public virtual User User { get; set; } = null!;
    }
}