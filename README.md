# MERN Furniture Shop

A full-stack furniture e-commerce web application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). This project is currently under development as part of my software engineering internship preparation and portfolio development.

---

## Project Overview

MERN Furniture Shop is an online furniture shopping platform where users can browse products, manage carts, place orders, and securely authenticate accounts. The application also includes an admin dashboard for managing products, users, and orders.

---

## Features

### Customer Features
- User registration and login using JWT authentication
- Browse furniture products by category
- Search and filter products
- Add products to cart and wishlist
- Product detail page with images and descriptions
- Order placement and order tracking
- Product reviews and ratings
- Responsive user interface for desktop and mobile devices

### Admin Features
- Add, update, and delete products
- Manage customer orders
- Upload product images
- Monitor sales and product inventory

---

## Tech Stack

| Category | Technology |
|----------|-------------|
| Frontend | React.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT (JSON Web Token) |
| State Management | Redux Toolkit |
| Image Uploads | Cloudinary |
| Payment Integration | Stripe |
| Version Control | Git & GitHub |

---

## Project Status

🚧 Ongoing Project

Current Progress:
- [x] Repository setup
- [x] Backend folder structure
- [x] Frontend folder structure
- [x] MongoDB configuration
- [ ] Authentication system
- [ ] Product management APIs
- [ ] Shopping cart functionality
- [ ] Payment integration
- [ ] Admin dashboard
- [ ] Deployment

---

## Installation Guide

### 1. Clone the Repository

```bash
git clone https://github.com/Nnavodya/MERN-furniture-shop.git
cd MERN-FurnitureShop
```

---

### 2. Install Backend Dependencies

```bash
cd server
npm install
```

---

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

---

### 4. Create Environment Variables

Create a `.env` file inside the `server` folder and add:

```env
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

### 5. Start the Backend Server

```bash
cd server
npm start
```

---

### 6. Start the Frontend Application

```bash
cd client
npm run dev
```

---

### 7. Open in Browser

```txt
http://localhost:5173
```

---

## Folder Structure

```txt
MERN-furniture-shop/
│
├── client/                 # React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── redux/
│       └── assets/
│
├── server/                 # Node.js backend
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
│
├── README.md
└── .gitignore
```

---

## Learning Objectives

This project helps me improve my skills in:

- Full-stack MERN development
- REST API development
- JWT authentication and authorization
- MongoDB database management
- Responsive frontend design
- Git and GitHub collaboration
- E-commerce application architecture

---

## Future Improvements

- Online payment gateway integration
- Product recommendation system
- Order email notifications
- Dark mode support
- Real-time order tracking
- AI-based furniture recommendations

---

## Author

**Nethmi Navodya**

GitHub:  
https://github.com/Nnavodya
