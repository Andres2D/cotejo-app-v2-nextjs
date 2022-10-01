import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";

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
    async signIn({ user, account, profile, email, credentials }) { 
      // token account account.id_token
      return true;
    },
    async redirect({ url, baseUrl }) {
      return  Promise.resolve('/menu');
    }
  }
});
