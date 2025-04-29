================================Backend (Node.js + Express)================================

Installation
Clone the repository:
git clone <your-backend-repo-url>
cd backend-task

Install the required dependencies:
npm install bcryptjs cors dotenv express jsonwebtoken pg sequelize

Start the server:
node app.js

Your backend will be running at http://localhost:5000.

** Endpoints **

1] Register User
URL: POST http://localhost:5000/auth/register

Request Body:

{
  "email": "a@gmail.com",
  "password": "123456",
  "country": "India"
}

Response:

{
  "message": "User registered successfully!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzQ1OTA2NDAxLCJleHAiOjE3NDU5MTAwMDF9.CYjrGM4iGRs__xoKPdTXuhyLcInUG6tWwF4SHPb9BlU"
}

2] Login User
URL: POST http://localhost:5000/auth/login

Request Body:

{
  "email": "a@gmail.com",
  "password": "123456"
}

Response:

{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzQ1OTA2NDk2LCJleHAiOjE3NDU5MTAwOTZ9.rfrvWCKxfsDlAzJTiFWXFMTBdWkOngyCocr6bjW8qwo"
}

3] Create Product
URL: POST http://localhost:5000/products/

Headers:

Authorization: Bearer <Your-JWT-Token>

Request Body:
{
  "name": "Shampoo",
  "price": 10.5,
  "stock": 50
}

Response:
{
  "message": "Product created",
  "product": {
    "id": 1,
    "name": "Shampoo",
    "description": null,
    "price": "10.5",
    "createdAt": "2025-04-29T06:15:19.944Z",
    "updatedAt": "2025-04-29T06:15:19.944Z"
  }
}

4] Get Products
URL: GET http://localhost:5000/products/

Headers:

Authorization: Bearer <Your-JWT-Token>

Response:

[
  {
    "id": 1,
    "name": "Shampoo",
    "price": "10.5",
    "stock": 50,
    "createdAt": "2025-04-29T06:15:19.944Z",
    "updatedAt": "2025-04-29T06:15:19.944Z"
  },
  {
    "id": 2,
    "name": "Dove Shampoo",
    "price": "15.99",
    "stock": 100,
    "createdAt": "2025-04-29T06:32:22.067Z",
    "updatedAt": "2025-04-29T06:32:22.067Z"
  }
]

5] Update Product
URL: PUT http://localhost:5000/products/:id

Headers:

Authorization: Bearer <Your-JWT-Token>

Request Body:

{
  "name": "New Shampoo",
  "description": "New improved shampoo",
  "price": 12.0,
  "stock": 120
}

Response:

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

6] Delete Product
URL: DELETE http://localhost:5000/products/:id

Headers:

Authorization: Bearer <Your-JWT-Token>

Response:

{
  "message": "Product deleted successfully"
}

7] Send OTP
URL: POST http://localhost:5000/auth/send-otp

Request Body:

{
  "email": "user@example.com"
}

Response:

{
  "message": "OTP sent to email"
}

8] Verify OTP
URL: POST http://localhost:5000/auth/verify-otp

Request Body:

{
  "email": "user@example.com",
  "otp": "161672"
}

Response:

{
  "message": "OTP verified successfully"
}

9] ---------------------PAGINATION----------

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

================================Frontend (React)================================
Installation
Clone the repository:

git clone <your-frontend-repo-url>
cd frontend-task
Install the required dependencies:

npm install axios
npm install react-router-dom
npm install tailwindcss @tailwindcss/vite

Set up Tailwind CSS:

npx tailwindcss init
In the tailwind.config.js file, add the following:

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

Start the frontend:

npm run dev
Your frontend will be running at http://localhost:5173.

================================Pages in Frontend================================
1. Register Page
Form fields: Email, Password, Confirm Password

On submit, the user will be registered and the OTP will be sent for email verification.

2. Verify OTP Page
User enters the OTP sent to their email.

3. Login Page
Form fields: Email, Password

On submit, user logs in and is redirected to the Dashboard.

4. Dashboard Page
Displays the list of products and allows CRUD operations via API calls.

=======================================================================
