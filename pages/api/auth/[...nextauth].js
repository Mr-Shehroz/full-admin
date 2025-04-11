import { MongoDBAdapter } from '@auth/mongodb-adapter'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import clientPromise from '../../../lib/db'
const adminEmail = ['shehrozkhan.wow@gmail.com']

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: ({token,session,user}) => {
      console.log(session);
      
      if (adminEmail.includes(session?.user?.email)) {
        return session
      } else {
        return false
      }
    }
  }
})