# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Himalayan Connect NYC is a Next.js 15 web platform connecting the Nepalese Himalayan community in New York with essential resources (nonprofit services, legal assistance, housing, jobs). Users can search, view, and review resources on an interactive map, while admins manage resource approvals through a dashboard.

## Development Commands

### Essential Commands
```bash
npm run dev              # Start dev server with Turbopack
npm run build            # Build for production (includes Prisma generate)
npm start                # Start production server
npm run lint             # Run ESLint
```

### Database Management
```bash
npx prisma studio                          # Open Prisma Studio GUI
npx prisma generate                        # Generate Prisma Client
npx prisma migrate dev --name <name>       # Create and apply migration
```

### Testing
```bash
npm test                 # Run Jest tests in watch mode
npm run cypress:open     # Open Cypress E2E testing
```

## Architecture Overview

### Core Tech Stack
- **Framework**: Next.js 15.5.3 with React 19, TypeScript, App Router
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: Custom JWT-based session management (not NextAuth)
- **Styling**: Tailwind CSS + Material UI + Framer Motion
- **External APIs**: Google Maps (Places, Geocoding, Directions), Cloudinary (image storage)
- **Form Handling**: React Hook Form + Zod validation

### Authentication Flow
The app uses a **custom JWT session system** (not next-auth):

1. **Server-side**: `src/app/lib/session.ts` handles session operations:
   - `createSession(userId, email, role)` - Creates encrypted JWT cookie
   - `getSession()` - Validates and returns session from cookie
   - `deleteSession()` - Clears session cookie
   - Uses `jose` library (Edge Runtime compatible)
   - 7-day expiration, httpOnly cookies

2. **Client-side**: `src/app/context/UserProvider.tsx` provides React Context:
   - `UserProvider` wraps app in `layout.tsx`
   - `useUser()` hook accesses session data on client
   - Fetches session via API route on mount

3. **Middleware**: `src/middleware.ts` protects routes:
   - Protected routes: `/dashboard`, `/resources/add`, `/profile`
   - Auth routes redirect if logged in: `/login`, `/signup`

### Database Schema (Prisma)
Key models:
- **User**: Authentication + profile (role: USER/ADMIN)
- **Resource**: Main resource entity with address, hours, category
- **Location**: Lat/long coordinates for map pins (1:many with Resource)
- **ResourceCategory**: Categories for filtering
- **ResourceEditSuggestion**: User-suggested edits pending admin approval
- **ResourceLike**: User favorites
- **ResourceReview**: Ratings and reviews

Status enums: `PENDING`, `APPROVED`, `REJECTED` for resources and edits.

### Application Structure

```
src/app/
├── (auth)/                 # Auth pages (login, signup, forgot/reset password)
├── (homepage)/             # Homepage with 3-column layout
│   ├── HomeServer.tsx      # Server component fetching initial data
│   └── HomeClient.tsx      # Client component managing filter/map state
├── profile/                # User/Admin dashboard pages
├── api/                    # API route handlers
│   ├── auth/              # Password reset routes
│   ├── resources/         # Resource CRUD, likes, reviews, edits
│   └── session/           # Client session endpoint
├── components/
│   ├── auth/              # Login, signup, password reset forms
│   ├── dashboard/         # AdminResourceTable, UserResourceTable
│   ├── features/          # ResourceDetailsCard, ResourceSuggestCard, ReviewSubmitCard
│   └── ResourcePopup/     # Add/Edit resource popups
├── ui/                     # Reusable UI components
│   ├── filters/           # FilterSidebar, BoroughFilter, ResourceFilter
│   ├── map/               # Map.tsx with Google Maps integration
│   └── resources/         # ResourceCard, ResourceListPanel, Pagination
├── context/
│   └── UserProvider.tsx   # Client-side session context
├── lib/
│   ├── session.ts         # Server-only JWT session management
│   ├── prisma.ts          # Prisma client singleton
│   ├── types.ts           # TypeScript type definitions
│   ├── forms/             # Form sections and validation schemas
│   └── geocodeAddress.tsx # Google Maps geocoding utility
└── middleware.ts          # Route protection
```

### Homepage Architecture (3-Column Layout)
The homepage (`src/app/page.tsx` → `HomeServer.tsx` → `HomeClient.tsx`) uses a server/client component split:

1. **Server Component** (`HomeServer.tsx`):
   - Fetches initial resources from database with pagination
   - Handles search query params
   - Passes data to client component

2. **Client Component** (`HomeClient.tsx`):
   - Manages 3-column responsive layout:
     - **Left (25%)**: `FilterSidebar` - category and borough filters
     - **Middle (35%)**: `ResourceListPanel` - paginated resource cards
     - **Right (45%)**: `MapView` - interactive Google Map with markers
   - Coordinates state between filter changes, selected/hovered resources, and map

3. **State Flow**:
   - Filter changes update `filteredResources`
   - Clicking resource card shows details popup on map
   - Hovering resource highlights corresponding map marker

### API Routes Pattern
API routes use Next.js Route Handlers (App Router style):
- GET/POST/PUT/DELETE methods in `route.ts` files
- Use `getSession()` for auth checks
- Return `NextResponse.json()` responses
- Example: `src/app/api/resources/[id]/route.ts` handles single resource CRUD

### Form Handling
- **Validation**: Zod schemas in `src/app/lib/forms/validationSchema.ts`
- **Image Upload**: Cloudinary integration via `src/app/api/upload/route.ts`
  - Direct upload to Cloudinary, store URL in database
  - Workaround for Next.js 1MB Server Action limit
- **Time Picker**: Custom `TimePickerSection.tsx` for business hours

## Important Notes

### Deployment Checklist
Before deploying:
1. Fix all TypeScript errors and linting issues
2. Run `npm run build` locally to test production build
3. Test build with `npm run start`
4. Verify Prisma migrations are applied in production

### Environment Variables Required
```
DATABASE_DATABASE_URL         # PostgreSQL connection string (with pooling)
JWT_SECRET                    # Secret for JWT token signing
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY  # Google Maps API key
NEXT_PUBLIC_GOOGLE_MAP_ID     # Google Map ID for styling
CLOUDINARY_CLOUD_NAME         # Cloudinary cloud name
CLOUDINARY_API_KEY            # Cloudinary API key
CLOUDINARY_API_SECRET         # Cloudinary API secret
```

### Known Limitations & Future Work
- Search currently only supports text queries (no zip code search)
- Filters are client-side only (could optimize with server-side filtering)
- Business hours stored as single open/close time (not per-day schedules)
- No multilingual support yet (planned: Nepali/Tibetan)

### Code Quality Guidelines
- Keep files under 200-250 lines
- Prefer server components for data fetching
- Use `fetch(..., { cache: "no-cache" })` for dynamic data instead of `export const dynamic = "force-dynamic"`
- Avoid over-engineering: don't add abstractions for one-time operations

## Testing Strategy
- **Jest**: Unit/integration tests (configured for Next.js)
- **Cypress**: E2E tests
- **Playwright**: E2E tests (configured but not actively used)

## References
- [Project Figma UI](https://www.figma.com/design/rv1wIJmRVMcct15TuFCCBe/Himalayan-Connect-NYC-Website-UI)
- [UX Laws Reference](https://lawsofux.com/)