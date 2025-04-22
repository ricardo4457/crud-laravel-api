# **Laravel CRUD API with Vue Frontend**

This full-stack project combines a Laravel API with a Vue 3 frontend (Vite) to implement robust CRUD operations, user authentication, and activity logging.

---

<p align="center">
  <div style="display: flex; justify-content: center; align-items: center;">
    <a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="350" alt="Laravel Logo"></a>
    <a href="https://vuejs.org" target="_blank"><img src="https://vuejs.org/images/logo.png" width="80" alt="Vue.js Logo"></a>
  </div>
</p>

<p align="center">
  <a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
  <a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
  <a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
  <a href="https://npmjs.com/package/vue"><img src="https://img.shields.io/npm/v/vue" alt="Vue.js Version"></a>
</p>

---

## **Features**

- Full RESTful CRUD for user tasks.
- Auth system (register/login/logout) using Laravel Sanctum.
- Activity logging using `spatie/laravel-activitylog`.
- Reusable API response structure via Traits.
- Vue 3 frontend with Vue Router & Axios.
- Token-based or cookie-based API authentication.
- Basic search and filtering.
- Modular & scalable code architecture.

---

## **Backend Requirements**

- **PHP** >= 8.0
- **Composer**
- **MySQL** or compatible DB
- **Node.js** (for frontend)

---

### Please run apache server and Mysql in my environment i am using xampp

### XAMPP (Windows)

