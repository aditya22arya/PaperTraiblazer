import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providors/theme-providor";
import { ConvexClientProvider } from "@/components/providors/convex-providor";
import { Toaster} from "sonner";
import { ModalProvidor } from "@/components/providors/modal-providor";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PaperTrailblazer",
  description: "a very own persoonalised app for making notes and publishing it",
  icons:{
    icon:[
      {
        media:"(prefers-color-scheme:light)",
        url:"/logo-dark.svg",
          href:"/logo-dark.svg"
      },
      {
        
          media:"(prefers-color-scheme:dark)",
          url:"/logo.svg",
          href:"/logo.svg"
        
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
        <ThemeProvider 
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        storageKey="paperTrailblazer-theme"
        >
          <div className="min-h-screen">
            {children}
          </div>
        <Toaster position="bottom-center"/>
        <ModalProvidor/>
        
        </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
