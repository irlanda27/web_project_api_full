🌎 Around the U.S. — Full Stack Application
A full-stack web application for sharing and exploring photos of beautiful places across the United States. Built with React + Vite frontend and Node.js + Express + MongoDB backend.
About the Project
"Around the U.S." is an interactive photo-sharing platform where users can:

Create an account and log in securely
Share photos of their favorite places
Like and unlike other users' photos
Customize their profile information and avatar
Delete their own cards
This project demonstrates a complete full-stack implementation with secure authentication, RESTful API design, and modern React patterns.
Features
🔐 Authentication & Security
User registration with email validation
Secure login with JWT tokens (7-day expiration)
Password hashing with bcrypt
Protected routes requiring authentication
Rate limiting to prevent brute force attacks
Helmet.js for HTTP security headers
CORS configuration for cross-origin requests
👤 User Management
View and edit profile information
Update profile avatar
Get current user data
View all registered users
🃏 Card Management
Create new place cards with image and title
View all cards from all users
Like/unlike cards (toggle functionality)
Delete your own cards
Cards sorted by creation date
🎨 Frontend Features
Responsive design (mobile, tablet, desktop)
Modern React 19 with hooks
Context API for global state management
Form validation with visual feedback
Loading states and error handling
Smooth popup animations
Tech Stack
Frontend
Technology	Purpose
React 19	UI library with hooks
Vite 7	Build tool and dev server
React Router DOM 7	Client-side routing
Context API	Global state management
CSS3 + BEM	Styling methodology
LocalStorage	JWT token persistence
