import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDb } from "@utils/database";
import User from "@models/user";
console.log({
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_SECRET_ID,
});
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET_ID,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        const sessionuser = await User.findOne({
          email: session.user.email,
        });
        session.user.id = sessionuser._id.toString();
        return true;
      } catch (err) {
        console.log(err);
      }
    },
    async signIn({ profile }) {
      try {
        await connectToDb();
        //lets check if the user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });

        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.image,
          });
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
});
export { handler as GET, handler as POST };
