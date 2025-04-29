require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { sequelize } = require('./config');
const { User } = require('./models/user'); 
const { Product } = require('./models/product'); 
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

// Sync database
sequelize.sync({ alter: true })  
  .then(() => console.log("Database & tables synced!"))
  .catch((err) => console.error("Sync error:", err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


/*
BACKEND---->  npm install bcryptjs cors dotenv express jsonwebtoken pg sequelize
FRONTEND--->npm i axios
  npm i react-router-dom
  npm install tailwindcss @tailwindcss/vite
-------------------------------------------------------
AUTH ROUTES

Method	Full URL	                                         Description
POST	http://localhost:5000/auth/register	             Register a new user with email and password
POST	http://localhost:5000/auth/login	             Login with email and password, receive JWT token
POST	http://localhost:5000/auth/send-otp	             Send OTP to provided email
POST	http://localhost:5000/auth/verify-otp	         Verify OTP using email and otp

 PRODUCT ROUTES (CRUD)

Method	Full URL	                                Body (if needed)	                                  Description
POST	http://localhost:5000/products/	    { "name": "Shampoo", "price": 10.5, "stock": 50 }	  Add a new product
GET	    http://localhost:5000/products	        –	                                                  Get all products
GET	    http://localhost:5000/products/1	    –	                                                  Get product by ID
PUT	    http://localhost:5000/products/1	    { "stock": 60 }	                                      Update product by ID
DELETE	http://localhost:5000/products/1	    –	                                                  Delete product by ID
===========================================================

POST--- http://localhost:5000/auth/register
{
  "email": "a@gmail.com",
  "password": "123456",
  "country": "India"
}
{
    "message": "User registered successfully!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzQ1OTA2NDAxLCJleHAiOjE3NDU5MTAwMDF9.CYjrGM4iGRs__xoKPdTXuhyLcInUG6tWwF4SHPb9BlU"
}
---------------------------
POST---http://localhost:5000/auth/login
{
  "email": "a@gmail.com",
  "password": "123456"
}
{
    "message": "Login successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzQ1OTA2NDk2LCJleHAiOjE3NDU5MTAwOTZ9.rfrvWCKxfsDlAzJTiFWXFMTBdWkOngyCocr6bjW8qwo"
}
--------------------------------
POST--http://localhost:5000/products/

in Header 
Authorization      Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzQ1OTA3MDIwLCJleHAiOjE3NDU5MTA2MjB9.VrNBhEwF8JAbGt-Rl1_ufOSpx2n89AmP2lqfDsWbQJc

in request body
{
  "name": "Shampoo",
  "price": 10.5,
  "stock": 50
}
in response
{
    "message": "Product created",
    "product": {
        "id": 1,
        "name": "Shampoo",
        "description": null,
        "price": "10.5",
        "updatedAt": "2025-04-29T06:15:19.944Z",
        "createdAt": "2025-04-29T06:15:19.944Z"
    }
}
---------------------------------------------------
GET---- http://localhost:5000/products/

in Header 
Authorization      Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzQ1OTA3MDIwLCJleHAiOjE3NDU5MTA2MjB9.VrNBhEwF8JAbGt-Rl1_ufOSpx2n89AmP2lqfDsWbQJc

All data comes

----------------------------------------------------
PUT---http://localhost:5000/products/2     (2 is Product ID)

in Header 
Authorization      Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzQ1OTA3MDIwLCJleHAiOjE3NDU5MTA2MjB9.VrNBhEwF8JAbGt-Rl1_ufOSpx2n89AmP2lqfDsWbQJc

{
  "name": "New Shampoo",
  "description": "New improved shampoo",
  "price": 12.0,
  "stock": 120
}
{
    "message": "Product updated",
    "product": {
        "id": 2,
        "user_id": 2,
        "name": "New Shampoo",
        "description": "New improved shampoo",
        "price": 12,
        "stock": 120,
        "createdAt": "2025-04-29T06:32:22.067Z",
        "updatedAt": "2025-04-29T06:41:31.977Z"
    }
}
----------------------------------------
DELETE---http://localhost:5000/products/2

in Header 
Authorization      Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzQ1OTA3MDIwLCJleHAiOjE3NDU5MTA2MjB9.VrNBhEwF8JAbGt-Rl1_ufOSpx2n89AmP2lqfDsWbQJc

{
    "message": "Product deleted successfully"
}

----------------------------------
Send OTP

URL: POST http://localhost:5000/auth/send-otp
{
  "email": "user@example.com"
}

{
    "message": "OTP sent to email"
}

in console---OTP for user@example.com: 161672
-------------
Verify OTP

URL: POST http://localhost:5000/auth/verify-otp
{
  "email": "user@example.com",
  "otp": "161672"
}
{
    "message": "OTP verified successfully"
}
---------------------PAGINATION----------

GET http://localhost:5000/products/?page=1&limit=5
GET http://localhost:5000/products?name=Dove

{
    "totalItems": 1,
    "totalPages": 1,
    "currentPage": 1,
    "products": [
        {
            "id": 3,
            "user_id": 2,
            "name": "Dove Shampoo",
            "description": "Hair cleanser for smooth hair",
            "price": "15.99",
            "stock": 100,
            "createdAt": "2025-04-29T06:34:16.501Z",
            "updatedAt": "2025-04-29T06:34:16.501Z"
        }
    ]
}
    
GET http://localhost:5000/products?sortBy=price&order=asc
GET http://localhost:5000/products?price=10.5&stock=50

*/