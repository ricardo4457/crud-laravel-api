
# **Laravel CRUD API with Vue Frontend**

This full-stack project combines a Laravel API with a Vue 3 frontend (Vite) to implement robust CRUD operations, user authentication, CSV export, and activity logging.

---

<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
</p>

---

## **Features**

- Full RESTful CRUD for user tasks.
- Auth system (register/login/logout) using Laravel Sanctum.
- CSV export functionality for tasks.
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

## **Backend Setup (Laravel)**

```bash
git clone https://github.com/ricardo4457/crud-laravel-api.git
cd  crud-laravel-api
cd  backend
composer install
cp .env.example .env
php artisan key:generate
# Update DB credentials in .env
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

## **Laravel + Vue Integration**

### Sanctum Auth 

For cookie-based login:

```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

Make sure Vue sends credentials:

```js
axios.defaults.withCredentials = true;
```

---

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
- `frontend/src/store/`: Pinia && Axios instance & API calls
- `frontend/src/components/`: UI Components

---

## **API Routes**

### Public

- `POST /api/register`
- `POST /api/login`

### Protected (auth:sanctum)

- `POST /api/logout`
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/{id}`
- `DELETE /api/tasks/{id}`
- `GET /api/tasks/export`

---

## **Sample API Request**

### Register

```json
POST /api/register
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

---

## **Activity Logging**

- Logs user actions in `activity_log` table.
- Configured via `config/activitylog.php`.
- Uses: `Spatie\Activitylog\Models\Activity`.

---

## **Frontend Authentication Logic**

- Auth token is stored in localStorage.
- Routes are protected via navigation guards.
- Axios handles all API communication.
- On login/register, token is saved and used for future requests.

---

## **Roadmap**

- [x] Laravel CRUD for tasks
- [x] Vue 3 SPA with auth
- [ ] CSV export from frontend
- [x] Activity logging
- [x] Search/filter UI
- [x] Pagination support
- [ ] Role-based access control
- [ ] Logs

---