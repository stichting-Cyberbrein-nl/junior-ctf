import localFont from "next/font/local";
import ThemeProvider from "./theme-provider";
import ServiceWorker from "./components/ServiceWorker";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Cyberbrein the Game",
  description: "Cyberbrein the Game",
  manifest: '/manifest.json',
  themeColor: '#2563eb',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Cyberbrein the Game',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-200`}
      >
        <ThemeProvider>
          <ServiceWorker />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
