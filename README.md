## API Documentation

### Authentication Routes

| Method | Endpoint                | Description               |
| ------ | ----------------------- | ------------------------- |
| `POST` | `/api/v1/auth/register` | Sign up a new user        |
| `POST` | `/api/v1/auth/login`    | Sign in an existing user  |
| `POST` | `/api/v1/auth/logout`   | Sign out the current user |

### Blog Routes

| Method | Endpoint                                   | Description                    | Notes                              |
| ------ | ------------------------------------------ | ------------------------------ | ---------------------------------- |
| `GET`  | `/api/v1/admin/blogs?blog={numberOfBlogs}` | Get a specific number of blogs | Recommended approach               |
| `GET`  | `/api/v1/admin/blogs`                      | Get all blogs                  | Not recommended for large datasets |
| `POST` | `/api/v1/admin/blogs`                      | Create a new blog              | -                                  |
| `PUT`  | `/api/v1/admin/blogs/:blogId`              | Update a specific blog         | Requires blog ID parameter         |
| `PATCH`| `/api/v1/admin/blogs/publish/:blogId`      | Publish a specific blog        | Requires blog ID parameter         |
| `GET`| `/api/v1/blogs/`                             | Get all published blogs        | Public endpoint to get all blog by me (admin)|
| `GET`| `/api/v1/blogs/:blogId`                      | Get the specific blog          | Public endpoint to get the blog by me (admin)|

**Base URL (In Dev):** `localhost:80` 
