import type { Resource } from "@/app/types/resource"; 
import type { ResourceEditSuggestion } from "./resource-suggestion";

export type User = {
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    image: string,
    createdAt: string,
    updatedAt: string,
    resources: Resource[],
    ResourceEditSuggestion: ResourceEditSuggestion[] 
    reviews: { id: number, content: string, resource:Resource[],rating: number, createdAt:string}[]
    likes:{id:number,user:User,resource:Resource }
    
}