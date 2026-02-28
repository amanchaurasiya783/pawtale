import { Fredoka } from "next/font/google";
import Footer from "./_common/footer/layout";
import Header from "./_common/header/layout";
import "./globals.css";
import { ThemeProvider } from "./_components/Themes/page";
import ProgressBar from "./providers/progress";
import { SessionProviderWrapper } from "./providers";

export const metadata = {
  title: "PetCare",
  description: "Let's Care Together",
  other: {
    link: [{ rel: "preconnect", href: "https://fonts.googleapis.com" }],
  },
};

const fredoka = Fredoka({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  style: ["normal"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          src="https://checkout.razorpay.com/v1/checkout.js"
          async
        ></script>
      </head>
      <body className={fredoka.className}>
        <SessionProviderWrapper>
          <ThemeProvider>
            <ProgressBar />
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
