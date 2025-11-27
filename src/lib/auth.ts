import CredentialsProvider from "next-auth/providers/credentials";
import { getConnection } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";
import type { NextAuthOptions } from "next-auth";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials) return null;

        const parsed = credentialsSchema.safeParse({
          email: credentials.email,
          password: credentials.password,
        });

        if (!parsed.success) return null;

        try {
          const pool = await getConnection();
          const [rows]: any = await pool.query(
            "SELECT * FROM users WHERE email = ? LIMIT 1",
            [parsed.data.email]
          );

          const user = rows?.[0];
          if (!user) return null;

          const isValid = await bcrypt.compare(parsed.data.password, user.password);
          if (!isValid) return null;

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
    if (user) {
      token.id = user.id;
      token.role = user.role;
      token.email = user.email;
      token.name = user.name;
    }
    return token;
  },

  async session({ session, token }) {
    session.user = {
      id: token.id,
      name: token.name,
      email: token.email,
      role: token.role,
    };
    return session;
  },
},
};