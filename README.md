
<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew`enter code here`/Best-README-Template/pull/73 -->
<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->
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
    <li><a href="#design">Design</a></li>
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

This is a to-do list app! I wanted to create a grounding experience for the user, so I incorporated lots of earthy-tones to provide a more relaxing experience while you complete your tasks.

<img width="1440" alt="Screenshot 2025-06-13 at 9 26 33 AM" src="https://github.com/user-attachments/assets/5ffbb4a4-f8d8-4951-9937-65051da50e75" />

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

Before running this application, make sure you have the following installed:

* [Docker](https://docs.docker.com/get-docker/) (version 20.x or higher)
* [Docker Compose](https://docs.docker.com/compose/install/) (version 2.x or higher)
* [Git](https://git-scm.com/) for cloning the repository

### Installation

1. Clone the repository
```sh
   git clone https://github.com/antoniosmata/ToDoListApp
   cd TaskManager
   ```

2. Configure environment variables

   **Important**: Create the `.env` file before running the application.

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

<p align="right">(<a href="#readme-top">back to top</a>)</p>

3. Run with Docker Compose
```sh
 docker-compose up --build
   ```

   or

```sh
  docker-compose down -v 
  docker-compose build --no-cache 
  docker-compose up
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

5. Access the application
   - **Frontend Application**: [http://localhost:3000](http://localhost:3000)
   - **Backend API**: [http://localhost:5001](http://localhost:5001)
   - **API Documentation (Swagger)**: [http://localhost:5001/swagger](http://localhost:5001/swagger)
  
   - When you first load up, ensure you do not have browser cache directing you to http://localhost:3000/signup. The user flow should start from http://localhost:3000, but
   - at the moment browser cache may interfere with that.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Built With

* [![ASP.NET Core][ASP.NET-shield]][ASP.NET-url]
* [![React][React.js]][React-url]
* [![TypeScript][TypeScript-shield]][TypeScript-url]
* [![PostgreSQL][PostgreSQL-shield]][PostgreSQL-url]
* [![Docker][Docker-shield]][Docker-url]
* [![JWT][JWT-shield]][JWT-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- DESIGN -->
## Design

### Design System - Figma

**🎨 View the complete design system and prototypes:**
- **[Figma Design File](https://www.figma.com/proto/Xelk8dJcGCfFNGfSAeRxEf/Task-Manager?page-id=0%3A1&node-id=7-3&starting-point-node-id=7%3A3&show-proto-sidebar=1&t=NNV5q2ILFMCmyIXM-1)** - Interactive prototypes, component library, and design specifications

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Features

- **User Authentication**: Secure sign up, sign in, and sign out with JWT tokens
- **Task Management**: Create, read, update, and delete personal tasks
- **Task Categories**: Organize tasks by Work, Personal, or Other categories
- **Task Filtering**: Filter tasks by category for better organization
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Optimistic UI updates for smooth user experience
- **Secure**: Password hashing with bcrypt and JWT-based authentication
- **Page Redirect**: 404 and odd URL re-directs
- **User Onboarding**: At the start of the app, the user is greeted with company propoganda (branding!).

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
TaskManager/
├── README.md                   # Project documentation
├── docker-compose.yml          # Multi-service orchestration
├── backend/
│   ├── Dockerfile             # Backend container config
│   ├── TaskManagerAPI.csproj  # .NET project file
│   ├── appsettings.json       # Application configuration
│   ├── appsettings.Development.json
│   ├── Properties/
│   │   └── launchSettings.json
│   └── src/
│       ├── Program.cs         # Application entry point
│       ├── Controllers/       # API controllers
│       │   ├── AuthController.cs
│       │   └── TasksController.cs
│       ├── Models/            # Data models
│       │   ├── User.cs
│       │   └── TaskItem.cs
│       ├── DTOs/              # Data transfer objects
│       │   ├── AuthDTOs.cs
│       │   └── TaskDTOs.cs
│       ├── Services/          # Business logic services
│       │   ├── JwtService.cs
│       │   └── PasswordService.cs
│       └── Data/              # Database context
│           └── AppDbContext.cs
└── frontend/
    ├── Dockerfile             # Frontend container config
    ├── nginx.conf             # Nginx configuration
    ├── package.json           # Node.js dependencies
    ├── tsconfig.json          # TypeScript configuration
    ├── build/                 # Production build output
    ├── public/                # Static assets
    │   ├── index.html
    │   ├── manifest.json
    │   ├── stream.mp4         # Background video asset
    │   ├── beach.mp4          # Alternative video asset
    │   └── favicon.ico
    └── src/
        ├── App.tsx            # Main application component
        ├── index.tsx          # Application entry point
        ├── index.css          # Global styles
        ├── components/        # React components (fully JSDoc documented)
        │   ├── auth/          # Authentication flow
        │   │   ├── AnimatedLogin.tsx     # Multi-phase login experience
        │   │   ├── AnimatedSignUp.tsx    # Video background signup
        │   │   ├── SignInForm.tsx        # Login form with validation
        │   │   └── SignUpForm.tsx        # Registration form
        │   ├── onboarding/    # User onboarding experience
        │   │   ├── OnboardingFlow.tsx    # Main onboarding controller
        │   │   ├── OnboardingStep1.tsx   # Feature introduction steps
        │   │   ├── OnboardingStep2.tsx
        │   │   ├── OnboardingStep3.tsx
        │   │   ├── ProgressIndicator.tsx # Progress tracking
        │   │   └── SplashScreen.tsx      # App splash screen
        │   ├── dashboard/     # Main dashboard interface
        │   │   ├── TaskDashboard.tsx     # Primary dashboard view
        │   │   ├── DashboardHeader.tsx   # Search and navigation
        │   │   ├── DashboardSidebar.tsx  # Category filtering
        │   │   ├── TaskCard.tsx          # Individual task display
        │   │   └── StatusColumn.tsx      # Kanban-style columns
        │   ├── tasks/         # Task management
        │   │   ├── TaskForm.tsx          # Create/edit task form
        │   │   ├── TaskItem.tsx          # Task list item
        │   │   └── TaskList.tsx          # Complete task interface
        │   └── shared/        # Reusable components
        │       ├── Header.tsx            # Application header
        │       ├── ProtectedRoute.tsx    # Route authentication
        │       └── VideoBackground.tsx   # Fullscreen video bg
        ├── routing/           # Navigation system
        │   ├── RouteGuard.tsx # Master routing controller
        │   ├── routeConfig.ts # Route configuration
        │   └── guards/        # Route protection
        │       ├── AuthGuard.tsx         # Authentication guard
        │       ├── OnboardingGuard.tsx   # Onboarding completion guard
        │       └── NotFoundGuard.tsx     # 404 handling
        ├── hooks/             # Custom React hooks
        │   ├── useAuth.tsx    # Authentication state management
        │   └── useRouting.tsx # Navigation utilities
        ├── services/          # API communication
        │   └── api.ts         # Complete API service layer
        ├── types/             # TypeScript definitions
        │   └── index.ts       # All application interfaces
        ├── utils/             # Utility functions
        │   └── validation.ts  # Form validation logic
        └── assets/            # Application assets
            └── stream.mp4     # Video background asset
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- SECURITY -->
## Security

### Security Features

- **Password Requirements**: Minimum 8 characters, 1 special, 1 capital, 1 number
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

NPM was down recently. Check theur status here: https://status.npmjs.org/ 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Bugs -->
## Known Bugs

The sign in page reloads too quickly when the incorrect password is entered. 
Step 1 from the oboarding tasks may pre-load too quickly, flashing before playing the animation effect

This will be patched in a future update. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Future -->
## Future Updates

In the future, I would like users to be able to add due dates and sort better by to be completed, in progress, and done.
I would also like to add password reset functionality.
When hovering over the cards in the dashboard, I would like to play with the color scheme there more as well. 
I would like to add a calendar page to visually display due dates.

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
