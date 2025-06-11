using System.ComponentModel.DataAnnotations;

namespace TaskManagerAPI.DTOs
{
    /// <summary>
    /// Data transfer object for user registration requests.
    /// </summary>
    public class SignUpDto
    {
        /// <summary>
        /// Gets or sets the user's first name. Required, maximum 100 characters.
        /// </summary>
        [Required]
        [StringLength(100, ErrorMessage = "First name cannot exceed 100 characters")]
        public string FirstName { get; set; } = string.Empty;
        
        /// <summary>
        /// Gets or sets the user's last name. Required, maximum 100 characters.
        /// </summary>
        [Required]
        [StringLength(100, ErrorMessage = "Last name cannot exceed 100 characters")]
        public string LastName { get; set; } = string.Empty;
        
        /// <summary>
        /// Gets or sets the user's email address. Must be valid email format.
        /// </summary>
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        
        /// <summary>
        /// Gets or sets the user's password. Minimum 8 characters required.
        /// </summary>
        [Required]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters long")]
        public string Password { get; set; } = string.Empty;
    }
    
    /// <summary>
    /// Data transfer object for user authentication requests.
    /// </summary>
    public class SignInDto
    {
        /// <summary>
        /// Gets or sets the user's email address for authentication.
        /// </summary>
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        
        /// <summary>
        /// Gets or sets the user's password for authentication.
        /// </summary>
        [Required]
        public string Password { get; set; } = string.Empty;
    }
    
    /// <summary>
    /// Data transfer object for authentication responses containing token and user data.
    /// </summary>
    public class AuthResponseDto
    {
        /// <summary>
        /// Gets or sets the JWT authentication token.
        /// </summary>
        public string Token { get; set; } = string.Empty;
        /// <summary>
        /// Gets or sets the authenticated user's information.
        /// </summary>
        public UserDto User { get; set; } = null!;
    }
    
    /// <summary>
    /// Data transfer object for user information in API responses.
    /// </summary>
    public class UserDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        /// <summary>
        /// Gets the user's full name by combining first and last names.
        /// </summary>
        public string FullName => $"{FirstName} {LastName}";
    }
}