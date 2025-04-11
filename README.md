
```markdown
# Admin Dashboard with Post Management

This is a simple web application built using **Node.js**, **Express**, **MongoDB**, and **EJS** for managing blog posts. The dashboard allows an admin to create, view, and delete posts, with support for uploading images.

## Features

- **Admin Login**: Secure login for the admin panel.
- **Create New Post**: Form to create new posts with title, content, and image.
- **View Posts**: Display all posts with the option to view post details.
- **Delete Posts**: Use AJAX to delete posts from the dashboard without reloading the page.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **View Engine**: EJS (Embedded JavaScript)
- **Storage**: Multer for file (image) uploads
- **Authentication**: Express-session for session management

## Prerequisites

- Node.js (v14+)
- MongoDB (or MongoDB Atlas account for cloud database)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-repository.git
   cd your-repository
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variables:

   ```env
   MONGO_URI=your_mongo_connection_string
   SESSION_SECRET=your_secret_key
   ADMIN_USERNAME=your_admin_username
   ADMIN_PASSWORD=your_admin_password
   ```

   - **MONGO_URI**: MongoDB connection URI.
   - **SESSION_SECRET**: A secret string for session management.
   - **ADMIN_USERNAME**: Admin username for login.
   - **ADMIN_PASSWORD**: Admin password for login.

4. Start the application:

   ```bash
   npm start
   ```

   The application should now be running on `http://localhost:9000`.

## Routes

- **GET `/auth`**: Displays the admin login page.
- **POST `/login`**: Logs in the admin.
- **GET `/logout`**: Logs out the admin.
- **GET `/admin/dashboard`**: Displays the dashboard with a list of all posts.
- **GET `/admin/new-post`**: Displays the form to create a new post.
- **POST `/admin/new-post`**: Handles post creation (with title, content, and image upload).
- **GET `/admin/delete-post/:id`**: Deletes a post by its ID (via AJAX).
- **GET `/post/:id`**: Displays the full post.

## File Structure

```
project-root/
├── public/
│   └── uploads/               # Uploaded files (images)
├── views/
│   ├── admin/
│   │   ├── dashboard.ejs      # Admin dashboard page
│   │   ├── new-post.ejs       # New post creation page
│   ├── post.ejs               # Single post page
│   └── index.ejs              # Homepage displaying posts
├── models/
│   └── Post.js                # Post model schema
├── middleware/
│   └── auth.js                # Authentication middleware
├── node_modules/
├── .env                        # Environment variables
├── package.json                # NPM dependencies
└── server.js                   # Main server file
```

## Contributing

Feel free to fork this repository, submit issues, or send pull requests. If you're planning on contributing, please make sure to follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- **Express.js** for simplifying web server creation.
- **MongoDB** for NoSQL database storage.
- **Multer** for handling file uploads.
- **EJS** for rendering dynamic HTML views.
```

### How to Use:
1. **Clone the repository**: Clone this repository to your local machine or preferred development environment.
2. **Configure environment variables**: Ensure that you update the `.env` file with the correct credentials and MongoDB URI.
3. **Run the application**: Start the application and navigate to `http://localhost:9000` in your browser.
4. **Admin Panel**: Access the admin login at `/auth` and use the credentials defined in the `.env` file to log in and manage posts.

