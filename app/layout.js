// filepath: /home/klaus/repos/samba/app/layout.js
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard Access",
  description: "Dashboard para la gestión de usuarios y logs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/uabcIcon.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}