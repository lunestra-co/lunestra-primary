import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "../components/AuthProvider";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Lunestra & Co.",
  description: "Fine jewellery crafted with timeless elegance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Great+Vibes&family=Inter:wght@200;300;400;500;600&family=Bodoni+Moda:ital,wght@0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-ui antialiased text-brandblack">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
