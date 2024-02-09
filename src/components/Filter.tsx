import { useDispatch } from "react-redux";
import { setOrderBy } from "@/features/products/productsSlice";

export function Filter() {
  const dispatch = useDispatch();

  function handleFilter(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(
      setOrderBy(e.target.value as "default" | "name" | "price" | "rating")
    );
  }

  return (
    <select className="self-end font-medium" onChange={handleFilter}>
      <option value="default" className="font-medium">
        Padrão
      </option>
      <option value="name" className="font-medium">
        Nome
      </option>
      <option value="price" className="font-medium">
        Preço
      </option>
      <option value="rating" className="font-medium">
        Avaliação
      </option>
    </select>
  );
}
