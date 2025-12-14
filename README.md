# 🎬 Discover Movies

A modern, full-stack movie discovery application built with the MERN stack. Browse, search, and manage movies with a beautiful, responsive interface.

[![Live Demo](https://img.shields.io/badge/Live-Demo-success?style=for-the-badge)](https://sg-discover-movies.netlify.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/garadshubham928/Discover-Movies)

![Discover Movies Screenshot](https://github.com/user-attachments/assets/04bfefc0-cefb-46a6-87b3-fabce898facc)

---

## 🌟 Features

### For Users
- 🎥 **Browse Movies** - Explore a curated collection of top-rated movies
- 🔍 **Search Functionality** - Find movies by title instantly
- 🔃 **Smart Sorting** - Sort by rating, release date, or duration
- 📱 **Responsive Design** - Seamless experience across all devices
- 🔐 **User Authentication** - Secure login and registration

### For Admins
- ➕ **Add Movies** - Create new movie entries with poster uploads
- ✏️ **Edit Movies** - Update existing movie information
- 🗑️ **Delete Movies** - Remove movies from the database
- 🖼️ **Image Upload** - Upload custom movie posters
- 🛡️ **Protected Routes** - Admin-only access to management features

---

## 🚀 Live Application

**Frontend (Netlify):** [https://sg-discover-movies.netlify.app/](https://sg-discover-movies.netlify.app/)

**Backend (Railway):** [https://discover-movies-production.up.railway.app](https://discover-movies-production.up.railway.app)

---

## 🧰 Tech Stack

### Frontend
- ⚛️ **React 18** - Modern UI library
- ⚡ **Vite** - Lightning-fast build tool
- 🎨 **Material-UI (MUI)** - Premium component library
- 🔄 **Axios** - HTTP client for API requests
- 🛣️ **React Router** - Client-side routing

### Backend
- 🟢 **Node.js** - JavaScript runtime
- 🚂 **Express.js** - Web application framework
- 🍃 **MongoDB** - NoSQL database
- 🔐 **JWT** - Secure authentication
- 🔒 **BCrypt** - Password hashing
- 📤 **Multer** - File upload handling

### Deployment
- 🌐 **Netlify** - Frontend hosting
- 🚄 **Railway** - Backend hosting
- 🗄️ **MongoDB Atlas** - Cloud database

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/garadshubham928/Discover-Movies.git
cd Discover-Movies
```

### 2️⃣ Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file with the following variables:
# PORT=5000
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret_key

# Seed the database with initial data
npm run seed

# Start the development server
npm run dev
```

The backend server will run on **http://localhost:5000**

### 3️⃣ Frontend Setup

```bash
# Navigate to client directory (from root)
cd client

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on **http://localhost:5173**

---

> **Note:** You can also register a new account using the registration form.

---

## 📡 API Documentation

### Base URL
- **Development:** `http://localhost:5000`
- **Production:** `https://discover-movies-production.up.railway.app`

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "isAdmin": false,
  "token": "jwt_token"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "_id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "isAdmin": false,
  "token": "jwt_token"
}
```

---

### Movie Endpoints

#### Get All Movies (Paginated)
```http
GET /api/movies?pageNumber=1
```

**Response:**
```json
{
  "movies": [...],
  "page": 1,
  "pages": 5
}
```

#### Search Movies
```http
GET /api/movies/search?keyword=inception
```

**Response:**
```json
[
  {
    "_id": "movie_id",
    "name": "Inception",
    "poster": "poster_url",
    "rating": 8.8,
    "releaseDate": "2010-07-16",
    "duration": 148
  }
]
```

#### Get Sorted Movies
```http
GET /api/movies/sorted?sortBy=rating&order=desc&pageNumber=1
```

**Query Parameters:**
- `sortBy`: `rating`, `releaseDate`, or `duration`
- `order`: `asc` or `desc`
- `pageNumber`: Page number for pagination

#### Add Movie (Admin Only)
```http
POST /api/movies
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "name": "Movie Name",
  "rating": 8.5,
  "releaseDate": "2024-01-01",
  "duration": 120,
  "poster": [file]
}
```

#### Update Movie (Admin Only)
```http
PUT /api/movies/:id
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "name": "Updated Name",
  "rating": 9.0,
  "releaseDate": "2024-01-01",
  "duration": 130,
  "poster": [file]
}
```

#### Delete Movie (Admin Only)
```http
DELETE /api/movies/:id
Authorization: Bearer {token}
```

---

## 📁 Project Structure

```
Discover-Movies/
├── client/                 # Frontend React application
│   ├── public/
│   │   ├── _redirects     # Netlify routing configuration
│   │   └── [movie-posters]
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # React Context (Auth)
│   │   ├── pages/         # Page components
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                # Backend Node.js application
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── uploads/           # Uploaded images
│   ├── data/              # Seed data
│   ├── seeder.js          # Database seeder
│   ├── index.js           # Server entry point
│   └── package.json
│
└── README.md
```

---

## 🎯 Usage Guide

### For Regular Users
1. Visit [https://sg-discover-movies.netlify.app/](https://sg-discover-movies.netlify.app/)
2. Browse the movie collection on the home page
3. Use the search bar to find specific movies
4. Sort movies by rating, release date, or duration
5. Register or login to access personalized features

### For Administrators
1. Login with admin credentials
2. Navigate to the Admin Dashboard
3. **Add Movies:** Click "Add Movie" and fill in the details with a poster image
4. **Edit Movies:** Click the edit icon on any movie card
5. **Delete Movies:** Click the delete icon to remove a movie

---

## 🚢 Deployment

### Frontend (Netlify)

1. Build the production bundle:
```bash
cd client
npm run build
```

2. Deploy to Netlify:
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - The `_redirects` file handles API proxying and SPA routing

### Backend (Railway)

1. Push your code to GitHub
2. Connect Railway to your repository
3. Set environment variables in Railway dashboard:
   - `MONGO_URI`
   - `JWT_SECRET`
   - `PORT`
4. Railway will automatically deploy on push

---

## 🔧 Environment Variables

### Frontend
No environment variables needed - API URLs are configured via Netlify redirects.

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** Movies not loading on deployed site
- **Solution:** Ensure `_redirects` file exists in `client/public/` directory

**Issue:** Authentication not working
- **Solution:** Check JWT_SECRET is set in backend environment variables

**Issue:** Image uploads failing
- **Solution:** Verify Multer middleware is properly configured and uploads directory exists

---

## 📝 Features Roadmap

- [ ] Add movie reviews and ratings
- [ ] Implement user watchlists
- [ ] Add movie trailers integration
- [ ] Implement advanced filtering
- [ ] Add dark/light theme toggle
- [ ] Social sharing features

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Shubham Garad**

- GitHub: [@garadshubham928](https://github.com/garadshubham928)
- Live Demo: [VISHUBHMoviesBuzz](https://sg-discover-movies.netlify.app/)

---

## 🙏 Acknowledgments

- Movie data sourced from IMDb Top 250
- UI inspiration from modern streaming platforms
- Built as a portfolio project demonstrating full-stack development skills

---

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub or contact the repository owner.

---

<div align="center">
  <p>Made with ❤️ and React</p>
  <p>⭐ Star this repo if you find it helpful!</p>
</div>
