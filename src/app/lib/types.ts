export type ResourceStatus = "PENDING" | "APPROVED" | "REJECTED";

export type Location = {
  id: number;
  latitude: number | null;
  longitude: number | null;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  resources: Resource[];
  ResourceEditSuggestion: ResourceEditSuggestion[];
  reviews: {
    id: number;
    content: string;
    resource: Resource;
    rating: number;
    createdAt: string;
  }[];
  likes: { id: number; user: User; resource: Resource };
};

export interface Resource {
  id: string;
  name: string;
  description?: string | null;
  content?: string | null;
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
  suggestedById?: number | null;
  categoryId?: number | null;
  features?: string | null;
  amenities?: string | null;
  rating?: number | null;
  imageUrl?: string | null;
  facebookLink?: string | null;
  ResourceCategory?: { name: string } | null;
  Location: Location[];
  updatedAt: Date;
  editResource?: ResourceEditSuggestion | null;
}

export type ResourceEditSuggestion = {
  id: string;
  name: string;
  description: string;
  address: string;
  openDays: string;
  phone: string;
  url: string;
  openTime: Date;
  closeTime: Date;
  resource: Resource;
  User: User;
  ResourceCategory?: { name: string } | null;
  status: ResourceStatus;
  createdAt: Date;
  Location: Location[]
  updatedAt: Date;
};

export type ResourceReview = {
  id: string;
  rating: string;
  User: User;
  Resource: Resource[];
  content: string;
  createdAt: string;
  updatedAt: string;
};


export interface EditResourceInput {
  name: string;
  address: string;
  resourceId: string;
  categoryId: string | null;
  city?: string | null;
  openDays?: string | null;
  openTime?: string | null;
  closeTime?: string | null;
  phone?: string | null;
  email?: string | null;
  url?: string | null;
  facebookLink?: string | null;
  description?: string | null;
  image?: string | null;
};

export type ResourceFormData = {
  name: string;
  address: string;
  categoryId?: string;
  city?: string;
  openDays?: string;
  openTime?: string;
  closeTime?: string;
  phone?: string;
  email?: string;
  url?: string;
  facebookLink?: string;
  description?: string;
  image?: string;
};

// export type ResourceLike{

// }