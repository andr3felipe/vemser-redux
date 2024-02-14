import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { HouseLine, List, ShoppingBagOpen, X } from "@phosphor-icons/react";
import { NavLink, useLocation } from "react-router-dom";

export function HeaderMobile() {
  const location = useLocation();

  return (
    <div className="flex p-2 border-2 rounded-sm justify-self-end border-cyan-300 hover:cursor-pointer hover:text-cyan-300 bg-primary text-primary-foreground sm:hidden">
      <Drawer direction="right">
        <DrawerTrigger className="flex items-center gap-2" aria-label="Cart">
          <List size={"1.5rem"} />
        </DrawerTrigger>
        <DrawerContent className="top-0 mt-0 right-0 min-w-[300px]">
          <DrawerHeader className="text-left ">
            <DrawerTitle>Navigation</DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col mt-2">
            <div className="items-center justify-center gap-20">
              {location.pathname !== "/" && (
                <NavLink
                  to={"/"}
                  className="flex items-center justify-center gap-2 p-2 text-xl hover:cursor-pointer hover:bg-primary hover:text-primary-foreground"
                >
                  <HouseLine size={"1.5rem"} /> Home
                </NavLink>
              )}

              {location.pathname !== "/store" && (
                <NavLink
                  to={"/store"}
                  className="flex items-center justify-center gap-2 p-2 text-xl hover:cursor-pointer hover:bg-primary hover:text-primary-foreground"
                >
                  <ShoppingBagOpen size={"1.5rem"} />
                  Store
                </NavLink>
              )}
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose>
              <Button
                variant="outline"
                className="absolute top-0 right-0 border-none"
                aria-label="Close Navigation"
              >
                <X size={"1.5rem"} />
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
