import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],

  secret: process.env.JWT_SECRET
  // pages: {
  //     signIn: '/auth/signin',
    //  signOut: '/auth/signout',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/', // (used for check email message)
  //   newUser: '/' // New users will be directed here on first sign in (leave the property out if not of interest)
  //  }

})