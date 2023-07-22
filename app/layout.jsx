import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/common/navbar";

export const metadata = {
  title: "Home | NextDrive",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-zinc-50 dark:bg-zinc-800">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="fixed top-0 left-0 w-full h-16 z-50">
            <Navbar />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
