import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { getSession } from '@/app/lib/session';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getSession();

    if (!session || !session.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // check if admin
    if (session.role !== "ADMIN") {
      const suggestions = await prisma.resourceEditSuggestion.findMany({
        where: { suggestedById: Number(session.userId) },
        orderBy: { createdAt: 'desc' },
      });
  
      return NextResponse.json(suggestions);
      
    }
    // If admin, fetch ALL suggestions
    const allSuggestions = await prisma.resourceEditSuggestion.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(allSuggestions);

   
  } catch (error) {
    console.error('Failed to fetch resource edit suggestions:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ADD POST 
export async function POST(req: Request) {
    try {
      const session = await getSession();
      if (!session || !session.userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
        
    const userId = Number(session.userId);
  
      const body = await req.json();
      const {
        resourceId,
        name,
        address,
        phone,
        url,
        openTime,
        closeTime,
      } = body;
  
      const newSuggestion = await prisma.resourceEditSuggestion.create({
        data: {
          suggestedById: userId,
          resourceId,
          name,
          address,
          phone,
          url,
          openTime: openTime ? new Date(openTime) : null,
          closeTime: closeTime ? new Date(closeTime) : null,
          status: 'PENDING',
        },
      });
  
      return NextResponse.json({ success: true, suggestion: newSuggestion });
    } catch (error) {
      console.error('Error submitting edit suggestion:', error);
      return NextResponse.json({ error: 'Failed to submit suggestion' }, { status: 500 });
    }
  }
