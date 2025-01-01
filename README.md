<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>
<h1 align="center">
  fitness-tracker-app
</h1>
<h4 align="center">Track fitness goals, monitor progress, and share with friends.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-React-blue" alt="React Framework">
  <img src="https://img.shields.io/badge/Frontend-JavaScript,_HTML,_CSS-red" alt="Frontend Technologies">
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="Node.js Backend">
    <img src="https://img.shields.io/badge/Database-SQLite-green" alt="SQLite Database">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/fitness-tracker-app?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/fitness-tracker-app?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/fitness-tracker-app?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
The `fitness-tracker-app` is a web application built as a Minimum Viable Product (MVP) that enables users to track their fitness goals, monitor their progress, and share their achievements with friends. It's designed for fitness enthusiasts who seek an easy-to-use platform for managing their fitness journey. The application uses React for the frontend and Node.js for the backend, with data stored in SQLite.

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| 🔑 | **User Authentication**   | Secure user registration and login functionality using email and password, with JWT for authentication.  |
| 🎯 | **Goal Setting**   | Allows users to set personalized fitness goals, including name, target, unit, and optional start and end dates.      |
| 📈 | **Progress Tracking**| Enables users to log their fitness progress, track values over time, and view progress through charts.   |
| 📊 | **Data Visualization**     | Provides visual representations of user progress using charts, which enhances user understanding of their fitness journey. |
| 🗂️ | **Data Storage**     | Uses SQLite for data storage, offering a simple and lightweight solution for the MVP.      |
| ⚙️ | **RESTful API**  | Provides a RESTful API for the frontend to communicate with the backend server for all data operations.     |
| ⚛️  | **React Frontend**    | The UI is built using React, offering a responsive and dynamic user interface. |
| 🛡️ | **Security**       | Implements token-based authentication and secure password handling to protect user data and privacy. |
| 📱 | **Responsive Design**     | The UI is designed to be responsive, ensuring accessibility across devices.    |
| 🧩 | **Modular Structure** | Organized codebase for easy maintenance and future scalability.      |

## 📂 Structure
```text
 ├── README.md
 ├── package.json
 ├── components
 │   ├── Button.jsx
 │   ├── Input.jsx
 │   ├── Modal.jsx
 │   ├── LoginForm.jsx
 │   ├── SignupForm.jsx
 │   ├── GoalCard.jsx
 │   ├── GoalForm.jsx
 │   ├── GoalList.jsx
 │   ├── ProgressChart.jsx
 │   ├── ProgressInput.jsx
 │   ├── Header.jsx
 │   └── Footer.jsx
 ├── pages
 │   ├── Home.jsx
 │   ├── Dashboard.jsx
 │   ├── Goals.jsx
 │   └── Profile.jsx
 ├── hooks
 │   ├── useAuth.js
 │   └── useFetch.js
 ├── context
 │   └── AuthContext.js
 ├── services
 │   ├── api.js
 │   └── auth.js
 ├── utils
 │   ├── helpers.js
 │   └── validators.js
 ├── styles
 │   └── global.css
 ├── public
 │   ├── index.html
 │   └── favicon.ico
 ├── types
 │   └── index.js
 ├── api
 │   └── index.js
 ├── models
 │   └── index.js
 ├── controllers
 │   └── index.js
 ├── middlewares
 │   └── authMiddleware.js
 ├── config
 │   └── database.js
 ├── tests
 │   ├── components
 │   │   ├── Button.test.js
 │   │   └── GoalForm.test.js
 │   └── services
 │       ├── api.test.js
 │       └── auth.test.js
 ├── constants
 │   └── index.js
 ├── .env
 ├── startup.sh
 └── commands.json
```

## 💻 Installation
> [!WARNING]
> ### 🔧 Prerequisites
> - Node.js v18+
> - npm v8+
> - Basic knowledge of JavaScript and React
> - Familiarity with RESTful APIs

