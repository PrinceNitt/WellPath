# Health Scout

Health Scout is a full-stack web application for booking and managing appointments at health centers and labs. It features a modern frontend built with React and Tailwind CSS, and a backend powered by Node.js and Express, with MongoDB for data storage.

## Features

- User authentication and registration
- Browse and search health centers/labs
- Book, view, and manage appointments
- Leave reviews and feedback for centers
- Responsive and modern UI
- Admin and center dashboards

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT

## Project Structure

```
Health_Scout-main/
├── backend/
│   ├── index.js
│   ├── package.json
│   ├── auth/
│   ├── controllers/
│   ├── models/
│   └── routes/
└── frontend/
    ├── src/
    ├── public/
    ├── package.json
    └── ...
```

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add your MongoDB URI and JWT secret:
   ```env
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm run dev
   ```

The frontend will typically run on `http://localhost:5173` and the backend on `http://localhost:5000` (or as configured).

## Usage
- Register as a user or health center
- Log in to access your dashboard
- Browse centers, book appointments, and leave reviews

## Folder Details
- **backend/**: Express server, API routes, controllers, models
- **frontend/**: React app, components, pages, assets

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.
