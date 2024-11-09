# StayEase MERN Project

This project is a full-stack built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application allows users to book accommodations, list their accommodation, and explore available rentals.

## Features

- **User Authentication:** Sign up, log in, and log out using JWT authentication.
- **Booking System:** Users can book available accomodations for specific dates.
- **User Profiles:** Manage personal information, view booking list, and accomodation list.
- **Image Upload:** Upload accomodation images using multer on local system.

## Tech Stack

- **Frontend:**
  - React.js
  - React Router (for routing)
  - Axios (for API calls)
  
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
  - JWT for authentication

## Installation

### Prerequisites

Ensure you have the following installed on your machine:

- Node.js (v14+)
- MongoDB

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/airbnb-mern-project.git
   cd airbnb-mern-project
2. **Install dependencies:**
   ```bash
   cd backend
   npm install
   
   cd ../frontend
   npm install

3. **Set up environment variables:**
    - PORT=3000
    - MONGO_URI=your_mongodb_uri
    - JWT_SECRET=your_jwt_secret
         
5. **Run the application:**
   ```bash
   cd backend
   npm start

   cd ../frontend
   npm run dev

### Environment Variables
Ensure that you have set the following environment variables in your .env file:

- **PORT:** The port on which the backend server will run (default is 3000).

- **MONGO_URI:** The MongoDB connection string.

- **JWT_SECRET:** Secret key for signing JWT tokens.

### Usage
- **Sign Up/Log In:** Create an account or log in with an existing account.
- **Explore Listings:** Browse through available accommodation and view accomodation details.
- **Book a property:** Select dates and book an accommodation.
- **Manage Listings:** If you are a host, you can add, edit, or delete your accommodations listings.
- **User Profile:** View your profile, check booking list, and manage your accommodations.

### Contributing
- Contributions are welcome! Please submit a pull request or open an issue to discuss any changes or suggestions.


   

