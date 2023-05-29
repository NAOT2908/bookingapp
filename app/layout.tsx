import ClientOnly from "./components/ClientOnly";
import Navbar from "./components/Navbar/Narbar";
import Modal from "./components/modals/Modals";
import RegisterModal from "./components/modals/RegisterModal";
import "./globals.css";
import { Nunito } from 'next/font/google';
import ToastProvider from "./providers/ToastProvider";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Booking app",
  description: "WEBBOOKING",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToastProvider/>
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
