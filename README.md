# FurniHub — Full-Stack MERN Furniture E-Commerce Platform

A full-featured furniture e-commerce web application built with the MERN stack, featuring AI-powered room analysis, JWT authentication, an admin dashboard, and Cloudinary image uploads.

---

## 🌐 Live Demo

> Coming soon

---

## ✨ Features

### Customer
- Browse and search furniture by category, price, and rating
- AI-powered Room Analyzer — upload a room photo, get furniture suggestions (Google Gemini Vision API)
- Product detail pages with colour swatches, image gallery, and related products
- Shopping cart with persistent localStorage state
- Wishlist with localStorage persistence
- Multi-step checkout (Shipping → Payment → Review → Order confirmation)
- User authentication — signup, login, JWT session
- My Orders page — view past orders with status tracking
- Account page with admin panel shortcut

### Admin
- Protected admin panel (`/admin/*`) — role-based access control
- Dashboard with real-time stats: total products, orders, users, and revenue
- Product management — add, edit, delete with Cloudinary image upload
- Order management — view all orders, update order status

### Pages
- Home, Products, Product Details, Cart, Checkout
- Sale, About, Contact, Wishlist, My Orders, Account
- Room Analyzer (AI), FAQ, Shipping Policy, Returns & Refunds, Privacy Policy, Terms & Conditions
- 404 Not Found

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, Vite, Tailwind CSS v4 |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas (Mongoose) |
| Auth | JWT, bcryptjs |
| Image Upload | Cloudinary + Multer |
| AI Analysis | Google Gemini Vision API |
| HTTP Client | Axios |
| Icons | React Icons (Tabler) |
| Routing | React Router DOM v7 |

---

## 📁 Project Structure

```
MERN_FurnitureShop/
├── backend/
│   ├── config/          # DB + Cloudinary config
│   ├── controllers/     # Auth, Product, Order logic
│   ├── middleware/       # JWT protect + admin guard
│   ├── models/          # User, Product, Order schemas
│   ├── routes/          # API route definitions
│   ├── seed.js          # Database seed script
│   └── server.js        # Express entry point
└── frontend/
    └── src/
        ├── api/         # Axios instance
        ├── components/  # Shared UI components
        ├── context/     # Cart, Auth, Wishlist contexts
        ├── pages/       # All route pages
        └── App.jsx      # Route definitions
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Cloudinary account
- Google AI Studio API key

### 1. Clone the repository

```bash
git clone https://github.com/Nnavodya/MERN_FurnitureShop.git
cd MERN_FurnitureShop
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/furnihub?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
PORT=5000
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GEMINI_API_KEY=your_gemini_api_key
```

Seed the database with sample products:

```bash
node seed.js
```

Start the backend server:

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd ../frontend
npm install
npm run dev
```

### 4. Open in browser

```
http://localhost:5173
```

---

## 🔐 Admin Access

The first user to sign up is automatically assigned the `admin` role. Navigate to `/admin/dashboard` after logging in.

---

## 📸 Screenshots

> Add screenshots here

---

## 📄 License

This project is for educational and portfolio purposes.