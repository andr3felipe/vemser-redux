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
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ShoppingCart } from "@phosphor-icons/react";
import { CartItem } from "./CartItem";

export function Cart() {
  const { cart } = useSelector((state: RootState) => state.cart);

  return (
    <Drawer direction="right">
      <DrawerTrigger className="flex items-center gap-2">
        Carrinho <ShoppingCart size={32} />
      </DrawerTrigger>
      <DrawerContent className="top-0 mt-0 right-0 min-w-[300px]">
        <DrawerHeader>
          <DrawerTitle>Carrinho</DrawerTitle>
          <DrawerDescription>Boa compra!</DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col overflow-auto text-center text-card-foreground gap-14 sm:max-h-[70vh] max-h-[60vh]">
          {cart.length > 0 ? (
            cart.map((product) => (
              <CartItem key={product.id} product={product} />
            ))
          ) : (
            <DrawerDescription className="py-2 font-medium">
              Carrinho vazio.
            </DrawerDescription>
          )}
        </div>
        <DrawerFooter>
          <Button>Finalizar compra</Button>
          <DrawerClose>
            <Button variant="outline">Fechar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
