# Himalayan Connect NYC

## Project Overview: 
Himalayan Connect NYC is a comprehensive web platform designed to connect the Nepalese Himalayan community in New York with essential resources. The application serves as a centralized hub for accessing nonprofit services, legal assistance, immigration support, housing, and job opportunities.

## Table of Contents

- [Core Features](#core-features)
- [Tech Stack](#tech-stack)
- [Application Structure](#application-structure)
- [Key Component](#key-components)
- [Development Notes](#development-notes-technical-details)
- [Getting Started](#getting-started)
- [Next Steps/Future Improvements](#next-steps--future-enhancements)

## Requirements

- [Project Proposal](https://docs.google.com/document/d/1odmkYHsx0IdgKjQPbeW6QE9PRlX_xrfddi-rNIdXmN8/edit?usp=sharing)
- [Frontend Planning: Figma UI](https://www.figma.com/design/rv1wIJmRVMcct15TuFCCBe/Himalayan-Connect-NYC-Website-UI?node-id=93-7&t=3WS1I3gdEnEYKZqY-0)


### Core Features

#### 1. Resource Management
- **Resource Directory**: Searchable directory of community resources
- **Resource Submission**: Users can submit new resources for admin approval
- **Resource Editing**: Users can suggest edits to existing resources
- **Resource Reviews**: Users can leave reviews and ratings
- **Favorites**: Users can save resources to their favorites

#### 2. User Features
- **User Dashboard**: 
  - View submitted resources
  - Track resource status
  - Manage reviews and favorites
  - Edit/delete submissions
- **Profile Management**: 
  - User authentication 

#### 3. Admin Features
- **Admin Dashboard**:
  - Resource approval/rejection
  - Resource status tracking

#### 4. Search and Filtering
- **Advanced Search**: 
  - Text search by resource name functionality
  - Category-based filtering (todo)
  - Borough-based filtering (todo)
- **Map Integration**: 
  - Interactive map view 
  - pin with category icon
  - Resource location display

#### 5. Backend Services
- Resource management (CRUD operations)
- User authentication and authorization
- Review and rating system
- Favorite resource management
- Image upload and management



### Non Functional Requirements
- Minimize latency 
  
  

## Tech Stack
- **Frontend**: 
  - Next.js 15.1.7 (React 19)
  - TypeScript
  - Tailwind CSS
  - Material UI
  - Framer Motion (animations)
- **Backend**: 
  - Next.js API Route Handler 
  - Next.js Server Action
  - Server Component
  - Prisma ORM
  - PostgreSQL
- **External APIs**:
  - Google Maps API (Directions, Geocoding, Maps JavaScript API, Places API)
  - Cloudinary (image storage)
- **Authentication**: Custom JWT-based session management
- **Form Handling**: React Hook Form with Zod validation

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
├──  middleware
├──  next.config.ts
├──  tailwind.config.ts
├──  tsconfig.json
```

## Key Components

### Frontend Components
- `HomeClient.tsx`: Main homepage component with resource listing, **filter** and map
- `ResourceDetailsCard.tsx`: Detailed view of resource information
- `ResourceListPanel.tsx`: Displays list of resources in the middle page
- `FilterSidebar`: Displays the filter options for the resources
- `resources/add/AddResourceForm.tsx`:form for adding a new resource 
- `ResourceDetailsCard`: Displays comprehensive info about a resource
- `ResourceSuggestCard`:Form for suggesting edits to a resource
- `ReviewSubmitCard`: Form for submitting a review for a resource
- `AdminDashboard.tsx`: Admin profile and dashboard resource management
- `UserDashboard.tsx`: User profile and dashboard resource management
- `TimePickerSection.tsx`: Time and day selection for resources
- 

### Component Hierarchy
![Component Hierarchy](/public/ComponentHierarchy.png)


## Development Notes (Technical Details)

### Form Validation & Data Handling
- Using Zod for form validation and type safety
- Server Action size limit: 1MB
- Image handling through Cloudinary
- Note: Large forms (images + text + hours) may hit 1MB Server Action limit
- Solutions:
  1. Increase body size in next.config.js
  2. Use Cloudinary + store URL (current implementation ✅)

### Authentication & Session Management
- Custom JWT-based session implementation (not using next-auth)
- Secure session cookie storage
- Server-side session validation through getSession()


### Client-Side Architecture
1. **UserProvider (React Context)**
   - Wraps application
   - Initializes session data on mount
   - Manages client-side session state
   - Provides useUser hook for accessing session data

2. **Session Components**
   - `lib/session.ts`: Server-only session cookie handling
   - `UserProvider`: Client-side session management via API
   - `useUser`: Client-side hook for session access

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
- Database: Prisma Postgres
- Image Storage: Cloudinary
- API Services: Google Maps API
****

## Next steps / Future Enhancements

#### Future enhancements
- popover/modal for add resource 
- borough autopopulate based on address entered 
- For business hours input: Need 2 time inputs (open/close) for each day (m/t/w/th/f/sat/sun) so 14 time inputs
- Phone number input masking
- user warning system for profanity/curse words/bad input filter
  - regular expressions, machine learning, text analysis libraries 

#### Nice to Haves 
1. Multilingual Support
   - Nepali and Tibetan language integration

2. Community Features
   - Discussion forums
   - Community meetups
   - FAQ section

3. Enhanced Search
   - Advanced filtering options
   - Search history
   - Popular searches

4. User Experience
   - Mobile app development


