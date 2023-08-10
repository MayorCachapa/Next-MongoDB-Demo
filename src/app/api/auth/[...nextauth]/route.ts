import NextAuth, { Session } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from "../../../../../utils/database";
import User from "../../../../../models/user"

/* 
In contrast to Pages directory, we create a folder with the catchall nextauth naming convention

Inside it, we create the route.ts file to declare our endpoints. Notice that we can enter the route.ts file anywhere.
However if it coincides with a page or layout file, it will conflict with Next because it won't know if you
are hitting the endpoint of the main page it conflicts with
*/

// Declare a handler and pass NextAuth
const handler = NextAuth({
    // Declare the Providers (Twitter, Google, Discord, etc.)
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    // Declare the callbacks to generate a session and sign in a user
    callbacks: {
        async session({ session }) {
            // Check if the User exists on the DB
            const sessionUser = await User.findOne({
                email: session.user.email
            })
            // If so, assign the ID of the user to the session
    
            if (sessionUser) {
                session.user.id = sessionUser._id.toString();
            }
            // Return the session instance
            return session;
        },
    
        async signIn({ profile }) {
            // Check if profile exists
            if (!profile) return false;
            try {
                // Try to connect to DB
                await connectToDB();
    
                // Check if the user exists by using the method findOne (similar to objects.all.where()):
                const userExists = await User.findOne({
                    email: profile.email,
                });
    
                // If the user does not exist, proceed to create using the method .create
                !userExists && (
                    await User.create({
                        // Pass the value email inside of the profile object
                        email: profile.email,
                        // Create a username based on the email without anything after the @
                        username: profile.email?.split('@')[0],
                        // Fetch the profile picture and whitelist the provider in next.config (otherwise errors will rise)
                        image: profile.picture
                    })
                )
                return true;
    
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }


    /*
    To create our own pages for different auth actions (most come prebuilt in NextAuth) we can declare a pages object
    and there establish the route. Then, inside app, we can create a folder with the exact page name that matches
    Example:
    pages: {
        signIn: '/signin',
        signOut: '/signout',
    }

    */
})

/*
As part of the changes, we know have to export named functions (the handler) as the request verb 
that should trigger the response. In this case, only POST and GET
*/
export { handler as GET, handler as POST }