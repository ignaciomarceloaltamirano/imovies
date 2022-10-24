import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.googleClientId,
      clientSecret: process.env.googleSecret,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
  },
  adapter: FirestoreAdapter({
    apiKey: 'AIzaSyBABhorf2x21zDwNXfrJgDz3rgts5x0iGc',
    authDomain: 'imovies-86792.firebaseapp.com',
    projectId: 'imovies-86792',
    storageBucket: 'imovies-86792.appspot.com',
    messagingSenderId: '161710565787',
    appId: '1:161710565787:web:1b1efe390bca29e9a7993e',
  }),
  callbacks: {
    async session({ session, user }) {
      session.user.tag = session.user.name
        .split(' ')
        .join('')
        .toLocaleLowerCase();

      session.user.uid = user.id;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
