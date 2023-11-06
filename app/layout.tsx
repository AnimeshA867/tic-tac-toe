import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tic Tac Toe by Animesh",
  description:
    "Play a fun Tic Tac Toe game created by Animesh Acharya using Next.js and Tailwind CSS. Challenge your friends and have fun!",
  keywords: "Tic Tac Toe, Next.js, Tailwind CSS, Game, Animesh Acharya",
  openGraph: {
    type: "website",
    url: "tictactoebyanimesh.netlify.com",
    title: "Tic Tac Toe by Animesh",
    description:
      "Play a fun Tic Tac Toe game created by Animesh Acharya using Next.js and Tailwind CSS. Challenge your friends and have fun!",
    images: [
      {
        url: "https://nextjs.org/og.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://nextjs.org/og-alt.png",
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    locale: "ne_NP",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  twitter: {
    card: "summary_large_image",
    site: "@animeshach867",
    title: "Tic Tac Toe, Next.js, Tailwind CSS, Game, Animesh Acharya",
    description:
      "Play a fun Tic Tac Toe game created by Animesh Acharya using Next.js and Tailwind CSS. Challenge your friends and have fun!",
    creator: "@animeshach867",

    images: ["./og.png"],
  },
  metadataBase: new URL("http://localhost:3000"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
