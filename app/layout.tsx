import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Vidyayatan Infotech : Frontend Hiring Assignment",
    description: "Trusted enabler for future-ready enterprises",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={cn("min-h-screen bg-background antialiased", inter.className)}>
                {children}
            </body>
        </html>
    );
}
