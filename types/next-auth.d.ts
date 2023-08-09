import NextAuth from "next-auth"
import { StaticImport } from "next/dist/shared/lib/get-img-props"
import { StaticImageData } from "next/image"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
        email: string
        id: string
        image: string
    }
  }

  interface Profile {
    email: string
    picture: string
    name: string
  }
}