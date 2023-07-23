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
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
