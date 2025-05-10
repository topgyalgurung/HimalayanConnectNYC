export type Location = {
  id: number;
  latitude: number;
  longitude: number;
};

export interface Resource {
  id: string;
  name: string;
  description?: string;
  city?: string;
  address?: string;
  openDays?: string;
  openTime?: string;
  closeTime?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  ResourceCategory?: { name: string } | null;
  Location: Location[];
  phone: string;
  rating: number;
  imageUrl: string;
  facebookLink: string;
  email: string;
  url: string;
}
