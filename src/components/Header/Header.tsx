import { ComponentProps, useState, ChangeEvent } from "react";
import classes from "./Header.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/typedReduxHooks";
import { fetchApplyFilter } from "../../store/slices/productSlice";
import { IFilter } from "../../api/types";

const Header = function ({ className = "" }: ComponentProps<"div">) {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.product);

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const applyFilter = () => {
    if (!inputValue || isLoading) return;
    const correctValue = inputValue.trim();
    if (correctValue !== inputValue) setInputValue(correctValue);
    dispatch(
      fetchApplyFilter({ filterType: activeFilter, filterValue: inputValue })
    );
  };

  const clearFilter = () => {
    setActiveFilter(null);
    setInputValue("");
    dispatch(fetchApplyFilter({ filterType: null }));
  };

  const [activeFilter, setActiveFilter] = useState<IFilter | null>(null);
  const filters: (IFilter | null)[] = [null, "brand", "price", "product"];

  return (
    <div className={`${className} ${classes.header}`}>
      <h4>Filter</h4>
      {filters.map((fltr) => (
        <button
          className={`${classes.filterBtn} ${
            activeFilter === fltr ? classes.active : ""
          }`}
          onClick={() => setActiveFilter(fltr)}
          key={fltr || "null"}
        >
          {fltr === null ? "no filter" : fltr}
        </button>
      ))}
      <br />
      <input
        className={classes.input}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Filter value"
        disabled={activeFilter === null}
      />
      <br />
      <button
        className={classes.applyButton}
        onClick={applyFilter}
        disabled={isLoading || !inputValue}
      >
        Apply Filter
      </button>
      <button
        className={classes.clearButton}
        onClick={clearFilter}
        disabled={isLoading}
      >
        Clear Filter
      </button>
    </div>
  );
};
export default Header;
