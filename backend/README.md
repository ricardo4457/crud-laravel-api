# **Laravel CRUD API**

This is an API project developed in Laravel that implements CRUD operations (Create, Read, Update, Delete) to manage resources. The project uses authentication, CSV data export, activity logging, and follows development best practices.

---

<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## **Features**

- CRUD operations to manage resources.
- User task export in CSV format.
- User authentication.
- Activity logging with the `spatie/laravel-activitylog` package.
- Modular and reusable structure using Traits.
- Automated tests to ensure code quality.

---

## **Requirements**

Make sure the following requirements are installed on your environment:

- **PHP** >= 8.0  
- **Composer**  
- **MySQL** or another compatible database  

---

## **Project Setup**

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/api-laravel-crud.git
cd api-laravel-crud
```

### 2. Install Dependencies
Install PHP dependencies:
```bash
composer install
```

### 3. Configure the `.env` File
Copy the example file and configure your environment variables:
```bash
cp .env.example .env
```

Edit the `.env` file to include your database settings:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

### 4. Generate Application Key
```bash
php artisan key:generate
```

---

### 5. Run Migrations and Seeders
```bash
php artisan migrate --seed
```

### 6. Serve the Application  
Access the app at http://localhost:8000.
```bash
php artisan serve
```

---

## **Project Structure**

### **Controllers**
- **`AuthController`**: Handles user authentication (registration, login, logout).
- **`TaskCrudController`**: Handles CRUD operations for tasks.
- **`TaskController`**: Includes features like task export in CSV format.

### **Models**
- **`User`**: Represents system users.
- **`Task`**: Represents tasks associated with users.

### **Traits**
- **`HttpResponses`**: Provides reusable methods for standardized JSON responses (`success` and `error`).

### **Requests**
- **`RegisterRequest`**: Validates user registration data.
- **`LoginRequest`**: Validates login credentials.

### **Resources**
- **`UserResource`**: Formats the user data output.
- **`TaskResource`**: Formats the task data output.

### **Seeders**
- **`UserSeeder`**: Populates the users table with initial data.
- **`TaskSeeder`**: Populates the tasks table with initial data.

---

## **API Routes**

### **Public Routes**
- **`POST /register`**: Registers a new user.
- **`POST /login`**: Logs in a user.

### **Protected Routes (auth:sanctum)**
- **`POST /logout`**: Logs out the authenticated user.

### **Example: Register a User**
**Endpoint**: `POST /register`

**Request Payload**:
```json
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "password_confirmation": "password123"
}
```

---

## **Activity Logging**

The project uses the `spatie/laravel-activitylog` package to log system activities.

### **Configuration**
- **Table**: `activity_log`
- **Model**: `Spatie\Activitylog\Models\Activity`

### **Custom Configuration**
- Config file: `config/activitylog.php`
- Logs are stored in the database by default.

---

## **Composer Dependencies**

### **Key Dependencies**
- **`laravel/sanctum`**: Token-based authentication.
- **`spatie/laravel-activitylog`**: Activity logging.
- **`spatie/simple-excel`**: CSV file handling.

---

## **Roadmap**

The following are planned improvements and features for the project:

- [x] **CRUD Operations for Tasks**: Implement basic Create, Read, Update, and Delete functionality for tasks.
- [x] **Auth User**: Add user registration, login, and logout functionality.
- [x] **CSV Export**: Enable exporting user tasks in CSV format.
- [x] **Activity Logging**: Log system activities using the `spatie/laravel-activitylog` package.
- [x] **Search and Filters**: Implement search and filtering functionality for tasks.

---
