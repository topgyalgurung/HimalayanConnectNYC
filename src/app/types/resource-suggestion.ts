import type { Resource } from "@/app/types/resource"; 
import type { User } from '@/app/types/user';

export type Location = {
    id: number;
    latitude: number;
    longitude: number;
  };

export type ResourceEditSuggestion = {
     id: string;
  name: string;
  description: string;
      address: string;
      openDays: string;
      phone: string;
      url: string;
    openTime: string;
    closeTime: string;
    resource: Resource;
    User: User;
      ResourceCategory?: { name: string } | null;
      status: string;

}