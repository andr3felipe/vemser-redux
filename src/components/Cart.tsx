import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { ShoppingCart } from "@phosphor-icons/react";
import { CartItem } from "./CartItem";
import { useCart } from "@/redux/hooks/cartHooks";

export function Cart() {
  const cart = useCart();

  return (
    <div className="fixed p-3 border-2 rounded-full border-cyan-300 right-8 bottom-8 hover:cursor-pointer hover:text-cyan-300 bg-primary text-primary-foreground">
      <Drawer direction="right">
        <DrawerTrigger className="flex items-center gap-2" aria-label="Cart">
          <ShoppingCart size={"1.5rem"} />
        </DrawerTrigger>
        <DrawerContent className="top-0 mt-0 right-0 min-w-[300px]">
          <DrawerHeader>
            <DrawerTitle>Cart</DrawerTitle>
            <DrawerDescription>{cart.length} itens.</DrawerDescription>
          </DrawerHeader>
          <div className="flex flex-col overflow-auto text-center text-card-foreground gap-14 sm:max-h-[70vh] max-h-[60vh]">
            {cart.length > 0 ? (
              cart.map((product) => (
                <CartItem key={product.id} product={product} />
              ))
            ) : (
              <DrawerDescription className="py-2 font-medium">
                Cart empty.
              </DrawerDescription>
            )}
          </div>
          <DrawerFooter>
            <Button disabled={cart.length === 0}>Checkout</Button>
            <DrawerClose>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
