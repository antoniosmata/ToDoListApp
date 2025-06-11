<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h3 align="center">Personal Task Manager</h3>

  <p align="center">
    A full-stack web application for managing personal tasks with user authentication
    <br />
    <a href="#api-endpoints"><strong>Explore the API docs »</strong></a>
    <br />
    <br />
    <a href="http://localhost:3000">View Demo</a>
    ·
    <a href="https://github.com/your-username/task-manager/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/your-username/task-manager/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#features">Features</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#architecture">Architecture</a>
      <ul>
        <li><a href="#project-structure">Project Structure</a></li>
      </ul>
    </li>
    <li>
      <a href="#environment-variables">Environment Variables</a>
    </li>
    <li>
      <a href="#security">Security</a>
    </li>
    <li>
      <a href="#database-schema">Database Schema</a>
    </li>
    <li>
      <a href="#api-endpoints">API Endpoints</a>
    </li>
    <li><a href="#troubleshooting">Troubleshooting</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

A modern, full-stack task management application built with ASP.NET Core and React. This application provides secure user authentication, comprehensive task management capabilities, and a responsive design that works seamlessly across all devices.

The project demonstrates best practices in full-stack development, including JWT authentication, RESTful API design, containerization with Docker, and modern React patterns with TypeScript.

### Features

