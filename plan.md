# API Endpoints

## Authentication

POST /api/v1/auth/register - Register new user (in DB I will add mine, role - admin)
POST /api/v1/auth/login - Login user
POST /api/v1/auth/logout - Logout user
GET /api/v1/auth/me - Get current user (protected)

## Blog Posts

GET /api/v1/blogs - Get all published posts (public)
GET /api/v1/blogs/:slug - Get single post by slug (public)
GET /api/v1/admin/blogs - Get all posts including drafts (protected)
POST /api/v1/admin/blogs - Create new post (protected)
PUT /api/v1/admin/blogs/:id - Update post (protected)
DELETE /api/v1/admin/blogs/:id - Delete post (protected)
PATCH /api/v1/admin/blogs/:id/publish - Publish draft (protected)

**Not Important in the beginning**

GET /api/v1/blogs/search?q=query - Search posts (public)

## Media

POST /api/v1/upload/image - Upload image (protected)

## Utility

GET /api/v1/blogs/tags - Get all unique tags
GET /api/v1/blogs/category/:category - Get posts by category