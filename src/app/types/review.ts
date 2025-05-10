
import type { Resource } from "@/app/types/resource"; 
import type { User } from '@/app/types/user';


export type ResourceReview = {
    id:string;
    rating: string;
    User: User;
    Resource: Resource[];
    content: string;
    createdAt: string;
    updatedAt: string;
}