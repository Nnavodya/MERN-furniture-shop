# FurniHub 🛋️

A full-stack MERN e-commerce platform for furniture shopping, featuring AI-powered room analysis, JWT authentication, an admin dashboard, and Cloudinary image uploads.

---

## 🚀 Live Features

- **Product Catalog** — Browse, search, and filter by category
- **AI Room Analyzer** — Upload a room photo; Google Gemini Vision suggests matching furniture
- **Shopping Cart** — Add products, adjust quantities, persist across sessions
- **Wishlist** — Save favourite products
- **Checkout** — Multi-step flow (Shipping → Payment → Review) with Cash on Delivery and a *simulated* card payment (demo mode, no real charges)
- **Server-side order pricing** — prices, shipping and totals are always recalculated from the database; client values are ignored
- **Authentication** — JWT-based signup/login with role-based access (user / admin)
- **Admin Panel** — Dashboard stats, full product CRUD, order management with status updates
- **Cloudinary Uploads** — Admin can upload real product images
- **My Orders** — Users can view their order history
- **Security basics** — Helmet headers, rate limiting (stricter on auth and AI routes), startup env validation, no internal error details in production

---

## 🛠️ Tech Stack

| Layer      | Technology                                      |
|------------|-------------------------------------------------|
| Frontend   | React 19, Vite, Tailwind CSS, React Router v7   |
| State      | React Context API (Cart, Auth, Wishlist)        |
| HTTP       | Axios with JWT interceptor                      |
| Backend    | Node.js, Express.js                             |
| Database   | MongoDB Atlas (Mongoose)                        |
| Auth       | JWT + bcryptjs                                  |
| Security   | Helmet, express-rate-limit                      |
| Images     | Cloudinary + Multer                             |
| AI         | Google Gemini Vision API                        |

---

## 📁 Project Structure

```
MERN_FurnitureShop/
├── backend/
│   ├── config/          # DB, Cloudinary, env validation
│   ├── controllers/     # Auth, Product, Order logic
│   ├── middleware/       # JWT protect + admin guard
│   ├── models/          # User, Product, Order schemas
│   ├── routes/          # API routes
│   ├── seed.js          # Seed 12 products into DB
│   ├── makeAdmin.js     # Promote a user to admin (CLI)
│   └── server.js        # Express entry point
└── frontend/
    └── src/
        ├── api/          # Axios instance
        ├── components/   # Header, Footer, Admin UI
        ├── context/      # Cart, Auth, Wishlist contexts
        ├── pages/        # All route pages
        └── App.jsx
```

---

## ⚙️ Getting Started

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

Create `backend/.env`:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/furnihub?retryWrites=true&w=majority
JWT_SECRET=a_long_random_string_of_at_least_16_chars
PORT=5000
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GEMINI_API_KEY=your_gemini_api_key
# Payment is simulated (demo mode); these are placeholders only
STRIPE_SECRET_KEY=sk_test_placeholder
STRIPE_PUBLISHABLE_KEY=pk_test_placeholder
```

`MONGODB_URI` and `JWT_SECRET` are required — the server refuses to start without them.

Seed the database:

```bash
npm run seed
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd ../frontend
npm install
npm run dev
```

Optional: copy `frontend/.env.example` to `frontend/.env` to point the app at a different API (defaults to `http://localhost:5000/api`).

### 4. Open in browser

```
http://localhost:5173
```

---

## 🔑 Admin Access

Public signup always creates a normal `user`. To create an admin, sign up first, then promote the account from the `backend/` folder:

```bash
npm run make-admin -- you@example.com
```

Log in again and open `/admin/dashboard`.

## 💳 Payments (demo mode)

Stripe does not support every country, so card payments are **simulated**: the backend returns a fake payment intent and no real charge is made. Use test card `4242 4242 4242 4242`, any future expiry and any CVC. Cash on Delivery works normally. Real payment-provider verification is not implemented.

---

## 📡 API Endpoints

| Method | Endpoint                  | Access      | Description              |
|--------|---------------------------|-------------|--------------------------|
| POST   | /api/auth/signup          | Public      | Register new user        |
| POST   | /api/auth/login           | Public      | Login, returns JWT       |
| GET    | /api/auth/me              | Protected   | Get current user         |
| GET    | /api/products             | Public      | List products            |
| GET    | /api/products/:id         | Public      | Get single product       |
| POST   | /api/products             | Admin       | Create product           |
| PUT    | /api/products/:id         | Admin       | Update product           |
| DELETE | /api/products/:id         | Admin       | Delete product           |
| POST   | /api/orders               | Protected   | Place order              |
| GET    | /api/orders/my            | Protected   | Get my orders            |
| GET    | /api/orders               | Admin       | Get all orders           |
| GET    | /api/orders/stats         | Admin       | Dashboard stats          |
| PUT    | /api/orders/:id/status    | Admin       | Update order status      |
| POST   | /api/upload               | Admin       | Upload product image     |
| POST   | /api/analyze              | Public      | AI room analysis         |
| POST   | /api/payment/create-intent| Protected   | Simulated payment intent |

---

## 🌐 Environment Variables Summary

| Variable                 | Where       | Description                      |
|--------------------------|-------------|----------------------------------|
| `MONGODB_URI`            | Backend     | MongoDB Atlas connection string  |
| `JWT_SECRET`             | Backend     | Secret key for JWT signing       |
| `PORT`                   | Backend     | Server port (default 5000)       |
| `CLIENT_URL`             | Backend     | Frontend URL for CORS            |
| `CLOUDINARY_CLOUD_NAME`  | Backend     | Cloudinary cloud name            |
| `CLOUDINARY_API_KEY`     | Backend     | Cloudinary API key               |
| `CLOUDINARY_API_SECRET`  | Backend     | Cloudinary API secret            |
| `GEMINI_API_KEY`         | Backend     | Google Gemini Vision API key     |
| `NODE_ENV`               | Backend     | Set `production` to hide error details |
| `VITE_API_URL`           | Frontend    | API base URL incl. `/api` (default `http://localhost:5000/api`) |

---

## 📸 Screenshots

> Add screenshots here after deployment.

---

## 👩‍💻 Author

**Nethmi Rajapaksha** — [@Nnavodya](https://github.com/Nnavodya)  
Software Engineering Undergraduate, University of Kelaniya, Sri Lanka

---

## 📄 License

MIT License