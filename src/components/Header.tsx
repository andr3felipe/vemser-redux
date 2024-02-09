import { useSelector } from "react-redux";
import { Cart } from "./Cart";
import { RootState } from "@/store";

export function Header() {
  const { cart } = useSelector((state: RootState) => state.cart);

  return (
    <div className="bg-primary text-primary-foreground p-8 font-bold border-b-2 border-cyan-300">
      <div className="max-w-[1400px] mx-auto flex justify-between items-center">
        <a href="/" className="hover:text-cyan-300 text-xl">
          Redux Store
        </a>

        <div className="hover:cursor-pointer hover:text-cyan-300 relative">
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
