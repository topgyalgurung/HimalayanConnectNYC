# Himalayan Connect NYC

## Project Overview
Himalayan Connect NYC is a comprehensive web platform designed to connect the Himalayan community in New York with essential resources. The application serves as a centralized hub for accessing nonprofit services, legal assistance, immigration support, housing, and job opportunities.

## Tech Stack
- **Frontend**: 
  - Next.js 15.1.7 (React 19)
  - TypeScript
  - Tailwind CSS
  - Material UI
  - Framer Motion (animations)
- **Backend**: 
  - Next.js API Routes
  - Prisma ORM
  - PostgreSQL
- **External APIs**:
  - Google Maps API (Directions, Geocoding, Maps JavaScript API, Places API)
  - Cloudinary (image storage)
- **Authentication**: Custom JWT-based session management
- **Form Handling**: React Hook Form with Zod validation

## Core Features

### 1. Resource Management
- **Resource Directory**: Searchable directory of community resources
- **Resource Submission**: Users can submit new resources for admin approval
- **Resource Editing**: Users can suggest edits to existing resources
- **Resource Reviews**: Users can leave reviews and ratings
- **Favorites**: Users can save resources to their favorites

### 2. User Features
- **User Dashboard**: 
  - View submitted resources
  - Track resource status
  - Manage reviews and favorites
  - Edit/delete submissions
- **Profile Management**: 
  - User authentication
  - Session management
  - Profile customization

### 3. Admin Features
- **Admin Dashboard**:
  - Resource approval/rejection
  - Edit suggestion management
  - Resource status tracking
  - User management

### 4. Search and Filtering
- **Advanced Search**: 
  - Category-based filtering
  - Borough-based filtering
  - Text search functionality
- **Map Integration**: 
  - Interactive map view
  - Resource location display
  - Direction services

## Application Structure

```
src/
├── app/
│   ├── (homepage)/         # Homepage components
│   ├── (auth)/            # Authentication related pages
│   ├── profile/           # User profile pages
│   ├── components/        # Reusable components
│   ├── actions/           # Server actions
│   ├── hooks/            # Custom React hooks
│   ├── context/          # React context providers
│   ├── types/            # TypeScript type definitions
│   ├── lib/              # Utility functions
│   └── api/              # API routes
```

## Key Components

### Frontend Components
- `HomeClient.tsx`: Main homepage component with resource listing and map
- `ResourceDetailsCard.tsx`: Detailed view of resource information
- `AdminResourceTable.tsx`: Admin dashboard resource management
- `UserDashboard.tsx`: User profile and resource management
- `TimePickerSection.tsx`: Time and day selection for resources

### Backend Services
- Resource management (CRUD operations)
- User authentication and authorization
- Review and rating system
- Favorite resource management
- Image upload and management

## Development Notes

### Form Validation
- Using Zod for form validation
- Server Action size limit: 1MB
- Image handling through Cloudinary

### Authentication
- Custom JWT-based session management
- Session cookie for secure storage
- Server-side session validation

### Client Session Management
- UserProvider: React Context for client-side session
- useUser hook for accessing session data
- Server-side session validation through getSession()

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Database connection
   - Google Maps API key
   - Cloudinary credentials
   - JWT secret

4. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment
- Frontend: Vercel (recommended)
- Database: PostgreSQL
- Image Storage: Cloudinary
- API Services: Google Maps API

## Future Enhancements
1. Multilingual Support
   - Nepali language integration
   - Additional language options

2. Community Features
   - Discussion forums
   - Community meetups
   - FAQ section
   - Resource reporting system

3. Enhanced Search
   - Advanced filtering options
   - Search history
   - Popular searches

4. User Experience
   - Mobile app development
   - Push notifications
   - Offline support

# zod for form validation 
- If your form grows (images + text + hours), you may hit the 1MB Server Action limit.
- // Option 1: increase body size in next.config.js
// Option 2: use Cloudinary + store URL (which you're doing ✅)


// auth

 not using next-auth, but instead managing your own JWT-based sessions with a custom session cookie (stored securely
 -  Use getSession() from your lib/session.ts file to access the user session inside your server actions.
-  


// client session: 
UserProvider is a React Context that wraps your app and stores user session data on the client, by calling getSession() once on mount
- lib/session.ts, server only: Reads session cookie securely on server
- User Provider, client only: Reads session via API call and stores it in React state
- useUser, client only: hook to access session in component 


