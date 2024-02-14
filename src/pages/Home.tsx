import { Button } from "@/components/ui/button";
import { useProducts } from "@/redux/hooks/productsHooks";
import { NavLink } from "react-router-dom";

export function Home() {
  const products = useProducts();

  const electronics = products?.filter(
    (product) => product.category === "electronics"
  );

  const jewelerys = products?.filter(
    (product) => product.category === "jewelery"
  );
  const mens = products?.filter(
    (product) => product.category === "men's clothing"
  );
  const womans = products?.filter(
    (product) => product.category === "women's clothing"
  );

  return (
    <div className="min-h-[calc(100lvh-6.375rem-3.375rem)] max-w-screen">
      <div className="pl-4 pr-4 pt-12 pb-12 m-auto flex flex-col items-start gap-16 max-w-[1440px] justify-center">
        <h1 className="text-3xl font-bold">Home</h1>
        <div className="w-full text-center">
          <h2 className="text-2xl font-bold">Welcome to Redux Store!</h2>
          <p>Fast develivery and amazing prices!</p>
        </div>

        <div className="flex flex-wrap items-center justify-center w-full gap-x-20 gap-y-8">
          <div className="flex flex-col items-center justify-center gap-4">
            <h3 className="font-bold">Electronics</h3>
            <img
              src={electronics[0]?.image}
              alt={electronics[0]?.description}
              className="size-40"
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <h3 className="font-bold">Jewelerys</h3>
            <img
              src={jewelerys[0]?.image}
              alt={jewelerys[0]?.description}
              className="size-40"
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <h3 className="font-bold">Men's clothing</h3>
            <img
              src={mens[0]?.image}
              alt={mens[0]?.description}
              className="size-40"
            />
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <h3 className="font-bold">Women's clothing</h3>
            <img
              src={womans[0]?.image}
              alt={womans[0]?.description}
              className="size-40"
            />
          </div>
        </div>

        <NavLink to="/store" className="mx-auto">
          <Button> Check our store</Button>
        </NavLink>
      </div>
    </div>
  );
}
