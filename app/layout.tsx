import ClientOnly from "./components/ClientOnly";
import Navbar from "./components/Navbar/Navbar";
import Modal from "./components/modals/Modals";
import RegisterModal from "./components/modals/RegisterModal";
import "./globals.css";
import { Nunito } from 'next/font/google';
import ToastProvider from "./providers/ToastProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import RentModal from "./components/modals/RentModal";
import SearchModal from "./components/modals/SearchModal";

const font = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Booking app",
  description: "WEBBOOKING",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const currentUser = await getCurrentUser();


  return (
    <html lang="en">
      <body className={font.className}>
      <ClientOnly>
          <ToastProvider />
          <LoginModal />
          <SearchModal/>
          <RegisterModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
