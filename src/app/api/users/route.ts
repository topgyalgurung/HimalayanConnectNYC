// GET, PATCH, DELETE users

import { prisma } from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';
// already cache:"no-store"

export async function GET() {
    try {
        const session = await getSession();
        if (!session || !session.userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
          }
        const user = await prisma.user.findUnique({
            where: {
                id:parseInt(session.userId),
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                image: true,
                resources: {
                    select: {
                        id: true,
                        name: true,
                        status: true,
                    }
                },
                ResourceEditSuggestion: {
                    select: {
                        id: true,
                        name: true,
                        status: true,
                    }
                    
                },
                reviews: {
                    select: {
                        id: true,
                        rating: true,
                        content: true,
                        createdAt: true,
                        resource: {
                            select: {
                                name: true
                            }
                        }
                    }
                    
                },
                likes: {
                    select: {
                        id: true,
                        resource: {
                            select: {
                                id: true,
                                name: true,
                                description: true,
                                status: true,
                                address: true,
                                city: true,
                                openDays: true,
                                openTime: true,
                                closeTime: true,
                                phone: true,
                                email: true,
                                url: true,
                                facebookLink: true,
                                rating: true,
                                imageUrl: true,
                                ResourceCategory: {
                                    select: {
                                        id: true,
                                        name: true
                                    }
                                },
                                Location: {
                                    select: {
                                        id: true,
                                        latitude: true,
                                        longitude: true
                                    }
                                },
                                createdAt: true,
                                // updatedAt: true
                            }
                        }
                    }
                },
            }
                 
        });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
          }
        console.log("Fetched users:", JSON.stringify(user))
        return NextResponse.json(user);
    } catch (error) {
        console.log("Error fetching users: ", error);
        return NextResponse.json({error: "Failed to fetch users"},{status: 500})
    }
}