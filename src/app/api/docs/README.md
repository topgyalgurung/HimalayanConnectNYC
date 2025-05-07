/**
 * API Documentation
 * 
 * ## Authentication
 * POST /api/auth/login
 * POST /api/auth/register
 * 
 * ## Resources
 * GET /api/resources
 * POST /api/resources
 * ...
 */

# API Documentation

## Overview
This API provides endpoints for managing resources, users, and authentication in the Himalayan Connect application.

## Base URL
```
https://your-domain.com/api
```

## Authentication
All authenticated endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Endpoints

### Authentication

#### Login
```http
POST /auth/login
```
Request body:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
Response:
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### Register
```http
POST /auth/register
```
Request body:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

### Resources

#### Get All Resources
```http
GET /resources
```
Response:
```json
[
  {
    "id": 1,
    "name": "Resource Name",
    "description": "Description",
    "status": "APPROVED",
    "category": {
      "id": 1,
      "name": "Category Name"
    }
  }
]
```

#### Create Resource
```http
POST /resources/add
```
Request body:
```json
{
  "name": "New Resource",
  "description": "Description",
  "address": "123 Main St",
  "city": "City Name",
  "categoryId": 1
}
```

#### Update Resource Status
```http
PATCH /resources/:id
```
Request body:
```json
{
  "status": "APPROVED"
}
```

### User Management

#### Get User Profile
```http
GET /users
```
Response:
```json
{
  "id": 1,
  "firstName": "John",
  "lastName": "Doe",
  "email": "user@example.com",
  "resources": [...],
  "reviews": [...]
}
```

### Reviews

#### Add Review
```http
POST /resources/review
```
Request body:
```json
{
  "resourceId": 1,
  "rating": 5,
  "content": "Great resource!"
}
```

### Favorites

#### Toggle Favorite
```http
POST /resources/favorite
```
Request body:
```json
{
  "resourceId": 1
}
```

## Error Responses

All error responses follow this format:
```json
{
  "error": "Error message"
}
```

Common status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 429: Too Many Requests
- 500: Internal Server Error

## Rate Limiting

API requests are limited to 100 requests per 15-minute window per IP address. Rate limit headers are included in responses:
- X-RateLimit-Limit
- X-RateLimit-Remaining
- X-RateLimit-Reset
- Retry-After

## Best Practices

1. Always include proper error handling
2. Use appropriate HTTP methods
3. Include authentication token where required
4. Handle rate limiting appropriately
5. Validate request data before processing

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Allow': 'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    }
  });
}
