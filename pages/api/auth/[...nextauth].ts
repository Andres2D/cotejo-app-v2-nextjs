import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"
import { googleAuth } from '../../../server/auth';

export default NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      id: 'google_user',
      clientId: process.env.GOOGLE_CLIENT || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
    CredentialsProvider({
      id: 'credential_user',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'jhon@mail.com' },
        password: { label: 'Password', type: 'password'}
      },
      async authorize(credentials) {
        const response = await fetch(`${process.env.API_URL}/api/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const player = await response.json();
        
        if(!response.ok || !player) {
          return null;
        }
        
        return player;
      }
    }),
  ],
  callbacks: {
    async signIn({account, credentials}) { 
      
      if(credentials?.csrfToken) {
        return true;
      }

      if(!account!.id_token) {
        return false
      }

      const userSigned = await googleAuth(account!.id_token!);

      if(!userSigned) {
        return false;
      }
      
      return true;
    },
    async redirect() {
      return  Promise.resolve('/menu');
    },
  },
  session: {
    strategy: 'jwt'
  }
});
