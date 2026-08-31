# Employee Management System

Production-grade Employee Management System with in-memory storage (no external database required).

## Features

- Employee CRUD with advanced search, filter, sort and pagination
- Leave management (apply, approve, reject, balance)
- Attendance tracking
- Department hierarchy
- Dashboard statistics and multiple analytical reports
- Role-based concepts (Admin / HR / Manager / Employee)
- Large-scale mock data generator (thousands of employees)
- REST API backend (Node.js + Express)
- React frontend components and pages

## Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: React (component library structure)
- **Storage**: In-memory (no database)
- **Language**: JavaScript

## Requirements

- Node.js 18+ 
- npm 9+

## Installation

```bash
# Clone / extract the project
cd employee-management

# Backend
cd backend
npm install
```

## Running the Backend

```bash
cd backend
npm start
```

Server starts at `http://localhost:5000`.

On first start it automatically generates ~1500 employee records plus related leave and attendance data.

### Useful API endpoints

- `GET  /api/health` – health check
- `GET  /api/dashboard/stats` – dashboard statistics
- `GET  /api/employees` – list employees (supports query params)
- `GET  /api/employees/:id` – employee detail
- `POST /api/employees` – create employee
- `PUT  /api/employees/:id` – update employee
- `DELETE /api/employees/:id` – delete employee
- `GET  /api/leaves` – list leaves
- `POST /api/leaves` – apply leave
- `GET  /api/departments` – department list + hierarchy
- `GET  /api/meta` – all constants (statuses, leave types, roles…)
- `POST /api/admin/generate-data` – regenerate large dataset `{ "count": 2500 }`

## Scripts

```bash
cd backend
npm start          # start production server
npm run dev        # start with nodemon (if installed)
npm run generate-data  # run data generator CLI
```

## Project Structure

```
employee-management/
├── backend/
│   ├── package.json
│   └── src/
│       ├── server.js
│       ├── constants/
│       ├── data/          # store + large data generator
│       ├── services/      # business logic
│       ├── controllers/
│       ├── validators/
│       ├── helpers/
│       ├── reports/
│       └── ...
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── ...
├── tests/
└── README.md
```

## Notes

- No external database is used; all data lives in process memory.
- Data is re-generated on each server start if the store is empty.
- This is a self-contained prototype suitable for demos and evaluation.

## License

Proprietary. All rights reserved.

## Frontend Components Updates
