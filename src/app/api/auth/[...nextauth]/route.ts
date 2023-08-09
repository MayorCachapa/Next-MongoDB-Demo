import NextAuth, { Session } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';


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

    async session({ session }) {
        
    },

    async signIn({ profile }) {
        try {

        } catch (error) {

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