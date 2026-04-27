import "./globals.css";
import Header from "./_common/header/layout";
import Footer from "./_common/footer/layout";
import HomePage from "./homepage/page";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div>
      <HomePage />
    </div>
  );
}
