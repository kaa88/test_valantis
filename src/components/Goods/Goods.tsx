import { ComponentProps } from "react";
import classes from "./Goods.module.scss";
import SearchBar from "../Header/Header";
import SearchResult from "../List/List";

const Goods = function ({ className = "", ...props }: ComponentProps<"div">) {
  return (
    <div className={`${className} ${classes.default}`} {...props}>
      <SearchBar className={classes.searchBar} />
      <SearchResult className={classes.searchResult} />
    </div>
  );
};
export default Goods;
