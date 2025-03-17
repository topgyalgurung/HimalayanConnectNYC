import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { Toaster } from "react-hot-toast";
import NavMenuServer from "./components/NavMenuServer";
import { UserProvider } from "./context/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Himalayan Connect NYC",
  description: "Generated by create next app",
};

/***Due to Partial Rendering, be cautious when doing checks in Layouts as these don't re-render on navigation,
 *  meaning the user session won't be checked on every route change.
 */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const user = await getUser();
  return (
    <html lang="en" data-theme="winter">
      <body className={`${inter.className} overflow-hidden`}>
        {/* <UserProvider> */}
        <NavMenuServer />
        <Toaster position="bottom-center" toastOptions={{ duration: 5000 }} />
        {children}
        {/* </UserProvider> */}
        <footer className="bg-slate-900 text-white p-4 text-center shadow-md h-[60px] flex-none">
          © Himalayan Connect NYC
        </footer>
      </body>
    </html>
  );
}
