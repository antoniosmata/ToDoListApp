using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskManagerAPI.Data;
using TaskManagerAPI.DTOs;
using TaskManagerAPI.Models;
using TaskManagerAPI.Services;

namespace TaskManagerAPI.Controllers
{
    /// <summary>
    /// Handles user authentication operations including registration, login, and logout.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IPasswordService _passwordService;
        private readonly IJwtService _jwtService;
        
        public AuthController(AppDbContext context, IPasswordService passwordService, IJwtService jwtService)
        {
            _context = context;
            _passwordService = passwordService;
            _jwtService = jwtService;
        }
        
        /// <summary>
        /// Creates a new user account with the provided registration information.
        /// </summary>
        /// <param name="signUpDto">User registration data including email, password, and name</param>
        /// <returns>Authentication response with JWT token and user information</returns>
        /// <exception cref="BadRequestObjectResult">Thrown when validation fails or email already exists</exception>
        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] SignUpDto signUpDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            // Check if user already exists
            if (await _context.Users.AnyAsync(u => u.Email == signUpDto.Email))
                return BadRequest(new { message = "User with this email already exists" });
            
            // Create new user
            var user = new User
            {
                FirstName = signUpDto.FirstName,
                LastName = signUpDto.LastName,
                Email = signUpDto.Email,
                PasswordHash = _passwordService.HashPassword(signUpDto.Password),
                CreatedAt = DateTime.UtcNow
            };
            
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            
            // Generate token
            var token = _jwtService.GenerateToken(user);
            
            var response = new AuthResponseDto
            {
                Token = token,
                User = new UserDto
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    CreatedAt = user.CreatedAt
                }
            };
            
            return Ok(response);
        }
        
        /// <summary>
        /// Authenticates a user with email and password credentials.
        /// </summary>
        /// <param name="signInDto">User login credentials containing email and password</param>
        /// <returns>Authentication response with JWT token and user information</returns>
        /// <exception cref="UnauthorizedObjectResult">Thrown when credentials are invalid</exception>
        /// <exception cref="BadRequestObjectResult">Thrown when validation fails</exception>
        [HttpPost("signin")]
        public async Task<IActionResult> SignIn([FromBody] SignInDto signInDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            // Find user
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == signInDto.Email);
            if (user == null)
                return Unauthorized(new { message = "Invalid email or password" });
            
            // Verify password
            if (!_passwordService.VerifyPassword(signInDto.Password, user.PasswordHash))
                return Unauthorized(new { message = "Invalid email or password" });
            
            // Generate token
            var token = _jwtService.GenerateToken(user);
            
            var response = new AuthResponseDto
            {
                Token = token,
                User = new UserDto
                {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    CreatedAt = user.CreatedAt
                }
            };
            
            return Ok(response);
        }
        
        /// <summary>
        /// Signs out the current user. For JWT authentication, this is handled client-side.
        /// </summary>
        /// <returns>Success message indicating the user has been signed out</returns>
        [HttpPost("signout")]
        public new IActionResult SignOut()
        {
            // For JWT, signout is handled client-side by removing the token
            // In a production app, you might want to implement token blacklisting
            return Ok(new { message = "Successfully signed out" });
        }
    }
}