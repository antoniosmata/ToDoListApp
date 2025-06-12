using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TaskManagerAPI.Data;
using TaskManagerAPI.DTOs;
using TaskManagerAPI.Models;

namespace TaskManagerAPI.Controllers
{
    /// <summary>
    /// Manages task operations for authenticated users including CRUD operations and filtering.
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;
        
        public TasksController(AppDbContext context)
        {
            _context = context;
        }
        
        /// <summary>
        /// Extracts the current user ID from the JWT token claims.
        /// </summary>
        /// <returns>The authenticated user's ID</returns>
        private int GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst("userId") ?? User.FindFirst(ClaimTypes.NameIdentifier);
            return int.Parse(userIdClaim?.Value ?? "0");
        }
        
        /// <summary>
        /// Retrieves all tasks for the authenticated user with optional category filtering.
        /// </summary>
        /// <param name="category">Optional category filter to limit results</param>
        /// <returns>List of tasks ordered by creation date (newest first)</returns>
        [HttpGet]
        public async Task<IActionResult> GetTasks([FromQuery] string? category = null)
        {
            var userId = GetCurrentUserId();
            
            var query = _context.Tasks.Where(t => t.UserId == userId);
            
            if (!string.IsNullOrEmpty(category))
            {
                query = query.Where(t => t.Category.ToLower() == category.ToLower());
            }
            
            var tasks = await query
                .OrderByDescending(t => t.CreatedAt)
                .Select(t => new TaskDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    Category = t.Category,
                    Completed = t.Completed,
                    CreatedAt = t.CreatedAt,
                    UpdatedAt = t.UpdatedAt
                })
                .ToListAsync();
            
            return Ok(tasks);
        }
        
        /// <summary>
        /// Retrieves a specific task by ID for the authenticated user.
        /// </summary>
        /// <param name="id">The unique identifier of the task</param>
        /// <returns>Task details if found and owned by the current user</returns>
        /// <exception cref="NotFoundObjectResult">Thrown when task doesn't exist or user doesn't own it</exception>
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask(int id)
        {
            var userId = GetCurrentUserId();
            
            var task = await _context.Tasks
                .Where(t => t.Id == id && t.UserId == userId)
                .Select(t => new TaskDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    Category = t.Category,
                    Completed = t.Completed,
                    CreatedAt = t.CreatedAt,
                    UpdatedAt = t.UpdatedAt
                })
                .FirstOrDefaultAsync();
            
            if (task == null)
                return NotFound(new { message = "Task not found" });
            
            return Ok(task);
        }
        
        /// <summary>
        /// Creates a new task for the authenticated user.
        /// </summary>
        /// <param name="createTaskDto">Task creation data including title, description, and category</param>
        /// <returns>Created task with generated ID and timestamps</returns>
        /// <exception cref="BadRequestObjectResult">Thrown when validation fails</exception>
        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] CreateTaskDto createTaskDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var userId = GetCurrentUserId();
            
            var task = new TaskItem
            {
                UserId = userId,
                Title = createTaskDto.Title,
                Description = createTaskDto.Description,
                Category = createTaskDto.Category,
                Completed = false,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();
            
            var taskDto = new TaskDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                Category = task.Category,
                Completed = task.Completed,
                CreatedAt = task.CreatedAt,
                UpdatedAt = task.UpdatedAt
            };
            
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, taskDto);
        }
        
        /// <summary>
        /// Updates an existing task for the authenticated user.
        /// </summary>
        /// <param name="id">The unique identifier of the task to update</param>
        /// <param name="updateTaskDto">Updated task data including title, description, category, and completion status</param>
        /// <returns>Updated task information</returns>
        /// <exception cref="NotFoundObjectResult">Thrown when task doesn't exist or user doesn't own it</exception>
        /// <exception cref="BadRequestObjectResult">Thrown when validation fails</exception>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] UpdateTaskDto updateTaskDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            
            var userId = GetCurrentUserId();
            
            var task = await _context.Tasks
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
            
            if (task == null)
                return NotFound(new { message = "Task not found" });
            
            task.Title = updateTaskDto.Title;
            task.Description = updateTaskDto.Description;
            task.Category = updateTaskDto.Category;
            task.Completed = updateTaskDto.Completed;
            task.UpdatedAt = DateTime.UtcNow;
            
            await _context.SaveChangesAsync();
            
            var taskDto = new TaskDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                Category = task.Category,
                Completed = task.Completed,
                CreatedAt = task.CreatedAt,
                UpdatedAt = task.UpdatedAt
            };
            
            return Ok(taskDto);
        }
        
        /// <summary>
        /// Deletes a task for the authenticated user.
        /// </summary>
        /// <param name="id">The unique identifier of the task to delete</param>
        /// <returns>No content on successful deletion</returns>
        /// <exception cref="NotFoundObjectResult">Thrown when task doesn't exist or user doesn't own it</exception>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var userId = GetCurrentUserId();
            
            var task = await _context.Tasks
                .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
            
            if (task == null)
                return NotFound(new { message = "Task not found" });
            
            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();
            
            return NoContent();
        }
    }
}