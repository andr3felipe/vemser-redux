import "./global.css";
import { useSelector } from "react-redux";

import { RootState } from "./store";
import { ProductCard } from "./components/ProductCard";
import { Header } from "./components/Header";
import { Filter } from "./components/Filter";

function App() {
  const { products } = useSelector((state: RootState) => state.products);
  const { orderBy } = useSelector((state: RootState) => state.products);

  const sortedProducts = [...products]?.sort((a, b) => {
    if (orderBy === "name") {
      return a.title.localeCompare(b.title);
    }

    if (orderBy === "price") {
      return a.price - b.price;
    }

    if (orderBy === "rating") {
      return b.rating - a.rating;
    }

    return a.id - b.id;
  });

  return (
    <div className="min-h-screen max-w-screen">
      <Header />

      <div className="pl-2 pr-2 pt-12 pb-12 m-auto flex flex-col items-start gap-8 max-w-[1440px] justify-center">
        <Filter />

        <div className="m-auto flex flex-wrap items-start gap-8 justify-center">
          {sortedProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
