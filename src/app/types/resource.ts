export type ResourceStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Resource {
  id: number;
  name: string;
  description?: string | null;
  address?: string | null;
  city?: string | null;
  phone?: string | null;
  email?: string | null;
  url?: string | null;
  openDays?: string | null;
  openTime?: Date | null;
  closeTime?: Date | null;
  status: ResourceStatus;
  createdAt: Date;
  updatedAt: Date;
  suggestedById?: number | null;
  categoryId?: number | null;
  features?: string | null;
  amenities?: string | null;
  rating?: number | null;
  imageUrl?: string | null;
  facebookLink?: string | null;
  ResourceCategory?: { name: string } | null;
  Location: Location[];
}
