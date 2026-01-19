import { DefaultSession } from "next-auth";


declare module 'next-auth' {
  interface Session {
    user: User & DefaultSession["user"]

  }

  interface User {
    id: String
    name?: String
    email?: String
    username?: String
    bio?: String
  }
}