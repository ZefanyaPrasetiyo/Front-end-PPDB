import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getConnection } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        // 1) basic existence check
        if (!credentials) {
          console.log("LOGIN FAILED: missing credentials object");
          return null;
        }

        // 2) validate with Zod
        const parsed = credentialsSchema.safeParse({
          email: credentials.email,
          password: credentials.password,
        });

        if (!parsed.success) {
          console.log("LOGIN FAILED: validation error", parsed.error.format());
          return null;
        }

        // 3) after validation, proceed to DB
        try {
          const pool = await getConnection(); // pool or connection factory
          // if getConnection returns pool, pool.query works directly
          const [rows]: any = await pool.query(
            "SELECT * FROM users WHERE email = ? LIMIT 1",
            [parsed.data.email]
          );

          const user = rows?.[0];
          if (!user) {
            console.log("LOGIN FAILED: user not found");
            return null;
          }

          const isValid = await bcrypt.compare(parsed.data.password, user.password);
          if (!isValid) {
            console.log("LOGIN FAILED: wrong password");
            return null;
          }

          // success: include role so jwt callback can pick it up
          return {
            id: user.id,
            name: user.nama,
            email: user.email,
            role: user.role,
          };
        } catch (err) {
          console.error("AUTH ERROR:", err);
          return null;
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role;
      console.log(token)
      return token;
    },

    async session({ session, token }) {
      (session.user as any).role = token.role;
      console.log(session)
      return session;
    },
  },

  // pages: {
  //   signIn: "/login",
  // },
});

export { handler as GET, handler as POST };
