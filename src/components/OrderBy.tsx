import { setOrderBy } from "@/redux/features/productsSlice";
import { useAppDispatch } from "@/redux/hooks/reduxTypedHooks";

export function OrderBy() {
  const dispatch = useAppDispatch();

  function handleFilter(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(
      setOrderBy(
        e.target.value as
          | "default"
          | "name-asc"
          | "name-desc"
          | "price-asc"
          | "price-desc"
          | "rating"
      )
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
        <option value="name-asc" className="font-medium">
          Nome (A-Z)
        </option>
        <option value="name-desc" className="font-medium">
          Nome (Z-A)
        </option>
        <option value="price-asc" className="font-medium">
          Preço crescente
        </option>
        <option value="price-desc" className="font-medium">
          Preço decrescente
        </option>
        <option value="rating" className="font-medium">
          Melhores avaliados
        </option>
      </select>
    </div>
  );
}
