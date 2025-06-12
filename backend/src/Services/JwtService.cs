using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Services
{
    /// <summary>
    /// Provides JWT token generation and validation functionality.
    /// </summary>
    public interface IJwtService
    {
        /// <summary>
        /// Generates a JWT token for the specified user.
        /// </summary>
        /// <param name="user">The user to generate a token for</param>
        /// <returns>JWT token string with 24-hour expiration</returns>
        string GenerateToken(User user);
        
        /// <summary>
        /// Validates a JWT token and extracts claims.
        /// </summary>
        /// <param name="token">The JWT token to validate</param>
        /// <returns>ClaimsPrincipal if valid, null if invalid or expired</returns>
        ClaimsPrincipal? ValidateToken(string token);
    }
    
    /// <summary>
    /// Implementation of JWT token generation and validation using HMAC SHA-256 signing.
    /// Tokens expire after 24 hours and include user ID and email claims.
    /// </summary>
    public class JwtService : IJwtService
    {
        private readonly IConfiguration _configuration;
        
        public JwtService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        
        /// <summary>
        /// Generates a JWT token for the specified user with embedded claims.
        /// Token includes user ID, email, and expires in 24 hours.
        /// </summary>
        /// <param name="user">The user to generate a token for</param>
        /// <returns>Signed JWT token string</returns>
        /// <exception cref="InvalidOperationException">Thrown when JWT configuration is missing</exception>
        public string GenerateToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"] ?? throw new InvalidOperationException("JWT Secret Key not configured")));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim("userId", user.Id.ToString())
            };
            
            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"] ?? "TaskManagerAPI",
                audience: _configuration["JwtSettings:Audience"] ?? "TaskManagerAPI",
                claims: claims,
                expires: DateTime.UtcNow.AddHours(24),
                signingCredentials: credentials
            );
            
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        
        /// <summary>
        /// Validates a JWT token signature, expiration, and claims.
        /// </summary>
        /// <param name="token">The JWT token string to validate</param>
        /// <returns>ClaimsPrincipal containing user claims if valid, null if invalid</returns>
        public ClaimsPrincipal? ValidateToken(string token)
        {
            try
            {
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"] ?? throw new InvalidOperationException("JWT Secret Key not configured")));
                
                var tokenHandler = new JwtSecurityTokenHandler();
                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateIssuer = true,
                    ValidIssuer = _configuration["JwtSettings:Issuer"] ?? "TaskManagerAPI",
                    ValidateAudience = true,
                    ValidAudience = _configuration["JwtSettings:Audience"] ?? "TaskManagerAPI",
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.Zero
                };
                
                return tokenHandler.ValidateToken(token, validationParameters, out _);
            }
            catch
            {
                return null;
            }
        }
    }
}