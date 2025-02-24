import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";


export const metadata: Metadata = {
  title: "FoodLogAI",
  description: "Lose weight smarter with AI-powered meal tracking. Log your food, track calories, and get personalized diet recommendations to hit your weight loss goals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </head>
      <body>
        <Header />
        <div className="page-content">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
