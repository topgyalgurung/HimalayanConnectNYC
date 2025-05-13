# Himalayan Connect NYC

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

### Testing 

- Component Testing
- Integration Testing 
- E2E Testing 
- Unit Testing
  - Jest(next.js jas built in configuration for jest) & React Testing Library
  - Vitest
  

  ### Performance Considerations
  - Lazy Loading
  - Caching and CDNs
  - minification and compression