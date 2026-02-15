"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "../components/AuthProvider";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavFooterRoutes = [
    /^\/account(\/.*)?$/,
    /^\/admin(\/.*)?$/,
    /^\/request$/,
  ];
  const hideNavFooter = hideNavFooterRoutes.some((regex) =>
    regex.test(pathname),
  );
  return (
    <AuthProvider>
      {!hideNavFooter && <Navbar />}
      <main className="font-sans selection:bg-sapphire selection:text-white bg-white">
        {children}
      </main>
      {!hideNavFooter && <Footer />}
    </AuthProvider>
  );
}
