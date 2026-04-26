# Live Events Feature Plan

## Overview
Add a live events feature to Himalayan Connect NYC that allows users to discover and share upcoming community events. Follows existing codebase patterns (Prisma + API routes + React Hook Form).

## User Responses
1. **Save location**: `docs/event-feature-plan.md`
2. **Link to Resources**: Yes, events can optionally be hosted at existing Resources
3. **Display**: Separate `/events` page (using existing 3-column layout pattern)
4. **Creation permission**: Anyone logged in can create events

---

## 1. Database Schema

Add to `prisma/schema.prisma`:

```prisma
model Event {
  id           Int        @id @default(autoincrement())
  title        String
  description String?
  startDate   DateTime
  endDate      DateTime?
  location     String     // Street, City, State ZIP format
  city         String?
  imageUrl    String?
  organizer   String?
  contactEmail String?
  contactPhone String?
  eventUrl    String?
  status      EventStatus @default(PENDING)
  categoryId  Int?
  resourceId   Int?       // Optional link to hosting Resource
  createdById Int?
  createdAt   DateTime   @default(now())
  resource    Resource?  @relation(fields: [resourceId], references: [id])
  EventCategory EventCategory? @relation(fields: [categoryId], references: [id])
  User        User?      @relation("UserEvents", fields: [createdById], references: [id])

  @@index([title, description])
}

model EventCategory {
  id    Int     @id @default(autoincrement())
  name  String  @unique
  Event Event[]
}

enum EventStatus {
  PENDING
  APPROVED
  REJECTED
}
```

Update `User` model to add relation:
```prisma
events    Event[]    @relation("UserEvents")
```

---

## 2. Type Definitions

Add to `src/app/lib/types.ts`:

```typescript
export type EventStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Event {
  id: string;
  title: string;
  description?: string | null;
  startDate: Date;
  endDate?: Date | null;
  location: string;
  city?: string | null;
  imageUrl?: string | null;
  organizer?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  eventUrl?: string | null;
  status: EventStatus;
  categoryId?: number | null;
  resourceId?: number | null;
  createdById?: number | null;
  createdAt: Date;
  EventCategory?: { name: string } | null;
  resource?: Resource | null;
}
```

---

## 3. API Routes

Create `src/app/api/events/`:
- `route.ts` — GET (list approved events), POST (create event)
- `[id]/route.ts` — GET (single event), PUT (update), DELETE (delete)

Reuse patterns from `src/app/api/resources/route.ts`:
- Rate limiting via `checkRateLimit`
- Session auth checks
- Prisma queries with relationships

---

## 4. Form Components

Create `src/app/components/events/AddEventPopup.tsx`:
- Reuse `Popup` wrapper from `src/app/components/ResourcePopup/Popup.tsx`
- Use React Hook Form + Zod validation
- Validation schema in `src/app/lib/forms/eventSchema.ts`

### Validation Schema (`eventSchema.ts`):
```typescript
export const eventSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  description: z.string().max(500).optional(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  location: z.string().min(5, "Location is required"),
  city: z.string().optional(),
  organizer: z.string().optional(),
  contactEmail: z.string().email().optional().or(z.literal("")),
  contactPhone: z.string().optional(),
  eventUrl: z.string().url().optional().or(z.literal("")),
  categoryId: z.string().optional(),
  resourceId: z.string().optional(),
});
```

---

## 5. Events Page

Create `src/app/(events)/events/page.tsx`:
- New route group `(events)` for `/events` URL
- Reuse 3-column layout from homepage:
  - **Left**: Event category filter + date range filter
  - **Middle**: Paginated event cards list
  - **Right**: Map with event location markers

Reuse components:
- `FilterSidebar` → filter by event category
- `ResourceListPanel` → event cards list
- `Map` → show event locations

---

## 6. Event Card Component

Create `src/app/ui/events/EventCard.tsx`:
- Display: title, date/time, location, organizer, category
- Click to show details/Location on map
- Link to associated Resource (if any)

---

## 7. Admin Dashboard

Add to `src/app/profile/admin/`:
- Event approval table (reuse `AdminResourceTable` pattern)
- Filter by PENDING status
- Approve/Reject actions

---

## Implementation Order

1. **Schema** → Prisma migration
2. **Types** → Add Event types to `types.ts`
3. **API** → Create event routes
4. **Validation** → Create eventSchema.ts
5. **Components** → AddEventPopup, EventCard
6. **Page** → Create `/events` page
7. **Admin** → Add event management

---

## Notes

- Events follow same approval workflow as Resources (PENDING → APPROVED/REJECTED)
- Anyone logged in can create; admins approve
- Events can reference hosting Resource (optional)
- Reuse existing UI patterns for consistency