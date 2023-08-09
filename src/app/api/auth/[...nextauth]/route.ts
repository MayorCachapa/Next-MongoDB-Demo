import NextAuth, { Session } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import { connectToDB } from "../../../../../utils/database";
import User from "../../../../../models/user"

/* 
In contrast to Pages directory, we create a folder with the catchall nextauth naming convention

Inside it, we create the route.ts file to declare our endpoints. Notice that we can enter the route.ts file anywhere
however if it coincides with a page or layout file, it will conflict with Next because it won't know if you
are hitting the endpoint or the main page it conflicts with
*/

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],

    callbacks: {
        async session({ session }) {

            const sessionUser = await User.findOne({
                email: session.user.email
            })
    
            if (sessionUser) {
                session.user.id = sessionUser._id.toString();
            }
    
            return session;
        },
    
        async signIn({ profile }) {
            if (!profile) return false;

            try {
                await connectToDB();
    
                // Check if the user exists by using the method findOne (similar to objects.all.where()):
                const userExists = await User.findOne({
                    email: profile.email,
                });
    
                // If the user does not exist, we proceed to create using the method .create
                !userExists && (
                    await User.create({
                        email: profile.email,
                        username: profile.email?.split('@')[0],
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