# 🗂️ MERN Task & Project Management System

A full-featured Task Management platform built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) with role-based authentication and real-time collaboration features.

---
### 🔗 Deployment Link  
The Admin Panel - [https://task-management-client-7ls9.onrender.com/auth](https://task-management-client-7ls9.onrender.com/auth) | The User Panel/Team Member Panel - [https://task-management-admin-hmuk.onrender.com/login](https://task-management-admin-hmuk.onrender.com/login)


---
 🚀 Features

 👥 User Authentication & Authorization (JWT)
- Secure login with **JWT-based authentication** using HTTP-only cookies.
- **Role-based authorization**:
  - **Admin**:
    - Create and manage projects.
    - Assign tasks to team members.
    - Set task priority and status.
  - **Team Members**:
    - View all projects and associated tasks.
    - Update task status.
    - Comment on tasks.

---

 📁 Project Management
- **Admin** can create projects.
- All users (Admin & Team Members) can:
  - View a list of all available projects.
  - Click on a project to view its task list.

---

 ✅ Task Management
- **Admin** assigns tasks to a specific team member.
- Each task includes:
  - `Title`
  - `Description`
  - `Assigned User`
  - `Status` (Pending, In Progress, Done)
  - `Priority` (High, Medium, Low)
- Tasks are categorized under the project they belong to.
- Filter & Sort functionality:
  - Filter by assigned user (My Tasks / All Tasks).
  - Sort by priority, status, or creation date.

---

 💬 Comment System
- All users can comment on any task.
- Comments are stored with timestamps.
- Task detail pages display full comment history.

---

 🔐 API Security & Rate Limiting
- JWT-based authentication (stored in HTTP-only cookies).
- Role-based access control for API endpoints.
- **Rate limiting middleware** to prevent abuse and excessive requests.

--

🛠️ Tech Stack

| Technology | Description |
|------------|-------------|
| **MongoDB** | NoSQL Database for storing users, projects, tasks & comments |
| **Express.js** | Backend framework for building REST APIs |
| **React.js** | Frontend framework for a dynamic SPA experience |
| **Node.js** | Runtime environment for server-side JavaScript |
| **JWT** | Secure authentication and user session management |
| **Mongoose** | ODM for MongoDB interactions |