### 🚀 Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/coslynx/fitness-tracker-app.git
   cd fitness-tracker-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create and configure the .env file:
   ```bash
    cp .env.example .env
   ```
   - Update environment variables in `.env` to match your setup.
   - REACT_APP_API_BASE_URL defaults to `http://localhost:8080`.
   - JWT_SECRET needs a secure key.
   - DB_* variables for database connection.

## 🏗️ Usage
### 🏃‍♂️ Running the MVP
1. Start the development server:
   ```bash
   npm start
   ```
2. Access the application:
   - Web interface: `http://localhost:3000`
   - API endpoint: `http://localhost:8080/api`

> [!TIP]
> ### ⚙️ Configuration
> - Customize API base URL in the `.env` file.
> - Set JWT secret for secure authentication in the `.env` file.
> - Modify SQLite database settings in `config/database.js`.
> - Run `npm start` to launch the development server.

### 📚 Examples
Provide specific examples relevant to the MVP's core features:

- 📝 **User Registration**:
  ```bash
  curl -X POST http://localhost:8080/api/signup \
    -H "Content-Type: application/json" \
    -d '{"email": "user@example.com", "password": "securepass123"}'
  ```
- 📝 **User Login**:
  ```bash
  curl -X POST http://localhost:8080/api/login \
    -H "Content-Type: application/json" \
    -d '{"email": "user@example.com", "password": "securepass123"}'
  ```
- 📝 **Setting a Fitness Goal**:
   ```bash
    curl -X POST http://localhost:8080/api/goals \
       -H "Content-Type: application/json" \
       -H "Authorization: Bearer YOUR_JWT_TOKEN" \
        -d '{"name": "Run a Marathon", "target": 42, "unit": "km", "startDate": "2024-01-01", "endDate": "2024-12-31"}'
   ```
- 📝 **Logging Progress**:
    ```bash
    curl -X POST http://localhost:8080/api/progress \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer YOUR_JWT_TOKEN" \
        -d '{"goalId": 1, "value": 5, "date": "2024-01-15"}'
    ```

## 🌐 Hosting
### 🚀 Deployment Instructions
Provide detailed, step-by-step instructions for deploying to a suitable platform.

#### Deploying to a Cloud Provider (e.g., AWS, Google Cloud, or Azure)
1.  **Set up a virtual server**:
   - Provision a virtual machine with Node.js and npm installed.
2.  **Clone the repository**:
   - Use `git clone` to download the project to the server.
3.  **Install dependencies**:
   - Run `npm install` to set up the required packages.
4. **Configure Environment Variables**:
   - Configure the `.env` variables in the hosting environment.
   - Ensure all variables are securely set including database credentials, and JWT secret.
5. **Build the React App**:
    ```bash
     npm run build
    ```
6.  **Start the Application**:
    - Use a process manager like `pm2` or `systemd` to run the Node.js application:
    ```bash
        npm run start
    ```

### 🔑 Environment Variables
Provide a comprehensive list of all required environment variables, their purposes, and example values:
-   `REACT_APP_API_BASE_URL`: Base URL for the API, e.g., `http://localhost:8080` or `https://api.example.com`
-   `JWT_SECRET`: Secret key for JWT token generation, e.g., `thisIsARandomSecretKeyForJWTWhichIsLongEnough`
-  `DB_NAME`: Database name. e.g., `fitness_tracker_db`
-   `DB_HOST`: Host address for the database, e.g., `localhost`
-   `DB_USER`: Database username e.g., `user`
-  `DB_PASSWORD`: Database password, e.g., `password`
- `DB_PORT`: Port number for the database connection, e.g., `5432`

## 📜 API Documentation
### 🔍 Endpoints
Provide a comprehensive list of all API endpoints, their methods, required parameters, and expected responses:

- **POST /api/login**
  - Description: User login and token generation.
  - Body: `{"email": string, "password": string}`
  - Response: `{"user": object, "token": string}`