🔗 [Download Latest XAMPP](https://www.apachefriends.org/download.html)

- **Version**: Choose PHP version matching your project (e.g., PHP 8.2+ for modern apps)
- **Size**: ~150MB (varies by version)
- **Requirements**: Windows 7+ (64-bit recommended)

### Laragon (Windows)

🔗 [Download Laragon](https://laragon.org/download/index.html)

- **Options**:
  - **Full**: 85MB (includes all features)
  - **Portable**: 65MB (USB-friendly)
- **Requirements**: Windows 8.1+ (64-bit)

## **Backend Setup (Laravel)**

```bash
git clone https://github.com/ricardo4457/crud-laravel-api.git
cd crud-laravel-api
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

The API will run at: **http://localhost:8000**

---

## **Frontend Setup (Vue 3 + Vite)**

> Vue frontend is located in the `frontend/` directory.

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

Update the API URL (assuming backend is on port 8000):

```env
VITE_API_URL=http://localhost:8000/api
```

### 3. Run the Vue Dev Server

```bash
npm run dev
```

Frontend will run at: **http://localhost:3000**

---

## Database Seeding Overview

### `DatabaseSeeder.php`

The `DatabaseSeeder` seeds the database by creating 10 users, and for each user, it attaches between 1 to 5 tasks. This provides a simple but realistic dataset for testing user-task relationships.

```php
User::factory()
    ->count(10)
    ->has(Task::factory()->count(rand(1, 5)))
    ->create();
```

This method ensures:

- Each user has a variable number of tasks.
- Tasks are properly linked to their respective users.

---

### 👤 `UserFactory.php`

The `UserFactory` defines the blueprint for creating fake users. It uses Laravel's Faker to simulate real user data.

**Generates:**

- `name`: Random full name.
- `email`: Unique, safe email.
- `email_verified_at`: Set to now, assuming verified.
- `password`: Pre-hashed default password (securepassword123).
- `remember_token`: Random string for session persistence.

Useful for:

- Simulating account-based features.
- Testing authentication and user flows.

---

### `TaskFactory.php`

The `TaskFactory` creates realistic task records associated with users.

**Generates:**

- `title`: Short, sentence-style task name.
- `description`: A brief paragraph for task details.
- `due_date`: A date between now and the next month.
- `status`: Randomly chosen from `'pending'`, `'in_progress'`, or `'completed'`.

## **Laravel + Vue Integration**

### Sanctum Auth

For cookie-based login:

```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

## **Project Structure**

### **Backend (Laravel)**

- `app/Http/Controllers/`: Auth & Task management
- `app/Models/`: User, Task
- `app/Traits/HttpResponses.php`: Custom API responses
- `app/Http/Requests/`: Validation logic
- `app/Http/Resources/`: UserResource, TaskResource
- `database/seeders/`: Dummy data for testing

### **Frontend (Vue)**

- `frontend/src/views/`: Auth, Dashboard, Task pages
- `frontend/src/router/`: Authenticated routing
- `frontend/src/helpers/`: Reusable functions
- `frontend/src/stores/`: Pinia && Axios instance & API calls
- `frontend/src/components/`: UI Components

---

## API Routes

### Authentication

| Method | Endpoint        | Description         | Controller & Method           |
| ------ | --------------- | ------------------- | ----------------------------- |
| POST   | `/api/register` | Register a new user | `Api\AuthController@register` |
| POST   | `/api/login`    | Login user          | `Api\AuthController@login`    |
| POST   | `/api/logout`   | Logout user         | `Api\AuthController@logout`   |

### Tasks (Requires Authentication)

| Method    | Endpoint            | Description       | Controller & Method                   |
| --------- | ------------------- | ----------------- | ------------------------------------- |
| GET       | `/api/tasks`        | List all tasks    | `Api\Task\TaskCrudController@index`   |
| POST      | `/api/tasks`        | Create new task   | `Api\Task\TaskCrudController@store`   |
| GET       | `/api/tasks/{task}` | Get specific task | `Api\Task\TaskCrudController@show`    |
| PUT/PATCH | `/api/tasks/{task}` | Update task       | `Api\Task\TaskCrudController@update`  |
| DELETE    | `/api/tasks/{task}` | Delete task       | `Api\Task\TaskCrudController@destroy` |

### Additional Task Endpoints

| Method | Endpoint                 | Description             | Controller & Method                  |
| ------ | ------------------------ | ----------------------- | ------------------------------------ |
| GET    | `/api/tasks/create`      | Show task creation form | `Api\Task\TaskCrudController@create` |
| GET    | `/api/tasks/{task}/edit` | Show task edit form     | `Api\Task\TaskCrudController@edit`   |
| POST   | `/api/tasks/search`      | Search tasks            | `Api\Task\TaskController@search`     |

### System

| Method | Endpoint               | Description                 |
| ------ | ---------------------- | --------------------------- |
| GET    | `/sanctum/csrf-cookie` | Get CSRF token for Sanctum  |
| GET    | `/api/user`            | Get authenticated user data |

## **Sample API Request**

### Register

```json
POST /api/register
{
  "username": "ricardo4457",
  "password": "password123",
  "password_confirmation": "password123"
}
```

---

## **Activity Logging**

- Logs user actions (create/update/delete) for tasks in the `activity_log` table.
- Configured via `config/activitylog.php`.
- Uses: `Spatie\Activitylog\Models\Activity`.
- **Note:** Logging is functional on the backend within the Task model. However, activity logs are not yet displayed or utilized in the frontend interface.

---

## **Frontend Authentication Logic**

- Auth token is stored in Axios header and in DB; both have expiration times.
- Frontend handles logout manually; backend tokens expire after 24 hours.

  - Run schedule to revoke tokens
    ```bash
    php artisan schedule:work
    ```

  ````
  - See all schedule available

  ```bash
  php artisan schedule:list
  ````

- Routes are protected via navigation guards.
- Axios handles all API communication.
- On login/register, token is saved and used for future requests.

## Styles

This project uses the following styling frameworks and resources:

### Bootstrap 5

- **Website**: [Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/)

### Icons - MDI Icons

- **Website**: [Material Design Icons](https://pictogrammers.com/library/mdi/)

## **Roadmap**

- [x] Laravel CRUD for tasks
- [x] Vue 3 SPA with auth
- [x] Activity logging
- [x] Search/filter UI
- [x] Pagination support
- [ ] Logs displayed in frontend
