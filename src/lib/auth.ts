import { PrismaAdapter } from "@auth/prisma-adapter";
import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as NextAuthOptions["adapter"],
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    pages: {
        signIn: "/auth/login",
        error: "/auth/error",
    },
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email y contraseña son requeridos");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                    include: {
                        professionalProfile: true,
                        patientProfile: true,
                    },
                });

                if (!user || !user.hashedPassword) {
                    throw new Error("Credenciales inválidas");
                }

                const isValidPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if (!isValidPassword) {
                    throw new Error("Credenciales inválidas");
                }

                // Update last login
                await prisma.user.update({
                    where: { id: user.id },
                    data: { lastLoginAt: new Date() },
                });

                return {
                    id: user.id,
                    email: user.email,
                    name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email,
                    role: user.role,
                    image: user.avatarUrl,
                };
            },
        }),
        // Google OAuth (optional - requires env vars)
        ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
            ? [
                GoogleProvider({
                    clientId: process.env.GOOGLE_CLIENT_ID,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                }),
            ]
            : []),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
            }
            return session;
        },
        async redirect({ url, baseUrl }) {
            // Handle role-based redirects
            if (url.startsWith(baseUrl)) {
                return url;
            }
            return baseUrl;
        },
    },
    events: {
        async signIn({ user }) {
            console.log(`User signed in: ${user.email}`);
        },
    },
    debug: process.env.NODE_ENV === "development",
};