- **User Authentication**: Secure sign up, sign in, and sign out with JWT tokens
- **Task Management**: Create, read, update, and delete personal tasks
- **Task Categories**: Organize tasks by Work, Personal, or Other categories
- **Task Filtering**: Filter tasks by category for better organization
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Optimistic UI updates for smooth user experience
- **Secure**: Password hashing with bcrypt and JWT-based authentication

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![ASP.NET Core][ASP.NET-shield]][ASP.NET-url]
* [![React][React.js]][React-url]
* [![TypeScript][TypeScript-shield]][TypeScript-url]
* [![PostgreSQL][PostgreSQL-shield]][PostgreSQL-url]
* [![Docker][Docker-shield]][Docker-url]
* [![JWT][JWT-shield]][JWT-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Before running this application, make sure you have the following installed:

* [Docker](https://docs.docker.com/get-docker/) (version 20.x or higher)
* [Docker Compose](https://docs.docker.com/compose/install/) (version 2.x or higher)
* [Git](https://git-scm.com/) for cloning the repository

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/your-username/task-manager.git
   cd task-manager
   ```

2. Configure environment variables
   ```sh
   cp .env.example .env
   ```
   
   **Important**: Update the passwords and secrets in your `.env` file before running the application.

3. Run with Docker Compose
   ```sh
   docker-compose up --build
   ```

4. Access the application
   - **Frontend Application**: [http://localhost:3000](http://localhost:3000)
   - **Backend API**: [http://localhost:5001](http://localhost:5001)
   - **API Documentation (Swagger)**: [http://localhost:5001/swagger](http://localhost:5001/swagger)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ARCHITECTURE -->
## Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (React)       │◄──►│   (ASP.NET)     │◄──►│   (PostgreSQL)  │
│   Port: 3000    │    │   Port: 5001    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Services

1. **Frontend (React + TypeScript)**
   - Serves the user interface
   - Handles authentication state
   - Communicates with backend via REST API
   - Responsive design for all screen sizes

2. **Backend (ASP.NET Core)**
   - REST API with authentication endpoints
   - Task CRUD operations with user ownership
   - JWT token generation and validation
   - Secure password hashing with bcrypt

3. **Database (PostgreSQL)**
   - Stores user accounts and tasks
   - Automatic schema creation on startup
   - Data persistence across container restarts

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Project Structure

```
task-manager/
├── backend/
│   └── TaskManagerAPI/
│       ├── Controllers/        # API controllers
│       ├── Models/             # Data models
│       ├── DTOs/               # Data transfer objects
│       ├── Services/           # Business logic services
│       ├── Data/               # Database context
│       └── Dockerfile          # Backend container config
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── auth/          # Authentication components
│   │   │   ├── tasks/         # Task management components
│   │   │   └── shared/        # Shared components
│   │   ├── hooks/             # Custom React hooks
│   │   ├── services/          # API service layer
│   │   ├── types/             # TypeScript interfaces
│   │   └── App.css            # CSS styles
│   ├── Dockerfile             # Frontend container config
│   └── nginx.conf             # Nginx configuration
├── docker-compose.yml         # Multi-service orchestration
└── README.md                  # Project documentation
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ENVIRONMENT VARIABLES -->
## Environment Variables

The application uses environment variables for configuration. Copy `.env.example` to `.env` and update the values:

```bash
# Database Configuration
POSTGRES_DB=taskmanager
POSTGRES_USER=admin
POSTGRES_PASSWORD=your_secure_database_password

# JWT Configuration  
JWT_SECRET_KEY=your_secure_jwt_secret_32_chars_minimum
JWT_ISSUER=TaskManagerAPI
JWT_AUDIENCE=TaskManagerAPI

# Application Configuration
ASPNETCORE_ENVIRONMENT=Development
REACT_APP_API_URL=http://localhost:5001/api
```

**Important**: Update the passwords and secrets in your `.env` file before running the application.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- SECURITY -->
## Security

### Security Features

- **Password Requirements**: Minimum 8 characters
- **Password Hashing**: BCrypt with salt rounds for secure storage
- **JWT Tokens**: 24-hour expiration with automatic refresh handling
- **API Protection**: All task endpoints require valid authentication
- **User Isolation**: Users can only access their own tasks

### Authentication Setup

The application uses JWT (JSON Web Tokens) for authentication. The JWT secret key is configurable through environment variables and must be at least 32 characters long for security.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DATABASE SCHEMA -->
## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tasks Table
```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) DEFAULT 'Other',
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- API ENDPOINTS -->
## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/signin` - Authenticate user and get JWT token
- `POST /api/auth/signout` - Sign out user (client-side token removal)

### Tasks (Requires Authentication)
- `GET /api/tasks` - Get all user's tasks (optional `?category=Work` filter)
- `GET /api/tasks/{id}` - Get specific task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/{id}` - Update existing task
- `DELETE /api/tasks/{id}` - Delete task

### Request/Response Examples

**Sign Up**:
```bash
curl -X POST http://localhost:5001/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "password": "password123"
  }'
```

**Create Task**:
```bash
curl -X POST http://localhost:5001/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Complete project",
    "description": "Finish the task manager application",
    "category": "Work"
  }'
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- TROUBLESHOOTING -->
## Troubleshooting

### Common Issues

**Port Already in Use**:
```bash
# Stop any existing containers
docker-compose down

# Check what's using the port
lsof -i :3000  # or :5001, :5432
```

**Database Connection Issues**:
```bash
# Reset database volume
docker-compose down -v
docker-compose up --build
```

**Frontend Build Errors**:
```bash
# Clear npm cache and rebuild
docker-compose down
docker system prune -f
docker-compose up --build
```

### Logs and Debugging

View container logs:
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

For questions or feedback, please contact me at:
- Antonio Mata (antoniosmata4@gmail.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[contributors-shield]: https://img.shields.io/github/contributors/your-username/task-manager.svg?style=for-the-badge
[contributors-url]: https://github.com/your-username/task-manager/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/your-username/task-manager.svg?style=for-the-badge
[forks-url]: https://github.com/your-username/task-manager/network/members
[stars-shield]: https://img.shields.io/github/stars/your-username/task-manager.svg?style=for-the-badge
[stars-url]: https://github.com/your-username/task-manager/stargazers
[issues-shield]: https://img.shields.io/github/issues/your-username/task-manager.svg?style=for-the-badge
[issues-url]: https://github.com/your-username/task-manager/issues
[license-shield]: https://img.shields.io/github/license/your-username/task-manager.svg?style=for-the-badge
[license-url]: https://github.com/your-username/task-manager/blob/main/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/antoniosmata/

[ASP.NET-shield]: https://img.shields.io/badge/ASP.NET_Core-512BD4?style=for-the-badge&logo=dotnet&logoColor=white
[ASP.NET-url]: https://dotnet.microsoft.com/en-us/apps/aspnet
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TypeScript-shield]: https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[PostgreSQL-shield]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[Docker-shield]: https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
[JWT-shield]: https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white
[JWT-url]: https://jwt.io/
