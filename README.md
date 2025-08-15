🎨 Arternative BackEnd

The Arternative BackEnd is the server-side application for Arternative, a platform for contemporary and independent artists to share their events, releases, and creative work. Built with Node.js, Express, and MongoDB, it provides a robust RESTful API for user management, content creation, and media hosting.

🚀 Features

🔐 User authentication using JWT (JSON Web Tokens)

📝 CRUD operations for posts and comments

🖼️ Image upload functionality using Cloudinary

👥 Role-based access control for authenticated users

💾 MongoDB integration via Mongoose

⚠️ Centralized error handling

❤️ Health check endpoints


🗂️ Project Structure

arternative-BackEnd/
│
├── .env                         # Environment variables
├── .gitignore                  # Git ignore rules
├── app.js                      # Express app setup
├── server.js                   # Server entry point
├── package.json                # Project metadata and scripts
│
├── config/                     # Configuration files
│   ├── cloudinary.config.js    # Cloudinary image upload setup
│   └── index.js                # Middleware setup
│
├── db/                         # Database connection
│   └── index.js                # MongoDB connection setup
│
├── error-handling/             # Error handlers
│   └── index.js                # Custom error middleware
│
├── middleware/                 # Custom middleware
│   └── jwt.middleware.js       # JWT authentication middleware
│
├── models/                     # Mongoose models
│   ├── Comment.model.js
│   ├── Post.model.js
│   └── User.model.js
│
├── routes/                     # API routes
│   ├── auth.routes.js
│   ├── comment.routes.js
│   ├── index.routes.js
│   └── post.routes.js

⚙️ Installation

Clone the repository:

git clone <repository-url>
cd arternative-BackEnd


Install dependencies:

npm install


Create a .env file in the root directory with the following variables:

PORT=5005
MONGODB_URI=mongodb://127.0.0.1:27017/arternative
TOKEN_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
ORIGIN=http://localhost:5173


Start the development server:

npm run dev

🔐 Authentication Endpoints

Method	Endpoint	Description
POST	/auth/signup	Register a new user
POST	/auth/login	Log in a user and receive a JWT
GET	/auth/verify	Verify the JWT and return user info

📦 Posts API

Method	Endpoint	Description
POST	/api/posts	Create a new post (auth required)
GET	/api/posts	Get all posts
GET	/api/posts/:postId	Get a specific post and its comments
PUT	/api/posts/:postId	Update a post (auth & ownership required)
DELETE	/api/posts/:postId	Delete a post (auth & ownership required)

💬 Comments API

Method	Endpoint	Description
POST	/api/posts/:postId/comments	Add a comment to a post (auth required)
DELETE	/api/posts/:postId/comments/:commentId	Delete a comment (auth & ownership required)

☁️ Image Upload

Method	Endpoint	Description
POST	/api/upload	Upload an image to Cloudinary

🧪 Health Check

Method	Endpoint	Description
GET	/api/health	Check server and MongoDB status

🛠️ Technologies Used

Node.js – JavaScript runtime

Express – Web framework

MongoDB – NoSQL database

Mongoose – ODM for MongoDB

JWT – Authentication

Cloudinary – Image hosting

Multer – File upload handling

dotenv – Environment variable management

📜 Scripts
Command	Description
npm run dev	Start server in dev mode (nodemon)
npm start	Start server in production mode

📄 License

This project is licensed under the MIT License.