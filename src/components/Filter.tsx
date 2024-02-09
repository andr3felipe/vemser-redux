import { setOrderBy } from "@/features/products/productsSlice";
import { useAppDispatch } from "@/store";

export function Filter() {
  const dispatch = useAppDispatch();

  function handleFilter(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(
      setOrderBy(e.target.value as "default" | "name" | "price" | "rating")
    );
  }

  return (
    <div className="self-end font-medium">
      <label htmlFor="filter">Ordenar por: </label>
      <select
        onChange={handleFilter}
        id="filter"
        className="p-1 rounded-lg border-[1px]"
      >
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
    </div>
  );
}
