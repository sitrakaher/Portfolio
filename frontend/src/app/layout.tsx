import type { Metadata } from "next";
import "./globals.css";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Développeur Fullstack React Node MongoDB",
  description: "Développeur Fullstack spécialisé en React, Next.js, MongoDB. Création d'application web modernes.",
  keywords:[
    "Dévellopeur Fullstack",
    "React Developer",
    "Next.js",
    "Node.js",
    "MongoDB",
  ],
  openGraph:{
    title:"Développeur Fullstack",
    description:"PortFolio professionnel",
    type:"website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastContainer
          position = "top-center"
          autoClose = {2000}
          transition = {Flip}
        />
        {children}
      </body>
    </html>
  );
}
