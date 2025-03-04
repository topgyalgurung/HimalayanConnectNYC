export type Resource = {
  id: string;
  name: string;
  address: string;
  borough: string;
  city: string;
  openDays: string;
  openTime: string;
  closeTime: string;
  rating: number;
  ResourceCategory?: {
    name: string;
  };
  // Add other fields as needed
}; 