- **POST /api/signup**
  - Description: User registration and token generation.
  - Body: `{"email": string, "password": string}`
  - Response: `{"user": object, "token": string}`
- **GET /api/goals**
  - Description: Fetch all goals for the authenticated user.
  - Headers: `Authorization: Bearer YOUR_JWT_TOKEN`
  - Response: `[{"id": number, "userId": number, "name": string, "description": string, "target": number, "unit": string, "startDate": date, "endDate": date}]`
- **POST /api/goals**
   - Description: Create a new fitness goal.
   - Headers: `Authorization: Bearer YOUR_JWT_TOKEN`
   - Body: `{"name": string, "description": string, "target": number, "unit": string, "startDate": date, "endDate": date}`
   - Response: `{"id": number, "userId": number, "name": string, "description": string, "target": number, "unit": string, "startDate": date, "endDate": date}`
- **PUT /api/goals/:id**
    - Description: Update an existing goal.
    - Headers: `Authorization: Bearer YOUR_JWT_TOKEN`
    - Body: `{"name": string, "description": string, "target": number, "unit": string, "startDate": date, "endDate": date}`
    - Response: `{"id": number, "userId": number, "name": string, "description": string, "target": number, "unit": string, "startDate": date, "endDate": date}`
- **DELETE /api/goals/:id**
     - Description: Delete a goal.
     - Headers: `Authorization: Bearer YOUR_JWT_TOKEN`
     - Response: `204 No Content`
- **POST /api/progress**
     - Description: Add progress data for a specific goal.
     - Headers: `Authorization: Bearer YOUR_JWT_TOKEN`
     - Body: `{"goalId": number, "value": number, "date": date}`
     - Response: `{"id": number, "goalId": number, "value": number, "date": date}`

### 🔒 Authentication
All protected routes require a valid JWT token, which can be acquired during the login or signup process. Include the token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

### 📝 Examples
Provide examples of API usage, including request and response bodies:

```bash
# Signup user
curl -X POST http://localhost:8080/api/signup \
    -H "Content-Type: application/json" \
    -d '{"email": "testuser@example.com", "password": "securepassword123"}'

# Response
{
    "user": {
        "id": 1,
        "email": "testuser@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
```bash
# Login user
curl -X POST http://localhost:8080/api/login \
    -H "Content-Type: application/json" \
    -d '{"email": "testuser@example.com", "password": "securepassword123"}'

# Response
{
    "user": {
        "id": 1,
        "email": "testuser@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```
```bash
# Create a new goal
curl -X POST http://localhost:8080/api/goals \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer YOUR_JWT_TOKEN" \
    -d '{"name": "Run 5K", "target": 5, "unit": "km", "startDate": "2024-01-01", "endDate": "2024-03-31"}'

# Response
{
    "id": 1,
    "userId": 1,
    "name": "Run 5K",
    "description": null,
    "target": 5,
    "unit": "km",
    "startDate": "2024-01-01T00:00:00.000Z",
    "endDate": "2024-03-31T00:00:00.000Z"
}
```
```bash
# Add progress to a goal
curl -X POST http://localhost:8080/api/progress \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer YOUR_JWT_TOKEN" \
    -d '{"goalId": 1, "value": 2, "date": "2024-01-15"}'
# Response
{
    "id": 1,
    "goalId": 1,
    "value": 2,
    "date": "2024-01-15T00:00:00.000Z"
}
```

> [!NOTE]
> ## 📜 License & Attribution
> 
> ### 📄 License
> This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.
> 
> ### 🤖 AI-Generated MVP
> This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).
> 
> No human was directly involved in the coding process of the repository: `fitness-tracker-app`
> 
> ### 📞 Contact
> For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
> - Website: [CosLynx.com](https://coslynx.com)
> - Twitter: [@CosLynxAI](https://x.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
<img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
<img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
<img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
<img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>