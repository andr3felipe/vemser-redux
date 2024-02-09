import { Product } from "@/features/cart/cartSlice";
import { Button } from "./ui/button";
import { Minus, Plus, Trash } from "@phosphor-icons/react";
import { remove, changeQuantity } from "@/features/cart/cartSlice";
import { useDispatch } from "react-redux";

interface CartItemProps {
  product: Product;
}

export function CartItem({ product }: CartItemProps) {
  const dispatch = useDispatch();

  function handleRemove(id: number) {
    dispatch(remove(id));
  }

  function handleIQuantiy({
    action,
    id,
  }: {
    action: "add" | "remove";
    id: number;
  }) {
    dispatch(changeQuantity({ action, id }));
  }
  return (
    <div className="max-w-[300px] flex flex-col gap-2 items-center justify-center border-b-2 border-primary pt-8 mx-2 rounded-lg shadow-lg pb-2">
      <div className="flex flex-row flex-wrap gap-4 justify-around w-full">
        <div className="flex flex-col gap-2">
          <Button
            className="text-xs py-2 px-2"
            onClick={() => handleIQuantiy({ action: "add", id: product.id })}
          >
            <Plus size={"1rem"} weight="bold" />
          </Button>
          <Button
            className="text-xs py-2 px-2"
            onClick={() => handleIQuantiy({ action: "remove", id: product.id })}
          >
            <Minus size={"1rem"} weight="bold" />
          </Button>
        </div>
        <div className="relative">
          <img src={product.image} alt={product.title} className="size-20" />
          <span className="absolute top-[-20px] right-0 font-bold bg-primary text-primary-foreground px-2 rounded-lg flex items-center justify-center">
            {product.quantity}
          </span>
        </div>
        <Button
          className="text-xs py-2 px-2 bg-red-900 hover:bg-red-800"
          onClick={() => handleRemove(product.id)}
        >
          <Trash size={"1rem"} weight="bold" />
        </Button>
      </div>
      <div>
        <h3 className="font-medium max-w-[80%] mx-auto">{product.title}</h3>
        <p className="font-bold">R$ {product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
