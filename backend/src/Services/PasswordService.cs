using BC = BCrypt.Net.BCrypt;

namespace TaskManagerAPI.Services
{
    /// <summary>
    /// Provides secure password hashing and verification functionality.
    /// </summary>
    public interface IPasswordService
    {
        /// <summary>
        /// Hashes a plain text password using BCrypt with salt.
        /// </summary>
        /// <param name="password">The plain text password to hash</param>
        /// <returns>BCrypt hashed password with salt</returns>
        string HashPassword(string password);
        
        /// <summary>
        /// Verifies a plain text password against a BCrypt hash.
        /// </summary>
        /// <param name="password">The plain text password to verify</param>
        /// <param name="hash">The BCrypt hash to verify against</param>
        /// <returns>True if password matches the hash, false otherwise</returns>
        bool VerifyPassword(string password, string hash);
    }
    
    /// <summary>
    /// Implementation of password hashing and verification using BCrypt.
    /// Uses 12 salt rounds for strong security while maintaining performance.
    /// </summary>
    public class PasswordService : IPasswordService
    {
        /// <summary>
        /// Hashes a plain text password using BCrypt with 12 salt rounds.
        /// </summary>
        /// <param name="password">The plain text password to hash</param>
        /// <returns>BCrypt hashed password with embedded salt</returns>
        public string HashPassword(string password)
        {
            return BC.HashPassword(password, BC.GenerateSalt(12));
        }
        
        /// <summary>
        /// Verifies a plain text password against a stored BCrypt hash.
        /// </summary>
        /// <param name="password">The plain text password to verify</param>
        /// <param name="hash">The stored BCrypt hash to verify against</param>
        /// <returns>True if the password matches the hash, false otherwise</returns>
        public bool VerifyPassword(string password, string hash)
        {
            return BC.Verify(password, hash);
        }
    }
}