import { verifySession } from '@/app/lib/dal'
 
export async function GET() {
  // User authentication and role verification
    const session = await verifySession()
    
    // It first checks for an active session, and then verifies if the logged-in user is an 'admin'
 
  // Check if the user is authenticated
  if (!session) {
    // User is not authenticated
    return new Response(null, { status: 401 })
  }
 
  // Check if the user has the 'admin' role
  if (session?.role !== 'admin') {
    // User is authenticated but does not have the right permissions
    return new Response(null, { status: 403 })
  }
 
  // Continue for authorized users
}