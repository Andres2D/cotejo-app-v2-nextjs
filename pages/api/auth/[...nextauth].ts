import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import { googleAuth } from '../../../server/auth';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    })
  ],
  callbacks: {
    async signIn({account}) { 
      if(!account.id_token) {
        return false
      }

      const userSigned = await googleAuth(account.id_token);

      if(!userSigned) {
        return false;
      }
      
      return true;
    },
    async redirect() {
      return  Promise.resolve('/menu');
    },
  }
});
