


# zod for form validation 
- If your form grows (images + text + hours), you may hit the 1MB Server Action limit.
- // Option 1: increase body size in next.config.js
// Option 2: use Cloudinary + store URL (which you're doing ✅)


// auth

 not using next-auth, but instead managing your own JWT-based sessions with a custom session cookie (stored securely
 -  Use getSession() from your lib/session.ts file to access the user session inside your server actions.
-  


// client session: 
UserProvider is a React Context that wraps your app and stores user session data on the client, by calling getSession() once on mount
- lib/session.ts, server only: Reads session cookie securely on server
- User Provider, client only: Reads session via API call and stores it in React state
- useUser, client only: hook to access session in component 
