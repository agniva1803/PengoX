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



### 🖥️ Backend Setup
git clone https://github.com/agniva1803/PengoX_backend.git
cd PengoX_backend
npm install

Create a .env file inside the backend root:
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:5174
JWT_SECRET="random#secret"
STRIPE_SECRET_KEY=sk_test_*************

Update config/db.js with your MongoDB URI.
Run the backend:
npm run server

### 🧪 Usage Flow
🏠 Home Page – Explore and add items to cart

🛒 Cart Page – Review your selections

🏡 Place Order – Enter delivery info and pay via Stripe

✅ Verify Page – Confirm your payment

📜 My Orders – Track and view past orders

🔐 Login/Signup – Via popup modal

### 📸 Screenshots

🧑 User Page
![WhatsApp Image 2025-04-21 at 22 19 51_172d48b1](https://github.com/user-attachments/assets/37e86c0d-d14a-420e-8e79-7f84d39688f4)


📝 Account Creation
![WhatsApp Image 2025-04-21 at 22 19 51_7096ad24](https://github.com/user-attachments/assets/e69a7e57-6ca8-42c4-af67-93ffac79371c)



🔐 Login
![WhatsApp Image 2025-04-21 at 22 20 40_4d85a0e1](https://github.com/user-attachments/assets/6dbf55c7-7ec6-4c9a-a864-7458d4b003c4)


📂 Explore Our Menu
![WhatsApp Image 2025-04-21 at 22 20 40_a9991d35](https://github.com/user-attachments/assets/3ff95005-0da6-4e1c-931b-ad9f29cca4de)



🛒 Cart Page
![Screenshot 2025-04-21 224945](https://github.com/user-attachments/assets/cf3518c8-560a-4a4c-8ea0-a4c866df28c3)



🏡 Address Page
![Screenshot 2025-04-21 225019](https://github.com/user-attachments/assets/b5707a1b-b459-4f2c-81e5-bec3409127e0)



💳 Payment Page
![Screenshot 2025-04-21 225125](https://github.com/user-attachments/assets/db159773-ca34-4ac5-a61b-ef2d6332e9e4)




📋 Orders List Page
![Screenshot 2025-04-21 232810](https://github.com/user-attachments/assets/03f4f33e-959c-4ae1-b3fa-70eaec80b7f4)


🍱 Food Gallery
🥗 Salads
![Screenshot 2025-04-21 233244](https://github.com/user-attachments/assets/f2d62f09-cbd6-4200-b901-0ff001addd9b)



🌯 Rolls
![Screenshot 2025-04-21 233330](https://github.com/user-attachments/assets/6cc5ab61-9aeb-40ae-a664-96fc17941ace)



🍨 Deserts
![Screenshot 2025-04-21 233430](https://github.com/user-attachments/assets/cd9b472d-55cd-409b-8413-6d961a15e2a0)



🥪 Sandwiches
![Screenshot 2025-04-21 233501](https://github.com/user-attachments/assets/0e573c75-7d6b-4278-aa3d-ed0034af1221)



🎂 Cakes
![Screenshot 2025-04-21 233555](https://github.com/user-attachments/assets/82d33ac3-e89b-4804-82b5-8ede0b2c4923)



🥬 Pure Veg
![Screenshot 2025-04-21 233631](https://github.com/user-attachments/assets/4873c972-7cc7-4126-af7b-5c90f42f28db)



🍝 Pasta
![Screenshot 2025-04-21 233742](https://github.com/user-attachments/assets/c3852bca-3774-4e11-9b19-32b3e5cba820)


🍜 Noodles
![Screenshot 2025-04-21 233822](https://github.com/user-attachments/assets/88b53f4c-3d71-477f-ba76-fac2bba52c95)


🧑‍💻 Contributing
Contributions are welcome!
Fork the repo and submit a pull request for suggestions, features, or bug fixes.

📄 License
© 2025 PengoX
Proudly created with ❤️ by Primakre.com

📬 Contact
📞 Phone: +91 7632005304

📧 Email: agnivamukherjee8204@gmail.com

🌐 Social: Facebook | Twitter | LinkedIn


⚠️ Note: Stripe is in test mode. Replace the test key with a live key for production use.

---

Let me know if you'd like a **live badge section**, CI setup, or GitHub Actions added too!
