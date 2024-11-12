import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from './ClientLayout'; // Import the new ClientLayout component

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard Access",
  description: "Dashboard para la g",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
