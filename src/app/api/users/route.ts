import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

// GET, POST
export async function GET(request:NextRequest){
  try {
      const userId = await getDataFromToken(request);
      console.log("Extracted userId: ", userId, typeof userId);
      const user = await prisma.user.findUnique({
          where:{id: Number(userId)},
          select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              // profilePicture: true,
              // exclude password
          }
      });
      console.log("Prisma query result: ", user); // Debugging
          
      if (!user) {
          return NextResponse.json({ message: "User not found" }, { status: 404 }); 
      }
      return NextResponse.json({
          message:"User found",
          data:user
      })
      
  } catch (error: unknown) {
      console.log("error extracting user")
      return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession();
  const currentUserEmail = session?.user?.email!;
  const { targetUserId } = await req.json();

  const currentUserId = await prisma.user
    .findUnique({ where: { email: currentUserEmail } })
    .then((user) => user?.id!);

  const record = await prisma.follows.create({
    data: {
      followerId: currentUserId,
      followingId: targetUserId,
    },
  });

  return NextResponse.json(record);
}

