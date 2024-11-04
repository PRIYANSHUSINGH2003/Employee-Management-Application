# Team and Employee Management Application

A web application built with **Next.js** and **MySQL** that manages employees and teams within a company. The app includes authentication and authorization, allowing employees to log in and manage team activities based on permissions.

## Table of Contents

- [Project Objectives](#project-objectives)
- [Project Scope](#project-scope)
- [Technology Stack](#technology-stack)
- [Database Schema](#database-schema)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Project Objectives

Develop a secure, scalable application to:
- Manage employees and teams within a company.
- Enable team creation and member management.
- Restrict access based on team membership.

## Project Scope

The application provides:
- User authentication and authorization.
- Team list view with the ability to create and view team details.
- Team member management, with restricted access for non-members.

## Technology Stack

- **Frontend/Backend**: Next.js (latest stable version)
- **Database**: MySQL (local instance or cloud-hosted)

## Database Schema

The application uses a MySQL relational database with the following tables:

### `employees` Table
| Field      | Type       | Description                         |
|------------|------------|-------------------------------------|
| employeeId | INT        | Primary key, unique employee ID    |
| name       | VARCHAR(100) | Name of the employee               |
| username   | VARCHAR(50)  | Unique username for login         |
| password   | VARCHAR(255) | Hashed password                   |

### `teams` Table
| Field | Type         | Description                |
|-------|--------------|----------------------------|
| teamId | INT        | Primary key, unique team ID |
| name   | VARCHAR(100) | Name of the team           |

### `employee_teams` Table (Join Table)
| Field       | Type       | Description                                  |
|-------------|------------|----------------------------------------------|
| id          | INT        | Primary key                                  |
| employeeId  | INT        | Foreign key referencing `employees.employeeId` |
| teamId      | INT        | Foreign key referencing `teams.teamId`         |

## Installation and Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/team-employee-management.git
   cd team-employee-management
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up MySQL database**:
   - Create a MySQL database (e.g., `team_management`).
   - Update `db.js` with your MySQL credentials.

4. **Run Migrations** (if using Sequelize):
   ```bash
   npx sequelize-cli db:migrate
   ```

5. **Environment Variables**:
   Create a `.env.local` file in the root directory and add the following variables:

   ```bash
   DATABASE_NAME=team_management
   DATABASE_USER=your_db_user
   DATABASE_PASSWORD=your_db_password
   JWT_SECRET=your_jwt_secret
   ```

6. **Run the application**:
   ```bash
   npm run dev
   ```

7. **Access the application**:
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### User Authentication
- **Sign Up**: Users can register with a unique username.
- **Login**: Registered users can log in to access the application.

### Team Management
- **Create Team**: Authenticated users can create a new team and automatically join as the first member.
- **View Teams**: Authenticated users can view all teams and join those they are invited to.
- **Manage Members**: Team members can add or remove other employees from the team.

## API Endpoints

### Authentication
- **Sign Up**: `POST /api/signup`
- **Sign In**: `POST /api/signin`

### Teams
- **List Teams**: `GET /api/teams`
- **Create Team**: `POST /api/teams/create`
- **Add Member**: `POST /api/teams/:teamId/addMember`
- **Remove Member**: `DELETE /api/teams/:teamId/removeMember`

## Features

- **Authentication and Authorization**:
  - Secure login and signup with hashed passwords and JWT authentication.
  - Middleware to protect routes and restrict access based on roles and permissions.
  - Employee signup and login system.
  - Protected routes for logged-in users only.

- **Team List View**:
  - Display all teams and allow team creation.
  - Pre-populated database with sample teams (Dev, Pro, Biz).

- **Team Detail View**:
  - Accessible only to team members.
  - Allows adding and removing members.

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
![image](https://github.com/user-attachments/assets/57cf5295-3898-4a78-a9dc-1e1ea133a8bb)
![image](https://github.com/user-attachments/assets/3bd07d5d-7222-41e5-bfa2-6c457d71b03d)
![image](https://github.com/user-attachments/assets/15777981-6633-4cd0-afaf-a0688b55d015)





## Future Enhancements

- Add employee profile and editing capabilities.
- Implement role-based access control (e.g., admin vs regular user).
- Enhanced team and employee search functionality.
- Build a dashboard for managers to oversee all teams and members.

---
## Contributing

Contributions are welcome! Please submit a pull request or open an issue if you’d like to improve the project.

## License

This project is licensed under the MIT License.

MIT License.
