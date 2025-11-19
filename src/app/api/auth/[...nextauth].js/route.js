import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas/login";
import { getUserByEmail } from "@/lib/db"; // contoh fungsi ambil user
import { compare } from "bcryptjs";

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {},

      async authorize(credentials) {
        const parsed = LoginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;

        const user = await getUserByEmail(email);
        if (!user) return null;

        const isValid = await compare(password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.nama,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
