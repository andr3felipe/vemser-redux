import { Cart } from "./Cart";
import { useAppSelector } from "@/store";

export function Header() {
  const { cart } = useAppSelector((state) => state.cart);

  return (
    <div className="p-8 font-bold border-b-2 bg-primary text-primary-foreground border-cyan-300">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        <a href="/" className="text-xl hover:text-cyan-300">
          Redux Store
        </a>

        <div className="relative hover:cursor-pointer hover:text-cyan-300">
          <Cart />
          {cart.length > 0 && (
            <span className="absolute top-[-20px] right-[-15px] font-bold bg-primary-foreground text-primary px-[0.35rem] rounded-lg flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
