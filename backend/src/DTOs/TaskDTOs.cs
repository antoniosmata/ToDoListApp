using System.ComponentModel.DataAnnotations;

namespace TaskManagerAPI.DTOs
{
    /// <summary>
    /// Data transfer object for creating new tasks.
    /// </summary>
    public class CreateTaskDto
    {
        /// <summary>
        /// Gets or sets the task title. Required, maximum 255 characters.
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
        /// Gets or sets the task category. Defaults to "Other".
        /// </summary>
        [StringLength(100)]
        public string Category { get; set; } = "Other";
    }
    
    /// <summary>
    /// Data transfer object for updating existing tasks.
    /// </summary>
    public class UpdateTaskDto
    {
        /// <summary>
        /// Gets or sets the task title. Required, maximum 255 characters.
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
        /// Gets or sets the task category. Defaults to "Other".
        /// </summary>
        [StringLength(100)]
        public string Category { get; set; } = "Other";
        
        /// <summary>
        /// Gets or sets whether the task is completed.
        /// </summary>
        public bool Completed { get; set; }
    }
    
    /// <summary>
    /// Data transfer object for task information in API responses.
    /// </summary>
    public class TaskDto
    {
        /// <summary>
        /// Gets or sets the unique identifier for the task.
        /// </summary>
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string Category { get; set; } = string.Empty;
        /// <summary>
        /// Gets or sets whether the task is completed.
        /// </summary>
        public bool Completed { get; set; }
        /// <summary>
        /// Gets or sets the timestamp when the task was created.
        /// </summary>
        public DateTime CreatedAt { get; set; }
        /// <summary>
        /// Gets or sets the timestamp when the task was last updated.
        /// </summary>
        public DateTime UpdatedAt { get; set; }
    }
}