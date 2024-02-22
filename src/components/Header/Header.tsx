import { ComponentProps, useState, ChangeEvent, KeyboardEvent } from "react";
import classes from "./Header.module.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/typedReduxHooks";
import { updateList } from "../../store/slices/goodsSlice";

const Header = function ({ className = "" }: ComponentProps<"div">) {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.search);

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  const search = () => {
    if (!inputValue || isLoading) return;
    const correctValue = inputValue.trim();
    if (correctValue !== inputValue) setInputValue(correctValue);
    dispatch(updateList({ searchFragment: correctValue }));
  };

  const filters = [];

  return (
    <div className={`${className} ${classes.default}`}>
      <h4>Filter</h4>
      {/* label
      <input type="radio" name="filter-radio" />
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeydown}
      /> */}
      {/* <Button className={classes.button} variant="primary" onClick={search}>
            Search
         </Button> */}
    </div>
  );
};
export default Header;
