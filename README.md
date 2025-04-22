# 🍽️ PengoX - Taste the Speed of Flavor!  *Full Stack Food Delivery Application*
![WhatsApp Image 2025-04-21 at 22 19 51_346ba1ac](https://github.com/user-attachments/assets/b96a24fb-8a73-42b9-b01a-ead0ae3ab0a3)


---

## 🌟 Overview

**PengoX** is a full-stack food delivery application that brings speed and flavor to your doorstep. Featuring a modern React + Vite frontend and a Node.js + MongoDB backend, the platform supports browsing menus, managing carts, placing orders, and tracking deliveries. Payments are securely handled via Stripe.

---

## 🚀 Features

- 🔐 **User Authentication**: JWT-based login/signup using popup.
- 🍽️ **Menu Exploration**: Filterable categories (English Breakfast, Continental, Indian, etc.).
- 🛒 **Cart Management**: Add/remove/view cart items in real time.
- 🧾 **Order Placement**: Collect address, calculate tax/delivery, and checkout via Stripe.
- ✅ **Order Verification**: Payment verification and order confirmation.
- 📦 **Order History**: See past orders and track status.
- 📱 **Responsive Design**: Optimized for desktop and mobile.
- 🧭 **Navigation**: Intuitive navbar with cart and profile dropdowns.
- 🛵 **Restaurant Delivery System**: Support for multiple outlets and internal delivery.

---

## 🛠️ Technologies Used

**Frontend**:
- React, Vite, CSS
- React Router DOM
- Axios
- Context API (Custom State Management)
- JWT Decode
- Stripe Integration (`@stripe/stripe-js`)

**Backend**:
- Node.js, Express
- MongoDB, Mongoose
- Multer (for file uploads)
- bcrypt, JWT, Validator
- dotenv, cors

---

## 🧱 Project Structure

### 📦 Frontend - `PengoX_frontend/`
PengoX_frontend/ ├── src/ │ ├── assets/ │ ├── components/ │ ├── Context/ │ ├── pages/ │ ├── App.jsx │ ├── index.css │ ├── main.jsx │ └── vite.config.js ├── public/ ├── package.json └── README.md


### ⚙️ Backend - `PengoX_backend/`
PengoX_backend/ ├── config/ ├── controllers/ ├── middleware/ ├── models/ ├── routes/ ├── uploads/ ├── server.js ├── package.json └── .env


---

## 📦 Installation and Setup

### ⚙️ Prerequisites
- Node.js + npm
- MongoDB Atlas account
- Stripe account (for payments)

---

### 💻 Frontend Setup

```bash
git clone https://github.com/agniva1803/PengoX.git
cd PengoX_frontend
npm install

Update StoreContext.jsx with the backend URL:
const url = "http://localhost:4000";

Run the frontend:
npm run dev
Open: http://localhost:5173



