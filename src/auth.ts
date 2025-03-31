import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'

// Define your configuration in a separate variable and pass it to NextAuth()
// This way we can also 'export const config' for use later
export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [Google],
    callbacks: {
          authorized: async ({ auth }) => {
            // Logged in users are authenticated, otherwise redirect to login page
            return !!auth
          },
        },
});

/**
 * NextAuth.js. providers is an array where you list different login options such as Google or GitHub
* The Credentials provider allows users to log in with a username and a password.
 * There are other alternative providers such as OAuth or email.
 */
 // spread authConfig object 