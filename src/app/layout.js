import localFont from "next/font/local";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/Geist.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMono.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Job Application Tracker",
  description: "Track and manage your job applications with ease",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
