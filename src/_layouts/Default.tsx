import { Cart } from "@/components/Cart";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

export function Default() {
  return (
    <>
      <Header />
      <Outlet />
      <Cart />

      <Toaster />
      <Footer />
    </>
  );
}
