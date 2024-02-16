import {
  HouseLine,
  ShoppingBagOpen,
  SignIn,
  User,
} from "@phosphor-icons/react";
import { NavLink, useLocation } from "react-router-dom";
import { HeaderMobile } from "./HeaderMobile";

export function Header() {
  const location = useLocation();
  const token = localStorage.getItem("token");

  return (
    <div className="px-4 py-8 font-bold border-b-2 bg-primary text-primary-foreground border-cyan-300">
      <nav className="max-w-[1440px] mx-auto grid grid-cols-2 justify-between items-center">
        <NavLink to="/" className="text-3xl hover:text-cyan-300">
          Redux Store
        </NavLink>

        <div className="items-center justify-center hidden gap-20 sm:flex">
          {location.pathname !== "/" && (
            <NavLink
              to={"/"}
              className="flex items-center justify-center gap-2 text-xl hover:cursor-pointer hover:text-cyan-300"
            >
              <HouseLine size={32} /> Home
            </NavLink>
          )}

          {location.pathname !== "/store" && (
            <NavLink
              to={"/store"}
              className="flex items-center justify-center gap-2 text-xl hover:cursor-pointer hover:text-cyan-300"
            >
              <ShoppingBagOpen size={32} />
              Store
            </NavLink>
          )}

          {location.pathname !== "/login" && !token && (
            <NavLink
              to={"/login"}
              className="flex items-center justify-center gap-2 text-xl hover:cursor-pointer hover:text-cyan-300"
            >
              <SignIn size={32} /> Login
            </NavLink>
          )}

          {location.pathname !== "/auth/panel" && token && (
            <NavLink
              to={"/auth/panel"}
              className="flex items-center justify-center gap-2 text-xl hover:cursor-pointer hover:text-cyan-300"
            >
              <User size={32} /> Panel
            </NavLink>
          )}
        </div>

        <HeaderMobile />
      </nav>
    </div>
  );
}
