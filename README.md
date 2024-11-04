# Team and Employee Management Application

A web application built with **Next.js** and **MySQL** that manages employees and teams within a company. The app includes authentication and authorization, allowing employees to log in and manage team activities based on permissions.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)

## Features

- **Authentication and Authorization**
  - Employee signup and login system.
  - Protected routes for logged-in users only.
- **Team Management**
  - View all teams and team details.
  - Add and remove team members.
  - Restricted access to team details based on membership.
- **Employee Management** (Optional)
  - List all employees (future enhancement).

## Tech Stack

- **Frontend & Backend**: [Next.js](https://nextjs.org/)
- **Database**: MySQL (local instance or MySQL server)
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Token)
- **Other Libraries**:
  - `mysql2` - for MySQL database connection
  - `bcryptjs` - for password hashing
  - `jsonwebtoken` - for handling authentication tokens

## Getting Started

### Prerequisites

1. **Node.js** (v14 or higher)
2. **MySQL** (v8 or higher)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/team-employee-management.git
    cd team-employee-management
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Configure the `.env` file with your database credentials:

    ```plaintext
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=yourpassword
    DB_NAME=team_management
    JWT_SECRET=your_jwt_secret
    ```

4. Set up the MySQL database:

   - Open your MySQL client and create a database:

     ```sql
     CREATE DATABASE team_management;
     ```

   - Run Sequelize migrations to create tables (or use the provided SQL commands in [Database Schema](#database-schema)).

5. Start the development server:

    ```bash
    npm run dev
    ```

6. Access the application at `http://localhost:3000`.

## Database Schema

### Employees Table

```sql
CREATE TABLE employees (
    employeeId INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
```

### Teams Table

```sql
CREATE TABLE teams (
    teamId INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);
```

### Employee_Teams Table (Join Table)

```sql
CREATE TABLE employee_teams (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employeeId INT,
    teamId INT,
    FOREIGN KEY (employeeId) REFERENCES employees(employeeId) ON DELETE CASCADE,
    FOREIGN KEY (teamId) REFERENCES teams(teamId) ON DELETE CASCADE
);
```

## API Endpoints

### Authentication

- **`POST /api/signup`**: Registers a new employee.
- **`POST /api/signin`**: Logs in an employee and returns a JWT token.

### Teams

- **`GET /api/teams`**: Retrieves a list of all teams.
- **`POST /api/teams/create`**: Creates a new team and adds the creator as a member.
- **`POST /api/teams/:teamId/addMember`**: Adds a member to a team.
- **`DELETE /api/teams/:teamId/remove`**: Removes a member from a team.

## Project Structure

```
├── models/
│   ├── Employee.js         # Sequelize model for Employee
│   ├── Team.js             # Sequelize model for Team
│   └── EmployeeTeams.js    # Sequelize model for join table
├── pages/
│   ├── api/
│   │   ├── signin.js       # Login API
│   │   ├── signup.js       # Signup API
│   │   ├── teams/
│   │   │   ├── index.js    # Team list API
│   │   │   └── create.js   # Create team API
│   ├── _middleware.js      # Middleware for protected routes
│   └── index.js            # Main page for the app
├── db.js                   # MySQL connection setup
└── .env                    # Environment variables
```

## Screenshots

*(Add screenshots of your app here)*

## Future Enhancements

- Add employee profile and editing capabilities.
- Implement role-based access control (e.g., admin vs regular user).
- Enhanced team and employee search functionality.
- Build a dashboard for managers to oversee all teams and members.

---

## License

MIT License.
