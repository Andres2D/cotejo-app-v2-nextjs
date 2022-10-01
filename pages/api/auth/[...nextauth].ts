import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import { googleAuth } from '../../../server/auth';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  callbacks: {
    async signIn({account}) { 
      if(!account.id_token) {
        return false
      }

      const token = await googleAuth(account.id_token);

      if(!token) {
        return false;
      }
      // localStorage.setItem('token', token);
      return true;
    },
    async redirect() {
      return  Promise.resolve('/menu');
    },
  }
});
