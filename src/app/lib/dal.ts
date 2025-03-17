// data access layer to centralize your data requests and authorization logic.
// 
// protect data fetched at request time 
// consider a shared layout that fetches the user data and displays the user image in a nav. 
// Instead of doing the auth check in the layout, you should fetch the user data (getUser()) in the layout and do the auth check in your DAL.
import 'server-only'
import { cache } from 'react'
import { cookies } from 'next/headers'
import { decrypt } from '@/app/lib/session'
import prisma from './prisma'
import { redirect } from 'next/navigation'
 
// return user info to make further request after checking session valid 
export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
 
  if (!session?.userId) {
    redirect('/login')
  }
 
  return { isAuth: true, userId: session.userId, role:session.role }
})

export const getUser= cache(async () => {
    const session = await verifySession()
    if (!session) return null

    // get user id from session and fetch data 
   
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(session.userId)
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                role: true,
                image:true
            }

        })
        return user;
    } catch (error) {
        console.log('Failed to fetch user')
        return null
    }
})
  