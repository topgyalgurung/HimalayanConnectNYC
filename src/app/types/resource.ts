export type Location = {
  id: number;
  latitude: number;
  longitude: number;
};

export type Resource = {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  openDays: string;
  openTime: string;
  closeTime: string;
  ResourceCategory?: { name: string } | null;
  Location: Location[];
  status: string;
};